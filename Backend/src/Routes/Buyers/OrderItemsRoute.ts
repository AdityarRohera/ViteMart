import express from 'express'
const orderItemsRoute = express.Router()

import { getAllOrderItemsHandler, newOrderItemHandler, updateOrderItemHandler } from '../../Controllers/BuyerController/orderItemController.js';
import { isBuyer, userAuth } from '../../Middlewares/auth.js';
orderItemsRoute.post('/neworder_item' , userAuth , isBuyer , newOrderItemHandler);
orderItemsRoute.patch('/updateorder_item' , userAuth , isBuyer , updateOrderItemHandler);
orderItemsRoute.get('/order/items' , userAuth , isBuyer , getAllOrderItemsHandler);

export default orderItemsRoute;