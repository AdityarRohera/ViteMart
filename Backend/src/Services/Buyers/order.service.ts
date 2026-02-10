
import pool from "../../Config/dbConnect.js"

import { createOrderQuery } from "../../Queries/order.schema.js"

export const createOrder = ({buyer_id , delivery_at} : any) => {
    return pool.query(createOrderQuery , [buyer_id , delivery_at])
}