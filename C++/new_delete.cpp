#include <iostream>
#include <string>

using namespace std;

/*
 * IMPORTANT NOTE: Modern C++ Best Practices
 * 
 * While this file teaches new/delete for educational purposes,
 * in modern C++ you should avoid raw new/delete when possible:
 * 
 * Instead of:  int* arr = new int[size]; ... delete[] arr;
 * Use:         std::vector<int> arr(size);  // Automatic cleanup
 * 
 * Instead of:  int* ptr = new int(42); ... delete ptr;
 * Use:         std::unique_ptr<int> ptr = std::make_unique<int>(42);
 * 
 * Benefits of modern alternatives:
 * - Automatic memory management (no manual delete needed)
 * - Exception safety (cleanup happens even if exceptions occur)
 * - RAII (Resource Acquisition Is Initialization)
 * - Less prone to memory leaks and dangling pointers
 * 
 * Learn new/delete to understand memory management,
 * but use modern alternatives in real code!
 */

int main() {
    
    cout << "===== THE NEW KEYWORD =====\n";
    
    // Basic usage of new - creates memory space for one integer
    int* ptr = new int;
    *ptr = 35;
    cout << "Value created with new: " << *ptr << endl;         // Value created with new: 35
    cout << "Address of dynamic memory: " << ptr << endl;       // Address of dynamic memory: 0x600000004050 (example address)
    
    // You can also initialize at creation
    int* ptr2 = new int(42);
    cout << "Initialized value: " << *ptr2 << endl;             // Initialized value: 42
    
    cout << "\n===== THE DELETE KEYWORD =====\n";
    
    // When you create with new, you must delete when done
    cout << "Before delete: ptr points to " << ptr << endl;     // Before delete: ptr points to 0x600000004050
    delete ptr;
    cout << "After delete: memory is freed (ptr still holds old address)" << endl;
    
    // Good practice: set pointer to nullptr after delete
    ptr = nullptr;
    cout << "Pointer set to nullptr for safety" << endl;
    
    delete ptr2;  // Don't forget this one too!
    ptr2 = nullptr;
    
    cout << "\n===== USING NEW AND DELETE WITH ARRAYS =====\n";
    
    // Get number of guests from user (simulated here)
    int numGuests = 3;  // In real code, you might get this from user input
    cout << "Creating space for " << numGuests << " guests" << endl;    // Creating space for 3 guests
    
    // Create dynamic array - size can be determined at runtime
    // new string[numGuests] creates numGuests strings on the heap and then returns the address of the first element.
    string* guests = new string[numGuests];
    
    // Fill the array
    // guests[0] directly gives us a string object, so we can assign to it directly. The array indexing ([]) already does the dereferencing for us!
    guests[0] = "John Doe";
    guests[1] = "Liam Spurs"; 
    guests[2] = "Jenny Kasp";
    
    // Display all guests
    cout << "\nGuests checked in:" << endl;
    for (int i = 0; i < numGuests; i++) {
        cout << guests[i] << endl;                              // John Doe, Liam Spurs, Jenny Kasp
    }
    
    // IMPORTANT: Use delete[] for arrays (not just delete)
    delete[] guests;
    guests = nullptr;
    
    cout << "\n===== NEW VS DELETE: SINGLE VARIABLES VS ARRAYS =====\n";
    
    cout << "For single variables:" << endl;
    cout << "- Create: int* ptr = new int(value);" << endl;
    cout << "- Delete: delete ptr;" << endl;
    cout << "- Safety: ptr = nullptr;" << endl;
    
    cout << "\nFor arrays:" << endl;
    cout << "- Create: int* arr = new int[size];" << endl;
    cout << "- Delete: delete[] arr;  // Note the []" << endl;
    cout << "- Safety: arr = nullptr;" << endl;
    
    cout << "\n===== PRACTICAL EXAMPLE: DYNAMIC ARRAY BASED ON INPUT =====\n";
    
    // Simulate getting array size at runtime
    int arraySize = 5;
    cout << "Creating array of size " << arraySize << endl;       // Creating array of size 5
    
    // Create dynamic array of integers
    int* dynamicArray = new int[arraySize];
    
    // Fill with values
    for (int i = 0; i < arraySize; i++) {
        dynamicArray[i] = (i + 1) * 10;  // 10, 20, 30, 40, 50
    }
    
    // Display array
    cout << "Dynamic array contents: ";
    for (int i = 0; i < arraySize; i++) {
        cout << dynamicArray[i] << " ";                          // 10 20 30 40 50 
    }
    cout << endl;
    
    // Clean up
    delete[] dynamicArray;
    dynamicArray = nullptr;
    
    cout << "\n===== WHEN TO USE NEW =====\n";
    
    cout << "DON'T use new for normal variables:" << endl;
    cout << "✓ int age = 35;        // Automatic memory management" << endl;
    cout << "✓ string name = \"John\"; // C++ handles this automatically" << endl;
    
    cout << "\nDO use new when:" << endl;
    cout << "✓ You don't know memory needs in advance" << endl;
    cout << "✓ Size depends on user input or runtime values" << endl;
    cout << "✓ Creating memory while program is running" << endl;
    cout << "✓ Need large or flexible amounts of data" << endl;
    cout << "✓ Want manual control over memory (performance critical)" << endl;
    
    cout << "\n===== BEST PRACTICES =====\n";
    
    cout << "1. Every 'new' must have a corresponding 'delete'" << endl;
    cout << "2. Use 'delete[]' for arrays, 'delete' for single objects" << endl;
    cout << "3. Set pointers to nullptr after delete" << endl;
    cout << "4. Avoid new/delete when possible - use modern alternatives" << endl;
    cout << "5. Consider std::vector instead of dynamic arrays" << endl;
    cout << "6. Consider smart pointers (std::unique_ptr, std::shared_ptr)" << endl;
    
    cout << "\n===== COMMON MISTAKES =====\n";
    
    cout << "❌ Using delete instead of delete[] for arrays" << endl;
    cout << "❌ Forgetting to delete (memory leak)" << endl;
    cout << "❌ Using pointer after delete (dangling pointer)" << endl;
    cout << "❌ Deleting the same pointer twice" << endl;
    cout << "❌ Deleting pointers not created with new" << endl;
    
    cout << "\n===== MODERN ALTERNATIVES =====\n";
    
    cout << "Instead of raw new/delete, consider:" << endl;
    cout << "• std::vector<int> vec(size);     // Dynamic array, auto cleanup" << endl;
    cout << "• std::unique_ptr<int> ptr;       // Smart pointer, auto cleanup" << endl;
    cout << "• std::array<int, 5> arr;         // Fixed-size array" << endl;
    cout << "• Container classes that manage memory automatically" << endl;
    
    return 0;
}
