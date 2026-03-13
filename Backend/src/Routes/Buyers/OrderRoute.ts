import express from 'express'
const buyerOderRoute = express.Router()

import { createOrderHandler, recentOrderHandler } from '../../Controllers/BuyerController/orderController.js';
import { isBuyer, userAuth } from '../../Middlewares/auth.js';
buyerOderRoute.post('/createorder' , userAuth , isBuyer , createOrderHandler);

buyerOderRoute.get('/buyers/recent-orders' , userAuth , isBuyer , recentOrderHandler);

export default buyerOderRoute;