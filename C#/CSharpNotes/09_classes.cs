namespace F09;

// =============================================
// CLASSES — the blueprint for objects
// =============================================

// A class bundles data (fields/properties) and behaviour (methods)
public class Dog
{
    // ---- FIELDS  (private data storage) ----
    private string _name;
    private int    _age;

    // ---- AUTO-PROPERTIES  (C# generates the backing field for you) ----
    public string Breed { get; set; } = "Unknown";  // get + set + default value

    // Read-only property  (can only be set in constructor or with 'init')
    public string Id { get; }

    // Init-only property  (C# 9+  — can set in object initialiser, then immutable)
    public string Color { get; init; } = "Brown";

    // ---- CONSTRUCTOR ----
    public Dog(string name, int age)
    {
        _name = name;
        _age  = age;
        Id    = Guid.NewGuid().ToString()[..8];  // generated once
    }

    // ---- METHODS ----
    public string Speak() => $"{_name} says woof!";

    public void HaveBirthday() => _age++;

    // ---- PROPERTY WITH LOGIC ----
    public string Name
    {
        get => _name;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Name cannot be empty");
            _name = value;
        }
    }

    public int Age
    {
        get => _age;
        private set => _age = value >= 0 ? value : 0;  // validate on set
    }

    // ---- OVERRIDE ToString  (good practice) ----
    public override string ToString() => $"Dog({_name}, {_age}, {Breed})";
}

// =============================================
// STATIC MEMBERS  (belong to the class, not instances)
// =============================================

public class Counter
{
    private static int _count = 0;             // shared across ALL instances

    public Counter() => _count++;

    public static int Count => _count;         // static property

    public static void Reset() => _count = 0;  // static method
}

// =============================================
// OBJECT INITIALISER SYNTAX
// =============================================

public class Person
{
    public string FirstName  { get; set; } = "";
    public string LastName   { get; set; } = "";
    public int    Age        { get; set; }
}

public static class Classes
{
    public static void Run()
    {
        // Create instances
        Dog fido = new Dog("Fido", 3);
        Dog rex  = new Dog("Rex", 5) { Breed = "Husky", Color = "White" };  // object init

        Console.WriteLine(fido.Speak());         // Fido says woof!
        Console.WriteLine(fido);                 // Dog(Fido, 3, Unknown)   (calls ToString)
        Console.WriteLine(rex);                  // Dog(Rex, 5, Husky)

        fido.HaveBirthday();
        Console.WriteLine(fido.Age);             // 4

        // Property validation
        try { fido.Name = ""; }
        catch (ArgumentException e) { Console.WriteLine(e.Message); }

        // ---- Static members ----
        var c1 = new Counter();
        var c2 = new Counter();
        var c3 = new Counter();
        Console.WriteLine(Counter.Count);        // 3  (called on the class)
        Counter.Reset();
        Console.WriteLine(Counter.Count);        // 0

        // ---- Object initialiser ----
        var person = new Person
        {
            FirstName = "Nicholas",
            LastName  = "Smith",
            Age       = 30
        };
        Console.WriteLine($"{person.FirstName} {person.LastName}, {person.Age}");

        // ---- 'new' with target-type inference (C# 9+) ----
        Person person2 = new() { FirstName = "Anna", Age = 25 };
        Console.WriteLine(person2.FirstName);

        // ---- Checking types ----
        Console.WriteLine(fido.GetType().Name);     // Dog
        Console.WriteLine(fido is Dog);             // True
        Console.WriteLine(fido is object);          // True  (everything inherits object)
    }
}
