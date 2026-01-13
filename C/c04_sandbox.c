#include <stdio.h>

int main(){

    int numbers[] = {10, 20, 30, 40};

    // numbers points to the address of its first element
    // but it is not actually a pointer
    int *numP = numbers;

    // have to have an explicit pointer to use double pointer
    int **numP2 = &numP;

    **numP2 = 11;

    printf("This is the new first element: %d \n",  *numbers);

    return 0;
}