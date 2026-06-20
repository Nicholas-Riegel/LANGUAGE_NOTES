namespace F17;

public static class Dictionaries
{
    public static void Run()
    {
        // =============================================
        // DICTIONARY<TKey, TValue>  — hash map (O(1) average lookup)
        // =============================================

        // Create
        var ages = new Dictionary<string, int>
        {
            { "Alice", 30 },
            { "Bob",   25 },
            { "Carol", 35 }
        };

        // Index initialiser syntax (C# 6+)
        var capitals = new Dictionary<string, string>
        {
            ["Switzerland"] = "Bern",
            ["Germany"]     = "Berlin",
            ["France"]      = "Paris"
        };

        // ---- Access ----
        Console.WriteLine(ages["Alice"]);           // 30
        Console.WriteLine(capitals["Switzerland"]); // Bern

        // ages["Unknown"]  ← KeyNotFoundException — use TryGetValue instead

        if (ages.TryGetValue("Bob", out int bobAge))
            Console.WriteLine(bobAge);              // 25

        // GetValueOrDefault (C# 7.1+)
        int missing = ages.GetValueOrDefault("Nobody", 0);
        Console.WriteLine(missing);                 // 0

        // ---- Add / Update / Remove ----
        ages["David"] = 28;                         // add new key
        ages["Alice"] = 31;                         // update existing key
        ages.Add("Eve", 22);                        // Add — throws if key exists
        ages.Remove("Carol");
        Console.WriteLine(ages.Count);              // 4

        // ---- Check existence ----
        Console.WriteLine(ages.ContainsKey("Alice"));   // True
        Console.WriteLine(ages.ContainsValue(25));      // True

        // ---- Iterate ----
        foreach (KeyValuePair<string, int> pair in ages)
        {
            Console.WriteLine($"{pair.Key}: {pair.Value}");
        }

        // Deconstruction (C# 7+)
        foreach (var (name, age) in ages)
        {
            Console.WriteLine($"{name} is {age}");
        }

        // Keys and Values collections
        foreach (string key in ages.Keys)
            Console.Write(key + " ");
        Console.WriteLine();

        foreach (int val in ages.Values)
            Console.Write(val + " ");
        Console.WriteLine();

        // ---- Merge / aggregate patterns ----
        // Count word frequency
        string[] words = { "apple", "banana", "apple", "cherry", "banana", "apple" };
        var freq = new Dictionary<string, int>();
        foreach (string w in words)
        {
            freq[w] = freq.GetValueOrDefault(w) + 1;  // safe: returns 0 if missing
        }
        foreach (var (word, count) in freq)
            Console.WriteLine($"{word}: {count}");

        // =============================================
        // SORTEDDICTIONARY<TKey, TValue>  — keeps keys sorted
        // =============================================

        var sorted = new SortedDictionary<string, int>
        {
            { "banana", 2 },
            { "apple",  5 },
            { "cherry", 1 }
        };
        // Iterates in key order: apple, banana, cherry
        foreach (var (k, v) in sorted)
            Console.WriteLine($"{k}: {v}");

        // =============================================
        // LOOKUP  — one key → multiple values  (built via LINQ)
        // =============================================

        var people = new[] { ("Dev", "Alice"), ("Dev", "Bob"), ("QA", "Carol"), ("Dev", "Dave") };
        ILookup<string, string> byTeam = people.ToLookup(p => p.Item1, p => p.Item2);

        foreach (string member in byTeam["Dev"])
            Console.Write(member + " ");   // Alice Bob Dave
        Console.WriteLine();

        // =============================================
        // NOTES ON PERFORMANCE
        // =============================================

        // Dictionary<K,V>        O(1) average for add/lookup/remove
        // SortedDictionary<K,V>  O(log n) — backed by a red-black tree
        // Use Dictionary unless you need sorted iteration
        // Keys must implement GetHashCode and Equals correctly
    }
}
