#include <stdio.h>
#include <stdlib.h>

void push_back(int **numPP, int *size, int val){
    *numPP = (int*)realloc(*numPP, ++(*size) * sizeof(int));
    (*numPP)[*size - 1] = val;
}

void pop_back(int **numPP, int *size){
    if(*size <= 0){
        printf("Empty array.");
        return;
    }
    *numPP = (int*)realloc(*numPP, --(*size) * sizeof(int));
}

void print_array(int **numPP, int *size){
    printf("[");
    for (int i = 0; i < *size; i++){
        printf("%d", (*numPP)[i]);
        if (i < *size - 1) printf(", ");
    }
    printf("]\n");
}

int main(){

    int size = 0;
    int *numbersP = (int*)malloc(size * sizeof(int));

    push_back(&numbersP, &size, 10);
    push_back(&numbersP, &size, 20);
    push_back(&numbersP, &size, 30);
    pop_back(&numbersP, &size);

    print_array(&numbersP, &size);
    free(numbersP);
    return 0;
}