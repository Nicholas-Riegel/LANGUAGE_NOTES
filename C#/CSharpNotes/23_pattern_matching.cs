namespace F23;

// =============================================
// PATTERN MATCHING  (C# 7+, greatly expanded in C# 8–11)
// =============================================

// Pattern matching lets you test an expression against a shape/value
// and extract parts of it — cleaner than chains of if/is/cast

public static class PatternMatching
{
    public static void Run()
    {
        // =============================================
        // TYPE PATTERN  (is T variable)
        // =============================================

        object obj = "Hello, World!";

        if (obj is string s)
            Console.WriteLine(s.ToUpper());   // HELLO, WORLD!

        if (obj is int n)
            Console.WriteLine(n);             // not reached
        else
            Console.WriteLine("Not an int"); // Not an int

        // =============================================
        // CONSTANT PATTERN
        // =============================================

        int val = 42;
        if (val is 42)
            Console.WriteLine("It's 42");

        if (val is not 0)
            Console.WriteLine("Non-zero");   // Non-zero

        // =============================================
        // RELATIONAL PATTERNS  (C# 9+)
        // =============================================

        int score = 78;
        string grade = score switch
        {
            >= 90            => "A",
            >= 80 and < 90   => "B",
            >= 70 and < 80   => "C",
            >= 60 and < 70   => "D",
            _                => "F"
        };
        Console.WriteLine(grade);   // C

        // =============================================
        // LOGICAL PATTERNS  (and, or, not — C# 9+)
        // =============================================

        bool IsWeekday(string day) => day is
            "Monday" or "Tuesday" or "Wednesday" or "Thursday" or "Friday";

        Console.WriteLine(IsWeekday("Monday"));   // True
        Console.WriteLine(IsWeekday("Sunday"));   // False

        object o = null!;
        if (o is not null)
            Console.WriteLine("not null");
        else
            Console.WriteLine("null");   // null

        // =============================================
        // PROPERTY PATTERN  (match on property values — C# 8+)
        // =============================================

        var person = new Employee("Alice", 45000, "Dev");
        string tier = person switch
        {
            { Salary: > 80000 }                  => "Senior",
            { Salary: > 50000, Department: "Dev" } => "Mid Dev",
            { Salary: > 40000 }                  => "Junior",
            _                                    => "Entry"
        };
        Console.WriteLine(tier);   // Junior

        // Nested property pattern
        var order = new Order(new Address("Zurich", "CH"), 150m);
        bool isCH = order is { ShipTo: { Country: "CH" } };
        Console.WriteLine(isCH);    // True

        // =============================================
        // POSITIONAL PATTERN  (deconstruct + match — C# 8+)
        // =============================================

        var pt = new Point2(3, 0);
        string quadrant = pt switch
        {
            (0, 0)        => "Origin",
            (> 0, > 0)    => "Q1",
            (< 0, > 0)    => "Q2",
            (< 0, < 0)    => "Q3",
            (> 0, < 0)    => "Q4",
            (> 0, 0)      => "X axis (positive)",
            _             => "Other"
        };
        Console.WriteLine(quadrant);   // X axis (positive)

        // =============================================
        // LIST PATTERN  (C# 11+)
        // =============================================

        int[] arr1 = { 1, 2, 3 };
        int[] arr2 = { 1, 2, 3, 4, 5 };
        int[] empty = { };

        Console.WriteLine(arr1 is [1, 2, 3]);           // True
        Console.WriteLine(arr2 is [1, 2, ..]);           // True  (..) = rest
        Console.WriteLine(arr2 is [1, .., 5]);           // True
        Console.WriteLine(empty is []);                  // True

        // Capture the 'rest' with a variable
        if (arr2 is [int head, .. int[] tail])
        {
            Console.WriteLine(head);                     // 1
            Console.WriteLine(string.Join(", ", tail));  // 2, 3, 4, 5
        }

        // =============================================
        // SWITCH EXPRESSION ON TYPE  (C# 8+)
        // =============================================

        object[] things = { 42, "hi", 3.14, true, null! };
        foreach (object t in things)
        {
            string desc = t switch
            {
                int i      => $"int: {i}",
                string str => $"string: {str}",
                double d   => $"double: {d}",
                bool b     => $"bool: {b}",
                null       => "null",
                _          => "other"
            };
            Console.WriteLine(desc);
        }
    }
}

// Support types
public record Employee(string Name, decimal Salary, string Department);
public record Address(string City, string Country);
public record Order(Address ShipTo, decimal Total);

public record Point2(int X, int Y)
{
    public void Deconstruct(out int x, out int y) => (x, y) = (X, Y);
}
