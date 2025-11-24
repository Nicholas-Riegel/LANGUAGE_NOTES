/**
 * TypeScript Type Guards
 * 
 * Type guards are runtime checks that narrow down the type of a variable
 * within a conditional block. Essential for working with union types safely.
 */

// ============================================================================
// 1. TYPEOF TYPE GUARDS
// ============================================================================

// Built-in typeof operator
function printValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}

// Works with: "string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function"
// function processInput(input: string | number | boolean) {
//   if (typeof input === "string") {
//     return input.trim();
//   } else if (typeof input === "number") {
//     return input * 2;
//   } else {
//     return !input;
//   }
// }

// ============================================================================
// 2. INSTANCEOF TYPE GUARDS
// ============================================================================

class Dog {
  bark() {
    return "Woof!";
  }
}

class Cat {
  meow() {
    return "Meow!";
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    console.log(animal.bark());
  } else {
    console.log(animal.meow());
  }
}

// Works with Error types
// function handleError(error: Error | string) {
//   if (error instanceof Error) {
//     console.log(`Error: ${error.message}`);
//     console.log(error.stack);
//   } else {
//     console.log(`Error: ${error}`);
//   }
// }

// ============================================================================
// 3. IN OPERATOR TYPE GUARDS
// ============================================================================

interface Car {
  drive(): void;
  wheels: number;
}

interface Boat {
  sail(): void;
  hull: string;
}

function operate(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    // TypeScript knows vehicle is Car
    vehicle.drive();
    console.log(`Has ${vehicle.wheels} wheels`);
  } else {
    // TypeScript knows vehicle is Boat
    vehicle.sail();
    console.log(`Hull type: ${vehicle.hull}`);
  }
}

// Check for optional properties
// interface User {
//   name: string;
//   email?: string;
//   phone?: string;
// }

// function contactUser(user: User) {
//   if ("email" in user && user.email) {
//     console.log(`Email: ${user.email}`);
//   } else if ("phone" in user && user.phone) {
//     console.log(`Phone: ${user.phone}`);
//   }
// }

// ============================================================================
// 4. CUSTOM TYPE GUARDS (USER-DEFINED)
// ============================================================================

// Type predicate with "is" keyword
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

// This is a type guard function
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// function move(pet: Fish | Bird) {
//   if (isFish(pet)) {
//     pet.swim(); // TypeScript knows pet is Fish
//   } else {
//     pet.fly(); // TypeScript knows pet is Bird
//   }
// }

// Type guard for null/undefined
function isNonNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// const values = [1, 2, null, 3, undefined, 4];
// const nonNullValues = values.filter(isNonNull); // Type: number[]

// Type guard for string arrays
// function isStringArray(value: unknown): value is string[] {
//   return (
//     Array.isArray(value) &&
//     value.every(item => typeof item === "string")
//   );
// }

// ============================================================================
// 5. DISCRIMINATED UNIONS
// ============================================================================

// Tagged union with literal type
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

// TypeScript uses the "kind" property to narrow the type
function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius ** 2;
  }
}

// Exhaustiveness checking with never
// function assertNever(value: never): never {
//   throw new Error(`Unexpected value: ${value}`);
// }

// function getPerimeter(shape: Shape): number {
//   switch (shape.kind) {
//     case "square":
//       return shape.size * 4;
//     case "rectangle":
//       return 2 * (shape.width + shape.height);
//     case "circle":
//       return 2 * Math.PI * shape.radius;
//     default:
//       return assertNever(shape); // Ensures all cases handled
//   }
// }

// ============================================================================
// 6. EQUALITY NARROWING
// ============================================================================

// function example(x: string | number, y: string | boolean) {
//   if (x === y) {
//     // x and y must both be string here
//     console.log(x.toUpperCase());
//     console.log(y.toUpperCase());
//   }
// }

// Null/undefined checks
// function printLength(value: string | null | undefined) {
//   // Traditional check
//   if (value !== null && value !== undefined) {
//     console.log(value.length);
//   }
  
//   // Simplified check (null == undefined is true)
//   if (value != null) {
//     console.log(value.length);
//   }
// }

// ============================================================================
// 7. TRUTHINESS NARROWING
// ============================================================================

// function printAll(values: string | string[] | null) {
//   // Checks if values is truthy (not null, undefined, 0, "", false, NaN)
//   if (values) {
//     if (typeof values === "string") {
//       console.log(values);
//     } else {
//       for (const value of values) {
//         console.log(value);
//       }
//     }
//   }
// }

// Be careful with truthiness
// function multiplyValue(a: number | undefined, b: number): number {
//   // This fails when a = 0 (falsy but valid)
//   // if (!a) {
//   //   return b;
//   // }
  
//   // Better: explicit check
//   if (a === undefined) {
//     return b;
//   }
//   return a * b;
// }

// ============================================================================
// 8. CONTROL FLOW ANALYSIS
// ============================================================================

// function processValue(value: string | number | null) {
//   if (value === null) {
//     return;
//   }
//   // value is string | number here
  
//   if (typeof value === "string") {
//     console.log(value.toUpperCase());
//     return;
//   }
//   // value is number here
//   console.log(value.toFixed(2));
// }

// Type narrowing with assignments
// function example2() {
//   let x: string | number = Math.random() < 0.5 ? "hello" : 100;
  
//   if (typeof x === "string") {
//     x = 1; // x is now number
//   }
//   // x is number here (not string | number)
//   console.log(x.toFixed(2));
// }

// ============================================================================
// 9. ASSERTION FUNCTIONS
// ============================================================================

// Assertion function that throws
// function assert(condition: unknown, message: string): asserts condition {
//   if (!condition) {
//     throw new Error(message);
//   }
// }

// Type predicate assertion
// function assertIsString(value: unknown): asserts value is string {
//   if (typeof value !== "string") {
//     throw new Error("Value must be a string");
//   }
// }

// function processString(value: unknown) {
//   assertIsString(value);
//   // TypeScript knows value is string after this point
//   console.log(value.toUpperCase());
// }

// Assert non-null
// function assertNonNull<T>(value: T | null | undefined): asserts value is T {
//   if (value === null || value === undefined) {
//     throw new Error("Value is null or undefined");
//   }
// }

// ============================================================================
// 10. PRACTICAL PATTERNS
// ============================================================================

// API Response handling
interface SuccessResponse {
  status: "success";
  data: unknown;
}

interface ErrorResponse {
  status: "error";
  message: string;
  code: number;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log("Data:", response.data);
  } else {
    console.error(`Error ${response.code}: ${response.message}`);
  }
}

// Type guard for object with specific properties
interface UserProfile {
  id: number;
  username: string;
  email: string;
}

function isUserProfile(obj: unknown): obj is UserProfile {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof (obj as UserProfile).id === "number" &&
    "username" in obj &&
    typeof (obj as UserProfile).username === "string" &&
    "email" in obj &&
    typeof (obj as UserProfile).email === "string"
  );
}

// Parsing external data safely
// function parseUserProfile(data: unknown): UserProfile | null {
//   if (isUserProfile(data)) {
//     return data;
//   }
//   return null;
// }

// Generic type guard
// function hasProperty<T, K extends string>(
//   obj: T,
//   key: K
// ): obj is T & Record<K, unknown> {
//   return typeof obj === "object" && obj !== null && key in obj;
// }

// function getPropertyValue<T, K extends string>(
//   obj: T,
//   key: K
// ): unknown | undefined {
//   if (hasProperty(obj, key)) {
//     return obj[key];
//   }
//   return undefined;
// }

// Result type pattern with type guards
// type Success<T> = { success: true; value: T };
// type Failure = { success: false; error: string };
// type Result<T> = Success<T> | Failure;

// function isSuccess<T>(result: Result<T>): result is Success<T> {
//   return result.success === true;
// }

// function processResult<T>(result: Result<T>): T | null {
//   if (isSuccess(result)) {
//     return result.value;
//   }
//   console.error(result.error);
//   return null;
// }

// Array type guards
// function isNumberArray(value: unknown): value is number[] {
//   return Array.isArray(value) && value.every(item => typeof item === "number");
// }

// function sumArray(value: unknown): number {
//   if (isNumberArray(value)) {
//     return value.reduce((sum, num) => sum + num, 0);
//   }
//   return 0;
// }

// ============================================================================
// 11. BEST PRACTICES
// ============================================================================

/*
✅ DO:
- Use discriminated unions for complex type narrowing
- Create custom type guards for reusable type checks
- Use assertion functions for validation that throws
- Prefer explicit checks over truthiness for numbers
- Use switch statements with exhaustiveness checking

❌ DON'T:
- Rely on truthiness for checking numbers (0 is falsy)
- Use type assertions instead of proper type guards
- Create type guards that lie about the type
- Ignore the possibility of null/undefined
- Use "any" to bypass type checking

💡 TIPS:
- Type guards run at runtime, types are compile-time only
- Use "is" keyword for type predicate functions
- Combine multiple type guards for complex scenarios
- Use control flow analysis to your advantage
- Consider using Zod or io-ts for complex runtime validation
*/

// Complex validation example
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function isProduct(obj: unknown): obj is Product {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  
  const product = obj as Product;
  
  return (
    typeof product.id === "number" &&
    typeof product.name === "string" &&
    typeof product.price === "number" &&
    product.price >= 0 &&
    typeof product.inStock === "boolean"
  );
}

// function validateAndProcessProduct(data: unknown): void {
//   if (isProduct(data)) {
//     console.log(`Product: ${data.name} - $${data.price}`);
//     console.log(`In stock: ${data.inStock ? "Yes" : "No"}`);
//   } else {
//     console.error("Invalid product data");
//   }
// }

// Export for use
export {
  printValue,
  makeSound,
  operate,
  isFish,
  isNonNull,
  calculateArea,
  handleResponse,
  isUserProfile,
  isProduct,
};
