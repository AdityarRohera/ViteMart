
import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";

import { createOrder } from "../../Services/Buyers/order.service.js";
import { newOrderItem , updateOrderItem } from "../../Services/Buyers/orderItem.service.js";

export const newOrderItemHandler = async(req : Request , res : Response) => {
    try{
        
        console.log("1 Inside new order item handler")
        const {product_id , order_id , quantity} = req.body;
        const buyer_id = (req as AuthenticatedRequest).user.userId;

        console.log("getting data in order items -> " , product_id , order_id , quantity)

        if(!product_id || !order_id){
            return res.status(400).send({
                success : false,
                message : "Invalid data"
            })
        }

        // Now create new order Items (perform transition)
        const orderItem = await newOrderItem({product_id , order_id , quantity , buyer_id})
        
        return res.status(200).send({
            success : true,
            message : 'orderItem created successfully',
            data : orderItem.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in new OrderItem Handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in new orderItem handlerr",
            error : errmessage
        })
    }
}

export const updateOrderItemHandler = async(req : Request , res : Response) => {
    try{
        
        console.log("1 Inside update order item handler")
        const {quantity , orderItem_id , status} = req.body;

        if(!orderItem_id || !status){
            return res.status(400).send({
                success : false,
                message : "Invalid data"
            })
        }

        // Now create new order Items (perform transition)
        const orderItem = await updateOrderItem({orderItem_id , quantity , status})
        
        return res.status(200).send({
            success : true,
            message : 'orderItem updated successfully',
            data : orderItem.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in update OrderItem Handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in update orderItem handlerr",
            error : errmessage
        })
    }
}
