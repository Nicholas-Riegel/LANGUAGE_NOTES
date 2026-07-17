# C# Learning Notes

Comprehensive C# notes for interview readiness, following W3Schools curriculum and
extended with the topics Swiss enterprise employers test on.

## Project Setup

```bash
# Navigate to the project
cd CSharpNotes

# Run (executes whichever Run() call is uncommented in Program.cs)
dotnet run
```

> To switch files: open `Program.cs`, uncomment the `Run()` call you want, comment out the rest.
> Each `.cs` file has its own `public static void Run()` method and a file-scoped namespace (`FXX`).

---

## Structure

### Fundamentals (01–08)
- `01_variables.cs` — Value types, reference types, `var`, constants, `Console.WriteLine`
- `02_type_conversion.cs` — Implicit/explicit casting, `Convert`, `Parse`, `TryParse`, boxing/unboxing
- `03_operators.cs` — Arithmetic, comparison, logical, bitwise, `??`, `?.`, `?[]`, ternary
- `04_strings.cs` — Interpolation, verbatim strings, common `string` methods, `StringBuilder`
- `05_control_flow.cs` — `if/else`, `switch` statement, `switch` expression (C# 8+)
- `06_loops.cs` — `for`, `foreach`, `while`, `do-while`, `break`, `continue`
- `07_methods.cs` — Signatures, overloading, optional/named params, `ref`, `out`, `params`, local functions
- `08_arrays.cs` — 1D, 2D, jagged arrays, `Array` class, `Span<T>` intro

### OOP (09–15)
- `09_classes.cs` — Fields, auto-properties, object initializers, constructors, `this`
- `10_access_modifiers.cs` — `public/private/protected/internal`, `static`, `readonly`, `const`
- `11_inheritance.cs` — `base`, `override`, `sealed`, hiding with `new`
- `12_polymorphism.cs` — `virtual/override`, `abstract` classes, `is`, `as`, casting
- `13_interfaces.cs` — Defining & implementing interfaces, explicit impl, default members (C# 8+)
- `14_enums.cs` — Basic enums, `[Flags]`, `Enum` helper methods
- `15_structs_records.cs` — Structs (value type), `record` (C# 9+), `record struct` (C# 10+), immutability

### Collections & Generics (16–20)
- `16_lists.cs` — `List<T>`, `LinkedList<T>`, common CRUD operations, sorting
- `17_dictionaries.cs` — `Dictionary<K,V>`, `SortedDictionary`, `ConcurrentDictionary` intro
- `18_sets_stacks_queues.cs` — `HashSet<T>`, `SortedSet<T>`, `Stack<T>`, `Queue<T>`, `PriorityQueue<T,P>`
- `19_generics.cs` — Generic classes, generic methods, constraints (`where T : class`, `new()`, interface)
- `20_iterators.cs` — `IEnumerable<T>`, `IEnumerator<T>`, `yield return`, custom iterators

### Modern C# Features (21–27)
- `21_nullable_types.cs` — `T?`, nullable value types, nullable reference types (NRT), `??`, `??=`, `?.`
- `22_tuples.cs` — `ValueTuple`, named elements, deconstruction, `_` discards
- `23_pattern_matching.cs` — `is` patterns, `switch` expressions, property/positional/list patterns (C# 11+)
- `24_lambdas.cs` — Lambda syntax, closures, `Func<>`, `Action<>`, `Predicate<>`, expression trees intro
- `25_delegates_events.cs` — `delegate` keyword, multicast delegates, `event`, publisher/subscriber pattern
- `26_extension_methods.cs` — Defining and using extension methods, `this` parameter
- `27_async_await.cs` — `Task`, `Task<T>`, `async/await`, `ConfigureAwait`, `CancellationToken`, `ValueTask`

### LINQ (28–29)
- `28_linq_fundamentals.cs` — `Where`, `Select`, `OrderBy`, `GroupBy`, `Join`, `ToList/ToArray`, query syntax vs method syntax
- `29_linq_advanced.cs` — `SelectMany`, `Aggregate`, `Any/All/None`, `First/Single/ElementAt`, `Distinct`, `Zip`, `Take/Skip`

### Error Handling & I/O (30–31)
- `30_exceptions.cs` — `try/catch/finally`, `when` filters, `throw` expressions, custom exceptions, `using` for `IDisposable`
- `31_file_io.cs` — `File`, `Directory`, `Path`, `StreamReader/Writer`, `FileStream`, `async` file reading

### Practical & Interview Prep (32–37)
- `32_dependency_injection.cs` — DI pattern, `IServiceCollection`, service lifetimes (Transient/Scoped/Singleton)
- `33_attributes_reflection.cs` — Built-in attributes, custom attributes, `Type`, `PropertyInfo`, `MethodInfo`
- `34_datetime_math.cs` — `DateTime`, `DateOnly`, `TimeOnly` (C# 10+), `TimeSpan`, `DateTimeOffset`, `Math` class
- `35_collections_advanced.cs` — `ImmutableList`, `ReadOnlyCollection`, `ConcurrentDictionary`, `ArrayPool<T>`, `Span<T>`, collection expressions (C# 12)
- `36_testing.cs` — xUnit structure, `[Fact]`, `[Theory]`, `[InlineData]`, Arrange-Act-Assert, mocking with Moq
- `37_database_connectivity.cs` — ADO.NET (`SqlConnection`, `SqlCommand`, `SqlDataReader`), Entity Framework Core, async database operations, parameterized queries

---

## Key Themes for Swiss Enterprise C# Interviews

**Value types vs reference types**
- Value types (`int`, `struct`, `enum`, `record struct`) live on the stack; reference types (`class`, `string`, `record`) on the heap
- Passing by value copies data; passing by reference (`ref`/`out`/`in`) shares it

**Memory & disposal**
- `IDisposable` + `using` statement / declaration for deterministic cleanup
- Garbage collector handles heap; `Span<T>` / `ArrayPool<T>` help avoid allocations

**Null safety**
- Enable NRT with `<Nullable>enable</Nullable>` in `.csproj`
- Use `?.`, `??`, `??=` to write null-safe code without null checks everywhere

**Async best practices**
- Always `await` tasks; never block with `.Result` or `.Wait()`
- Pass `CancellationToken` through the call chain
- `ConfigureAwait(false)` in library code

**LINQ mental model**
- LINQ is lazy — queries aren't executed until enumerated
- Materialise with `ToList()` / `ToArray()` when you need a snapshot

**OOP design**
- Prefer interfaces over abstract classes for contracts
- Favour composition over inheritance
- Know `sealed` (prevents inheritance), `virtual/override`, `new` (hiding)

**C# version highlights worth mentioning**
- C# 8: nullable reference types, switch expressions, `using` declarations, ranges/indices (`^1`, `1..3`)
- C# 9: records, `init`-only setters, top-level statements, pattern matching improvements
- C# 10: `record struct`, global usings, file-scoped namespaces
- C# 11: required members, list patterns, raw string literals
- C# 12: primary constructors for classes, collection expressions
