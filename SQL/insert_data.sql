-- Insert single record
INSERT INTO users (id, name, email, age) 
VALUES (1, 'John Doe', 'john@example.com', 25);

-- Insert multiple records
INSERT INTO users (id, name, email, age) 
VALUES 
    (2, 'Jane Smith', 'jane@example.com', 30),
    (3, 'Bob Johnson', 'bob@example.com', 35),
    (4, 'Alice Brown', 'alice@example.com', 28);

-- Insert with some NULL values
INSERT INTO users (id, name, email) 
VALUES (5, 'Mike Wilson', 'mike@example.com');

-- Insert orders
INSERT INTO orders (user_id, product_name, quantity, price, order_date)
VALUES 
    (1, 'Laptop', 1, 999.99, '2024-01-15'),
    (2, 'Mouse', 2, 25.50, '2024-01-16'),
    (3, 'Keyboard', 1, 75.00, '2024-01-17');
