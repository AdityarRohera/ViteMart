import type{ Request , Response } from "express";
import { getCategories, newCategory } from "../../Services/vendors/category.service.js";

export const newCategoryHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside new category handler")
        const {name , description} = req.body;

        if(!name || typeof name !== "string"){
            return res.status(400).send({
                success : false,
                message : "Invalid data"
            })
        }

        // Create new category
        const category = await newCategory({name , description});
        
        return res.status(200).send({
            success : true,
            message : 'New category created successfully',
            data : category.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in new category handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in new category handler",
            error : errmessage
        })
    }
}

export const getCategoriesHandler = async(req : Request , res : Response) => {
    try{

        console.log("1 Inside get categories handler")
        const category = await getCategories();

        return res.status(200).send({
            success : true,
            message : 'Categories fetched successfully',
            categories : category.rows
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting categories handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting categories",
            error : errmessage
        })
    }
}
