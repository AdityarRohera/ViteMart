import pool from "../Config/dbConnect.js"


// import db queries here 
import { findUserByEmail , getUserQuery, insertUser } from "../Queries/user.schema.js"

export const findUser = (email : string) => {
    return pool.query(findUserByEmail , [email])
}

export const newUser = ({name , email , password , role} : any) => {
    return pool.query(insertUser , [name , email , password , role])
}

export const getUser = (userId : string) => {
    return pool.query(getUserQuery , [userId])
}