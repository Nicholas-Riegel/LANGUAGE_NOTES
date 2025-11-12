#include <stdio.h>

int main() {
    
    printf("===== CREATING ARRAYS =====\n");
    
    // Create arrays
    int numbers[] = {1, 2, 3, 4, 5};
    int scores[5] = {90, 85, 95, 88, 92};
    char letters[] = {'a', 'b', 'c', 'd'};
    
    printf("First number: %d\n", numbers[0]);    // 1
    printf("Third score: %d\n", scores[2]);      // 95
    printf("Second letter: %c\n", letters[1]);   // b
    
    printf("\n===== ARRAY SIZE =====\n");
    
    // Calculate array size
    int numbersSize = sizeof(numbers) / sizeof(numbers[0]);
    int scoresSize = sizeof(scores) / sizeof(scores[0]);
    
    printf("Numbers array size: %d\n", numbersSize);  // 5
    printf("Scores array size: %d\n", scoresSize);    // 5
    
    printf("\n===== MODIFYING ARRAYS =====\n");
    
    numbers[0] = 10;
    numbers[4] = 50;
    
    printf("Modified first: %d\n", numbers[0]);   // 10
    printf("Modified last: %d\n", numbers[4]);    // 50
    
    printf("\n===== LOOPING THROUGH ARRAYS =====\n");
    
    printf("All numbers: ");
    for (int i = 0; i < numbersSize; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");
    
    printf("All scores: ");
    for (int i = 0; i < scoresSize; i++) {
        printf("%d ", scores[i]);
    }
    printf("\n");
    
    printf("\n===== MULTIDIMENSIONAL ARRAYS =====\n");
    
    // 2D array (rows x columns)
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    
    printf("Element [0][0]: %d\n", matrix[0][0]);  // 1
    printf("Element [1][2]: %d\n", matrix[1][2]);  // 6
    
    printf("Full matrix:\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
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
