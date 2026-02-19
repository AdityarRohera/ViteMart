


ALTER TABLE products ADD COLUMN description TEXT DEFAULT NULL;


CREATE TYPE product_status AS ENUM ('Draft' , 'Published');

ALTER TABLE products ADD COLUMN status product_status DEFAULT 'Draft';
