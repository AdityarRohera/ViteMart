import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config();


const cloudinaryConnect = () => {
  try{

    console.log(process.env.CLOUD_NAME);
    
   cloudinary.config({ 
      cloud_name: process.env.CLOUD_NAME!, 
      api_key: process.env.API_KEY!, 
      api_secret: process.env.API_SECRET!
    });

   console.log("connected to cloudinary")

  } catch(err){
    console.log('Error in connecting to cloudinary ' , err)
  }
}
export default cloudinaryConnect;