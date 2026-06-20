namespace F35;

// =============================================
// ADVANCED COLLECTIONS  — performance patterns
// =============================================

using System.Collections.Immutable;
using System.Collections.Concurrent;
using System.Buffers;

public static class CollectionsAdvanced
{
    public static void Run()
    {
        // =============================================
        // IMMUTABLELIST<T>  — thread-safe, no accidental mutation
        // =============================================

        // Creating
        ImmutableList<string> list = ImmutableList.Create("apple", "banana", "cherry");

        // All "mutating" operations return a NEW list — original is unchanged
        ImmutableList<string> withDate = list.Add("date");
        ImmutableList<string> removed  = list.Remove("banana");

        Console.WriteLine(string.Join(", ", list));      // apple, banana, cherry  (original unchanged)
        Console.WriteLine(string.Join(", ", withDate));  // apple, banana, cherry, date
        Console.WriteLine(string.Join(", ", removed));   // apple, cherry

        // ---- Other immutable collections ----
        ImmutableArray<int>     arr   = ImmutableArray.Create(1, 2, 3);
        ImmutableDictionary<string, int> dict = ImmutableDictionary<string, int>.Empty
            .Add("a", 1).Add("b", 2);
        ImmutableHashSet<int>  set = ImmutableHashSet.Create(1, 2, 3);

        Console.WriteLine(dict["a"]);    // 1

        // =============================================
        // READONLYCOLLECTION<T>  — view over a List<T> that prevents outside mutation
        // =============================================

        var mutable = new List<string> { "one", "two", "three" };
        IReadOnlyList<string> readOnly = mutable.AsReadOnly();

        // readOnly.Add("four");   ← compile error — no Add on IReadOnlyList
        Console.WriteLine(readOnly.Count);   // 3
        Console.WriteLine(readOnly[0]);      // one

        // Mutations to the underlying 'mutable' list ARE reflected
        mutable.Add("four");
        Console.WriteLine(readOnly.Count);   // 4  (same underlying list)

        // =============================================
        // CONCURRENTDICTIONARY<K,V>  — thread-safe dictionary
        // =============================================

        var concurrent = new ConcurrentDictionary<string, int>();

        // Thread-safe add/update
        concurrent.TryAdd("apple", 1);
        concurrent.AddOrUpdate("apple",
            addValue: 1,
            updateValueFactory: (key, existing) => existing + 1);

        Console.WriteLine(concurrent["apple"]);   // 2

        // GetOrAdd — get existing or compute/add new
        int val = concurrent.GetOrAdd("banana", key => key.Length);
        Console.WriteLine(val);   // 6 (length of "banana")

        // =============================================
        // ARRAYPOOL<T>  — rent/return arrays to avoid allocations
        // =============================================

        // Use when you need a temporary large buffer in a tight loop
        // The pool avoids GC pressure by reusing arrays

        int[] rented = ArrayPool<int>.Shared.Rent(1024);  // may return > 1024 elements
        try
        {
            // Use rented array for work
            for (int i = 0; i < 10; i++)
                rented[i] = i * i;

            Console.WriteLine(rented[5]);   // 25
        }
        finally
        {
            ArrayPool<int>.Shared.Return(rented);   // MUST return — or you leak the array
        }

        // =============================================
        // SPAN<T>  — zero-allocation slice over memory
        // =============================================

        // Span<T> is a ref struct — lives entirely on the stack
        // It's a window into existing memory: array, string, stack memory
        // No heap allocation, no copying

        int[] data = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        Span<int> span    = data.AsSpan();         // window over entire array
        Span<int> middle  = data.AsSpan(2, 5);     // window [3,4,5,6,7]

        middle[0] = 99;                            // modifies underlying array!
        Console.WriteLine(data[2]);                // 99

        // Slice without copying
        ReadOnlySpan<char> text   = "Hello, World!".AsSpan();
        ReadOnlySpan<char> hello  = text[..5];    // "Hello" — no string allocation
        Console.WriteLine(hello.ToString());       // Hello

        // =============================================
        // SORTED COLLECTIONS COMPARISON
        // =============================================

        // List<T>                 — O(n) search, O(1) append, O(n) insert/delete middle
        // SortedList<K,V>         — sorted by key, O(log n) lookup, less memory than SortedDictionary
        // SortedDictionary<K,V>   — sorted by key, O(log n) lookup, better insert/delete
        // SortedSet<T>            — sorted unique elements, O(log n) all ops

        var sortedList = new SortedList<int, string>
        {
            [3] = "three",
            [1] = "one",
            [2] = "two"
        };
        foreach (var kv in sortedList)
            Console.WriteLine($"{kv.Key}: {kv.Value}");   // 1, 2, 3  (sorted order)

        // =============================================
        // COLLECTION EXPRESSIONS  (C# 12)
        // =============================================

        // New unified syntax for creating collections
        List<int>  cList  = [1, 2, 3, 4, 5];
        int[]      cArray = [10, 20, 30];
        var        cSpan  = (Span<int>)[1, 2, 3];

        // Spread operator  ..
        List<int> combined = [.. cList, .. cArray];  // [1,2,3,4,5,10,20,30]
        Console.WriteLine(string.Join(", ", combined));
    }
}
