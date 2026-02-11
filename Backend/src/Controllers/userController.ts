import type { Request , Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { AuthenticatedRequest } from "../Middlewares/auth.js";


// import user services here 
import { findUser , newUser } from "../Services/user.service.js";


// Register user
export const registerUserHandler = async(req : Request , res : Response) => {
    try{
        
        console.log("Inside register handler")
        const {name , email , password , role} = req.body;

        if(!name || !email || !password || !role ){
            return res.status(400).send({
                status : false,
                message : "Invalid data"
            })
        }

        const user = await findUser(email);
        if(user.rowCount !== 0){
            return res.status(400).send({
                status : false,
                message : "User Already Exists"
            })
        }

        const hashPassword = await bcrypt.hash(password , 10);
        console.log("Hash password -> " ,hashPassword)

        await newUser({name , email , password : hashPassword , role});
        
        return res.status(200).send({
            success : true,
            message : 'New User Registered successfully'
        })
        
    } catch(err : unknown){
        console.log("Error comes in New User Registered -> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in New User Registered",
            error : errmessage
        })
    }
}


// login user 
export const loginUserHandler = async(req : Request , res : Response) => {
    try{

        console.log("Inside user login handler")
        const {email , password} = req.body;

        if(!email && !password){
            return res.status(400).send({
                status : false,
                message : "Invalid data"
            })
        }

        const user = await findUser(email);
        if(user.rowCount === 0){
            return res.status(400).send({
                status : false,
                message : "User Not Registered"
            })
        }

        const checkPassword = await bcrypt.compare(password , user.rows[0].password);
        if(!checkPassword){
            return res.status(400).send({
                status : false,
                message : "Incorrect Password"
            })
        }

        // token
        const token = jwt.sign({
            userId : user.rows[0].id
        } , process.env.SECRET!);

        
        return res.status(200).send({
            success : true,
            message : 'User login successfully',
            token : token,
            user : {id : user.rows[0].id , email : user.rows[0].email , role : user.rows[0].role}
        })
        
    } catch(err : unknown){
        console.log("Error comes in User login -> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in User login",
            error : errmessage
        })
    }
}

export const userProfile = async(req : Request , res : Response) => {
    try{

        const buyer_id = (req as AuthenticatedRequest).user.userId
        
        return res.status(200).send({
            success : true,
            message : 'User successfully',
            data : buyer_id
        })
        
    } catch(err : unknown){
        res.status(500).send({
            status : false,
            message : "Something wrong in User profile",
            error : err
        })
    }
}