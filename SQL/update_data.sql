-- Update single record
UPDATE users 
SET age = 26 
WHERE id = 1;

-- Update multiple columns
UPDATE users 
SET name = 'John Smith', email = 'johnsmith@example.com' 
WHERE id = 1;

-- Update with calculation
UPDATE orders 
SET price = price * 1.1 
WHERE order_date < '2024-01-17';

-- Update with condition
UPDATE users 
SET age = age + 1 
WHERE age < 30;

-- Update with JOIN (MySQL syntax)
UPDATE users u
INNER JOIN orders o ON u.id = o.user_id
SET u.name = CONCAT(u.name, ' (Customer)')
WHERE o.price > 100;

-- Update all records (be careful!)
-- UPDATE users SET age = age + 1;
