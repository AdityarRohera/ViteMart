
import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";
import { getVendorsOrders } from "../../Services/vendors/orders.service.js";

export const incomingOrdersHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside vendors orders handlers")
        const vendor_id = (req as AuthenticatedRequest).user.userId;

        // fet hing vendors incoming orders
        const orders = await getVendorsOrders(vendor_id);
        
        return res.status(200).send({
            success : true,
            message : 'orders fetched successfully',
            data : orders.rows
        })
        
    } catch(err : unknown){
        console.log("Error comes in -> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in fetching vendors orders",
            error : errmessage
        })
    }
}
