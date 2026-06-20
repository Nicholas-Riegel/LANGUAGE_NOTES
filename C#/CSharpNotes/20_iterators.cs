namespace F20;

// =============================================
// ITERATORS  — custom sequences with yield
// =============================================

// IEnumerable<T> — something you can iterate over (foreach)
// IEnumerator<T> — the actual cursor (MoveNext, Current, Reset)
// yield return   — produces one item at a time lazily (no List built up in memory)

public static class IteratorExamples
{
    // Simple generator — runs lazily; each yield pauses and resumes
    public static IEnumerable<int> CountUp(int from, int to)
    {
        for (int i = from; i <= to; i++)
        {
            yield return i;   // pause, hand value to caller, resume on next iteration
        }
    }

    // Infinite sequence — safe because it's lazy (never materialised all at once)
    public static IEnumerable<int> Fibonacci()
    {
        int a = 0, b = 1;
        while (true)
        {
            yield return a;
            (a, b) = (b, a + b);
        }
    }

    // yield break — stop the sequence early
    public static IEnumerable<int> TakeWhilePositive(IEnumerable<int> source)
    {
        foreach (int n in source)
        {
            if (n < 0) yield break;   // stop iterating
            yield return n;
        }
    }

    // Flatten a nested collection
    public static IEnumerable<T> Flatten<T>(IEnumerable<IEnumerable<T>> nested)
    {
        foreach (var inner in nested)
            foreach (T item in inner)
                yield return item;
    }
}

// =============================================
// CUSTOM ITERABLE CLASS  (implementing IEnumerable<T>)
// =============================================

public class NumberRange : IEnumerable<int>
{
    private readonly int _start;
    private readonly int _end;

    public NumberRange(int start, int end) { _start = start; _end = end; }

    public IEnumerator<int> GetEnumerator()
    {
        for (int i = _start; i <= _end; i++)
            yield return i;   // using yield in GetEnumerator is fine
    }

    // Required for non-generic IEnumerable
    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        => GetEnumerator();
}

// =============================================
// DEMO
// =============================================

public static class Iterators
{
    public static void Run()
    {
        // ---- CountUp generator ----
        foreach (int n in IteratorExamples.CountUp(1, 5))
            Console.Write(n + " ");   // 1 2 3 4 5
        Console.WriteLine();

        // LINQ works seamlessly with IEnumerable<T>
        var evens = IteratorExamples.CountUp(1, 20).Where(n => n % 2 == 0);
        Console.WriteLine(string.Join(", ", evens));  // 2, 4, 6, 8, 10, 12, 14, 16, 18, 20

        // ---- Infinite Fibonacci (safe — lazy!) ----
        var first10Fibs = IteratorExamples.Fibonacci().Take(10);
        Console.WriteLine(string.Join(", ", first10Fibs));  // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

        // ---- yield break ----
        int[] mixed = { 3, 7, 2, -1, 5, 8 };
        var positives = IteratorExamples.TakeWhilePositive(mixed);
        Console.WriteLine(string.Join(", ", positives));  // 3, 7, 2

        // ---- Flatten ----
        var nested = new[] { new[] { 1, 2 }, new[] { 3, 4, 5 }, new[] { 6 } };
        var flat = IteratorExamples.Flatten(nested);
        Console.WriteLine(string.Join(", ", flat));   // 1, 2, 3, 4, 5, 6

        // ---- Custom iterable class ----
        var range = new NumberRange(5, 10);
        foreach (int n in range)
            Console.Write(n + " ");   // 5 6 7 8 9 10
        Console.WriteLine();

        // ---- Key lazy behaviour ----
        // Iterators do NOT run until enumerated
        // This means no work happens until you call foreach / ToList / First etc.
        Console.WriteLine("Creating iterator...");
        var lazy = IteratorExamples.CountUp(1, 3);    // nothing runs yet
        Console.WriteLine("Starting iteration...");
        foreach (int n in lazy)                        // runs NOW
            Console.Write(n + " ");
        Console.WriteLine();

        // ---- Materialise vs lazy ----
        // ToList()  materialises the entire sequence into memory immediately
        // Take(n)   + lazy avoids evaluating more than needed
        var firstFib = IteratorExamples.Fibonacci().First(n => n > 100);
        Console.WriteLine(firstFib);   // 144
    }
}
