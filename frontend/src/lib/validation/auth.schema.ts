import * as z from 'zod';


export const registerSchema = z.object({
    name : z.string().min(3 , 'name is too short'),
    email : z.email({message : 'Invalid user email'}),
    password : z.string().min(7 , { message: "Password must be at least 7 characters long"}),
     confirmPassword: z.string(),
    role : z.enum(['Buyer' , 'Vendor' , 'Admin'] , {message : "Role must be are 'Buyer' , 'Vendor' or 'Admin' "})
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});


export const loginSchema = z.object({
    email : z.email({message : 'Invalid user email'}),
    password : z.string().min(7 , { message: "Password must be at least 7 characters long"}),
    role : z.enum(['Buyer' , 'Vendor' , 'Admin'] , {message : "Role must be are 'Buyer' , 'Vendor' or 'Admin'"})
})
