/**
 * TypeScript Special Types
 * 
 * Special types that don't fit the primitive categories:
 * - any: disables type checking
 * - unknown: safer version of any
 * - never: never returns a value
 * - undefined: variable not assigned
 * - null: intentional absence of value
 * - void: function returns nothing
 */

// ============================================
// ANY TYPE
// ============================================

// 'any' disables type checking completely (use sparingly!)
// When you use 'any', TypeScript essentially stops checking that variable
// This means you lose all type safety benefits
let anyValue: any = "hello";
anyValue = 42; // OK - can reassign to number
anyValue = true; // OK - can reassign to boolean
anyValue = { name: "John" }; // OK - can reassign to object

console.log("ANY type:");
console.log(`Any can be anything: ${anyValue}`);

// any is useful when:
// 1. Migrating JavaScript code to TypeScript gradually
// 2. Working with dynamic content where type is truly unknown
// 3. Interfacing with third-party libraries without types
// Example: function legacyFunction(data: any): any { return data; }

// ⚠️ WARNING: Avoid 'any' when possible - it defeats TypeScript's purpose!
// Using 'any' means you're opting out of type safety for that variable
// Prefer 'unknown' when you need flexibility (see below)

// ============================================
// UNKNOWN TYPE
// ============================================

// 'unknown' is the type-safe counterpart of 'any'
// Like 'any', it can hold any value, BUT unlike 'any', you must check the type before using it
// This forces you to write safer code with explicit type checks
let unknownValue: unknown = "hello";
unknownValue = 42; // OK - can assign any type
unknownValue = true; // OK - can assign any type

// Must perform type checking before using the value
// TypeScript won't let you call methods or access properties without checking first
if (typeof unknownValue === "string") {
  // Inside this block, TypeScript knows unknownValue is a string
  console.log(`\nUNKNOWN as string: ${unknownValue.toUpperCase()}`);
}

if (typeof unknownValue === "number") {
  // Inside this block, TypeScript knows unknownValue is a number
  console.log(`UNKNOWN as number: ${unknownValue * 2}`);
}

// This would cause a compile error without type checking:
// console.log(unknownValue.toUpperCase()); // Error: TypeScript doesn't know if toUpperCase exists!

// KEY DIFFERENCE: any vs unknown
// - any: "I don't care about type safety" (no checking required)
// - unknown: "I need flexibility but want type safety" (checking required)

// ============================================
// NEVER TYPE
// ============================================

// 'never' represents values that never occur or functions that never return normally
// This type indicates code that is unreachable or always throws an error

// Two main use cases for 'never':

// 1. Functions that throw errors (never return to caller)
// function throwError(message: string): never {
//   throw new Error(message);
//   // Execution stops here - function never returns
// }

// 2. Functions with infinite loops (never return to caller)
// function infiniteLoop(): never {
//   while (true) {
//     // This loop runs forever
//   }
// }

// 3. Exhaustiveness checking - ensures all cases are handled
// If you forget to handle a case, TypeScript will catch it:
// function processValue(value: string | number): string | number {
//   if (typeof value === "string") return value.toUpperCase();
//   if (typeof value === "number") return value * 2;
//   // If we add a new type to the union, TypeScript will error here
//   return value; // value would be 'never' if all cases are handled
// }

console.log("\nNEVER type:");
console.log("Never is used for functions that don't return normally");

// PRACTICAL TIP: 'never' is often inferred automatically
// You rarely need to explicitly type something as 'never'
// TypeScript is smart enough to figure it out

// ============================================
// UNDEFINED TYPE
// ============================================

// 'undefined' is the value of variables that haven't been assigned yet
// JavaScript automatically assigns 'undefined' to uninitialized variables
let undefinedValue: undefined = undefined;
let maybeString: string | undefined; // Declared but not initialized

console.log(`\nUNDEFINED: ${undefinedValue}`);
console.log(`Maybe string: ${maybeString}`); // undefined (no value assigned)

// 'undefined' is commonly used with optional parameters
// The ? syntax is shorthand for "| undefined"
function optionalParam(required: string, optional?: string): void {
  // optional?: string is equivalent to optional: string | undefined
  console.log(`Required: ${required}`);
  console.log(`Optional: ${optional ?? 'not provided'}`);
  // ?? is the nullish coalescing operator - returns right side if left is null/undefined
}

optionalParam("hello"); // optional will be undefined
optionalParam("hello", "world"); // optional will be "world"

// IMPORTANT: undefined vs not declaring a variable
// - let x; // x is undefined (variable exists but has no value)
// - Using x before declaration would be a ReferenceError (variable doesn't exist)

// ============================================
// NULL TYPE
// ============================================

// 'null' represents intentional absence of a value
// Unlike 'undefined' (which happens automatically), 'null' is explicitly assigned
let nullValue: null = null;
let maybeNumber: number | null = null;

console.log(`\nNULL: ${nullValue}`);

maybeNumber = 42;
console.log(`Maybe number: ${maybeNumber}`);

// Common pattern: Use null to represent "no value yet" for object types
// This makes it clear the variable will hold an object or nothing
type UserType = { name: string; age: number };
let currentUser: UserType | null = null; // Start with no user

function loadUser(): UserType {
  return { name: "John", age: 30 };
}

currentUser = loadUser(); // Now we have a user
console.log(`User: ${currentUser.name}`);

// NULL vs UNDEFINED - the key difference:
// - null: "I explicitly set this to nothing" (intentional)
// - undefined: "This hasn't been set yet" (accidental/default)
// 
// Example patterns:
// - let user: User | null = null;  // No user loaded yet (intentional)
// - let name: string | undefined;  // Name not provided (missing optional value)

// ============================================
// VOID TYPE
// ============================================

// 'void' indicates a function doesn't return any usable value
// Used for functions that perform actions but don't give back a result
function logMessage(message: string): void {
  console.log(message);
  // No return statement needed
  // Technically returns undefined, but caller shouldn't care about the return value
}

// Another example of void:
// function doSomething(): void {
//   const result = 1 + 1;
//   // Performs work but doesn't return anything useful
//   // You CAN'T write: return result; (TypeScript will error)
// }

console.log("\nVOID type:");
logMessage("This function returns void");

// IMPORTANT DISTINCTION: void vs undefined
// 
// void: "This function doesn't return anything meaningful"
// - Indicates the return value should be ignored
// - You can omit the return statement entirely
// - Used for side-effects (logging, updating DOM, etc.)
// Example: function returnsVoid(): void { console.log('hi'); }
// 
// undefined: "This function explicitly returns undefined"
// - The function intentionally returns the value undefined
// - You MUST include: return undefined;
// - Used when undefined is a meaningful return value
// Example: function returnsUndefined(): undefined { return undefined; }
//
// PRACTICAL TIP: Use void for most functions that don't return values
// Only use undefined as return type if undefined is a specific meaningful result

// ============================================
// PRACTICAL EXAMPLES
// ============================================

// Safe type narrowing with unknown
// Type narrowing: The process of refining a broad type (like unknown) to a specific type
// TypeScript tracks your type checks and narrows the type automatically
function processUnknown(value: unknown): string {
  // Using typeof to check the type at runtime
  if (typeof value === "string") {
    // Inside this block, TypeScript knows value is a string
    // So we can safely return it as a string
    return value;
  } else if (typeof value === "number") {
    // Here, TypeScript knows value is a number
    // We can call number methods like toString()
    return value.toString();
  } else if (typeof value === "boolean") {
    // Here, TypeScript knows value is a boolean
    // We can use it in a ternary expression
    return value ? "true" : "false";
  } else {
    // If none of the checks passed, we don't know what it is
    return "unknown type";
  }
}

console.log("\nProcessing unknown values:");
console.log(processUnknown("hello"));  // "hello"
console.log(processUnknown(42));       // "42"
console.log(processUnknown(true));     // "true"

// Handling null and undefined
function getName(name: string | null | undefined): string {
  // Using nullish coalescing operator (??)
  // ?? returns the right-hand value ONLY if left-hand is null or undefined
  // This is different from || which returns right-hand for ANY falsy value (0, "", false, etc.)
  return name ?? "Anonymous";
  
  // Why ?? is better than || for null/undefined:
  // With ||:  "" || "Anonymous" returns "Anonymous" (empty string is falsy)
  // With ??:  "" ?? "Anonymous" returns "" (empty string is not null/undefined)
}

console.log("\nHandling null/undefined:");
console.log(getName("Alice"));     // "Alice" (has a value)
console.log(getName(null));        // "Anonymous" (null triggers default)
console.log(getName(undefined));   // "Anonymous" (undefined triggers default)

// Optional chaining with null/undefined
// Optional chaining (?.) safely accesses nested properties that might not exist
interface User {
  name: string;
  address?: {  // ? means address is optional (could be undefined)
    street?: string;
    city?: string;
  };
}

const user1: User = { name: "John" }; // No address property
const user2: User = {
  name: "Jane",
  address: { city: "NYC" } // Has address, but no street
};

console.log("\nOptional chaining:");
// The ?. operator stops evaluation and returns undefined if the left side is null/undefined
// Without ?., this would crash: user1.address.street (can't access street of undefined)
// With ?., it safely returns undefined: user1.address?.street
console.log(user1.address?.street ?? "No street"); // "No street" (address is undefined)
console.log(user2.address?.city ?? "No city");     // "NYC" (address exists and has city)

// Optional chaining can be chained multiple levels:
// user.address?.location?.coordinates?.latitude
// Stops at the first null/undefined and returns undefined

// ============================================
// TYPE GUARDS (BASIC INTRODUCTION)
// ============================================

// TYPE GUARDS help TypeScript narrow down types within conditional blocks
// They're especially important when working with 'unknown' type

// Simple example with unknown:
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function handleValue(value: unknown): void {
  if (isString(value)) {
    console.log(`String length: ${value.length}`);
  } else if (isNumber(value)) {
    console.log(`Number doubled: ${value * 2}`);
  } else {
    console.log("Unknown type");
  }
}

console.log("\nType guards:");
handleValue("hello");
handleValue(42);

// 💡 For comprehensive type guard information, see: 19_type_guards.ts
// That file covers:
// - Custom type guards with type predicates (value is Type)
// - typeof, instanceof, and 'in' operator guards
// - Discriminated unions
// - Complex object validation
// - Best practices and advanced patterns

// ============================================
// EXPORTED FUNCTIONS FOR TESTING
// ============================================

export function safeProcessUnknown(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return String(value);
  return "unknown";
}

export function handleNull(value: string | null): string {
  return value ?? "default";
}

export function handleUndefined(value: string | undefined): string {
  return value ?? "default";
}

export function voidFunction(): void {
  // Does nothing, returns void
}

export { processUnknown, getName };
