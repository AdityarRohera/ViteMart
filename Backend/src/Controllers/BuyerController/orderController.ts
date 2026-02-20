
import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";

import { checkOrderCreated, createOrder } from "../../Services/Buyers/order.service.js";

export const createOrderHandler = async(req : Request , res : Response) => {
    try{
        
        console.log("1 Inside buyer order create handler")
        const buyer_id = (req as AuthenticatedRequest).user.userId;

        // first check order already created or not
        const checkOrder = await checkOrderCreated(buyer_id);

        if(checkOrder.rowCount !== 0){
            return res.status(200).send({
                 success : true,
                 message : 'order get successfully',
                 order : checkOrder.rows[0]
            })
        }

        // if not create order before then create new order
        const order = await createOrder(buyer_id);
        
        return res.status(200).send({
            success : true,
            message : 'order create created successfully',
            order : order.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in creating order handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in creating order handlerr",
            error : errmessage
        })
    }
}
