#include <iostream>
using namespace std;

// Pass by value: makes a copy
void changeValueByValue(int num) {
    num = 50; // only changes the local copy
}

// Pass by reference: no copy, 'num' is an alias for the original variable
void changeValueByReference(int& num) {
    num = 50; // changes the original variable
}

// Pass by pointer: similar to reference, but requires explicit * and &
void changeValueByPointer(int* num) {
    *num = 50; // dereference pointer to change the original
}

// w3schools example        

void swapNums(int& x, int& y){ // creating references (not copies) of the variables passed
    int z = x; // creating a local copy of the value
    x = y; // assigning the value of y to x
    y = z; // assigning the value of z (x) to y
}

int main() {

    int x = 10;

    cout << "Original value of x: " << x << endl;

    changeValueByValue(x);
    cout << "After changeValueByValue(x): " << x << " (unchanged)" << endl;

    changeValueByReference(x);
    cout << "After changeValueByReference(x): " << x << " (changed)" << endl;

    x = 10; // reset x
    changeValueByPointer(&x); // pass address of x
    cout << "After changeValueByPointer(&x): " << x << " (changed)" << endl;

    // w3schools example        

    int firstNum = 10;
    int secondNum = 20;

    cout << "Before swap: " << "\n";
    cout << firstNum << secondNum << "\n";

    // Call the function, which will change the values of firstNum and secondNum
    swapNums(firstNum, secondNum);

    cout << "After swap: " << "\n";
    cout << firstNum << secondNum << "\n";

    return 0;
}

/*
Key notes:

1. In declarations like `int& num`, the & means "reference to int".
   In expressions like `&x`, the & means "address of x".

2. Passing by reference (int& num):
   - No copy is made
   - Parameter becomes an alias for the original
   - Changes inside the function affect the original variable

3. Passing by pointer (int* num):
   - Similar effect to references, but requires & when calling and * when using
   - Gives more explicit control (you can pass nullptr, reassign pointer, etc.)

4. Passing by value (int num):
   - Makes a copy
   - Changes inside the function do NOT affect the original
*/
