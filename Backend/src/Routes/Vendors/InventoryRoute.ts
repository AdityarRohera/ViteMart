import express from 'express'
const vendorInventoryRoute = express.Router()

import { newInventoryHandler } from '../../Controllers/VendorController/inventoryController.js';
import { isVendor, userAuth } from '../../Middlewares/auth.js';

vendorInventoryRoute.post('/newInventory' , userAuth , isVendor , newInventoryHandler);

export default vendorInventoryRoute;