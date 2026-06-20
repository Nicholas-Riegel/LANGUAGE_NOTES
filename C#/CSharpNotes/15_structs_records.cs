namespace F15;

// =============================================
// STRUCTS  (value type — revisited with more detail)
// =============================================

// Already covered basics in 14_enums.cs
// Key points:
//   - Copied on assignment — no shared state
//   - Cannot inherit from another struct/class (but CAN implement interfaces)
//   - Default constructor always exists, zero-initialises all fields

// =============================================
// RECORD  (C# 9+) — immutable reference type with value equality
// =============================================

// 'record' is shorthand for an immutable class with:
//   - Auto-generated constructor from the parameter list
//   - Value-based equality (Equals, ==, GetHashCode compare properties)
//   - Auto-generated ToString()
//   - 'with' expression for non-destructive mutation

public record Person(string FirstName, string LastName, int Age);

// You can also add methods to records
public record Product(string Name, decimal Price)
{
    // Computed property
    public string Display => $"{Name} @ {Price:C}";

    // Custom method
    public Product WithDiscount(decimal percent) =>
        this with { Price = Price * (1 - percent / 100) };
}

// =============================================
// RECORD CLASS vs RECORD STRUCT
// =============================================

// record class  (default) — reference type, heap-allocated
public record class  Point2D(double X, double Y);

// record struct (C# 10+) — value type, stack-allocated, still has value equality
public record struct Point3D(double X, double Y, double Z);

// =============================================
// MUTABILITY VARIANTS
// =============================================

// record with init-only — immutable after construction
public record ImmutableConfig(string Host, int Port);

// record with mutable properties (rare, defeats the purpose of records)
public record MutablePerson
{
    public string Name { get; set; } = "";
    public int    Age  { get; set; }
}

// =============================================
// DEMO
// =============================================

public static class StructsRecords
{
    public static void Run()
    {
        // ---- Record basics ----
        var alice = new Person("Alice", "Smith", 30);
        var bob   = new Person("Bob",   "Jones", 25);

        Console.WriteLine(alice);          // Person { FirstName = Alice, LastName = Smith, Age = 30 }
        Console.WriteLine(alice.FirstName); // Alice

        // Value equality — two records with same values are EQUAL
        var alice2 = new Person("Alice", "Smith", 30);
        Console.WriteLine(alice == alice2);     // True   (compares properties)
        Console.WriteLine(ReferenceEquals(alice, alice2)); // False  (different objects)

        // Classes use REFERENCE equality by default
        // Records use VALUE equality by default — important for interviews!

        // ---- with expression — create a copy with some properties changed ----
        var olderAlice = alice with { Age = 31 };
        Console.WriteLine(olderAlice);      // Person { FirstName = Alice, LastName = Smith, Age = 31 }
        Console.WriteLine(alice);           // original unchanged

        // ---- Deconstruction (works on records automatically) ----
        var (first, last, age) = alice;
        Console.WriteLine($"{first} {last}, {age}");   // Alice Smith, 30

        // ---- Product record with methods ----
        var coffee = new Product("Coffee", 4.50m);
        Console.WriteLine(coffee.Display);                 // Coffee @ $4.50
        var discounted = coffee.WithDiscount(10);
        Console.WriteLine(discounted.Display);             // Coffee @ $4.05

        // ---- record struct ----
        var pt = new Point3D(1.0, 2.0, 3.0);
        Console.WriteLine(pt);              // Point3D { X = 1, Y = 2, Z = 3 }

        // record struct is a VALUE type — copied on assignment
        var pt2 = pt;   // independent copy

        // ---- Inheritance with records ----
        // Records can inherit from other records (not structs)
        // public record Employee(string Name, string Department) : Person(Name, "Smith", 30);

        // ---- Struct vs Record vs Class (summary) ----
        //
        // struct  — value type, copy semantics, no heap, best for small primitives
        // class   — reference type, heap, reference equality, mutable by default
        // record  — reference type, heap, VALUE equality, immutable by convention (C# 9+)
        // record struct — value type, VALUE equality (C# 10+)
        //
        // Use record when:
        //   - Data transfer objects (DTOs), domain value objects
        //   - Immutable configuration / settings
        //   - You want equality based on content, not identity

        Console.WriteLine("--- Struct value semantics ---");
        var p1 = new Point2D(1, 2);
        var p2 = p1;     // record class — copies reference
        Console.WriteLine(p1 == p2);   // True (record value equality)

        var p3 = new Point3D(1, 2, 3);
        var p4 = p3;     // record struct — copies value
        Console.WriteLine(p3 == p4);   // True
    }
}
