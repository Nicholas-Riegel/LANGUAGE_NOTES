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
function add(a: number, b: number): number {
  return a + b;
}

console.log(`Add: ${add(5, 3)}`);

// Arrow function
const multiply = (a: number, b: number): number => a * b;
console.log(`Multiply: ${multiply(4, 7)}`);

// Function with no return value
function logMessage(message: string): void {
  console.log(`Message: ${message}`);
}

logMessage("Hello, TypeScript!");

// ============================================
// OPTIONAL PARAMETERS
// ============================================

// Optional parameters must come after required ones
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(`\n${greet("Alice")}`);
console.log(greet("Bob", "Good morning"));

// Optional with type union
function displayInfo(name: string, age?: number): string {
  if (age !== undefined) {
    return `${name} is ${age} years old`;
  }
  return `${name}'s age is unknown`;
}

console.log(displayInfo("Charlie", 25));
console.log(displayInfo("Diana"));

// ============================================
// DEFAULT PARAMETERS
// ============================================

function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}

console.log(`\nPower: ${power(5)}`);      // 25
console.log(`Power: ${power(2, 3)}`);     // 8

// Default with complex types
function createUser(
  name: string,
  role: string = "user",
  active: boolean = true
): object {
  return { name, role, active };
}

console.log(createUser("Alice"));
console.log(createUser("Bob", "admin", false));

// ============================================
// REST PARAMETERS
// ============================================

// Rest parameter must be last and is typed as an array
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(`\nSum: ${sum(1, 2, 3, 4, 5)}`);

function concatenate(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

console.log(concatenate(" ", "Hello", "World", "from", "TypeScript"));

// ============================================
// FUNCTION TYPE EXPRESSIONS
// ============================================

// Function type alias
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
const divide: MathOperation = (a, b) => a / b;

console.log(`\nSubtract: ${subtract(10, 3)}`);
console.log(`Divide: ${divide(20, 4)}`);

// Function type in parameter
function calculate(
  a: number,
  b: number,
  operation: MathOperation
): number {
  return operation(a, b);
}

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

const myAdder = makeAdder("Adds two numbers");
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

// Overload signatures
function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;

// Implementation signature (not visible to callers)
function makeDate(yearOrTimestamp: number, month?: number, day?: number): Date {
  if (month !== undefined && day !== undefined) {
    return new Date(yearOrTimestamp, month - 1, day);
  }
  return new Date(yearOrTimestamp);
}

console.log(`\n${makeDate(1000000000000)}`);
console.log(makeDate(2024, 1, 15));

// String or array length
function len(s: string): number;
function len(arr: any[]): number;
function len(x: string | any[]): number {
  return x.length;
}

console.log(`Length: ${len("hello")}`);
console.log(`Length: ${len([1, 2, 3, 4, 5])}`);

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

const user = { name: "Alice", age: 30, email: "alice@example.com" };
console.log(`Property: ${getProperty(user, "name")}`);
console.log(`Property: ${getProperty(user, "age")}`);

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

const numbers = [1, 2, 3, 4];
const doubled = map(numbers, n => n * 2);
const strings = map(numbers, n => `Number: ${n}`);

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

// ============================================
// EXPORTED TYPES
// ============================================

export type { MathOperation, Callback, EventHandler, Validator, Middleware };
export { add, multiply, sum, identity, getProperty, firstElement, map };
