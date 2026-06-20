namespace F21;

// =============================================
// NULLABLE VALUE TYPES  (T?)
// =============================================

// By default, value types (int, bool, double...) cannot be null
// T? makes them nullable — essentially Nullable<T>

public static class NullableTypes
{
    public static void Run()
    {
        // ---- Nullable value types ----
        int?  age  = null;   // can be null
        int   age2 = 0;      // cannot be null (always has a value)

        age = 30;
        Console.WriteLine(age);          // 30

        // Check before using
        if (age.HasValue)
            Console.WriteLine(age.Value);    // 30

        // GetValueOrDefault — safe retrieval
        int result = age.GetValueOrDefault();     // 30
        int result2 = age.GetValueOrDefault(-1);  // 30 (or -1 if null)
        Console.WriteLine(result2);

        int? nullAge = null;
        Console.WriteLine(nullAge.GetValueOrDefault(-1)); // -1

        // ---- ?? null-coalescing ----
        int displayAge = age ?? 0;          // 30 (age has value)
        int displayAge2 = nullAge ?? 0;     // 0  (fallback)
        Console.WriteLine(displayAge2);

        // ---- ??= null-coalescing assignment ----
        int? x = null;
        x ??= 42;          // assign only if null
        Console.WriteLine(x);    // 42
        x ??= 99;          // already has a value — no change
        Console.WriteLine(x);    // 42

        // ---- ?. null-conditional ----
        string? s = null;
        int? len = s?.Length;       // null  (no NullReferenceException)
        Console.WriteLine(len);    // (blank)

        string? hello = "Hello";
        Console.WriteLine(hello?.ToUpper());   // HELLO
        Console.WriteLine(hello?.Length);      // 5

        // Chaining
        string? city = null;
        int? cityLen = city?.Trim()?.Length;   // null all the way
        Console.WriteLine(cityLen);   // (blank)

        // ---- ?[] null-conditional indexer ----
        int[]? arr = null;
        int? first = arr?[0];       // null (no IndexOutOfRangeException)
        Console.WriteLine(first);   // (blank)

        // =============================================
        // NULLABLE REFERENCE TYPES  (NRT — C# 8+)
        // =============================================

        // Enabled by <Nullable>enable</Nullable> in .csproj (set in this project)
        //
        // Once enabled:
        //   string   — non-nullable, must not be null, compiler warns if assigned null
        //   string?  — nullable, may be null, compiler warns if used without null check
        //
        // This helps catch NullReferenceExceptions at compile time!

        string  nonNull = "hello";    // compiler: must not be null
        string? maybeNull = null;     // explicitly nullable

        // Using maybeNull without a check — compiler warning
        // Console.WriteLine(maybeNull.Length);  ← CS8602 warning

        // After null check — no warning
        if (maybeNull != null)
            Console.WriteLine(maybeNull.Length);   // safe

        // Or use null-conditional
        Console.WriteLine(maybeNull?.Length);

        // ---- Null-forgiving operator  !  (use sparingly) ----
        // Tells the compiler "I know this is not null, trust me"
        string? possiblyNull = GetName();
        Console.WriteLine(possiblyNull!.Length);  // ! suppresses CS8602 warning
        // Only use ! when you're CERTAIN it won't be null — it doesn't actually check

        // ---- Patterns for null safety ----

        // 1. Null check in guard clause
        void Process(string? input)
        {
            if (input is null) throw new ArgumentNullException(nameof(input));
            Console.WriteLine(input.ToUpper());   // safe here
        }

        // 2. Null pattern matching
        void Describe(object? obj)
        {
            string desc = obj switch
            {
                null     => "nothing",
                string s => $"string: {s}",
                int i    => $"int: {i}",
                _        => "something else"
            };
            Console.WriteLine(desc);
        }
        Describe(null);     // nothing
        Describe("hi");     // string: hi
        Describe(42);       // int: 42
    }

    static string? GetName() => "Nicholas";  // returns nullable string
}
