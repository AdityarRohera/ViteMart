
export const newCategoryQuery = `
    INSERT INTO categories (name , description)
    VALUES ($1 , $2)
    RETURNING *;
`