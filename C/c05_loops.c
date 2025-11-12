#include <stdio.h>

// LOOPS IN C
// ==========
// Repeat code multiple times
// Three types: for, while, do-while
// Each has different use cases depending on when you know iteration count

int main() {
    
    printf("===== FOR LOOP =====\n");
    
    // Best when you know how many times to loop
    // Syntax: for (initialization; condition; increment) { code }
    // All three parts are in one line - convenient and readable
    
    for (int i = 0; i < 5; i++) {
        printf("i = %d\n", i);  // 0, 1, 2, 3, 4
    }
    // Process: Set i=0, check i<5 (true), run code, increment i, repeat
    // Stops when condition becomes false (i<5 fails when i=5)
    
    printf("\n===== FOR LOOP (REVERSE) =====\n");
    
    // Can count backwards by starting high and decrementing
    // Useful for: arrays (accessing from end), countdowns
    
    for (int i = 5; i > 0; i--) {
        printf("i = %d\n", i);  // 5, 4, 3, 2, 1
    }
    // Stops when i > 0 becomes false (when i reaches 0)
    
    printf("\n===== FOR LOOP (STEP BY 2) =====\n");
    
    // Can increment by any amount, not just 1
    // i += 2 means "add 2 to i each time"
    
    for (int i = 0; i <= 10; i += 2) {
        printf("%d ", i);  // 0 2 4 6 8 10
    }
    printf("\n");
    // Can use any increment: i += 3, i += 10, i *= 2, etc.
    
    printf("\n===== WHILE LOOP =====\n");
    
    // Best when you DON'T know how many times to loop
    // Condition is checked BEFORE each iteration
    // If condition starts false, loop never runs
    
    int count = 0;
    while (count < 5) {
        printf("count = %d\n", count);  // 0, 1, 2, 3, 4
        count++;  // Important! Must modify count or loop runs forever
    }
    // Common use: Reading until end of file, waiting for user input
    
    printf("\n===== DO-WHILE LOOP =====\n");
    
    // Similar to while, but checks condition AFTER running code
    // Guarantees the loop body runs at least once
    // Use when you need to execute code before checking condition
    
    int num = 1;
    do {
        printf("num = %d\n", num);  // 1, 2, 3, 4, 5
        num++;
    } while (num <= 5);  // Semicolon required here!
    // Common use: Menu systems (show menu at least once)
    
    printf("\n===== DO-WHILE (EXECUTES AT LEAST ONCE) =====\n");
    
    // Key difference from while: runs once even if condition is false
    // Here x=10, so x < 10 is false, but code still executes
    
    int x = 10;
    do {
        printf("This prints even though x >= 10\n");  // Executes once!
        x++;
    } while (x < 10);  // Condition checked AFTER first run
    // Compare to while: would check x < 10 first and never run
    
    printf("\n===== BREAK STATEMENT =====\n");
    
    // Immediately exits the loop, no matter what the condition says
    // Useful for: searching (stop when found), error conditions
    
    for (int i = 0; i < 10; i++) {
        if (i == 5) {
            break;  // Exit loop completely when i equals 5
        }
        printf("%d ", i);  // 0 1 2 3 4 (never reaches 5 or beyond)
    }
    printf("\n");
    // After break, code continues after the loop
    
    printf("\n===== CONTINUE STATEMENT =====\n");
    
    // Skips the rest of THIS iteration, goes to next one
    // Different from break: continue stays in loop, break exits it
    
    for (int i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            continue;  // Skip even numbers, jump to next iteration
        }
        printf("%d ", i);  // 1 3 5 7 9 (odd numbers only)
    }
    printf("\n");
    // When i is even, continue skips the printf and goes to i++
    
    printf("\n===== NESTED LOOPS =====\n");
    
    // Loop inside another loop
    // Outer loop runs once, inner loop runs completely, then outer continues
    // Useful for: 2D arrays, tables, combinations
    
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("(%d,%d) ", i, j);
        }
        printf("\n");
    }
    // Output:
    // (1,1) (1,2) (1,3)  ← i=1, j loops 1,2,3
    // (2,1) (2,2) (2,3)  ← i=2, j loops 1,2,3 again
    // (3,1) (3,2) (3,3)  ← i=3, j loops 1,2,3 again
    // Total iterations: 3 × 3 = 9
    
    printf("\n===== LOOPING THROUGH ARRAYS =====\n");
    
    // Common pattern: loop through all array elements
    // Use sizeof trick to get array length without hardcoding
    
    int numbers[] = {10, 20, 30, 40, 50};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    // sizeof(numbers) = total bytes, sizeof(numbers[0]) = bytes per element
    // Example: 20 bytes total ÷ 4 bytes per int = 5 elements
    
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);  // 10 20 30 40 50
    }
    printf("\n");
    // This pattern works for any array size, no need to update the loop!
    
    printf("\n===== MULTIPLICATION TABLE =====\n");
    
    // Practical example: Generate multiplication table
    // Shows how loops make repetitive tasks easy
    
    int n = 5;
    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\n", n, i, n * i);
    }
    // Generates 5×1=5, 5×2=10, ... 5×10=50
    
    printf("\n===== INFINITE LOOP (COMMENTED OUT) =====\n");
    
    // Infinite loops run forever until explicitly stopped
    // while(1): condition always true
    // for(;;): empty condition = always true
    // Use Ctrl+C to stop, or include break condition inside
    
    // while (1) {
    //     printf("This runs forever!\n");
    //     // Use break to exit, or Ctrl+C to stop program
    // }
    
    // for (;;) {
    //     printf("This also runs forever!\n");
    //     // Same as while(1), just different syntax
    // }
    // Useful for: servers, game loops, event handlers
    
    printf("\n===== LOOP WITH MULTIPLE CONDITIONS =====\n");
    
    // Can combine multiple conditions with && or ||
    // Loop continues while ALL conditions (&&) are true
    
    int i = 0;
    int j = 10;
    while (i < 5 && j > 5) {  // Both must be true to continue
        printf("i = %d, j = %d\n", i, j);
        i++;
        j--;
    }
    // Stops when either i >= 5 OR j <= 5 (when && fails)
    
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
