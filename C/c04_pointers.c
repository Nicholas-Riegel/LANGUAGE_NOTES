#include <stdio.h>

// ========================================
// POINTERS IN C - EXPLAINED FROM SCRATCH
// ========================================
//
// WHAT IS A POINTER?
// A pointer is a variable that stores a MEMORY ADDRESS instead of a regular value.
//
// WHY DO WE NEED POINTERS?
// 1. To modify variables inside functions (pass by reference)
// 2. To work with arrays and strings efficiently
// 3. To allocate memory dynamically (malloc, which we'll see in c08_memory.c)
// 4. To build complex data structures (linked lists, trees, etc.)
//
// ANALOGY:
// Think of computer memory like a giant apartment building.
// - Each apartment (memory location) has an ADDRESS (like "Building A, Floor 3, Room 5")
// - Each apartment contains DATA (the person living there, or a number stored in memory)
// - A regular variable is like knowing WHO lives in the apartment (the data)
// - A pointer is like knowing the ADDRESS of the apartment itself
//
// This file builds up pointers STEP BY STEP:
// Step 1: Understanding that variables have addresses
// Step 2: The & operator (address-of)
// Step 3: What a pointer actually is
// Step 4: The * operator (dereference)
// Step 5: Using pointers to modify variables
// Step 6: Advanced pointer topics
//

int main() {
    
    // ========================================
    // STEP 1: EVERY VARIABLE HAS AN ADDRESS
    // ========================================
    printf("===== STEP 1: VARIABLES HAVE ADDRESSES =====\n");
    
    // When you create a variable, C stores it SOMEWHERE in memory
    int age = 25;
    
    // We can SEE this value directly
    printf("The value of age is: %d\n", age);  // 25
    
    // But age also has a LOCATION in memory - an address!
    // We can't see it yet, but it's there (like "Room 104" in our apartment analogy)
    printf("age is stored somewhere in memory, but we need & to see WHERE\n");
    
    
    // ========================================
    // STEP 2: THE & OPERATOR - "ADDRESS OF"
    // ========================================
    printf("\n===== STEP 2: THE & OPERATOR =====\n");
    
    // The & operator means "give me the ADDRESS of this variable"
    // Think: "What's the room number where age lives?"
    
    int score = 100;
    
    printf("Value of score: %d\n", score);  // 100 (the data inside)
    
    // Now let's see WHERE score is stored
    // %%p is the format specifier for printing memory addresses
    printf("Address of score: %p\n", &score);  // Something like 0x7ffee4b5f5bc
    
    // &score means "the address of score" or "where score lives in memory"
    // The actual address will be different every time you run the program!
    
    // Let's see addresses of multiple variables
    int x = 10;
    int y = 20;
    int z = 30;
    
    printf("\nThree variables and their addresses:\n");
    printf("x = %d, address: %p\n", x, &x);
    printf("y = %d, address: %p\n", y, &y);
    printf("z = %d, address: %p\n", z, &z);
    
    // Notice: The addresses are usually close together (sequential memory)
    // but each variable has its OWN unique address
    
    // KEY INSIGHT: & gets you the ADDRESS (the "room number")
    
    
    // ========================================
    // STEP 3: WHAT IS A POINTER?
    // ========================================
    printf("\n===== STEP 3: CREATING A POINTER =====\n");
    
    // A pointer is a variable that STORES an address
    // Instead of storing a number like 25 or 100, it stores an address like 0x7ffee4b5f5bc
    
    int height = 180;
    
    // Create a pointer to an integer
    // Syntax: int* pointer_name   OR   int *pointer_name
    // Read as: "ptr is a pointer to an int"
    int *ptr;
    
    // Right now, ptr is uninitialized - it contains garbage!
    // NEVER use an uninitialized pointer - it points to random memory!
    
    // Let's give ptr a valid address to point to
    ptr = &height;  // ptr now stores the ADDRESS of height
    
    printf("Value of height: %d\n", height);        // 180
    printf("Address of height: %p\n", &height);     // Some address
    printf("Value stored in ptr: %p\n", ptr);       // SAME address as &height!
    
    // IMPORTANT: ptr and &height are THE SAME THING
    // ptr is just a variable that HOLDS that address
    
    printf("\nThink of it this way:\n");
    printf("  height lives in room %p\n", &height);
    printf("  ptr has a piece of paper that says: 'height is in room %p'\n", ptr);
    
    
    // ========================================
    // STEP 4: THE * OPERATOR - "VALUE AT ADDRESS"
    // ========================================
    printf("\n===== STEP 4: THE * OPERATOR (DEREFERENCING) =====\n");
    
    // So far we have:
    // - height = 180 (the value)
    // - &height = the address where 180 is stored
    // - ptr = the address where 180 is stored (same as &height)
    
    // But what if we have a pointer and want to GET the value it points to?
    // That's where the * operator comes in!
    
    // The * operator means "go to this address and get the VALUE there"
    // We call this "dereferencing" (following the pointer to its destination)
    
    printf("height = %d\n", height);       // 180 (direct access)
    printf("*ptr = %d\n", *ptr);           // 180 (indirect access through pointer)
    
    // Both give us the SAME value because:
    // - height is the variable itself
    // - *ptr means "go to the address stored in ptr and get the value"
    
    printf("\nUnderstanding *ptr:\n");
    printf("  ptr contains the address: %p\n", ptr);
    printf("  *ptr means 'go to %p and get the value'\n", ptr);
    printf("  The value at %p is: %d\n", ptr, *ptr);
    
    // CRITICAL DISTINCTION:
    printf("\nptr vs *ptr:\n");
    printf("  ptr  = the address itself = %p\n", ptr);
    printf("  *ptr = the value at that address = %d\n", *ptr);
    
    
    // ========================================
    // STEP 5: USING POINTERS TO MODIFY VARIABLES
    // ========================================
    printf("\n===== STEP 5: MODIFYING THROUGH POINTERS =====\n");
    
    int count = 5;
    int *countPtr = &count;  // countPtr points to count
    
    printf("Initial count: %d\n", count);        // 5
    printf("Initial *countPtr: %d\n", *countPtr); // 5
    
    // We can change count directly
    count = 10;
    printf("\nAfter count = 10:\n");
    printf("  count: %d\n", count);        // 10
    printf("  *countPtr: %d\n", *countPtr); // 10 (also changed! Same memory location)
    
    // OR we can change it through the pointer!
    *countPtr = 20;  // "Go to the address in countPtr and set the value to 20"
    printf("\nAfter *countPtr = 20:\n");
    printf("  count: %d\n", count);        // 20 (changed!)
    printf("  *countPtr: %d\n", *countPtr); // 20
    
    // WHY DOES THIS WORK?
    // count and *countPtr refer to the SAME MEMORY LOCATION
    // Changing one changes the other because they're the SAME thing
    
    printf("\nWhy this works:\n");
    printf("  count lives at address %p\n", &count);
    printf("  countPtr contains address %p\n", countPtr);
    printf("  These are the SAME address!\n");
    printf("  So modifying count OR *countPtr modifies the SAME memory location\n");
    
    
    // ========================================
    // STEP 6: NULL POINTERS
    // ========================================
    printf("\n===== STEP 6: NULL POINTERS =====\n");
    
    // NULL is a special pointer value that means "points to nothing"
    // It's defined as address 0, which is guaranteed to be invalid
    
    int *nullPtr = NULL;  // Good practice: initialize pointers to NULL if not ready to use
    
    printf("Value of nullPtr: %p\n", nullPtr);  // 0x0 or (nil)
    
    // DANGER: Never dereference a NULL pointer!
    // *nullPtr would crash your program (segmentation fault)
    
    // ALWAYS check before dereferencing
    if (nullPtr != NULL) {
        printf("Value at nullPtr: %d\n", *nullPtr);  // Safe to dereference
    } else {
        printf("nullPtr is NULL - cannot dereference!\n");  // This prints
    }
    
    // Why use NULL?
    // 1. Shows a pointer doesn't point to anything yet
    // 2. Allows you to check if pointer is valid before using it
    // 3. Better than an uninitialized pointer (which has random garbage)
    
    
    // ========================================
    // STEP 7: POINTERS AND ARRAYS
    // ========================================
    printf("\n===== STEP 7: POINTERS AND ARRAYS =====\n");
    
    // Here's a mind-blowing fact: An array name IS a pointer!
    // The array name points to the first element
    
    int numbers[] = {10, 20, 30, 40, 50};
    
    // These two are IDENTICAL:
    int *numPtr1 = numbers;        // Array name is a pointer
    int *numPtr2 = &numbers[0];    // Explicitly get address of first element
    
    printf("numbers points to: %p\n", numbers); // 0x16db82d70
    printf("&numbers[0] is: %p\n", &numbers[0]); // 0x16db82d70
    printf("These are the SAME!\n");
    
    // Accessing array elements with pointers
    printf("\nFirst element (*numPtr1): %d\n", *numPtr1);  // 10
    
    // What about the second element?
    // We need POINTER ARITHMETIC for that...
    
    
    // ========================================
    // STEP 8: POINTER ARITHMETIC
    // ========================================
    printf("\n===== STEP 8: POINTER ARITHMETIC =====\n");
    
    // You can ADD to a pointer to move to the next element
    // ptr + 1 doesn't mean "add 1 byte" - it means "move to the NEXT element"
    
    int values[] = {100, 200, 300};
    int *valPtr = values;  // Points to first element
    
    printf("Element 0: *valPtr = %d\n", *valPtr);        // 100
    printf("Element 1: *(valPtr + 1) = %d\n", *(valPtr + 1)); // 200
    printf("Element 2: *(valPtr + 2) = %d\n", *(valPtr + 2)); // 300
    
    // Why does this work?
    // When you add 1 to a pointer, C automatically multiplies by the size of the type
    // For int (4 bytes), ptr + 1 actually adds 4 bytes to the address
    
    printf("\nAddresses show this:\n");
    printf("Address of values[0]: %p\n", valPtr);
    printf("Address of values[1]: %p\n", valPtr + 1);
    printf("Address of values[2]: %p\n", valPtr + 2);
    printf("Notice: Each address is 4 bytes apart (size of int)\n");
    
    // Array notation is just pointer arithmetic in disguise!
    printf("\narray[i] is the same as *(array + i):\n");
    printf("values[0] = %d, *(values + 0) = %d\n", values[0], *(values + 0));
    printf("values[1] = %d, *(values + 1) = %d\n", values[1], *(values + 1));
    printf("values[2] = %d, *(values + 2) = %d\n", values[2], *(values + 2));
    
    // Loop through array with pointer arithmetic
    printf("\nLoop using pointer arithmetic: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", *(numPtr1 + i));  // 10 20 30 40 50
    }
    printf("\n");
    
    
    // ========================================
    // STEP 9: POINTERS AS FUNCTION PARAMETERS
    // ========================================
    printf("\n===== STEP 9: POINTERS IN FUNCTIONS =====\n");
    
    // Without pointers, functions receive COPIES of variables
    // With pointers, functions can modify the ORIGINAL variables
    
    int a = 5, b = 10;
    printf("Before swap: a = %d, b = %d\n", a, b);
    
    // Manual swap using pointers (we'll make a function for this later)
    int *ptrA = &a;
    int *ptrB = &b;
    int temp = *ptrA;  // Save value at ptrA
    *ptrA = *ptrB;     // Set value at ptrA to value at ptrB
    *ptrB = temp;      // Set value at ptrB to saved value
    
    printf("After swap: a = %d, b = %d\n", a, b);  // 10, 5
    
    // This is how functions can modify variables - they receive ADDRESSES
    
    
    // ========================================
    // STEP 10: COMMON POINTER MISTAKES
    // ========================================
    printf("\n===== STEP 10: COMMON MISTAKES =====\n");
    
    printf("1. UNINITIALIZED POINTER:\n");
    // int *badPtr;  // Contains random garbage address!
    // *badPtr = 42;  // CRASH! Trying to write to random memory
    printf("   Always initialize: int *ptr = NULL; or int *ptr = &variable;\n");
    
    printf("\n2. DEREFERENCING NULL:\n");
    // int *nullP = NULL;
    // *nullP = 5;  // CRASH! Can't access address 0
    printf("   Always check: if (ptr != NULL) before using *ptr\n");
    
    printf("\n3. DANGLING POINTER (pointer to deleted/out-of-scope memory):\n");
    // int global = 10;
    // int *dangPtr = &global;  // Start with valid pointer
    // {
    //     int temp = 42;
    //     dangPtr = &temp;     // Now points to local variable
    // }  // temp is destroyed here, dangPtr now points to invalid memory
    // printf("%d", *dangPtr);  // CRASH! temp doesn't exist anymore
    printf("   Only point to variables that still exist!\n");
    
    printf("\n4. CONFUSING * IN DECLARATION vs DEREFERENCE:\n");
    printf("   int *ptr;     // * means 'this is a pointer'\n");
    printf("   *ptr = 5;     // * means 'value at address ptr'\n");
    printf("   These look similar but mean different things!\n");
    
    
    // ========================================
    // STEP 11: POINTER TYPES
    // ========================================
    printf("\n===== STEP 11: DIFFERENT POINTER TYPES =====\n");
    
    // Pointers have types because different data types have different sizes
    
    int intVal = 100;
    double doubleVal = 3.14;
    char charVal = 'A';
    
    int *intPtr = &intVal;
    double *doublePtr = &doubleVal;
    char *charPtr = &charVal;
    
    printf("int: %d, *intPtr: %d\n", intVal, *intPtr);
    printf("double: %.2f, *doublePtr: %.2f\n", doubleVal, *doublePtr);
    printf("char: %c, *charPtr: %c\n", charVal, *charPtr);
    
    // Can't mix pointer types!
    // intPtr = &doubleVal;  // ERROR! int* can't point to double
    
    // All pointers are the same SIZE (they store addresses)
    printf("\nAll pointers are the same size:\n");
    printf("sizeof(int*): %lu bytes\n", sizeof(int*));
    printf("sizeof(double*): %lu bytes\n", sizeof(double*));
    printf("sizeof(char*): %lu bytes\n", sizeof(char*));
    printf("All are %lu bytes because addresses are all the same size\n", sizeof(void*));
    
    
    // ========================================
    // STEP 12: POINTER TO POINTER
    // ========================================
    printf("\n===== STEP 12: POINTER TO POINTER =====\n");
    
    // A pointer stores an address
    // That pointer ITSELF has an address!
    // A pointer-to-pointer stores the address of a pointer
    
    int value = 42;
    int *p = &value;      // p points to value
    int **pp = &p;        // pp points to p
    
    printf("value = %d\n", value);          // 42
    printf("*p = %d (value via p)\n", *p);  // 42
    printf("**pp = %d (value via pp)\n", **pp);  // 42
    
    // Diagram:
    // value:  [42]     at address 0x1000
    // p:      [0x1000] at address 0x2000  (points to value)
    // pp:     [0x2000] at address 0x3000  (points to p)
    
    // Change value through pointer-to-pointer
    **pp = 99;
    printf("\nAfter **pp = 99:\n");
    printf("value = %d\n", value);  // 99
    
    printf("\nExplanation:\n");
    printf("  pp contains address of p: %p\n", (void*)pp);
    printf("  *pp gives us p itself: %p\n", (void*)*pp);
    printf("  **pp gives us the value p points to: %d\n", **pp);
    
    
    // ========================================
    // SUMMARY - EVERYTHING YOU NEED TO KNOW
    // ========================================
    printf("\n===== POINTER SUMMARY =====\n");
    
    printf("\nKEY OPERATORS:\n");
    printf("  & = 'address of' (gets the memory address of a variable)\n");
    printf("  * = 'value at' (gets the value stored at an address)\n");
    
    printf("\nDECLARATION:\n");
    printf("  int *ptr;     // ptr is a pointer to an int\n");
    printf("  double *ptr;  // ptr is a pointer to a double\n");
    
    printf("\nUSAGE:\n");
    printf("  int x = 10;\n");
    printf("  int *ptr = &x;   // ptr stores the address of x\n");
    printf("  *ptr = 20;       // changes x to 20 (modifies value at address)\n");
    
    printf("\nCRITICAL RULES:\n");
    printf("  1. Always initialize pointers (to NULL or valid address)\n");
    printf("  2. Always check for NULL before dereferencing\n");
    printf("  3. Don't dereference uninitialized or dangling pointers\n");
    printf("  4. Pointer type must match variable type\n");
    
    printf("\nREMEMBER:\n");
    printf("  - Every variable has a VALUE and an ADDRESS\n");
    printf("  - Pointers store ADDRESSES, not values\n");
    printf("  - Use & to GET an address, * to GET the value at an address\n");
    printf("  - Arrays are pointers to their first element\n");
    printf("  - Pointer arithmetic moves by element size, not bytes\n");
    
    return 0;
}

// ========================================
// NOTES FOR LATER
// ========================================
//
// POINTER SYNTAX CHEAT SHEET:
// ---------------------------
// int *ptr;           // Declare pointer to int
// ptr = &variable;    // Store address of variable in ptr
// *ptr = 5;          // Set value at address ptr to 5
// int val = *ptr;    // Get value at address ptr
//
// TWO MEANINGS OF *:
// -----------------
// 1. In declaration: int *ptr;    → "ptr is a pointer"
// 2. In expression: *ptr = 5;     → "value at address ptr"
//
// ARRAY/POINTER EQUIVALENCE:
// -------------------------
// arr[i]  is the same as  *(arr + i)
// &arr[i] is the same as  (arr + i)
//
// POINTER ARITHMETIC:
// ------------------
// ptr + 1   → moves to next element (not next byte!)
// ptr + n   → moves forward n elements
// ptr - 1   → moves to previous element
//
// COMMON ERRORS:
// -------------
// ❌ int *ptr; *ptr = 5;              // Uninitialized pointer
// ❌ int *ptr = NULL; *ptr = 5;       // Dereferencing NULL
// ❌ int *ptr = &x; x deleted; *ptr;  // Dangling pointer
// ✓ int *ptr = NULL; if (ptr) {...}   // Check before use
// ✓ int *ptr = &x; *ptr = 5;          // Proper usage
//
// WHY POINTERS MATTER:
// -------------------
// 1. Functions can modify caller's variables (pass by reference)
// 2. Efficient array/string manipulation
// 3. Dynamic memory allocation (malloc/free in c05_memory.c)
// 4. Data structures (linked lists, trees, graphs)
//
// NEXT STEPS:
// ----------
// - See c05_memory.c for dynamic memory (malloc/free)
// - See c07_structs.c for pointers to structures
// - Practice with functions that take pointer parameters
//
