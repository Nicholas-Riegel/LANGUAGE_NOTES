namespace F06;

public static class Loops
{
    public static void Run()
    {
        // =============================================
        // FOR LOOP  (when you know the count)
        // =============================================

        for (int i = 0; i < 5; i++)
        {
            Console.Write(i + " ");     // 0 1 2 3 4
        }
        Console.WriteLine();

        // Counting down
        for (int i = 5; i > 0; i--)
        {
            Console.Write(i + " ");     // 5 4 3 2 1
        }
        Console.WriteLine();

        // Step by 2
        for (int i = 0; i <= 10; i += 2)
        {
            Console.Write(i + " ");     // 0 2 4 6 8 10
        }
        Console.WriteLine();

        // =============================================
        // FOREACH LOOP  (preferred for collections)
        // =============================================

        string[] fruits = { "apple", "banana", "cherry" };
        foreach (string fruit in fruits)
        {
            Console.WriteLine(fruit);
        }

        // foreach with index — no built-in index, use LINQ if needed
        foreach ((int index, string fruit) in fruits.Select((f, i) => (i, f)))
        {
            Console.WriteLine($"{index}: {fruit}");
        }

        // foreach over a string (iterates characters)
        foreach (char c in "Hello")
        {
            Console.Write(c + " ");     // H e l l o
        }
        Console.WriteLine();

        // =============================================
        // WHILE LOOP  (when condition is checked before each iteration)
        // =============================================

        int count = 0;
        while (count < 5)
        {
            Console.Write(count + " ");   // 0 1 2 3 4
            count++;
        }
        Console.WriteLine();

        // =============================================
        // DO-WHILE LOOP  (body runs at least once)
        // =============================================

        int x = 10;
        do
        {
            Console.WriteLine("Runs at least once: " + x);   // prints even though x >= 5
            x++;
        }
        while (x < 5);

        // =============================================
        // BREAK  (exit loop immediately)
        // =============================================

        for (int i = 0; i < 10; i++)
        {
            if (i == 5) break;
            Console.Write(i + " ");     // 0 1 2 3 4
        }
        Console.WriteLine();

        // =============================================
        // CONTINUE  (skip to next iteration)
        // =============================================

        for (int i = 0; i < 10; i++)
        {
            if (i % 2 == 0) continue;   // skip even numbers
            Console.Write(i + " ");     // 1 3 5 7 9
        }
        Console.WriteLine();

        // =============================================
        // NESTED LOOPS  (with labelled break pattern)
        // =============================================

        // C# doesn't have labelled breaks, but you can use a flag or goto
        bool found = false;
        for (int row = 0; row < 3 && !found; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                if (row == 1 && col == 1)
                {
                    Console.WriteLine($"Found at [{row},{col}]");
                    found = true;
                    break;      // breaks inner loop; outer loop checks 'found'
                }
            }
        }

        // =============================================
        // FOREACH WITH COLLECTIONS
        // =============================================

        var numbers = new List<int> { 10, 20, 30, 40 };
        int sum = 0;
        foreach (int n in numbers)
        {
            sum += n;
        }
        Console.WriteLine("Sum: " + sum);   // Sum: 100

        // =============================================
        // INFINITE LOOP  (use with care)
        // =============================================

        // while (true) { ... break; }
        // for (;;)     { ... break; }
        // These are valid and common for server loops / polling

        // =============================================
        // LINQ ALTERNATIVES TO LOOPS  (covered in 28_linq)
        // =============================================

        // Many loops can be replaced with LINQ for clarity
        // numbers.Where(n => n > 20).ToList()  instead of looping with an if
        // numbers.Sum()                          instead of a sum loop
        // numbers.Any(n => n > 35)               instead of a break loop
    }
}
