namespace F01;

public static class Variables
{
    public static void Run()
    {
        // =============================================
        // VALUE TYPES  (stored on the stack)
        // =============================================

        int age = 30;               // 32-bit integer  (-2.1B to 2.1B)
        long bigNum = 9_000_000L;   // 64-bit integer  (underscore = readability separator)
        double price = 19.99;       // 64-bit float    (default for decimals)
        float temp = 36.6f;         // 32-bit float    (needs 'f' suffix)
        decimal money = 9.99m;      // 128-bit decimal (use for money — no floating point errors)
        bool isActive = true;       // true / false
        char grade = 'A';           // single character, single quotes

        Console.WriteLine(age);     // 30
        Console.WriteLine(money);   // 9.99

        // =============================================
        // REFERENCE TYPES  (stored on the heap)
        // =============================================

        string name = "Nicholas";   // immutable sequence of chars
        object anything = 42;       // base type of everything in C#
        int[]  nums     = [1, 2]; // arrays are reference types

        Console.WriteLine(name);    // Nicholas

        // =============================================
        // TYPE INFERENCE  (var)
        // =============================================

        // 'var' lets the compiler infer the type — type is STILL static
        var city     = "Zurich";    // inferred as string
        var count    = 10;          // inferred as int
        var ratio    = 3.14;        // inferred as double

        Console.WriteLine(city.GetType());   // System.String
        Console.WriteLine(count.GetType());  // System.Int32

        // =============================================
        // CONSTANTS
        // =============================================

        const double Pi = 3.14159;   // compile-time constant, can never change
        // Pi = 3.0;                 // ERROR — const cannot be reassigned

        // readonly — set once, at runtime (useful in constructors)
        // (see 09_classes.cs for readonly fields on instances)

        Console.WriteLine(Pi);       // 3.14159

        // =============================================
        // DEFAULT VALUES
        // =============================================

        // Value types always have a default (they can't be null by default)
        int    defaultInt    = default;    // 0
        bool   defaultBool   = default;    // false
        double defaultDouble = default;    // 0.0
        char   defaultChar   = default;    // '\0' (null char)

        // Reference types default to null
        string? defaultStr = default;      // null  (? = nullable reference type)

        Console.WriteLine(defaultInt);     // 0
        Console.WriteLine(defaultStr);     // (blank — null)

        // =============================================
        // CONSOLE OUTPUT
        // =============================================

        Console.WriteLine("Hello, World!");             // prints + newline
        Console.Write("No newline ");                   // prints, no newline
        Console.WriteLine($"Name: {name}, Age: {age}"); // string interpolation
        Console.WriteLine("Pi is approximately {0:F2}", Pi); // format string → Pi is approximately 3.14

        // =============================================
        // CONSOLE INPUT
        // =============================================

        // Console.Write("Enter your name: ");
        // string? input = Console.ReadLine();   // returns string? (nullable)
        // Console.WriteLine($"Hello, {input}");

        // =============================================
        // TYPE SIZES (reference)
        // =============================================

        // sbyte    -128 to 127          (8-bit signed)
        // byte     0 to 255             (8-bit unsigned)
        // short    -32768 to 32767      (16-bit)
        // ushort   0 to 65535           (16-bit unsigned)
        // int      -2.1B to 2.1B        (32-bit) ← most common
        // uint     0 to 4.2B            (32-bit unsigned)
        // long     -9.2Q to 9.2Q        (64-bit)
        // ulong    0 to 18.4Q           (64-bit unsigned)
        // float    ±3.4×10^38           (32-bit, 7 digits precision)
        // double   ±1.7×10^308          (64-bit, 15 digits precision) ← default
        // decimal  ±7.9×10^28           (128-bit, 28 digits precision) ← money

        Console.WriteLine($"int max: {int.MaxValue}");         // 2147483647
        Console.WriteLine($"double max: {double.MaxValue}");
    }
}
