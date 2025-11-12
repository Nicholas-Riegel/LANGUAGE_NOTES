#include <stdio.h>

int main() {
    
    printf("===== BASIC DATA TYPES =====\n");
    
    // Integer types
    int age = 25;
    short year = 2024;
    long population = 8000000000L;
    unsigned int positive = 100;
    
    // Floating-point types
    float price = 19.99f;
    double pi = 3.14159265359;
    
    // Character type
    char letter = 'A';
    
    printf("int: %d\n", age);                    // 25
    printf("short: %hd\n", year);                // 2024
    printf("long: %ld\n", population);           // 8000000000
    printf("unsigned int: %u\n", positive);      // 100
    printf("float: %.2f\n", price);              // 19.99
    printf("double: %.10f\n", pi);               // 3.1415926536
    printf("char: %c\n", letter);                // A
    
    printf("\n===== DATA TYPE SIZES =====\n");
    
    printf("Size of int: %lu bytes\n", sizeof(int));           // Usually 4
    printf("Size of short: %lu bytes\n", sizeof(short));       // Usually 2
    printf("Size of long: %lu bytes\n", sizeof(long));         // Usually 8
    printf("Size of float: %lu bytes\n", sizeof(float));       // Usually 4
    printf("Size of double: %lu bytes\n", sizeof(double));     // Usually 8
    printf("Size of char: %lu bytes\n", sizeof(char));         // Always 1
    
    printf("\n===== CONSTANTS =====\n");
    
    // Using const keyword
    const int MAX_USERS = 100;
    const float PI = 3.14f;
    
    printf("Max users: %d\n", MAX_USERS);        // 100
    printf("Pi constant: %.2f\n", PI);           // 3.14
    
    // MAX_USERS = 200;  // Error! Cannot modify const
    
    printf("\n===== USING #define =====\n");
    
    #define DAYS_IN_WEEK 7
    #define HOURS_IN_DAY 24
    
    printf("Days in week: %d\n", DAYS_IN_WEEK);  // 7
    printf("Hours in day: %d\n", HOURS_IN_DAY);  // 24
    
    printf("\n===== VARIABLE SCOPE =====\n");
    
    int global_scope = 10;  // Available in entire main
    
    {
        int local_scope = 20;  // Only available in this block
        printf("Inside block - local: %d, global: %d\n", local_scope, global_scope);
    }
    
    // printf("%d\n", local_scope);  // Error! local_scope not accessible here
    printf("Outside block - global: %d\n", global_scope);  // Still works
    
    printf("\n===== TYPE CASTING =====\n");
    
    int a = 10;
    int b = 3;
    
    printf("Integer division: %d / %d = %d\n", a, b, a / b);  // 3
    printf("Float division: %d / %d = %.2f\n", a, b, (float)a / b);  // 3.33
    
    double x = 9.8;
    printf("Double to int: %.1f -> %d\n", x, (int)x);  // 9.8 -> 9
    
    return 0;
}

// Notes:
// - Variables must be declared before use
// - C is case-sensitive (age != Age)
// - Choose const over #define for type safety
// - sizeof() returns size in bytes
// - Always initialize variables before using them
// - Use meaningful variable names
