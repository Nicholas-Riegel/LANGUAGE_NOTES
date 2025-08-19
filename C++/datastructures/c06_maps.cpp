// C++ std::map Summary
// Based on: https://www.w3schools.com/cpp/cpp_maps.asp
//
// A map stores elements in key/value pairs. Each key is unique and elements are automatically sorted by key.
// Keys are used to access values (not by index). Values can be duplicated, but keys cannot.
//
// Key features:
//   - Access elements by key (not index)
//   - Keys are unique and sorted
//   - Use [] or .at() to access/change values
//   - Use insert() to add, erase() to remove, clear() to remove all
//   - Use size(), empty(), and count() for info and checks

#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
	// Create a map
	map<string, int> people = { {"John", 32}, {"Adele", 45}, {"Bo", 29} };

	// Access values by key
	cout << "John is: " << people["John"] << endl;
	cout << "Adele is: " << people.at("Adele") << endl;

	// Change values
	people["John"] = 50;
	people.at("Adele") = 40;
	cout << "After change, John is: " << people["John"] << endl;
	cout << "After change, Adele is: " << people.at("Adele") << endl;

	// Add elements
	people["Jenny"] = 22;
	people.insert({"Liam", 24});
	cout << "Jenny is: " << people["Jenny"] << endl;
	cout << "Liam is: " << people.at("Liam") << endl;

	// Remove elements
	people.erase("John");
	cout << "After erase, does John exist? " << people.count("John") << endl; // 0 (false)
	people.clear();
	cout << "After clear, map size: " << people.size() << endl;

	// Re-add for looping
	people = { {"John", 32}, {"Adele", 45}, {"Bo", 29} };

	// Loop through map
	cout << "All people:" << endl;
	for (auto person : people) {
		cout << person.first << " is: " << person.second << endl;
	}

	// Check if map is empty
	cout << "Is people empty? " << people.empty() << endl;

	// Check if a key exists
	cout << "Does Bo exist? " << people.count("Bo") << endl; // 1 (true)

	return 0;
}

// Note: .at() throws an error if the key does not exist; [] will create a new key if it does not exist.
// Maps are useful for fast lookups by key, such as dictionaries, phone books, or frequency counts.
