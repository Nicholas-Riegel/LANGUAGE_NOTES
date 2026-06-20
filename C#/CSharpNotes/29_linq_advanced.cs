namespace F29;

// =============================================
// LINQ ADVANCED
// =============================================

public static class LinqAdvanced
{
    record Product(string Name, string Category, decimal Price, int Stock);
    record Order(int Id, string CustomerName, List<OrderLine> Lines);
    record OrderLine(string ProductName, int Qty, decimal UnitPrice);

    static readonly List<Product> Products = new()
    {
        new("Laptop",   "Electronics", 999m,  10),
        new("Phone",    "Electronics", 699m,  25),
        new("Desk",     "Furniture",   350m,  5),
        new("Chair",    "Furniture",   200m,  8),
        new("Monitor",  "Electronics", 450m,  15),
        new("Keyboard", "Electronics", 89m,   30),
    };

    public static void Run()
    {
        // =============================================
        // SELECTMANY  — flatten nested collections
        // =============================================

        // Like a nested foreach — takes 1 item, produces 0..N items
        var orders = new List<Order>
        {
            new(1, "Alice", new() { new("Laptop", 1, 999m), new("Keyboard", 2, 89m) }),
            new(2, "Bob",   new() { new("Phone", 1, 699m) }),
            new(3, "Carol", new() { new("Monitor", 1, 450m), new("Keyboard", 1, 89m) }),
        };

        // All lines across all orders
        var allLines = orders.SelectMany(o => o.Lines);
        foreach (var line in allLines)
            Console.WriteLine($"{line.ProductName} x{line.Qty}");

        // With parent selector — get (order, line) pairs
        var withOrder = orders.SelectMany(o => o.Lines,
            (order, line) => new { order.CustomerName, line.ProductName, line.Qty });
        foreach (var x in withOrder)
            Console.WriteLine($"{x.CustomerName} ordered {x.Qty}x {x.ProductName}");

        // =============================================
        // JOIN
        // =============================================

        // LINQ join = SQL INNER JOIN
        var categories = new[]
        {
            new { Name = "Electronics", TaxRate = 0.19m },
            new { Name = "Furniture",   TaxRate = 0.07m },
        };

        var withTax = Products.Join(
            categories,
            product  => product.Category,    // outer key
            cat      => cat.Name,            // inner key
            (product, cat) => new            // result selector
            {
                product.Name,
                product.Price,
                Tax = product.Price * cat.TaxRate
            });

        foreach (var item in withTax)
            Console.WriteLine($"{item.Name}: {item.Price:C} + {item.Tax:C} tax");

        // =============================================
        // GROUPJOIN  — LEFT OUTER JOIN equivalent
        // =============================================

        var departments = new[] { "Electronics", "Furniture", "Books" };
        var leftJoin = departments.GroupJoin(
            Products,
            dept    => dept,
            product => product.Category,
            (dept, products) => new
            {
                Department = dept,
                Count      = products.Count(),
                Items      = products.Select(p => p.Name)
            });

        foreach (var d in leftJoin)
            Console.WriteLine($"{d.Department}: [{string.Join(", ", d.Items)}]");
        // Electronics: [Laptop, Phone, Monitor, Keyboard]
        // Furniture:   [Desk, Chair]
        // Books:       []  ← no products, not dropped

        // =============================================
        // TAKE / SKIP  (pagination)
        // =============================================

        var page1 = Products.OrderBy(p => p.Name).Take(3);
        var page2 = Products.OrderBy(p => p.Name).Skip(3).Take(3);
        Console.WriteLine(string.Join(", ", page1.Select(p => p.Name)));   // Chair, Desk, Keyboard
        Console.WriteLine(string.Join(", ", page2.Select(p => p.Name)));   // Laptop, Monitor, Phone

        // TakeWhile / SkipWhile  — condition-based
        var cheap = Products.OrderBy(p => p.Price).TakeWhile(p => p.Price < 500);
        Console.WriteLine(string.Join(", ", cheap.Select(p => p.Name)));   // Keyboard, Chair, Desk

        // =============================================
        // DISTINCT / UNION / INTERSECT / EXCEPT
        // =============================================

        var cats  = Products.Select(p => p.Category).Distinct();
        Console.WriteLine(string.Join(", ", cats));   // Electronics, Furniture

        var a = new[] { 1, 2, 3, 4 };
        var b = new[] { 3, 4, 5, 6 };
        Console.WriteLine(string.Join(", ", a.Union(b)));      // 1,2,3,4,5,6
        Console.WriteLine(string.Join(", ", a.Intersect(b)));  // 3,4
        Console.WriteLine(string.Join(", ", a.Except(b)));     // 1,2

        // =============================================
        // ZIP  — pair up two sequences
        // =============================================

        var names  = new[] { "Alice", "Bob", "Carol" };
        var scores = new[] { 90, 85, 78 };
        var paired = names.Zip(scores, (name, score) => $"{name}: {score}");
        Console.WriteLine(string.Join(", ", paired));   // Alice: 90, Bob: 85, Carol: 78

        // =============================================
        // AGGREGATE  — custom fold / reduce
        // =============================================

        int[] nums = { 1, 2, 3, 4, 5 };

        // Product of all numbers
        int product = nums.Aggregate((acc, n) => acc * n);
        Console.WriteLine(product);    // 120

        // With seed value
        string sentence = nums.Aggregate("Numbers:", (acc, n) => acc + " " + n);
        Console.WriteLine(sentence);   // Numbers: 1 2 3 4 5

        // =============================================
        // CHUNK  (C# 6+ / .NET 6)
        // =============================================

        var chunks = Enumerable.Range(1, 10).Chunk(3);   // System.Linq built-in (.NET 6+)
        foreach (var chunk in chunks)
            Console.WriteLine(string.Join(", ", chunk));

        // =============================================
        // LINQ PERFORMANCE NOTES
        // =============================================

        // Deferred execution — query runs when enumerated, not when defined
        // Multiple enumerations — calling .ToList() once is more efficient than iterating twice
        // Large datasets — use database-side LINQ (Entity Framework) for filtering at source
        // Short-circuit — Any(), First() stop as soon as result is found
    }
}
