-- Create index for faster queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_age ON users(age);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_date ON orders(order_date);

-- Create composite index
CREATE INDEX idx_users_name_age ON users(name, age);

-- Create unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Show indexes
SHOW INDEX FROM users;

-- Drop index
DROP INDEX idx_users_age ON users;
