import express from 'express'
const vendorInventoryRoute = express.Router()

import { getInventoryHandler, newInventoryHandler } from '../../Controllers/VendorController/inventoryController.js';
import { isVendor, userAuth } from '../../Middlewares/auth.js';

vendorInventoryRoute.post('/newInventory' , userAuth , isVendor , newInventoryHandler);
vendorInventoryRoute.get('/inventory/:product_id' , userAuth , isVendor , getInventoryHandler);

export default vendorInventoryRoute;