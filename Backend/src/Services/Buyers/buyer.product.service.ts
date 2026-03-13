
import pool from "../../Config/dbConnect.js"
import { buyersProductQuery, categoryProductsQuery, recommendationProductsQuery, singleBuyersProductQuery } from "../../Queries/product.schema.js"

export const getAllBuyerProducts = () => {
    return pool.query(buyersProductQuery)
}

export const getSingleBuyerProducts = (productId : any) => {
    return pool.query(singleBuyersProductQuery , [productId])
}

export const getCategoryProduct = (categoryId : any) => {
    return pool.query(categoryProductsQuery , [categoryId])
}

export const recommendationProducts = (buyerId : any) => {
    return pool.query(recommendationProductsQuery , [buyerId]);
}