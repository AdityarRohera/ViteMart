

export const newInventoryQuery = `
    INSERT INTO inventory(product_id , quantity_available , location)
    VALUES[$1 , $2 , $3]
    RETURNING *
`