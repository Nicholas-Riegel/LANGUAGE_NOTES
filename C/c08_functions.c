#include <stdio.h>

// FUNCTIONS IN C
// ==============
// Reusable blocks of code that perform specific tasks
// Must be DECLARED before use (prototypes) or DEFINED before main()
// Syntax: return_type function_name(parameters) { code }

// ===== FUNCTION DECLARATIONS (PROTOTYPES) =====
// Tell compiler about functions defined later
// Format: return_type name(parameter_types);
// Good practice: Declare at top, define after main()
void greet(void);              // void = returns nothing, (void) = takes no parameters
int add(int a, int b);         // Takes 2 ints, returns int
void printArray(int arr[], int size);  // Array parameter
void modifyValue(int *ptr);    // Pointer parameter (for pass-by-reference)
void swap(int *a, int *b);
int factorial(int n);

int main() {
    
    printf("===== CALLING FUNCTIONS =====\n");
    
    // Call functions by name with arguments in ()
    greet();  // Call void function (no return value to capture)
    
    int sum = add(5, 3);  // Call function, store return value
    printf("5 + 3 = %d\n", sum);  // 8
    // Function is executed, result returned and assigned to sum
    
    printf("\n===== FUNCTIONS WITH ARRAYS =====\n");
    
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    printArray(numbers, size);
    
    printf("\n===== PASS BY VALUE =====\n");
    
    int x = 10;
    printf("Before: x = %d\n", x);  // 10
    
    // This won't modify x (pass by value)
    int temp = x;
    temp = 20;
    printf("After (no change): x = %d\n", x);  // 10
    
    printf("\n===== PASS BY REFERENCE (POINTERS) =====\n");
    
    int y = 10;
    printf("Before: y = %d\n", y);  // 10
    modifyValue(&y);  // Pass address of y
    printf("After: y = %d\n", y);   // 20
    
    printf("\n===== SWAP FUNCTION =====\n");
    
    int a = 5, b = 10;
    printf("Before swap: a = %d, b = %d\n", a, b);  // 5, 10
    swap(&a, &b);
    printf("After swap: a = %d, b = %d\n", a, b);   // 10, 5
    
    printf("\n===== RECURSIVE FUNCTION =====\n");
    
    int num = 5;
    int result = factorial(num);
    printf("Factorial of %d = %d\n", num, result);  // 120
    
    printf("\n===== RETURN MULTIPLE VALUES (USING POINTERS) =====\n");
    
    int quot, rem;
    // divmod(10, 3, &quot, &rem);  // Would set quot=3, rem=1
    
    return 0;
}

// ===== FUNCTION DEFINITIONS =====

void greet(void) {
    printf("Hello from greet function!\n");
}

int add(int a, int b) {
    return a + b;
}

void printArray(int arr[], int size) {
    printf("Array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void modifyValue(int *ptr) {
    *ptr = 20;  // Modify value at the address
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int factorial(int n) {
    if (n <= 1) {
        return 1;  // Base case
    }
    return n * factorial(n - 1);  // Recursive case
}

// Example: Return multiple values using pointers
void divmod(int dividend, int divisor, int *quotient, int *remainder) {
    *quotient = dividend / divisor;
    *remainder = dividend % divisor;
}

// ===== MORE FUNCTION EXAMPLES =====

// Function with default behavior (no parameters)
void printHeader(void) {
    printf("====================\n");
}

// Function returning nothing
void displayMessage(char *message) {
    printf("Message: %s\n", message);
}

// Function with multiple parameters
int max(int a, int b, int c) {
    int maximum = a;
    if (b > maximum) maximum = b;
    if (c > maximum) maximum = c;
    return maximum;
}

// Function checking conditions
int isEven(int num) {
    return num % 2 == 0;  // Returns 1 (true) or 0 (false)
}

// Notes:
// - Function declarations (prototypes) go before main()
// - Function definitions can go after main()
// - Functions must be declared before they are called
// - void means function returns nothing
// - (void) in parameters means no parameters
// - C uses pass-by-value by default
// - Use pointers for pass-by-reference
// - Arrays are always passed by reference (pointer to first element)
// - Recursive functions must have a base case to avoid infinite recursion
// - To return multiple values, use pointers as parameters
