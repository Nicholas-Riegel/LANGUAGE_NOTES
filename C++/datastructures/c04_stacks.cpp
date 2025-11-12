// C++ std::stack Summary
// Based on: https://www.w3schools.com/cpp/cpp_stacks.asp
//
// A stack is a container that stores elements in LIFO (Last In, First Out) order.
// Think of a stack like a pile of pancakes: you add and remove from the top only.
//

// Advantages:
//   - Simple and efficient for LIFO operations (push/pop/top are O(1)).
//   - Prevents accidental access to elements other than the top (enforces LIFO discipline).
//   - Useful for problems where you need to reverse data or track nested/recursive operations.

// Disadvantages:
//   - No random access (cannot access elements by index or value).
//   - Only the top element is accessible; can't iterate or search through the stack directly.
//   - Not suitable for FIFO (queue-like) or random-access needs.

// When to use a stack:
//   - Undo/redo functionality (editors, apps)
//   - Parsing expressions (compilers, calculators)
//   - Backtracking algorithms (DFS, pathfinding, recursion)
//   - Reversing data (e.g., reversing a string or list)
//   - Managing function calls (call stack)

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
