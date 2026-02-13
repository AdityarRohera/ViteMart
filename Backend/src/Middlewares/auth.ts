import type {Request , Response} from 'express'
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { getUser } from '../Services/user.service.js';


export interface AuthenticatedRequest extends Request {
        user : JwtPayload;
}

export const userAuth = (req : Request , res : Response , next : any) => {
    try{

        const userReq = req as AuthenticatedRequest
        const token = req.cookies?.token || req.headers.token;
        console.log("Inside user auth -> " , token , typeof(token))

        if(!token || typeof token!== "string"){
            return res.status(401).send({
                status : false,
                message : "Token Required"
            })
        }

        //verify token 
        const verifyToken = jwt.verify(token as string , process.env.SECRET!) as JwtPayload;

         if(!verifyToken){
            return res.status(403).send({
                success : false,
                message: "Invalid Token"
            })
         }

          userReq.user = verifyToken;
          next();

    } catch(err : unknown){
        console.log("Error comes in auth middleware -> " , err);
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in user auth",
                error : errorMessage
            })
        }
}

export const isAdmin = async(req : Request , res : Response , next : any) => {
    try{

        const AuthRequest = req as AuthenticatedRequest
        const {userId} = AuthRequest.user
        console.log("IsAdmin getting user id -> " , userId);

        // get role of user
        const userRole = await getUser(userId);
        console.log("Getting userRole in isAdmin -> " , userRole.rows[0]);
        if(userRole.rows[0].role !== 'Admin'){
            return res.status(400).send({
                success : false,
                message : `Your Role is ${userRole.rows[0].role} , so you are not allowed to access admin route`
            })
        }

        next();

    } catch(err : unknown){
        console.log("Error comes in isAdmin middleware -> " , err);
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in isAdmin middleware",
                error : errorMessage
            })
        }
}

export const isBuyer = async(req : Request , res : Response , next : any) => {
    try{

        const AuthRequest = req as AuthenticatedRequest
        const {userId} = AuthRequest.user
        console.log("IsBuyer getting user id -> " , userId);

        // get role of user
        const userRole = await getUser(userId);
         console.log(userRole)
        console.log("Getting userRole in isbuyer -> " , userRole.rows[0]);
        if(userRole.rows[0].role !== 'Buyer'){
            return res.status(400).send({
                success : false,
                message : `Your Role is ${userRole.rows[0].role} , so you are not allowed to access buyers route`
            })
        }

        next();

    } catch(err : unknown){
        console.log("Error comes in isBuyer middleware -> " , err);
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in isBuyer middleware",
                error : errorMessage
            })
        }
}

export const isVendor = async(req : Request , res : Response , next : any) => {
    try{

        const AuthRequest = req as AuthenticatedRequest
        const {userId} = AuthRequest.user
        console.log("IsVendor getting user id -> " , userId);

        // get role of user
        const userRole = await getUser(userId);
        console.log("Getting userRole in isVendor -> " , userRole.rows[0]);
        if(userRole.rows[0].role !== 'Vendor'){
            return res.status(400).send({
                success : false,
                message : `Your Role is ${userRole.rows[0].role} , so you are not allowed to access vendor route`
            })
        }

        next();

    } catch(err : unknown){
        console.log("Error comes in isVendor middleware -> " , err);
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in isVendor middleware",
                error : errorMessage
            })
        }
}