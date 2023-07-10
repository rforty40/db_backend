import { v2 as cloudinary } from "cloudinary";
//variables de entorno
import {
  CLOUDINARY_NAME,
  API_KEY_CLOUDINARY,
  API_SECRET_CLOUDINARY,
} from "../config.js";

// Configura la conexión a Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINARY,
});

export default cloudinary;
