#include <stdio.h>

int main(){

    int numbers[] = {10, 20, 30, 40};

    int *numP = numbers;

    int **numP2 = &numP;

    **numP2 = 11;

    printf("This is the new first element: %d \n",  *numbers);

    return 0;
}