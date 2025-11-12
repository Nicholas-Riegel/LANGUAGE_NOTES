#include <stdio.h>

int main() {
    
    printf("===== ARITHMETIC OPERATORS =====\n");
    
    // Basic math operations
    int a = 10, b = 3;
    
    printf("a + b = %d\n", a + b);   // 13 (addition)
    printf("a - b = %d\n", a - b);   // 7 (subtraction)
    printf("a * b = %d\n", a * b);   // 30 (multiplication)
    printf("a / b = %d\n", a / b);   // 3 (integer division - truncates decimal!)
    printf("a %% b = %d\n", a % b);  // 1 (modulus - remainder after division)
    
    // Important: Integer division discards the decimal part
    // 10 / 3 = 3.333... but integer division gives 3
    printf("Float division: %.2f\n", (float)a / b);  // 3.33 (with decimals)
    
    printf("\n===== INCREMENT/DECREMENT =====\n");
    
    // Shortcuts for adding/subtracting 1
    // Pre vs Post matters when used in expressions!
    
    int x = 5;
    printf("x = %d\n", x);      // 5
    
    // Post-increment: use current value, THEN increment
    printf("x++ = %d\n", x++);  // 5 (returns 5, then x becomes 6)
    printf("x = %d\n", x);      // 6
    
    // Pre-increment: increment FIRST, then use new value
    printf("++x = %d\n", ++x);  // 7 (x becomes 7, then returns 7)
    
    // Post-decrement: use current value, THEN decrement
    printf("x-- = %d\n", x--);  // 7 (returns 7, then x becomes 6)
    printf("x = %d\n", x);      // 6
    
    // Pre-decrement: decrement FIRST, then use new value
    printf("--x = %d\n", --x);  // 5 (x becomes 5, then returns 5)
    
    printf("\n===== ASSIGNMENT OPERATORS =====\n");
    
    // Shortcuts for common operations
    // Instead of: num = num + 5, write: num += 5
    
    int num = 10;
    printf("num = %d\n", num);   // 10
    
    num += 5;  // Same as: num = num + 5
    printf("num += 5: %d\n", num);   // 15
    
    num -= 3;  // Same as: num = num - 3
    printf("num -= 3: %d\n", num);   // 12
    
    num *= 2;  // Same as: num = num * 2
    printf("num *= 2: %d\n", num);   // 24
    
    num /= 4;  // Same as: num = num / 4
    printf("num /= 4: %d\n", num);   // 6
    
    num %= 4;  // Same as: num = num % 4
    printf("num %%= 4: %d\n", num);  // 2 (remainder of 6 / 4)
    
    printf("\n===== COMPARISON OPERATORS =====\n");
    
    // Compare values and return 1 (true) or 0 (false)
    // In C: 0 = false, any non-zero = true
    
    int p = 5, q = 10;
    
    printf("p == q: %d\n", p == q);  // 0 (false - equal?)
    printf("p != q: %d\n", p != q);  // 1 (true - not equal?)
    printf("p > q: %d\n", p > q);    // 0 (false - greater than?)
    printf("p < q: %d\n", p < q);    // 1 (true - less than?)
    printf("p >= q: %d\n", p >= q);  // 0 (false - greater or equal?)
    printf("p <= q: %d\n", p <= q);  // 1 (true - less or equal?)
    
    printf("\n===== LOGICAL OPERATORS =====\n");
    
    // Combine multiple conditions
    // && = AND (both must be true)
    // || = OR (at least one must be true)
    // ! = NOT (inverts true/false)
    
    int age = 25;
    int hasLicense = 1;  // 1 = true
    
    // AND (&&) - both conditions must be true
    printf("age >= 18 && hasLicense: %d\n", age >= 18 && hasLicense);  // 1 (true)
    // Explanation: 25 >= 18 is true AND hasLicense is true → result is true
    
    // OR (||) - at least one condition must be true
    printf("age < 18 || hasLicense: %d\n", age < 18 || hasLicense);  // 1 (true)
    // Explanation: 25 < 18 is false BUT hasLicense is true → result is true
    
    // NOT (!) - flips true to false, false to true
    printf("!hasLicense: %d\n", !hasLicense);  // 0 (false)
    // Explanation: hasLicense is 1 (true), ! flips it to 0 (false)
    
    printf("\n===== BITWISE OPERATORS =====\n");
    
    // Work with individual bits (binary representation)
    // Useful for: flags, permissions, memory optimization
    // Each bit can be 0 or 1, allowing you to store 8 yes/no values in a single byte
    
    int m = 5;   // Binary: 0101
    int n = 3;   // Binary: 0011
    
    // & (AND) - bit is 1 only if BOTH bits are 1
    printf("m & n = %d\n", m & n);   // 1 (AND: 0001)
    // Explanation: 0101 & 0011 = 0001 (only rightmost bit is 1 in both)
    
    // | (OR) - bit is 1 if EITHER bit is 1
    printf("m | n = %d\n", m | n);   // 7 (OR: 0111)
    // Explanation: 0101 | 0011 = 0111 (combine all 1s)
    
    // ^ (XOR) - bit is 1 only if bits are DIFFERENT
    printf("m ^ n = %d\n", m ^ n);   // 6 (XOR: 0110)
    // Explanation: 0101 ^ 0011 = 0110 (1 where bits differ)
    
    // ~ (NOT) - flips all bits (1→0, 0→1)
    printf("~m = %d\n", ~m);         // -6 (NOT: inverts all bits)
    // Note: Negative because of two's complement representation
    
    // << (Left shift) - shifts bits left, fills with 0s (multiplies by 2^n)
    printf("m << 1 = %d\n", m << 1); // 10 (left shift: multiply by 2)
    // Explanation: 0101 becomes 1010 (same as 5 * 2)
    
    // >> (Right shift) - shifts bits right, divides by 2^n
    printf("m >> 1 = %d\n", m >> 1); // 2 (right shift: divide by 2)
    // Explanation: 0101 becomes 0010 (same as 5 / 2, truncated)
    
    printf("\n===== TERNARY OPERATOR =====\n");
    
    // Shorthand for simple if-else statements
    // Syntax: (condition) ? value_if_true : value_if_false
    // Great for: assigning values based on a condition in one line
    
    int score = 85;
    char *result = (score >= 60) ? "Pass" : "Fail";
    printf("Result: %s\n", result);  // Pass
    // Explanation: Since 85 >= 60 is true, result gets "Pass"
    // Same as: if (score >= 60) { result = "Pass"; } else { result = "Fail"; }
    
    int max = (a > b) ? a : b;
    printf("Max of %d and %d: %d\n", a, b, max);  // 10
    // Explanation: Picks the larger of two values in a single line
    // Much cleaner than writing an if-else statement
    
    printf("\n===== SIZEOF OPERATOR =====\n");
    
    // Returns the size in bytes of a data type or variable
    // Useful for: understanding memory usage, working with arrays
    // Note: Result type is size_t (unsigned), use %lu to print
    
    printf("sizeof(int): %lu bytes\n", sizeof(int));
    // Typically 4 bytes (32 bits), can store ~4 billion values
    
    printf("sizeof(char): %lu bytes\n", sizeof(char));
    // Always 1 byte (8 bits), can store 256 values (0-255 or -128 to 127)
    
    printf("sizeof(float): %lu bytes\n", sizeof(float));
    // Typically 4 bytes, ~6-7 decimal digits of precision
    
    printf("sizeof(double): %lu bytes\n", sizeof(double));
    // Typically 8 bytes, ~15-16 decimal digits of precision
    
    int arr[10];
    printf("sizeof(arr): %lu bytes\n", sizeof(arr));  // 40 (10 * 4)
    // Explanation: 10 integers × 4 bytes each = 40 bytes total
    // Useful trick: sizeof(arr) / sizeof(arr[0]) = number of elements
    
    return 0;
}

// Notes:
// - In C, 0 is false and any non-zero value is true
// - Integer division truncates (10/3 = 3, not 3.33)
// - Use (float) casting for float division
// - Modulus (%) only works with integers
// - && and || use short-circuit evaluation
// - Bitwise operators work on binary representation
// - Ternary operator: condition ? value_if_true : value_if_false
