// C++ Templates Summary
// Based on: https://www.w3schools.com/cpp/cpp_templates.asp
//
// Templates let you write functions and classes that work with any data type.
// They help you avoid repeating code and make your programs more flexible and reusable.

#include <iostream>
#include <string>
using namespace std;

// =====================
// Function Templates
// =====================
// Syntax:
// template <typename T>
// return_type function_name(T param) { ... }

template <typename T>
T add(T a, T b) {
	return a + b;
}

// =====================
// Class Templates
// =====================
// Syntax:
// template <typename T>
// class ClassName { ... };

template <typename T>
class Box {
public:
	T value;
    
    // Constructor
	Box(T v) { 
        value = v; 
    }

    // Function to display the value
	void show() { 
        cout << "Value: " << value << endl; 
    }
};

// Class template with two types
template <typename T1, typename T2>
class Pair {
public:
	T1 first;
	T2 second;

    // The part after the colon is called a 'member initializer list'.
	// It initializes 'first' with 'a' and 'second' with 'b' before the constructor body runs.
	Pair(T1 a, T2 b) : first(a), second(b) {}

    // Function to display the pair
    void display() { 
        cout << "First: " << first << ", Second: " << second << endl; 
    }
};

int main() {
	cout << "--- Function Template Example ---" << endl;
	cout << add<int>(5, 3) << endl;      // 8
	cout << add<double>(2.5, 1.5) << endl; // 4

	cout << "\n--- Class Template Example ---" << endl;
	Box<int> intBox(50);
	Box<string> strBox("Hello");
	intBox.show();      // Value: 50
	strBox.show();      // Value: Hello

	cout << "\n--- Pair Template Example ---" << endl;
	Pair<string, int> person("John", 30);
	Pair<int, double> score(51, 9.5);
	person.display();   // First: John, Second: 30
	score.display();    // First: 51, Second: 9.5

	return 0;
}

// Why use templates?
// - Avoid repeating the same logic for different types
// - Write cleaner, reusable code
// - Support generic programming
//
// Note: Templates must be defined in the same file where they are used (usually in the .h file).
