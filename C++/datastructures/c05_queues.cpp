// C++ std::queue Summary
// Based on: https://www.w3schools.com/cpp/cpp_queues.asp
//
// A queue is a container that stores elements in FIFO (First In, First Out) order.
// Think of a queue like people in line: the first person in is the first person out.
//
// Key features:
//   - Only the front and back elements can be accessed (no random access or indexing).
//   - Use push() to add at the back, pop() to remove from the front.
//   - Use front() and back() to access/change the front and back elements.
//   - Use size() to get the number of elements, and empty() to check if the queue is empty.

#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
	// Create a queue
	queue<string> cars;

	// Add elements (push)
	cars.push("Volvo");
	cars.push("BMW");
	cars.push("Ford");
	cars.push("Mazda");

	// Access the front and back elements
	cout << "Front car: " << cars.front() << endl; // Volvo
	cout << "Back car: " << cars.back() << endl;   // Mazda

	// Change the front and back elements
	cars.front() = "Tesla";
	cars.back() = "VW";
	cout << "After change, front: " << cars.front() << ", back: " << cars.back() << endl;

	// Remove the front element (pop)
	cars.pop();
	cout << "After pop, new front: " << cars.front() << endl; // BMW

	// Queue size
	cout << "Queue size: " << cars.size() << endl;

	// Check if queue is empty
	queue<string> emptyQueue;
	cout << "Is emptyQueue empty? " << emptyQueue.empty() << endl; // 1 (true)
	cout << "Is cars empty? " << cars.empty() << endl;           // 0 (false)

	// Note: You cannot loop through or access elements by index in a queue.

	return 0;
}

// Queues are often used for scheduling, buffering, and breadth-first search algorithms.
// See also: std::stack for LIFO (Last In, First Out) behavior.
