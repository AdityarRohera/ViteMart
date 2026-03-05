import express from 'express'
import { isVendor, userAuth } from '../../Middlewares/auth.js';
import { vendorDashboardHandler } from '../../Controllers/VendorController/dashboardController.js';
const dashboardRoute = express.Router()

dashboardRoute.get('/vendor/dashboard' , userAuth , isVendor , vendorDashboardHandler)

export default dashboardRoute;