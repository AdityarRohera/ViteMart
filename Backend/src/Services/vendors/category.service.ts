

import pool from "../../Config/dbConnect.js";
import { newCategoryQuery } from "../../Queries/category.schema.js";

export const newCategory = ({name , description} : any) => {
    return pool.query(newCategoryQuery , [name , description]);
}