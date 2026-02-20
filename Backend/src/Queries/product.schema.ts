

export const newProductQuery = `
    INSERT INTO products(label , description , buying_price , selling_price , category_id , product_url , vendor_id)
    VALUES($1 , $2 , $3 , $4 , $5 , $6 , $7)
    RETURNING *;
`

export const updateProductQuery = `
UPDATE products
SET
  label = $1,
  description = $2,
  buying_price = $3,
  selling_price = $4,
  category_id = $5,
  product_url = $6,
  updated_at = NOW()
WHERE id = $7
RETURNING *;
`;

export const updateProductStatusQuery = `
UPDATE products
SET
  status = $1
WHERE id = $2
RETURNING *;
`;


export const getProductQuery = `
SELECT * FROM products WHERE id = $1
`

export const getAllProductsQuery =`
SELECT P.id,
       P.label,
       P.buying_price,
       P.selling_price,
       C.name,
       P.product_url,
       P.status,
       P.created_at,
       P.updated_at,
       I.quantity_available,
       I.location
    FROM products P
    JOIN categories C ON C.id = P.category_id
    JOIN inventory I ON I.product_id = P.id
    WHERE P.vendor_id = $1;

`

// buyer's Query 

// ALl shoping products of buyer's 
export const buyersProductQuery = `
SELECT 
       P.id,
       P.label,
       P.selling_price,
       C.name AS category_name,
       P.product_url
FROM products P
JOIN categories C ON C.id = P.category_id
WHERE P.status = 'Published';
`;

// Getting single shop products
export const singleBuyersProductQuery = `
SELECT 
       P.id,
       P.label,
       P.description,
       P.selling_price,
       C.name AS category_name,
       P.product_url
FROM products P
JOIN categories C ON C.id = P.category_id
WHERE P.id = $1;
`;
