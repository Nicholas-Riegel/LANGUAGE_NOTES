namespace F05;

public static class ControlFlow
{
    public static void Run()
    {
        // =============================================
        // IF / ELSE IF / ELSE
        // =============================================

        int score = 78;

        if (score >= 90)
        {
            Console.WriteLine("A");
        }
        else if (score >= 80)
        {
            Console.WriteLine("B");
        }
        else if (score >= 70)
        {
            Console.WriteLine("C");   // ← prints this
        }
        else
        {
            Console.WriteLine("F");
        }

        // Single-line (no braces) — fine for one-liners, but add braces if in doubt
        if (score > 50) Console.WriteLine("Passed");

        // =============================================
        // SWITCH STATEMENT  (classic)
        // =============================================

        string day = "Monday";

        switch (day)
        {
            case "Saturday":
            case "Sunday":
                Console.WriteLine("Weekend");
                break;
            case "Monday":
                Console.WriteLine("Start of week");  // ← prints this
                break;
            case "Friday":
                Console.WriteLine("End of week");
                break;
            default:
                Console.WriteLine("Midweek");
                break;
        }

        // =============================================
        // SWITCH EXPRESSION  (C# 8+  — preferred in modern code)
        // =============================================

        // Returns a value directly — much more concise
        string result = day switch
        {
            "Saturday" or "Sunday" => "Weekend",
            "Monday"               => "Start of week",
            "Friday"               => "End of week",
            _                      => "Midweek"        // _ is the discard/default
        };
        Console.WriteLine(result);   // Start of week

        // Works great for numeric ranges with 'when' guards
        string grade = score switch
        {
            >= 90            => "A",
            >= 80 and < 90   => "B",
            >= 70 and < 80   => "C",
            >= 60 and < 70   => "D",
            _                => "F"
        };
        Console.WriteLine(grade);   // C

        // =============================================
        // SWITCH ON TYPE  (pattern matching)
        // =============================================

        object obj = 3.14;

        string desc = obj switch
        {
            int i    => $"Integer: {i}",
            double d => $"Double: {d}",     // ← matches this
            string s => $"String: {s}",
            null     => "null",
            _        => "unknown"
        };
        Console.WriteLine(desc);   // Double: 3.14

        // =============================================
        // TERNARY & NULL COALESCING  (inline conditions)
        // =============================================

        int x = 10;
        string sign = x > 0 ? "positive" : x < 0 ? "negative" : "zero";
        Console.WriteLine(sign);   // positive

        string? name = null;
        Console.WriteLine(name ?? "anonymous");   // anonymous

        // =============================================
        // LOGICAL OPERATORS IN CONDITIONS
        // =============================================

        bool isAdult = true;
        bool hasTicket = false;

        if (isAdult && hasTicket)
            Console.WriteLine("Enter");
        else if (isAdult || hasTicket)
            Console.WriteLine("Partial access");   // ← prints this
        else
            Console.WriteLine("No entry");

        // Short-circuit evaluation:
        // &&  stops at first false
        // ||  stops at first true
        // This matters when conditions have side effects

        // =============================================
        // GOTO (rare — avoid unless absolutely necessary)
        // =============================================

        // goto is legal in C# but rarely needed
        // Only real use case: breaking out of nested loops (prefer a method instead)
    }
}
