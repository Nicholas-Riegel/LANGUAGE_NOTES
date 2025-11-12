#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    
    printf("===== DYNAMIC MEMORY ALLOCATION =====\n");
    
    // malloc - allocate memory (uninitialized)
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }
    
    *ptr = 42;
    printf("Value: %d\n", *ptr);  // 42
    
    free(ptr);  // Always free allocated memory!
    
    printf("\n===== ALLOCATING ARRAYS =====\n");
    
    int n = 5;
    int *numbers = (int*)malloc(n * sizeof(int));
    
    if (numbers == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }
    
    // Initialize and use array
    for (int i = 0; i < n; i++) {
        numbers[i] = i * 10;
    }
    
    printf("Dynamic array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);  // 0 10 20 30 40
    }
    printf("\n");
    
    free(numbers);  // Free when done
    
    printf("\n===== CALLOC - INITIALIZED TO ZERO =====\n");
    
    int *zeros = (int*)calloc(5, sizeof(int));
    
    if (zeros == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }
    
    printf("Calloc array (initialized to 0): ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", zeros[i]);  // 0 0 0 0 0
    }
    printf("\n");
    
    free(zeros);
    
    printf("\n===== REALLOC - RESIZE MEMORY =====\n");
    
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
    arr[3] = 4;
    arr[4] = 5;
    
    printf("Resized array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);  // 1 2 3 4 5
    }
    printf("\n");
    
    free(arr);
    
    printf("\n===== DYNAMIC STRING ALLOCATION =====\n");
    
    char *str = (char*)malloc(50 * sizeof(char));
    
    if (str == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }
    
    strcpy(str, "Hello, Dynamic Memory!");
    printf("String: %s\n", str);
    
    free(str);
    
    printf("\n===== MEMORY LEAK EXAMPLE (DON'T DO THIS) =====\n");
    
    // Bad: allocating without freeing
    // int *leak = (int*)malloc(sizeof(int));
    // *leak = 100;
    // No free(leak) - MEMORY LEAK!
    
    printf("Avoided memory leak by always using free()\n");
    
    printf("\n===== DANGLING POINTER (AVOID) =====\n");
    
    int *temp = (int*)malloc(sizeof(int));
    *temp = 10;
    free(temp);
    
    // temp is now a dangling pointer!
    // printf("%d\n", *temp);  // DANGER! Undefined behavior
    
    temp = NULL;  // Good practice: set to NULL after free
    
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
