/**
 * TypeScript Arrays
 * 
 * Arrays can be typed in two ways:
 * 1. Type[] - simpler syntax
 * 2. Array<Type> - generic syntax
 * 
 * TypeScript-specific features:
 * - Type annotations for arrays
 * - Readonly arrays
 * - Type inference
 * - Multi-dimensional array types
 * - Array of typed objects
 */

// ============================================
// ARRAY TYPE ANNOTATIONS
// ============================================

// Method 1: Type[] (preferred - more concise)
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Alice", "Bob", "Charlie"];
const flags: boolean[] = [true, false, true];

// Method 2: Array<Type> (generic syntax)
const scores1: Array<number> = [95, 87, 92];
const cities: Array<string> = ["NYC", "LA", "Chicago"];

console.log("Arrays:");
console.log(`Numbers: [${numbers.join(', ')}]`);
console.log(`Names: [${names.join(', ')}]`);

// ============================================
// READONLY ARRAYS (TypeScript-only feature)
// ============================================

// Readonly arrays cannot be modified - enforced at compile time
const readonlyNumbers: readonly number[] = [1, 2, 3];
const readonlyNames: ReadonlyArray<string> = ["Alice", "Bob"];

console.log("\nReadonly arrays:");
console.log(`Readonly: [${readonlyNumbers.join(', ')}]`);

// These would cause TypeScript compile errors:
// readonlyNumbers.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'
// readonlyNumbers[0] = 10; // Error: Index signature in type 'readonly number[]' only permits reading

// Use readonly when you want to prevent modifications (immutability)
// Useful for: function parameters, class properties that shouldn't change

// ============================================
// TYPE INFERENCE
// ============================================

// TypeScript automatically infers array types based on initial values
const inferredNumbers = [1, 2, 3]; // Inferred as number[]
const inferredStrings = ["a", "b"]; // Inferred as string[]
const mixed = [1, "two", true]; // Inferred as (string | number | boolean)[]

console.log("\nInferred types:");
console.log(`Mixed array: [${mixed.join(', ')}]`);

// Empty array inference
const empty = []; // Inferred as any[] - not type safe!
const betterEmpty: string[] = []; // Better: explicitly type empty arrays

// ============================================
// UNION TYPE ARRAYS
// ============================================

// Arrays can hold multiple types using union types
const mixedTypes: (string | number)[] = [1, "two", 3, "four"];
const nullableNumbers: (number | null)[] = [1, 2, null, 4];

console.log(`\nMixed types: [${mixedTypes.join(', ')}]`);

// Array methods with union types maintain type safety
mixedTypes.forEach((item) => {
  if (typeof item === "string") {
    console.log(`String: ${item.toUpperCase()}`);
  } else {
    console.log(`Number: ${item * 2}`);
  }
});


// ============================================
// ARRAY OF TYPED OBJECTS
// ============================================

// Interface defines the shape of objects in the array
interface Person {
  name: string;
  age: number;
}

// TypeScript ensures all objects match the interface
const people: Person[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

console.log("\nArray of objects:");
people.forEach(person => {
  console.log(`${person.name} is ${person.age} years old`);
});

// TypeScript provides autocomplete and type checking for array methods
const alice = people.find(p => p.name === "Alice"); // Type: Person | undefined
console.log(`Found: ${alice?.name}`); // Optional chaining since find might return undefined

const adults = people.filter(p => p.age >= 30); // Type: Person[]
console.log(`Adults: ${adults.map(p => p.name).join(', ')}`);
