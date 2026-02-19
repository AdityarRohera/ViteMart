import express from 'express'
const catogoryRoute = express.Router()

import { getCategoriesHandler, newCategoryHandler } from '../../Controllers/VendorController/catogoryController.js';
import { userAuth } from '../../Middlewares/auth.js';
catogoryRoute.post('/newCategory' , userAuth ,  newCategoryHandler);
catogoryRoute.get('/categories' , userAuth , getCategoriesHandler)

export default catogoryRoute;