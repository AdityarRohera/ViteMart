

import pool from "../../Config/dbConnect.js";
import { getVendorsOrderQuery } from "../../Queries/orderItem.schema.js";

export const getVendorsOrders = (vendor_id : any) => {
    return pool.query(getVendorsOrderQuery , [vendor_id])
}