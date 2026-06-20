namespace F14;

// =============================================
// ENUMS  — a named set of integer constants
// =============================================

public enum Direction
{
    North,   // 0
    East,    // 1
    South,   // 2
    West     // 3
}

// Custom underlying values
public enum HttpStatus
{
    OK        = 200,
    Created   = 201,
    BadRequest = 400,
    NotFound  = 404,
    ServerError = 500
}

// =============================================
// FLAGS ENUM  — enum values as bit masks (can combine with |)
// =============================================

[Flags]
public enum Permissions
{
    None    = 0,        // 0000
    Read    = 1,        // 0001
    Write   = 2,        // 0010
    Execute = 4,        // 0100
    Delete  = 8,        // 1000
    All     = Read | Write | Execute | Delete
}

// =============================================
// STRUCTS  — value type (copy semantics, stack-allocated for small sizes)
// =============================================

// Use struct when:
//   - Small, logically immutable value (Point, Color, Money)
//   - Short-lived, no inheritance needed
//   - Performance-critical (avoids heap allocation)

public struct Point
{
    public double X { get; }
    public double Y { get; }

    public Point(double x, double y) { X = x; Y = y; }

    public double DistanceTo(Point other) =>
        Math.Sqrt(Math.Pow(X - other.X, 2) + Math.Pow(Y - other.Y, 2));

    public override string ToString() => $"({X}, {Y})";
}

// readonly struct — guarantees immutability, allows compiler optimisations
public readonly struct Money
{
    public decimal Amount   { get; }
    public string  Currency { get; }

    public Money(decimal amount, string currency) { Amount = amount; Currency = currency; }

    public Money Add(Money other)
    {
        if (Currency != other.Currency) throw new InvalidOperationException("Currency mismatch");
        return new Money(Amount + other.Amount, Currency);
    }

    public override string ToString() => $"{Amount} {Currency}";
}

// =============================================
// DEMO
// =============================================

public static class Enums
{
    public static void Run()
    {
        // ---- Basic enum ----
        Direction dir = Direction.North;
        Console.WriteLine(dir);              // North
        Console.WriteLine((int)dir);         // 0

        // Cast int to enum
        Direction d2 = (Direction)2;
        Console.WriteLine(d2);               // South

        // Enum in switch
        string label = dir switch
        {
            Direction.North => "Going up",
            Direction.South => "Going down",
            Direction.East  => "Going right",
            Direction.West  => "Going left",
            _               => "Unknown"
        };
        Console.WriteLine(label);            // Going up

        // Enum helpers
        Console.WriteLine(Enum.GetNames<Direction>().Length);      // 4
        foreach (string name in Enum.GetNames<Direction>())
            Console.Write(name + " ");                             // North East South West
        Console.WriteLine();

        bool valid = Enum.IsDefined<Direction>((Direction)99);
        Console.WriteLine(valid);            // False

        // Parse from string
        Direction parsed = Enum.Parse<Direction>("East");
        Console.WriteLine(parsed);           // East

        Enum.TryParse<Direction>("West", out Direction tryParsed);
        Console.WriteLine(tryParsed);        // West

        // ---- Custom values ----
        HttpStatus status = HttpStatus.NotFound;
        Console.WriteLine((int)status);      // 404
        Console.WriteLine(status);           // NotFound

        // ---- Flags enum ----
        Permissions perms = Permissions.Read | Permissions.Write;
        Console.WriteLine(perms);            // Read, Write

        // Check if a flag is set
        bool canRead = perms.HasFlag(Permissions.Read);
        Console.WriteLine(canRead);          // True

        bool canDelete = perms.HasFlag(Permissions.Delete);
        Console.WriteLine(canDelete);        // False

        // Add a flag
        perms |= Permissions.Execute;
        Console.WriteLine(perms);            // Read, Write, Execute

        // Remove a flag
        perms &= ~Permissions.Write;
        Console.WriteLine(perms);            // Read, Execute

        // ---- Struct ----
        Point p1 = new Point(0, 0);
        Point p2 = new Point(3, 4);

        Console.WriteLine(p1);                       // (0, 0)
        Console.WriteLine(p1.DistanceTo(p2));        // 5

        // Structs are COPIED on assignment (value semantics)
        Point p3 = p1;    // p3 is a separate copy
        Console.WriteLine(p3);   // (0, 0) — independent from p1

        // ---- Readonly struct ----
        var price = new Money(9.99m, "CHF");
        var tax   = new Money(0.77m, "CHF");
        Console.WriteLine(price.Add(tax));            // 10.76 CHF
    }
}
