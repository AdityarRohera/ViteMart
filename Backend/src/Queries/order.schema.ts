

export const createOrderQuery = `
    INSERT INTO orders(buyers_id)
    VALUES($1)
    RETURNING *;
`

export const IncreaseOrdersQuery = `
    UPDATE orders
    SET total_products = total_products + $1,
    total_amount = total_amount +  $2
    WHERE id = $3;
`
export const DecreaseOrdersQuery = `
    UPDATE orders
    SET total_products = total_products - $1,
    total_amount = total_amount - $2
    WHERE id = $3;
`

export const checkorderCreatedQuery = `
    SELECT * FROM orders
    WHERE buyers_id = $1 AND status = 'cart';
`