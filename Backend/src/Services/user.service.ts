import pool from "../Config/dbConnect.js"


// import db queries here 
import { findUserByEmail , insertUser, userRole } from "../Queries/user.schema.js"

export const findUser = (email : string) => {
    return pool.query(findUserByEmail , [email])
}

export const newUser = ({name , email , password , role} : any) => {
    return pool.query(insertUser , [name , email , password , role])
}

export const getUserRoles = (userId : string) => {
    return pool.query(userRole , [userId])
}