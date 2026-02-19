

import pool from "../../Config/dbConnect.js";
import { getCategoriesQuery, newCategoryQuery } from "../../Queries/category.schema.js";

export const newCategory = ({name , description} : any) => {
    return pool.query(newCategoryQuery , [name , description]);
}

export const getCategories = () => {
    return pool.query(getCategoriesQuery);
}