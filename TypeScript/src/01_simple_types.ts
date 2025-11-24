/**
 * TypeScript Simple Types
 * 
 * TypeScript has three main primitive types:
 * - string
 * - number
 * - boolean
 * 
 * Plus additional types: bigint, symbol
 */

// ============================================
// STRING TYPE
// ============================================

let firstName: string = "John";
let lastName: string = 'Doe';
let fullName: string = `${firstName} ${lastName}`; // Template literal

console.log("String examples:");
console.log(fullName); // John Doe

// ============================================
// NUMBER TYPE
// ============================================

// All numbers in TypeScript are floating point
let age: number = 25;
let price: number = 19.99;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

console.log("\nNumber examples:");
console.log(`Age: ${age}`);
console.log(`Price: $${price}`);
console.log(`Hex: ${hex}`);
console.log(`Binary: ${binary}`);
console.log(`Octal: ${octal}`);

// ============================================
// BOOLEAN TYPE
// ============================================

let isActive: boolean = true;
let isComplete: boolean = false;
let hasPermission: boolean = age >= 18;

console.log("\nBoolean examples:");
console.log(`Is active: ${isActive}`);
console.log(`Is complete: ${isComplete}`);
console.log(`Has permission: ${hasPermission}`);

// ============================================
// BIGINT TYPE (ES2020+)
// ============================================

// For very large integers beyond Number.MAX_SAFE_INTEGER
let bigNumber: bigint = 9007199254740991n;
let anotherBig: bigint = BigInt(9007199254740991);

console.log("\nBigInt examples:");
console.log(`Big number: ${bigNumber}`);

// ============================================
// SYMBOL TYPE
// ============================================

// Unique and immutable primitive value
let sym1: symbol = Symbol("key");
let sym2: symbol = Symbol("key");

console.log("\nSymbol examples:");
console.log(`Symbols are unique: ${sym1 === sym2}`); // false

// ============================================
// TYPE SAFETY EXAMPLES
// ============================================

function addNumbers(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `Hello, ${name}!`;
}

function isAdult(age: number): boolean {
  return age >= 18;
}

console.log("\nType-safe functions:");
console.log(addNumbers(10, 20)); // 30
console.log(greet("Alice")); // Hello, Alice!
console.log(isAdult(25)); // true

// ============================================
// TYPE ERRORS (These would cause compile errors)
// ============================================

// Uncommenting these would cause TypeScript errors:
// let wrongType: string = 42; // Error: Type 'number' is not assignable to type 'string'
// addNumbers("10", 20); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
// let badBoolean: boolean = "yes"; // Error: Type 'string' is not assignable to type 'boolean'

// ============================================
// PRACTICAL EXAMPLES
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const product: Product = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  inStock: true
};

function displayProduct(product: Product): void {
  console.log("\nProduct Information:");
  console.log(`ID: ${product.id}`);
  console.log(`Name: ${product.name}`);
  console.log(`Price: $${product.price}`);
  console.log(`In Stock: ${product.inStock ? 'Yes' : 'No'}`);
}

displayProduct(product);

// ============================================
// HELPER FUNCTIONS FOR TESTING
// ============================================

export function add(a: number, b: number): number {
  return a + b;
}

export function concatenate(str1: string, str2: string): string {
  return str1 + str2;
}

export function negate(value: boolean): boolean {
  return !value;
}

export { firstName, age, isActive, product };
