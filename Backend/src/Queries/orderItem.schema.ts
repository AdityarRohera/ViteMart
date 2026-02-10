

export const newOrderItemQuery = `
    INSERT INTO orderItems (product_id, order_id, quantity) 
    VALUES ($1, $2, $3)
    RETURNING *;
`

export const updateOrderItemQuery = `
    UPDATE orderItems
    SET quantity = quantity + 1
    WHERE id = $1
    RETURNING *;
`

export const getOrderItemProductQuery = `
    SELECT * FROM orderItems 
    WHERE id = $1;
`

export const getVendorsOrderQuery = `
    SELECT p.label , p.quantity , p.buying_price , p.selling_price , c.name as category , p.product_url, i.quantity as orderQuantity , i.added_at as orderTime FROM orderItems i
    WHERE p.vendor_id = $1;
    JOIN products p ON p.id = i.product_id
    JOIN category c ON c.id = p.category_id;
`