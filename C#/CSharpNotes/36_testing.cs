namespace F36;

// =============================================
// TESTING with xUnit
// =============================================

// To add xUnit to this project:
//   dotnet add package xunit
//   dotnet add package xunit.runner.visualstudio
//   dotnet add package Microsoft.NET.Test.Sdk
//   dotnet test
//
// OR create a dedicated test project:
//   dotnet new xunit -n CSharpNotes.Tests

// =============================================
// UNIT UNDER TEST (the production code)
// =============================================

public class Calculator
{
    public int    Add(int a, int b)       => a + b;
    public int    Subtract(int a, int b)  => a - b;
    public double Divide(double a, double b)
    {
        if (b == 0) throw new DivideByZeroException("Cannot divide by zero");
        return a / b;
    }
    public bool   IsEven(int n)           => n % 2 == 0;
}

public class StringHelper
{
    public string Reverse(string s)
    {
        if (s is null) throw new ArgumentNullException(nameof(s));
        return new string(s.Reverse().ToArray());
    }

    public bool IsPalindrome(string s)
    {
        string clean = s.ToLower().Replace(" ", "");
        return clean == Reverse(clean);
    }
}

// =============================================
// XUNIT TEST CLASS
// =============================================

// In a real test project, this class would be in CSharpNotes.Tests/
// and xunit would discover it automatically.
// Shown here as reference — won't run without xunit NuGet package.

/*

using Xunit;

public class CalculatorTests
{
    private readonly Calculator _sut = new();   // System Under Test

    // =============================================
    // [Fact]  — single test, no parameters
    // =============================================

    [Fact]
    public void Add_TwoPositiveNumbers_ReturnsSum()
    {
        // Arrange
        int a = 3, b = 4;

        // Act
        int result = _sut.Add(a, b);

        // Assert
        Assert.Equal(7, result);
    }

    [Fact]
    public void Divide_ByZero_ThrowsDivideByZeroException()
    {
        Assert.Throws<DivideByZeroException>(() => _sut.Divide(10, 0));
    }

    [Fact]
    public void Divide_ByZero_HasCorrectMessage()
    {
        var ex = Assert.Throws<DivideByZeroException>(() => _sut.Divide(10, 0));
        Assert.Equal("Cannot divide by zero", ex.Message);
    }

    // =============================================
    // [Theory] + [InlineData]  — parameterised tests
    // =============================================

    [Theory]
    [InlineData(2,  true)]
    [InlineData(3,  false)]
    [InlineData(0,  true)]
    [InlineData(-4, true)]
    public void IsEven_VariousInputs_ReturnsExpected(int input, bool expected)
    {
        Assert.Equal(expected, _sut.IsEven(input));
    }

    [Theory]
    [InlineData(10, 3, 7)]
    [InlineData(0,  0, 0)]
    [InlineData(-1, 1, -2)]
    public void Subtract_VariousInputs(int a, int b, int expected)
    {
        Assert.Equal(expected, _sut.Subtract(a, b));
    }
}

public class StringHelperTests
{
    private readonly StringHelper _sut = new();

    [Fact]
    public void Reverse_NormalString_ReturnsReversed()
    {
        Assert.Equal("olleh", _sut.Reverse("hello"));
    }

    [Fact]
    public void Reverse_NullInput_ThrowsArgumentNullException()
    {
        Assert.Throws<ArgumentNullException>(() => _sut.Reverse(null!));
    }

    [Theory]
    [InlineData("racecar", true)]
    [InlineData("A man a plan a canal Panama", true)]
    [InlineData("hello", false)]
    [InlineData("", true)]
    public void IsPalindrome_VariousInputs_ReturnsExpected(string input, bool expected)
    {
        Assert.Equal(expected, _sut.IsPalindrome(input));
    }
}

*/

// =============================================
// COMMON XUNIT ASSERTIONS (reference)
// =============================================

// Assert.Equal(expected, actual)           — equal values
// Assert.NotEqual(expected, actual)
// Assert.True(condition)
// Assert.False(condition)
// Assert.Null(obj)
// Assert.NotNull(obj)
// Assert.Same(obj1, obj2)                  — reference equality
// Assert.IsType<T>(obj)                    — exact type check
// Assert.IsAssignableFrom<T>(obj)          — type or subtype
// Assert.Throws<TException>(() => ...)     — expects exception
// Assert.ThrowsAsync<TException>(() => ...) — async version
// Assert.Contains(item, collection)
// Assert.DoesNotContain(item, collection)
// Assert.Empty(collection)
// Assert.Single(collection)                — exactly one item
// Assert.Collection(collection, item => ...) — ordered assertions

// =============================================
// MOCKING WITH MOQ (reference)
// =============================================

// dotnet add package Moq
//
// using Moq;
//
// var mockEmail = new Mock<IEmailService>();
// mockEmail.Setup(e => e.Send(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()));
//
// var sut = new UserService(fakeRepo, mockEmail.Object, mockLogger.Object);
// sut.Register(new User(1, "Alice", "alice@example.com"));
//
// mockEmail.Verify(e => e.Send("alice@example.com", It.IsAny<string>(), It.IsAny<string>()), Times.Once);

// =============================================
// AAA PATTERN  (Arrange, Act, Assert)
// =============================================

// Every test should have three clear sections:
// 1. Arrange — set up the objects and inputs
// 2. Act     — call the method under test
// 3. Assert  — verify the result

// Test naming convention:
//   MethodName_Scenario_ExpectedBehaviour
//   e.g. Divide_ByZero_ThrowsDivideByZeroException

public static class Testing
{
    public static void Run()
    {
        // This file is reference material for test structure
        // Run actual tests with: dotnet test

        Console.WriteLine("See 36_testing.cs for xUnit patterns");
        Console.WriteLine("To run tests: dotnet new xunit -n MyProject.Tests");
        Console.WriteLine("             dotnet add reference ../CSharpNotes/CSharpNotes.csproj");
        Console.WriteLine("             dotnet test");

        // Quick in-line sanity check (no xUnit needed)
        var calc = new Calculator();
        System.Diagnostics.Debug.Assert(calc.Add(2, 3)      == 5);
        System.Diagnostics.Debug.Assert(calc.IsEven(4)      == true);
        System.Diagnostics.Debug.Assert(calc.IsEven(7)      == false);

        var sh = new StringHelper();
        System.Diagnostics.Debug.Assert(sh.Reverse("hello") == "olleh");
        System.Diagnostics.Debug.Assert(sh.IsPalindrome("racecar") == true);

        Console.WriteLine("Debug assertions passed");
    }
}
