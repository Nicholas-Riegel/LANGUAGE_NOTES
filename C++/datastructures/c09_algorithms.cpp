
// C++ STL Algorithms Summary
// Source: https://www.w3schools.com/cpp/cpp_algorithms.asp
//
// The <algorithm> header provides a wide range of functions for sorting, searching, and modifying data in STL containers.
// These functions work with iterators and are highly efficient and expressive.
//
// Key algorithms include: sort, reverse, find, min_element, max_element, copy, fill, upper_bound, etc.

#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // Required for STL algorithms
#include <iterator>  // For std::copy
#include <numeric>   // For std::accumulate
using namespace std;

int main() {
	// --- SORTING ALGORITHMS ---
	vector<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};
	sort(cars.begin(), cars.end()); // Sort alphabetically (ascending)
	cout << "Sorted cars: ";
	for (const auto& car : cars) cout << car << " ";
	cout << endl;

	vector<int> numbers = {1, 7, 3, 5, 9, 2};
	sort(numbers.begin(), numbers.end()); // Sort numerically (ascending)
	cout << "Sorted numbers: ";
	for (int n : numbers) cout << n << " ";
	cout << endl;

	// Sort in reverse order
	sort(numbers.rbegin(), numbers.rend());
	cout << "Reverse sorted numbers: ";
	for (int n : numbers) cout << n << " ";
	cout << endl;

	// Partial sort (from 4th element to end)
	vector<int> nums2 = {1, 7, 3, 5, 9, 2};
	sort(nums2.begin() + 3, nums2.end());
	cout << "Partial sort (from 4th element): ";
	for (int n : nums2) cout << n << " ";
	cout << endl;

	// --- SEARCHING ALGORITHMS ---
	// Find a value
	auto it = find(numbers.begin(), numbers.end(), 3);
	if (it != numbers.end())
		cout << "Found 3 at index: " << distance(numbers.begin(), it) << endl;
	else
		cout << "3 not found" << endl;

	// upper_bound (find first element greater than 5, requires sorted vector)
	sort(numbers.begin(), numbers.end());
	auto it2 = upper_bound(numbers.begin(), numbers.end(), 5);
	if (it2 != numbers.end())
		cout << "First element greater than 5: " << *it2 << endl;
	else
		cout << "No element greater than 5" << endl;

	// min_element and max_element
	auto minIt = min_element(numbers.begin(), numbers.end());
	auto maxIt = max_element(numbers.begin(), numbers.end());
	if (minIt != numbers.end()) cout << "Min: " << *minIt << endl;
	if (maxIt != numbers.end()) cout << "Max: " << *maxIt << endl;

	// --- MODIFYING ALGORITHMS ---
	// Copy elements
	vector<int> copiedNumbers(numbers.size());
	copy(numbers.begin(), numbers.end(), copiedNumbers.begin());
	cout << "Copied numbers: ";
	for (int n : copiedNumbers) cout << n << " ";
	cout << endl;

	// Fill all elements with a value
	fill(copiedNumbers.begin(), copiedNumbers.end(), 35);
	cout << "Filled with 35: ";
	for (int n : copiedNumbers) cout << n << " ";
	cout << endl;

	// Accumulate (sum all elements)
	int sum = accumulate(numbers.begin(), numbers.end(), 0);
	cout << "Sum of numbers: " << sum << endl;

	// Reverse
	reverse(numbers.begin(), numbers.end());
	cout << "Reversed numbers: ";
	for (int n : numbers) cout << n << " ";
	cout << endl;

	// Note: There are many more algorithms in <algorithm> (see C++ reference for full list)
	// https://www.w3schools.com/cpp/cpp_ref_algorithm.asp

	return 0;
}

/*
Best Practices:
- Always #include <algorithm> when using STL algorithms.
- Use algorithms with iterators for maximum flexibility and performance.
- Many algorithms require sorted containers (e.g., upper_bound, binary_search).
- Prefer algorithms over manual loops for clarity and correctness.
*/
