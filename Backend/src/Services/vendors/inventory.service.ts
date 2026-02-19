import pool from "../../Config/dbConnect.js"


import { getInventoryQuery, newInventoryQuery, updateInventoryQuery } from "../../Queries/inventory.schema.js";

export const newInventory = ({product_id , quantity_available , location} : any) => {
    return pool.query(newInventoryQuery , [product_id , quantity_available , location]);
}

export const getInventory = (product_id : any) => {
    return pool.query(getInventoryQuery , [product_id])
}

export const updateInventory = ({product_id , quantity_available , location} : any) => {
    return pool.query(updateInventoryQuery , [quantity_available , location , product_id]);
}