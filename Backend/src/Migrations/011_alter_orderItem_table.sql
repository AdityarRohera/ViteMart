

ALTER TABLE orderitems ALTER COLUMN quantity SET NOT NULL;

ALTER TABLE orderitems ADD CONSTRAINT quantity_should_not_be_negative CHECK(quantity >= 0)