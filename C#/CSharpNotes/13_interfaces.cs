namespace F13;

// =============================================
// INTERFACE  — a pure contract (no state, only method signatures)
// =============================================

// An interface:
//   - Defines what a class must DO, not HOW
//   - All members are implicitly public
//   - A class can implement multiple interfaces (unlike inheritance, which is single)
//   - C# 8+ allows default method implementations (but use sparingly)

public interface IAnimal
{
    string Name { get; }
    string Speak();
    void   Move();
}

public interface ISwimmable
{
    void Swim();
    int  MaxDepth => 10;   // default implementation (C# 8+) — can be overridden
}

public interface IFlyable
{
    void Fly();
}

// =============================================
// IMPLEMENTING INTERFACES
// =============================================

public class Duck : IAnimal, ISwimmable, IFlyable   // multiple interfaces OK
{
    public string Name { get; }

    public Duck(string name) => Name = name;

    // Must implement all IAnimal members
    public string Speak() => $"{Name} quacks";
    public void   Move()  => Console.WriteLine($"{Name} waddles");

    // ISwimmable
    public void Swim() => Console.WriteLine($"{Name} swims");

    // IFlyable
    public void Fly() => Console.WriteLine($"{Name} flies");
}

public class Fish : IAnimal, ISwimmable
{
    public string Name { get; }
    public Fish(string name) => Name = name;

    public string Speak() => $"{Name} blubs";
    public void   Move()  => Console.WriteLine($"{Name} swims");
    public void   Swim()  => Console.WriteLine($"{Name} swims fast");

    // Override the default MaxDepth
    public int MaxDepth => 200;
}

// =============================================
// EXPLICIT INTERFACE IMPLEMENTATION
// =============================================

// Use when two interfaces have conflicting member names,
// or when you want to hide a member from normal usage

public interface ILogger
{
    void Log(string message);
}

public interface IDebugLogger
{
    void Log(string message);   // same name, different intent
}

public class AppLogger : ILogger, IDebugLogger
{
    // Explicit implementation — only callable through the interface reference
    void ILogger.Log(string message)      => Console.WriteLine($"[LOG] {message}");
    void IDebugLogger.Log(string message) => Console.WriteLine($"[DBG] {message}");
}

// =============================================
// INTERFACE AS PARAMETER TYPE  (dependency inversion)
// =============================================

public interface IRepository<T>
{
    void   Add(T item);
    T?     GetById(int id);
    IEnumerable<T> GetAll();
}

// =============================================
// INTERFACE vs ABSTRACT CLASS (quick comparison)
// =============================================
//
// Interface:
//   - Pure contract, no state (no instance fields)
//   - A class can implement MANY interfaces
//   - Use for defining capabilities / roles (ISwimmable, IDisposable)
//
// Abstract class:
//   - Can have state (instance fields), constructors, concrete methods
//   - A class can inherit only ONE abstract class
//   - Use when sharing common implementation among related types

// =============================================
// DEMO
// =============================================

public static class Interfaces
{
    public static void Run()
    {
        var duck = new Duck("Donald");
        var fish = new Fish("Nemo");

        // Via concrete type
        duck.Swim();
        duck.Fly();
        Console.WriteLine(duck.Speak());    // Donald quacks

        // Via interface reference — only interface members visible
        IAnimal animal = duck;
        Console.WriteLine(animal.Speak());  // Donald quacks
        animal.Move();                      // Donald waddles

        ISwimmable swimmer = duck;
        swimmer.Swim();
        Console.WriteLine(swimmer.MaxDepth);        // 10  (default)
        Console.WriteLine(((ISwimmable)fish).MaxDepth);  // 200 (overridden)

        // Polymorphic collection of interface type
        List<ISwimmable> swimmers = new() { duck, fish };
        foreach (ISwimmable s in swimmers)
            s.Swim();

        // Check if object implements interface
        object obj = duck;
        if (obj is IFlyable flier)
            flier.Fly();    // Donald flies

        // ---- Explicit interface implementation ----
        var logger = new AppLogger();
        // logger.Log(...)  ← AMBIGUOUS / would not compile as there's no implicit version
        ((ILogger)logger).Log("App started");       // [LOG] App started
        ((IDebugLogger)logger).Log("Debug info");   // [DBG] Debug info
    }
}
