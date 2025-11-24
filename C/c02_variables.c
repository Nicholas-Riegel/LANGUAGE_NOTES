#include <stdio.h>

int main() {
    
    printf("===== BASIC DATA TYPES =====\n");
    
    // Integer types (whole numbers, no decimals)
    // Different sizes for different ranges:
    
    short year = 2024;         // Smaller integer (2 bytes, -32K to +32K range)
    int age = 25;              // Standard integer (usually 4 bytes, -2B to +2B range)
    unsigned int positive = 100;    // Only positive (0 to 4B range)
    long population = 8000000000L;  // Larger integer (8 bytes, huge range)
    
    // Why use short/long?
    // - short: saves memory when you know value is small
    // - long: needed for very large numbers (note the 'L' suffix)
    // - unsigned: doubles positive range by removing negative numbers
    
    // Floating-point types (numbers with decimals)
    // Different precision levels:
    
    float price = 19.99f;      // Single precision (4 bytes, ~6-7 decimal digits)
    double pi = 3.14159265359; // Double precision (8 bytes, ~15-16 decimal digits)
    
    // Why use float vs double?
    // - float: less memory, less precision (note the 'f' suffix)
    // - double: more memory, more precision (default for decimals in C)
    // - Use double when precision matters (scientific calculations)
    // - Use float when memory matters and precision is less critical
    
    // Character type
    char letter = 'A';         // Single character (1 byte, stores ASCII value)
    
    printf("int: %d\n", age);                    // 25
    printf("short: %hd\n", year);                // 2024
    printf("long: %ld\n", population);           // 8000000000
    printf("unsigned int: %u\n", positive);      // 100
    printf("float: %.2f\n", price);              // 19.99 (2 decimal places)
    printf("double: %.10f\n", pi);               // 3.1415926536 (10 decimal places)
    printf("char: %c\n", letter);                // A
    
    printf("\n===== DATA TYPE SIZES =====\n");
    
    // sizeof() tells you how many bytes a type uses
    // More bytes = larger range of values
    
    printf("Size of char: %lu bytes\n", sizeof(char));         // Always 1
    
    printf("Size of short: %lu bytes\n", sizeof(short));       // Usually 2
    
    printf("Size of int: %lu bytes\n", sizeof(int));           // Usually 4
    printf("Size of float: %lu bytes\n", sizeof(float));       // Usually 4
    
    printf("Size of long: %lu bytes\n", sizeof(long));         // Usually 8
    printf("Size of double: %lu bytes\n", sizeof(double));     // Usually 8
    
    // Size determines range:
    // char (1 byte):    -128 to 127 (or 0 to 255 unsigned)
    // short (2 bytes):  -32,768 to 32,767
    // int (4 bytes):    -2,147,483,648 to 2,147,483,647
    // long (8 bytes):   -9 quintillion to +9 quintillion
    //
    // For floating point, size determines precision (decimal accuracy)
    
    printf("\n===== CONSTANTS =====\n");
    
    // Constants are values that cannot be changed after initialization
    // Use const keyword for type-safe constants
    
    const int MAX_USERS = 100;
    const float PI = 3.14f;
    
    printf("Max users: %d\n", MAX_USERS);        // 100
    printf("Pi constant: %.2f\n", PI);           // 3.14
    
    // MAX_USERS = 200;  // Error! Cannot modify const
    
    // Convention: use UPPERCASE for constants to distinguish them
    
    printf("\n===== USING #define =====\n");
    
    // #define is a preprocessor directive (runs before compilation)
    // It performs text replacement - wherever DAYS_IN_WEEK appears,
    // it gets replaced with 7 before the code is compiled
    // No semicolon needed, no type checking
    
    #define DAYS_IN_WEEK 7
    #define HOURS_IN_DAY 24
    
    printf("Days in week: %d\n", DAYS_IN_WEEK);  // 7
    printf("Hours in day: %d\n", HOURS_IN_DAY);  // 24
    
    // #define vs const:
    // - #define: text replacement, no type, no memory allocated
    // - const: actual variable with type, stored in memory
    // Prefer const for type safety
    
    printf("\n===== VARIABLE SCOPE =====\n");
    
    // Scope determines where a variable can be accessed
    
    int global_scope = 10;  // Available in entire main function
    
    {
        // This is a new block scope (created with braces)
        int local_scope = 20;  // Only available in this block
        printf("Inside block - local: %d, global: %d\n", local_scope, global_scope);
    }
    
    // printf("%d\n", local_scope);  // Error! local_scope not accessible here
    printf("Outside block - global: %d\n", global_scope);  // Still works
    
    // Variable shadowing example
    int x = 5;
    {
        int x = 10;  // Different variable, shadows outer x
        printf("Inner x: %d\n", x);  // 10
    }
    printf("Outer x: %d\n", x);  // 5 (unchanged)
    
    printf("\n===== TYPE CASTING =====\n");
    
    // Type casting converts one data type to another
    // Useful for controlling division, avoiding truncation, etc.
    
    int a = 10;
    int b = 3;
    
    // Integer division truncates (discards decimal part)
    printf("Integer division: %d / %d = %d\n", a, b, a / b);  // 3
    
    // Cast to float for precise division
    printf("Float division: %d / %d = %.2f\n", a, b, (float)a / b);  // 3.33
    
    // Can also cast the result
    printf("Float division (alt): %.2f\n", (float)(a) / (float)(b));  // 3.33
    
    double x = 9.8;
    printf("Double to int: %.1f -> %d\n", x, (int)x);  // 9.8 -> 9 (truncates)
    
    // Implicit casting (automatic)
    double result = a + x;  // a is automatically cast to double
    printf("Implicit cast: int + double = %.1f\n", result);  // 19.8
    
    return 0;
}

// Notes:
// - Variables must be declared before use (C requires declaration at top of block in old C)
// - C is case-sensitive (age != Age != AGE)
// - Choose const over #define for type safety and debugging
// - sizeof() returns size in bytes (size_t type, use %lu to print)
// - Always initialize variables before using them (uninitialized = garbage value)
// - Use meaningful variable names (age, not a)
// - Format specifiers: %d (int), %f (float), %lf (double), %c (char), %s (string)
// - #define does text replacement before compilation (preprocessor directive)
// - const variables have a type and are stored in memory
// - Type casting: (type)value converts value to specified type
// - Implicit casting happens automatically when mixing types
