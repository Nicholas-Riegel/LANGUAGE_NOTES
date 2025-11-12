#include <stdio.h>
#include <string.h>

int main() {
    
    printf("===== CREATING STRINGS =====\n");
    
    // Strings in C are character arrays ending with '\0' (null terminator)
    char str1[] = "Hello";       // Compiler adds '\0' automatically
    char str2[20] = "World";     // Extra space for manipulation
    char str3[] = {'H', 'i', '\0'};  // Manual null terminator
    
    printf("String 1: %s\n", str1);  // Hello
    printf("String 2: %s\n", str2);  // World
    printf("String 3: %s\n", str3);  // Hi
    
    printf("\n===== HOW STRINGS WORK IN C =====\n");
    
    // "Hello" is actually stored as: ['H', 'e', 'l', 'l', 'o', '\0']
    char name[] = "John";
    printf("String: %s\n", name);
    printf("As characters: ");
    for (int i = 0; name[i] != '\0'; i++) {
        printf("'%c' ", name[i]);  // 'J' 'o' 'h' 'n'
    }
    printf("'\\0'\n");
    
    // The '\0' tells C where the string ends
    printf("Size in memory: %lu bytes (includes \\0)\n", sizeof(name));  // 5
    
    printf("\n===== STRING LENGTH =====\n");
    
    printf("strlen(str1): %lu\n", strlen(str1));  // 5 (does not count '\0')
    printf("sizeof(str1): %lu\n", sizeof(str1));  // 6 (includes '\0')
    
    printf("\n===== STRING COPY =====\n");
    
    char dest[50];
    strcpy(dest, str1);  // Copy str1 to dest
    printf("Copied string: %s\n", dest);  // Hello
    
    // strncpy - safer, copies max n characters
    char safe[10];
    strncpy(safe, "TooLongString", 9);
    safe[9] = '\0';  // Ensure null termination
    printf("Safe copy: %s\n", safe);  // TooLongSt
    
    printf("\n===== STRING CONCATENATION =====\n");
    
    char greeting[50] = "Hello, ";
    strcat(greeting, "World!");  // Append to greeting
    printf("Concatenated: %s\n", greeting);  // Hello, World!
    
    // strncat - safer, appends max n characters
    char limited[20] = "Hi ";
    strncat(limited, "Everyone", 3);
    printf("Limited concat: %s\n", limited);  // Hi Eve
    
    printf("\n===== STRING COMPARISON =====\n");
    
    char word1[] = "Apple";
    char word2[] = "Banana";
    char word3[] = "Apple";
    
    // strcmp returns: 0 if equal, <0 if str1 < str2, >0 if str1 > str2
    if (strcmp(word1, word2) < 0) {
        printf("%s comes before %s\n", word1, word2);  // Apple comes before Banana
    }
    
    if (strcmp(word1, word3) == 0) {
        printf("%s equals %s\n", word1, word3);  // Apple equals Apple
    }
    
    printf("\n===== ACCESSING CHARACTERS =====\n");
    
    char text[] = "Programming";
    printf("First char: %c\n", text[0]);  // P
    printf("Last char: %c\n", text[strlen(text) - 1]);  // g
    
    // Modify characters
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
