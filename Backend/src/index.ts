import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000; 

import userRoute from './Routes/UserRoute.js';
app.use('api/v1' , userRoute);

// vendors api import and use 
import vendorProductRoute from './Routes/Vendors/ProductRoute.js';
app.use('/api/v1' , vendorProductRoute)

// Buyers api import and use 
import buyerProductRoute from './Routes/Buyers/ProductRoute.js';
app.use('/api/v1' , buyerProductRoute)

app.listen(port, () => {
  console.log(` App listening on port ${port}`)
})
