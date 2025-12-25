#include <stdio.h>
#include <stdlib.h>

// if we only accepted int* arr, this would create a copy 
// because an array already is the address of its first element
void push_back(int** arr, int* size, int val){

    *arr = (int*)realloc(*arr, ++(*size) * sizeof(int));
    (*arr)[(*size) - 1] = val;
}

void pop_back(int** arr, int* size){
    if(*size <= 0){
        printf("Cannot pop empty array.");
        return;
    }
    *arr = (int*)realloc(*arr, --(*size) * sizeof(int));
}

void shift_front(int** arr, int* size){
    if(*size <= 0){
        printf("Cannot shift empty array.");
        return;
    }
    
    // Shift elements left to overwrite the first element
    for (int i = 1; i < *size; i++){
        (*arr)[i - 1] = (*arr)[i];
    }
    
    // Shrink the array
    *arr = (int*)realloc(*arr, --(*size) * sizeof(int));
}

void unshift_front(int** arr, int* size, int val){
    
    // Increase array
    *arr = (int*)realloc(*arr, ++(*size) * sizeof(int));
    
    // Shift elements right (backwards)
    for (int i = *size - 1; i > 0; i--){
        (*arr)[i] = (*arr)[i - 1];
    }
    
    (*arr)[0] = val;
}

void print_array(int **arr, int *size) {
    printf("[");

    for(int i = 0; i < *size; i++) {
        printf("%d", (*arr)[i]);
        if(i < *size - 1) printf(", ");
    }
    printf("]\n");
}

int main(){

    int size = 0;
    int *arr1 = (int*)malloc(size * sizeof(int));
    
    unshift_front(&arr1, &size, 1);
    push_back(&arr1, &size, 2);
    push_back(&arr1, &size, 3);
    push_back(&arr1, &size, 4);

    shift_front(&arr1, &size);
    pop_back(&arr1, &size);

    print_array(&arr1, &size);

    free(arr1);
    return 0;
}