namespace F28;

// =============================================
// LINQ — Language Integrated Query
// =============================================

// LINQ adds query capabilities directly to C# — works on any IEnumerable<T>
// Two syntax styles — both compile to the same thing:
//   Method syntax  — chained extension methods (preferred in modern code)
//   Query syntax   — SQL-like keywords (sometimes clearer for complex joins)
//
// IMPORTANT: LINQ is LAZY — queries don't run until enumerated
// Materialise with .ToList() / .ToArray() / .ToDictionary() when you need a snapshot

public static class LinqFundamentals
{
    static readonly List<Person> People = new()
    {
        new("Alice",   30, "Engineering"),
        new("Bob",     25, "Marketing"),
        new("Carol",   35, "Engineering"),
        new("Dave",    28, "Marketing"),
        new("Eve",     40, "Engineering"),
        new("Frank",   22, "HR"),
    };

    public static void Run()
    {
        // =============================================
        // WHERE  — filter
        // =============================================

        var engineers = People.Where(p => p.Department == "Engineering");
        foreach (var p in engineers)
            Console.WriteLine(p.Name);   // Alice, Carol, Eve

        // Query syntax equivalent
        var engineers2 = from p in People
                         where p.Department == "Engineering"
                         select p;

        // =============================================
        // SELECT  — transform / project
        // =============================================

        var names = People.Select(p => p.Name);
        Console.WriteLine(string.Join(", ", names));   // Alice, Bob, Carol, Dave, Eve, Frank

        // Project to anonymous type
        var summary = People.Select(p => new { p.Name, Senior = p.Age > 30 });
        foreach (var s in summary)
            Console.WriteLine($"{s.Name}: {s.Senior}");

        // =============================================
        // ORDERBY / ORDERBYDESCENDING / THENBY
        // =============================================

        var sorted = People.OrderBy(p => p.Age);
        foreach (var p in sorted)
            Console.Write(p.Name + " ");   // Frank Bob Dave Alice Carol Eve
        Console.WriteLine();

        var sortedDesc = People.OrderByDescending(p => p.Age);

        // Multiple sort keys
        var multiSort = People
            .OrderBy(p => p.Department)
            .ThenBy(p => p.Age);
        foreach (var p in multiSort)
            Console.WriteLine($"{p.Department,-15} {p.Name,-10} {p.Age}");

        // =============================================
        // FIRST / LAST / SINGLE / ELEMENT
        // =============================================

        Person first      = People.First();                              // first element (throws if empty)
        Person firstEng   = People.First(p => p.Department == "Engineering"); // first match
        Person? firstOrDef = People.FirstOrDefault(p => p.Age > 50);    // null if not found (safe!)
        Person last       = People.Last();
        Person? single    = People.SingleOrDefault(p => p.Name == "Alice"); // throws if > 1 match
        Person byIndex    = People.ElementAt(2);

        Console.WriteLine(firstEng.Name);    // Alice
        Console.WriteLine(firstOrDef?.Name); // (blank — no one over 50)

        // =============================================
        // AGGREGATE (COUNT, SUM, MIN, MAX, AVERAGE)
        // =============================================

        Console.WriteLine(People.Count());                                  // 6
        Console.WriteLine(People.Count(p => p.Department == "Engineering")); // 3
        Console.WriteLine(People.Sum(p => p.Age));                          // 180
        Console.WriteLine(People.Min(p => p.Age));                          // 22
        Console.WriteLine(People.Max(p => p.Age));                          // 40
        Console.WriteLine(People.Average(p => p.Age));                      // 30

        // =============================================
        // GROUPBY
        // =============================================

        var byDept = People.GroupBy(p => p.Department);
        foreach (IGrouping<string, Person> group in byDept)
        {
            Console.WriteLine($"{group.Key}: {string.Join(", ", group.Select(p => p.Name))}");
        }
        // Engineering: Alice, Carol, Eve
        // Marketing: Bob, Dave
        // HR: Frank

        // Group then aggregate
        var deptStats = People
            .GroupBy(p => p.Department)
            .Select(g => new
            {
                Department = g.Key,
                Count      = g.Count(),
                AvgAge     = g.Average(p => p.Age)
            });

        foreach (var d in deptStats)
            Console.WriteLine($"{d.Department}: {d.Count} people, avg age {d.AvgAge:F1}");

        // =============================================
        // ANY / ALL / CONTAINS
        // =============================================

        Console.WriteLine(People.Any(p => p.Age > 38));         // True
        Console.WriteLine(People.All(p => p.Age > 18));         // True
        Console.WriteLine(People.Any(p => p.Department == "Sales")); // False

        // =============================================
        // MATERIALISE THE QUERY
        // =============================================

        List<Person>   list    = People.Where(p => p.Age > 25).ToList();
        Person[]       array   = People.Where(p => p.Age > 25).ToArray();
        Dictionary<string, Person> dict = People.ToDictionary(p => p.Name);
        HashSet<string> depts  = People.Select(p => p.Department).ToHashSet();

        Console.WriteLine(dict["Alice"].Age);   // 30
        Console.WriteLine(string.Join(", ", depts));   // Engineering, Marketing, HR
    }

    record Person(string Name, int Age, string Department);
}
