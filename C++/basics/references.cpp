#include <iostream>
#include <string>

using namespace std;

int main() {
    
    cout << "===== WHAT ARE REFERENCES? =====\n";
    
    // A reference is an alias (another name) for an existing variable
    int originalValue = 42;
    int& myReference = originalValue;  // myReference is now an alias for originalValue
    
    cout << "Original value: " << originalValue << endl;
    cout << "Reference value: " << myReference << endl;
    cout << "Are they the same? " << (&originalValue == &myReference ? "Yes" : "No") << endl;
    
    cout << "\n===== MODIFYING THROUGH REFERENCES =====\n";
    
    // Changing the reference changes the original variable
    myReference = 100;
    cout << "After changing reference to 100:" << endl;
    cout << "Original value: " << originalValue << endl;     // Also changed to 100
    cout << "Reference value: " << myReference << endl;      // 100
    
    // Changing the original changes the reference
    originalValue = 200;
    cout << "After changing original to 200:" << endl;
    cout << "Original value: " << originalValue << endl;     // 200
    cout << "Reference value: " << myReference << endl;      // Also 200
    
    cout << "\n===== REFERENCES WITH DIFFERENT TYPES =====\n";
    
    string name = "Alice";
    string& nameRef = name;
    
    cout << "Name: " << name << endl;
    cout << "Name reference: " << nameRef << endl;
    
    nameRef = "Bob";
    cout << "After changing reference:" << endl;
    cout << "Name: " << name << endl;                        // Changed to "Bob"
    cout << "Name reference: " << nameRef << endl;           // "Bob"
    
    cout << "\n===== REFERENCES IN FUNCTIONS =====\n";
    
    // Function that takes a reference parameter
    auto doubleValue = [](int& value) {
        value *= 2;  // Modifies the original variable
    };
    
    int number = 15;
    cout << "Before function: " << number << endl;
    doubleValue(number);  // Pass by reference
    cout << "After function: " << number << endl;            // Changed to 30
    
    // Function that returns a reference
    auto getReference = [](int& value) -> int& {
        return value;  // Return reference to the parameter
    };
    
    int testValue = 50;
    int& returnedRef = getReference(testValue);
    returnedRef = 75;
    cout << "Original after modifying returned reference: " << testValue << endl;  // 75
    
    cout << "\n===== CONST REFERENCES =====\n";
    
    int constValue = 123;
    const int& constRef = constValue;
    
    cout << "Const reference value: " << constRef << endl;
    // constRef = 456;  // This would cause a compilation error
    cout << "Const references cannot be modified (prevents accidental changes)" << endl;
    
    // Const references can bind to temporary values
    const int& tempRef = 999;  // 999 is a temporary value
    cout << "Const reference to temporary: " << tempRef << endl;
    
    cout << "\n===== REFERENCE RULES AND LIMITATIONS =====\n";
    
    cout << "Reference Rules:" << endl;
    cout << "1. Must be initialized when declared" << endl;
    cout << "2. Cannot be reassigned to reference another variable" << endl;
    cout << "3. Cannot have references to references" << endl;
    cout << "4. Cannot have arrays of references" << endl;
    cout << "5. Always refer to the same object throughout their lifetime" << endl;
    
    // Example of reference reassignment (this doesn't change what the reference refers to)
    int value1 = 10;
    int value2 = 20;
    int& ref = value1;
    
    cout << "ref initially refers to value1: " << ref << endl;
    ref = value2;  // This copies value2's content to value1, doesn't change what ref refers to
    cout << "After 'ref = value2':" << endl;
    cout << "value1: " << value1 << endl;  // Now 20 (copied from value2)
    cout << "ref: " << ref << endl;        // Still refers to value1, so shows 20
    cout << "value2: " << value2 << endl;  // Still 20
    
    cout << "\n===== PRACTICAL EXAMPLES =====\n";
    
    // Swapping using references
    auto swap = [](int& a, int& b) {
        int temp = a;
        a = b;
        b = temp;
    };
    
    int x = 5, y = 10;
    cout << "Before swap: x=" << x << ", y=" << y << endl;
    swap(x, y);
    cout << "After swap: x=" << x << ", y=" << y << endl;
    
    // Avoiding copying large objects
    string largeString = "This is a very long string that we don't want to copy";
    
    auto printString = [](const string& str) {  // Pass by const reference - no copying
        cout << "String length: " << str.length() << endl;
        cout << "First 10 chars: " << str.substr(0, 10) << endl;
    };
    
    printString(largeString);  // Efficient - no copy made
    
    cout << "\n===== WHEN TO USE REFERENCES =====\n";
    cout << "✓ Function parameters to avoid copying large objects" << endl;
    cout << "✓ Function parameters when you want to modify the original" << endl;
    cout << "✓ Function return values to allow chaining" << endl;
    cout << "✓ Range-based for loops for efficiency" << endl;
    cout << "✗ When you need to reassign to different objects" << endl;
    cout << "✗ When you need arithmetic on addresses" << endl;
    
    return 0;
}
