import express from 'express'
import { isVendor, userAuth } from '../../Middlewares/auth.js';
import {getAllIncomingOrdersHandler, getSingleIncomingOrdersHandler, updateOrderStatusHandler } from '../../Controllers/VendorController/incomingOrdersController.js';
const vendorsOrdersRoute = express.Router()


// vendorsOrdersRoute.post('/new_inventory' , newInventoryHandler);
// vendorInventoryRoute.patch('/update_inventory' , updateInventoryHandler);

vendorsOrdersRoute.get('/incoming-orders' , userAuth , isVendor , getAllIncomingOrdersHandler);
vendorsOrdersRoute.get('/incoming-order/:order_id' , userAuth , isVendor  , getSingleIncomingOrdersHandler);
vendorsOrdersRoute.put('/update-status' , userAuth , isVendor , updateOrderStatusHandler);

export default vendorsOrdersRoute;