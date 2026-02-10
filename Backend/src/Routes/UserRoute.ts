import express from 'express'
const userRoute = express.Router()

import { registerUserHandler , loginUserHandler } from '../Controllers/userController.js';
userRoute.post('/auth/register' , registerUserHandler);
userRoute.post('/auth/login' , loginUserHandler);
// userRoute.get('/auth/profile' , userProfile);

export default userRoute;