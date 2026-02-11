import pool from "../../Config/dbConnect.js";

import { getOrderItemProductQuery, newOrderItemQuery, incraseOrderItemQuery , decreaseOrderItemQuery } from "../../Queries/orderItem.schema.js";
import { DecreaseOrdersQuery, IncreaseOrdersQuery } from "../../Queries/order.schema.js";
import { checkItemAddedOrNotQuery } from "../../Queries/orderItem.schema.js";

export const newOrderItem = async({product_id , order_id , quantity , buyer_id} : any) => {
    
    const client  = await pool.connect();

    try{
        // first create new orderItem
        await client.query('BEGIN');

        // check orderItem already added or not
        const checkOrderItem = await client.query(checkItemAddedOrNotQuery , [product_id , buyer_id]);
        console.log(checkOrderItem.rows)
        if(checkOrderItem.rowCount !== 0){
            throw new Error("This order is already add in order items")
        }

        const orderItem = await client.query(newOrderItemQuery , [product_id , order_id , quantity || 1]);
        const productInfo = await client.query(getOrderItemProductQuery , [orderItem.rows[0].product_id]);

        const totalOrderAmount = productInfo.rows[0].selling_price * orderItem.rows[0].quantity;

        // second update orders table
        await client.query(IncreaseOrdersQuery , [quantity || 1 , totalOrderAmount ,  orderItem.rows[0].order_id])

        await client.query('COMMIT');

        return orderItem; 

    } catch(err){

        await client.query('ROLLBACK');
        console.log("error comes in newOrderItem servies")

        throw new Error(`Error in newOrderItems trasaction ${err}`)

    } finally{
        client.release();
    }
}

export const updateOrderItem = async({orderItem_id ,  quantity , status} : any) => {
    
    const client  = await pool.connect();

    try{
        // first create new orderItem
        await client.query('BEGIN');

        let orderItem;
        console.log(status)

        if(status === "Increase"){
             orderItem = await client.query(incraseOrderItemQuery , [quantity || 1 , orderItem_id]);
        } else if(status === "Decrease"){
            orderItem = await client.query(decreaseOrderItemQuery , [quantity || 1 , orderItem_id]);
        }

        console.log("getting order itms -> " , orderItem!.rows);
        const productInfo = await client.query(getOrderItemProductQuery , [orderItem!.rows[0].product_id]);

        const totalOrderAmount = productInfo.rows[0].selling_price * orderItem!.rows[0].quantity;

        // second update orders table
        if(status === "Increase"){
            await client.query(IncreaseOrdersQuery , [ quantity || 1 , totalOrderAmount , orderItem!.rows[0].order_id])
        } else if(status === "Decrease"){
            await client.query(DecreaseOrdersQuery , [ quantity || 1 , totalOrderAmount , orderItem!.rows[0].order_id])
        }

        await client.query('COMMIT');

        return orderItem!; 

    } catch(err){

        await client.query('ROLLBACK');
        console.log("error comes in updateOrderItems servies")

        throw new Error(`Error in updateOrderItems trasaction ${err}`)
        
    } finally{
        client.release();
    }
}
