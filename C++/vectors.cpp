#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <string>

int main() {
    
    // Create
    std::vector<std::string> fruits = {"apple", "banana", "cherry"};
    
    // Access
    std::cout << fruits[0] << std::endl;           // 'apple'
    std::cout << fruits[fruits.size() - 1] << std::endl;  // 'cherry'
    std::cout << fruits.at(0) << std::endl;       // Safe access with bounds checking
    
    // Modify
    fruits[1] = "blueberry";
    
    // Add
    fruits.push_back("date");                     // equivalent to append
    fruits.insert(fruits.begin() + 1, "kiwi");   // insert at index 1
    
    // Remove
    // Remove by value
    auto it = std::find(fruits.begin(), fruits.end(), "apple");
    if (it != fruits.end()) {
        fruits.erase(it);
    }
    
    fruits.pop_back();                            // remove last item
    fruits.erase(fruits.begin());                 // remove first item
    fruits.erase(fruits.begin() + 1);             // remove by index
    
    // Slice (using iterators)
    std::vector<std::string> slice1(fruits.begin() + 1, fruits.begin() + 3);  // elements 1 and 2
    std::vector<std::string> slice2(fruits.begin() + 1, fruits.end());        // elements 1 and onward
    
    // Iterate
    for (const auto& fruit : fruits) {
        std::cout << fruit << std::endl;
    }
    
    // Check if contains
    if (std::find(fruits.begin(), fruits.end(), "banana") != fruits.end()) {
        std::cout << "yes" << std::endl;
    }
    
    // Size
    std::cout << fruits.size() << std::endl;
    
    // Count occurrences
    std::vector<std::string> fruitsWithDuplicates = {"apple", "banana", "apple", "cherry"};
    int appleCount = std::count(fruitsWithDuplicates.begin(), fruitsWithDuplicates.end(), "apple");
    std::cout << appleCount << std::endl;  // Returns 2
    
    // Find index of item
    auto pos = std::find(fruitsWithDuplicates.begin(), fruitsWithDuplicates.end(), "banana");
    if (pos != fruitsWithDuplicates.end()) {
        int index = std::distance(fruitsWithDuplicates.begin(), pos);
        std::cout << index << std::endl;  // Returns 1
    }
    
    // Extend with another vector
    std::vector<std::string> moreFruits = {"grape", "mango"};
    fruits.insert(fruits.end(), moreFruits.begin(), moreFruits.end());
    
    // Sort vector
    std::vector<int> numbers = {3, 1, 4, 1, 5};
    std::sort(numbers.begin(), numbers.end());    // Sorts in place
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Sort without modifying original
    std::vector<int> originalNumbers = {3, 1, 4, 1, 5};
    std::vector<int> sortedNumbers = originalNumbers;
    std::sort(sortedNumbers.begin(), sortedNumbers.end());
    for (int num : sortedNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Reverse vector
    std::reverse(numbers.begin(), numbers.end()); // Reverses in place
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Clear all items
    // fruits.clear();  // Removes all items
    
    // Copy vector
    std::vector<std::string> fruitsCopy = fruits;                    // Copy constructor
    std::vector<std::string> fruitsCopy2(fruits.begin(), fruits.end()); // Using iterators
    
    // Min, max, sum (for numeric vectors)
    std::vector<int> nums = {10, 5, 8, 3, 9};
    auto minElement = *std::min_element(nums.begin(), nums.end());
    auto maxElement = *std::max_element(nums.begin(), nums.end());
    int sum = std::accumulate(nums.begin(), nums.end(), 0);
    
    std::cout << "Min: " << minElement << std::endl;
    std::cout << "Max: " << maxElement << std::endl;
    std::cout << "Sum: " << sum << std::endl;
    
    // Generate sequence (equivalent to list comprehension)
    std::vector<int> squares(5);
    for (int i = 0; i < 5; ++i) {
        squares[i] = i * i;  // [0, 1, 4, 9, 16]
    }
    
    // Combine vectors
    std::vector<int> list1 = {1, 2, 3};
    std::vector<int> list2 = {4, 5, 6};
    
    std::vector<int> combined;
    combined.insert(combined.end(), list1.begin(), list1.end());
    combined.insert(combined.end(), list2.begin(), list2.end());
    
    // Insert elements in the middle
    std::vector<int> mixed = {0};
    mixed.insert(mixed.end(), list1.begin(), list1.end());
    mixed.push_back(99);
    mixed.insert(mixed.end(), list2.begin(), list2.end());
    mixed.push_back(100);
    
    // C++ doesn't have direct equivalent to spread operator for function calls
    // You would typically pass the vector itself or use iterators
    
    return 0;
}
