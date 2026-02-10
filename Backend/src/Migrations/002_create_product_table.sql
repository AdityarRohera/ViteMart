
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    buying_price NUMERIC(10,2) NOT NULL,
    selling_price NUMERIC(10,2) NOT NULL CHECK (selling_price > buying_price),
    category_id UUID,
    product_url TEXT NOT NULL,
    total_purchases INT DEFAULT 0,
    vendor_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE CASCADE
)