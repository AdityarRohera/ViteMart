import express from 'express'
const userRoute = express.Router()

import { userAuth , isBuyer } from '../Middlewares/auth.js';


import { userProfile } from '../Controllers/userController.js';

import { registerUserHandler , loginUserHandler } from '../Controllers/userController.js';
userRoute.post('/auth/register' , registerUserHandler);
userRoute.post('/auth/login' , loginUserHandler);
userRoute.get('/me' ,userAuth , isBuyer ,  userProfile);

export default userRoute;