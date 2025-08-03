// Create
const fruits = ['apple', 'banana', 'cherry'];

// Access
console.log(fruits[0]);      // 'apple'
console.log(fruits[fruits.length - 1]);  // 'cherry' (JS doesn't have negative indexing)
console.log(fruits.at(-1));  // 'cherry' (modern JS alternative)

// Modify
fruits[1] = 'blueberry';

// Add
fruits.push('date');          // equivalent to append
fruits.splice(1, 0, 'kiwi');  // insert at index 1

// Remove
fruits.splice(fruits.indexOf('apple'), 1);  // remove by value
fruits.pop();                 // last item
fruits.splice(0, 1);          // remove by index

// Slice
console.log(fruits.slice(1, 3));  // elements 1 and 2
console.log(fruits.slice(1));  // elements 1 and onward

// Iterate
for (const fruit of fruits) {
    console.log(fruit);
}

// Check
if (fruits.includes('banana')) {
    console.log('yes');
}

// Length
console.log(fruits.length);

// Count occurrences
const fruitsWithDuplicates = ['apple', 'banana', 'apple', 'cherry'];
const appleCount = fruitsWithDuplicates.filter(fruit => fruit === 'apple').length;
console.log(appleCount);  // Returns 2

// Find index of item
console.log(fruitsWithDuplicates.indexOf('banana'));  // Returns 1

// Extend with another array
fruits.push(...['grape', 'mango']);  // Using spread operator

// Sort array
const numbers = [3, 1, 4, 1, 5];
numbers.sort((a, b) => a - b);  // Sorts in place (numeric sort)
console.log(numbers);

// Sort without modifying original
const originalNumbers = [3, 1, 4, 1, 5];
const sortedNumbers = [...originalNumbers].sort((a, b) => a - b);
console.log(sortedNumbers);

// Reverse array
numbers.reverse();  // Reverses in place
console.log(numbers);

// Clear all items
// fruits.length = 0;  // Removes all items
// fruits.splice(0);   // Alternative way

// Copy array
const fruitsCopy = [...fruits];  // Using spread operator
const fruitsCopy2 = fruits.slice();  // Using slice

// Min, max, sum (for numeric arrays)
const nums = [10, 5, 8, 3, 9];
console.log(Math.min(...nums));
console.log(Math.max(...nums));
console.log(nums.reduce((sum, num) => sum + num, 0));

// Array Comprehension equivalent (using map)
const squares = Array.from({ length: 5 }, (_, x) => x * x);  // [0, 1, 4, 9, 16]

// Spread operator (equivalent to Python's unpacking)
const list1 = [1, 2, 3];
const list2 = [4, 5, 6];

// Combine arrays using spread
const combined = [...list1, ...list2];  // [1, 2, 3, 4, 5, 6]

// Insert elements in the middle
const mixed = [0, ...list1, 99, ...list2, 100];  // [0, 1, 2, 3, 99, 4, 5, 6, 100]

// Spread into function arguments
function addThree(a, b, c) {
    return a + b + c;
}

const result = addThree(...list1);  // Same as addThree(1, 2, 3)

// Destructuring assignment (equivalent to Python's unpacking)
const [first, ...middle] = [1, 2, 3, 4, 5];  // first=1, middle=[2,3,4,5]
const [firstItem, ...rest] = [1, 2, 3, 4, 5];
const lastItem = rest[rest.length - 1];  // Get last item manually
