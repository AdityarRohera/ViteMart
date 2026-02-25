

ALTER TABLE orders DROP COLUMN vendor_id;
ALTER TABLE orders DROP COLUMN ordercancelled;


ALTER TABLE orders 
ALTER COLUMN delivery_at DROP NOT NULL;

ALTER TABLE orders RENAME COLUMN users_id TO buyer_id;

ALTER TABLE orders 
ALTER COLUMN total_amount DROP NOT NULL;

ALTER TABLE orders ALTER COLUMN total_amount SET DEFAULT 0;


    -- New orders status type
CREATE TYPE order_type AS ENUM (
    'cart',
    'pending_payment',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
); 