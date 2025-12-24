/**
 * TypeScript Functions
 * 
 * TypeScript provides powerful type checking for functions,
 * including parameter types, return types, and function signatures.
 */

// ============================================
// BASIC FUNCTION TYPES
// ============================================

// Function with typed parameters and return type
// TypeScript checks that:
// 1. You pass the correct types when calling (number, number)
// 2. The function returns the correct type (number)
// 3. You use the parameters correctly inside the function
function add(a: number, b: number): number {
  return a + b;
}

console.log(`Add: ${add(5, 3)}`);
// console.log(add("5", "3")); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

// Arrow function with explicit types
// Same type checking as regular functions
const multiply = (a: number, b: number): number => a * b;
console.log(`Multiply: ${multiply(4, 7)}`);

// Function with no return value (void)
// void means: "this function doesn't return anything useful"
// It might return undefined, but we don't care about the return value
function logMessage(message: string): void {
  console.log(`Message: ${message}`);
  // No return statement, or return with no value
}

logMessage("Hello, TypeScript!");

// ============================================
// OPTIONAL PARAMETERS
// ============================================

// Optional parameters use ? after the parameter name
// The ? means: "you can call this function with or without this parameter"
// Optional parameters must come AFTER required ones
// Type becomes: string | undefined (it might not be provided)
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(`\n${greet("Alice")}`);          // OK: greeting is optional
console.log(greet("Bob", "Good morning"));  // OK: greeting provided
// console.log(greet());                     // Error: name is required

// Optional with type union
// age?: number is equivalent to age: number | undefined
// Always check for undefined before using optional parameters
function displayInfo(name: string, age?: number): string {
  if (age !== undefined) {  // Check if age was provided
    return `${name} is ${age} years old`;
  }
  return `${name}'s age is unknown`;
}

console.log(displayInfo("Charlie", 25));
console.log(displayInfo("Diana"));

// ============================================
// DEFAULT PARAMETERS
// ============================================

// Default parameters have a value assigned in the function signature
// If no argument is provided, the default value is used
// Default parameters are automatically optional (you don't need ?)
// TypeScript infers the type from the default value
function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}

console.log(`\nPower: ${power(5)}`);      // 25 (uses default exponent = 2)
console.log(`Power: ${power(2, 3)}`);     // 8  (overrides default with 3)

// Default with complex types
// You can have multiple default parameters
// TypeScript knows these are optional because they have defaults
function createUser(
  name: string,
  role: string = "user3",      // Default: "user3"
  active: boolean = true       // Default: true
): object {
  return { name, role, active };
}

console.log(createUser("Alice"));                    // Uses defaults
console.log(createUser("Bob", "admin", false));      // Overrides all defaults

// ============================================
// NAMED PARAMETERS (Destructured Object Parameters)
// ============================================

// PROBLEM with positional parameters:
// When you have many parameters, it's hard to remember the order
// Example: Which parameter is which?
// someFunction("value1", true, 42, "value2", false)  // Confusing!

// SOLUTION: Named parameters using object destructuring
// TypeScript lets you use an object as a parameter and destructure it
// This makes function calls self-documenting and order-independent

// Define the parameter shape as a type or interface
type UserOptions = {
  firstName: string;
  lastName: string;
  age?: number;          // Optional
  email?: string;        // Optional
  isAdmin?: boolean;     // Optional with default
};

// Function using named parameters (destructured object)
// The { } in the parameter list means we're destructuring an object
// We can provide default values right in the destructuring
function createUserWithNamedParams({ 
  firstName, 
  lastName, 
  age, 
  email, 
  isAdmin = false  // Default value in destructuring
}: UserOptions): string {
  const ageStr = age ? `, ${age} years old` : "";
  const emailStr = email ? `, email: ${email}` : "";
  const adminStr = isAdmin ? " (Admin)" : "";
  return `${firstName} ${lastName}${ageStr}${emailStr}${adminStr}`;
}

// BENEFITS of named parameters:
// 1. Self-documenting: you can see what each value means
// 2. Order doesn't matter: you can put arguments in any order
// 3. Easy to skip optional parameters: just don't include them
// 4. Refactoring-friendly: adding new parameters won't break existing calls

console.log("\nNamed Parameters:");

// Call with parameters in different order
console.log(createUserWithNamedParams({
  lastName: "Brown",      // lastName first
  age: 25,                // age before firstName
  firstName: "Bob",       // firstName last
  email: "bob@example.com"
}));

// Call with minimal parameters - skip optional ones
console.log(createUserWithNamedParams({
  firstName: "Jane",
  lastName: "Smith"
}));

// W3Schools Example: Named parameters with inline type annotation
// Instead of defining a separate interface/type, you can define the object shape inline
// This is useful for simple one-off functions where you don't need to reuse the type
function divide1({ dividend, divisor }: { dividend: number, divisor: number }) {
  return dividend / divisor;
}

console.log(divide1({ dividend: 10, divisor: 2 }));     // 5
console.log(divide1({ divisor: 4, dividend: 20 }));     // 5 - order doesn't matter!

// The syntax breakdown:
// { dividend, divisor }              <- Destructuring the object parameter
// : { dividend: number, divisor: number }  <- Inline type annotation for the object
//
// This is equivalent to:
// type DivideParams = { dividend: number, divisor: number };
// function divide({ dividend, divisor }: DivideParams) { ... }

// COMPARISON:
// Positional parameters (old way):
// divideOld(10, 2);  // Which is dividend and which is divisor?
//
// Named parameters (better way):
// divide({ dividend: 10, divisor: 2 });  // Crystal clear what each number means!

// ============================================
// REST PARAMETERS
// ============================================

// Rest parameters collect multiple arguments into an array
// Syntax: ...parameterName: Type[]
// The ... (spread operator) means "collect all remaining arguments"
// Rest parameter MUST be the last parameter
// Inside the function, it's a regular array of the specified type
function sum(...numbers1: number[]): number {
  // numbers1 is a number[] array containing all arguments
  return numbers1.reduce((total, n) => total + n, 0);
}

console.log(`\nSum: ${sum(1, 2, 3, 4, 5)}`);        // Can pass any number of arguments
console.log(`Sum: ${sum(10, 20)}`);                  // Works with 2 arguments
console.log(`Sum: ${sum(100)}`);                     // Works with 1 argument

// Combining regular parameters with rest parameters
// Regular parameters must come first, rest parameter last
function concatenate(separator: string, ...strings: string[]): string {
  // separator is a single string
  // strings is an array of all remaining string arguments
  return strings.join(separator);
}

console.log(concatenate(" ", "Hello", "World", "from", "TypeScript"));
console.log(concatenate("-", "one", "two", "three"));

// ============================================
// FUNCTION TYPE EXPRESSIONS
// ============================================

// Function type expression: describes the "shape" of a function
// Syntax: (param1: Type1, param2: Type2) => ReturnType
// This is like creating a type for functions, similar to how you create types for objects

// Function type alias
// MathOperation is a TYPE that describes any function taking 2 numbers and returning a number
type MathOperation = (a: number, b: number) => number;

// These functions match the MathOperation type
const subtract: MathOperation = (a, b) => a - b;
const divide: MathOperation = (a, b) => a / b;
// Note: TypeScript infers parameter types from MathOperation, so we don't need to type them again

console.log(`\nSubtract: ${subtract(10, 3)}`);
console.log(`Divide: ${divide(20, 4)}`);

// Function type in parameter (Higher-order function)
// This function takes ANOTHER FUNCTION as a parameter
// The operation parameter must match the MathOperation type
function calculate(
  a: number,
  b: number,
  operation: MathOperation  // This parameter is a function!
): number {
  return operation(a, b);  // Call the function that was passed in
}

// Pass different functions to calculate()
console.log(`Calculate: ${calculate(15, 5, add)}`);
console.log(`Calculate: ${calculate(15, 5, multiply)}`);

// ============================================
// CALL SIGNATURES
// ============================================

// Object with callable signature
type DescribableFunction = {
  description: string;
  (a: number, b: number): number;
};

function makeAdder(description: string): DescribableFunction {
  const fn = (a: number, b: number) => a + b;
  (fn as any).description = description;
  return fn as DescribableFunction;
}

const myAdder = makeAdder("Adds two numbers1");
console.log(`\n${myAdder.description}: ${myAdder(3, 4)}`);

// ============================================
// CONSTRUCT SIGNATURES
// ============================================

// Constructor function type
type Constructor<T> = {
  new (...args: any[]): T;
};

class Person {
  constructor(public name: string, public age: number) {}
}

function createInstance<T>(ctor: Constructor<T>, ...args: any[]): T {
  return new ctor(...args);
}

const personInstance = createInstance(Person, "Alice", 30);
console.log(`Person: ${personInstance.name}, ${personInstance.age}`);

// ============================================
// FUNCTION OVERLOADS
// ============================================

// Function overloads let you define multiple function signatures
// for the same function name with different parameter combinations
// Think of it as: "this function can be called in different ways"

// Overload signatures (what callers see)
// These tell TypeScript: "makeDate can be called with 1 OR 3 numbers"
function makeDate(timestamp: number): Date;                          // Overload 1
function makeDate(year: number, month: number, day: number): Date;  // Overload 2

// Implementation signature (NOT visible to callers)
// This is the actual implementation that handles all overload cases
// Must be compatible with ALL overload signatures above
function makeDate(yearOrTimestamp: number, month?: number, day?: number): Date {
  if (month !== undefined && day !== undefined) {
    // Called with 3 parameters: year, month, day
    return new Date(yearOrTimestamp, month - 1, day);
  }
  // Called with 1 parameter: timestamp
  return new Date(yearOrTimestamp);
}

console.log(`\n${makeDate(1000000000000)}`);  // Calls overload 1 (timestamp)
console.log(makeDate(2024, 1, 15));            // Calls overload 2 (year, month, day)
// console.log(makeDate(2024, 1));             // Error: No overload matches 2 parameters

// Another example: different types for different calls
function len(s: string): number;      // Overload for strings
function len(arr: any[]): number;     // Overload for arrays
function len(x: string | any[]): number {  // Implementation handles both
  return x.length;
}

console.log(`Length: ${len("hello")}`);         // TypeScript knows this returns string length
console.log(`Length: ${len([1, 2, 3, 4, 5])}`)  // TypeScript knows this returns array length

// ============================================
// GENERIC FUNCTIONS
// ============================================

// Basic generic
function identity<T>(value: T): T {
  return value;
}

console.log(`\nIdentity: ${identity<string>("hello")}`);
console.log(`Identity: ${identity<number>(42)}`);
console.log(`Identity: ${identity("auto-inferred")}`);

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user3 = { name: "Alice", age: 30, email: "alice@example.com" };
console.log(`Property: ${getProperty(user3, "name")}`);
console.log(`Property: ${getProperty(user3, "age")}`);

// Generic array function
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(`First: ${firstElement([1, 2, 3])}`);
console.log(`First: ${firstElement(["a", "b", "c"])}`);

// Multiple generics
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const numbers1 = [1, 2, 3, 4];
const doubled = map(numbers1, n => n * 2);
const strings = map(numbers1, n => `Number: ${n}`);

console.log(`Mapped: ${doubled.join(", ")}`);
console.log(`Mapped: ${strings.join(", ")}`);

// ============================================
// CONSTRAINTS
// ============================================

// Constraint with interface
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(`Length: ${arg.length}`);
}

logLength("hello");
logLength([1, 2, 3]);
logLength({ length: 10, value: "test" });

// ============================================
// THIS PARAMETER
// ============================================

interface Database {
  query(sql: string): void;
  connect(): void;
}

function makeDatabase(): Database {
  return {
    query(this: Database, sql: string): void {
      console.log(`Querying: ${sql}`);
    },
    connect(this: Database): void {
      console.log("Connecting to database...");
    }
  };
}

const db = makeDatabase();
db.connect();
db.query("SELECT * FROM users");

// ============================================
// VOID, NEVER, UNKNOWN RETURNS
// ============================================

// void - function returns undefined or nothing
function warnUser(): void {
  console.log("\nThis is a warning!");
}

warnUser();

// never - function never returns (throws or infinite loop)
// function throwError(message: string): never {
//   throw new Error(message);
// }

// function infiniteLoop(): never {
//   while (true) {
//     // never exits
//   }
// }

// unknown - safer than any
function processInput(input: unknown): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  if (typeof input === "number") {
    return input.toString();
  }
  return "Unknown type";
}

console.log(processInput("hello"));
console.log(processInput(42));

// ============================================
// ASYNC FUNCTIONS
// ============================================

// Async function returns Promise
async function fetchData(url: string): Promise<string> {
  // Simulated fetch
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 100);
  });
}

// Using async/await
async function getData(): Promise<void> {
  const data = await fetchData("https://api.example.com");
  console.log(`\n${data}`);
}

getData();

// Generic async function
// async function fetchJson<T>(url: string): Promise<T> {
//   // Simulated JSON fetch
//   return new Promise((resolve) => {
//     setTimeout(() => resolve({ data: "example" } as T), 100);
//   });
// }

// ============================================
// CALLBACK FUNCTIONS
// ============================================

// Callback type
type Callback = (error: Error | null, result: string | null) => void;

function asyncOperation(value: string, callback: Callback): void {
  setTimeout(() => {
    if (value) {
      callback(null, `Processed: ${value}`);
    } else {
      callback(new Error("Invalid value"), null);
    }
  }, 100);
}

asyncOperation("test", (error, result) => {
  if (error) {
    console.log(`Error: ${error.message}`);
  } else {
    console.log(`Result: ${result}`);
  }
});

// ============================================
// HIGHER-ORDER FUNCTIONS
// ============================================

// Function that returns a function
function multiplier(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(`\nDouble 5: ${double(5)}`);
console.log(`Triple 5: ${triple(5)}`);

// Partial application
function add3(a: number, b: number, c: number): number {
  return a + b + c;
}

function partial(
  fn: (a: number, b: number, c: number) => number,
  a: number
): (b: number, c: number) => number {
  return (b: number, c: number) => fn(a, b, c);
}

const add5 = partial(add3, 5);
console.log(`Partial: ${add5(10, 20)}`);

// Compose functions
function compose<T>(
  fn1: (x: T) => T,
  fn2: (x: T) => T
): (x: T) => T {
  return (x: T) => fn1(fn2(x));
}

const addOne = (n: number) => n + 1;
const timesTwo = (n: number) => n * 2;
const addOneThenTimesTwo = compose(timesTwo, addOne);

console.log(`Composed: ${addOneThenTimesTwo(5)}`);

// ============================================
// PRACTICAL PATTERNS
// ============================================

// Validator function
type Validator<T> = (value: T) => boolean | string;

function validateEmail(email: string): boolean | string {
  if (!email.includes("@")) {
    return "Email must contain @";
  }
  return true;
}

function validateAge(age: number): boolean | string {
  if (age < 0 || age > 150) {
    return "Age must be between 0 and 150";
  }
  return true;
}

function validate<T>(value: T, validator: Validator<T>): void {
  const result = validator(value);
  if (result === true) {
    console.log(`Valid: ${value}`);
  } else {
    console.log(`Invalid: ${result}`);
  }
}

console.log("\nValidation:");
validate("test@example.com", validateEmail);
validate("invalid", validateEmail);
validate(25, validateAge);

// Event handler
type EventHandler<T = any> = (event: T) => void;

interface ClickEvent {
  type: "click";
  x: number;
  y: number;
}

const handleClick: EventHandler<ClickEvent> = (event) => {
  console.log(`Clicked at (${event.x}, ${event.y})`);
};

handleClick({ type: "click", x: 100, y: 200 });

// Middleware pattern
type Middleware<T, U> = (input: T, next: (data: T) => U) => U;

function applyMiddleware<T, U>(
  data: T,
  middleware: Middleware<T, U>[],
  finalHandler: (data: T) => U
): U {
  let index = 0;
  
  function next(currentData: T): U {
    if (index < middleware.length) {
      const mw = middleware[index++];
      return mw(currentData, next);
    }
    return finalHandler(currentData);
  }
  
  return next(data);
}

const mw1: Middleware<number, number> = (input, next) => {
  console.log(`Middleware 1: ${input}`);
  return next(input + 1);
};

const mw2: Middleware<number, number> = (input, next) => {
  console.log(`Middleware 2: ${input}`);
  return next(input * 2);
};

const result = applyMiddleware(5, [mw1, mw2], (n) => {
  console.log(`Final: ${n}`);
  return n;
});

console.log(`Result: ${result}`);

