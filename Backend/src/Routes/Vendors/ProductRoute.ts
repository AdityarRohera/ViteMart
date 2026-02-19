import express from 'express'
const vendorProductRoute = express.Router()

import { fetchAllProductsHandler, fetchProductHandler, newProductHandler } from '../../Controllers/VendorController/productController.js';
import { isVendor, userAuth } from '../../Middlewares/auth.js';
vendorProductRoute.post('/newproduct' , userAuth , isVendor ,  newProductHandler);
vendorProductRoute.get('/product/:productId' , userAuth , fetchProductHandler);
vendorProductRoute.get('/allProducts' , userAuth , isVendor , fetchAllProductsHandler);
export default vendorProductRoute;