#include <stdio.h>

// POINTERS IN C
// =============
// Variables that store memory addresses instead of values
// One of C's most powerful and dangerous features!
// Syntax: type *pointer_name
// & = address-of operator (get address)
// * = dereference operator (get value at address)

int main() {
    
    printf("===== BASIC POINTERS =====\n");
    
    // Every variable has a value AND an address in memory
    int age = 25;
    int *ptr = &age;  // ptr holds the ADDRESS where age is stored
    // Read as: "ptr is a pointer to an int"
    
    printf("Value of age: %d\n", age);           // 25 (the value)
    printf("Address of age: %p\n", (void*)&age); // e.g., 0x7ffeefbff5ac (memory location)
    printf("Value of ptr (address): %p\n", (void*)ptr);  // Same address as &age
    printf("Value at ptr (*ptr): %d\n", *ptr);   // 25 (dereference to get value)
    // *ptr means "go to address in ptr and get the value there"
    
    printf("\n===== DEREFERENCING POINTERS =====\n");
    
    // Can modify original variable through pointer
    // This is "pass by reference" - changing value at an address
    
    *ptr = 30;  // *ptr = "go to address in ptr and set value to 30"
    printf("New age value: %d\n", age);  // 30 (age changed!)
    printf("Value at ptr: %d\n", *ptr);  // 30 (same value)
    // age and *ptr refer to the SAME memory location
    
    printf("\n===== NULL POINTERS =====\n");
    
    // NULL pointer points to nothing (address 0)
    // Common practice: Initialize pointers to NULL if not immediately used
    
    int *nullPtr = NULL;  // NULL is defined in stdio.h as (void*)0
    printf("Null pointer value: %p\n", (void*)nullPtr);  // (nil) or 0x0
    
    // Always check before dereferencing! Dereferencing NULL crashes program
    if (nullPtr != NULL) {
        printf("Value: %d\n", *nullPtr);  // Would crash here!
    } else {
        printf("Pointer is NULL, cannot dereference\n");  // This prints (safe)
    }
    // Segmentation fault = trying to access invalid memory (often NULL)
    
    printf("\n===== POINTERS AND ARRAYS =====\n");
    
    // Array name IS a pointer to first element!
    // This is why arrays "decay" to pointers when passed to functions
    
    int numbers[] = {10, 20, 30, 40, 50};
    int *numPtr = numbers;  // Same as: int *numPtr = &numbers[0]
    
    printf("First element: %d\n", *numPtr);       // 10 (dereference first element)
    printf("Second element: %d\n", *(numPtr + 1)); // 20 (pointer arithmetic: +1 moves to next int)
    printf("Third element: %d\n", numPtr[2]);     // 30 (array syntax works on pointers!)
    // numPtr[2] is identical to *(numPtr + 2)
    
    printf("\n===== POINTER ARITHMETIC =====\n");
    
    printf("Address of numbers[0]: %p\n", (void*)numPtr);
    printf("Address of numbers[1]: %p\n", (void*)(numPtr + 1));
    printf("Address of numbers[2]: %p\n", (void*)(numPtr + 2));
    
    // Moving through array with pointer
    printf("Array using pointer arithmetic: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", *(numPtr + i));  // 10 20 30 40 50
    }
    printf("\n");
    
    printf("\n===== POINTER TO POINTER =====\n");
    
    int value = 100;
    int *p1 = &value;
    int **p2 = &p1;  // Pointer to pointer
    
    printf("value: %d\n", value);     // 100
    printf("*p1: %d\n", *p1);         // 100
    printf("**p2: %d\n", **p2);       // 100
    
    **p2 = 200;  // Change value through pointer to pointer
    printf("New value: %d\n", value); // 200
    
    printf("\n===== POINTERS AS FUNCTION PARAMETERS =====\n");
    
    int x = 5, y = 10;
    printf("Before swap: x = %d, y = %d\n", x, y);  // 5, 10
    
    // Swap function using pointers
    int temp = *(&x);
    *(&x) = *(&y);
    *(&y) = temp;
    
    printf("After swap: x = %d, y = %d\n", x, y);   // 10, 5
    
    printf("\n===== CONST POINTERS =====\n");
    
    int num1 = 10;
    int num2 = 20;
    
    // Pointer to constant
    const int *ptr1 = &num1;
    // *ptr1 = 15;  // Error! Cannot modify value
    ptr1 = &num2;   // OK! Can change pointer
    
    // Constant pointer
    int *const ptr2 = &num1;
    *ptr2 = 15;     // OK! Can modify value
    // ptr2 = &num2;   // Error! Cannot change pointer
    
    // Constant pointer to constant
    const int *const ptr3 = &num1;
    // *ptr3 = 15;     // Error! Cannot modify value
    // ptr3 = &num2;   // Error! Cannot change pointer
    
    printf("\n===== COMMON POINTER MISTAKES =====\n");
    
    // 1. Uninitialized pointer
    // int *badPtr;  // Points to random memory!
    // *badPtr = 10;  // DANGER! Undefined behavior
    
    // 2. Dereferencing NULL
    // int *nullP = NULL;
    // *nullP = 5;  // CRASH!
    
    // 3. Dangling pointer (pointer to freed/out-of-scope memory)
    // int *danglingPtr;
    // {
    //     int temp = 42;
    //     danglingPtr = &temp;
    // }  // temp goes out of scope
    // printf("%d\n", *danglingPtr);  // DANGER! Undefined behavior
    
    printf("Avoided common mistakes!\n");
    
    printf("\n===== POINTER SIZE =====\n");
    
    printf("Size of int: %lu bytes\n", sizeof(int));          // 4
    printf("Size of int*: %lu bytes\n", sizeof(int*));        // 8 (on 64-bit)
    printf("Size of char*: %lu bytes\n", sizeof(char*));      // 8
    printf("Size of double*: %lu bytes\n", sizeof(double*));  // 8
    // All pointers are same size (address size)
    
    return 0;
}

// Notes:
// - Pointer syntax: int *ptr (pointer to int)
// - & operator: gets address of variable
// - * operator: dereferences pointer (gets value at address)
// - NULL pointer should always be checked before dereferencing
// - Array names are pointers to first element
// - Pointer arithmetic: ptr + n moves n elements forward
// - Pointers enable pass-by-reference in functions
// - Always initialize pointers (to NULL or valid address)
// - Dereferencing NULL or uninitialized pointers causes crashes
// - All pointer types are same size (address size, usually 8 bytes on 64-bit)
