import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
dotenv.config()
import cloudinaryConnect from './Config/cloudinaryConfig.js';
cloudinaryConnect();

const app = express()
const port = process.env.PORT || 3000; 

app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));
app.use(cookieParser());

// payment route
import paymentRoute from './Routes/Buyers/PaymentRoute.js';
app.use('/api/v1' , paymentRoute);

app.use(express.json());

import userRoute from './Routes/UserRoute.js';
app.use('/api/v1' , userRoute);

// vendors api import and use 
import vendorProductRoute from './Routes/Vendors/ProductRoute.js';
import vendorInventoryRoute from './Routes/Vendors/InventoryRoute.js';
import vendorsOrdersRoute from './Routes/Vendors/IncomingOrdersRoute.js';
import catogoryRoute from './Routes/Vendors/CatogoriesRoute.js';
app.use('/api/v1' , vendorProductRoute)
app.use('/api/v1' , vendorInventoryRoute);
app.use('/api/v1' , vendorsOrdersRoute)
app.use('/api/v1' , catogoryRoute)

// common routes
import cloudinaryUploadRoute from './Routes/common/CloudinaryUploadRoute.js';
app.use('/api/v1' , cloudinaryUploadRoute);


// Buyers api import and use 
import buyerProductRoute from './Routes/Buyers/ProductRoute.js';
import buyerOderRoute from './Routes/Buyers/OrderRoute.js';
import orderItemsRoute from './Routes/Buyers/OrderItemsRoute.js';

app.use('/api/v1' , buyerProductRoute);
app.use('/api/v1' , buyerOderRoute);
app.use('/api/v1' , orderItemsRoute);



app.listen(port, () => {
  console.log(` App listening on port ${port}`)
})
