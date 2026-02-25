import pool from "../../Config/dbConnect.js"
import { getIncomingOrdersQuery } from "../../Queries/orderItem.schema.js"


export const getIncomingOrders = (vendor_id : string) => {
    return pool.query(getIncomingOrdersQuery , [vendor_id])
}