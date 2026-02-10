import type { Request , Response } from "express";
// import type { AuthenticatedRequest } from "../../Middlewares/auth.js";

import { newInventory } from "../../Services/vendors/inventory.service.js";

export const newInventoryHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside new inventory handler")
        const {product_id , quantity_available , location} = req.body;
        
        if(!product_id || quantity_available || !location){
            return res.status(400).send({
                success : false,
                message : "Invalide data"
            })
        }

        // Create new products
        const Inventory = await newInventory({product_id , quantity_available , location});
        
        return res.status(200).send({
            success : true,
            message : 'New Inventory created successfully',
            product : Inventory.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in new Inventory handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in new Inventory handler",
            error : errmessage
        })
    }
}
