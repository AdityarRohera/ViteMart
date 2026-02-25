import { BASE_URL, PAYMENTS_ENDPOINTS } from "@/services/apiConfig";
import axios from "axios";


export const createOrder = async({amount , currency , order_id} : any) => {
    try{

        console.log("Inside create order frontend")
        const res = await axios.post(`${BASE_URL}${PAYMENTS_ENDPOINTS.CREATEORDER}` , {amount , currency , order_id} , {withCredentials : true})
        console.log("frontend getting order details -> " , res.data);

        if(res.data.success){
            return res.data.res
        }

    } catch(err){
        console.log("Error comes in creating order for payments -> " , err);
        return null;
    }
}