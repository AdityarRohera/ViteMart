import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000; 

import userRoute from './Routes/UserRoute.js';
app.use('api/v1' , userRoute);

// vendors api import and use 
import vendorProductRoute from './Routes/Vendors/ProductRoute.js';
import vendorInventoryRoute from './Routes/Vendors/InventoryRoute.js';
import vendorsOrdersRoute from './Routes/Vendors/IncomingOrdersRoute.js';
app.use('/api/v1' , vendorProductRoute)
app.use('api/v1' , vendorInventoryRoute);
app.use('/api/v1' , vendorsOrdersRoute)



// Buyers api import and use 
import buyerProductRoute from './Routes/Buyers/ProductRoute.js';
import buyerOderRoute from './Routes/Buyers/OrderRoute.js';
app.use('/api/v1' , buyerProductRoute);
app.use('/api/v1' , buyerOderRoute);



app.listen(port, () => {
  console.log(` App listening on port ${port}`)
})
