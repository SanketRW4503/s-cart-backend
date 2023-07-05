import cloudinaryM from 'cloudinary'
import { config } from 'dotenv';

config({
    path: './database/config.env',
  });
  

const cloudinary= cloudinaryM.v2;
cloudinary.config({
    cloud_name: process.env.CLOUND_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_API_SECRETE
  });


export default cloudinary;