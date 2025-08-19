// C++ Iterators Summary
// Based on: https://www.w3schools.com/cpp/cpp_iterators.asp
//
// Iterators are objects that point to elements in containers (vector, list, set, map, etc.).
// They are used to access, modify, and loop through elements, similar to pointers.
//
// Key concepts:
//   - begin() returns iterator to first element; end() returns iterator to one past last element
//   - ++it moves to next element; *it accesses the value
//   - Use auto for type inference (C++11+)
//   - rbegin()/rend() for reverse iteration
//   - Used with STL algorithms (sort, find, etc.)

#include <iostream>
#include <vector>
#include <list>
#include <set>
#include <map>
#include <string>
#include <algorithm>
using namespace std;

int main() {
	// Vector example
	vector<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};
	cout << "Vector iteration:" << endl;
	for (auto it = cars.begin(); it != cars.end(); ++it) {
		cout << *it << endl;
	}

	// List example
	list<string> fruits = {"Apple", "Banana", "Cherry"};
	cout << "List iteration:" << endl;
	for (auto it = fruits.begin(); it != fruits.end(); ++it) {
		cout << *it << endl;
	}

	// Set example
	set<int> numbers = {5, 2, 8, 1};
	cout << "Set iteration:" << endl;
	for (auto it = numbers.begin(); it != numbers.end(); ++it) {
		cout << *it << endl;
	}

	// Map example
	map<string, int> ages = { {"John", 32}, {"Adele", 45}, {"Bo", 29} };
	cout << "Map iteration:" << endl;
	for (auto it = ages.begin(); it != ages.end(); ++it) {
		cout << it->first << " is: " << it->second << endl;
	}

	// Reverse iteration (vector)
	cout << "Vector reverse iteration:" << endl;
	for (auto it = cars.rbegin(); it != cars.rend(); ++it) {
		cout << *it << endl;
	}

	// Modify elements via iterator
	auto it = cars.begin();
	*it = "Tesla";
	cout << "After modification, first car: " << cars[0] << endl;

	// Use with algorithms (sort)
	vector<int> nums = {1, 7, 3, 5, 9, 2};
	sort(nums.begin(), nums.end());
	cout << "Sorted numbers:" << endl;
	for (int n : nums) cout << n << " ";
	cout << endl;

	// Remove while iterating (vector)
	vector<string> brands = {"Volvo", "BMW", "Ford", "BMW", "Mazda"};
	for (auto it = brands.begin(); it != brands.end(); ) {
		if (*it == "BMW") {
			it = brands.erase(it); // Remove BMW
		} else {
			++it;
		}
	}
	cout << "Brands after erase:" << endl;
	for (const string& b : brands) cout << b << " ";
	cout << endl;

	return 0;
}

// Notes:
// - Use iterators for flexible, efficient traversal and modification of containers.
// - Use auto to simplify code.
// - Use for-each loops for simple read-only access.
// - Stacks and queues do not support iterators.
