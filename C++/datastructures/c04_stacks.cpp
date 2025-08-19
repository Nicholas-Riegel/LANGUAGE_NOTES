// C++ std::stack Summary
// Based on: https://www.w3schools.com/cpp/cpp_stacks.asp
//
// A stack is a container that stores elements in LIFO (Last In, First Out) order.
// Think of a stack like a pile of pancakes: you add and remove from the top only.
//
// Key features:
//   - Only the top element can be accessed (no random access or indexing).
//   - Use push() to add, pop() to remove, and top() to access/change the top element.
//   - Use size() to get the number of elements, and empty() to check if the stack is empty.

#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
	// Create a stack
	stack<string> cars;

	// Add elements (push)
	cars.push("Volvo");
	cars.push("BMW");
	cars.push("Ford");
	cars.push("Mazda");

	// Access the top element
	cout << "Top car: " << cars.top() << endl; // Mazda

	// Change the top element
	cars.top() = "Tesla";
	cout << "After change, top car: " << cars.top() << endl; // Tesla

	// Remove the top element (pop)
	cars.pop();
	cout << "After pop, new top car: " << cars.top() << endl; // Ford

	// Stack size
	cout << "Stack size: " << cars.size() << endl;

	// Check if stack is empty
	stack<string> emptyStack;
	cout << "Is emptyStack empty? " << emptyStack.empty() << endl; // 1 (true)
	cout << "Is cars empty? " << cars.empty() << endl;           // 0 (false)

	// Note: You cannot loop through or access elements by index in a stack.

	return 0;
}

// Stacks are often used for undo features, parsing, and backtracking algorithms.
// See also: std::queue for FIFO (First In, First Out) behavior.
