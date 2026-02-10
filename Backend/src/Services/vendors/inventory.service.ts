import pool from "../../Config/dbConnect.js"


import { newInventoryQuery } from "../../Queries/inventory.schema.js";

export const newInventory = ({product_id , quantity_available , location} : any) => {
    return pool.query(newInventoryQuery , [product_id , quantity_available , location]);
}