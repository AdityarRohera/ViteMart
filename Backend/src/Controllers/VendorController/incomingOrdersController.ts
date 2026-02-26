
import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";
import { getIncomingOrders, getSingleIncomingOrder, updateOrderStatus } from "../../Services/vendors/incomingOrders.service.js";

export const getAllIncomingOrdersHandler = async(req : Request , res : Response) => {
    try{
         console.log("Inside vendors incoming orders handler");
         const vendor_id = (req as AuthenticatedRequest).user.userId;
        
         const result = await getIncomingOrders(vendor_id);

        console.log(result.rows)

        return res.status(200).send({
            success : true,
            message : 'fetched all incoming orders successfully',
            result : result.rows
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting all orders -> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting all orders",
            error : errmessage
        })
    }
}


export const getSingleIncomingOrdersHandler = async(req : Request , res : Response) => {
    try{
         console.log("Inside vendors single incoming order handler");
         const vendor_id = (req as AuthenticatedRequest).user.userId;
         const {order_id} = req.params;
        
         const result = await getSingleIncomingOrder(vendor_id , order_id);

        return res.status(200).send({
            success : true,
            message : 'Fetch order successfully',
            result : result.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in get single order-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting single order",
            error : errmessage
        })
    }
}

export const updateOrderStatusHandler = async(req : Request , res : Response) => {
    try{
         console.log("Inside update order status handler ");
         const vendor_id = (req as AuthenticatedRequest).user.userId;
         const {status , order_id} = req.body
        
         await updateOrderStatus({status , order_id});

        return res.status(200).send({
            success : true,
            message : 'order status updated successfully',
        })
        
    } catch(err : unknown){
        console.log("Error comes in update order status-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in update order status",
            error : errmessage
        })
    }
}