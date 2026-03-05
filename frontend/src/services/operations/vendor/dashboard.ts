import { BASE_URL, VENDOR_DASHBOARD_ENDPOINT } from "@/services/apiConfig";
import axios from "axios";

export const vendorInfo = async(cookieStored : any) => {
    try{    

           console.log("Inside getting vendor info");

           const res = await axios.get(`${BASE_URL}${VENDOR_DASHBOARD_ENDPOINT.INFO}` ,{headers : {cookie : cookieStored}})
           console.log("Vendor info ->" , res);

           if(res.data.success){
                return res.data.result
           }
           
            return null;

    } catch(err : unknown){
        console.log("Error comes in getting single incoming order -> " , err);
        return null;
    }
}