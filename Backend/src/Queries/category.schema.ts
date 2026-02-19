
export const newCategoryQuery = `
    INSERT INTO categories (name , description)
    VALUES ($1 , $2)
    RETURNING *;
`

export const getCategoriesQuery = `
    SELECT * FROM "categories";
`