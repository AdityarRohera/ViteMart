
import pool from "../../Config/dbConnect.js";

import { getAllProductsQuery, getProductQuery, newProductQuery, updateProductQuery, updateProductStatusQuery } from "../../Queries/product.schema.js";

export const newProduct = ({label , description ,  buying_price , selling_price , category_id , product_url , vendor_id} : any) => {
    return pool.query(newProductQuery , [label , description ,  buying_price , selling_price , category_id||null , product_url , vendor_id]);
}

export const updateProduct = ({label , description ,  buying_price , selling_price , category_id , product_url , productId} : any) => {
    console.log("Inside update service -> " , label , description ,  buying_price , selling_price , category_id , product_url , productId)
    return pool.query(updateProductQuery , [label , description ,  buying_price , selling_price , category_id||null , product_url , productId]);
}

export const updateProductStatus = ({product_id , status} : any) => {
    return pool.query(updateProductStatusQuery , [status , product_id])
}

export const getProduct = (productId : any) => {
    return pool.query(getProductQuery , [productId])
}

export const getAllProducts = (vendor_id : any) => {
    return pool.query(getAllProductsQuery , [vendor_id]);
}