#include <stdio.h>

int main() {
    
    printf("===== ARITHMETIC OPERATORS =====\n");
    
    int a = 10, b = 3;
    
    printf("a + b = %d\n", a + b);   // 13
    printf("a - b = %d\n", a - b);   // 7
    printf("a * b = %d\n", a * b);   // 30
    printf("a / b = %d\n", a / b);   // 3 (integer division)
    printf("a %% b = %d\n", a % b);  // 1 (modulus/remainder)
    
    printf("Float division: %.2f\n", (float)a / b);  // 3.33
    
    printf("\n===== INCREMENT/DECREMENT =====\n");
    
    int x = 5;
    printf("x = %d\n", x);      // 5
    printf("x++ = %d\n", x++);  // 5 (post-increment: use then increment)
    printf("x = %d\n", x);      // 6
    printf("++x = %d\n", ++x);  // 7 (pre-increment: increment then use)
    printf("x-- = %d\n", x--);  // 7 (post-decrement)
    printf("x = %d\n", x);      // 6
    
    printf("\n===== ASSIGNMENT OPERATORS =====\n");
    
    int num = 10;
    printf("num = %d\n", num);   // 10
    
    num += 5;  // num = num + 5
    printf("num += 5: %d\n", num);   // 15
    
    num -= 3;  // num = num - 3
    printf("num -= 3: %d\n", num);   // 12
    
    num *= 2;  // num = num * 2
    printf("num *= 2: %d\n", num);   // 24
    
    num /= 4;  // num = num / 4
    printf("num /= 4: %d\n", num);   // 6
    
    num %= 4;  // num = num % 4
    printf("num %%= 4: %d\n", num);  // 2
    
    printf("\n===== COMPARISON OPERATORS =====\n");
    
    int p = 5, q = 10;
    
    printf("p == q: %d\n", p == q);  // 0 (false)
    printf("p != q: %d\n", p != q);  // 1 (true)
    printf("p > q: %d\n", p > q);    // 0 (false)
    printf("p < q: %d\n", p < q);    // 1 (true)
    printf("p >= q: %d\n", p >= q);  // 0 (false)
    printf("p <= q: %d\n", p <= q);  // 1 (true)
    
    printf("\n===== LOGICAL OPERATORS =====\n");
    
    int age = 25;
    int hasLicense = 1;  // true
    
    // AND (&&) - both must be true
    printf("age >= 18 && hasLicense: %d\n", age >= 18 && hasLicense);  // 1 (true)
    
    // OR (||) - at least one must be true
    printf("age < 18 || hasLicense: %d\n", age < 18 || hasLicense);  // 1 (true)
    
    // NOT (!) - inverts the value
    printf("!hasLicense: %d\n", !hasLicense);  // 0 (false)
    
    printf("\n===== BITWISE OPERATORS =====\n");
    
    int m = 5;   // Binary: 0101
    int n = 3;   // Binary: 0011
    
    printf("m & n = %d\n", m & n);   // 1 (AND: 0001)
    printf("m | n = %d\n", m | n);   // 7 (OR: 0111)
    printf("m ^ n = %d\n", m ^ n);   // 6 (XOR: 0110)
    printf("~m = %d\n", ~m);         // -6 (NOT: inverts all bits)
    printf("m << 1 = %d\n", m << 1); // 10 (left shift: multiply by 2)
    printf("m >> 1 = %d\n", m >> 1); // 2 (right shift: divide by 2)
    
    printf("\n===== TERNARY OPERATOR =====\n");
    
    int score = 85;
    char *result = (score >= 60) ? "Pass" : "Fail";
    printf("Result: %s\n", result);  // Pass
    
    int max = (a > b) ? a : b;
    printf("Max of %d and %d: %d\n", a, b, max);  // 10
    
    printf("\n===== SIZEOF OPERATOR =====\n");
    
    printf("sizeof(int): %lu bytes\n", sizeof(int));
    printf("sizeof(char): %lu bytes\n", sizeof(char));
    printf("sizeof(float): %lu bytes\n", sizeof(float));
    printf("sizeof(double): %lu bytes\n", sizeof(double));
    
    int arr[10];
    printf("sizeof(arr): %lu bytes\n", sizeof(arr));  // 40 (10 * 4)
    
    return 0;
}

// Notes:
// - In C, 0 is false and any non-zero value is true
// - Integer division truncates (10/3 = 3, not 3.33)
// - Use (float) casting for float division
// - Modulus (%) only works with integers
// - && and || use short-circuit evaluation
// - Bitwise operators work on binary representation
// - Ternary operator: condition ? value_if_true : value_if_false
