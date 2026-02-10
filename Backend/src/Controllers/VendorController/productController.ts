import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";

import { newProduct } from "../../Services/vendors/product.service.js";

export const newProductHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside new product handler")
        const vendor_id = (req as AuthenticatedRequest).user.userId;
        console.log("2 getting vendor_id -> " , vendor_id);
        
        const {label , quantity , buying_price , selling_price , category_id , product_url} = req.body;

        if(!label || !quantity || !buying_price || !selling_price || !product_url){
            return res.status(400).json({
                success : false,
                message : "Invalide data"
            })
        }

        // Create new products
        const product = await newProduct({label , quantity , buying_price , selling_price , category_id , product_url , vendor_id});
        
        return res.status(200).send({
            success : true,
            message : 'New product created successfully',
            product : product.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in new product handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in new product handler",
            error : errmessage
        })
    }
}
