#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;      // Current number of elements
    int capacity;  // Total allocated space
} DynamicArray;

// Initialize with initial capacity
DynamicArray* array_create(int initial_capacity) {
    DynamicArray *arrP = malloc(sizeof(DynamicArray));
    arrP->data = malloc(initial_capacity * sizeof(int));
    arrP->size = 0;
    arrP->capacity = initial_capacity;
    return arrP;
}

// O(1) amortized push - only reallocates when necessary
void array_push(DynamicArray *arr, int value) {
    if (arr->size >= arr->capacity) {
        // Double capacity when full (amortized O(1))
        arr->capacity *= 2;
        arr->data = realloc(arr->data, arr->capacity * sizeof(int));
    }
    arr->data[arr->size++] = value;
}

// O(1) pop - no reallocation needed
int array_pop(DynamicArray *arr) {
    if (arr->size <= 0) {
        printf("Array is empty!\n");
        return -1; // Error value
    }
    return arr->data[--arr->size]; // Return removed element
}

void array_print(DynamicArray *arr) {
    printf("[");
    for (int i = 0; i < arr->size; i++) {
        printf("%d", arr->data[i]);
        if (i < arr->size - 1) printf(", ");
    }
    printf("] (size: %d, capacity: %d)\n", arr->size, arr->capacity);
}

void array_free(DynamicArray *arr) {
    free(arr->data);
    free(arr);
}

int main() {
    DynamicArray *arr = array_create(2); // Start small to demonstrate growth
    
    printf("Initial: ");
    array_print(arr);
    
    // Push operations - watch capacity grow
    for (int i = 1; i <= 8; i++) {
        array_push(arr, i * 10);
        printf("After push %d: ", i);
        array_print(arr);
    }
    
    // Pop operations - capacity stays the same
    for (int i = 0; i < 3; i++) {
        int popped = array_pop(arr);
        printf("Popped %d: ", popped);
        array_print(arr);
    }
    
    array_free(arr);
    return 0;
}