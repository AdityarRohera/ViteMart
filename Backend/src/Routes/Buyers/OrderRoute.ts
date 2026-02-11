import express from 'express'
const buyerOderRoute = express.Router()

import { newOrderItemHandler } from '../../Controllers/BuyerController/orderItemController.js';
import { isBuyer, userAuth } from '../../Middlewares/auth.js';
buyerOderRoute.post('/createorder' , userAuth , isBuyer , newOrderItemHandler);

export default buyerOderRoute;