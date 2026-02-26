import pool from "../../Config/dbConnect.js"
import { updateOrderStatusQ } from "../../Queries/order.schema.js"
import { getIncomingOrdersQuery, getSingleIncomingOrderQuery, recentIncomingOrderQuery } from "../../Queries/orderItem.schema.js"


export const getIncomingOrders = (vendor_id : string) => {
    return pool.query(getIncomingOrdersQuery , [vendor_id])
}

export const getSingleIncomingOrder = (vendor_id : any , order_id : any) => {
    return pool.query(getSingleIncomingOrderQuery , [vendor_id , order_id])
}

export const updateOrderStatus = ({status , order_id} : any) => {
    return pool.query(updateOrderStatusQ , [status , order_id])
}

export const getRecentOrders = (vendor_id : any) => {
    return pool.query(recentIncomingOrderQuery , [vendor_id]);
}