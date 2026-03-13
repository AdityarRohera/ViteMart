

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
    SELECT *
    FROM orders
    WHERE buyers_id = $1
    AND status IN ('cart', 'pending_payment');
`

export const updateOrderStatusQuery = `
    UPDATE orders
    SET status = $1
    WHERE id = $2 AND buyers_id = $3;
`

export const updateOrderStatusQ = `
    UPDATE orders
    SET status = $1 WHERE id = $2;
`

// vendor one day earning's 
export const oneDayEarningQuery = `
    SELECT  COALESCE(SUM(p.selling_price * oi.quantity),0) AS todays_earning FROM orders o
    JOIN orderitems oi ON oi.order_id = o.id
    JOIN products p ON  p.id = oi.product_id
    WHERE p.vendor_id = $1 AND o.status IN ('paid' , 'shipped' , 'delivered')
    AND  o.updated_at >= CURRENT_DATE
    AND o.updated_at < CURRENT_DATE + INTERVAL '1 day';
`

// vendor total earning's
export const totalEarningQuery = `
    SELECT  COALESCE(SUM(p.selling_price * oi.quantity),0) AS total_earning FROM orders o
    JOIN orderitems oi ON oi.order_id = o.id
    JOIN products p ON  p.id = oi.product_id
    WHERE p.vendor_id = $1 AND o.status IN ('paid' , 'shipped' , 'delivered');
`

// vendor total incoming orders
export const totalIncomingOrdersQuery = `
    SELECT count(DISTINCT o.id) AS IncomingOrders FROM orders o

    JOIN orderitems oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id

    WHERE 
    p.vendor_id = $1
    AND o.status IN ('paid' , 'shipped')
`

// getting buyer's recent orders for dashboard 
export const buyersRecentOrdersQuery = `
    SELECT  
            OI.id,
            O.id as orderId,
            P.label as item,
            S.name as seller,
            OI.quantity,
            (P.selling_price * OI.quantity) as amount
    FROM orders O
    JOIN orderitems OI ON OI.order_id = O.id
    JOIN products P ON P.id = OI.product_id
    JOIN users S on S.id = P.vendor_id
    WHERE O.buyers_id = $1 AND O.status IN ('paid' , 'shipped' , 'delivered' , 'cancelled')
    ORDER BY O.created_at DESC
    LIMIT 10;
`