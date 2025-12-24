/**
 * TypeScript Tuples
 * 
 * Tuples are typed arrays with a pre-defined length and types for each index.
 * They allow each element to have a different type.
 */

// ============================================
// BASIC TUPLES
// ============================================

// Define a tuple
let person1: [string, number];
person1 = ["Alice", 25];

console.log("Basic tuple:");
console.log(`Name: ${person1[0]}, Age: ${person1[1]}`);

// Access by index
const name1 = person1[0]; // string
const age = person1[1]; // number

// This would cause an error:
// person1 = [25, "Alice"]; // Error: wrong order
// person1 = ["Alice", "25"]; // Error: wrong type

// ============================================
// TUPLE WITH DIFFERENT TYPES
// ============================================

// Multiple different types
let user2: [number, string, boolean];
user2 = [1, "John", true];

console.log("\nTuple with multiple types:");
console.log(`ID: ${user2[0]}, Name: ${user2[1]}, Active: ${user2[2]}`);

// ============================================
// READONLY TUPLES
// ============================================

// Immutable tuples
const readonlyTuple: readonly [string, number] = ["Alice", 30];

console.log(`\nReadonly tuple: ${readonlyTuple[0]}, ${readonlyTuple[1]}`);

// These would cause errors:
// readonlyTuple[0] = "Bob"; // Error: readonly
// readonlyTuple.push("extra"); // Error: readonly

// ============================================
// NAMED TUPLES
// ============================================

// TypeScript 4.0+ allows named tuple elements for better readability
type Point = [x: number, y: number];
type Range1 = [min: number, max: number];

const point: Point = [10, 20];
const range1: Range1 = [0, 100];

console.log("\nNamed tuples:");
console.log(`Point: (${point[0]}, ${point[1]})`);
console.log(`Range: ${range1[0]} to ${range1[1]}`);

// ============================================
// OPTIONAL TUPLE ELEMENTS
// ============================================

// Optional elements (must be at the end)
type OptionalTuple = [string, number?];

const tuple1: OptionalTuple = ["Alice"];
const tuple2: OptionalTuple = ["Bob", 30];

console.log("\nOptional tuple elements:");
console.log(`Tuple 1: ${tuple1[0]}, ${tuple1[1] ?? 'no age'}`);
console.log(`Tuple 2: ${tuple2[0]}, ${tuple2[1]}`);

// ============================================
// REST ELEMENTS IN TUPLES
// ============================================

// Variable-length tuple
type StringNumberBooleans = [string, number, ...boolean[]];

const tuple3: StringNumberBooleans = ["test", 1];
const tuple4: StringNumberBooleans = ["test", 1, true, false, true];

console.log("\nRest elements:");
console.log(`Tuple 3: ${tuple3.join(', ')}`);
console.log(`Tuple 4: ${tuple4.join(', ')}`);

// ============================================
// DESTRUCTURING TUPLES
// ============================================

const coordinates: [number, number, number] = [10, 20, 30];

// Destructure tuple
const [x, y, z] = coordinates;
console.log(`\nDestructured: x=${x}, y=${y}, z=${z}`);

// Skip elements
const [first, , third] = coordinates;
console.log(`First: ${first}, Third: ${third}`);

// ============================================
// TUPLES vs ARRAYS
// ============================================

// Array: same type, any length
const numberArray: number[] = [1, 2, 3, 4, 5];

// Tuple: different types, fixed length
const fixedTuple: [string, number, boolean] = ["text", 42, true];

console.log("\nTuple vs Array:");
console.log(`Array: [${numberArray.join(', ')}]`);
console.log(`Tuple: [${fixedTuple.join(', ')}]`);

// ============================================
// PRACTICAL EXAMPLES
// ============================================

// RGB Color
type RGB = [red: number, green: number, blue: number];

const red: RGB = [255, 0, 0];
const green: RGB = [0, 255, 0];
const blue: RGB = [0, 0, 255];

console.log("\nRGB Colors:");
console.log(`Red: rgb(${red.join(', ')})`);
console.log(`Green: rgb(${green.join(', ')})`);
console.log(`Blue: rgb(${blue.join(', ')})`);

// Database record
type DBRecord1 = [id: number, name: string, createdAt: Date];

const record: DBRecord1 = [1, "User", new Date()];
console.log(`\nDB Record: ID=${record[0]}, Name=${record[1]}`);

// Key-value pair
type KeyValue = [string, any];

const setting: KeyValue = ["theme", "dark"];
const config1: KeyValue = ["maxItems", 100];

console.log("\nKey-Value pairs:");
console.log(`${setting[0]}: ${setting[1]}`);
console.log(`${config1[0]}: ${config1[1]}`);

// ============================================
// TUPLE METHODS
// ============================================

const tuple: [string, number, boolean] = ["test", 42, true];

// Tuples inherit array methods
console.log("\nTuple methods:");
console.log(`Length: ${tuple.length}`);
console.log(`Includes 42: ${tuple.includes(42)}`);
console.log(`Index of 'test': ${tuple.indexOf("test")}`);
console.log(`Joined: ${tuple.join(' | ')}`);

// Map over tuple (returns array)
const mapped = tuple.map(item => typeof item);
console.log(`Types: [${mapped.join(', ')}]`);

// ============================================
// FUNCTION RETURNING TUPLE
// ============================================

function getUser(): [string, number, boolean] {
  return ["Alice", 25, true];
}

const [userName1, userAge, userActive] = getUser();
console.log(`\nUser: ${userName1}, ${userAge}, active: ${userActive}`);

// Function with tuple parameter
function displayCoordinates([x, y]: [number, number]): void {
  console.log(`Coordinates: (${x}, ${y})`);
}

displayCoordinates([100, 200]);

// ============================================
// TUPLE TYPES AS FUNCTION PARAMETERS
// ============================================

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

const original: [string, number] = ["hello", 42];
const swapped = swap(original);

console.log(`\nOriginal: [${original.join(', ')}]`);
console.log(`Swapped: [${swapped.join(', ')}]`);

// ============================================
// COMPLEX TUPLE EXAMPLES
// ============================================

// HTTP Response
type HTTPResponse = [
  statusCode: number,
  body: string,
  headers: Record<string, string>
];

const response: HTTPResponse = [
  200,
  "Success",
  { "Content-Type": "application/json" }
];

console.log(`\nHTTP Response: ${response[0]} - ${response[1]}`);

// Geographic coordinate with optional altitude
type Coordinate = [latitude: number, longitude: number, altitude?: number];

const location1: Coordinate = [40.7128, -74.0060];
const location2: Coordinate = [40.7128, -74.0060, 10];

console.log(`Location 1: ${location1[0]}, ${location1[1]}`);
console.log(`Location 2: ${location2[0]}, ${location2[1]}, ${location2[2]}m`);

// ============================================
// TUPLE VALIDATION
// ============================================

function isValidRGB(color: any): color is RGB {
  return (
    Array.isArray(color) &&
    color.length === 3 &&
    color.every(n => typeof n === 'number' && n >= 0 && n <= 255)
  );
}

const testColor1 = [255, 0, 0];
const testColor2 = [256, 0, 0];

console.log("\nRGB Validation:");
console.log(`[255, 0, 0] is valid: ${isValidRGB(testColor1)}`);
console.log(`[256, 0, 0] is valid: ${isValidRGB(testColor2)}`);

