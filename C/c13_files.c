#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    
    printf("===== CREATING AND WRITING TO FILES =====\n");
    
    // Open file for writing (creates file if doesn't exist, overwrites if exists)
    FILE *file = fopen("example.txt", "w");
    
    if (file == NULL) {
        printf("Error opening file\n");
        return 1;
    }
    
    fprintf(file, "Hello, File!\n");
    fprintf(file, "This is line 2.\n");
    fprintf(file, "This is line 3.\n");
    
    fclose(file);  // Always close files!
    printf("File created and written successfully\n");
    
    printf("\n===== READING FROM FILES =====\n");
    
    // Open file for reading
    file = fopen("example.txt", "r");
    
    if (file == NULL) {
        printf("Error opening file\n");
        return 1;
    }
    
    char buffer[100];
    
    printf("File contents:\n");
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("%s", buffer);  // fgets includes newline
    }
    
    fclose(file);
    
    printf("\n===== APPENDING TO FILES =====\n");
    
    // Open file in append mode (adds to end without overwriting)
    file = fopen("example.txt", "a");
    
    if (file == NULL) {
        printf("Error opening file\n");
        return 1;
    }
    
    fprintf(file, "This line was appended!\n");
    fclose(file);
    
    printf("Text appended to file\n");
    
    printf("\n===== FILE MODES =====\n");
    printf("\"r\"  - Read (file must exist)\n");
    printf("\"w\"  - Write (creates/overwrites file)\n");
    printf("\"a\"  - Append (creates file if doesn't exist)\n");
    printf("\"r+\" - Read and write (file must exist)\n");
    printf("\"w+\" - Read and write (creates/overwrites file)\n");
    printf("\"a+\" - Read and append\n");
    
    printf("\n===== READING CHARACTER BY CHARACTER =====\n");
    
    file = fopen("example.txt", "r");
    
    if (file == NULL) {
        printf("Error opening file\n");
        return 1;
    }
    
    printf("First 20 characters:\n");
    for (int i = 0; i < 20; i++) {
        int ch = fgetc(file);
        if (ch == EOF) break;
        putchar(ch);
    }
    printf("\n");
    
    fclose(file);
    
    printf("\n===== CHECKING IF FILE EXISTS =====\n");
    
    FILE *testFile = fopen("nonexistent.txt", "r");
    
    if (testFile == NULL) {
        printf("File does not exist\n");
    } else {
        printf("File exists\n");
        fclose(testFile);
    }
    
    printf("\n===== WRITING AND READING FORMATTED DATA =====\n");
    
    // Write formatted data
    file = fopen("data.txt", "w");
    
    if (file == NULL) {
        printf("Error opening file\n");
        return 1;
    }
    
    fprintf(file, "%s %d %f\n", "Alice", 25, 5.5);
    fprintf(file, "%s %d %f\n", "Bob", 30, 6.0);
    fprintf(file, "%s %d %f\n", "Charlie", 35, 5.8);
    
    fclose(file);
    
    // Read formatted data
    file = fopen("data.txt", "r");
    
    if (file == NULL) {
        printf("Error opening file\n");
        return 1;
    }
    
    char name[50];
    int age;
    float height;
    
    printf("Data from file:\n");
    while (fscanf(file, "%s %d %f", name, &age, &height) == 3) {
        printf("Name: %s, Age: %d, Height: %.1f\n", name, age, height);
    }
    
    fclose(file);
    
    printf("\n===== FILE POSITION =====\n");
    
    file = fopen("example.txt", "r");
    
    if (file == NULL) {
        printf("Error opening file\n");
        return 1;
    }
    
    // Get current position
    long pos = ftell(file);
    printf("Current position: %ld\n", pos);
    
    // Read some data
    fgets(buffer, sizeof(buffer), file);
    pos = ftell(file);
    printf("Position after reading line: %ld\n", pos);
    
    // Rewind to beginning
    rewind(file);
    pos = ftell(file);
    printf("Position after rewind: %ld\n", pos);
    
    // Seek to specific position
    fseek(file, 10, SEEK_SET);  // 10 bytes from start
    pos = ftell(file);
    printf("Position after seek: %ld\n", pos);
    
    fclose(file);
    
    printf("\n===== BINARY FILE I/O =====\n");
    
    // Write binary data
    int numbers[] = {1, 2, 3, 4, 5};
    file = fopen("numbers.bin", "wb");  // "wb" = write binary
    
    if (file == NULL) {
        printf("Error opening file\n");
        return 1;
    }
    
    fwrite(numbers, sizeof(int), 5, file);
    fclose(file);
    
    // Read binary data
    int readNumbers[5];
    file = fopen("numbers.bin", "rb");  // "rb" = read binary
    
    if (file == NULL) {
        printf("Error opening file\n");
        return 1;
    }
    
    fread(readNumbers, sizeof(int), 5, file);
    fclose(file);
    
    printf("Binary data read: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", readNumbers[i]);  // 1 2 3 4 5
    }
    printf("\n");
    
    printf("\n===== DELETING FILES =====\n");
    
    if (remove("data.txt") == 0) {
        printf("File deleted successfully\n");
    } else {
        printf("Error deleting file\n");
    }
    
    printf("\n===== RENAMING FILES =====\n");
    
    if (rename("numbers.bin", "integers.bin") == 0) {
        printf("File renamed successfully\n");
    } else {
        printf("Error renaming file\n");
    }
    
    // Cleanup
    remove("example.txt");
    remove("integers.bin");
    
    return 0;
}

// Notes:
// - Always check if fopen() returns NULL (file open failed)
// - Always close files with fclose()
// - "w" mode overwrites the entire file
// - "a" mode appends to the end (preserves existing content)
// - fgets() reads a line (includes newline character)
// - fprintf() writes formatted data to file
// - fscanf() reads formatted data from file
// - fgetc() reads one character at a time
// - fread()/fwrite() for binary data
// - ftell() gets current file position
// - fseek() moves to specific position
// - rewind() goes back to start
// - remove() deletes a file
// - rename() renames/moves a file
// - Use "b" suffix for binary mode ("rb", "wb")
