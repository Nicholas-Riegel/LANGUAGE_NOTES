#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// DYNAMIC MEMORY ALLOCATION IN C
// ===============================
// C has two types of memory:
// 1. STACK: Automatic, fixed size, fast (local variables)
// 2. HEAP: Dynamic, flexible size, manual management (malloc/free)
//
// Why use dynamic memory?
// - Size unknown at compile time (user input, file sizes)
// - Need memory that persists beyond function scope
// - Large data structures that might overflow stack
//
// Key functions from <stdlib.h>:
// - malloc(size): Allocate memory (uninitialized/garbage values)
// - calloc(count, size): Allocate and zero-initialize
// - realloc(ptr, newSize): Resize allocated memory
// - free(ptr): Release memory back to system
//
// CRITICAL: Every malloc/calloc/realloc MUST have matching free()!

int main() {
    
    printf("===== DYNAMIC MEMORY ALLOCATION =====\n");
    
    // malloc - allocate memory on the heap
    // Returns pointer to allocated memory, or NULL if allocation fails
    int *ptr = (int*)malloc(sizeof(int));
    // malloc(sizeof(int)) = allocate 4 bytes (size of one int)
    // (int*) = cast void* to int* for type safety
    
    if (ptr == NULL) {
        // ALWAYS check if malloc succeeded!
        printf("Memory allocation failed\n");
        return 1;  // Exit if no memory available
    }
    
    *ptr = 42;  // Now we can use it like a regular pointer
    printf("Value: %d\n", *ptr);  // 42
    
    free(ptr);  // Return memory to system - prevents memory leaks!
    // After free(), ptr becomes a "dangling pointer" - don't use it!
    
    printf("\n===== ALLOCATING ARRAYS =====\n");
    
    // Most common use: allocate arrays with runtime-determined size
    int n = 5;  // Size not known at compile time (could be user input)
    int *numbers = (int*)malloc(n * sizeof(int));
    // Allocates: 5 × 4 bytes = 20 bytes total
    // Returns pointer to first element
    
    if (numbers == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }
    
    // Initialize and use array - works just like normal arrays!
    for (int i = 0; i < n; i++) {
        numbers[i] = i * 10;  // Can use array notation
    }
    
    printf("Dynamic array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);  // 0 10 20 30 40
    }
    printf("\n");
    
    // Memory leak = allocated memory never freed = program uses more memory over time
    
    printf("\n===== CALLOC - INITIALIZED TO ZERO =====\n");
    
    // calloc = "contiguous allocation"
    // Difference from malloc: automatically initializes all bytes to 0
    // Syntax: calloc(number_of_elements, size_of_each_element)
    int *zeros = (int*)calloc(5, sizeof(int));
    // Same as malloc(5 * sizeof(int)) but zeros everything out
    
    if (zeros == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }
    
    printf("Calloc array (initialized to 0): ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", zeros[i]);  // 0 0 0 0 0 (guaranteed!)
    }
    printf("\n");
    // malloc would have garbage values until you initialize them
    
    free(zeros);
    
    printf("\n===== REALLOC - RESIZE MEMORY =====\n");
    
    // realloc changes size of previously allocated memory
    // Useful for: growing/shrinking dynamic arrays
    int *arr = (int*)malloc(3 * sizeof(int));
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    
    printf("Original array: ");
    for (int i = 0; i < 3; i++) {
        printf("%d ", arr[i]);  // 1 2 3
    }
    printf("\n");
    
    // Resize to hold 5 elements
    arr = (int*)realloc(arr, 5 * sizeof(int));
    // realloc may move data to new location if needed
    // Preserves existing data, returns new pointer
    // If can't resize, returns NULL (original pointer still valid!)
    arr[3] = 4;
    arr[4] = 5;
    
    printf("Resized array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);  // 1 2 3 4 5 (original data preserved)
    }
    printf("\n");
    
    free(arr);
    
    printf("\n===== DYNAMIC STRING ALLOCATION =====\n");
    
    // Strings are char arrays, so can allocate dynamically too
    char *str = (char*)malloc(50 * sizeof(char));
    // Allocate 50 bytes for a string (49 chars + '\0')
    
    if (str == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }
    
    strcpy(str, "Hello, Dynamic Memory!");
    printf("String: %s\n", str);
    
    free(str);  // Don't forget to free strings too!
    
    printf("\n===== MEMORY LEAK EXAMPLE (DON'T DO THIS) =====\n");
    
    // MEMORY LEAK = allocating memory without freeing it
    // Program keeps requesting more memory until system runs out
    // Common in loops: allocating repeatedly without freeing
    
    // Bad: allocating without freeing
    // int *leak = (int*)malloc(sizeof(int));
    // *leak = 100;
    // No free(leak) - MEMORY LEAK!
    // That memory is lost forever until program exits
    
    printf("Avoided memory leak by always using free()\n");
    // Rule: Every malloc/calloc/realloc needs exactly one free()
    
    printf("\n===== DANGLING POINTER (AVOID) =====\n");
    
    // DANGLING POINTER = pointer to freed memory
    // Using it after free() causes undefined behavior (crash, corruption, etc.)
    
    int *temp = (int*)malloc(sizeof(int));
    *temp = 10;
    free(temp);  // Memory returned to system
    
    // temp is now a dangling pointer!
    // printf("%d\n", *temp);  // DANGER! Undefined behavior - might crash!
    // The memory might be reused for something else
    
    temp = NULL;  // Good practice: set to NULL after free
    // Now it's not dangling, it's explicitly NULL
    
    if (temp != NULL) {
        printf("Value: %d\n", *temp);
    } else {
        printf("Pointer is NULL, safe!\n");
    }
    
    printf("\n===== 2D DYNAMIC ARRAY =====\n");
    
    int rows = 3, cols = 4;
    
    // Allocate array of pointers
    int **matrix = (int**)malloc(rows * sizeof(int*));
    
    // Allocate each row
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
    }
    
    // Initialize matrix
    int value = 1;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = value++;
        }
    }
    
    // Print matrix
    printf("2D Dynamic array:\n");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%2d ", matrix[i][j]);
        }
        printf("\n");
    }
    
    // Free each row
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    
    // Free array of pointers
    free(matrix);
    
    printf("\n===== CHECKING MALLOC SUCCESS =====\n");
    
    int *safe = (int*)malloc(sizeof(int));
    
    if (safe == NULL) {
        fprintf(stderr, "Error: Memory allocation failed\n");
        return 1;
    }
    
    *safe = 999;
    printf("Successfully allocated and set value: %d\n", *safe);
    free(safe);
    
    printf("\n===== MALLOC VS CALLOC VS REALLOC =====\n");
    
    // malloc: allocates memory (uninitialized, may contain garbage)
    int *m = (int*)malloc(5 * sizeof(int));
    
    // calloc: allocates and initializes to zero
    int *c = (int*)calloc(5, sizeof(int));
    
    // realloc: resizes previously allocated memory
    int *r = (int*)malloc(3 * sizeof(int));
    r = (int*)realloc(r, 6 * sizeof(int));
    
    free(m);
    free(c);
    free(r);
    
    printf("malloc - uninitialized memory\n");
    printf("calloc - initialized to zero\n");
    printf("realloc - resize existing memory\n");
    
    return 0;
}

// Notes:
// - Always check if malloc/calloc/realloc returns NULL
// - Always free() dynamically allocated memory
// - Set pointers to NULL after freeing (good practice)
// - malloc: allocates uninitialized memory
// - calloc: allocates and initializes to zero
// - realloc: changes size of previously allocated memory
// - Memory leaks occur when you allocate but don't free
// - Dangling pointers point to freed memory (dangerous!)
// - Use valgrind or similar tools to detect memory leaks
// - For 2D arrays: allocate array of pointers, then each row
// - Free in reverse order of allocation for 2D arrays
// - Dynamic memory goes on the heap (larger than stack)
