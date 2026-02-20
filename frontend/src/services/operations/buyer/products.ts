
import axios from 'axios'
import { BASE_URL, BUYERS_PRODUCT_ENDPOINT } from '../../apiConfig'

export const buyersShopProducts = async(cookieStored : any) => {
    try{    

           console.log("Inside getting all products")
           const res = await axios.get(`${BASE_URL}${BUYERS_PRODUCT_ENDPOINT.ALLPRODUCTS}` , {headers : {cookie : cookieStored}})
           console.log(res);

           if(res.data.success){
                return res.data.products
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in getting all products -> " , err);
        return null
    }
}

export const singleShopProduct = async(productId : any) => {
    try{    

           console.log("Inside getting single products")
           const res = await axios.get(`${BASE_URL}${BUYERS_PRODUCT_ENDPOINT.SINGLEPRODUCT}/${productId}` , {withCredentials : true})
        //    console.log(res);

           if(res.data.success){
                return res.data.product
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in getting all products -> " , err);
        return null
    }
}