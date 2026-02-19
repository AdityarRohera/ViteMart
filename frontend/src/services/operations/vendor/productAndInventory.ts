import axios from "axios";
import { BASE_URL , VENDORS_Manage_Inventory_ENDPOINT, VENDORS_PRODUCT_ENDPOINT } from "@/services/apiConfig";


export const newProduct = async({label , description , category_id , buying_price , selling_price , product_url} : any) => {
    try{

            console.log("Not getting " , product_url , category_id)
           const res = await axios.post(`${BASE_URL}${VENDORS_PRODUCT_ENDPOINT.NEWPRODUCT}` , {label , description , category_id , buying_price , selling_price  , product_url} ,  {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.product
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in fetching categories -> " , err);
        return null
    }
}

export const updateProduct = async({label , description , category_id , buying_price , selling_price , product_url} : any , productId : any) => {
    try{

        console.log("Inside update product function ")
           console.log("Not getting " , productId , category_id)
           const res = await axios.post(`${BASE_URL}${VENDORS_PRODUCT_ENDPOINT.NEWPRODUCT}` , {label , description , category_id , buying_price , selling_price  , product_url , productId} ,  {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.product
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in fetching categories -> " , err);
        return null
    }
}

export const fetchProduct = async(productId : any) => {
    try{

           console.log("Inside fetchProduct -> " , productId)
           const res = await axios.get(`${BASE_URL}${VENDORS_PRODUCT_ENDPOINT.GETpRODUCT}/${productId}` ,  {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.product
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in fetching categories -> " , err);
        return null
    }
}

export const createInventory = async({quantity_available , location , product_id , status} : any) => {
    try{

           console.log("Inside createInventory -> " ,quantity_available , location , product_id );
           const res = await axios.post(`${BASE_URL}${VENDORS_Manage_Inventory_ENDPOINT.NEWINVENTORY}` , {quantity_available , location , product_id , status} ,  {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.Inventory
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in creating newn inventory -> " , err);
        return null
    }
}

export const getInventory = async(product_id : any) => {
    try{

           console.log("Inside getting Inventory -> " , product_id );
           const res = await axios.get(`${BASE_URL}${VENDORS_Manage_Inventory_ENDPOINT.GETINVENTORY}/${product_id}` , {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.Inventory
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in creating newn inventory -> " , err);
        return null
    }
}

export const getAllProducts = async() => {
    try{    

           console.log("Inside getting all products")
           const res = await axios.get(`${BASE_URL}${VENDORS_PRODUCT_ENDPOINT.GETALLPRODUCTS}` , {withCredentials : true})
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