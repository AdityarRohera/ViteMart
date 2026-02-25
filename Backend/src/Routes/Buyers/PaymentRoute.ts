import express from 'express'
import { isBuyer, userAuth } from '../../Middlewares/auth.js';
import { paymetOrderHandler, verifyPaymentHandler } from '../../Controllers/BuyerController/paymentsController.js';
const paymentRoute = express.Router()


paymentRoute.post('/payments/verify-payments'  ,  express.raw({ type: "application/json" }) , verifyPaymentHandler);
    
paymentRoute.use(express.json())
paymentRoute.post('/payment/create-order' , userAuth , isBuyer , paymetOrderHandler);


export default paymentRoute;