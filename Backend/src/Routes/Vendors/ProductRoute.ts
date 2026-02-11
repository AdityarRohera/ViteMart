import express from 'express'
const vendorProductRoute = express.Router()

import { newProductHandler } from '../../Controllers/VendorController/productController.js';
import { isVendor, userAuth } from '../../Middlewares/auth.js';
vendorProductRoute.post('/newproduct' , userAuth , isVendor ,  newProductHandler);

export default vendorProductRoute;