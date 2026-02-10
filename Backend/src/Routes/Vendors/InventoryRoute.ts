import express from 'express'
const vendorInventoryRoute = express.Router()

import { newInventoryHandler } from '../../Controllers/VendorController/inventoryController.js';
vendorInventoryRoute.post('/new_inventory' , newInventoryHandler);
// vendorInventoryRoute.patch('/update_inventory' , updateInventoryHandler);

export default vendorInventoryRoute;