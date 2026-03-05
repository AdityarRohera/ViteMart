import express from 'express'
const vendorProductRoute = express.Router()

import { fetchAllProductsHandler, fetchProductHandler, getSingleProductHandler, newProductHandler, topSellingProductHandler } from '../../Controllers/VendorController/productController.js';
import { isVendor, userAuth } from '../../Middlewares/auth.js';
vendorProductRoute.post('/newproduct' , userAuth , isVendor ,  newProductHandler);
vendorProductRoute.get('/product/:productId' , userAuth , fetchProductHandler);
vendorProductRoute.get('/allProducts' , userAuth , isVendor , fetchAllProductsHandler);

// get top selling products
vendorProductRoute.get('/products/top-selling' , userAuth , isVendor , topSellingProductHandler);
vendorProductRoute.get('/view-product/:productId' , userAuth , isVendor , getSingleProductHandler);
export default vendorProductRoute;