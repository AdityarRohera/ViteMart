

CREATE TYPE role_type AS ENUM ('Buyer' , 'Vendor' , 'Admin');

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email = LOWER(email)),
    password VARCHAR(255) NOT NULL,
    role role_type NOT NULL DEFAULT 'Buyer'
    location TEXT ,
    contact VARCHAR(15) DEFAULT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)