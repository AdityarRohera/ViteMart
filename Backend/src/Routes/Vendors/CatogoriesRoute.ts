import express from 'express'
const catogoryRoute = express.Router()

import { newCategoryHandler } from '../../Controllers/VendorController/catogoryController.js';
catogoryRoute.post('/newCategory' , newCategoryHandler);
// vendorInventoryRoute.patch('/update_inventory' , updateInventoryHandler);

export default catogoryRoute;