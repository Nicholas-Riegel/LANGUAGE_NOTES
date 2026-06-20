namespace F32;

// =============================================
// DEPENDENCY INJECTION (DI)
// =============================================

// DI is the most important design pattern in .NET / ASP.NET Core
//
// The problem it solves:
//   Without DI: classes create their own dependencies → tightly coupled, hard to test
//   With DI:    dependencies are provided from outside → loosely coupled, easy to test
//
// The pattern: Depend on ABSTRACTIONS (interfaces), not CONCRETIONS (classes)

// =============================================
// DEFINE THE CONTRACT (interface)
// =============================================

public interface IEmailService
{
    void Send(string to, string subject, string body);
}

public interface ILogger
{
    void Log(string message);
}

public interface IUserRepository
{
    User?  GetById(int id);
    void   Save(User user);
}

// =============================================
// IMPLEMENTATIONS
// =============================================

public class SmtpEmailService : IEmailService
{
    public void Send(string to, string subject, string body)
        => Console.WriteLine($"[SMTP] To: {to} | Subject: {subject} | Body: {body}");
}

public class ConsoleLogger : ILogger
{
    public void Log(string message)
        => Console.WriteLine($"[LOG {DateTime.Now:HH:mm:ss}] {message}");
}

public class InMemoryUserRepository : IUserRepository
{
    private readonly Dictionary<int, User> _store = new();

    public User?  GetById(int id) => _store.GetValueOrDefault(id);
    public void   Save(User user) => _store[user.Id] = user;
}

// =============================================
// CONSUMER — depends on interfaces only
// =============================================

public class UserService
{
    private readonly IUserRepository _repo;
    private readonly IEmailService   _email;
    private readonly ILogger         _logger;

    // Constructor injection — dependencies are provided by the DI container
    public UserService(IUserRepository repo, IEmailService email, ILogger logger)
    {
        _repo   = repo;
        _email  = email;
        _logger = logger;
    }

    public void Register(User user)
    {
        _repo.Save(user);
        _email.Send(user.Email, "Welcome!", $"Hello, {user.Name}!");
        _logger.Log($"Registered user: {user.Name}");
    }
}

public record User(int Id, string Name, string Email);

// =============================================
// SERVICE LIFETIMES  (crucial for ASP.NET Core)
// =============================================

// Transient  — new instance every time it's requested
//              Use for: lightweight stateless services
//
// Scoped     — one instance per HTTP request (ASP.NET Core)
//              Use for: DB context, per-request state
//
// Singleton  — one instance for the whole application lifetime
//              Use for: caches, configuration, shared services (must be thread-safe)

// =============================================
// MANUAL DI  (without a container — shows the principle clearly)
// =============================================

public static class DependencyInjection
{
    public static void Run()
    {
        // ---- Manual composition root ----
        IUserRepository repo   = new InMemoryUserRepository();
        IEmailService   email  = new SmtpEmailService();
        ILogger         logger = new ConsoleLogger();

        // Inject dependencies into the consumer
        UserService service = new UserService(repo, email, logger);

        service.Register(new User(1, "Nicholas", "nick@example.com"));
        service.Register(new User(2, "Alice",    "alice@example.com"));

        // Verify
        User? found = repo.GetById(1);
        Console.WriteLine(found?.Name);   // Nicholas

        // =============================================
        // WITH Microsoft.Extensions.DependencyInjection
        // =============================================

        // In a real app (.NET / ASP.NET Core) you'd use the container:
        //
        //   var services = new ServiceCollection();
        //   services.AddTransient<IUserRepository, InMemoryUserRepository>();
        //   services.AddTransient<IEmailService,   SmtpEmailService>();
        //   services.AddSingleton<ILogger,         ConsoleLogger>();
        //   services.AddTransient<UserService>();
        //
        //   ServiceProvider provider = services.BuildServiceProvider();
        //   var userService = provider.GetRequiredService<UserService>();
        //   userService.Register(new User(3, "Bob", "bob@example.com"));
        //
        // In ASP.NET Core — register in Program.cs:
        //   builder.Services.AddScoped<IUserRepository, SqlUserRepository>();
        //   builder.Services.AddSingleton<ILogger, ConsoleLogger>();

        Console.WriteLine("DI demo complete");

        // =============================================
        // TESTABILITY  — why DI matters for interviews
        // =============================================

        // Because UserService depends on interfaces, you can inject FAKES in tests:
        //
        //   var fakeEmail = new FakeEmailService();   // records what was sent
        //   var fakeRepo  = new FakeUserRepo();       // in-memory store
        //   var sut = new UserService(fakeRepo, fakeEmail, new ConsoleLogger());
        //   sut.Register(new User(1, "Test", "test@test.com"));
        //   Assert.True(fakeEmail.SentEmails.Contains("test@test.com"));
    }
}
