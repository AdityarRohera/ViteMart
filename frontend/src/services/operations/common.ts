
import axios from "axios";
import { BASE_URL, CATEGORY_API_ENDPOINT, COMMON } from "../apiConfig";

export const fetchCategories = async(cookieStored ? : any) => {
    try{

            const res = cookieStored ? await axios.get(`${BASE_URL}${CATEGORY_API_ENDPOINT.CATEGORIES}` , {headers : {cookie : cookieStored}})
                        : await axios.get(`${BASE_URL}${CATEGORY_API_ENDPOINT.CATEGORIES}` , {withCredentials : true});

            console.log("Getting categories -> " , res);

            if(res.data.success){
                return res.data.categories
            }

            return null;

    } catch(err : unknown){
        console.log("Error comes in fetching categories -> " , err);
        return null
    }
}

export const uploadProduct = async(file ? : any) => {
    try{

        const formData = new FormData();
        formData.append("productUrl", file);
            
        console.log(file  , "Inside upload image ")
           const res = await axios.post(`${BASE_URL}${COMMON.UPLOADIMAGE}` , formData ,  {withCredentials : true , headers : {"content-Type" : "multipart/form_data"}})
           console.log("Getting response inside uploadProduct -> " , res);

           if(res.data.success){
                return res.data.secure_url
           }

            return null;

    } catch(err : unknown){
        console.log("Error comes in fetching categories -> " , err);
        return null
    }
}