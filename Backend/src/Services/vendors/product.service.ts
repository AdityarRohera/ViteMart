
import pool from "../../Config/dbConnect.js";

import { newProductQuery } from "../../Queries/product.schema.js";

export const newProduct = ({label , buying_price , selling_price , category_id , product_url , vendor_id} : any) => {
    return pool.query(newProductQuery , [label , buying_price , selling_price , category_id , product_url , vendor_id]);
}