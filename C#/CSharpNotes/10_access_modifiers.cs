namespace F10;

// =============================================
// ACCESS MODIFIERS
// =============================================

// public     — accessible everywhere
// private    — accessible only within the same class (DEFAULT for members)
// protected  — accessible within the class and derived classes
// internal   — accessible within the same assembly (.dll / .exe)
// protected internal — protected OR internal
// private protected  — protected AND internal (most restrictive combination)

public class BankAccount
{
    // private — only this class can read/write
    private decimal _balance;

    // public — anyone can read
    public string Owner { get; }

    // protected — this class and subclasses
    protected string AccountType { get; set; } = "Checking";

    // internal — same project/assembly only
    internal string InternalRef { get; } = "REF-001";

    public BankAccount(string owner, decimal initialBalance)
    {
        Owner    = owner;
        _balance = initialBalance;
    }

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be positive");
        _balance += amount;
    }

    public bool Withdraw(decimal amount)
    {
        if (amount > _balance) return false;
        _balance -= amount;
        return true;
    }

    // Read-only public access to private field (encapsulation)
    public decimal Balance => _balance;
}

// =============================================
// STATIC
// =============================================

public class MathHelper
{
    // static const — belongs to the class, not instances
    public const double Tau = Math.PI * 2;

    // static field
    private static int _callCount = 0;

    // static method — call without creating an instance
    public static double CircleArea(double radius)
    {
        _callCount++;
        return Math.PI * radius * radius;
    }

    public static int CallCount => _callCount;
}

// static class — cannot be instantiated, all members must be static
public static class StringUtils
{
    public static string Capitalise(string s) =>
        string.IsNullOrEmpty(s) ? s : char.ToUpper(s[0]) + s[1..];
}

// =============================================
// READONLY vs CONST
// =============================================

public class Config
{
    // const — compile-time constant, implicitly static, value baked into IL
    public const int MaxRetries = 3;

    // readonly — runtime constant, set once in constructor, can differ per instance
    public readonly string ConnectionString;

    public Config(string connStr)
    {
        ConnectionString = connStr;   // set in constructor
    }

    // readonly static — shared but set at runtime
    public static readonly DateTime StartTime = DateTime.UtcNow;
}

// =============================================
// DEMO
// =============================================

public static class AccessModifiers
{
    public static void Run()
    {
        var account = new BankAccount("Nicholas", 1000m);
        account.Deposit(500m);
        Console.WriteLine(account.Balance);         // 1500
        account.Withdraw(200m);
        Console.WriteLine(account.Balance);         // 1300
        // account._balance   ← ERROR: private

        // Static — call on the class
        double area = MathHelper.CircleArea(5);
        Console.WriteLine($"Area: {area:F2}");      // Area: 78.54
        Console.WriteLine($"Calls: {MathHelper.CallCount}");  // Calls: 1
        Console.WriteLine($"Tau: {MathHelper.Tau:F4}");       // Tau: 6.2832

        // Static class
        Console.WriteLine(StringUtils.Capitalise("hello"));   // Hello

        // Const vs readonly
        Console.WriteLine(Config.MaxRetries);       // 3
        var cfg = new Config("Server=localhost;");
        Console.WriteLine(cfg.ConnectionString);    // Server=localhost;
        Console.WriteLine(Config.StartTime);        // (program start time)
    }
}
