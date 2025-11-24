/**
 * TypeScript Arrays
 * 
 * Arrays can be typed in two ways:
 * 1. Type[] - simpler syntax
 * 2. Array<Type> - generic syntax
 */

// ============================================
// ARRAY DECLARATION
// ============================================

// Method 1: Type[]
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Alice", "Bob", "Charlie"];
const flags: boolean[] = [true, false, true];

// Method 2: Array<Type>
const scores: Array<number> = [95, 87, 92];
const cities: Array<string> = ["NYC", "LA", "Chicago"];

console.log("Arrays:");
console.log(`Numbers: [${numbers.join(', ')}]`);
console.log(`Names: [${names.join(', ')}]`);

// ============================================
// READONLY ARRAYS
// ============================================

// Readonly arrays cannot be modified
const readonlyNumbers: readonly number[] = [1, 2, 3];
const readonlyNames: ReadonlyArray<string> = ["Alice", "Bob"];

console.log("\nReadonly arrays:");
console.log(`Readonly: [${readonlyNumbers.join(', ')}]`);

// These would cause errors:
// readonlyNumbers.push(4); // Error!
// readonlyNumbers[0] = 10; // Error!

// ============================================
// TYPE INFERENCE
// ============================================

// TypeScript infers array types
const inferredNumbers = [1, 2, 3]; // number[]
const inferredStrings = ["a", "b"]; // string[]
const mixed = [1, "two", true]; // (string | number | boolean)[]

console.log("\nInferred types:");
console.log(`Mixed array: [${mixed.join(', ')}]`);

// ============================================
// ARRAY METHODS
// ============================================

const fruits: string[] = ["apple", "banana", "orange"];

// Add elements
fruits.push("grape");
fruits.unshift("mango"); // Add to beginning

// Remove elements
const last = fruits.pop(); // Remove from end
const first = fruits.shift(); // Remove from beginning

console.log("\nArray methods:");
console.log(`Fruits: [${fruits.join(', ')}]`);
console.log(`Last: ${last}, First: ${first}`);

// ============================================
// ARRAY OPERATIONS
// ============================================

const nums = [1, 2, 3, 4, 5];

// Map: transform each element
const doubled = nums.map(n => n * 2);
console.log(`\nDoubled: [${doubled.join(', ')}]`);

// Filter: keep elements that pass test
const evens = nums.filter(n => n % 2 === 0);
console.log(`Evens: [${evens.join(', ')}]`);

// Reduce: accumulate to single value
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(`Sum: ${sum}`);

// Find: get first matching element
const found = nums.find(n => n > 3);
console.log(`Found: ${found}`);

// Some: check if any element passes test
const hasLarge = nums.some(n => n > 3);
console.log(`Has large: ${hasLarge}`);

// Every: check if all elements pass test
const allPositive = nums.every(n => n > 0);
console.log(`All positive: ${allPositive}`);

// ============================================
// MULTI-DIMENSIONAL ARRAYS
// ============================================

// 2D Array
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log("\n2D Array:");
console.log(matrix[0]); // [1, 2, 3]
console.log(`Element [1][1]: ${matrix[1][1]}`); // 5

// 3D Array
const cube: number[][][] = [
  [[1, 2], [3, 4]],
  [[5, 6], [7, 8]]
];

// ============================================
// ARRAY OF OBJECTS
// ============================================

interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

console.log("\nArray of objects:");
people.forEach(person => {
  console.log(`${person.name} is ${person.age} years old`);
});

// Find person by name
const alice = people.find(p => p.name === "Alice");
console.log(`Found: ${alice?.name}`);

// Filter by age
const adults = people.filter(p => p.age >= 30);
console.log(`Adults: ${adults.map(p => p.name).join(', ')}`);

// ============================================
// ARRAY DESTRUCTURING
// ============================================

const colors = ["red", "green", "blue"];

// Destructure array
const [primary, secondary, tertiary] = colors;
console.log(`\nDestructuring:`);
console.log(`Primary: ${primary}`);

// Skip elements
const [, , third] = colors;
console.log(`Third: ${third}`);

// Rest operator
const [head, ...tail] = colors;
console.log(`Head: ${head}, Tail: [${tail.join(', ')}]`);

// ============================================
// SPREAD OPERATOR
// ============================================

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2];
console.log(`\nCombined: [${combined.join(', ')}]`);

// Copy array
const copy = [...arr1];
console.log(`Copy: [${copy.join(', ')}]`);

// Add elements
const extended = [...arr1, 7, 8, 9];
console.log(`Extended: [${extended.join(', ')}]`);

// ============================================
// ARRAY SORTING
// ============================================

const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];

// Sort numbers (ascending)
const sorted = [...unsorted].sort((a, b) => a - b);
console.log(`\nSorted: [${sorted.join(', ')}]`);

// Sort strings
const words = ["banana", "apple", "cherry"];
const sortedWords = [...words].sort();
console.log(`Sorted words: [${sortedWords.join(', ')}]`);

// Sort objects
const products = [
  { name: "Laptop", price: 999 },
  { name: "Phone", price: 699 },
  { name: "Tablet", price: 499 }
];

const byPrice = [...products].sort((a, b) => a.price - b.price);
console.log("\nSorted by price:");
byPrice.forEach(p => console.log(`${p.name}: $${p.price}`));

// ============================================
// ARRAY UTILITIES
// ============================================

// Check if array
console.log(`\nIs array: ${Array.isArray(numbers)}`);
console.log(`Is array: ${Array.isArray("not array")}`);

// Array length
console.log(`Length: ${numbers.length}`);

// Index access
console.log(`First: ${numbers[0]}`);
console.log(`Last: ${numbers[numbers.length - 1]}`);

// Includes
console.log(`Includes 3: ${numbers.includes(3)}`);
console.log(`Includes 10: ${numbers.includes(10)}`);

// IndexOf
console.log(`Index of 3: ${numbers.indexOf(3)}`);
console.log(`Index of 10: ${numbers.indexOf(10)}`); // -1

// Join
console.log(`Joined: ${numbers.join(' - ')}`);

// Slice (doesn't modify original)
const sliced = numbers.slice(1, 3);
console.log(`Sliced [1:3]: [${sliced.join(', ')}]`);

// Splice (modifies original)
const toSplice = [1, 2, 3, 4, 5];
const removed = toSplice.splice(2, 2); // Remove 2 elements starting at index 2
console.log(`After splice: [${toSplice.join(', ')}]`);
console.log(`Removed: [${removed.join(', ')}]`);

// ============================================
// EXPORTED FUNCTIONS FOR TESTING
// ============================================

export function sumArray(arr: number[]): number {
  return arr.reduce((sum, n) => sum + n, 0);
}

export function filterEvens(arr: number[]): number[] {
  return arr.filter(n => n % 2 === 0);
}

export function doubleArray(arr: number[]): number[] {
  return arr.map(n => n * 2);
}

export function findMax(arr: number[]): number {
  return Math.max(...arr);
}

export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function sortAscending(arr: number[]): number[] {
  return [...arr].sort((a, b) => a - b);
}

export { people, matrix };
