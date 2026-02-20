
import pool from "../../Config/dbConnect.js"

import { checkorderCreatedQuery, createOrderQuery } from "../../Queries/order.schema.js"

export const createOrder = (buyer_id : any) => {
    return pool.query(createOrderQuery , [buyer_id])
}

export const checkOrderCreated = (buyer_id : any) => {
    return pool.query(checkorderCreatedQuery , [buyer_id])
}