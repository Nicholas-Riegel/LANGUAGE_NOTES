#include <stdio.h>

int main() {
    
    printf("===== FOR LOOP =====\n");
    
    for (int i = 0; i < 5; i++) {
        printf("i = %d\n", i);  // 0, 1, 2, 3, 4
    }
    
    printf("\n===== FOR LOOP (REVERSE) =====\n");
    
    for (int i = 5; i > 0; i--) {
        printf("i = %d\n", i);  // 5, 4, 3, 2, 1
    }
    
    printf("\n===== FOR LOOP (STEP BY 2) =====\n");
    
    for (int i = 0; i <= 10; i += 2) {
        printf("%d ", i);  // 0 2 4 6 8 10
    }
    printf("\n");
    
    printf("\n===== WHILE LOOP =====\n");
    
    int count = 0;
    while (count < 5) {
        printf("count = %d\n", count);  // 0, 1, 2, 3, 4
        count++;
    }
    
    printf("\n===== DO-WHILE LOOP =====\n");
    
    int num = 1;
    do {
        printf("num = %d\n", num);  // 1, 2, 3, 4, 5
        num++;
    } while (num <= 5);
    
    printf("\n===== DO-WHILE (EXECUTES AT LEAST ONCE) =====\n");
    
    int x = 10;
    do {
        printf("This prints even though x >= 10\n");  // Executes once
        x++;
    } while (x < 10);
    
    printf("\n===== BREAK STATEMENT =====\n");
    
    for (int i = 0; i < 10; i++) {
        if (i == 5) {
            break;  // Exit loop when i equals 5
        }
        printf("%d ", i);  // 0 1 2 3 4
    }
    printf("\n");
    
    printf("\n===== CONTINUE STATEMENT =====\n");
    
    for (int i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            continue;  // Skip even numbers
        }
        printf("%d ", i);  // 1 3 5 7 9 (odd numbers only)
    }
    printf("\n");
    
    printf("\n===== NESTED LOOPS =====\n");
    
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("(%d,%d) ", i, j);
        }
        printf("\n");
    }
    // Output:
    // (1,1) (1,2) (1,3)
    // (2,1) (2,2) (2,3)
    // (3,1) (3,2) (3,3)
    
    printf("\n===== LOOPING THROUGH ARRAYS =====\n");
    
    int numbers[] = {10, 20, 30, 40, 50};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);  // 10 20 30 40 50
    }
    printf("\n");
    
    printf("\n===== MULTIPLICATION TABLE =====\n");
    
    int n = 5;
    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\n", n, i, n * i);
    }
    
    printf("\n===== INFINITE LOOP (COMMENTED OUT) =====\n");
    
    // while (1) {
    //     printf("This runs forever!\n");
    //     // Use break to exit, or Ctrl+C to stop program
    // }
    
    // for (;;) {
    //     printf("This also runs forever!\n");
    // }
    
    printf("\n===== LOOP WITH MULTIPLE CONDITIONS =====\n");
    
    int i = 0;
    int j = 10;
    while (i < 5 && j > 5) {
        printf("i = %d, j = %d\n", i, j);
        i++;
        j--;
    }
    
    return 0;
}

// Notes:
// - for loop: best when you know the number of iterations
// - while loop: best when condition-based iteration
// - do-while: guarantees at least one execution
// - break: exits the loop immediately
// - continue: skips to next iteration
// - Infinite loops: while(1) or for(;;)
// - Always ensure loop has exit condition to avoid infinite loops
// - Nested loops multiply iterations (outer * inner)
