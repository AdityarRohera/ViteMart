
import pool from "../../Config/dbConnect.js"
import { buyersProductQuery, singleBuyersProductQuery } from "../../Queries/product.schema.js"

export const getAllBuyerProducts = () => {
    return pool.query(buyersProductQuery)
}

export const getSingleBuyerProducts = (productId : any) => {
    return pool.query(singleBuyersProductQuery , [productId])
}