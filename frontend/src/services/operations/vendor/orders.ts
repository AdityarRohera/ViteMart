
import { BASE_URL, VENDORS_ORDER_ENDPOINT } from "@/services/apiConfig";
import axios from "axios";

export const getIncomingOrders = async() => {
    try{    

           console.log("Inside getting all incoming orders");

           const res = await axios.get(`${BASE_URL}${VENDORS_ORDER_ENDPOINT.INCOMINGORDERS}` , {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.result
           }
           
            return [];

    } catch(err : unknown){
        console.log("Error comes in getting all incoming orders -> " , err);
        return []
    }
}

export const getSingleIncomingOrders = async(cookieStored : any , order_id : any) => {
    try{    

           console.log("Inside getting single incoming order");

           const res = await axios.get(`${BASE_URL}${VENDORS_ORDER_ENDPOINT.SINGLEORDER}/${order_id}` , {headers : {cookie : cookieStored}})
           console.log(res);

           if(res.data.success){
                return res.data.result
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in getting single incoming order -> " , err);
        return null
    }
}

export const updateOrderStatus = async(status : string ,order_id : string) => {
    try{    

           console.log("Inside getting single incoming order");

           const res = await axios.put(`${BASE_URL}${VENDORS_ORDER_ENDPOINT.UPDATESTATUS}` , {status , order_id} , {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.result
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in getting single incoming order -> " , err);
        return null
    }
}

export const getRecentOrders = async(cookieStored : any) => {
    try{    

           console.log("Inside getting single incoming order");

           const res = await axios.get(`${BASE_URL}${VENDORS_ORDER_ENDPOINT.RECENTORDERS}` ,{headers : {cookie : cookieStored}})
           console.log(res);

           if(res.data.success){
                return res.data.result
           }
           
            return [];

    } catch(err : unknown){
        console.log("Error comes in getting single incoming order -> " , err);
        return []
    }
}