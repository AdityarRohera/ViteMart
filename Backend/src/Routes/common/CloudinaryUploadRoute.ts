import express from 'express'
import multer from 'multer'

import { imageUploadHandler } from '../../Controllers/common/cloudinaryUploadController.js';
const cloudinaryUploadRoute = express.Router()

const upload = multer({ dest: './src/public/data/uploads/' })

cloudinaryUploadRoute.post('/uploadImage' , upload.single('productUrl') ,  imageUploadHandler);

export default cloudinaryUploadRoute;