import express from 'express'
import { isBuyer, userAuth } from '../../Middlewares/auth.js';
import { buyersProductsHandler, buyersSingleProductsHandler } from '../../Controllers/BuyerController/buyerProductController.js';
const buyerProductRoute = express.Router()


buyerProductRoute.get('/buyer/products' , userAuth , isBuyer , buyersProductsHandler);
buyerProductRoute.get('/buyer/singleProduct/:productId' , userAuth , isBuyer , buyersSingleProductsHandler);

export default buyerProductRoute;