import express from 'express'
import { isBuyer, userAuth } from '../../Middlewares/auth.js';
import { buyersProductsHandler, buyersSingleProductsHandler, categoryProductsHandler, productRecommendationHandler } from '../../Controllers/BuyerController/buyerProductController.js';
const buyerProductRoute = express.Router()


buyerProductRoute.get('/buyer/products' , userAuth , isBuyer , buyersProductsHandler);
buyerProductRoute.get('/buyer/singleProduct/:productId' , userAuth , isBuyer , buyersSingleProductsHandler);

// category products 
buyerProductRoute.get('/buyer/products/:categoryId' , categoryProductsHandler);

// recommendation products 
buyerProductRoute.get('/buyer/recommendation-products' , userAuth , isBuyer ,productRecommendationHandler);

export default buyerProductRoute;