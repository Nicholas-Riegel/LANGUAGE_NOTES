namespace F12;

// =============================================
// ABSTRACT CLASS  — partial blueprint, cannot be instantiated
// =============================================

// abstract class has:
//   - abstract methods: must be overridden in derived class
//   - virtual methods:  can be overridden
//   - concrete methods: shared implementation

public abstract class Shape
{
    public string Color { get; set; } = "Red";

    // abstract — no implementation here, derived class MUST override
    public abstract double Area();
    public abstract double Perimeter();

    // concrete — shared by all shapes
    public void PrintInfo() =>
        Console.WriteLine($"{GetType().Name}: Area={Area():F2}, Perimeter={Perimeter():F2}, Color={Color}");
}

public class Circle : Shape
{
    public double Radius { get; }
    public Circle(double radius) => Radius = radius;

    public override double Area()      => Math.PI * Radius * Radius;
    public override double Perimeter() => 2 * Math.PI * Radius;
}

public class Rectangle : Shape
{
    public double Width  { get; }
    public double Height { get; }
    public Rectangle(double w, double h) { Width = w; Height = h; }

    public override double Area()      => Width * Height;
    public override double Perimeter() => 2 * (Width + Height);
}

// =============================================
// POLYMORPHISM  — same interface, different behaviour
// =============================================

// When a base-class reference points to a derived object,
// virtual/abstract methods resolve to the DERIVED class implementation at runtime

public static class Polymorphism
{
    public static void Run()
    {
        // ---- Abstract classes ----
        // Shape s = new Shape();   ← ERROR: cannot instantiate abstract class

        Circle    circle = new Circle(5);
        Rectangle rect   = new Rectangle(4, 6);

        circle.PrintInfo();   // Circle: Area=78.54, Perimeter=31.42, Color=Red
        rect.PrintInfo();     // Rectangle: Area=24.00, Perimeter=20.00, Color=Red

        // ---- Polymorphic collection ----
        List<Shape> shapes = new() { circle, rect, new Circle(3) };

        double totalArea = 0;
        foreach (Shape s in shapes)
        {
            totalArea += s.Area();   // calls Circle.Area() or Rectangle.Area() dynamically
        }
        Console.WriteLine($"Total area: {totalArea:F2}");   // 24 + 78.54 + 28.27 = 130.81

        // ---- Type checking ----
        foreach (Shape s in shapes)
        {
            // 'is' with pattern variable
            if (s is Circle c)
                Console.WriteLine($"Circle radius: {c.Radius}");

            // 'as' — returns null if wrong type (no exception)
            Rectangle? r = s as Rectangle;
            if (r != null)
                Console.WriteLine($"Rect {r.Width}×{r.Height}");
        }

        // ---- Casting ----
        Shape shape = new Circle(2);
        Circle c2 = (Circle)shape;          // explicit cast — throws InvalidCastException if wrong type
        Console.WriteLine(c2.Radius);       // 2

        // Safe cast via 'as'
        Rectangle? maybeRect = shape as Rectangle;
        Console.WriteLine(maybeRect == null);   // True (no exception)

        // ---- Virtual vs Abstract (summary) ----
        // virtual  — base class HAS an implementation; derived class may override
        // abstract — base class has NO implementation; derived class MUST override
        // override — derived class replaces the base implementation
        // sealed   — on an override, prevents further overriding down the hierarchy

        // ---- Sealed override ----
        // class A { public virtual void Foo() {} }
        // class B : A { public sealed override void Foo() {} }  // no further override
        // class C : B { public override void Foo() {} }         // ERROR
    }
}
