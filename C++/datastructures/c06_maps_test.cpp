#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
	// =====================
	// Create a Map
	// =====================
	map<string, int> people = {
        {"John", 43}, 
        {"Jo", 54}, 
        {"Andy", 34}
    };

	// =====================
	// Insert Elements
	// =====================
	people.insert( {"Paul", 33} );

	// =====================
	// Access Elements
	// =====================
	cout << "Jo is " << people.at("Jo") << endl;
    
	// =====================
	// Change Elements
	// =====================
	people.at("Jo") = 55;
	cout << "Jo is " << people.at("Jo") << endl;

	// =====================
	// Remove Elements
	// =====================
	people.erase("Jo");
    
	// =====================
	// Check if Key Exists
	// =====================
    if (people.count("Jo") == 0){
        cout << "Jo is no longer in people" << endl;
    }

	// =====================
	// Map Size
	// =====================
	cout << "The size of people is: " << people.size() << endl;

    // =====================
	// Loop Through a Map
	// =====================
	for (auto& p : people){
        cout << p.first << " is " << p.second << endl;
    }

    // =====================
    // Clear a Map
    // =====================
    people.clear();
    if (people.empty()) cout << "people is now empty" << endl;


	return 0;
}

