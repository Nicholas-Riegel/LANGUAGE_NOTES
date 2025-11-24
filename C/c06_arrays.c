#include <stdio.h>
#include <stdlib.h>  // For malloc, realloc, free

// ARRAYS IN C
// ===========
// Collections of elements of the SAME type
// Fixed arrays: size known at compile time (cannot grow or shrink)
// Dynamic arrays: allocated with malloc/realloc (can be resized at runtime)
// Elements stored in contiguous memory locations
// Access elements using index (starting at 0)

int main() {
    
    printf("===== CREATING ARRAYS =====\n");
    
    // Three ways to create arrays:
    // 1. Let compiler count elements: type name[] = {values}
    // 2. Specify size: type name[size] = {values}
    // 3. Just size: type name[size] (uninitialized, contains garbage)
    
    int numbers[] = {1, 2, 3, 4, 5};           // Size auto-calculated (5)
    int scores[5] = {90, 85, 95, 88, 92};      // Size explicit
    char letters[] = {'a', 'b', 'c', 'd'};     // Works with any type
    
    printf("First number: %d\n", numbers[0]);    // 1 (index starts at 0!)
    printf("Third score: %d\n", scores[2]);      // 95 (third element = index 2)
    printf("Second letter: %c\n", letters[1]);   // b
    // Common mistake: Forgetting arrays start at index 0, not 1
    
    printf("\n===== ARRAY SIZE =====\n");
    
    // C doesn't store array length - you must calculate it!
    // sizeof(array) = total bytes, sizeof(array[0]) = bytes per element
    // Dividing gives number of elements
    
    int numbersSize = sizeof(numbers) / sizeof(numbers[0]);
    int scoresSize = sizeof(scores) / sizeof(scores[0]);
    // Example: sizeof(numbers) might be 20 bytes (5 ints × 4 bytes)
    //          sizeof(numbers[0]) is 4 bytes → 20 ÷ 4 = 5 elements
    
    printf("Numbers array size: %d\n", numbersSize);  // 5
    printf("Scores array size: %d\n", scoresSize);    // 5
    // Note: This only works in the same scope where array is declared!
    
    printf("\n===== MODIFYING ARRAYS =====\n");
    
    // Arrays are mutable - can change values after creation
    // Syntax: array[index] = newValue
    
    numbers[0] = 10;  // Change first element from 1 to 10
    numbers[4] = 50;  // Change last element from 5 to 50
    
    printf("Modified first: %d\n", numbers[0]);   // 10
    printf("Modified last: %d\n", numbers[4]);    // 50
    // Warning: Accessing index beyond size (e.g., numbers[5]) causes undefined behavior!
    
    printf("\n===== LOOPING THROUGH ARRAYS =====\n");
    
    // Most common pattern: for loop to access each element
    // Use array size to avoid hardcoding the limit
    
    printf("All numbers: ");
    for (int i = 0; i < numbersSize; i++) {
        printf("%d ", numbers[i]);  // Access each element by index
    }
    printf("\n");
    
    printf("All scores: ");
    for (int i = 0; i < scoresSize; i++) {
        printf("%d ", scores[i]);
    }
    printf("\n");
    // If array size changes, loop automatically adjusts (if using sizeof trick)
    
    printf("\n===== ARRAY INITIALIZATION =====\n");
    
    // Partial initialization (rest are 0)
    int partial[5] = {1, 2};
    printf("Partial array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", partial[i]);  // 1 2 0 0 0
    }
    printf("\n");
    
    // Initialize all to zero
    int zeros[5] = {0};
    printf("Zeros array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", zeros[i]);  // 0 0 0 0 0
    }
    printf("\n");
    
    printf("\n===== ARRAY BOUNDS =====\n");
    
    int small[3] = {10, 20, 30};
    printf("Valid access: small[2] = %d\n", small[2]);  // 30
    
    // Warning: C does not check array bounds!
    // small[10] = 99;  // Dangerous! May crash or corrupt memory
    // printf("%d\n", small[10]);  // Undefined behavior
    
    printf("\n===== DYNAMIC ARRAYS (malloc/realloc) =====\n");
    
    // Fixed arrays have compile-time size, but sometimes you need runtime flexibility
    // Use malloc() to allocate memory on the heap (can be any size)
    
    int capacity = 5;
    int *dynamic = (int*)malloc(capacity * sizeof(int));
    // malloc(bytes) returns void*, cast to int*
    // Allocate enough bytes for 5 ints: 5 * 4 = 20 bytes
    
    if (dynamic == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    // Use just like a regular array
    for (int i = 0; i < capacity; i++) {
        dynamic[i] = i * 10;
    }
    
    printf("Initial dynamic array: ");
    for (int i = 0; i < capacity; i++) {
        printf("%d ", dynamic[i]);  // 0 10 20 30 40
    }
    printf("\n");
    
    // Need more space? Use realloc() to resize!
    // realloc(pointer, new_size_in_bytes) copies data to new larger block
    
    int newCapacity = 10;  // Double the size
    dynamic = (int*)realloc(dynamic, newCapacity * sizeof(int));
    
    if (dynamic == NULL) {
        printf("Reallocation failed!\n");
        return 1;
    }
    
    // Old data preserved, add new data
    for (int i = capacity; i < newCapacity; i++) {
        dynamic[i] = i * 10;
    }
    
    printf("Resized dynamic array: ");
    for (int i = 0; i < newCapacity; i++) {
        printf("%d ", dynamic[i]);  // 0 10 20 30 40 50 60 70 80 90
    }
    printf("\n");
    
    // CRITICAL: Always free() dynamic memory when done!
    free(dynamic);
    // After free(), dynamic is a dangling pointer - don't use it!
    
    printf("\n===== DYNAMIC ARRAY PATTERN =====\n");
    printf("1. malloc() - allocate initial memory\n");
    printf("2. Check if NULL (allocation failed)\n");
    printf("3. Use array normally with []\n");
    printf("4. realloc() - resize when needed\n");
    printf("5. Check if NULL again\n");
    printf("6. free() - release memory when done\n");
    
    printf("\n===== BUILDING A VECTOR (Advanced) =====\n");
    
    // Let's build a proper vector-like structure with push/pop operations
    // This is how Python lists, C++ vectors, and Java ArrayLists work internally!
    
    typedef struct {
        int *data;      // Pointer to the actual array
        int size;       // Number of elements currently in use
        int capacity;   // Total allocated space
    } Vector;
    
    // Initialize vector with starting capacity
    Vector vec;
    vec.size = 0;
    vec.capacity = 4;  // Start small
    vec.data = (int*)malloc(vec.capacity * sizeof(int));
    
    printf("Initial: size=%d, capacity=%d\n", vec.size, vec.capacity);
    
    // Push operation: add element to end (like Python append or C++ push_back)
    // If full, double the capacity automatically
    for (int i = 0; i < 10; i++) {
        if (vec.size >= vec.capacity) {
            // Out of space - grow the array!
            vec.capacity *= 2;  // Double capacity
            vec.data = (int*)realloc(vec.data, vec.capacity * sizeof(int));
            printf("Resized! New capacity: %d\n", vec.capacity);
        }
        vec.data[vec.size++] = i * 10;  // Add element and increment size
    }
    
    printf("After pushing 10 elements: size=%d, capacity=%d\n", vec.size, vec.capacity);
    printf("Elements: ");
    for (int i = 0; i < vec.size; i++) {
        printf("%d ", vec.data[i]);  // 0 10 20 30 40 50 60 70 80 90
    }
    printf("\n");
    
    // Pop operation: remove and return last element
    if (vec.size > 0) {
        int popped = vec.data[--vec.size];  // Decrement size, get element
        printf("Popped: %d\n", popped);  // 90
        printf("After pop: size=%d\n", vec.size);
    }
    
    // Access by index (with bounds checking - unlike raw C arrays!)
    int index = 5;
    if (index >= 0 && index < vec.size) {
        printf("Element at index %d: %d\n", index, vec.data[index]);  // 50
    }
    
    // Clean up
    free(vec.data);
    
    printf("\n===== VECTOR PATTERN SUMMARY =====\n");
    printf("✓ Track size (used) and capacity (allocated) separately\n");
    printf("✓ Double capacity when full (amortized O(1) push)\n");
    printf("✓ Realloc copies old data automatically\n");
    printf("✓ This is exactly what C++ std::vector does!\n");
    printf("✓ You could wrap this in functions for cleaner code\n");
    
    return 0;
}

// Notes:
// - Arrays are 0-indexed (first element is at index 0)
// - Fixed arrays size must be known at compile time
// - C does NOT check array bounds - be careful!
// - Use sizeof(array)/sizeof(array[0]) to get array size
// - Fixed arrays cannot be resized after creation
// - Use malloc/realloc for dynamic arrays (runtime sizing and resizing)
// - Always free() dynamically allocated memory to prevent memory leaks
