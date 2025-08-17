#include <iostream>
#include <functional>  // Needed for std::function
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    
    cout << "===== WHAT ARE LAMBDA FUNCTIONS? =====\n";
    
    cout << "A lambda function is a small, anonymous function you can write directly in your code." << endl;
    cout << "Think of it as a 'mini function on the fly.'" << endl;
    cout << "Syntax: [capture] (parameters) { code };" << endl;
    
    cout << "\n===== BASIC LAMBDA EXAMPLE =====\n";
    
    // Basic lambda with no parameters
    auto message = []() {
        cout << "Hello World from lambda!" << endl;
    };
    
    cout << "Calling lambda function:" << endl;
    message();                                              // Hello World from lambda!
    
    cout << "\n===== LAMBDA WITH PARAMETERS =====\n";
    
    // Lambda that takes parameters and returns a value
    auto add = [](int a, int b) {
        return a + b;
    };
    
    cout << "3 + 4 = " << add(3, 4) << endl;                // 3 + 4 = 7
    
    // Lambda with multiple operations
    auto multiply = [](int x, int y) -> int {  // -> int is optional (return type deduction)
        cout << "Multiplying " << x << " and " << y << endl;
        return x * y;
    };
    
    cout << "Result: " << multiply(5, 6) << endl;           // Multiplying 5 and 6, Result: 30
    
    cout << "\n===== PASSING LAMBDAS TO FUNCTIONS =====\n";
    
    // Function that takes another function as parameter
    auto myFunction = [](function<void()> func) {
        cout << "Running function twice:" << endl;
        func();
        func();
    };
    
    auto greeting = []() {
        cout << "Hello World!" << endl;
    };
    
    myFunction(greeting);                                   // Hello World! (twice)
    
    cout << "\n===== USING LAMBDAS IN LOOPS =====\n";
    
    // Lambda inside a loop with capture
    for (int i = 1; i <= 3; i++) {
        auto show = [i]() {  // Capture i by value
            cout << "Number: " << i << endl;
        };
        show();                                             // Number: 1, Number: 2, Number: 3
    }
    
    cout << "\n===== CAPTURE CLAUSE [] =====\n";
    
    int x = 10;
    
    // Capture by value (copy)
    auto showByValue = [x]() {
        cout << "Captured by value: " << x << endl;
    };
    
    x = 20;  // Change x after defining lambda
    cout << "Original x is now: " << x << endl;             // Original x is now: 20
    showByValue();  // Still shows original value            // Captured by value: 10
    
    cout << "\n===== CAPTURE BY REFERENCE =====\n";
    
    int y = 10;
    
    // Capture by reference
    auto showByReference = [&y]() {
        cout << "Captured by reference: " << y << endl;
    };
    
    y = 30;  // Change y after defining lambda
    cout << "Original y is now: " << y << endl;             // Original y is now: 30
    showByReference();  // Shows updated value               // Captured by reference: 30
    
    cout << "\n===== DIFFERENT CAPTURE METHODS =====\n";
    
    int a = 1, b = 2, c = 3;
    
    // Capture all by value
    auto captureAllByValue = [=]() {
        cout << "All by value: a=" << a << ", b=" << b << ", c=" << c << endl;
    };
    
    // Capture all by reference
    auto captureAllByRef = [&]() {
        cout << "All by reference: a=" << a << ", b=" << b << ", c=" << c << endl;
    };
    
    // Capture specific variables
    auto captureSpecific = [a, &b]() {  // a by value, b by reference
        cout << "Mixed capture: a=" << a << " (by value), b=" << b << " (by ref)" << endl;
    };
    
    a = 10; b = 20; c = 30;
    
    captureAllByValue();                                    // All by value: a=1, b=2, c=3
    captureAllByRef();                                      // All by reference: a=10, b=20, c=30
    captureSpecific();                                      // Mixed capture: a=1 (by value), b=20 (by ref)
    
    cout << "\n===== LAMBDAS WITH STL ALGORITHMS =====\n";
    
    vector<int> numbers = {5, 2, 8, 1, 9, 3};
    
    cout << "Original vector: ";
    for (int num : numbers) {
        cout << num << " ";                                 // 5 2 8 1 9 3
    }
    cout << endl;
    
    // Sort using lambda
    sort(numbers.begin(), numbers.end(), [](int a, int b) {
        return a < b;  // Ascending order
    });
    
    cout << "Sorted ascending: ";
    for (int num : numbers) {
        cout << num << " ";                                 // 1 2 3 5 8 9
    }
    cout << endl;
    
    // Find elements using lambda
    auto found = find_if(numbers.begin(), numbers.end(), [](int n) {
        return n > 5;
    });
    
    if (found != numbers.end()) {
        cout << "First number > 5: " << *found << endl;    // First number > 5: 8
    }
    
    cout << "\n===== MUTABLE LAMBDAS =====\n";
    
    int counter = 0;
    auto incrementer = [counter]() mutable {  // mutable allows modifying captured values
        counter++;
        cout << "Lambda counter: " << counter << endl;
    };
    
    incrementer();                                          // Lambda counter: 1
    incrementer();                                          // Lambda counter: 2
    cout << "Original counter: " << counter << endl;       // Original counter: 0 (unchanged)
    
    cout << "\n===== REGULAR FUNCTIONS VS LAMBDA FUNCTIONS =====\n";
    
    cout << "Use regular functions when:" << endl;
    cout << "✓ You plan to reuse the function in multiple places" << endl;
    cout << "✓ You want to give the function a clear, meaningful name" << endl;
    cout << "✓ The logic is long or complex" << endl;
    
    cout << "\nUse lambda functions when:" << endl;
    cout << "✓ You only need the function once" << endl;
    cout << "✓ The code is short and simple" << endl;
    cout << "✓ You want to pass a quick function into another function" << endl;
    cout << "✓ Using with STL algorithms (sort, find_if, etc.)" << endl;
    
    cout << "\n===== LAMBDA SYNTAX SUMMARY =====\n";
    
    cout << "Basic syntax: [capture](parameters) { body }" << endl;
    cout << "Capture options:" << endl;
    cout << "  []        - Capture nothing" << endl;
    cout << "  [x]       - Capture x by value" << endl;
    cout << "  [&x]      - Capture x by reference" << endl;
    cout << "  [=]       - Capture all by value" << endl;
    cout << "  [&]       - Capture all by reference" << endl;
    cout << "  [=, &x]   - Capture all by value except x by reference" << endl;
    cout << "  [&, x]    - Capture all by reference except x by value" << endl;
    
    cout << "\nOptional parts:" << endl;
    cout << "  -> return_type  - Explicit return type (usually not needed)" << endl;
    cout << "  mutable         - Allows modifying captured values" << endl;
    
    return 0;
}
