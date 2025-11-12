#include <stdio.h>

// ===== HELLO WORLD =====
// This is the most basic C program

int main() {
    printf("Hello, World!\n");
    return 0;
}

// ===== COMPILATION AND EXECUTION =====
// To compile: gcc -o hello hello.c
// To run: ./hello

// ===== BASIC SYNTAX NOTES =====
// - #include <stdio.h> gives access to printf and other I/O functions
// - main() is the entry point of every C program
// - printf() outputs text to the console
// - \n creates a new line
// - return 0 indicates successful program execution
// - Statements end with semicolons ;
// - Code blocks use curly braces { }

// ===== COMMENTS =====
// Single-line comment

/*
   Multi-line
   comment
*/

// ===== PRINTING =====
// Basic printing examples with printf

void printing_examples() {
    // Basic printing
    printf("Hello, World!\n");
    
    // Printing multiple lines
    printf("Line 1\n");
    printf("Line 2\n");
    printf("Line 3\n");
    
    // Printing without newline
    printf("This ");
    printf("is ");
    printf("one line\n");
}

// ===== PRINTING VARIABLES =====
void variables_examples() {
    int age = 30;
    float price = 19.99;
    char grade = 'A';
    char name[] = "John";
    
    // Format specifiers:
    // %d or %i - integers
    // %f - floats/doubles
    // %c - characters
    // %s - strings
    
    printf("Age: %d\n", age);              // Age: 30
    printf("Price: %.2f\n", price);        // Price: 19.99 (2 decimal places)
    printf("Grade: %c\n", grade);          // Grade: A
    printf("Name: %s\n", name);            // Name: John
    
    // Multiple variables
    printf("Name: %s, Age: %d, Grade: %c\n", name, age, grade);
}
