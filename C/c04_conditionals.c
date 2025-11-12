#include <stdio.h>

int main() {
    
    printf("===== IF STATEMENT =====\n");
    
    int age = 20;
    
    if (age >= 18) {
        printf("You are an adult\n");  // This executes
    }
    
    printf("\n===== IF-ELSE STATEMENT =====\n");
    
    int score = 75;
    
    if (score >= 60) {
        printf("Pass\n");  // This executes
    } else {
        printf("Fail\n");
    }
    
    printf("\n===== IF-ELSE IF-ELSE =====\n");
    
    int grade = 85;
    
    if (grade >= 90) {
        printf("Grade: A\n");
    } else if (grade >= 80) {
        printf("Grade: B\n");  // This executes
    } else if (grade >= 70) {
        printf("Grade: C\n");
    } else if (grade >= 60) {
        printf("Grade: D\n");
    } else {
        printf("Grade: F\n");
    }
    
    printf("\n===== NESTED IF STATEMENTS =====\n");
    
    int num = 15;
    
    if (num > 0) {
        if (num % 2 == 0) {
            printf("%d is positive and even\n", num);
        } else {
            printf("%d is positive and odd\n", num);  // This executes
        }
    } else {
        printf("%d is negative or zero\n", num);
    }
    
    printf("\n===== LOGICAL OPERATORS IN CONDITIONS =====\n");
    
    int hasLicense = 1;
    int drivingAge = 18;
    
    if (age >= drivingAge && hasLicense) {
        printf("Can drive\n");  // This executes
    }
    
    int isWeekend = 0;
    int isHoliday = 0;
    
    if (isWeekend || isHoliday) {
        printf("Day off\n");
    } else {
        printf("Work day\n");  // This executes
    }
    
    printf("\n===== TERNARY OPERATOR =====\n");
    
    int a = 10, b = 20;
    int max = (a > b) ? a : b;
    printf("Max: %d\n", max);  // 20
    
    char *status = (age >= 18) ? "Adult" : "Minor";
    printf("Status: %s\n", status);  // Adult
    
    printf("\n===== SWITCH STATEMENT =====\n");
    
    int day = 3;
    
    switch (day) {
        case 1:
            printf("Monday\n");
            break;
        case 2:
            printf("Tuesday\n");
            break;
        case 3:
            printf("Wednesday\n");  // This executes
            break;
        case 4:
            printf("Thursday\n");
            break;
        case 5:
            printf("Friday\n");
            break;
        case 6:
        case 7:
            printf("Weekend\n");
            break;
        default:
            printf("Invalid day\n");
    }
    
    printf("\n===== SWITCH WITHOUT BREAK (FALL-THROUGH) =====\n");
    
    char grade_letter = 'B';
    
    switch (grade_letter) {
        case 'A':
            printf("Excellent\n");
            break;
        case 'B':
        case 'C':
            printf("Good\n");  // This executes
            break;
        case 'D':
            printf("Pass\n");
            break;
        case 'F':
            printf("Fail\n");
            break;
        default:
            printf("Invalid grade\n");
    }
    
    printf("\n===== TRUTHY AND FALSY VALUES =====\n");
    
    // In C: 0 is false, everything else is true
    if (0) {
        printf("This won't print\n");
    }
    
    if (1) {
        printf("1 is true\n");  // This executes
    }
    
    if (-5) {
        printf("-5 is true\n");  // This executes
    }
    
    if (100) {
        printf("100 is true\n");  // This executes
    }
    
    return 0;
}

// Notes:
// - Always use braces {} even for single statements (good practice)
// - In C, 0 is false, any non-zero value is true
// - Switch only works with int and char types (not strings or floats)
// - Always use break in switch cases (unless you want fall-through)
// - default case in switch is optional but recommended
// - Ternary operator: condition ? true_value : false_value
// - Logical operators: && (AND), || (OR), ! (NOT)
