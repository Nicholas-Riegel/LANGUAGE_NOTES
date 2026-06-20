namespace F33;

// =============================================
// ATTRIBUTES  — declarative metadata attached to code
// =============================================

using System.Reflection;

// =============================================
// BUILT-IN ATTRIBUTES
// =============================================

// Top-level methods can't have access modifiers — moved inside a helper class below
// [Obsolete("Use NewMethod() instead", error: false)]
// public static void OldMethod() => ...

// [Serializable]        — marks class as serialisable (legacy BinaryFormatter)
// [NonSerialized]       — skip field during serialisation
// [DllImport("...")]    — P/Invoke — call native code
// [Conditional("DEBUG")] — method only compiled/called in DEBUG builds
// [CallerMemberName]    — injects caller method name (useful for INotifyPropertyChanged)

// =============================================
// CUSTOM ATTRIBUTE
// =============================================

// 1. Inherit from Attribute
// 2. Name it XxxAttribute (convention — called as [Xxx])
// 3. Define what targets it can apply to with [AttributeUsage]

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
public class AuthorAttribute : Attribute
{
    public string Name    { get; }
    public string Version { get; set; } = "1.0";

    public AuthorAttribute(string name) => Name = name;
}

[AttributeUsage(AttributeTargets.Property)]
public class RequiredAttribute : Attribute
{
    public string ErrorMessage { get; }
    public RequiredAttribute(string errorMessage = "Field is required")
        => ErrorMessage = errorMessage;
}

// =============================================
// APPLYING ATTRIBUTES
// =============================================

[Author("Nicholas", Version = "2.0")]
public class OrderProcessor
{
    [Required("Order ID is required")]
    public int OrderId { get; set; }

    [Required]
    public string CustomerName { get; set; } = "";

    public decimal Total { get; set; }

    [Author("Nicholas")]
    public void Process() => Console.WriteLine($"Processing order {OrderId}");
}

// =============================================
// REFLECTION  — inspect types at runtime
// =============================================

public static class AttributesReflection
{
    public static void Run()
    {
        // ---- Get type information ----
        Type type = typeof(OrderProcessor);
        Console.WriteLine(type.Name);          // OrderProcessor
        Console.WriteLine(type.FullName);      // OrderProcessor
        Console.WriteLine(type.IsClass);       // True

        // ---- List properties ----
        Console.WriteLine("\n--- Properties ---");
        foreach (PropertyInfo prop in type.GetProperties())
        {
            Console.WriteLine($"{prop.PropertyType.Name} {prop.Name}");
        }

        // ---- List methods ----
        Console.WriteLine("\n--- Methods (declared only) ---");
        foreach (MethodInfo method in type.GetMethods(BindingFlags.DeclaredOnly |
                                                       BindingFlags.Public |
                                                       BindingFlags.Instance))
        {
            Console.WriteLine(method.Name);
        }

        // ---- Read custom attributes ----
        Console.WriteLine("\n--- Attributes on OrderProcessor ---");
        var classAttribs = type.GetCustomAttributes<AuthorAttribute>();
        foreach (var a in classAttribs)
            Console.WriteLine($"Author: {a.Name}, Version: {a.Version}");

        // Check attribute on method
        var processMethod = type.GetMethod("Process");
        var methodAuthor  = processMethod?.GetCustomAttribute<AuthorAttribute>();
        Console.WriteLine($"Process() author: {methodAuthor?.Name}");

        // ---- Read [Required] on properties ----
        Console.WriteLine("\n--- Required properties ---");
        foreach (PropertyInfo prop in type.GetProperties())
        {
            var req = prop.GetCustomAttribute<RequiredAttribute>();
            if (req != null)
                Console.WriteLine($"{prop.Name}: \"{req.ErrorMessage}\"");
        }

        // ---- Create instance and set properties via reflection ----
        Console.WriteLine("\n--- Create and invoke via reflection ---");
        object? instance = Activator.CreateInstance(type);
        type.GetProperty("OrderId")?.SetValue(instance, 42);
        type.GetProperty("CustomerName")?.SetValue(instance, "Alice");

        int orderId = (int)(type.GetProperty("OrderId")?.GetValue(instance) ?? 0);
        Console.WriteLine($"OrderId: {orderId}");   // 42

        // Invoke method via reflection
        type.GetMethod("Process")?.Invoke(instance, null);   // Processing order 42

        // ---- Reflection performance note ----
        // Reflection is slower than direct calls — cache MethodInfo / PropertyInfo
        // For hot paths, use compiled expressions or source generators instead

        // ---- Calling the obsolete method — produces a warning, still works ----
        OldMethod();   // Old  (with compiler warning)
    }

    [Obsolete("Use NewMethod() instead", error: false)]
    static void OldMethod() => Console.WriteLine("Old");

    static void NewMethod() => Console.WriteLine("New");  // replacement
}
