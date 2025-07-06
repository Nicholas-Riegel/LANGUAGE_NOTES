-- Aggregate functions
SELECT 
    COUNT(*) as total_users,
    AVG(age) as average_age,
    MIN(age) as youngest,
    MAX(age) as oldest,
    SUM(age) as total_age
FROM users;

-- String functions
SELECT 
    name,
    UPPER(name) as name_upper,
    LOWER(name) as name_lower,
    LENGTH(name) as name_length,
    SUBSTRING(name, 1, 3) as name_first_3,
    CONCAT(name, ' - ', email) as name_email
FROM users;

-- Date functions
SELECT 
    order_date,
    YEAR(order_date) as order_year,
    MONTH(order_date) as order_month,
    DAY(order_date) as order_day,
    DATEDIFF(CURRENT_DATE, order_date) as days_ago
FROM orders;

-- Conditional functions
SELECT 
    name,
    age,
    CASE 
        WHEN age < 25 THEN 'Young'
        WHEN age BETWEEN 25 AND 35 THEN 'Adult'
        ELSE 'Mature'
    END as age_category
FROM users;

-- NULL handling
SELECT 
    name,
    age,
    COALESCE(age, 0) as age_with_default,
    IFNULL(age, 'Unknown') as age_or_unknown
FROM users;
