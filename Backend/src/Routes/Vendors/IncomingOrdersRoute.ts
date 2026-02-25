import express from 'express'
import { isVendor, userAuth } from '../../Middlewares/auth.js';
import {getAllIncomingOrdersHandler } from '../../Controllers/VendorController/incomingOrdersController.js';
const vendorsOrdersRoute = express.Router()


// vendorsOrdersRoute.post('/new_inventory' , newInventoryHandler);
// vendorInventoryRoute.patch('/update_inventory' , updateInventoryHandler);

vendorsOrdersRoute.get('/incoming-orders' , userAuth , isVendor , getAllIncomingOrdersHandler);

export default vendorsOrdersRoute;