#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <string>

using namespace std;

int main() {
    
    // Create
    vector<string> fruits = {"apple", "banana", "cherry"};
    
    // Access
    cout << fruits[0] << endl;           // 'apple'
    cout << fruits[fruits.size() - 1] << endl;  // 'cherry'
    cout << fruits.at(0) << endl;       // Safe access with bounds checking
    
    // Modify
    fruits[1] = "blueberry";
    
    // Add
    fruits.push_back("date");                     // equivalent to append
    fruits.insert(fruits.begin() + 1, "kiwi");   // insert at index 1
    
    // Remove
    fruits.pop_back();                            // remove last item
    fruits.erase(fruits.begin());                 // remove first item
    fruits.erase(fruits.begin() + 1);             // remove by index
    
    // Remove by value
    auto it = find(fruits.begin(), fruits.end(), "apple");
    if (it != fruits.end()) {
        fruits.erase(it);
    }
    
    // Remove all occurrences
    while (true) {
        auto it = find(fruits.begin(), fruits.end(), "c");
        if (it != fruits.end()) {
            fruits.erase(it);
        } else {
            break;  // No more "c" found
        }
    }

    // Slice (using iterators)
    vector<string> slice1(fruits.begin() + 1, fruits.begin() + 3);  // elements 1 and 2
    vector<string> slice2(fruits.begin() + 1, fruits.end());        // elements 1 and onward
    
    // Iterate
    for (const auto& fruit : fruits) {
        cout << fruit << endl;
    }
    
    // Check if contains
    if (find(fruits.begin(), fruits.end(), "banana") != fruits.end()) {
        cout << "yes" << endl;
    }
    
    // Size
    cout << fruits.size() << endl;
    
    // Count occurrences
    vector<string> fruitsWithDuplicates = {"apple", "banana", "apple", "cherry"};
    int appleCount = count(fruitsWithDuplicates.begin(), fruitsWithDuplicates.end(), "apple");
    cout << appleCount << endl;  // Returns 2
    
    // Find index of item
    auto pos = find(fruitsWithDuplicates.begin(), fruitsWithDuplicates.end(), "banana");
    if (pos != fruitsWithDuplicates.end()) {
        int index = distance(fruitsWithDuplicates.begin(), pos);
        cout << index << endl;  // Returns 1
    }
    
    // Extend with another vector
    vector<string> moreFruits = {"grape", "mango"};
    fruits.insert(fruits.end(), moreFruits.begin(), moreFruits.end());
    
    // Sort vector
    vector<int> numbers = {3, 1, 4, 1, 5};
    sort(numbers.begin(), numbers.end());    // Sorts in place
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Sort without modifying original
    vector<int> originalNumbers = {3, 1, 4, 1, 5};
    vector<int> sortedNumbers = originalNumbers;
    sort(sortedNumbers.begin(), sortedNumbers.end());
    for (int num : sortedNumbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Reverse vector
    reverse(numbers.begin(), numbers.end()); // Reverses in place
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Clear all items
    // fruits.clear();  // Removes all items
    
    // Copy vector
    vector<string> fruitsCopy = fruits;                    // Copy constructor
    vector<string> fruitsCopy2(fruits.begin(), fruits.end()); // Using iterators
    
    // Min, max, sum (for numeric vectors)
    vector<int> nums = {10, 5, 8, 3, 9};
    auto minElement = *min_element(nums.begin(), nums.end());
    auto maxElement = *max_element(nums.begin(), nums.end());
    int sum = accumulate(nums.begin(), nums.end(), 0);
    
    cout << "Min: " << minElement << endl;
    cout << "Max: " << maxElement << endl;
    cout << "Sum: " << sum << endl;
    
    // Generate sequence (equivalent to list comprehension)
    vector<int> squares(5);
    for (int i = 0; i < 5; ++i) {
        squares[i] = i * i;  // [0, 1, 4, 9, 16]
    }
    
    // Combine vectors
    vector<int> list1 = {1, 2, 3};
    vector<int> list2 = {4, 5, 6};
    
    vector<int> combined;
    combined.insert(combined.end(), list1.begin(), list1.end());
    combined.insert(combined.end(), list2.begin(), list2.end());
    
    // Insert elements in the middle
    vector<int> mixed = {0};
    mixed.insert(mixed.end(), list1.begin(), list1.end());
    mixed.push_back(99);
    mixed.insert(mixed.end(), list2.begin(), list2.end());
    mixed.push_back(100);
    
    // C++ doesn't have direct equivalent to spread operator for function calls
    // You would typically pass the vector itself or use iterators
    
    return 0;
}
