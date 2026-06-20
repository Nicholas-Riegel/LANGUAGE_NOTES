namespace F34;

// =============================================
// DATETIME, DATEONLY, TIMEONLY, TIMESPAN, MATH
// =============================================

public static class DateTimeMath
{
    public static void Run()
    {
        // =============================================
        // DATETIME
        // =============================================

        DateTime now      = DateTime.Now;          // local machine time
        DateTime utcNow   = DateTime.UtcNow;       // UTC  (prefer this for storage)
        DateTime today    = DateTime.Today;        // today at midnight

        Console.WriteLine(now);          // e.g. 20/06/2026 14:30:00
        Console.WriteLine(utcNow);

        // Create specific date
        var birthday  = new DateTime(1990, 6, 15);           // year, month, day
        var meeting   = new DateTime(2026, 6, 20, 9, 30, 0); // + hour, minute, second

        // Properties
        Console.WriteLine(birthday.Year);        // 1990
        Console.WriteLine(birthday.Month);       // 6
        Console.WriteLine(birthday.Day);         // 15
        Console.WriteLine(birthday.DayOfWeek);   // Saturday
        Console.WriteLine(birthday.DayOfYear);   // 166

        // Arithmetic — returns new DateTime (immutable)
        DateTime nextWeek = now.AddDays(7);
        DateTime lastYear = now.AddYears(-1);
        DateTime inOneHour = now.AddHours(1);

        Console.WriteLine(nextWeek.ToString("yyyy-MM-dd"));

        // Difference between dates
        TimeSpan age     = DateTime.Today - birthday;
        Console.WriteLine($"Days old: {(int)age.TotalDays}");

        // Comparison
        Console.WriteLine(birthday < now);    // True
        Console.WriteLine(birthday.CompareTo(meeting));  // -1 (earlier)

        // Formatting
        Console.WriteLine(now.ToString("yyyy-MM-dd"));           // 2026-06-20
        Console.WriteLine(now.ToString("dd/MM/yyyy HH:mm:ss"));  // 20/06/2026 14:30:00
        Console.WriteLine(now.ToString("D"));                    // Saturday, 20 June 2026  (long date)
        Console.WriteLine(now.ToString("t"));                    // 14:30  (short time)
        Console.WriteLine(now.ToString("o"));                    // ISO 8601 (for APIs)

        // Parse
        DateTime parsed = DateTime.Parse("2026-06-20");
        DateTime.TryParse("2026-06-20", out DateTime tryParsed);
        Console.WriteLine(tryParsed);

        // =============================================
        // DATEONLY & TIMEONLY  (C# 10+ / .NET 6)
        // =============================================

        DateOnly dateOnly = new DateOnly(2026, 6, 20);
        TimeOnly timeOnly = new TimeOnly(14, 30, 0);

        Console.WriteLine(dateOnly);   // 20/06/2026
        Console.WriteLine(timeOnly);   // 14:30

        // Convert from DateTime
        DateOnly fromDt = DateOnly.FromDateTime(DateTime.Now);
        TimeOnly timeFromDt = TimeOnly.FromDateTime(DateTime.Now);

        // =============================================
        // DATETIMEOFFSET  (preferred for time-zone-aware storage)
        // =============================================

        DateTimeOffset dto = DateTimeOffset.UtcNow;
        DateTimeOffset localDto = DateTimeOffset.Now;
        Console.WriteLine(dto);   // includes offset e.g. 2026-06-20T12:30:00+00:00

        // For UTC comparisons, always use DateTimeOffset.UtcNow or DateTime.UtcNow

        // =============================================
        // TIMESPAN
        // =============================================

        TimeSpan oneHour    = TimeSpan.FromHours(1);
        TimeSpan tenMinutes = TimeSpan.FromMinutes(10);
        TimeSpan combined   = oneHour + tenMinutes;

        Console.WriteLine(combined.TotalMinutes);   // 70
        Console.WriteLine(combined.Hours);          // 1
        Console.WriteLine(combined.Minutes);        // 10
        Console.WriteLine(combined.ToString(@"hh\:mm\:ss"));   // 01:10:00

        // Measure elapsed time
        var sw = System.Diagnostics.Stopwatch.StartNew();
        System.Threading.Thread.Sleep(10);
        sw.Stop();
        Console.WriteLine($"Elapsed: {sw.ElapsedMilliseconds}ms");

        // =============================================
        // MATH CLASS
        // =============================================

        Console.WriteLine(Math.Abs(-5));            // 5
        Console.WriteLine(Math.Round(3.5));         // 4  (rounds to even by default)
        Console.WriteLine(Math.Round(2.5));         // 2  (banker's rounding)
        Console.WriteLine(Math.Round(3.567, 2));    // 3.57
        Console.WriteLine(Math.Floor(3.9));         // 3  (round down)
        Console.WriteLine(Math.Ceiling(3.1));       // 4  (round up)
        Console.WriteLine(Math.Truncate(3.9));      // 3  (towards zero)

        Console.WriteLine(Math.Pow(2, 10));         // 1024
        Console.WriteLine(Math.Sqrt(144));          // 12
        Console.WriteLine(Math.Log(Math.E));        // 1
        Console.WriteLine(Math.Log10(1000));        // 3
        Console.WriteLine(Math.Log2(256));          // 8

        Console.WriteLine(Math.Max(5, 10));         // 10
        Console.WriteLine(Math.Min(5, 10));         // 5
        Console.WriteLine(Math.Clamp(150, 0, 100)); // 100  (clamp between min and max)

        Console.WriteLine(Math.PI);                 // 3.14159...
        Console.WriteLine(Math.E);                  // 2.71828...

        // Trig
        Console.WriteLine(Math.Sin(Math.PI / 2));   // 1
        Console.WriteLine(Math.Cos(0));             // 1
        Console.WriteLine(Math.Tan(Math.PI / 4));   // 1

        // Random numbers
        var rng = new Random();
        Console.WriteLine(rng.Next(1, 7));           // 1–6 (dice roll)
        Console.WriteLine(rng.NextDouble());         // 0.0–1.0
        Console.WriteLine(rng.NextInt64());          // large random long

        // Thread-safe random (C# 6+)
        Console.WriteLine(Random.Shared.Next(100));
    }
}
