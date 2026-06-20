namespace F26;

// =============================================
// EXTENSION METHODS  — add methods to existing types without subclassing
// =============================================

// Rules:
//   1. Must be in a static class
//   2. Method must be static
//   3. First parameter uses 'this' keyword — that's the type being extended

public static class StringExtensions
{
    // Extend string
    public static bool IsNullOrEmpty(this string? s) => string.IsNullOrEmpty(s);

    public static string Repeat(this string s, int times) =>
        string.Concat(Enumerable.Repeat(s, times));

    public static string Truncate(this string s, int maxLength) =>
        s.Length <= maxLength ? s : s[..maxLength] + "…";

    public static string ToPascalCase(this string s)
    {
        if (string.IsNullOrEmpty(s)) return s;
        return string.Concat(s.Split(' ')
            .Select(word => char.ToUpper(word[0]) + word[1..].ToLower()));
    }

    public static bool IsValidEmail(this string s) =>
        s.Contains('@') && s.Contains('.') && s.IndexOf('@') < s.LastIndexOf('.');
}

public static class IntExtensions
{
    public static bool IsEven(this int n) => n % 2 == 0;
    public static bool IsOdd(this int n)  => n % 2 != 0;
    public static int  Squared(this int n) => n * n;
    public static IEnumerable<int> To(this int start, int end)
    {
        for (int i = start; i <= end; i++) yield return i;
    }
}

public static class EnumerableExtensions
{
    // Extend IEnumerable<T> — works for any collection
    public static IEnumerable<T> WhereNotNull<T>(this IEnumerable<T?> source)
        where T : class
    {
        foreach (var item in source)
            if (item != null) yield return item;
    }

    public static string JoinWith<T>(this IEnumerable<T> source, string separator) =>
        string.Join(separator, source);

    public static IEnumerable<IEnumerable<T>> ChunkBy<T>(this IEnumerable<T> source, int size)
    {
        var list = source.ToList();
        for (int i = 0; i < list.Count; i += size)
            yield return list.Skip(i).Take(size);
    }
}

public static class ExtensionMethods
{
    public static void Run()
    {
        // ---- String extensions ----
        string name = "nicholas smith";
        Console.WriteLine(name.ToPascalCase());       // NicholasSmith
        Console.WriteLine("hi ".Repeat(3));           // hi hi hi
        Console.WriteLine("Hello, World!".Truncate(7)); // Hello,…

        string email = "user@example.com";
        Console.WriteLine(email.IsValidEmail());      // True
        Console.WriteLine("notanemail".IsValidEmail()); // False

        // ---- Int extensions ----
        Console.WriteLine(4.IsEven());     // True
        Console.WriteLine(7.IsOdd());      // True
        Console.WriteLine(5.Squared());    // 25

        // Range via extension method
        foreach (int n in 1.To(5))
            Console.Write(n + " ");   // 1 2 3 4 5
        Console.WriteLine();

        // ---- IEnumerable extensions ----
        string?[] items = { "apple", null, "banana", null, "cherry" };
        var nonNull = items.WhereNotNull();
        Console.WriteLine(nonNull.JoinWith(", "));    // apple, banana, cherry

        var numbers = Enumerable.Range(1, 10);
        foreach (var chunk in numbers.ChunkBy(3))
            Console.WriteLine(chunk.JoinWith(", "));
        // 1, 2, 3
        // 4, 5, 6
        // 7, 8, 9
        // 10

        // ---- Extensions look like instance methods ----
        // The compiler just rewrites:
        //   "hello".Repeat(3)
        // into:
        //   StringExtensions.Repeat("hello", 3)
        // The 'this' parameter is passed as the first argument

        // ---- Extensions can be on interfaces ----
        // LINQ itself is all extension methods on IEnumerable<T>
        // That's why .Where(), .Select(), .OrderBy() work on List, Array, etc.

        // ---- Pitfall: extensions don't override instance methods ----
        // If the type already has a method with the same name, the instance method wins
        // Extensions only apply when no instance method matches
    }
}
