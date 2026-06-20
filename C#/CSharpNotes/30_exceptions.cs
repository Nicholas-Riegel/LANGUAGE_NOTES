namespace F30;

// =============================================
// EXCEPTION HANDLING
// =============================================

public static class Exceptions
{
    public static void Run()
    {
        // =============================================
        // TRY / CATCH / FINALLY
        // =============================================

        try
        {
            int result = Divide(10, 0);
            Console.WriteLine(result);
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Math error: {ex.Message}");   // Attempted to divide by zero
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"Argument error: {ex.Message}");
        }
        catch (Exception ex)                 // catch-all — keep it last
        {
            Console.WriteLine($"Unexpected: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Always runs — cleanup here");  // runs even if exception thrown
        }

        // =============================================
        // EXCEPTION FILTERS  (when — C# 6+)
        // =============================================

        try
        {
            ThrowBasedOnCode(404);
        }
        catch (AppException ex) when (ex.Code == 404)
        {
            Console.WriteLine("Not found");
        }
        catch (AppException ex) when (ex.Code == 500)
        {
            Console.WriteLine("Server error");
        }
        // 'when' filters — evaluated before entering the catch block
        // If the condition is false, the exception propagates to the next catch

        // =============================================
        // THROW EXPRESSIONS  (C# 7+)
        // =============================================

        // throw can be used as an expression in ternary / null-coalescing
        string? name = null;
        string safeName = name ?? throw new ArgumentNullException(nameof(name));

        // In expression-bodied method
        // static string GetName(string? s) => s ?? throw new ArgumentNullException(nameof(s));

        // =============================================
        // RE-THROWING
        // =============================================

        try
        {
            RiskyOperation();
        }
        catch (Exception ex)
        {
            // throw;     — preserves original stack trace (correct)
            // throw ex;  — RESETS stack trace (loses original call info — avoid!)
            Console.WriteLine($"Caught: {ex.Message}");
            // throw;   // uncomment to rethrow
        }

        // =============================================
        // CUSTOM EXCEPTIONS
        // =============================================

        try
        {
            ValidateAge(-5);
        }
        catch (ValidationException ex)
        {
            Console.WriteLine($"Validation: {ex.Message}, Field: {ex.FieldName}");
        }

        // =============================================
        // USING  (IDisposable — guaranteed cleanup)
        // =============================================

        // 'using' calls Dispose() automatically, even if an exception is thrown
        // The Dispose() method releases unmanaged resources (file handles, DB connections, etc.)

        // using statement (classic)
        using (var resource = new ManagedResource("file.txt"))
        {
            resource.DoWork();
        }   // resource.Dispose() called here automatically

        // using declaration (C# 8+) — cleaner, Dispose() called at end of scope
        using var resource2 = new ManagedResource("db-connection");
        resource2.DoWork();
        // resource2.Dispose() called when 'resource2' goes out of scope

        // =============================================
        // EXCEPTION HIERARCHY  (common exceptions)
        // =============================================

        // Exception
        //   ├── SystemException
        //   │     ├── ArgumentException
        //   │     │     └── ArgumentNullException
        //   │     │     └── ArgumentOutOfRangeException
        //   │     ├── InvalidOperationException
        //   │     ├── NullReferenceException     ← avoid with null safety
        //   │     ├── IndexOutOfRangeException
        //   │     ├── OverflowException
        //   │     ├── DivideByZeroException
        //   │     ├── FormatException             ← thrown by int.Parse on bad input
        //   │     ├── IOException
        //   │     │     ├── FileNotFoundException
        //   │     │     └── DirectoryNotFoundException
        //   │     ├── NotImplementedException
        //   │     └── OperationCanceledException  ← thrown by CancellationToken
        //   └── ApplicationException  (user-defined exceptions can extend this)

        Console.WriteLine("Exception handling complete");
    }

    static int Divide(int a, int b)
    {
        if (b == 0) throw new DivideByZeroException();
        return a / b;
    }

    static void ThrowBasedOnCode(int code)
    {
        throw new AppException($"Error {code}", code);
    }

    static void RiskyOperation() => throw new InvalidOperationException("Something went wrong");

    static void ValidateAge(int age)
    {
        if (age < 0)
            throw new ValidationException("age", "Age cannot be negative");
    }
}

// =============================================
// CUSTOM EXCEPTION
// =============================================

public class AppException : Exception
{
    public int Code { get; }

    public AppException(string message, int code) : base(message)
    {
        Code = code;
    }

    // Always provide these constructors for serialisation support
    public AppException() : base() { }
    public AppException(string message) : base(message) { }
    public AppException(string message, Exception inner) : base(message, inner) { }
}

public class ValidationException : Exception
{
    public string FieldName { get; }

    public ValidationException(string fieldName, string message) : base(message)
    {
        FieldName = fieldName;
    }
}

// =============================================
// IDISPOSABLE  — implement when you hold unmanaged resources
// =============================================

public class ManagedResource : IDisposable
{
    private readonly string _name;
    private bool _disposed = false;

    public ManagedResource(string name)
    {
        _name = name;
        Console.WriteLine($"[{_name}] opened");
    }

    public void DoWork()
    {
        if (_disposed) throw new ObjectDisposedException(nameof(ManagedResource));
        Console.WriteLine($"[{_name}] working...");
    }

    public void Dispose()
    {
        if (!_disposed)
        {
            Console.WriteLine($"[{_name}] disposed");
            _disposed = true;
        }
        GC.SuppressFinalize(this);   // tell GC no need to call finaliser
    }
}
