/**
 * TypeScript Casting (Type Assertions)
 * 
 * Type casting allows you to override TypeScript's inferred type.
 * Use with caution - you're telling TypeScript "trust me, I know better".
 */

// ============================================
// AS SYNTAX (PREFERRED)
// ============================================

// Basic casting with 'as'
let someValue: unknown = "hello world";
let strLength: number = (someValue as string).length;

console.log(`String length: ${strLength}`);

// DOM element casting
// const inputElement = document.getElementById("username") as HTMLInputElement;
// Now we can safely access .value
// console.log(inputElement.value);

// const canvas = document.querySelector("canvas") as HTMLCanvasElement;
// Now we can get context
// const ctx = canvas.getContext("2d");

// ============================================
// ANGLE BRACKET SYNTAX (JSX INCOMPATIBLE)
// ============================================

// Alternative syntax (doesn't work in .tsx files)
let value: unknown = "test";
let valueLength: number = (<string>value).length;

console.log(`Value length: ${valueLength}`);

// ============================================
// CASTING WITH INTERFACES
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
}

// API response as unknown
const apiResponse: unknown = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

// Cast to User interface
const user = apiResponse as User;
console.log(`\nUser: ${user.name} (${user.email})`);

// ============================================
// DOUBLE CASTING (ESCAPE HATCH)
// ============================================

// Sometimes you need to cast through unknown first
// This is a sign you might be doing something wrong!

const num = 42;
// const str = num as string; // Error: not compatible

// Double cast (use sparingly!)
const str = num as unknown as string;
console.log(`Forced cast: ${str}`);

// ============================================
// CONST ASSERTIONS
// ============================================

// Without const assertion
// let obj1 = { name: "Alice", age: 30 };
// obj1.name is string, obj1.age is number

// With const assertion - makes it deeply readonly and literal
let obj2 = { name: "Alice", age: 30 } as const;
// obj2.name is "Alice", obj2.age is 30
// obj2.name = "Bob"; // Error: readonly

console.log(`\nConst object: ${obj2.name}`);

// Array with const assertion
// const colors1 = ["red", "green", "blue"];
// Type: string[]

const colors2 = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

console.log(`Colors: ${colors2.join(", ")}`);

// Tuple with const assertion
const point = [10, 20] as const;
// Type: readonly [10, 20]
console.log(`Point: (${point[0]}, ${point[1]})`);

// ============================================
// NON-NULL ASSERTION (!)
// ============================================

// Tell TypeScript a value is not null/undefined
function processValue(value: string | null): void {
  // Non-null assertion operator
  const length = value!.length;  // Assumes value is not null
  console.log(`Length: ${length}`);
}

// Use with caution - runtime error if actually null!
processValue("hello");

// Common with DOM
// const element = document.getElementById("myId")!;
// Tells TypeScript element definitely exists
// element.innerHTML = "content";

// Array access
const arr = [1, 2, 3];
const first = arr[0]!;  // Asserts first element exists
console.log(`First: ${first}`);

// ============================================
// CASTING IN CONDITIONALS
// ============================================

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processUnknown(value: unknown): void {
  if (isString(value)) {
    // Type guard - no casting needed
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    // Type guard
    console.log(value.toFixed(2));
  } else {
    // Last resort casting
    console.log(String(value));
  }
}

processUnknown("hello");
processUnknown(3.14159);

// ============================================
// SATISFIES OPERATOR (TS 4.9+)
// ============================================

// Validates type without widening
type Color = "red" | "green" | "blue";

// Without satisfies - type is too wide
// const color1: Color = "red";

// With satisfies - validates AND keeps literal type
const color2 = "red" satisfies Color;
// color2 is "red", not Color

console.log(`\nColor: ${color2}`);

// Object with satisfies
type Config = {
  host: string;
  port: number;
  ssl?: boolean;
};

const config = {
  host: "localhost",
  port: 3000,
  ssl: true
} satisfies Config;

// config.host is "localhost", not string
// Still validated against Config type

console.log(`Config: ${config.host}:${config.port}`);

// ============================================
// CASTING ARRAYS
// ============================================

// Unknown array to typed array
const unknownArray: unknown = [1, 2, 3, 4, 5];
const numberArray = unknownArray as number[];

console.log(`\nArray sum: ${numberArray.reduce((a, b) => a + b, 0)}`);

// Array of one type to array of another (related) type
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const dogs: Dog[] = [
  { name: "Buddy", breed: "Golden Retriever" },
  { name: "Max", breed: "German Shepherd" }
];

// Widening cast (safe)
const animals: Animal[] = dogs;
console.log(`Animals: ${animals.map(a => a.name).join(", ")}`);

// Narrowing cast (needs explicit cast)
const animals2: Animal[] = [{ name: "Unknown" }];
// const dogs2: Dog[] = animals2; // Error
const dogs2: Dog[] = animals2 as Dog[]; // Explicit cast
console.log(`Dogs2: ${dogs2.length}`);

// ============================================
// CASTING WITH GENERICS
// ============================================

function parseJSON<T>(json: string): T {
  return JSON.parse(json) as T;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const productJson = '{"id": 1, "name": "Laptop", "price": 999}';
const product = parseJSON<Product>(productJson);

console.log(`\nProduct: ${product.name} - $${product.price}`);

// ============================================
// TYPE PREDICATES VS CASTING
// ============================================

// Better: Type predicate (runtime check)
function isProduct(obj: any): obj is Product {
  return (
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.price === "number"
  );
}

function processData(data: unknown): void {
  if (isProduct(data)) {
    // TypeScript knows data is Product
    console.log(`Safe: ${data.name}`);
  } else {
    console.log("Not a product");
  }
}

processData({ id: 1, name: "Phone", price: 599 });
processData({ invalid: "data" });

// Worse: Direct casting (no runtime check)
// function processDataUnsafe(data: unknown): void {
//   const product = data as Product;
//   console.log(product.name); // Might crash if data is wrong!
// }

// ============================================
// CASTING PROMISES
// ============================================

// async function fetchUser(id: number): Promise<User> {
//   // Simulated API call
//   const response = await fetch(`/api/users/${id}`);
//   const data = await response.json();
//   return data as User; // Cast response to User
// }

// Better: validate before casting
// async function fetchUserSafe(id: number): Promise<User | null> {
//   const response = await fetch(`/api/users/${id}`);
//   const data = await response.json();
//   
//   if (isUser(data)) {
//     return data;
//   }
//   return null;
// }

function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
}

// ============================================
// PRACTICAL PATTERNS
// ============================================

// Form data casting - example pattern
// interface FormData {
//   username: string;
//   email: string;
//   age: number;
// }

// function handleFormSubmit(event: Event): void {
//   const target = event.target as HTMLFormElement;
//   
//   const formData: FormData = {
//     username: (target.elements.namedItem("username") as HTMLInputElement).value,
//     email: (target.elements.namedItem("email") as HTMLInputElement).value,
//     age: parseInt((target.elements.namedItem("age") as HTMLInputElement).value)
//   };
//   
//   console.log(`\nForm data:`, formData);
// }

// Local storage with casting - example pattern
// function saveToStorage<T>(key: string, value: T): void {
//   localStorage.setItem(key, JSON.stringify(value));
// }

// function loadFromStorage<T>(key: string): T | null {
//   const item = localStorage.getItem(key);
//   if (!item) return null;
//   return JSON.parse(item) as T;
// }

// Error casting - example pattern
class CustomError extends Error {
  code: number;
  
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

// function handleError(error: unknown): void {
//   if (error instanceof CustomError) {
//     console.log(`Error ${error.code}: ${error.message}`);
//   } else if (error instanceof Error) {
//     console.log(`Error: ${error.message}`);
//   } else {
//     console.log(`Unknown error: ${String(error)}`);
//   }
// }

const err = new CustomError("Test error", 500);
console.log(`\nCustom error: ${err.code}`);

// ============================================
// BEST PRACTICES
// ============================================

// ❌ BAD: Casting without validation
// function badPractice(data: unknown): void {
//   const user = data as User;
//   console.log(user.name.toUpperCase()); // Might crash!
// }

// ✅ GOOD: Validate then cast
// function goodPractice(data: unknown): void {
//   if (isUser(data)) {
//     console.log(data.name.toUpperCase());
//   }
// }

// ❌ BAD: Double casting unnecessarily
// const badCast = (123 as unknown) as string;

// ✅ GOOD: Use proper type guards
function convertToString(value: number | string): string {
  return typeof value === "string" ? value : value.toString();
}

console.log(`\nConverted: ${convertToString(42)}`);

// ============================================
// WHEN TO USE CASTING
// ============================================

// 1. Working with DOM APIs (TypeScript can't know HTML structure)
// 2. Deserializing JSON from APIs
// 3. Using libraries without proper types
// 4. Type assertions that you've validated at runtime
// 5. Narrowing types when TypeScript can't infer correctly

// AVOID casting when:
// - You can use type guards instead
// - You're not sure about the runtime type
// - You're working around a design problem
// - The cast requires going through 'unknown'

export { isUser, isProduct, parseJSON, convertToString };
export type { User, Product };
