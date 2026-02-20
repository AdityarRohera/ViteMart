import pool from "../../Config/dbConnect.js";

import { getOrderItemProductQuery, newOrderItemQuery , getAllOrderItemsQuery, deletOrderItemQuery, findOrderItemQuery, updateOrderItemsQuery } from "../../Queries/orderItem.schema.js";
import { DecreaseOrdersQuery, IncreaseOrdersQuery } from "../../Queries/order.schema.js";
import { checkItemAddedOrNotQuery } from "../../Queries/orderItem.schema.js";

export const newOrderItem = async({product_id , order_id , quantity , buyer_id} : any) => {
    
    const client  = await pool.connect();

    try{
        // first create new orderItem
        await client.query('BEGIN');

        // check orderItem already added or not
        const checkOrderItem = await client.query(checkItemAddedOrNotQuery , [product_id , buyer_id]);
        console.log("Getting client in new orderItem -> " , checkOrderItem.rows[0])
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

        throw err;

    } finally{
        client.release();
    }
}


// try to implement
// export const updateOrder = async({orderItem_id ,  quantity , status} : any) => {

//     const client = await pool.connect();
//     try{

//         await client.query('BEGIN');

//         // first check orderitem exists or not 
//         const existingItem = await client.query(findOrderItemQuery,[orderItem_id]);
//         if (existingItem.rowCount === 0) {
//             throw new Error("Order item not found");
//         }


//         let netQuantity = existingItem.rows[0].quantity;

//         // before update quantity amount
//         let totalOrderAmount = existingItem.rows[0].selling_price * existingItem.rows[0].quantity;

//         if(status === "Decrease"){

//             // first check netQuantity become zero
//             netQuantity -= quantity;

//             if(netQuantity <= 0){

//                 // delete order item and update order info also 
//                 await client.query(DecreaseOrdersQuery , [existingItem.rows[0].quantity , totalOrderAmount])
//                 await client.query(deletOrderItemQuery , [orderItem_id]);
//                 return {deleted : true}
//             }

//             // normal decrease 
//                 await client.query(updateOrderItemsQuery , [netQuantity , existingItem.rows[0].id])

//         } 
//         else if(status === "Increase"){
//             netQuantity += quantity;
//             await client.query(updateOrderItemsQuery , [netQuantity , existingItem.rows[0].id])
//         }

//         // second update orders table
//         if(status === "Increase"){
//             await client.query(IncreaseOrdersQuery , [ quantity || 1 , totalOrderAmount , existingItem!.rows[0].order_id]);

//         } else if(status === "Decrease"){
//             await client.query(DecreaseOrdersQuery , [ quantity || 1 , totalOrderAmount , existingItem!.rows[0].order_id])
//         }

//          await client.query('COMMIT');
//          return existingItem; 


//     } catch(err){
//         await client.query('ROLLBACK');
//         console.log("error comes in updateOrderItems servies")

//         throw new Error(`Error in updateOrderItems trasaction ${err}`)

//     } finally{
//         client.release();
//     }
// }

export const updateOrderItem = async ({ orderItem_id, quantity, status }: any) => {

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const existingItem = await client.query(findOrderItemQuery, [orderItem_id]);

        if (existingItem.rowCount === 0) {
            throw new Error("Order item not found");
        }

        const item = existingItem.rows[0];
        const price = item.selling_price;
        const orderId = item.order_id;
        const changeQty = quantity || 1;

        let netQuantity = item.quantity;

        if (status === "Decrease") {

            netQuantity -= changeQty;

            if (netQuantity <= 0) {

                // Remove completely
                await client.query(
                    DecreaseOrdersQuery,
                    [item.quantity, item.quantity * price, orderId]
                );

                await client.query(deletOrderItemQuery, [orderItem_id]);

                await client.query('COMMIT');
                return { deleted: true };
            }

            // Normal decrease
            await client.query(updateOrderItemsQuery, [netQuantity, orderItem_id]);

            await client.query(
                DecreaseOrdersQuery,
                [changeQty, changeQty * price, orderId]
            );

        } else if (status === "Increase") {

            netQuantity += changeQty;

            await client.query(updateOrderItemsQuery, [netQuantity, orderItem_id]);

            await client.query(
                IncreaseOrdersQuery,
                [changeQty, changeQty * price, orderId]
            );
        }

        await client.query('COMMIT');
        return { updated: true, quantity: netQuantity };

    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};


export const getAllOrderItems = (buyers_id : any) => {
    return pool.query(getAllOrderItemsQuery , [buyers_id])
}