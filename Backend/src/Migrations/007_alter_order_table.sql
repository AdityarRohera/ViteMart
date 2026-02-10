

ALTER TABLE orders DROP COLUMN vendor_id;
ALTER TABLE orders DROP COLUMN ordercancelled;


ALTER TABLE orders 
ALTER COLUMN delivery_at DROP NOT NULL;

ALTER TABLE orders RENAME COLUMN users_id TO buyer_id;
