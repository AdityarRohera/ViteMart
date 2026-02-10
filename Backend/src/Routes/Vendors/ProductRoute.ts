import express from 'express'
const vendorProductRoute = express.Router()

import { newProductHandler } from '../../Controllers/VendorController/productController.js';
vendorProductRoute.post('/newproduct' , newProductHandler);

export default vendorProductRoute;