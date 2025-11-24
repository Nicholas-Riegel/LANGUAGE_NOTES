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

// 'any' disables type checking (use sparingly!)
let anyValue: any = "hello";
anyValue = 42; // OK
anyValue = true; // OK
anyValue = { name: "John" }; // OK

console.log("ANY type:");
console.log(`Any can be anything: ${anyValue}`);

// any is useful when migrating from JavaScript
// Example: function legacyFunction(data: any): any { return data; }

// ⚠️ Avoid 'any' when possible - it defeats TypeScript's purpose!

// ============================================
// UNKNOWN TYPE
// ============================================

// 'unknown' is safer than 'any' - requires type checking before use
let unknownValue: unknown = "hello";
unknownValue = 42; // OK
unknownValue = true; // OK

// Must check type before using
if (typeof unknownValue === "string") {
  console.log(`\nUNKNOWN as string: ${unknownValue.toUpperCase()}`);
}

if (typeof unknownValue === "number") {
  console.log(`UNKNOWN as number: ${unknownValue * 2}`);
}

// This would error without type check:
// console.log(unknownValue.toUpperCase()); // Error!

// ============================================
// NEVER TYPE
// ============================================

// 'never' represents values that never occur
// Used for functions that never return

// Example functions that never return:
// function throwError(message: string): never { throw new Error(message); }
// function infiniteLoop(): never { while (true) { } }

// Never is automatically inferred in exhaustiveness checking:
// function processValue(value: string | number): string | number {
//   if (typeof value === "string") return value.toUpperCase();
//   else return value * 2;
// }

console.log("\nNEVER type:");
console.log("Never is used for functions that don't return");

// ============================================
// UNDEFINED TYPE
// ============================================

// 'undefined' is the default value of uninitialized variables
let undefinedValue: undefined = undefined;
let maybeString: string | undefined;

console.log(`\nUNDEFINED: ${undefinedValue}`);
console.log(`Maybe string: ${maybeString}`); // undefined

// Useful in optional parameters
function optionalParam(required: string, optional?: string): void {
  console.log(`Required: ${required}`);
  console.log(`Optional: ${optional ?? 'not provided'}`);
}

optionalParam("hello");
optionalParam("hello", "world");

// ============================================
// NULL TYPE
// ============================================

// 'null' represents intentional absence of value
let nullValue: null = null;
let maybeNumber: number | null = null;

console.log(`\nNULL: ${nullValue}`);

maybeNumber = 42;
console.log(`Maybe number: ${maybeNumber}`);

// Useful for initializing variables that will be assigned later
type UserType = { name: string; age: number };
let currentUser: UserType | null = null;

function loadUser(): UserType {
  return { name: "John", age: 30 };
}

currentUser = loadUser();
console.log(`User: ${currentUser.name}`);

// ============================================
// VOID TYPE
// ============================================

// 'void' indicates function returns nothing
function logMessage(message: string): void {
  console.log(message);
  // No return statement
}

// Example void function:
// function doSomething(): void {
//   const result = 1 + 1;
//   // Can't return a value
// }

console.log("\nVOID type:");
logMessage("This function returns void");

// void vs undefined
// - void: function doesn't return anything
// - undefined: function explicitly returns undefined
// Example: function returnsVoid(): void { }
// Example: function returnsUndefined(): undefined { return undefined; }

// ============================================
// PRACTICAL EXAMPLES
// ============================================

// Safe type narrowing with unknown
function processUnknown(value: unknown): string {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value.toString();
  } else if (typeof value === "boolean") {
    return value ? "true" : "false";
  } else {
    return "unknown type";
  }
}

console.log("\nProcessing unknown values:");
console.log(processUnknown("hello"));
console.log(processUnknown(42));
console.log(processUnknown(true));

// Handling null and undefined
function getName(name: string | null | undefined): string {
  // Using nullish coalescing operator (??)
  return name ?? "Anonymous";
}

console.log("\nHandling null/undefined:");
console.log(getName("Alice")); // Alice
console.log(getName(null)); // Anonymous
console.log(getName(undefined)); // Anonymous

// Optional chaining with null/undefined
interface User {
  name: string;
  address?: {
    street?: string;
    city?: string;
  };
}

const user1: User = { name: "John" };
const user2: User = {
  name: "Jane",
  address: { city: "NYC" }
};

console.log("\nOptional chaining:");
console.log(user1.address?.street ?? "No street"); // No street
console.log(user2.address?.city ?? "No city"); // NYC

// ============================================
// TYPE GUARDS
// ============================================

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
