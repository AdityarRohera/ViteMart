
import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";
import { getAllBuyerProducts, getSingleBuyerProducts } from "../../Services/Buyers/buyer.product.service.js";

export const buyersProductsHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside fetching All products of buyer handler")

        const products = await getAllBuyerProducts();
        
        return res.status(200).send({
            success : true,
            message : 'Get product successfully',
            products : products.rows
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting all shoping products-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting all shoping products",
            error : errmessage
        })
    }
}

export const buyersSingleProductsHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside fetching Single products of buyer handler")

        const {productId} = req.params

        const product = await getSingleBuyerProducts(productId);
        console.log(product.rows)
        
        return res.status(200).send({
            success : true,
            message : 'Get product successfully',
            product : product.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting single shoping products-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting single shoping products",
            error : errmessage
        })
    }
}

