#include <stdio.h>
#include <string.h>

// STRINGS IN C
// ============
// C has NO built-in string type!
// Strings are character arrays ending with '\0' (null terminator)
// The '\0' is invisible but CRITICAL - tells C where string ends
// Must include <string.h> for string functions

int main() {
    
    printf("===== CREATING STRINGS =====\n");
    
    // Strings are char arrays with '\0' at the end
    char str1[] = "Hello";       // Compiler adds '\0' automatically: ['H','e','l','l','o','\0']
    char str2[20] = "World";     // Extra space allows string manipulation/growth
    char str3[] = {'H', 'i', '\0'};  // Manual way - you MUST add '\0'!
    
    printf("String 1: %s\n", str1);  // Hello
    printf("String 2: %s\n", str2);  // World
    printf("String 3: %s\n", str3);  // Hi
    // Without '\0', printf wouldn't know where the string ends!
    
    printf("\n===== HOW STRINGS WORK IN C =====\n");
    
    // A string is just a character array with special ending marker
    // "Hello" is actually stored as: ['H', 'e', 'l', 'l', 'o', '\0']
    // The '\0' (ASCII value 0) marks the end
    
    char name[] = "John";
    printf("String: %s\n", name);
    printf("As characters: ");
    for (int i = 0; name[i] != '\0'; i++) {  // Loop until we hit '\0'
        printf("'%c' ", name[i]);  // 'J' 'o' 'h' 'n'
    }
    printf("'\\0'\n");
    
    // The '\0' tells C where the string ends
    printf("Size in memory: %lu bytes (includes \\0)\n", sizeof(name));  // 5 bytes
    // "John" = 4 letters + 1 '\0' = 5 bytes total
    
    printf("\n===== STRING LENGTH =====\n");
    
    // strlen() from <string.h> counts characters until '\0'
    // sizeof() returns total bytes including '\0'
    // They give different results!
    
    printf("strlen(str1): %lu\n", strlen(str1));  // 5 (counts: H-e-l-l-o, stops at '\0')
    printf("sizeof(str1): %lu\n", sizeof(str1));  // 6 (includes: H-e-l-l-o-'\0')
    // Use strlen() for string operations, sizeof() for memory size
    
    printf("\n===== STRING COPY =====\n");
    
    // CANNOT use = to copy strings in C! (only copies the pointer address)
    // Must use strcpy() from <string.h>
    
    char dest[50];
    strcpy(dest, str1);  // Copies "Hello" to dest character by character
    printf("Copied string: %s\n", dest);  // Hello
    // Warning: strcpy doesn't check if dest is big enough! Can overflow!
    
    // strncpy - safer version, copies max n characters
    char safe[10];
    // strncpy(dest, src, n) copies UP TO n characters from src to dest
    // "TooLongString" is 13 chars long, but we only copy 9 to avoid overflow
    
    // METHOD 1: Manual index (works but error-prone if array size changes)
    strncpy(safe, "TooLongString", 9);  // Copies: T-o-o-L-o-n-g-S-t (9 chars)
    safe[9] = '\0';  // Manually terminate at position 9
    
    // METHOD 2: Using sizeof() - SAFER, prevents off-by-one errors!
    strncpy(safe, "TooLongString", sizeof(safe) - 1);  // Leave room for '\0'
    safe[sizeof(safe) - 1] = '\0';  // Guarantees termination, no off-by-one!
    
    printf("Safe copy: %s\n", safe);  // TooLongSt
    // CRITICAL: strncpy does NOT add '\0' if it copies exactly n characters!
    // Using sizeof() - 1 prevents off-by-one errors when array size changes
    
    printf("\n===== STRING CONCATENATION =====\n");
    
    // Join strings together using strcat() (string concatenate)
    // First string must have enough space for both!
    
    char greeting[50] = "Hello, ";  // Need space for "Hello, World!"
    strcat(greeting, "World!");  // Appends "World!" to end of "Hello, "
    printf("Concatenated: %s\n", greeting);  // Hello, World!
    // Danger: If greeting isn't big enough, will overflow and crash!
    
    // strncat - safer, appends max n characters
    char limited[20] = "Hi ";
    strncat(limited, "Everyone", 3);  // Only append first 3 chars: "Eve"
    printf("Limited concat: %s\n", limited);  // Hi Eve
    // strncat automatically adds '\0' (unlike strncpy)
    
    printf("\n===== STRING COMPARISON =====\n");
    
    // CANNOT use == to compare strings! (compares memory addresses, not content)
    // Must use strcmp() from <string.h>
    
    char word1[] = "Apple";
    char word2[] = "Banana";
    char word3[] = "Apple";
    
    // strcmp compares alphabetically (lexicographically)
    // Returns: 0 if equal, negative if str1 < str2, positive if str1 > str2
    if (strcmp(word1, word2) < 0) {
        printf("%s comes before %s\n", word1, word2);  // Apple comes before Banana
        // 'A' comes before 'B' in ASCII, so strcmp returns negative
    }
    
    if (strcmp(word1, word3) == 0) {
        printf("%s equals %s\n", word1, word3);  // Apple equals Apple
        // All characters match, strcmp returns 0
    }
    // Tip: Use == 0 for equality, < 0 for less than, > 0 for greater than
    
    printf("\n===== ACCESSING CHARACTERS =====\n");
    
    // Strings are char arrays, so can access individual characters
    // Use strlen() to find the last character position
    
    char text[] = "Programming";
    printf("First char: %c\n", text[0]);  // P (index 0)
    printf("Last char: %c\n", text[strlen(text) - 1]);  // g (length=11, so index=10)
    
    // Modify characters (strings are mutable in C)
    text[0] = 'p';
    printf("Modified: %s\n", text);  // programming
    
    printf("\n===== STRING INPUT =====\n");
    
    char input[50];
    printf("Enter a word (no spaces): ");
    // scanf("%s", input);  // Reads until whitespace
    // printf("You entered: %s\n", input);
    
    // For strings with spaces, use fgets
    printf("Enter a sentence: ");
    // fgets(input, sizeof(input), stdin);
    // printf("You entered: %s", input);  // fgets includes newline
    
    printf("\n===== STRING SEARCH =====\n");
    
    char sentence[] = "The quick brown fox";
    
    // strchr - find first occurrence of character
    char *ptr = strchr(sentence, 'q');
    if (ptr != NULL) {
        printf("Found 'q' at position: %ld\n", ptr - sentence);  // 4
    }
    
    // strstr - find substring
    char *substr = strstr(sentence, "brown");
    if (substr != NULL) {
        printf("Found 'brown': %s\n", substr);  // brown fox
    }
    
    printf("\n===== COMMON STRING MISTAKES =====\n");
    
    // Wrong: char *str = "Hello"; str[0] = 'h';  // Modifying string literal (undefined!)
    // Wrong: char str[5] = "Hello";  // No room for '\0'!
    // Right: char str[6] = "Hello";  // Includes space for '\0'
    
    printf("\n===== GETTING USER INPUT (STRINGS) =====\n");
    
    // METHOD 1: scanf - reads until whitespace (space/tab/newline)
    char firstname[50];
    printf("Enter your first name: ");
    scanf("%s", firstname);  // Note: no & needed (array name IS a pointer)
    printf("Hello, %s!\n", firstname);
    // Problem: scanf stops at first space, can't read "John Doe"
    // Danger: No length limit - user can overflow buffer!
    
    // METHOD 2: scanf with width limit - safer
    char username[20];
    printf("Enter username (max 19 chars): ");
    scanf("%19s", username);  // Only read up to 19 chars (leave room for '\0')
    printf("Username: %s\n", username);
    // Still stops at whitespace, but won't overflow
    
    // METHOD 3: fgets - BEST for reading strings (reads full line with spaces)
    char fullname[100];
    printf("Enter your full name: ");
    
    // INPUT BUFFER EXPLANATION:
    // When you type "John" and press Enter, what's actually sent is: "John\n"
    // The input buffer is where this sits waiting to be read
    // scanf("%s") reads "John" but LEAVES the '\n' in the buffer
    // Next input function (like fgets) immediately reads that leftover '\n'
    // Result: fgets gets an empty line before you can type anything!
    
    // Clear input buffer from previous scanf
    // This is a while loop with no body (semicolon ends it immediately)
    // It keeps calling getchar() and discarding what it reads UNTIL it finds '\n'
    // When it finds '\n', that newline gets read (and discarded), then loop stops
    // So it clears everything including the newline itself
    while (getchar() != '\n');  // Read and discard characters until '\n' (inclusive)
    fgets(fullname, sizeof(fullname), stdin);
    // fgets(destination, max_size, input_stream)
    // Reads up to 99 chars OR until newline (whichever comes first)
    // Includes the newline in the string!
    
    // Remove trailing newline that fgets includes
    fullname[strcspn(fullname, "\n")] = '\0';  // Find '\n' and replace with '\0'
    printf("Full name: %s\n", fullname);
    
    // fgets pros: reads spaces, prevents overflow, safe
    // fgets con: includes newline (must remove it)
    
    printf("\n===== USER INPUT BEST PRACTICES =====\n");
    printf("✓ Use fgets for string input (safest)\n");
    printf("✓ Always specify buffer size\n");
    printf("✓ Remove trailing newline from fgets\n");
    printf("✗ Avoid gets() - deprecated, unsafe (no bounds checking)\n");
    printf("✗ Avoid scanf(\"%%s\") without width limit\n");
    
    return 0;
}

// Notes:
// - Strings are char arrays with '\0' at the end
// - Single quotes 'A' = character, Double quotes "A" = string (2 bytes: 'A', '\0')
// - Always include <string.h> for string functions
// - Always ensure destination buffers are large enough
// - strcmp returns 0 for equal strings (not 1 like other languages!)
// - Use strncpy/strncat for safer string operations
// - fgets is safer than scanf for reading strings with spaces
