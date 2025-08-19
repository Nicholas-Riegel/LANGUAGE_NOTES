// C++ Vectors Summary
// Based on: https://www.w3schools.com/cpp/cpp_vectors.asp
//
// A vector is a dynamic array that can grow or shrink in size.
// Use #include <vector> to use vectors.

#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // =====================
	// Create a Vector
	// =====================
	vector<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};
	cout << "First car: " << cars[0] << endl; // Volvo
    
	// =====================
	// Insert and Remove at the Front (Beginning)
	// =====================
	// Insert at the front (beginning) using insert()
	cars.insert(cars.begin(), "Honda");
	cout << "After insert at front: " << cars.front() << endl; // Honda
    
	// Remove from the front using erase()
	cars.erase(cars.begin());
	cout << "After erase at front: " << cars.front() << endl; // Should be the original first element
    
	// =====================
	// Insert and Remove in the Middle
	// =====================
	// Insert at position 2 (third element)
	cars.insert(cars.begin() + 2, "Chevy");
	cout << "After insert in middle at index 2: " << cars[2] << endl; // Chevy
    
	// Remove the element at position 2
	cars.erase(cars.begin() + 2);
	cout << "After erase in middle at index 2: " << cars[2] << endl; // Should be the element after Chevy
    
    // =====================
    // Add and Remove Elements from end
    // =====================
    cars.push_back("Tesla");
    cars.push_back("VW");
    cout << "Added Tesla and VW. Last car: " << cars.back() << endl; // VW

    cars.pop_back();
    cout << "After pop_back, last car: " << cars.back() << endl; // Tesla
	
    // =====================
	// Access Elements
	// =====================
	cout << "Second car: " << cars[1] << endl; // BMW
	cout << "Second car: " << cars.at(1) << endl; // BMW safer
	cout << "Last car: " << cars.back() << endl; // Mazda

	// =====================
	// Change Elements
	// =====================
	cars[0] = "Opel";
	cout << "First car after change: " << cars[0] << endl; // Opel
	cars.at(1) = "Toyota"; // safer
	cout << "Second car after change: " << cars.at(1) << endl; // Toyota


	// =====================
	// Vector Size
	// =====================
	cout << "Number of cars: " << cars.size() << endl;

	// =====================
	// Check if Vector is Empty
	// =====================
	vector<string> emptyVec;
	cout << "Is emptyVec empty? " << emptyVec.empty() << endl; // 1 (true)
	cout << "Is cars empty? " << cars.empty() << endl; // 0 (false)

	// =====================
	// Loop Through a Vector
	// =====================
	cout << "All cars (index loop):" << endl;
	for (int i = 0; i < cars.size(); i++) {
		cout << cars[i] << endl;
	}

	cout << "All cars (range-based for loop):" << endl;
	for (const string& car : cars) {
		cout << car << endl;
	}

	return 0;
}

// Notes:
// - Vectors are 0-indexed (first element is at index 0).
// - Use .at() for bounds-checked access (throws error if out of range).
// - Use .push_back() to add, .pop_back() to remove from the end.
// - Use .insert(pos, value) to insert at any position (including front: .begin()).
// - Use .erase(pos) to remove from any position (including front: .begin()).
// - Use .size() to get the number of elements, .empty() to check if empty.
// - Prefer vector over array for dynamic collections.
// - For more, see the full vector reference on W3Schools.
