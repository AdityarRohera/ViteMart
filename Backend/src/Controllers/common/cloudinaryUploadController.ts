import fs from 'fs/promises'
import type { Request , Response } from "express";
import { uploadFile } from "../../Services/common/cloudinaryUpload.js";
import { isFileSupport } from "../../Services/common/cloudinaryUpload.js";

export const imageUploadHandler = async(req : Request , res : Response) => {
    let file;
    try{
        console.log("inside image upload")
         file = req.file;
        console.log(file)

        if (!file) {
                 return res.status(400).send({
                 success: false,
                 message: "imageFile required"
                 });
            }

            // checking file type

             if(!file.mimetype || !file.mimetype.startsWith("image/")){
                return res.status(400).send({
                    success : false,
                    message : `${file?.mimetype} file is not supported`
                })
                
             }

            //  // now check imageFile supported or not
            const imageSupport = ["JPG", "JPEG", "PNG", "GIF", "WEBP", "SVG"];
            const extension = file.mimetype?.split("/")[1]?.toUpperCase();
            if(!isFileSupport( extension , imageSupport)){
                return res.status(400).send({
                    success : false,
                    message : `image type ${extension} is not supported`
                })
            }

            // checking size of image for upload
                if(file.size > 5 * 1024 * 1024){
                   return res.status(400).send({
                        success : false,
                        message : "Image size should be less than or equal to 5MB"
                    })
                }

                const uploadedFile = await uploadFile({file , fileType : 'image'});
                console.log("Getting result of uploaded file -> " , uploadedFile)

                 // delete local file after upload
                await fs.unlink(file.path);

             return res.status(200).send({
                success : true,
                message : "Product Image uploaded",
                // uploadData : {secure_url: uploadImage.secure_url , publicId : uploadImage.public_id , signature : uploadImage.signature}
                 secure_url: uploadedFile.secure_url
              })
            

    } catch(err : unknown){

        if (file?.path) {
            await fs.unlink(file.path).catch(() => {});
        }

        console.log(err);
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes while upload image file to cloudinary",
                error : errorMessage
            })
    }
}