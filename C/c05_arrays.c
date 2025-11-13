#include <stdio.h>

// ARRAYS IN C
// ===========
// Collections of elements of the SAME type
// Fixed size (cannot grow or shrink after creation)
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
    
    printf("\n===== MULTIDIMENSIONAL ARRAYS =====\n");
    
    // Arrays of arrays - think rows and columns
    // Syntax: type name[rows][columns]
    // Useful for: grids, matrices, tables
    
    int matrix[2][3] = {
        {1, 2, 3},  // First row
        {4, 5, 6}   // Second row
    };
    // 2 rows, 3 columns = 6 total elements
    
    printf("Element [0][0]: %d\n", matrix[0][0]);  // 1 (first row, first column)
    printf("Element [1][2]: %d\n", matrix[1][2]);  // 6 (second row, third column)
    // Access: [row][column], both start at 0
    
    printf("Full matrix:\n");
    for (int i = 0; i < 2; i++) {        // Loop through rows
        for (int j = 0; j < 3; j++) {    // Loop through columns
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }
    
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
    
    return 0;
}

// Notes:
// - Arrays are 0-indexed (first element is at index 0)
// - Array size must be known at compile time (or use dynamic allocation)
// - C does NOT check array bounds - be careful!
// - Use sizeof(array)/sizeof(array[0]) to get array size
// - Arrays cannot be resized after creation
// - Multidimensional arrays stored in row-major order
