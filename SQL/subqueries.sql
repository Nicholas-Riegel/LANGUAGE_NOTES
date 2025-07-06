-- Basic subquery in WHERE clause
SELECT * FROM users 
WHERE age > (SELECT AVG(age) FROM users);

-- Subquery with IN
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE price > 100);

-- Subquery with EXISTS
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- Subquery in SELECT clause
SELECT 
    name,
    age,
    (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as order_count
FROM users;

-- Subquery in FROM clause
SELECT avg_age_by_category.age_category, avg_age_by_category.avg_age
FROM (
    SELECT 
        CASE 
            WHEN age < 25 THEN 'Young'
            WHEN age BETWEEN 25 AND 35 THEN 'Adult'
            ELSE 'Mature'
        END as age_category,
        AVG(age) as avg_age
    FROM users
    GROUP BY age_category
) as avg_age_by_category;
