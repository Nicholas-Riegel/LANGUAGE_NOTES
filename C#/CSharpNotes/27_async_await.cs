namespace F27;

// =============================================
// ASYNC / AWAIT  — non-blocking asynchronous programming
// =============================================

// Key concepts:
//   Task        — represents an ongoing operation that returns void
//   Task<T>     — represents an ongoing operation that returns T
//   async       — marks a method as asynchronous
//   await       — suspends the method until the Task completes (non-blocking)
//
// The thread is FREE while awaiting — it can serve other requests
// This is why async is critical for I/O-bound work (web requests, file I/O, DB queries)

using System.Net.Http;

public static class AsyncAwait
{
    public static async Task Run()
    {
        // =============================================
        // BASIC ASYNC / AWAIT
        // =============================================

        string result = await GetMessageAsync();
        Console.WriteLine(result);   // Hello after delay

        // =============================================
        // TASK.DELAY  (async sleep — does NOT block the thread)
        // =============================================

        Console.WriteLine("Starting...");
        await Task.Delay(100);       // non-blocking 100ms pause
        Console.WriteLine("Done!");

        // Thread.Sleep(100) would BLOCK — never use in async context

        // =============================================
        // RETURNING VALUES
        // =============================================

        int sum = await AddAsync(3, 4);
        Console.WriteLine(sum);   // 7

        // =============================================
        // RUNNING TASKS IN PARALLEL  (Task.WhenAll)
        // =============================================

        // Sequential — one after another (slower)
        // var r1 = await LongOperationAsync(1);
        // var r2 = await LongOperationAsync(2);

        // Parallel — start both, then await both (faster)
        Task<string> t1 = LongOperationAsync("Task A");
        Task<string> t2 = LongOperationAsync("Task B");
        Task<string> t3 = LongOperationAsync("Task C");

        string[] results = await Task.WhenAll(t1, t2, t3);
        foreach (string r in results)
            Console.WriteLine(r);

        // =============================================
        // TASK.WHENANY  (first completed task wins)
        // =============================================

        Task<string> first = await Task.WhenAny(
            LongOperationAsync("Fast"),
            LongOperationAsync("Slow")
        );
        Console.WriteLine(await first);

        // =============================================
        // CANCELLATION  — always accept CancellationToken in async methods
        // =============================================

        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        try
        {
            await CancellableWorkAsync(cts.Token);
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("Operation was cancelled");
        }

        // =============================================
        // VALUETASK  — performance optimization for often-sync paths
        // =============================================

        // Use ValueTask<T> instead of Task<T> when the result is often available synchronously
        // Avoids Task allocation overhead in hot paths

        ValueTask<int> vt = GetCachedValueAsync(42);
        int cached = await vt;
        Console.WriteLine(cached);   // 42

        // =============================================
        // ASYNC BEST PRACTICES  (interview-critical)
        // =============================================

        // ✓  await all tasks — never fire-and-forget unless intentional
        // ✓  pass CancellationToken through the entire call chain
        // ✓  use ConfigureAwait(false) in library code (not needed in ASP.NET Core)
        // ✗  DO NOT use .Result or .Wait() — causes deadlocks
        // ✗  DO NOT use async void — except for event handlers
        // ✗  DO NOT use Thread.Sleep in async code — use Task.Delay

        // ---- ConfigureAwait(false) — in library code ----
        // Prevents capturing the synchronisation context
        // In ASP.NET Core, not needed — no SynchronisationContext exists
        await Task.Delay(10).ConfigureAwait(false);

        Console.WriteLine("All done");
    }

    // =============================================
    // DEFINING ASYNC METHODS
    // =============================================

    // Return Task  when the method returns nothing
    static async Task DoWorkAsync()
    {
        await Task.Delay(10);
        Console.WriteLine("Work done");
    }

    // Return Task<T> when the method returns a value
    static async Task<string> GetMessageAsync()
    {
        await Task.Delay(10);
        return "Hello after delay";
    }

    static async Task<int> AddAsync(int a, int b)
    {
        await Task.Delay(1);   // simulated async work
        return a + b;
    }

    static async Task<string> LongOperationAsync(string name)
    {
        await Task.Delay(50);
        return $"Completed: {name}";
    }

    static async Task CancellableWorkAsync(CancellationToken ct)
    {
        for (int i = 0; i < 10; i++)
        {
            ct.ThrowIfCancellationRequested();   // check before each unit of work
            await Task.Delay(200, ct);           // also throws OperationCanceledException
            Console.WriteLine($"Step {i}");
        }
    }

    static ValueTask<int> GetCachedValueAsync(int id)
    {
        // Synchronous fast path (common case) — no Task allocation
        if (id > 0) return ValueTask.FromResult(id);

        // Async slow path (rare case)
        return new ValueTask<int>(FetchFromDbAsync(id));
    }

    static async Task<int> FetchFromDbAsync(int id)
    {
        await Task.Delay(100);
        return id;
    }
}
