namespace F04;

using System.Text;

public static class Strings
{
    public static void Run()
    {
        // =============================================
        // CREATING STRINGS
        // =============================================

        string name  = "Nicholas";
        string empty = "";
        string also  = string.Empty;    // preferred for empty string

        // Verbatim string  (@)  — backslashes are literal, no escape needed
        string path    = @"C:\Users\Nicholas\Documents";
        string multiline = @"Line 1
Line 2
Line 3";

        // Raw string literal (C# 11+) — no escaping at all
        string raw = """
            {
                "name": "Nicholas"
            }
            """;

        Console.WriteLine(path);       // C:\Users\Nicholas\Documents

        // =============================================
        // STRING INTERPOLATION
        // =============================================

        string city = "Zurich";
        int    year = 2026;

        Console.WriteLine($"Hello from {city} in {year}");      // Hello from Zurich in 2026
        Console.WriteLine($"Pi: {Math.PI:F2}");                  // Pi: 3.14  (format spec after :)
        Console.WriteLine($"Hex: {255:X}");                      // Hex: FF
        Console.WriteLine($"Padded: {name,10}");                 // right-aligned in 10 chars
        Console.WriteLine($"Padded: {name,-10}|");               // left-aligned

        // =============================================
        // COMMON STRING METHODS
        // =============================================

        string s = "  Hello, World!  ";

        // Length
        Console.WriteLine(s.Length);                // 17

        // Trim whitespace
        Console.WriteLine(s.Trim());                // "Hello, World!"
        Console.WriteLine(s.TrimStart());           // "Hello, World!  "
        Console.WriteLine(s.TrimEnd());             // "  Hello, World!"

        // Case
        Console.WriteLine(s.ToUpper());             // "  HELLO, WORLD!  "
        Console.WriteLine(s.ToLower());             // "  hello, world!  "

        // Search
        string clean = s.Trim();
        Console.WriteLine(clean.Contains("World")); // True
        Console.WriteLine(clean.StartsWith("Hello")); // True
        Console.WriteLine(clean.EndsWith("!"));     // True
        Console.WriteLine(clean.IndexOf("World"));  // 7  (-1 if not found)
        Console.WriteLine(clean.LastIndexOf('l'));   // 10

        // Substring / slice
        Console.WriteLine(clean.Substring(7));       // "World!"
        Console.WriteLine(clean.Substring(7, 5));    // "World"
        Console.WriteLine(clean[7..12]);             // "World" (range syntax, C# 8+)

        // Replace
        Console.WriteLine(clean.Replace("World", "C#"));   // "Hello, C#!"
        Console.WriteLine(clean.Replace(",", ""));          // "Hello World!"

        // Split / Join
        string csv = "a,b,c,d";
        string[] parts = csv.Split(',');
        Console.WriteLine(parts.Length);                    // 4
        Console.WriteLine(string.Join(" - ", parts));       // "a - b - c - d"

        // =============================================
        // NULL / EMPTY CHECKS
        // =============================================

        string? maybeNull = null;
        Console.WriteLine(string.IsNullOrEmpty(maybeNull));        // True
        Console.WriteLine(string.IsNullOrWhiteSpace("   "));       // True
        Console.WriteLine(string.IsNullOrWhiteSpace("hello"));     // False

        // =============================================
        // COMPARISON
        // =============================================

        string a = "hello", b = "HELLO";

        Console.WriteLine(a == b);                                          // False (case-sensitive)
        Console.WriteLine(a.Equals(b, StringComparison.OrdinalIgnoreCase)); // True
        Console.WriteLine(string.Compare(a, b, ignoreCase: true));         // 0 (equal)

        // =============================================
        // STRING MANIPULATION
        // =============================================

        string padded = "42".PadLeft(6, '0');       // "000042"
        Console.WriteLine(padded);

        string repeated = string.Concat(Enumerable.Repeat("ab", 3)); // "ababab"
        Console.WriteLine(repeated);

        // =============================================
        // STRINGBUILDER — use when building strings in a loop
        // =============================================

        // string concatenation in a loop creates many intermediate strings (slow)
        // StringBuilder mutates a buffer — much more efficient

        var sb = new StringBuilder();
        sb.Append("Hello");
        sb.Append(", ");
        sb.Append("World");
        sb.AppendLine("!");             // appends + newline
        sb.Insert(5, "---");            // insert at index 5
        sb.Replace("---", "");          // find and replace in buffer
        Console.WriteLine(sb.ToString());   // Hello, World!\n

        // Building in a loop
        var sbLoop = new StringBuilder();
        for (int i = 0; i < 5; i++)
        {
            sbLoop.Append(i).Append(' ');
        }
        Console.WriteLine(sbLoop.ToString());   // 0 1 2 3 4

        // =============================================
        // STRING IMMUTABILITY
        // =============================================

        // Strings in C# are IMMUTABLE — methods always return NEW strings
        string original = "hello";
        string upper    = original.ToUpper();     // new string
        Console.WriteLine(original);  // hello   (unchanged)
        Console.WriteLine(upper);     // HELLO

        // =============================================
        // CHAR OPERATIONS
        // =============================================

        char ch = 'A';
        Console.WriteLine(char.IsLetter(ch));    // True
        Console.WriteLine(char.IsDigit('5'));     // True
        Console.WriteLine(char.IsWhiteSpace(' ')); // True
        Console.WriteLine(char.ToLower('Z'));     // z
        Console.WriteLine((int)ch);              // 65  (Unicode code point)
    }
}
