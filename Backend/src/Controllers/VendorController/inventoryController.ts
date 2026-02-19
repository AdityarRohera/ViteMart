import type { Request , Response } from "express";
// import type { AuthenticatedRequest } from "../../Middlewares/auth.js";

import { getInventory, newInventory, updateInventory } from "../../Services/vendors/inventory.service.js";
import { updateProductStatus } from "../../Services/vendors/product.service.js";

export const newInventoryHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside new inventory handler")
        const {product_id , quantity_available , location , status} = req.body;
        console.log(product_id , quantity_available , location , status)
        
        if(!product_id || !quantity_available || !location){    
            return res.status(400).send({
                success : false,
                message : "Product Id, quantity and location required"
            })
        }

            // Try updating first
            let result = await updateInventory({
              product_id,
              quantity_available,
              location,
            });


            // If no rows updated → create inventory
            if (result.rowCount === 0) {
              result = await newInventory({
                product_id,
                quantity_available,
                location,
              });
            }
            
            // update product
            if (status && status !== 'Draft' && status !== 'Published') {
                 return res.status(400).json({
                     success: false,
                     message: "Status is invalid"
                 });
            }


            if(status) await updateProductStatus({product_id , status});
        
            return res.status(200).send({
                success: true,
                message: "Inventory saved successfully",
                Inventory: result.rows[0],
            });
        
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

export const getInventoryHandler = async(req : Request , res : Response) => {
    try{
        console.log("1 Inside getting inventory handler")
        const {product_id} = req.params;
        console.log(product_id)
        
        if(!product_id){
            return res.status(400).send({
                success : false,
                message : "Product Id required"
            })
        }

        const Inventory = await getInventory(product_id);

        if(Inventory.rowCount === 0){
            return res.status(400).send({
                success : false,
                message : "Inventory not found"
            })
        }
        
        return res.status(200).send({
            success : true,
            message : 'get Inventory successfully',
            Inventory : Inventory.rows[0]
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting Inventory handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting Inventory handler",
            error : errmessage
        })
    }
}
