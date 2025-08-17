#include <iostream>
#include <string>

using namespace std;

int main() {
    
    cout << "===== WHAT ARE POINTERS? =====\n";
    
    // A pointer is a variable that stores the memory address of another variable
    int value = 42;
    int* ptr = &value;  // ptr holds the address of value
    
    cout << "Value: " << value << endl;
    cout << "Address of value: " << &value << endl;
    cout << "Pointer value (address): " << ptr << endl;
    cout << "Value pointed to: " << *ptr << endl;  // Dereference pointer
    
    cout << "\n===== POINTER SYNTAX =====\n";
    
    cout << "Key operators:" << endl;
    cout << "& = Address-of operator (gets memory address)" << endl;
    cout << "* = Dereference operator (gets value at address)" << endl;
    cout << "* in declaration = Creates pointer type" << endl;
    
    int number = 100;
    int* numberPtr = &number;
    
    cout << "number = " << number << endl;
    cout << "&number = " << &number << " (address)" << endl;
    cout << "numberPtr = " << numberPtr << " (same address)" << endl;
    cout << "*numberPtr = " << *numberPtr << " (value at address)" << endl;
    
    cout << "\n===== MODIFYING THROUGH POINTERS =====\n";
    
    int originalNum = 50;
    int* numPtr = &originalNum;
    
    cout << "Before: originalNum = " << originalNum << endl;
    *numPtr = 75;  // Change value through pointer
    cout << "After *numPtr = 75: originalNum = " << originalNum << endl;
    
    cout << "\n===== POINTER REASSIGNMENT =====\n";
    
    int first = 10;
    int second = 20;
    int* changeablePtr = &first;
    
    cout << "Pointer initially points to first: " << *changeablePtr << endl;
    changeablePtr = &second;  // Point to different variable
    cout << "After reassignment, points to second: " << *changeablePtr << endl;
    cout << "first is still: " << first << endl;
    cout << "second is still: " << second << endl;
    
    cout << "\n===== NULL POINTERS =====\n";
    
    int* nullPtr = nullptr;  // Modern C++ way to create null pointer
    // int* oldNullPtr = NULL;  // Old C-style (still works)
    
    cout << "Null pointer value: " << nullPtr << endl;
    
    // Always check for null before dereferencing!
    if (nullPtr != nullptr) {
        cout << "Value: " << *nullPtr << endl;
    } else {
        cout << "Pointer is null - cannot dereference!" << endl;
    }
    
    cout << "\n===== POINTERS WITH DIFFERENT TYPES =====\n";
    
    string text = "Hello, World!";
    string* textPtr = &text;
    
    cout << "String: " << text << endl;
    cout << "Through pointer: " << *textPtr << endl;
    cout << "String length through pointer: " << textPtr->length() << endl;  // Arrow operator
    cout << "Same as: " << (*textPtr).length() << endl;  // Equivalent to arrow operator
    
    cout << "\n===== ARRAY AND POINTER RELATIONSHIP =====\n";
    
    int numbers[] = {10, 20, 30, 40, 50};
    int* arrayPtr = numbers;  // Array name is like a pointer to first element
    
    cout << "Array elements using array syntax:" << endl;
    for (int i = 0; i < 5; i++) {
        cout << "numbers[" << i << "] = " << numbers[i] << endl;
    }
    
    cout << "\nSame array using pointer arithmetic:" << endl;
    for (int i = 0; i < 5; i++) {
        cout << "*(arrayPtr + " << i << ") = " << *(arrayPtr + i) << endl;
    }
    
    cout << "\nPointer arithmetic:" << endl;
    cout << "arrayPtr points to: " << *arrayPtr << endl;
    arrayPtr++;  // Move to next element
    cout << "After arrayPtr++: " << *arrayPtr << endl;
    arrayPtr += 2;  // Move 2 more elements
    cout << "After arrayPtr += 2: " << *arrayPtr << endl;
    
    cout << "\n===== POINTERS IN FUNCTIONS =====\n";
    
    auto modifyValue = [](int* ptr) {
        if (ptr != nullptr) {
            *ptr *= 3;  // Modify value through pointer
        }
    };
    
    int testNum = 7;
    cout << "Before function: " << testNum << endl;
    modifyValue(&testNum);  // Pass address of testNum
    cout << "After function: " << testNum << endl;
    
    // Function returning pointer
    auto getLarger = [](int* a, int* b) -> int* {
        return (*a > *b) ? a : b;
    };
    
    int num1 = 15, num2 = 25;
    int* largerPtr = getLarger(&num1, &num2);
    cout << "Larger value: " << *largerPtr << endl;
    
    cout << "\n===== CONST POINTERS =====\n";
    
    int var1 = 100, var2 = 200;
    
    // Regular pointer - can change both what it points to and the value
    int* regularPtr = &var1;
    *regularPtr = 150;     // Can change value
    regularPtr = &var2;    // Can change what it points to
    
    // Pointer to const - can change what it points to, but not the value
    const int* ptrToConst = &var1;
    // *ptrToConst = 300;  // ERROR - cannot change value
    ptrToConst = &var2;    // OK - can change what it points to
    
    // Const pointer - cannot change what it points to, but can change value
    int* const constPtr = &var1;
    *constPtr = 400;       // OK - can change value
    // constPtr = &var2;   // ERROR - cannot change what it points to
    
    // Const pointer to const - cannot change either
    const int* const constPtrToConst = &var1;
    // *constPtrToConst = 500;     // ERROR - cannot change value
    // constPtrToConst = &var2;    // ERROR - cannot change what it points to
    
    cout << "Const pointer variations explained above (see comments)" << endl;
    
    cout << "\n===== DYNAMIC MEMORY ALLOCATION =====\n";
    
    // Allocate single integer
    int* dynamicInt = new int(42);
    cout << "Dynamic integer: " << *dynamicInt << endl;
    delete dynamicInt;  // Must free memory
    dynamicInt = nullptr;  // Good practice
    
    // Allocate array
    int* dynamicArray = new int[5]{1, 2, 3, 4, 5};
    cout << "Dynamic array: ";
    for (int i = 0; i < 5; i++) {
        cout << dynamicArray[i] << " ";
    }
    cout << endl;
    delete[] dynamicArray;  // Use delete[] for arrays
    dynamicArray = nullptr;
    
    cout << "\n===== COMMON POINTER MISTAKES =====\n";
    
    cout << "❌ Common mistakes:" << endl;
    cout << "1. Dereferencing null pointers" << endl;
    cout << "2. Using pointers after delete (dangling pointers)" << endl;
    cout << "3. Memory leaks (forgetting delete)" << endl;
    cout << "4. Double deletion" << endl;
    cout << "5. Using delete instead of delete[] for arrays" << endl;
    
    cout << "\n===== WHEN TO USE POINTERS =====\n";
    cout << "✓ Dynamic memory allocation" << endl;
    cout << "✓ When you need to reassign to different objects" << endl;
    cout << "✓ Data structures (linked lists, trees)" << endl;
    cout << "✓ Optional parameters (can be nullptr)" << endl;
    cout << "✓ C-style arrays and strings" << endl;
    cout << "✗ Simple function parameters (use references instead)" << endl;
    cout << "✗ When modern alternatives exist (smart pointers, containers)" << endl;
    
    cout << "\n===== REFERENCES vs POINTERS SUMMARY =====\n";
    cout << "REFERENCES:" << endl;
    cout << "- Alias for existing variable" << endl;
    cout << "- Must be initialized" << endl;
    cout << "- Cannot be reassigned" << endl;
    cout << "- Cannot be null" << endl;
    cout << "- Simpler syntax" << endl;
    
    cout << "\nPOINTERS:" << endl;
    cout << "- Store memory addresses" << endl;
    cout << "- Can be uninitialized" << endl;
    cout << "- Can be reassigned" << endl;
    cout << "- Can be null" << endl;
    cout << "- Support arithmetic operations" << endl;
    cout << "- Required for dynamic memory" << endl;
    
    return 0;
}
