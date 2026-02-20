import express from 'express'
const buyerOderRoute = express.Router()

import { createOrderHandler } from '../../Controllers/BuyerController/orderController.js';
import { isBuyer, userAuth } from '../../Middlewares/auth.js';
buyerOderRoute.post('/createorder' , userAuth , isBuyer , createOrderHandler);

export default buyerOderRoute;