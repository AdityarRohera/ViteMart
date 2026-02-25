

// export const checkPaymentQuery = `
    // SELECT * FROM payments
    // WHERE buyer_id = $1 AND order_id = $2 AND status = 'captured';
// `

export const newPaymentQuery = `
    INSERT INTO payments(buyer_id , order_id , amount , currency ,  razorpay_order_id , status)
    VALUES($1 , $2 , $3 , $4 , $5 , $6)
    RETURNING *;
`

export const updatePaymentOrderQuery = `
    UPDATE payments
    SET buyer_id = $1 , order_id = $2 , amount = $3 , currency = $4 , razorpay_order_id = $5 , status = $6
    WHERE id = $7;
`

export const checkPaymentCreated = `
    SELECT * FROM payments
    WHERE buyer_id = $1 
    AND order_id = $2;
`

export const updatePaymentsQuery = `
    UPDATE payments
    SET status = $1,
        razorpay_payment_id = $2,
        razorpay_signature = $3
    WHERE order_id = $4 AND buyer_id = $5
`


export const existingPaymentQuery = `
    SELECT status FROM payments WHERE razorpay_payment_id = $1;
`