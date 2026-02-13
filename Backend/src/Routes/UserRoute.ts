import express from 'express'
const userRoute = express.Router()

import { userAuth , isBuyer } from '../Middlewares/auth.js';
import { logoutHandler } from '../Controllers/userController.js';


import { userProfile } from '../Controllers/userController.js';

import { registerUserHandler , loginUserHandler } from '../Controllers/userController.js';
userRoute.post('/auth/register' , registerUserHandler);
userRoute.post('/auth/login' , loginUserHandler);
userRoute.post('/logout' , logoutHandler);
userRoute.get('/me' ,userAuth ,  userProfile);

export default userRoute;