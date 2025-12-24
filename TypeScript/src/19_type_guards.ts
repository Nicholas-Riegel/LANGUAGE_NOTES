/**
 * TypeScript Type Guards
 * 
 * TYPE GUARDS are functions or expressions that perform runtime checks to narrow down types.
 * They help TypeScript understand what specific type a value is within a conditional block.
 * 
 * WHAT ARE TYPE GUARDS?
 * Type guards bridge the gap between TypeScript's compile-time types and JavaScript's runtime values.
 * At compile time, TypeScript uses type guards to narrow union types (string | number → string).
 * At runtime, type guards perform actual checks to verify the type (typeof value === "string").
 * 
 * WHY USE TYPE GUARDS?
 * - Work safely with union types (string | number | boolean)
 * - Access type-specific properties/methods without errors
 * - Make code more maintainable and type-safe
 * - Enable exhaustiveness checking (ensures all cases handled)
 * - Provide better IDE autocomplete and type inference
 * 
 * HOW TYPE GUARDS WORK:
 * 1. You write a runtime check (typeof, instanceof, in, custom function)
 * 2. TypeScript analyzes the check and narrows the type in that code branch
 * 3. Inside the if block, TypeScript knows the specific type
 * 4. You can safely access type-specific properties/methods
 * 
 * TYPES OF TYPE GUARDS:
 * 1. typeof - Check primitive types (string, number, boolean, etc.)
 * 2. instanceof - Check class instances
 * 3. in - Check if property exists in object
 * 4. Custom type guards - User-defined functions with type predicates (value is Type)
 * 5. Discriminated unions - Use literal type properties to distinguish types
 * 6. Equality narrowing - Compare values to narrow types
 * 7. Truthiness narrowing - Check if value is truthy/falsy
 * 
 * Essential for working with union types safely!
 */

// ============================================================================
// 1. TYPEOF TYPE GUARDS
// ============================================================================

// typeof is JavaScript's built-in operator that returns a string describing the type
// TypeScript recognizes typeof checks and narrows types automatically
function printValue(value: string | number) {
  // typeof returns: "string", "number", "boolean", "undefined", "object", "function", "symbol", "bigint"
  if (typeof value === "string") {
    // TypeScript NARROWS the type to string in this block
    // We can now safely call string methods
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows: if not string, must be number (only other option in union)
    // We can now safely call number methods
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

// instanceof checks if an object is an instance of a specific class
// It checks the prototype chain: object instanceof Constructor
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
  // instanceof performs runtime check: is animal an instance of Dog class?
  if (animal instanceof Dog) {
    // TypeScript narrows animal to Dog type
    console.log(animal.bark()); // Safe to call bark()
  } else {
    // TypeScript narrows animal to Cat type (only other option)
    console.log(animal.meow()); // Safe to call meow()
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

// 'in' operator checks if a property exists in an object: "propertyName" in object
// TypeScript uses this to narrow types based on which properties exist
interface Car {
  drive(): void;
  wheels: number;
}

interface Boat {
  sail(): void;
  hull: string;
}

function operate(vehicle: Car | Boat) {
  // Check if 'drive' property exists in vehicle object
  if ("drive" in vehicle) {
    // TypeScript narrows to Car (only Car has 'drive' property)
    vehicle.drive();
    console.log(`Has ${vehicle.wheels} wheels`);
  } else {
    // TypeScript narrows to Boat (must be Boat if not Car)
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

// CUSTOM TYPE GUARDS are functions YOU create to check for specific types
// They use TYPE PREDICATES ("value is Type") to tell TypeScript what type a value is

// What is "pet is Fish"?
// This is a TYPE PREDICATE - a special return type that tells TypeScript:
// "If this function returns true, then pet is definitely a Fish"

interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

// This is a custom type guard function
// Return type "pet is Fish" is the type predicate
function isFish(pet: Fish | Bird): pet is Fish {
  // Perform runtime check: does this object have a swim method?
  // We use 'as Fish' to tell TypeScript to treat it as Fish for this check
  return (pet as Fish).swim !== undefined;
  
  // IMPORTANT: The function must return a boolean
  // When true, TypeScript narrows the type to Fish
  // When false, TypeScript knows it's NOT Fish (so must be Bird)
}

// HOW TO USE CUSTOM TYPE GUARDS:
// function move(pet: Fish | Bird) {
//   if (isFish(pet)) {
//     // Inside this block, TypeScript KNOWS pet is Fish
//     pet.swim(); // Safe to call swim()
//   } else {
//     // TypeScript KNOWS pet is Bird (not Fish)
//     pet.fly(); // Safe to call fly()
//   }
// }

// WHY USE CUSTOM TYPE GUARDS?
// 1. Reusability - Define once, use everywhere
// 2. Readability - isFish(pet) is clearer than (pet as Fish).swim !== undefined
// 3. Complex checks - Can combine multiple conditions
// 4. Works with any types - Not limited to primitives or classes

// function move(pet: Fish | Bird) {
//   if (isFish(pet)) {
//     pet.swim(); // TypeScript knows pet is Fish
//   } else {
//     pet.fly(); // TypeScript knows pet is Bird
//   }
// }

// GENERIC TYPE GUARD for filtering out null/undefined
// <T> makes this work with any type: isNonNull<string>, isNonNull<number>, etc.
function isNonNull<T>(value: T | null | undefined): value is T {
  // Check if value is neither null nor undefined
  return value !== null && value !== undefined;
  // When true, TypeScript narrows T | null | undefined → T
}

// PRACTICAL USE: Filter arrays to remove null/undefined
// const values = [1, 2, null, 3, undefined, 4];
// const nonNullValues = values.filter(isNonNull); // Type: number[] (no null/undefined!)

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

// DISCRIMINATED UNIONS (also called "tagged unions") are a powerful pattern
// Each type in the union has a common property (the "discriminant") with a literal value
// TypeScript uses this property to automatically narrow the type

// The "kind" property is the DISCRIMINANT - it has a unique literal value for each type
interface Square {
  kind: "square";  // Literal type - MUST be exactly "square"
  size: number;
}

interface Rectangle {
  kind: "rectangle";  // Literal type - MUST be exactly "rectangle"
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";  // Literal type - MUST be exactly "circle"
  radius: number;
}

// Union of the three shape types
type Shape = Square | Rectangle | Circle;

// TypeScript automatically narrows the type based on the "kind" property
function calculateArea(shape: Shape): number {
  // Switch on the discriminant property
  switch (shape.kind) {
    case "square":
      // TypeScript knows shape is Square here (kind can only be "square")
      return shape.size * shape.size;
    case "rectangle":
      // TypeScript knows shape is Rectangle here
      return shape.width * shape.height;
    case "circle":
      // TypeScript knows shape is Circle here
      return Math.PI * shape.radius ** 2;
  }
  // No default needed - TypeScript knows all cases are covered
}

// WHY DISCRIMINATED UNIONS ARE POWERFUL:
// 1. Type-safe - Can't access wrong properties (can't do shape.radius on Square)
// 2. Exhaustive - TypeScript ensures you handle all cases
// 3. Self-documenting - The discriminant makes the type explicit
// 4. Easy to extend - Add new types by adding cases to switch

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

// COMPLEX TYPE GUARD - Validates objects from external sources (APIs, user input)
// This is essential when dealing with data you don't control
interface UserProfile {
  id: number;
  username: string;
  email: string;
}

// Type guard that thoroughly validates an unknown object
function isUserProfile(obj: unknown): obj is UserProfile {
  // STEP-BY-STEP VALIDATION:
  
  // 1. Check if it's an object (typeof obj === "object")
  //    Note: typeof null === "object" in JavaScript, so we check obj !== null
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  
  // At this point, we know obj is an object
  // Now check each required property:
  
  // 2. Check if 'id' property exists AND is a number
  if (!("id" in obj) || typeof (obj as UserProfile).id !== "number") {
    return false;
  }
  
  // 3. Check if 'username' property exists AND is a string
  if (!("username" in obj) || typeof (obj as UserProfile).username !== "string") {
    return false;
  }
  
  // 4. Check if 'email' property exists AND is a string
  if (!("email" in obj) || typeof (obj as UserProfile).email !== "string") {
    return false;
  }
  
  // All checks passed - this is a valid UserProfile!
  return true;
  
  // ALTERNATIVE COMPACT SYNTAX (harder to read but shorter):
  // return (
  //   typeof obj === "object" &&
  //   obj !== null &&
  //   "id" in obj &&
  //   typeof (obj as UserProfile).id === "number" &&
  //   "username" in obj &&
  //   typeof (obj as UserProfile).username === "string" &&
  //   "email" in obj &&
  //   typeof (obj as UserProfile).email === "string"
  // );
}

// USAGE: Safely parse API responses or user input
// function parseUserProfile(data: unknown): UserProfile | null {
//   if (isUserProfile(data)) {
//     // TypeScript knows data is UserProfile here
//     return data;
//   }
//   // Invalid data
//   return null;
// }

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
- Use discriminated unions for complex type narrowing (kind: "square" | "circle")
- Create custom type guards for reusable type checks (isUserProfile, isFish)
- Use assertion functions for validation that throws errors
- Prefer explicit checks over truthiness for numbers (value !== undefined, not !value)
- Use switch statements with exhaustiveness checking
- Validate external data (API responses, user input) with type guards
- Combine multiple type guards for complex scenarios
- Use typeof for primitives, instanceof for classes, 'in' for objects

❌ DON'T:
- Rely on truthiness for checking numbers (0 is falsy but valid!)
- Use type assertions (as Type) instead of proper type guards
- Create type guards that lie about the type (returns true but wrong type)
- Ignore the possibility of null/undefined in union types
- Use "any" to bypass type checking (defeats the purpose!)
- Forget to check if object is null before using 'in' operator
- Assume typeof is always sufficient (typeof null === "object"!)

💡 TIPS:
- Type guards run at RUNTIME, types only exist at COMPILE-TIME
- Use "value is Type" for type predicate functions (custom type guards)
- TypeScript's control flow analysis automatically narrows types
- Consider using validation libraries (Zod, io-ts) for complex runtime validation
- Type guards are essential when working with union types
- Exhaustiveness checking with 'never' ensures all cases are handled
- Type predicates (value is Type) are more powerful than boolean returns

KEY CONCEPT:
Type guards bridge TypeScript's static types with JavaScript's dynamic runtime.
At compile time: TypeScript uses guards to narrow types
At runtime: Guards actually validate the data
Both are necessary for truly type-safe code!
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
