namespace F03;

public static class Operators
{
    public static void Run()
    {
        // =============================================
        // ARITHMETIC
        // =============================================

        int a = 10, b = 3;

        Console.WriteLine(a + b);    // 13   addition
        Console.WriteLine(a - b);    // 7    subtraction
        Console.WriteLine(a * b);    // 30   multiplication
        Console.WriteLine(a / b);    // 3    integer division (truncates)
        Console.WriteLine(a % b);    // 1    modulo (remainder)

        double x = 10.0, y = 3.0;
        Console.WriteLine(x / y);   // 3.333...  floating-point division

        // Increment / decrement
        int n = 5;
        Console.WriteLine(n++);     // 5  (post-increment: returns THEN increments)
        Console.WriteLine(n);       // 6
        Console.WriteLine(++n);     // 7  (pre-increment: increments THEN returns)
        Console.WriteLine(n--);     // 7  (post-decrement)
        Console.WriteLine(n);       // 6

        // =============================================
        // ASSIGNMENT
        // =============================================

        int c = 10;
        c += 5;   Console.WriteLine(c);   // 15   (c = c + 5)
        c -= 3;   Console.WriteLine(c);   // 12
        c *= 2;   Console.WriteLine(c);   // 24
        c /= 4;   Console.WriteLine(c);   // 6
        c %= 4;   Console.WriteLine(c);   // 2

        // =============================================
        // COMPARISON
        // =============================================

        int p = 5, q = 10;
        Console.WriteLine(p == q);   // False
        Console.WriteLine(p != q);   // True
        Console.WriteLine(p <  q);   // True
        Console.WriteLine(p >  q);   // False
        Console.WriteLine(p <= q);   // True
        Console.WriteLine(p >= q);   // False

        // =============================================
        // LOGICAL
        // =============================================

        bool t = true, f = false;
        Console.WriteLine(t && f);   // False  AND (short-circuits on first false)
        Console.WriteLine(t || f);   // True   OR  (short-circuits on first true)
        Console.WriteLine(!t);       // False  NOT

        // =============================================
        // BITWISE
        // =============================================

        int u = 0b_1010;   // 10
        int v = 0b_1100;   // 12

        Console.WriteLine(u & v);    // 8   (0b_1000)  bitwise AND
        Console.WriteLine(u | v);    // 14  (0b_1110)  bitwise OR
        Console.WriteLine(u ^ v);    // 6   (0b_0110)  bitwise XOR
        Console.WriteLine(~u);       // -11            bitwise NOT (flip all bits)
        Console.WriteLine(u << 1);   // 20             left shift  (× 2)
        Console.WriteLine(u >> 1);   // 5              right shift (÷ 2)

        // =============================================
        // NULL-RELATED OPERATORS  (very common in C#)
        // =============================================

        // ??  — null-coalescing: return left if not null, else right
        string? nullableStr = null;
        string result = nullableStr ?? "default";
        Console.WriteLine(result);   // default

        // ??=  — null-coalescing assignment: assign only if null
        string? name = null;
        name ??= "Nicholas";
        Console.WriteLine(name);     // Nicholas
        name ??= "Other";            // already has a value, not reassigned
        Console.WriteLine(name);     // Nicholas

        // ?.  — null-conditional: call member only if not null, else return null
        string? maybeNull = null;
        int? length = maybeNull?.Length;   // null (no NullReferenceException)
        Console.WriteLine(length);         // (blank — null)

        string? notNull = "hello";
        Console.WriteLine(notNull?.ToUpper());  // HELLO

        // ?[]  — null-conditional indexer
        int[]? arr = null;
        int? first = arr?[0];              // null  (no IndexOutOfRangeException)
        Console.WriteLine(first);          // (blank)

        // =============================================
        // TERNARY  (condition ? valueIfTrue : valueIfFalse)
        // =============================================

        int score = 75;
        string grade = score >= 60 ? "Pass" : "Fail";
        Console.WriteLine(grade);   // Pass

        // Nested ternary (keep it readable)
        string label = score >= 90 ? "A"
                     : score >= 75 ? "B"
                     : score >= 60 ? "C"
                     : "F";
        Console.WriteLine(label);   // B

        // =============================================
        // RANGE & INDEX OPERATORS  (C# 8+)
        // =============================================

        int[] numbers = { 10, 20, 30, 40, 50 };

        // ^ = "from end"  index
        Console.WriteLine(numbers[^1]);      // 50  (last element)
        Console.WriteLine(numbers[^2]);      // 40  (second to last)

        // .. = range  (start inclusive, end exclusive)
        int[] slice = numbers[1..3];         // [20, 30]
        int[] last2 = numbers[^2..];         // [40, 50]
        int[] first3 = numbers[..3];         // [10, 20, 30]
        int[] all    = numbers[..];          // copy of all

        Console.WriteLine(string.Join(", ", slice));    // 20, 30
        Console.WriteLine(string.Join(", ", last2));    // 40, 50
    }
}
