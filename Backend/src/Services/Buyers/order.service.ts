
import pool from "../../Config/dbConnect.js"

import { checkorderCreatedQuery, createOrderQuery, updateOrderStatusQuery } from "../../Queries/order.schema.js"

export const createOrder = (buyer_id : any) => {
    return pool.query(createOrderQuery , [buyer_id])
}

export const checkOrderCreated = (buyer_id : any) => {
    return pool.query(checkorderCreatedQuery , [buyer_id])
}

export const updateOrderStatus = (status : string , buyer_id : string , order_id : string) => {
    return pool.query(updateOrderStatusQuery , [status , buyer_id , order_id])
}