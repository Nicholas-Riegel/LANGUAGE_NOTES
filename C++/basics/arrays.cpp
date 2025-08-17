#include <iostream>
#include <string>

using namespace std;

int main() {
    
    cout << "===== ARRAY SIZE WITH BUILT-IN ARRAYS =====\n";
    
    // Create arrays of different types
    int numbers[] = {1, 2, 3, 4, 5};
    string fruits[] = {"apple", "banana", "cherry", "date"};
    char letters[] = {'a', 'b', 'c', 'd', 'e', 'f'};
    double prices[] = {1.99, 2.49, 3.99};
    
    // Get size using sizeof operator
    int numbersSize = sizeof(numbers) / sizeof(numbers[0]);
    int fruitsSize = sizeof(fruits) / sizeof(fruits[0]);
    int lettersSize = sizeof(letters) / sizeof(letters[0]);
    int pricesSize = sizeof(prices) / sizeof(prices[0]);
    
    cout << "Numbers array size: " << numbersSize << endl;
    cout << "Fruits array size: " << fruitsSize << endl;
    cout << "Letters array size: " << lettersSize << endl;
    cout << "Prices array size: " << pricesSize << endl;
    
    cout << "\n===== HOW SIZEOF WORKS =====\n";
    
    // Demonstrate how sizeof works
    cout << "sizeof(numbers) = " << sizeof(numbers) << " bytes" << endl;
    cout << "sizeof(numbers[0]) = " << sizeof(numbers[0]) << " bytes" << endl;
    cout << "Size calculation: " << sizeof(numbers) << " / " << sizeof(numbers[0]) << " = " << numbersSize << endl;
    
    cout << "\n===== USING A TEMPLATE FUNCTION =====\n";
    
    // Template function to get array size (C++17 and later)
    auto getArraySize = [](auto& arr) { 
        return sizeof(arr) / sizeof(arr[0]); 
    };
    
    cout << "Numbers size (template): " << getArraySize(numbers) << endl;
    cout << "Fruits size (template): " << getArraySize(fruits) << endl;
    
    cout << "\n===== IMPORTANT NOTES =====\n";
    cout << "1. sizeof() only works with arrays declared in the same scope" << endl;
    cout << "2. When passed to functions, arrays become pointers and lose size info" << endl;
    
    return 0;
}
