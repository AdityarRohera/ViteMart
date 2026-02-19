import {v2 as cloudinary} from 'cloudinary'

export const uploadFile = async({file , fileType} : any) => {
    const upload =  await cloudinary.uploader.upload(file.path , {resource_type : fileType , folder : 'vibeMart/productImages' , use_filename: true ,  filename_override: file.originalname})
    return upload;
}


export const isFileSupport = (fileType: any, supportType : any) => {
    if(supportType.includes(fileType)){
        return true;
    }
    return false;
}