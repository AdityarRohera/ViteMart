import { loginSchema, registerSchema } from "@/lib/validation/auth.schema";
import axios from "axios";
import { BASE_URL, USER_API_ENDPOINT } from "../apiConfig";



export const registerUser = async({toast , router , name , email , password  , confirmPassword , role} : any) => {
    try{

        // first validation
        const parsed = registerSchema.safeParse({name , email , password , confirmPassword , role})
        if(!parsed.success){
            const message = parsed.error.issues[0].message;
            console.log("Zod error : " , message);
            return toast.error(message);
        }
        

        const res = await axios.post(`${BASE_URL}${USER_API_ENDPOINT.REGISTER}` , {name , email , password , role}, {withCredentials: true});

        console.log("Register response:", res);
        // Axios success response
        if (res.data?.success) {
            toast.success(res.data.message || "Register successful!");
            router.push('/login');
        } else {
            toast.error(res.data?.message || "Registration failed");
        }

    } catch(err: any){
        const errorMessage = err.response?.data?.message || err.message || "Registration failed";
        console.log("Error comes in register user -> " , err);
        toast.error(errorMessage);
    }
}

export const loginUser = async({toast , email , password , role} : any) => {
    try{

        // first validation
        const parsed = loginSchema.safeParse({email , password , role});
        
        if(!parsed.success){
            const message = parsed.error.issues[0].message;
            toast.error(message);
            return false;
        }
        

        const res = await axios.post(`${BASE_URL}${USER_API_ENDPOINT.LOGIN}` , {email , password , role}, {withCredentials: true});

        console.log("Login response:", res);

        // Axios success response
        if (res.data?.success === true) {
            toast.success(res.data.message || "Login successful!");
            return true;
        }

        toast.error(res.data?.message || "Login failed");
        return false;

    } catch(err: any){
        const message = err.response?.data?.message || err.message || "Login failed";
        console.log("Error comes in register user -> " , err);
        toast.error(message);
        return false;
    }
}

export const fetchUser = async(cookieStore : any) => {
    try{
        

        if(cookieStore){
            const res = await axios.get(`${BASE_URL}${USER_API_ENDPOINT.ME}` , {headers : {cookie : cookieStore}});
            // console.log("Inside fetchUser for server comps -> " , res)
            return res.data.user;

        } else {
            const res = await axios.get(`${BASE_URL}${USER_API_ENDPOINT.ME}` , {withCredentials : true});
            return res.data.user;
        }
        
    } catch(err: any){
         const errorMessage = err.response?.data?.message || err.message || "Registration failed";
         console.log("Error comes in register user -> " , errorMessage);
         return null;
    }
}

export const logout = async() => {
    try{
        await axios.post(`${BASE_URL}${USER_API_ENDPOINT.LOGOUT}` , {} , {withCredentials : true})
    } catch(err){
        console.log("Logout error ->" , err)
    }
}