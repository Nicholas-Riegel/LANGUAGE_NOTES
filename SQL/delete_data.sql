-- Delete specific record
DELETE FROM users WHERE id = 5;

-- Delete with condition
DELETE FROM users WHERE age < 25;

-- Delete with multiple conditions
DELETE FROM orders 
WHERE price < 30 AND order_date < '2024-01-16';

-- Delete with JOIN (MySQL syntax)
DELETE u FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.price < 50;

-- Delete all records (be very careful!)
-- DELETE FROM users;

-- Delete with LIMIT (MySQL)
DELETE FROM users 
WHERE age > 35 
LIMIT 1;
