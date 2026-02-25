
import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";

import { createOrder } from "../../Services/Buyers/order.service.js";
import { getAllOrderItems, newOrderItem , updateOrderItem } from "../../Services/Buyers/orderItem.service.js";

export const newOrderItemHandler = async(req : Request , res : Response) => {
    try{
        
        console.log("1 Inside new order item handler")
        const {product_id , order_id , quantity} = req.body;
        const buyer_id = (req as AuthenticatedRequest).user.userId;

        console.log("getting data in order items -> " , order_id , quantity)

        if(!product_id || !order_id){
            return res.status(400).send({
                status : false,
                message : "Invalid data"
            })
        }

        // Now create new order Items (perform transition)
        const orderItem = await newOrderItem({product_id , order_id , quantity , buyer_id})
        
        return res.status(200).send({
            status : true,
            message : 'orderItem created successfully',
            orderItem : orderItem.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in new OrderItem Handler-> " , err);


        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

         // Expected error from service (duplicate etc.)
        if (err instanceof Error && err.message === "This order is already add in order items") {
          return res.status(400).json({
            status: false,
            message: err.message,
          });
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
        console.log(orderItem_id)

        if(!orderItem_id || !status){
            return res.status(400).send({
                success : false,
                message : "Invalid data"
            })
        }

        const result = await updateOrderItem({orderItem_id , quantity , status})
        
        return res.status(200).send({
            success : true,
            message : 'orderItem updated successfully',
            result : result
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

export const getAllOrderItemsHandler = async(req : Request , res : Response) => {
    try{
        
        console.log("1 Inside get order item handler")
        const buyer_id = (req as AuthenticatedRequest).user.userId;

        const orderItems = await getAllOrderItems(buyer_id)
        console.log(orderItems.rows)

         // if cart empty
        if (orderItems.rows.length === 0) {
          return res.status(200).send({
            success: true,
            message: "Cart is empty",
            orderItems: {
              order_id: null,
              total_products: 0,
              total_amount: 0,
              items: []
            }
          });
        }

        // structure orderItems
        const response = {
            order_id: orderItems.rows[0].order_id,
            total_products: orderItems.rows[0].total_products,
            total_amount: orderItems.rows[0].total_amount,
            items: orderItems.rows.map(r => ({
                order_item_id: r.order_item_id,
                product_id: r.product_id,
                label: r.label,
                selling_price: r.selling_price,
                product_url: r.product_url,
                quantity: r.quantity,
                seller_name: r.seller_name
         }))
        }
        
        return res.status(200).send({
            success : true,
            message : 'Get user carts items successfully',
            orderItems : response
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting all OrderItems Handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting all orderItems handlerr",
            error : errmessage
        })
    }
}