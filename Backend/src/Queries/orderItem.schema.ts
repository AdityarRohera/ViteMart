

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
    AND O.status IN ('cart' , 'pending_payment');
`

// export const getAllOrderItemsQuery = `
//     SELECT P.id, P.label , P.selling_price , OI.quantity , OI.id
//     FROM orderitems OI
//     JOIN orders O ON O.id = OI.order_id
//     JOIN products P ON P.id = OI.product_id
//     WHERE O.buyers_id = $1
//     AND O.status = 'cart';
// `

    // export const getAllOrderItemsQuery = `
    //     SELECT 
        // O.id AS order_id,
        // O.total_products,
        // O.total_amount,
        // P.id AS product_id,
        // P.label,
        // P.selling_price,
        // P.product_url,
        // OI.quantity,
        // OI.id AS order_item_id,
        // U.name AS seller_name
    // FROM orderitems OI
    // JOIN orders O ON O.id = OI.order_id
    // JOIN products P ON P.id = OI.product_id
    // JOIN users U ON U.id = P.vendor_id
    // WHERE O.buyers_id = $1
    // AND O.status = 'cart';
    // `

    export const getAllOrderItemsQuery = `
            SELECT
            O.id AS order_id,
            O.total_products,
            O.total_amount,

            P.id AS product_id,
            P.label,
            P.selling_price,
            P.product_url,

            OI.quantity,
            OI.id AS order_item_id,

            U.name AS seller_name

            FROM orders O
            JOIN orderitems OI ON OI.order_id = O.id
            JOIN products P ON P.id = OI.product_id
            JOIN users U ON U.id = P.vendor_id
            WHERE O.buyers_id = $1 AND O.status IN ('cart' , 'pending_payment');
    `




    // vendor get incmoing orders items 

    // export const getIncomingOrdersQuery = `
    //     SELECT 
    //     oi.id,
    //     oi.quantity,
    //     oi.added_at as Date,
    //     p.selling_price,
    //     p.id AS product_id,
    //     p.label AS product_name,
    //     b.id AS buyer_id,
    //     b.name,
    //     b.email
    //     FROM orderitems oi
    //     JOIN orders o ON o.id = oi.order_id
    //     JOIN products p ON p.id = oi.product_id
    //     JOIN users b ON b.id = o.buyers_id
    //     WHERE p.vendor_id = $1 AND oi.order_id = $2
    //     AND o.status = 'paid';
    // `

    export const getIncomingOrdersQuery = `
    SELECT 
    o.id AS order_id,
    o.created_at,
    o.status,
    sum(p.selling_price * oi.quantity) As total_order_price,

    b.id AS buyer_id,
    b.name,
    b.email,

    json_agg(
        json_build_object(
            'product_id', p.id,
            'product_name', p.label,
            'price', p.selling_price,
            'quantity', oi.quantity,
            'image' , p.product_url,
            'order_id' , o.id
        )
    ) AS items

    FROM orders o

    JOIN orderitems oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    JOIN users b ON b.id = o.buyers_id

    WHERE 
    p.vendor_id = $1
    AND o.status IN ('paid' , 'shipped' , 'delivered')

    GROUP BY 
    o.id, o.created_at, b.id, b.name, b.email
    ORDER BY o.updated_at DESC;
    `

    export const recentIncomingOrderQuery = `
    SELECT 
    o.id AS order_id,
    o.created_at,
    o.status,
    sum(p.selling_price * oi.quantity) As total_order_price,

    b.id AS buyer_id,
    b.name,
    b.email,

    json_agg(
        json_build_object(
            'product_id', p.id,
            'product_name', p.label,
            'price', p.selling_price,
            'quantity', oi.quantity,
            'image' , p.product_url,
            'order_id' , o.id
        )
    ) AS items

    FROM orders o

    JOIN orderitems oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    JOIN users b ON b.id = o.buyers_id

    WHERE 
    p.vendor_id = $1
    AND o.status IN ('paid' , 'shipped')

    GROUP BY 
    o.id, o.created_at, b.id, b.name, b.email
    ORDER BY o.updated_at DESC
    LIMIT 6;
    `

  export const getSingleIncomingOrderQuery = `
    SELECT 
    o.id AS order_id,
    o.created_at,
    o.status,
    sum(p.selling_price * oi.quantity) As total_order_price,

    b.id AS buyer_id,
    b.name,
    b.email,
    
    ps.method, 

    json_agg(
        json_build_object(
            'product_id', p.id,
            'product_name', p.label,
            'buying_price' , p.buying_price,
            'price', p.selling_price,
            'quantity', oi.quantity,
            'image' , p.product_url,
            'order_id' , o.id
        )
    ) AS items

    FROM orders o

    JOIN orderitems oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    JOIN users b ON b.id = o.buyers_id
    JOIN payments ps on ps.order_id = o.id

    WHERE 
    p.vendor_id = $1 AND o.id = $2
    AND o.status IN ('paid' , 'shipped' , 'delivered')

    GROUP BY 
    o.id, o.created_at, ps.method , o.status, b.id, b.name, b.email;
    `