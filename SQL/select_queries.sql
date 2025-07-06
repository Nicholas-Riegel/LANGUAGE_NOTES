-- Basic SELECT
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- Select with WHERE clause
SELECT * FROM users WHERE age > 25;

-- Select with multiple conditions
SELECT * FROM users WHERE age > 25 AND email LIKE '%@example.com';

-- Select with ORDER BY
SELECT * FROM users ORDER BY age DESC;

-- Select with LIMIT
SELECT * FROM users ORDER BY age DESC LIMIT 3;

-- Select with COUNT
SELECT COUNT(*) FROM users;

-- Select with GROUP BY
SELECT age, COUNT(*) as user_count 
FROM users 
GROUP BY age;

-- Select with HAVING
SELECT age, COUNT(*) as user_count 
FROM users 
GROUP BY age 
HAVING COUNT(*) > 1;

-- Select with LIKE pattern matching
SELECT * FROM users WHERE name LIKE 'J%';

-- Select with IN clause
SELECT * FROM users WHERE age IN (25, 30, 35);

-- Select with BETWEEN
SELECT * FROM users WHERE age BETWEEN 25 AND 35;
