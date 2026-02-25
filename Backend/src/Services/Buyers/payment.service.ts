import pool from "../../Config/dbConnect.js"
import { updateOrderStatusQuery } from "../../Queries/order.schema.js";
import { checkPaymentCreated, existingPaymentQuery, newPaymentQuery, updatePaymentOrderQuery, updatePaymentsQuery } from "../../Queries/payment.schema.js";
// import { checkPaymentQuery } from "../../Queries/payment.schema.js";


// export const checkForPayment = (orderID : string , buyerID : string) => {
//     return pool.query(checkPaymentQuery , [buyerID , orderID]);
// }

export const newPaymentOrder = ({buyer_id , order_id , amount , currency , razorpay_order_id , status} : any) => {
    return pool.query(newPaymentQuery , [buyer_id , order_id , amount , currency , razorpay_order_id , status])
}

export const updatePaymentOrder = ({buyer_id , order_id , amount , currency , razorpay_order_id , status , paymentId} : any) => {
    return pool.query(updatePaymentOrderQuery , [buyer_id , order_id , amount , currency , razorpay_order_id , status , paymentId])
}

export const checkPayment = (orderID : string , buyerID : string) => {
    return pool.query(checkPaymentCreated , [buyerID , orderID]);
}

export const updatePayments = ({ razorpay_payment_id , razorpay_signature , payment_status , buyer_id , order_id} : any) => {
    return pool.query(updatePaymentsQuery , [payment_status , razorpay_payment_id , razorpay_signature , order_id , buyer_id])
}



// update order and payments 
export const updateOrderAndPayment = async({razorpay_payment_id , razorpay_signature , payment_status , buyer_id , order_id} : any) => {

     const client = await pool.connect();

    try{

        await client.query("BEGIN");

        // prevent duplicate webhook processing
        const existingPayment = await client.query(existingPaymentQuery , [razorpay_payment_id])
        
        if(existingPayment.rows.length > 0 && existingPayment.rows[0].status === 'captured'){
            await client.query("ROLLBACK");
            throw new Error("Duplicate")
        }

        // update payments
        await client.query(updatePaymentsQuery , [payment_status , razorpay_payment_id , razorpay_signature , order_id , buyer_id]);

         // update order table
        if(payment_status === 'captured'){
            await client.query(updateOrderStatusQuery , ['paid' , order_id , buyer_id]);
        }

        if(payment_status === 'failed'){
             await client.query(updateOrderStatusQuery , ['pending_payment' , order_id , buyer_id]);
        }

        await client.query("COMMIT");
        console.log("Payment updated successfully");

    } catch(err){
        await client.query("ROLLBACK");
        throw err
    } finally{
         client.release();
    }
}