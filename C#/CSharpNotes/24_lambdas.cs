namespace F24;

public static class Lambdas
{
    public static void Run()
    {
        // =============================================
        // LAMBDA SYNTAX
        // =============================================

        // (parameters) => expression         — expression lambda (single expression)
        // (parameters) => { statements; }    — statement lambda

        // Single param — parens optional
        Func<int, int> square = x => x * x;
        Console.WriteLine(square(5));       // 25

        // Multiple params
        Func<int, int, int> add = (a, b) => a + b;
        Console.WriteLine(add(3, 4));       // 7

        // Statement lambda
        Func<int, string> describe = n =>
        {
            if (n > 0) return "positive";
            if (n < 0) return "negative";
            return "zero";
        };
        Console.WriteLine(describe(-5));    // negative

        // No return value — Action<T>
        Action<string> greet = name => Console.WriteLine($"Hello, {name}!");
        greet("Nicholas");                  // Hello, Nicholas!

        // No params
        Action printHello = () => Console.WriteLine("Hello!");
        printHello();

        // =============================================
        // FUNC<T>  — delegate for methods that return a value
        // =============================================

        // Func<TResult>           — () => TResult
        // Func<T, TResult>        — (T) => TResult
        // Func<T1, T2, TResult>   — (T1, T2) => TResult
        // ... up to Func<T1..T16, TResult>

        Func<double, double> sqrt     = Math.Sqrt;   // method group — assigns a method directly
        Func<int, bool>      isEven   = n => n % 2 == 0;
        Func<string, string> shout    = s => s.ToUpper() + "!";

        Console.WriteLine(sqrt(16));         // 4
        Console.WriteLine(isEven(7));        // False
        Console.WriteLine(shout("hello"));   // HELLO!

        // =============================================
        // ACTION<T>  — delegate for void methods
        // =============================================

        Action<string, int> repeat = (s, n) =>
        {
            for (int i = 0; i < n; i++) Console.Write(s + " ");
            Console.WriteLine();
        };
        repeat("hi", 3);    // hi hi hi

        // =============================================
        // PREDICATE<T>  — Func<T, bool> shorthand
        // =============================================

        Predicate<int> isPositive = n => n > 0;
        Console.WriteLine(isPositive(5));    // True
        Console.WriteLine(isPositive(-3));   // False

        // Predicate is often used with List<T>.FindAll, Exists etc.
        var numbers = new List<int> { -3, -1, 0, 2, 5, 8 };
        var positive = numbers.FindAll(isPositive);
        Console.WriteLine(string.Join(", ", positive));   // 2, 5, 8

        // =============================================
        // LAMBDAS WITH LINQ  (the main use case)
        // =============================================

        var data = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        var evens   = data.Where(n => n % 2 == 0);
        var squares = data.Select(n => n * n);
        var sum     = data.Where(n => n > 5).Sum();

        Console.WriteLine(string.Join(", ", evens));    // 2, 4, 6, 8, 10
        Console.WriteLine(string.Join(", ", squares));  // 1, 4, 9, 16, 25 ...
        Console.WriteLine(sum);                          // 40

        // Sorting with lambda
        var names = new[] { "Charlie", "Alice", "Bob", "Dave" };
        var sorted = names.OrderBy(n => n.Length).ThenBy(n => n);
        Console.WriteLine(string.Join(", ", sorted));   // Bob, Alice, Dave, Charlie

        // =============================================
        // CLOSURES  — lambda captures outer variables
        // =============================================

        int multiplier = 3;
        Func<int, int> triple = x => x * multiplier;   // captures 'multiplier'

        Console.WriteLine(triple(5));    // 15

        // The captured variable is shared — mutation is visible
        multiplier = 10;
        Console.WriteLine(triple(5));    // 50  (changed!)

        // ---- Closure in a loop — classic gotcha ----
        var funcs = new List<Func<int>>();
        for (int i = 0; i < 3; i++)
        {
            int captured = i;   // capture a COPY — each iteration gets its own variable
            funcs.Add(() => captured);
        }
        foreach (var f in funcs)
            Console.Write(f() + " ");   // 0 1 2  (correct — each captured its own copy)
        Console.WriteLine();

        // Without 'int captured = i', all closures would capture the SAME 'i'
        // and all return 3 after the loop ends

        // =============================================
        // HIGHER-ORDER FUNCTIONS  — functions that take/return functions
        // =============================================

        Func<int, Func<int, int>> adder = x => y => x + y;  // currying
        var add5 = adder(5);
        Console.WriteLine(add5(3));    // 8
        Console.WriteLine(add5(10));   // 15

        // Apply a transformation to each element
        static IEnumerable<TResult> Map<T, TResult>(IEnumerable<T> source, Func<T, TResult> transform)
            => source.Select(transform);

        var doubled = Map(new[] { 1, 2, 3 }, x => x * 2);
        Console.WriteLine(string.Join(", ", doubled));   // 2, 4, 6
    }
}
