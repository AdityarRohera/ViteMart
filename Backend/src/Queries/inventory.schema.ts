

export const newInventoryQuery = `
    INSERT INTO inventory(product_id , quantity_available , location)
    VALUES($1 , $2 , $3)
    RETURNING *;
`

export const getInventoryQuery = `
SELECT * FROM inventory WHERE product_id = $1;
`

export const updateInventoryQuery = `
UPDATE inventory
SET quantity_available = $1 , location = $2
WHERE product_id = $3
RETURNING *;
`