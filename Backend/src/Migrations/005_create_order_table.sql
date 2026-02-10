

CREATE TYPE status_type AS ENUM ('pending' , 'created' , 'confirmed');


CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    users_id UUID NOT NULL,
    vendor_id UUID NOT NULL,
    status status_type DEFAULT 'pending',
    total_products INT DEFAULT 0,
    total_amount NUMERIC(10,2) NOT NULL,
    delivery_at TIMESTAMP NOT NULL,
    ordercancelled BOOLEAN DEFAULT FALSE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    FOREIGN KEY (users_id) REFERENCES users(id)
    FOREIGN KEY (vendor_id) REFERENCES users(id)
)