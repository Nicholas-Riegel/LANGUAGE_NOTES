// C++ std::set Summary
// Based on: https://www.w3schools.com/cpp/cpp_sets.asp
//
// A set stores unique elements, automatically sorted (ascending by default).
// Key features:
//   - Only unique values are stored (duplicates are ignored)
//   - Elements are sorted automatically
//   - No access by index (no [] or at())
//   - Use insert() to add, erase() to remove, clear() to remove all
//   - Use size(), empty(), and count() for info and checks
//   - Use for-each loop or iterators to access elements

#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
	// Create a set
	set<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};

	// Print set elements (sorted, unique)
	cout << "All cars:" << endl;
	for (const string& car : cars) {
		cout << car << endl;
	}

	// Add elements
	cars.insert("Tesla");
	cars.insert("VW");
	cars.insert("Toyota");
	cars.insert("Audi");
	cout << "After insertions:" << endl;
	for (const string& car : cars) {
		cout << car << endl;
	}

	// Remove elements
	cars.erase("Volvo");
	cars.erase("Mazda");
	cout << "After erasing Volvo and Mazda:" << endl;
	for (const string& car : cars) {
		cout << car << endl;
	}

	// Set size
	cout << "Set size: " << cars.size() << endl;

	// Check if set is empty
	set<string> emptySet;
	cout << "Is emptySet empty? " << emptySet.empty() << endl; // 1 (true)
	cout << "Is cars empty? " << cars.empty() << endl;       // 0 (false)

	// Check if a value exists
	cout << "Does Ford exist? " << cars.count("Ford") << endl; // 1 (true)
	cout << "Does Volvo exist? " << cars.count("Volvo") << endl; // 0 (false)

	// Sort in descending order
	set<int, greater<int>> numbers = {1, 7, 3, 2, 5, 9};
	cout << "Numbers (descending):" << endl;
	for (int num : numbers) {
		cout << num << endl;
	}

	// Unique elements only
	set<string> uniqueCars = {"Volvo", "BMW", "Ford", "BMW", "Mazda"};
	cout << "Unique cars (duplicates ignored):" << endl;
	for (const string& car : uniqueCars) {
		cout << car << endl;
	}

	return 0;
}

// Note: You cannot change the value of an existing element in a set (remove and re-insert instead).
// Sets are useful for storing unique items, fast membership tests, and automatic sorting.
