namespace F25;

// =============================================
// DELEGATES  — type-safe function pointer
// =============================================

// A delegate is a type that holds a reference to a method
// Func<>, Action<>, Predicate<> are all built-in generic delegates
// You can also define custom delegates when the signature matters semantically

public delegate int MathOperation(int a, int b);     // custom delegate type
public delegate void Notifier(string message);

public static class DelegatesEvents
{
    public static void Run()
    {
        // =============================================
        // BASIC DELEGATE USAGE
        // =============================================

        MathOperation add = (a, b) => a + b;
        MathOperation mul = (a, b) => a * b;

        Console.WriteLine(add(3, 4));   // 7
        Console.WriteLine(mul(3, 4));   // 12

        // Assign a named method
        MathOperation subtract = Subtract;
        Console.WriteLine(subtract(10, 3));   // 7

        // =============================================
        // MULTICAST DELEGATES  (invocation list)
        // =============================================

        // A delegate can hold multiple methods — all called in order
        Notifier notify = msg => Console.WriteLine($"[Email] {msg}");
        notify += msg => Console.WriteLine($"[SMS] {msg}");
        notify += msg => Console.WriteLine($"[Log] {msg}");

        notify("Server started");
        // [Email] Server started
        // [SMS] Server started
        // [Log] Server started

        // Remove a handler
        Notifier sms = msg => Console.WriteLine($"[SMS] {msg}");
        notify -= sms;    // Note: -= only removes if the exact same instance is in the list

        // =============================================
        // EVENTS  — delegate with restrictions (encapsulated publish/subscribe)
        // =============================================

        // Events are delegates that:
        //   - Can only be invoked by the class that declared them (the publisher)
        //   - Subscribers use += / -= to register/unregister
        //   - Prevent subscribers from overwriting each other's handlers

        var button = new Button("Submit");

        // Subscribe
        button.Clicked += OnButtonClicked;
        button.Clicked += (sender, args) => Console.WriteLine($"Lambda: {args.Message}");

        button.SimulateClick();
        // Button clicked: [Button: Submit clicked]
        // Lambda: Submit clicked

        // Unsubscribe
        button.Clicked -= OnButtonClicked;
        button.SimulateClick();
        // Lambda: Submit clicked  (only lambda handler remains)

        // =============================================
        // EVENTHANDLER<T>  (standard .NET event pattern)
        // =============================================

        // Standard pattern:
        //   event EventHandler<TEventArgs> SomeEvent;
        //   void Handler(object? sender, TEventArgs e) { ... }

        // =============================================
        // FUNC AND ACTION AS CALLBACKS
        // =============================================

        // Passing behaviour as a parameter
        ProcessItems(new[] { 1, 2, 3, 4, 5 },
            filter:    n => n % 2 == 0,
            transform: n => n * n,
            onResult:  n => Console.Write(n + " "));
        Console.WriteLine();   // 4 16

        // =============================================
        // DELEGATE vs INTERFACE (when to use which)
        // =============================================

        // Use delegate/Func/Action when:
        //   - Single method (callback, predicate, transform)
        //   - Behaviour varies per call site
        //   - Composing pipelines / event handling

        // Use interface when:
        //   - Multiple related methods
        //   - Long-lived dependency
        //   - Dependency injection / testing (mock the interface)
    }

    static int Subtract(int a, int b) => a - b;

    static void OnButtonClicked(object? sender, ButtonEventArgs e)
        => Console.WriteLine($"Button clicked: [{e.Message}]");

    static void ProcessItems(
        int[] items,
        Func<int, bool>    filter,
        Func<int, int>     transform,
        Action<int>        onResult)
    {
        foreach (int item in items)
        {
            if (filter(item))
                onResult(transform(item));
        }
    }
}

// =============================================
// EVENT INFRASTRUCTURE
// =============================================

public class ButtonEventArgs : EventArgs
{
    public string Message { get; }
    public ButtonEventArgs(string msg) => Message = msg;
}

public class Button
{
    public string Label { get; }

    // 'event' keyword: encapsulates the delegate
    public event EventHandler<ButtonEventArgs>? Clicked;

    public Button(string label) => Label = label;

    public void SimulateClick()
    {
        // Only the owning class can invoke the event
        Clicked?.Invoke(this, new ButtonEventArgs($"{Label} clicked"));
    }
}
