/**
 * TypeScript Type Assignment
 * 
 * Two ways to assign types:
 * 1. EXPLICIT - Writing out the type
 * 2. IMPLICIT (Inference) - TypeScript guesses the type
 */

// ============================================
// EXPLICIT TYPE ASSIGNMENT
// ============================================

// Explicitly declare the type
let explicitString: string = "Hello";
let explicitNumber: number = 42;
let explicitBoolean: boolean = true;

console.log("Explicit types:");
console.log(`String: ${explicitString}`);
console.log(`Number: ${explicitNumber}`);
console.log(`Boolean: ${explicitBoolean}`);

// ============================================
// IMPLICIT TYPE ASSIGNMENT (Type Inference)
// ============================================

// TypeScript automatically infers the type
let implicitString = "World"; // inferred as string
let implicitNumber = 100; // inferred as number
let implicitBoolean = false; // inferred as boolean

console.log("\nImplicit types (inferred):");
console.log(`String: ${implicitString}`);
console.log(`Number: ${implicitNumber}`);
console.log(`Boolean: ${implicitBoolean}`);

// These would cause errors:
// implicitString = 123; // Error: Type 'number' is not assignable to type 'string'
// implicitNumber = "text"; // Error: Type 'string' is not assignable to type 'number'

// ============================================
// WHEN TO USE EACH
// ============================================

// EXPLICIT - Use when:
// 1. Variable is declared without initialization
let futureValue: string;
futureValue = "assigned later";

// 2. Function parameters (always explicit)
function greet(name: string, age: number): string {
  return `${name} is ${age} years old`;
}

// 3. Function return types (optional but recommended)
function multiply(a: number, b: number): number {
  return a * b;
}

// 4. When you want to be extra clear
let explicitPrice: number = 19.99;

// IMPLICIT - Use when:
// 1. Value is immediately assigned and type is obvious
let message = "Hello TypeScript"; // clearly a string
let count = 0; // clearly a number
let isReady = true; // clearly a boolean

// 2. Complex types that TypeScript can infer
let inferredArray = [1, 2, 3]; // number[]
let inferredObject = { name: "John", age: 30 }; // { name: string; age: number; }

console.log("\nFunction examples:");
console.log(greet("Alice", 25));
console.log(`Multiply: ${multiply(5, 6)}`);

// ============================================
// TYPE INFERENCE IN PRACTICE
// ============================================

// Simple inference
let fruit = "apple"; // string
let quantity = 5; // number
let available = true; // boolean

// Array inference
let numbers = [1, 2, 3]; // number[]
let names = ["Alice", "Bob"]; // string[]
let mixed = [1, "two", true]; // (string | number | boolean)[]

// Object inference
let person = {
  name: "John",
  age: 30,
  active: true
}; // { name: string; age: number; active: boolean; }

// Function inference
const add = (a: number, b: number) => a + b; // infers return type: number
const getMessage = () => "Hello"; // infers return type: string

console.log("\nInferred types in action:");
console.log(`Fruit: ${fruit}`);
console.log(`Numbers: [${numbers.join(', ')}]`);
console.log(`Person: ${person.name}, ${person.age}`);
console.log(`Add result: ${add(10, 20)}`);

// ============================================
// BEST PRACTICES
// ============================================

// ✅ GOOD: Explicit for function parameters and returns
function calculateTotal(price: number, tax: number): number {
  return price + tax;
}

// ✅ GOOD: Implicit when obvious
let total = calculateTotal(100, 10); // number (inferred)

// ✅ GOOD: Explicit when declaring without initializing
let userId: string;
userId = "user123";

// ❌ AVOID: Being redundant
let obviousString: string = "hello"; // type is obvious, can be implicit
// Better: let obviousString = "hello";

// ❌ AVOID: Implicit for function parameters
// function bad(x, y) { return x + y; } // Error: Parameter implicitly has 'any' type

// ============================================
// NOTICEABLE TYPE INFERENCE
// ============================================

// TypeScript is smart about inference
let smart = Math.random() > 0.5 ? "string" : 100; // string | number
let conditional = true ? 10 : 20; // number (both are numbers)

// Inference with const vs let
const constValue = "hello"; // type: "hello" (literal type)
let letValue = "hello"; // type: string (wider type)

console.log("\nAdvanced inference:");
console.log(`Smart type: ${smart}`);
console.log(`Conditional: ${conditional}`);

// ============================================
// EXPORTED FUNCTIONS FOR TESTING
// ============================================

export function explicitAdd(a: number, b: number): number {
  return a + b;
}

export const implicitAdd = (a: number, b: number) => a + b; // return type inferred

export function inferReturnType(value: number) {
  return value * 2; // return type inferred as number
}

export const explicitData: { name: string; count: number } = {
  name: "Test",
  count: 100
};

export const implicitData = {
  name: "Test",
  count: 100
}; // type inferred

// ============================================
// TYPE WIDENING AND NARROWING
// ============================================

// Widening: const -> let
const narrowString = "hello"; // type: "hello"
let wideString = narrowString; // type: string

// Best practice: Be explicit when needed, implicit when clear
let userInput: string | number; // explicit union
userInput = "text";
userInput = 123;

export { narrowString, wideString, userInput };
