namespace F07;

public static class Methods
{
    public static void Run()
    {
        // =============================================
        // BASIC METHOD CALL
        // =============================================

        int sum = Add(3, 4);
        Console.WriteLine(sum);             // 7

        Greet("Nicholas");                  // Hello, Nicholas!

        // =============================================
        // OPTIONAL PARAMETERS  (must be last)
        // =============================================

        Console.WriteLine(Power(2));        // 4   (exponent defaults to 2)
        Console.WriteLine(Power(2, 10));    // 1024

        // =============================================
        // NAMED ARGUMENTS  (order doesn't matter)
        // =============================================

        Console.WriteLine(Divide(dividend: 10, divisor: 2));   // 5
        Console.WriteLine(Divide(divisor: 2, dividend: 10));   // 5  (same result)

        // =============================================
        // REF  (pass by reference — caller's variable is modified)
        // =============================================

        int val = 10;
        Double(ref val);
        Console.WriteLine(val);     // 20  (original variable was changed)

        // =============================================
        // OUT  (method returns multiple values via out params)
        // =============================================

        Minmax(new[] { 3, 1, 4, 1, 5, 9 }, out int min, out int max);
        Console.WriteLine($"Min: {min}, Max: {max}");   // Min: 1, Max: 9

        // out variables can be declared inline (C# 7+)
        if (int.TryParse("42", out int parsed))
            Console.WriteLine(parsed);   // 42

        // =============================================
        // IN  (pass by reference, read-only — avoids copying large structs)
        // =============================================

        // in is for performance — the method cannot modify the variable
        // mostly used with large value types (structs)
        // PrintValue(in val);

        // =============================================
        // PARAMS  (variable number of arguments)
        // =============================================

        Console.WriteLine(SumAll(1, 2, 3));          // 6
        Console.WriteLine(SumAll(1, 2, 3, 4, 5));    // 15
        Console.WriteLine(SumAll());                  // 0

        // =============================================
        // METHOD OVERLOADING  (same name, different signature)
        // =============================================

        Console.WriteLine(Describe(42));              // Number: 42
        Console.WriteLine(Describe("hello"));         // Text: hello
        Console.WriteLine(Describe(3.14));            // Double: 3.14

        // =============================================
        // EXPRESSION-BODIED METHODS  (=> for single-expression methods)
        // =============================================

        Console.WriteLine(Square(7));     // 49
        Console.WriteLine(IsEven(4));     // True

        // =============================================
        // LOCAL FUNCTIONS  (C# 7+ — functions inside functions)
        // =============================================

        int Factorial(int n)
        {
            // Local function can access outer scope variables
            if (n <= 1) return 1;
            return n * Factorial(n - 1);
        }

        Console.WriteLine(Factorial(5));   // 120

        // =============================================
        // STATIC vs INSTANCE methods (see 09_classes.cs)
        // =============================================
        // Static   — called on the class itself (Methods.Run())
        // Instance — called on an object (myObj.DoSomething())

        // =============================================
        // RETURN MULTIPLE VALUES  (tuples)
        // =============================================

        var (area, perimeter) = CircleMetrics(5.0);
        Console.WriteLine($"Area: {area:F2}, Perimeter: {perimeter:F2}");
        // Area: 78.54, Perimeter: 31.42
    }

    // ---- Helper methods ----

    static int Add(int a, int b) => a + b;

    static void Greet(string name) => Console.WriteLine($"Hello, {name}!");

    static double Power(double base_, int exponent = 2)    // optional param
    {
        return Math.Pow(base_, exponent);
    }

    static double Divide(double dividend, double divisor) => dividend / divisor;

    static void Double(ref int value) => value *= 2;

    static void Minmax(int[] arr, out int min, out int max)
    {
        min = arr[0];
        max = arr[0];
        foreach (int n in arr)
        {
            if (n < min) min = n;
            if (n > max) max = n;
        }
    }

    static int SumAll(params int[] numbers)   // params — array passed as individual args
    {
        int total = 0;
        foreach (int n in numbers) total += n;
        return total;
    }

    // Overloads
    static string Describe(int n)    => $"Number: {n}";
    static string Describe(string s) => $"Text: {s}";
    static string Describe(double d) => $"Double: {d}";

    // Expression-bodied
    static int    Square(int n)   => n * n;
    static bool   IsEven(int n)   => n % 2 == 0;

    // Returning a tuple
    static (double area, double perimeter) CircleMetrics(double radius)
    {
        double area      = Math.PI * radius * radius;
        double perimeter = 2 * Math.PI * radius;
        return (area, perimeter);
    }
}
