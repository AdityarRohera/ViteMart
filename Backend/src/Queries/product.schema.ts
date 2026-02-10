

export const newProductQuery = `
    INSERT INTO products(label , quantity , buying_price , selling_price , category_id , product_url , vendor_id)
    VALUES[$1 , $2 , $3 , $4 , $5 , $6 , $7]
    RETURNING *
`