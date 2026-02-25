
import type{ Request , Response } from "express";
import type{ AuthenticatedRequest } from "../../Middlewares/auth.js";
import { razorpay } from "../../Config/razorpayConfig.js";
import { checkOrderCreated, updateOrderStatus } from "../../Services/Buyers/order.service.js";
import { checkPayment, newPaymentOrder, updateOrderAndPayment, updatePaymentOrder, updatePayments } from "../../Services/Buyers/payment.service.js";
// import { checkForPayment } from "../../Services/Buyers/payment.service.js";
import crypto from "crypto";


export const paymetOrderHandler = async(req : Request , res : Response) => {
    try{

        console.log("Inside payment create-order handler");
         const buyer_id = (req as AuthenticatedRequest).user.userId;
        const {amount , currency , receipt , notes , order_id} = req.body;

        // first check is orderid is valid 
        const findOrder  = await checkOrderCreated(buyer_id);
        if(findOrder.rowCount === 0){
            return res.status(400).send({
                success : false,
                message : "New Order not found"
            })
        }

        // now check order already exists or not 
        const checkOrderCreatedOrNot = await checkPayment(order_id , buyer_id);
        if(checkOrderCreatedOrNot.rowCount !== 0 && checkOrderCreatedOrNot.rows[0].status === 'paid'){
            return res.status(400).send({
                success : false,
                message : "This order already paid"
            })
        }

        // now create new order
        const options = {
            amount : amount * 100,
            currency,
            receipt : `${order_id}`,
            notes : {
                 buyer_id,
                 order_id,
                 total_products: findOrder.rows[0].total_products
            }
        }
        

        const order = await razorpay.orders.create(options);
        console.log("Getting orders -> " , order);

        // now save response to database

        if(checkOrderCreatedOrNot.rowCount !== 0){
            // now update existing order 
            console.log("Inside update existing payment")
              await updatePaymentOrder({buyer_id , order_id , amount , currency , razorpay_order_id : order.id , status : 'created'  , paymentId : checkOrderCreatedOrNot.rows[0].id})

               return res.status(200).send({
                    success : true,
                    message : 'Payment order created successfully',
                    res : order
                })
        }

        // create new order
        const newPayment = await newPaymentOrder({buyer_id , order_id , amount , currency , razorpay_order_id : order.id , status : 'created'})

        console.log("Getting new payment -> " , newPayment.rows[0])


        return res.status(200).send({
            success : true,
            message : 'Payment order created successfully',
            res : order
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

export const verifyPaymentHandler = async(req : Request , res : Response) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    try{
            console.log("Webhook received");

            const signature = req.headers["x-razorpay-signature"] as string;

            if (!signature) {
                return res.status(400).json({ message: "Missing signature" });
            }


                const generatedSignature = crypto
                                           .createHmac("sha256", secret)
                                           .update(req.body)
                                           .digest("hex");

                console.log("Generated signature -> " , generatedSignature)

        if (generatedSignature !== signature) {
            return res.status(400).send("Invalid signature");
        }

        const event = JSON.parse(req.body.toString());
        console.log("Webhook event:", event.event);

        if (
                event.event !== "payment.captured" &&
                event.event !== "payment.failed"
           ) {
                return res.status(200).json({ ignored: true });
        }

        const payment = event.payload.payment.entity;

         const {
                id: razorpay_payment_id,
                order_id: razorpay_order_id,
                status,
                notes,
                email,
               } = payment;

        if (!notes?.buyer_id || !notes?.order_id) {
            return res.status(400).json({
              message: "Missing order reference",
            });
        }

        const buyer_id = notes.buyer_id;
        const order_id = notes.order_id;

        console.log(buyer_id , order_id);

        let payment_status = 'created';

        if (status === "captured") payment_status = "captured";
        if (status === "failed") payment_status = "failed";
        

        // Now update payment and cart order status 
       await updateOrderAndPayment({
                razorpay_payment_id,
                razorpay_signature: signature,
                payment_status,
                buyer_id,
                order_id
        });

        return res.status(200).json({ success: true});

        
    } catch (err: unknown) {

    console.error("Webhook error:", err);

    let message = "Unknown error";

    if (err instanceof Error) message = err.message;
    if (typeof err === "string") message = err;

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
      error: message,
    });

  }
}
