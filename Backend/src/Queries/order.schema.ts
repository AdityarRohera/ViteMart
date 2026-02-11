

export const createOrderQuery = `
    INSERT INTO orders(buyers_id , delivery_at)
    VALUES($1 , $2)
    RETURNING *;
`

export const IncreaseOrdersQuery = `
    UPDATE orders
    SET total_products = total_products + $1,
    total_amount = $2
    WHERE id = $3;
`
export const DecreaseOrdersQuery = `
    UPDATE orders
    SET total_products = total_products - $1,
    total_amount = $2
    WHERE id = $3;
`