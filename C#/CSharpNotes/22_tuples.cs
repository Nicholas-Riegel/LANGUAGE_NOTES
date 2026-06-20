namespace F22;

public static class Tuples
{
    public static void Run()
    {
        // =============================================
        // VALUE TUPLES  (C# 7+)
        // =============================================

        // Tuples group multiple values without a class/struct
        // ValueTuple is a lightweight value type (stack-allocated)

        // ---- Create ----
        (int, string) unnamed = (1, "Alice");
        Console.WriteLine(unnamed.Item1);   // 1
        Console.WriteLine(unnamed.Item2);   // Alice

        // Named elements (preferred — much clearer)
        (int id, string name) person = (42, "Nicholas");
        Console.WriteLine(person.id);       // 42
        Console.WriteLine(person.name);     // Nicholas

        // var with named tuple
        var point = (X: 3.0, Y: 4.0);
        Console.WriteLine($"({point.X}, {point.Y})");   // (3, 4)

        // =============================================
        // RETURNING MULTIPLE VALUES FROM A METHOD
        // =============================================

        var (min, max, avg) = GetStats(new[] { 3, 1, 4, 1, 5, 9, 2, 6 });
        Console.WriteLine($"Min={min}, Max={max}, Avg={avg:F1}");   // Min=1, Max=9, Avg=3.9

        // =============================================
        // DECONSTRUCTION
        // =============================================

        // Deconstruct a tuple into separate variables
        var coords = (X: 10, Y: 20, Z: 30);

        var (x, y, z) = coords;
        Console.WriteLine($"x={x}, y={y}, z={z}");   // x=10, y=20, z=30

        // Discard values you don't need with _
        var (_, second, _) = coords;
        Console.WriteLine(second);   // 20

        // ---- Deconstruct records and classes ----
        // Records auto-generate Deconstruct
        var p = new PersonRecord("Alice", "Smith", 30);
        var (first, last, age) = p;
        Console.WriteLine($"{first} {last}, {age}");   // Alice Smith, 30

        // ---- Swap two variables elegantly ----
        int a = 1, b = 2;
        (a, b) = (b, a);
        Console.WriteLine($"a={a}, b={b}");   // a=2, b=1

        // =============================================
        // TUPLES IN LINQ
        // =============================================

        string[] names = { "Alice", "Bob", "Charlie", "Dave" };
        var indexed = names.Select((name, i) => (Index: i, Name: name));
        foreach (var (idx, name) in indexed)
            Console.WriteLine($"{idx}: {name}");

        // =============================================
        // TUPLE EQUALITY
        // =============================================

        var t1 = (1, "hello");
        var t2 = (1, "hello");
        Console.WriteLine(t1 == t2);    // True  (element-wise comparison)
        Console.WriteLine(t1 != t2);    // False

        // =============================================
        // NESTED TUPLES
        // =============================================

        var nested = ((1, 2), (3, 4));
        Console.WriteLine(nested.Item1.Item1);   // 1
        Console.WriteLine(nested.Item2.Item2);   // 4

        // =============================================
        // WHEN TO USE TUPLES vs RECORDS vs CLASSES
        // =============================================

        // Tuple      — quick, local, private (return 2-3 values from a private method)
        // Record     — named, immutable, public API, equality-based comparison
        // Class      — mutable, complex behaviour, public API
        // AVOID exposing tuples in public APIs — use records or named types instead
    }

    static (int min, int max, double avg) GetStats(int[] arr)
    {
        return (arr.Min(), arr.Max(), arr.Average());
    }
}

// Used for record deconstruction demo
public record PersonRecord(string FirstName, string LastName, int Age);
