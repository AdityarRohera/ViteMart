
import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";
import { getAllBuyerProducts, getCategoryProduct, getSingleBuyerProducts, recommendationProducts } from "../../Services/Buyers/buyer.product.service.js";

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

export const categoryProductsHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside fetching category product handler")

        const {categoryId} = req.params;

        const data = await getCategoryProduct(categoryId);
        console.log(data.rows)
        
        return res.status(200).send({
            success : true,
            message : 'get category products successfully',
            data : data.rows
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting category products-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting category products",
            error : errmessage
        })
    }
}

export const productRecommendationHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside fetching recommendation products");
        const buyer_id = (req as AuthenticatedRequest).user.userId;

        const result = await recommendationProducts(buyer_id);
        
        return res.status(200).send({
            success : true,
            message : 'get recommendation products successfully',
            result : result.rows
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting recommendation products-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting recommendation products",
            error : errmessage
        })
    }
}
