
import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";
import { getIncomingOrders } from "../../Services/vendors/incomingOrders.service.js";

export const getAllIncomingOrdersHandler = async(req : Request , res : Response) => {
    try{
         console.log("Inside vendors incoming orders handler");
         const vendor_id = (req as AuthenticatedRequest).user.userId;
        
         const orders = await getIncomingOrders(vendor_id);

        console.log(orders.rows)

        return res.status(200).send({
            success : true,
            message : 'Payment order created successfully',
            res : orders.rows
        })
        
    } catch(err : unknown){
        console.log("Error comes in payment create-order handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in creating orders for payments",
            error : errmessage
        })
    }
}