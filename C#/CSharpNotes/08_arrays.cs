namespace F08;

public static class Arrays
{
    public static void Run()
    {
        // =============================================
        // DECLARE & INITIALISE
        // =============================================

        // Declare then assign
        int[] nums = new int[5];         // [0, 0, 0, 0, 0]  — defaults to 0
        nums[0] = 10;
        nums[1] = 20;

        // Initialiser syntax
        int[] scores  = { 90, 85, 78, 92, 88 };
        string[] days = new string[] { "Mon", "Tue", "Wed" };
        var mixed     = new[] { 1, 2, 3 };   // type inferred as int[]

        Console.WriteLine(scores[0]);   // 90
        Console.WriteLine(scores[^1]);  // 88  (last element, C# 8+ index from end)

        // =============================================
        // LENGTH & ITERATION
        // =============================================

        Console.WriteLine(scores.Length);   // 5

        // for loop (use when you need the index)
        for (int i = 0; i < scores.Length; i++)
        {
            Console.Write(scores[i] + " ");   // 90 85 78 92 88
        }
        Console.WriteLine();

        // foreach (prefer when you don't need the index)
        foreach (int s in scores)
        {
            Console.Write(s + " ");
        }
        Console.WriteLine();

        // =============================================
        // COMMON ARRAY OPERATIONS
        // =============================================

        int[] arr = { 3, 1, 4, 1, 5, 9, 2, 6 };

        Array.Sort(arr);
        Console.WriteLine(string.Join(", ", arr));   // 1, 1, 2, 3, 4, 5, 6, 9

        Array.Reverse(arr);
        Console.WriteLine(string.Join(", ", arr));   // 9, 6, 5, 4, 3, 2, 1, 1

        int idx = Array.IndexOf(arr, 4);
        Console.WriteLine(idx);                      // 3

        bool exists = Array.Exists(arr, x => x == 5);
        Console.WriteLine(exists);                   // True

        int[] copy = new int[arr.Length];
        Array.Copy(arr, copy, arr.Length);           // copy all elements

        Array.Fill(copy, 0);                         // fill all with 0
        Console.WriteLine(string.Join(", ", copy));  // 0, 0, 0, ...

        // =============================================
        // SLICES  (C# 8+ range syntax)
        // =============================================

        int[] data = { 10, 20, 30, 40, 50 };
        int[] middle = data[1..4];              // [20, 30, 40]  (end exclusive)
        int[] last3  = data[^3..];              // [30, 40, 50]
        int[] first2 = data[..2];              // [10, 20]

        Console.WriteLine(string.Join(", ", middle));   // 20, 30, 40

        // =============================================
        // 2D ARRAYS  (rectangular)
        // =============================================

        int[,] grid = new int[3, 3];   // 3×3, all zeros
        grid[0, 0] = 1;
        grid[1, 1] = 5;
        grid[2, 2] = 9;

        // Initialiser
        int[,] matrix = {
            { 1, 2, 3 },
            { 4, 5, 6 },
            { 7, 8, 9 }
        };

        Console.WriteLine(matrix[1, 2]);    // 6
        Console.WriteLine(matrix.GetLength(0));  // 3 (rows)
        Console.WriteLine(matrix.GetLength(1));  // 3 (columns)

        // Iterate 2D array
        for (int row = 0; row < matrix.GetLength(0); row++)
        {
            for (int col = 0; col < matrix.GetLength(1); col++)
            {
                Console.Write(matrix[row, col] + " ");
            }
            Console.WriteLine();
        }

        // =============================================
        // JAGGED ARRAYS  (array of arrays — rows can differ in length)
        // =============================================

        int[][] jagged = new int[3][];
        jagged[0] = new int[] { 1, 2 };
        jagged[1] = new int[] { 3, 4, 5 };
        jagged[2] = new int[] { 6 };

        Console.WriteLine(jagged[1][2]);    // 5

        foreach (int[] row in jagged)
        {
            Console.WriteLine(string.Join(" ", row));
        }

        // =============================================
        // USEFUL ARRAY LINQ METHODS  (returns new collections)
        // =============================================

        int[] numbers = { 5, 3, 8, 1, 9, 2, 7 };

        int   max     = numbers.Max();
        int   min     = numbers.Min();
        double avg    = numbers.Average();
        int   total   = numbers.Sum();
        int[] sorted  = numbers.OrderBy(x => x).ToArray();
        int[] evens   = numbers.Where(x => x % 2 == 0).ToArray();
        int[] doubled = numbers.Select(x => x * 2).ToArray();

        Console.WriteLine($"Max: {max}, Min: {min}, Avg: {avg:F1}");
        Console.WriteLine(string.Join(", ", sorted));    // 1, 2, 3, 5, 7, 8, 9
        Console.WriteLine(string.Join(", ", evens));     // 8, 2
    }
}
