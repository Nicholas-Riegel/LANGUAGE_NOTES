-- Create a view
CREATE VIEW user_orders AS
SELECT 
    u.id,
    u.name,
    u.email,
    o.product_name,
    o.price,
    o.order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Use the view
SELECT * FROM user_orders;

-- View with aggregation
CREATE VIEW user_summary AS
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.price), 0) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email;

-- Use the aggregated view
SELECT * FROM user_summary WHERE total_orders > 0;

-- Drop view
DROP VIEW IF EXISTS user_orders;
