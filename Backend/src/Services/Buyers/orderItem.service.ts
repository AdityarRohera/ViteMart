import pool from "../../Config/dbConnect.js";

import { getOrderItemProductQuery, newOrderItemQuery, updateOrderItemQuery } from "../../Queries/orderItem.schema.js";
import { updateOrdersQuery } from "../../Queries/order.schema.js";

export const newOrderItem = async({product_id , order_id , quantity} : any) => {
    
    const client  = await pool.connect();

    try{
        // first create new orderItem
        await client.query('BEGIN');

        const orderItem = await client.query(newOrderItemQuery , [product_id , order_id , quantity]);
        const productInfo = await client.query(getOrderItemProductQuery , [orderItem.rows[0].id]);

        // second update orders table
        await client.query(updateOrdersQuery , [(productInfo.rows[0].selling_price * orderItem.rows[0].quantity) , orderItem.rows[0].order_id])

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

export const updateOrderItem = async({orderItem_id ,  quantity} : any) => {
    
    const client  = await pool.connect();

    try{
        // first create new orderItem
        await client.query('BEGIN');

        const orderItem = await client.query(updateOrderItemQuery);
        const productInfo = await client.query(getOrderItemProductQuery , [orderItem.rows[0].id]);

        // second update orders table
        await client.query(updateOrdersQuery , [(productInfo.rows[0].selling_price * orderItem.rows[0].quantity) , orderItem.rows[0].order_id])

        await client.query('COMMIT');

        return orderItem; 

    } catch(err){

        await client.query('ROLLBACK');
        console.log("error comes in updateOrderItems servies")

        throw new Error(`Error in updateOrderItems trasaction ${err}`)
        
    } finally{
        client.release();
    }
}