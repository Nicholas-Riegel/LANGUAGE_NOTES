namespace F19;

// =============================================
// GENERICS  — write code that works with any type
// =============================================

// Without generics you'd need one method per type, or use 'object' (loses type safety)
// Generics give you type safety AND reusability

// =============================================
// GENERIC METHOD
// =============================================

public static class GenericMethods
{
    // T is a type parameter — resolved at compile time
    public static T Identity<T>(T value) => value;

    // Swap two variables (needs ref)
    public static void Swap<T>(ref T a, ref T b) => (a, b) = (b, a);

    // Works for any comparable type
    public static T Max<T>(T a, T b) where T : IComparable<T>
        => a.CompareTo(b) >= 0 ? a : b;

    // Print any array
    public static void Print<T>(T[] arr)
        => Console.WriteLine(string.Join(", ", arr));
}

// =============================================
// GENERIC CLASS
// =============================================

public class Box<T>
{
    private T _value;

    public Box(T value) => _value = value;

    public T Value
    {
        get => _value;
        set => _value = value;
    }

    public bool IsEmpty => _value == null;

    public override string ToString() => $"Box<{typeof(T).Name}>({_value})";
}

// =============================================
// GENERIC INTERFACE & MULTIPLE TYPE PARAMS
// =============================================

public interface IRepository<T, TKey>
{
    void  Save(T item);
    T?    FindById(TKey id);
    IEnumerable<T> GetAll();
}

// =============================================
// GENERIC CONSTRAINTS  (where T : ...)
// =============================================

// where T : class          — T must be a reference type
// where T : struct         — T must be a value type
// where T : new()          — T must have a public parameterless constructor
// where T : SomeClass      — T must be or derive from SomeClass
// where T : ISomeInterface — T must implement ISomeInterface
// where T : IComparable<T> — T must implement IComparable<T>
// Multiple constraints:  where T : class, IDisposable, new()

public class SortedBag<T> where T : IComparable<T>
{
    private List<T> _items = new();

    public void Add(T item)
    {
        _items.Add(item);
        _items.Sort();
    }

    public T? Min => _items.Count > 0 ? _items[0]  : default;
    public T? Max => _items.Count > 0 ? _items[^1] : default;

    public IEnumerable<T> Items => _items;
}

// Create-new constraint
public class Factory<T> where T : new()
{
    public T Create() => new T();   // can only call new T() because of the constraint
}

// =============================================
// GENERIC INHERITANCE
// =============================================

public class TypedBox<T> : Box<T>
{
    public string TypeName => typeof(T).Name;
    public TypedBox(T value) : base(value) { }
}

// =============================================
// DEMO
// =============================================

public static class Generics
{
    public static void Run()
    {
        // ---- Generic methods ----
        Console.WriteLine(GenericMethods.Identity(42));       // 42
        Console.WriteLine(GenericMethods.Identity("hello"));  // hello
        Console.WriteLine(GenericMethods.Identity(3.14));     // 3.14

        int a = 5, b = 10;
        GenericMethods.Swap(ref a, ref b);
        Console.WriteLine($"a={a}, b={b}");    // a=10, b=5

        string x = "apple", y = "banana";
        GenericMethods.Swap(ref x, ref y);
        Console.WriteLine($"x={x}, y={y}");    // x=banana, y=apple

        Console.WriteLine(GenericMethods.Max(3, 7));       // 7
        Console.WriteLine(GenericMethods.Max("cat","dog")); // dog  (lexicographic)

        GenericMethods.Print(new[] { 1, 2, 3 });            // 1, 2, 3
        GenericMethods.Print(new[] { "a", "b", "c" });      // a, b, c

        // ---- Generic class ----
        var intBox    = new Box<int>(42);
        var stringBox = new Box<string>("hello");

        Console.WriteLine(intBox);      // Box<Int32>(42)
        Console.WriteLine(stringBox);   // Box<String>(hello)

        intBox.Value = 99;
        Console.WriteLine(intBox.Value);   // 99

        // ---- Constrained generic ----
        var bag = new SortedBag<int>();
        bag.Add(5); bag.Add(1); bag.Add(3);
        Console.WriteLine(string.Join(", ", bag.Items));  // 1, 3, 5
        Console.WriteLine($"Min={bag.Min}, Max={bag.Max}");  // Min=1, Max=5

        // ---- Type inference — compiler infers T ----
        // You don't need to write GenericMethods.Max<int>(3, 7)
        // The compiler works it out from the arguments

        // ---- Generic collections you already know ----
        // List<T>, Dictionary<K,V>, HashSet<T>, Stack<T>, Queue<T>
        // These are all generic — no boxing, type-safe, efficient
    }
}
