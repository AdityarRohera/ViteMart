
import axios from 'axios'
import { BASE_URL, BUYERS_ORDER_ENDPOINT, BUYERS_PRODUCT_ENDPOINT } from '../../apiConfig'

export const createOrder = async() => {
    try{    

           console.log("Inside create order handler")
           const res = await axios.post(`${BASE_URL}${BUYERS_ORDER_ENDPOINT.CREATEORDER}` , {} , {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.order
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in getting all products -> " , err);
        return null
    }
}

export const newOrderItem = async({product_id , order_id , quantity} : any) => {
    try{    

           console.log("Inside new item handler products");
           console.log(product_id , order_id , quantity);

           const res = await axios.post(`${BASE_URL}${BUYERS_ORDER_ENDPOINT.CREATEORDERITEM}` , {product_id , order_id , quantity} , {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.orderItem
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in getting all products -> " , err);
        return null
    }
}

export const getAllOrderItems = async(cookieStored : any) => {
    try{    

           console.log("Inside getting order items");

           const res = await axios.get(`${BASE_URL}${BUYERS_ORDER_ENDPOINT.GETALLORDERITEMS}` , {headers : {cookie : cookieStored}})
           console.log(res);

           if(res.data.success){
                return res.data.orderItems
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in getting all order items -> " , err);
        return null
    }
}

export const IncreaseCartQuantity = async({quantity , orderItem_id, status} : any) => {
    try{    

           console.log("Inside increase order items");

           const res = await axios.patch(`${BASE_URL}${BUYERS_ORDER_ENDPOINT.UPDATEORDERITEM}` , {quantity , orderItem_id , status} , {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.result
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in increase order items -> " , err);
        return null
    }
}

export const DecreaseCartQuantity = async({quantity , orderItem_id, status} : any) => {
    try{    

           console.log("Inside Decrease order items");

           const res = await axios.patch(`${BASE_URL}${BUYERS_ORDER_ENDPOINT.UPDATEORDERITEM}` , {quantity , orderItem_id , status} , {withCredentials : true})
           console.log(res);

           if(res.data.success){
                return res.data.result
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in Decrease order items -> " , err);
        return null
    }
}