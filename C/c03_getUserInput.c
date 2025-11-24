#include <stdio.h>
#include <string.h>


int main() {
    char fullname[100];
    printf("Enter your full name: ");
    // Clear input buffer from previous scanf
    // while (getchar() != '\n');  // Consume leftover newline
    fgets(fullname, sizeof(fullname), stdin);
    // fgets(destination, max_size, input_stream)
    // Reads up to 99 chars OR until newline (whichever comes first)
    // Includes the newline in the string!
    
    // Remove trailing newline that fgets includes
    fullname[strcspn(fullname, "\n")] = '\0';  // Find '\n' and replace with '\0'
    printf("Full name: %s\n", fullname);

    return 0;
}