namespace F11;

// =============================================
// INHERITANCE  — one class builds on another
// =============================================

public class Animal
{
    public string Name { get; set; }

    public Animal(string name)
    {
        Name = name;
    }

    // virtual — can be overridden in derived classes
    public virtual string Speak() => $"{Name} makes a sound";

    // Non-virtual — cannot be overridden (only hidden with 'new')
    public string Breathe() => $"{Name} breathes";

    public override string ToString() => $"Animal({Name})";
}

// =============================================
// DERIVED CLASS
// =============================================

public class Dog : Animal   // Dog inherits Animal
{
    public string Breed { get; set; }

    // 'base(...)' calls the parent constructor
    public Dog(string name, string breed) : base(name)
    {
        Breed = breed;
    }

    // override — replaces the virtual method
    public override string Speak() => $"{Name} barks";

    // 'base.' — call parent implementation
    public string SpeakAndBreathe() => $"{Speak()} and {base.Breathe()}";

    public override string ToString() => $"Dog({Name}, {Breed})";
}

// =============================================
// MULTI-LEVEL INHERITANCE
// =============================================

public class GoldenRetriever : Dog
{
    public GoldenRetriever(string name) : base(name, "Golden Retriever") { }

    public override string Speak() => $"{Name} says fetch!";
}

// =============================================
// SEALED  (prevents further inheritance)
// =============================================

public sealed class Chihuahua : Dog
{
    public Chihuahua(string name) : base(name, "Chihuahua") { }
    public override string Speak() => $"{Name} yaps loudly";
}
// class TinyChihuahua : Chihuahua { }  ← ERROR: cannot inherit from sealed class

// =============================================
// HIDING WITH 'new'  (different from override — avoids compiler warning)
// =============================================

public class Cat : Animal
{
    public Cat(string name) : base(name) { }

    // 'new' hides — only called when variable is typed as Cat (not Animal)
    public new string Breathe() => $"{Name} purrs while breathing";

    public override string Speak() => $"{Name} meows";
}

// =============================================
// CONSTRUCTOR CHAINING  (calling another constructor in the same class)
// =============================================

public class Vehicle
{
    public string Make  { get; }
    public string Model { get; }
    public int    Year  { get; }

    public Vehicle(string make, string model, int year)
    {
        Make  = make;
        Model = model;
        Year  = year;
    }

    // this(...) chains to the primary constructor
    public Vehicle(string make, string model) : this(make, model, DateTime.Now.Year) { }
}

// =============================================
// DEMO
// =============================================

public static class Inheritance
{
    public static void Run()
    {
        var dog    = new Dog("Rex", "Husky");
        var golden = new GoldenRetriever("Buddy");
        var cat    = new Cat("Whiskers");

        Console.WriteLine(dog.Speak());                  // Rex barks
        Console.WriteLine(golden.Speak());               // Buddy says fetch!
        Console.WriteLine(cat.Speak());                  // Whiskers meows
        Console.WriteLine(dog.SpeakAndBreathe());        // Rex barks and Rex breathes

        // ---- Polymorphism via base type reference ----
        Animal a1 = new Dog("Fido", "Poodle");
        Animal a2 = new Cat("Luna");
        Console.WriteLine(a1.Speak());   // Fido barks  (override in Dog)
        Console.WriteLine(a2.Speak());   // Luna meows  (override in Cat)

        // ---- 'new' hiding difference ----
        Cat   catRef    = cat;
        Animal animalRef = cat;
        Console.WriteLine(catRef.Breathe());     // Whiskers purrs while breathing (Cat.Breathe)
        Console.WriteLine(animalRef.Breathe());  // Whiskers breathes              (Animal.Breathe — hiding!)

        // ---- sealed ----
        var chi = new Chihuahua("Taco");
        Console.WriteLine(chi.Speak());          // Taco yaps loudly

        // ---- constructor chaining ----
        var car = new Vehicle("BMW", "X5");
        Console.WriteLine($"{car.Make} {car.Model} {car.Year}");  // BMW X5 2026

        // ---- base class methods are inherited ----
        Console.WriteLine(dog.Breathe());        // Rex breathes  (from Animal)
        Console.WriteLine(dog is Animal);        // True  (Dog IS-A Animal)
        Console.WriteLine(dog is Cat);           // False
    }
}
