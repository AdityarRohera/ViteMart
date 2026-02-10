import express from 'express'
const vendorProductRoute = express.Router()

import { newProductHandler } from '../../Controllers/VendorController/productController.js';
vendorProductRoute.post('/createproduct' , newProductHandler);

export default vendorProductRoute;