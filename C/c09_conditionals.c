#include <stdio.h>

// CONDITIONALS IN C
// ==================
// Control flow based on conditions
// C uses 0 for false and any non-zero value (usually 1) for true
// No built-in boolean type - must use int (or include stdbool.h for bool)

int main() {
    
    printf("===== IF STATEMENT =====\n");
    
    // Executes code only if condition is true
    // Syntax: if (condition) { code }
    
    int age = 20;
    
    if (age >= 18) {
        printf("You are an adult\n");  // This executes
    }
    // If condition is false, the block is skipped entirely
    
    printf("\n===== IF-ELSE STATEMENT =====\n");
    
    // Provides an alternative when condition is false
    // Either the if block OR the else block executes (never both)
    
    int score = 75;
    
    if (score >= 60) {
        printf("Pass\n");  // This executes (75 >= 60 is true)
    } else {
        printf("Fail\n");  // Would execute if score < 60
    }
    // Exactly one of the two blocks will always run
    
    printf("\n===== IF-ELSE IF-ELSE =====\n");
    
    // Check multiple conditions in order
    // Stops at the FIRST true condition (order matters!)
    // else at the end is optional (catches all other cases)
    
    int grade = 85;
    
    if (grade >= 90) {
        printf("Grade: A\n");
    } else if (grade >= 80) {
        printf("Grade: B\n");  // This executes (85 >= 80 is true)
    } else if (grade >= 70) {
        printf("Grade: C\n");  // Skipped! Already found a match
    } else if (grade >= 60) {
        printf("Grade: D\n");
    } else {
        printf("Grade: F\n");  // Default case if nothing else matches
    }
    // Important: Checks happen top to bottom, stops at first true condition
    
    printf("\n===== NESTED IF STATEMENTS =====\n");
    
    // If statements inside other if statements
    // Allows checking multiple conditions in sequence
    // Inner if only runs if outer if is true
    
    int num = 15;
    
    if (num > 0) {
        // Only check even/odd if number is positive
        if (num % 2 == 0) {
            printf("%d is positive and even\n", num);
        } else {
            printf("%d is positive and odd\n", num);  // This executes
        }
    } else {
        printf("%d is negative or zero\n", num);
    }
    // Alternative: Could use && to combine conditions without nesting
    
    printf("\n===== LOGICAL OPERATORS IN CONDITIONS =====\n");
    
    // Combine multiple conditions using logical operators
    // && (AND) = both must be true
    // || (OR) = at least one must be true
    // More readable than deep nesting for simple combinations
    
    int hasLicense = 1;  // 1 = true in C
    int drivingAge = 18;
    
    if (age >= drivingAge && hasLicense) {
        printf("Can drive\n");  // This executes (both conditions true)
        // Same as: if (age >= drivingAge) { if (hasLicense) { ... } }
    }
    
    int isWeekend = 0;  // 0 = false in C
    int isHoliday = 0;
    
    if (isWeekend || isHoliday) {
        printf("Day off\n");  // Would execute if EITHER is true
    } else {
        printf("Work day\n");  // This executes (both are false)
    }
    // || only needs ONE condition to be true to execute the if block
    
    printf("\n===== TERNARY OPERATOR =====\n");
    
    // Shorthand for simple if-else: condition ? value_if_true : value_if_false
    // Great for simple assignments, makes code more concise
    
    int a = 10, b = 20;
    int max = (a > b) ? a : b;
    printf("Max: %d\n", max);  // 20
    // Same as: if (a > b) { max = a; } else { max = b; }
    
    char *status = (age >= 18) ? "Adult" : "Minor";
    printf("Status: %s\n", status);  // Adult
    // Ternary operator returns a value, perfect for assignments
    
    printf("\n===== SWITCH STATEMENT =====\n");
    
    // Check one variable against multiple exact values
    // Cleaner than many if-else for checking specific values
    // Only works with integers and characters (no strings or floats!)
    
    int day = 3;
    
    switch (day) {
        case 1:
            printf("Monday\n");
            break;  // Exit the switch - important!
        case 2:
            printf("Tuesday\n");
            break;
        case 3:
            printf("Wednesday\n");  // This executes (day == 3)
            break;  // Without break, would continue to next case!
        case 4:
            printf("Thursday\n");
            break;
        case 5:
            printf("Friday\n");
            break;
        case 6:
        case 7:
            // No break between 6 and 7 = intentional fall-through
            printf("Weekend\n");  // Executes for both 6 and 7
            break;
        default:
            printf("Invalid day\n");  // Catches all other values
    }
    // Tip: Always use break unless you want fall-through behavior!
    
    printf("\n===== SWITCH WITHOUT BREAK (FALL-THROUGH) =====\n");
    
    // Intentionally omitting break causes "fall-through"
    // Execution continues through subsequent cases until a break is found
    // Useful when multiple cases should do the same thing
    
    char grade_letter = 'B';
    
    switch (grade_letter) {
        case 'A':
            printf("Excellent\n");
            break;
        case 'B':  // No break here...
        case 'C':  // ...so both B and C execute "Good"
            printf("Good\n");  // This executes for both B and C
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
    
    // C doesn't have a boolean type (unless you #include <stdbool.h>)
    // Instead: 0 is false, ANYTHING else is true (including negatives!)
    // This is why comparison operators return 1 for true, 0 for false
    
    if (0) {
        printf("This won't print\n");  // 0 is false, block skipped
    }
    
    if (1) {
        printf("1 is true\n");  // This executes (1 is non-zero)
    }
    
    if (-5) {
        printf("-5 is true\n");  // This executes (negative is still non-zero!)
    }
    
    if (100) {
        printf("100 is true\n");  // This executes (any non-zero is true)
    }
    
    // Common pattern: Check if a variable has been set
    int count = 5;
    if (count) {  // Same as: if (count != 0)
        printf("Count has a value\n");
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
