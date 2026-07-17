namespace F37;

// =============================================
// DATABASE CONNECTIVITY
// =============================================

// Two main approaches in .NET:
//   1. ADO.NET (Active Data Objects .NET) — low-level, explicit SQL, lightweight
//   2. Entity Framework Core (EF Core) — ORM (Object-Relational Mapping), LINQ queries, higher-level
//
// Also worth knowing: Dapper (micro-ORM — combines SQL control with object mapping)

// =============================================
// ADO.NET BASICS
// =============================================

// ADO.NET gives you full control over SQL execution
// Core classes:
//   - **DbConnection** — Connection to database (SqlConnection, NpgsqlConnection, etc.)
//   - **DbCommand** — Executes SQL statements
//   - **DbDataReader** — Forward-only stream of results (fast, low memory)
//   - **DbParameter** — Parameterized queries (prevents SQL injection)

using System.Data;
using Microsoft.Data.Sqlite;   // Lightweight, works without a server
using Microsoft.EntityFrameworkCore;

public static class DatabaseConnectivity
{
    public static void Run()
    {
        Console.WriteLine("=== ADO.NET Examples ===\n");
        AdoNetExamples();

        Console.WriteLine("\n=== Entity Framework Core Examples ===\n");
        EntityFrameworkExamples();

        Console.WriteLine("\n=== Async Database Operations ===\n");
        AsyncDatabaseOperations().Wait();
    }

    // =============================================
    // ADO.NET — EXPLICIT SQL
    // =============================================

    static void AdoNetExamples()
    {
        // Connection string — typically stored in appsettings.json
        // Format varies by database provider (SQL Server, PostgreSQL, MySQL, etc.)
        string connectionString = "Data Source=:memory:";

        // ALWAYS use 'using' to ensure connection is closed & disposed
        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        // Create table (normally done via migrations)
        using (var createCmd = connection.CreateCommand())
        {
            createCmd.CommandText = @"
                CREATE TABLE Users (
                    Id INTEGER PRIMARY KEY,
                    Name TEXT NOT NULL,
                    Email TEXT NOT NULL,
                    Age INTEGER
                )";
            createCmd.ExecuteNonQuery();
        }

        // INSERT with parameterized query — prevents SQL injection
        using (var insertCmd = connection.CreateCommand())
        {
            insertCmd.CommandText = "INSERT INTO Users (Id, Name, Email, Age) VALUES (@id, @name, @email, @age)";
            
            // Parameters protect against SQL injection
            insertCmd.Parameters.AddWithValue("@id", 1);
            insertCmd.Parameters.AddWithValue("@name", "Alice Johnson");
            insertCmd.Parameters.AddWithValue("@email", "alice@example.com");
            insertCmd.Parameters.AddWithValue("@age", 28);
            
            int rowsAffected = insertCmd.ExecuteNonQuery();
            Console.WriteLine($"Inserted {rowsAffected} row(s)");
        }

        // Bulk insert for demonstration
        InsertUser(connection, 2, "Bob Smith", "bob@example.com", 35);
        InsertUser(connection, 3, "Charlie Brown", "charlie@example.com", 42);

        // SELECT with DataReader — most efficient for reading
        using (var selectCmd = connection.CreateCommand())
        {
            selectCmd.CommandText = "SELECT Id, Name, Email, Age FROM Users WHERE Age > @minAge";
            selectCmd.Parameters.AddWithValue("@minAge", 30);

            using var reader = selectCmd.ExecuteReader();
            
            Console.WriteLine("\nUsers older than 30:");
            while (reader.Read())
            {
                // Access columns by index or name
                int id       = reader.GetInt32(0);
                string name  = reader.GetString(1);
                string email = reader.GetString(2);
                int age      = reader.GetInt32(3);
                
                Console.WriteLine($"  [{id}] {name} ({age}) — {email}");
            }
        }

        // ExecuteScalar — for single value queries (COUNT, MAX, etc.)
        using (var countCmd = connection.CreateCommand())
        {
            countCmd.CommandText = "SELECT COUNT(*) FROM Users";
            long count = (long)countCmd.ExecuteScalar()!;
            Console.WriteLine($"\nTotal users: {count}");
        }

        // UPDATE
        using (var updateCmd = connection.CreateCommand())
        {
            updateCmd.CommandText = "UPDATE Users SET Age = @newAge WHERE Id = @id";
            updateCmd.Parameters.AddWithValue("@newAge", 29);
            updateCmd.Parameters.AddWithValue("@id", 1);
            updateCmd.ExecuteNonQuery();
            Console.WriteLine("Updated Alice's age to 29");
        }

        // DELETE
        using (var deleteCmd = connection.CreateCommand())
        {
            deleteCmd.CommandText = "DELETE FROM Users WHERE Id = @id";
            deleteCmd.Parameters.AddWithValue("@id", 3);
            deleteCmd.ExecuteNonQuery();
            Console.WriteLine("Deleted Charlie");
        }
    }

    static void InsertUser(SqliteConnection conn, int id, string name, string email, int age)
    {
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "INSERT INTO Users (Id, Name, Email, Age) VALUES (@id, @name, @email, @age)";
        cmd.Parameters.AddWithValue("@id", id);
        cmd.Parameters.AddWithValue("@name", name);
        cmd.Parameters.AddWithValue("@email", email);
        cmd.Parameters.AddWithValue("@age", age);
        cmd.ExecuteNonQuery();
    }

    // =============================================
    // ENTITY FRAMEWORK CORE — ORM APPROACH
    // =============================================

    static void EntityFrameworkExamples()
    {
        // EF Core setup (normally in Startup.cs / Program.cs):
        // services.AddDbContext<AppDbContext>(options =>
        //     options.UseSqlServer(connectionString));

        // Note: Using SQLite here for demo purposes (no server required)
        // SQLite has some limitations: decimal types in ORDER BY and aggregates
        // need ToList() materialization first (SQL Server, PostgreSQL don't have this issue)
        
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite("Data Source=:memory:")
            .Options;

        using var context = new AppDbContext(options);
        
        // Ensure database is created (in-memory needs this)
        context.Database.OpenConnection();
        context.Database.EnsureCreated();

        // INSERT — Add entities
        context.Products.Add(new Product { Name = "Laptop", Price = 999.99m, Stock = 10 });
        context.Products.Add(new Product { Name = "Mouse", Price = 24.99m, Stock = 50 });
        context.Products.Add(new Product { Name = "Keyboard", Price = 79.99m, Stock = 30 });
        
        context.SaveChanges();  // Commits to database
        Console.WriteLine("Inserted 3 products");

        // SELECT — LINQ queries
        // Note: SQLite limitation — materialize with ToList() before ordering by decimal
        var expensiveProducts = context.Products
            .Where(p => p.Price > 50)
            .ToList()  // Materialize first (SQLite doesn't support decimal in ORDER BY)
            .OrderByDescending(p => p.Price)
            .ToList();

        Console.WriteLine("\nProducts over $50:");
        foreach (var product in expensiveProducts)
        {
            Console.WriteLine($"  {product.Name} — ${product.Price} (Stock: {product.Stock})");
        }

        // FIND by primary key
        var laptop = context.Products.Find(1);
        if (laptop != null)
        {
            Console.WriteLine($"\nFound by ID: {laptop.Name}");
        }

        // UPDATE — modify tracked entity
        if (laptop != null)
        {
            laptop.Price = 899.99m;
            laptop.Stock -= 1;
            context.SaveChanges();
            Console.WriteLine("Updated laptop price and stock");
        }

        // DELETE
        var mouse = context.Products.FirstOrDefault(p => p.Name == "Mouse");
        if (mouse != null)
        {
            context.Products.Remove(mouse);
            context.SaveChanges();
            Console.WriteLine("Deleted Mouse");
        }

        // Aggregate queries
        // Note: SQLite limitation — materialize first for decimal aggregates
        var products = context.Products.ToList();
        decimal avgPrice = products.Average(p => p.Price);
        int totalStock   = products.Sum(p => p.Stock);
        Console.WriteLine($"\nAverage price: ${avgPrice:F2}");
        Console.WriteLine($"Total stock: {totalStock}");

        // Raw SQL (when you need it)
        var results = context.Products
            .FromSqlRaw("SELECT * FROM Products WHERE Price > {0}", 70)
            .ToList();
        Console.WriteLine($"\nRaw SQL query returned {results.Count} product(s)");
    }

    // =============================================
    // ASYNC DATABASE OPERATIONS — BEST PRACTICE
    // =============================================

    static async Task AsyncDatabaseOperations()
    {
        // Always use async methods for database operations in production
        // Benefits:
        //   - Frees up thread while waiting for I/O
        //   - Better scalability (especially in ASP.NET Core)
        //   - Non-blocking

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite("Data Source=:memory:")
            .Options;

        await using var context = new AppDbContext(options);
        await context.Database.OpenConnectionAsync();
        await context.Database.EnsureCreatedAsync();

        // Async inserts
        await context.Products.AddAsync(new Product { Name = "Monitor", Price = 299.99m, Stock = 15 });
        await context.SaveChangesAsync();
        Console.WriteLine("Async insert completed");

        // Async queries
        var products = await context.Products
            .Where(p => p.Stock > 10)
            .ToListAsync();

        Console.WriteLine($"Found {products.Count} product(s) with stock > 10:");
        foreach (var p in products)
        {
            Console.WriteLine($"  {p.Name}");
        }

        // Async aggregates
        int count = await context.Products.CountAsync();
        Console.WriteLine($"\nTotal products: {count}");
    }
}

// =============================================
// EF CORE — MODELS (ENTITIES)
// =============================================

public class Product
{
    public int Id { get; set; }              // Primary key by convention
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
}

// =============================================
// EF CORE — DbContext (Database session)
// =============================================

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // DbSet<T> represents a table
    public DbSet<Product> Products => Set<Product>();

    // Optional: Fluent API configuration (alternative to Data Annotations)
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Name).IsRequired().HasMaxLength(100);
            entity.Property(p => p.Price).HasPrecision(18, 2);
            entity.HasIndex(p => p.Name);  // Index for performance
        });
    }
}

// =============================================
// CONFIGURATION & CONNECTION STRINGS
// =============================================

// In production, store connection strings in appsettings.json:
//
// {
//   "ConnectionStrings": {
//     "DefaultConnection": "Server=localhost;Database=MyDb;User=sa;Password=***;"
//   }
// }
//
// Access in code:
//   var connectionString = configuration.GetConnectionString("DefaultConnection");
//
// Never hardcode credentials in source code!
// Use Azure Key Vault, AWS Secrets Manager, or environment variables in production

// =============================================
// COMMON DATABASE PROVIDERS
// =============================================

// **SQL Server** — Microsoft.Data.SqlClient
//   Connection string: "Server=localhost;Database=MyDb;User Id=sa;Password=***;TrustServerCertificate=true"
//
// **PostgreSQL** — Npgsql.EntityFrameworkCore.PostgreSQL
//   Connection string: "Host=localhost;Database=mydb;Username=postgres;Password=***"
//
// **MySQL** — Pomelo.EntityFrameworkCore.MySql
//   Connection string: "Server=localhost;Database=mydb;User=root;Password=***;"
//
// **SQLite** — Microsoft.Data.Sqlite (great for testing, local development)
//   Connection string: "Data Source=app.db" or "Data Source=:memory:"
//
// **Azure SQL** — Same as SQL Server but cloud-hosted
//   Connection string: "Server=tcp:myserver.database.windows.net,1433;Database=mydb;..."

// =============================================
// KEY INTERVIEW POINTS
// =============================================

// **Parameterized queries** — ALWAYS use parameters to prevent SQL injection
//   Bad:  $"SELECT * FROM Users WHERE Id = {userId}"  ← SQL injection vulnerable
//   Good: command.Parameters.AddWithValue("@id", userId)
//
// **Using statement** — Ensures DbConnection/DbCommand/DbDataReader are disposed
//   Connections are expensive resources; always dispose them
//
// **Async/await** — Use async methods for all database I/O in production
//   - Improves scalability (thread pool efficiency)
//   - Required for ASP.NET Core performance
//
// **EF Core vs ADO.NET**
//   - EF Core: Faster development, type-safe, LINQ queries, migrations
//   - ADO.NET: More control, better performance for complex queries, less overhead
//   - Hybrid: Use EF Core for CRUD, ADO.NET for complex reports/bulk operations
//
// **Connection pooling** — .NET automatically reuses connections
//   Don't create a single static connection; use 'using' and let pooling handle it
//
// **Transactions** — Use DbTransaction or EF Core transactions for multi-step operations
//   Example: using var transaction = context.Database.BeginTransaction();
//            try { /* work */ transaction.Commit(); } catch { transaction.Rollback(); }
//
// **Migrations** — EF Core tracks schema changes
//   dotnet ef migrations add InitialCreate
//   dotnet ef database update
