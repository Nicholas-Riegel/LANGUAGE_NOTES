-- INNER JOIN - only matching records
SELECT u.name, u.email, o.product_name, o.price
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN - all records from left table
SELECT u.name, u.email, o.product_name, o.price
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN - all records from right table
SELECT u.name, u.email, o.product_name, o.price
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- Join with WHERE clause
SELECT u.name, o.product_name, o.price
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.price > 50;

-- Join with aggregation
SELECT u.name, COUNT(o.id) as order_count, SUM(o.price) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Multiple table join
SELECT u.name, o.product_name, p.description
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN products p ON o.product_name = p.name;
