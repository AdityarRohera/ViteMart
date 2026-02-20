

export const newOrderItemQuery = `
    INSERT INTO orderItems (product_id, order_id, quantity) 
    VALUES ($1, $2, $3)
    RETURNING *;
`

// export const incraseOrderItemQuery = `
//     UPDATE orderItems
//     SET quantity = quantity + $1
//     WHERE id = $2
//     RETURNING *;
// `
// export const decreaseOrderItemQuery = `
//     UPDATE orderItems
//     SET quantity = quantity - $1
//     WHERE id = $2
//     RETURNING *;
// `

export const updateOrderItemsQuery = `
    UPDATE orderItems
    SET quantity = $1
    WHERE id = $2
    RETURNING *;
`

export const deletOrderItemQuery = `
    DELETE FROM orderitems WHERE id = $1;
`
export const findOrderItemQuery = `
    SELECT OI.id , OI.order_id , OI.quantity , P.selling_price FROM orderitems OI
    JOIN products P ON P.id = OI.product_id
    WHERE OI.id = $1;
`

export const getOrderItemProductQuery = `
    SELECT * FROM products 
    WHERE id = $1;
`

export const getVendorsOrderQuery = `
    SELECT p.label , p.quantity , p.buying_price , p.selling_price , c.name as category , p.product_url, i.quantity as orderQuantity , i.added_at as orderTime FROM orderItems i
    WHERE p.vendor_id = $1;
    JOIN products p ON p.id = i.product_id
    JOIN category c ON c.id = p.category_id;
`


export const checkItemAddedOrNotQuery = `
    SELECT O.status
    FROM orderitems OI
    JOIN orders O ON O.id = OI.order_id
    WHERE OI.product_id = $1
    AND O.buyers_id = $2
    AND O.status = 'cart';
`

export const getAllOrderItemsQuery = `
    SELECT OI.product_id, OI.quantity , OI.id
    FROM orderitems OI
    JOIN orders O ON O.id = OI.order_id
    WHERE O.buyers_id = $1
    AND O.status = 'cart';

`