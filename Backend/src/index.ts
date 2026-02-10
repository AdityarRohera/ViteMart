import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000; 

import userRoute from './Routes/UserRoute.js';
app.use('api/v1' , userRoute);

app.listen(port, () => {
  console.log(` App listening on port ${port}`)
})
