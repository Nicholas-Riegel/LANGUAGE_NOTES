namespace F02;

public static class TypeConversion
{
    public static void Run()
    {
        // =============================================
        // IMPLICIT CONVERSION  (safe, no data loss)
        // =============================================

        // Compiler widens automatically when there's no risk of data loss
        int    i = 100;
        long   l = i;       // int → long  ✓
        double d = i;       // int → double ✓
        float  f = i;       // int → float  ✓

        Console.WriteLine(d);   // 100

        // =============================================
        // EXPLICIT CAST  (may lose data)
        // =============================================

        // You must explicitly cast when narrowing (potential data loss)
        double pi = 3.99;
        int truncated = (int)pi;        // truncates — does NOT round
        Console.WriteLine(truncated);   // 3  (not 4!)

        long bigL = 9_000_000_000L;
        int  overflow = (int)bigL;      // data loss — wraps around
        Console.WriteLine(overflow);    // some garbage number

        // =============================================
        // Convert CLASS  (safe conversions, throws on failure)
        // =============================================

        string numStr = "42";
        int fromStr   = Convert.ToInt32(numStr);    // string → int
        double fromD  = Convert.ToDouble("3.14");   // string → double
        bool fromBool = Convert.ToBoolean(1);       // 1 → true, 0 → false
        string fromInt = Convert.ToString(100);     // int → string

        Console.WriteLine(fromStr);     // 42
        Console.WriteLine(fromBool);    // True

        // =============================================
        // PARSE  (string → numeric, throws on failure)
        // =============================================

        int    parsed   = int.Parse("99");
        double parsedD  = double.Parse("3.14");
        bool   parsedB  = bool.Parse("true");    // case-insensitive

        Console.WriteLine(parsed);      // 99

        // int.Parse("abc");   ← throws FormatException

        // =============================================
        // TRYPARSE  (safe parse — returns bool, no exception)
        // =============================================

        // Pattern: bool success = T.TryParse(string, out T result)
        bool ok = int.TryParse("123", out int result);
        Console.WriteLine(ok);          // True
        Console.WriteLine(result);      // 123

        bool failed = int.TryParse("abc", out int bad);
        Console.WriteLine(failed);      // False
        Console.WriteLine(bad);         // 0  (default — not garbage)

        // TryParse for other types
        double.TryParse("3.14", out double dResult);
        DateTime.TryParse("2025-01-01", out DateTime dt);

        Console.WriteLine(dResult);     // 3.14
        Console.WriteLine(dt);          // 01/01/2025 00:00:00

        // =============================================
        // TOSTRING()
        // =============================================

        int num = 255;
        Console.WriteLine(num.ToString());       // "255"
        Console.WriteLine(num.ToString("X"));    // "FF"     (hex)
        Console.WriteLine(num.ToString("D5"));   // "00255"  (5 digits, zero-padded)
        Console.WriteLine(num.ToString("N0"));   // "255"    (number with thousands separator)

        double price = 1234.5;
        Console.WriteLine(price.ToString("C"));    // $1,234.50  (currency, locale-aware)
        Console.WriteLine(price.ToString("F2"));   // 1234.50   (fixed 2 decimals)
        Console.WriteLine(price.ToString("E2"));   // 1.23E+003  (scientific notation)

        // =============================================
        // BOXING & UNBOXING
        // =============================================

        // Boxing   — wrapping a value type in an object (heap allocation)
        int  value  = 42;
        object boxed = value;       // boxed — value type copied to heap
        Console.WriteLine(boxed);   // 42

        // Unboxing — extracting the value type back out (explicit cast required)
        int unboxed = (int)boxed;
        Console.WriteLine(unboxed); // 42

        // Avoid boxing/unboxing in hot paths — it causes heap allocations
        // Generics (List<int> vs ArrayList) solve this problem

        // =============================================
        // AS / IS  (reference type conversions)
        // =============================================

        object obj = "Hello";

        // 'is' — checks type, returns bool
        if (obj is string s)
        {
            Console.WriteLine(s.ToUpper());     // HELLO  (pattern matching)
        }

        // 'as' — tries to cast, returns null on failure (no exception)
        string? str = obj as string;
        Console.WriteLine(str?.Length);         // 5

        object notAString = 99;
        string? failed2 = notAString as string;
        Console.WriteLine(failed2 == null);     // True  (didn't throw)
    }
}
