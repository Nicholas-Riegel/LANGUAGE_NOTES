-- Add new column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Add column with default value
ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active';

-- Drop column
ALTER TABLE users DROP COLUMN phone;

-- Modify column type
ALTER TABLE users MODIFY COLUMN age SMALLINT;

-- Rename column (MySQL)
ALTER TABLE users CHANGE COLUMN name full_name VARCHAR(100);

-- Add constraint
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);

-- Drop constraint
ALTER TABLE users DROP CONSTRAINT unique_email;

-- Add foreign key constraint
ALTER TABLE orders 
ADD CONSTRAINT fk_user_id 
FOREIGN KEY (user_id) REFERENCES users(id);

-- Drop foreign key constraint
ALTER TABLE orders DROP FOREIGN KEY fk_user_id;
