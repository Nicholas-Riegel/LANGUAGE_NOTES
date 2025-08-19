#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // =====================
    // Create a Vector
    // =====================
    vector<string> cars = {"Honda", "Hyundai", "Subaru"};
    
    // =====================
    // Insert and Remove at the Front (Beginning)
    // =====================
    // Insert at the front
    cars.insert(cars.begin(), "Jeep");
    // Remove from the front
    cars.erase(cars.begin());

    // =====================
    // Insert and Remove in the Middle
    // =====================
    // Insert at a specific position
    cars.insert(cars.begin() + 2, "Jeep");
    // Remove from a specific position
    cars.erase(cars.begin() + 2);
    
    // =====================
    // Add and Remove Elements from End
    // =====================
    // Add to the end
    cars.push_back("Jeep");
    // Remove from the end
    cars.pop_back();
    
    // =====================
    // Access Elements
    // =====================
    cout << cars.at(2) << endl;
    
    // =====================
    // Change Elements
    // =====================
    cars.at(2) = "Jeep";
    

    for (string c : cars) cout << c << ", ";
    cout << endl;
    // =====================
    // Vector Size
    // =====================
    cout << cars.size() << endl;

    // =====================
    // Check if Vector is Empty
    // =====================
    cout << cars.empty() << endl;
    
    // =====================
    // Loop Through a Vector
    
    // Range-based for loop
    for (string c : cars){
        c += "yo";
        cout << c << endl;
    }    
    
    // Index loop
    for (int i = 0; i < cars.size(); i++){
        cout << cars.at(i) << endl;
    }
    return 0;
}

// Try to implement each section without looking at the answers!
// When done, compare your code to c01_vectors.cpp for reference.
