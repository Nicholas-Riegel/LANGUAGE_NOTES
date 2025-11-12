// A deque (double-ended queue) is a sequence container that allows fast insertion and removal of elements at both the front and the back.
// Key features:
//   - Elements can be added/removed from both ends (push_front, push_back, pop_front, pop_back).
//   - Supports random access by index (like a vector).
//   - More flexible than a queue (which only allows add at end, remove at front).
//   - Slightly slower random access than vector, but much faster for front operations.

#include <iostream>
#include <deque>
#include <string>
using namespace std;

int main() {
	// Create a deque
	deque<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};

	// Access elements by index
	cout << "First car: " << cars[0] << endl; // Volvo
	cout << "Second car: " << cars.at(1) << endl; // BMW
	cout << "Last car: " << cars.back() << endl; // Mazda

	// Change elements
	cars[0] = "Opel";
	cars.at(1) = "Toyota";
	cout << "After change, first: " << cars.front() << ", second: " << cars[1] << endl;

	// Add elements to front and back
	cars.push_front("Tesla");
	cars.push_back("VW");
	cout << "After push_front and push_back, first: " << cars.front() << ", last: " << cars.back() << endl;

	// Remove elements from front and back
	cars.pop_front();
	cars.pop_back();
	cout << "After pop_front and pop_back, first: " << cars.front() << ", last: " << cars.back() << endl;


	// =====================
	// Add to the middle of a deque
	// =====================
	// You can insert into the middle using insert() with an iterator.
	// Deques support random access, so you can use begin() + n or std::next(begin(), n).
	// Example: Insert "Chevy" before the 3rd element (index 2)
	auto midIt = cars.begin() + 2; // or: auto midIt = std::next(cars.begin(), 2);
	cars.insert(midIt, "Chevy");
	cout << "After insert in middle: ";
	for (const string& car : cars) cout << car << " ";
	cout << endl;

	// Note: For random-access containers (vector, deque), begin() + n is efficient.
	// For non-random-access containers (list), use std::next().
	// =====================
    
	// Deque size
	cout << "Deque size: " << cars.size() << endl;

	// Check if deque is empty
	deque<string> emptyDeque;
	cout << "Is emptyDeque empty? " << emptyDeque.empty() << endl; // 1 (true)
	cout << "Is cars empty? " << cars.empty() << endl;         // 0 (false)

	// Loop through a deque (index-based)
	cout << "All cars (index loop):" << endl;
	for (int i = 0; i < cars.size(); i++) {
		cout << cars[i] << endl;
	}

	// Loop through a deque (range-based for loop)
	cout << "All cars (range-based for loop):" << endl;
	for (const string& car : cars) {
		cout << car << endl;
	}

	return 0;
}

// Note: Deques are 0-indexed, support .at() for bounds-checked access, and can be used with iterators for advanced operations.
