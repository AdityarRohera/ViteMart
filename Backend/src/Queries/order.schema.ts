

export const createOrderQuery = `
    INSERT INTO orders(buyers_id , delivery_at)
    VALUES($1 , $2)
    RETURNING *;
`

export const updateOrdersQuery = `
    UPDATE orders
    SET total_products = total_products + 1,
    total_amount = $1
    WHERE id = $2;
`