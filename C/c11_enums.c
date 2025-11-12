#include <stdio.h>

// ===== BASIC ENUM =====

enum Day {
    MONDAY,     // 0
    TUESDAY,    // 1
    WEDNESDAY,  // 2
    THURSDAY,   // 3
    FRIDAY,     // 4
    SATURDAY,   // 5
    SUNDAY      // 6
};

// ===== ENUM WITH CUSTOM VALUES =====

enum Status {
    ERROR = -1,
    SUCCESS = 0,
    PENDING = 1,
    COMPLETE = 2
};

// ===== ENUM WITH TYPEDEF =====

typedef enum {
    RED,
    GREEN,
    BLUE,
    YELLOW
} Color;

// ===== ENUM FOR MENU OPTIONS =====

typedef enum {
    OPTION_EXIT = 0,
    OPTION_NEW = 1,
    OPTION_OPEN = 2,
    OPTION_SAVE = 3,
    OPTION_QUIT = 9
} MenuOption;

int main() {
    
    printf("===== USING ENUMS =====\n");
    
    enum Day today = WEDNESDAY;
    printf("Today is day number: %d\n", today);  // 2
    
    if (today == WEDNESDAY) {
        printf("It's Wednesday!\n");
    }
    
    printf("\n===== ENUM VALUES =====\n");
    
    printf("MONDAY = %d\n", MONDAY);        // 0
    printf("TUESDAY = %d\n", TUESDAY);      // 1
    printf("FRIDAY = %d\n", FRIDAY);        // 4
    printf("SUNDAY = %d\n", SUNDAY);        // 6
    
    printf("\n===== CUSTOM ENUM VALUES =====\n");
    
    enum Status taskStatus = SUCCESS;
    printf("Status: %d\n", taskStatus);     // 0
    
    printf("ERROR = %d\n", ERROR);          // -1
    printf("SUCCESS = %d\n", SUCCESS);      // 0
    printf("PENDING = %d\n", PENDING);      // 1
    printf("COMPLETE = %d\n", COMPLETE);    // 2
    
    printf("\n===== USING TYPEDEF ENUMS =====\n");
    
    Color favoriteColor = BLUE;
    printf("Favorite color: %d\n", favoriteColor);  // 2
    
    if (favoriteColor == BLUE) {
        printf("You like blue!\n");
    }
    
    printf("\n===== SWITCH WITH ENUMS =====\n");
    
    enum Day day = FRIDAY;
    
    switch (day) {
        case MONDAY:
            printf("Start of work week\n");
            break;
        case TUESDAY:
        case WEDNESDAY:
        case THURSDAY:
            printf("Middle of week\n");
            break;
        case FRIDAY:
            printf("TGIF!\n");  // This prints
            break;
        case SATURDAY:
        case SUNDAY:
            printf("Weekend!\n");
            break;
    }
    
    printf("\n===== ENUM FOR READABLE CODE =====\n");
    
    // Instead of magic numbers
    // int status = 1;  // What does 1 mean?
    
    // Use enums for clarity
    enum Status operation = PENDING;
    if (operation == PENDING) {
        printf("Operation is pending\n");
    }
    
    printf("\n===== ENUM AS FUNCTION RETURN =====\n");
    
    enum Status checkFile(void) {
        // Simulate file check
        return SUCCESS;
    }
    
    enum Status result = checkFile();
    if (result == SUCCESS) {
        printf("File check succeeded\n");
    } else {
        printf("File check failed\n");
    }
    
    printf("\n===== ENUM FOR FLAGS/STATES =====\n");
    
    typedef enum {
        STATE_IDLE,
        STATE_RUNNING,
        STATE_PAUSED,
        STATE_STOPPED
    } ProgramState;
    
    ProgramState state = STATE_RUNNING;
    
    switch (state) {
        case STATE_IDLE:
            printf("Program is idle\n");
            break;
        case STATE_RUNNING:
            printf("Program is running\n");  // This prints
            break;
        case STATE_PAUSED:
            printf("Program is paused\n");
            break;
        case STATE_STOPPED:
            printf("Program is stopped\n");
            break;
    }
    
    printf("\n===== LOOPING THROUGH ENUM VALUES =====\n");
    
    printf("Days of the week:\n");
    for (enum Day d = MONDAY; d <= SUNDAY; d++) {
        printf("Day %d\n", d);
    }
    
    printf("\n===== ENUM WITH BITMASKS (ADVANCED) =====\n");
    
    typedef enum {
        PERMISSION_READ = 1,    // 001
        PERMISSION_WRITE = 2,   // 010
        PERMISSION_EXECUTE = 4  // 100
    } Permission;
    
    int userPerms = PERMISSION_READ | PERMISSION_WRITE;  // 011
    
    if (userPerms & PERMISSION_READ) {
        printf("User can read\n");
    }
    if (userPerms & PERMISSION_WRITE) {
        printf("User can write\n");
    }
    if (userPerms & PERMISSION_EXECUTE) {
        printf("User can execute\n");
    } else {
        printf("User cannot execute\n");
    }
    
    return 0;
}

// Notes:
// - Enums define named integer constants
// - Default values start at 0 and increment by 1
// - You can assign custom values
// - Use typedef to avoid writing 'enum' keyword
// - Enums make code more readable than magic numbers
// - Great for switch statements and state machines
// - Enum values are just integers (can be compared, printed, etc.)
// - Can use enums for bit flags with powers of 2
// - Enums help prevent invalid values (compile-time checking)
