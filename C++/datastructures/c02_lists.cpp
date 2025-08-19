// C++ std::list Summary
// Based on: https://www.w3schools.com/cpp/cpp_list.asp
//
// A list is a sequence container that can store multiple elements of the same type and can grow or shrink dynamically.
// Key differences from vector:
//   - You can add and remove elements from both the beginning and the end of a list (push_front, push_back, pop_front, pop_back).
//   - Lists do NOT support random access (no operator[] or at()), so you cannot access elements by index.
//   - Lists are best when you need frequent insertions/removals at both ends or in the middle.
//   - Vectors are better for fast access by index and when you mostly add/remove at the end.

#include <iostream>
#include <list>
#include <string>
using namespace std;

int main() {
	// Create a list
	list<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};

	// Access first and last elements
	cout << "First car: " << cars.front() << endl; // Volvo
	cout << "Last car: " << cars.back() << endl;   // Mazda

	// Change first and last elements
	cars.front() = "Opel";
	cars.back() = "Toyota";
	cout << "After change, first: " << cars.front() << ", last: " << cars.back() << endl;

	// Add elements to front and back
	cars.push_front("Tesla");
	cars.push_back("VW");
	cout << "After push_front and push_back, first: " << cars.front() << ", last: " << cars.back() << endl;

	// Remove elements from front and back
	cars.pop_front();
	cars.pop_back();
	cout << "After pop_front and pop_back, first: " << cars.front() << ", last: " << cars.back() << endl;

	// List size
	cout << "List size: " << cars.size() << endl;

	// Check if list is empty
	list<string> emptyList;
	cout << "Is emptyList empty? " << emptyList.empty() << endl; // 1 (true)
	cout << "Is cars empty? " << cars.empty() << endl;         // 0 (false)

	// Loop through a list (range-based for loop)
	cout << "All cars:" << endl;
	for (const string& car : cars) {
		cout << car << endl;
	}

	// Note: You cannot use cars[0] or cars.at(0) with lists!

	return 0;
}

// Tip: You can also use iterators to insert or erase elements at any position in the list.
// See the STL documentation for more advanced usage.
