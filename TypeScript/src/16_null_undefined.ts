/**
 * TypeScript Null and Undefined
 * 
 * Handling null and undefined safely with TypeScript's
 * strict null checking and type narrowing.
 */

// ============================================
// NULL VS UNDEFINED
// ============================================

// undefined - variable declared but not assigned
let uninitializedValue: undefined;
console.log(`Undefined: ${uninitializedValue}`);

// null - intentional absence of value
let emptyValue: null = null;
console.log(`Null: ${emptyValue}`);

// ============================================
// STRICT NULL CHECKS
// ============================================

// With strictNullChecks enabled (in tsconfig.json):
// null and undefined are separate types

// let name: string = "Alice";
// name = null; // Error with strictNullChecks
// name = undefined; // Error with strictNullChecks

// Explicitly allow null/undefined
let nullableName: string | null = "Bob";
nullableName = null; // OK

let optionalName: string | undefined = "Charlie";
optionalName = undefined; // OK

console.log(`\nNullable: ${nullableName}`);
console.log(`Optional: ${optionalName}`);

// ============================================
// OPTIONAL PROPERTIES
// ============================================

interface User {
  id: number;
  name: string;
  email?: string;  // Optional - can be string or undefined
  phone?: string;
}

const user1: User = {
  id: 1,
  name: "Alice"
  // email and phone are undefined
};

const user2: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com"
};

console.log(`\nUser1 email: ${user1.email}`);
console.log(`User2 email: ${user2.email}`);

// ============================================
// NON-NULL ASSERTION (!)
// ============================================

// Use ! to assert value is not null/undefined
// WARNING: Use with caution - no runtime check!

function processUser(user: User): void {
  // Assuming email definitely exists
  const emailLength = user.email!.length;
  console.log(`Email length: ${emailLength}`);
}

processUser(user2);

// DOM example
// const element = document.getElementById("myId")!;
// element.innerHTML = "content"; // Assumes element exists

// ============================================
// OPTIONAL CHAINING (?.)
// ============================================

// Safely access nested properties
interface Company {
  name: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
}

const company1: Company = {
  name: "Tech Corp"
};

const company2: Company = {
  name: "Web Inc",
  address: {
    city: "San Francisco"
  }
};

// Without optional chaining (verbose)
const city1 = company1.address ? company1.address.city : undefined;
console.log(`\nCity 1: ${city1}`);

// With optional chaining (concise)
const city2 = company2.address?.city;
console.log(`City 2: ${city2}`);

const street = company1.address?.street;
console.log(`Street: ${street}`);

// ============================================
// NULLISH COALESCING (??)
// ============================================

// Returns right side when left is null or undefined
// Different from || which also checks for falsy values

const value1: string | null = null;
const value2: string | null = "hello";
const value3: string = "";

console.log(`\nValue1 ?? "default": ${value1 ?? "default"}`);
console.log(`Value2 ?? "default": ${value2 ?? "default"}`);
console.log(`Value3 ?? "default": ${value3 ?? "default"}`);

// Compare with ||
console.log(`Value3 || "default": ${value3 || "default"}`);

// Numeric example
const count1: number | null = 0;
// const count2: number | null = null;

console.log(`Count1 ?? 10: ${count1 ?? 10}`); // 0
console.log(`Count1 || 10: ${count1 || 10}`); // 10

// ============================================
// TYPE NARROWING
// ============================================

function printLength(text: string | null | undefined): void {
  // Type guard
  if (text == null) {
    // Checks both null and undefined
    console.log("No text");
    return;
  }
  
  // TypeScript knows text is string here
  console.log(`Length: ${text.length}`);
}

printLength("hello");
printLength(null);
printLength(undefined);

// Strict equality check
// function printLength2(text: string | null | undefined): void {
//   if (text === null) {
//     console.log("Text is null");
//     return;
//   }
//   
//   if (text === undefined) {
//     console.log("Text is undefined");
//     return;
//   }
//   
//   console.log(`Length: ${text.length}`);
// }

// Truthiness check
function processValue(value: string | null | undefined): string {
  if (!value) {
    return "No value";
  }
  return value.toUpperCase();
}

console.log(`\nProcessed: ${processValue("hello")}`);
console.log(`Processed: ${processValue(null)}`);

// ============================================
// OPTIONAL PARAMETERS AND RETURN TYPES
// ============================================

function greet(name?: string): string {
  return `Hello, ${name ?? "Guest"}!`;
}

console.log(`\n${greet("Alice")}`);
console.log(greet());

// Optional return type
function findUser(id: number): User | undefined {
  if (id === 1) {
    return { id: 1, name: "Alice", email: "alice@example.com" };
  }
  return undefined;
}

const found = findUser(1);
const notFound = findUser(999);

console.log(`Found: ${found?.name}`);
console.log(`Not found: ${notFound?.name}`);

// ============================================
// ARRAY METHODS WITH UNDEFINED
// ============================================

const numbers = [1, 2, 3, 4, 5];

// find returns T | undefined
const firstEven = numbers.find(n => n % 2 === 0);
console.log(`\nFirst even: ${firstEven}`);

const notFound2 = numbers.find(n => n > 10);
console.log(`Not found: ${notFound2}`);

// Safe access
if (firstEven !== undefined) {
  console.log(`Found: ${firstEven}`);
}

// ============================================
// DEFAULT VALUES
// ============================================

interface Config {
  host?: string;
  port?: number;
  timeout?: number;
}

function createServer(config: Config): void {
  const host = config.host ?? "localhost";
  const port = config.port ?? 3000;
  const timeout = config.timeout ?? 5000;
  
  console.log(`\nServer: ${host}:${port}, timeout: ${timeout}ms`);
}

createServer({});
createServer({ host: "example.com", port: 8080 });

// ============================================
// DISCRIMINATED UNIONS WITH NULL
// ============================================

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string }
  | { success: null; loading: true };

function handleResult<T>(result: Result<T>): void {
  if (result.success === true) {
    console.log(`Data: ${JSON.stringify(result.data)}`);
  } else if (result.success === false) {
    console.log(`Error: ${result.error}`);
  } else {
    console.log("Loading...");
  }
}

handleResult<string>({ success: true, data: "example" });
handleResult<string>({ success: false, error: "Not found" });
handleResult<string>({ success: null, loading: true });

// ============================================
// UTILITY TYPES WITH NULL
// ============================================

// Make all properties nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface Product {
  id: number;
  name: string;
  price: number;
}

const nullableProduct: Nullable<Product> = {
  id: 1,
  name: "Laptop",
  price: null
};

console.log(`\nProduct: ${nullableProduct.name}, price: ${nullableProduct.price}`);

// Remove null from type
// type NonNullableProperties<T> = {
//   [P in keyof T]: NonNullable<T[P]>;
// };

// ============================================
// PRACTICAL PATTERNS
// ============================================

// Safe property access
function getUserEmail(user: User | null | undefined): string {
  return user?.email ?? "no-email@example.com";
}

console.log(`\nEmail: ${getUserEmail(user2)}`);
console.log(`Email: ${getUserEmail(null)}`);

// Chain of optional properties
interface ApiResponse {
  data?: {
    user?: {
      profile?: {
        avatar?: string;
      };
    };
  };
}

const response: ApiResponse = {};
const avatar = response.data?.user?.profile?.avatar ?? "default.png";
console.log(`Avatar: ${avatar}`);

// Optional callback
function fetchData(callback?: (data: string) => void): void {
  const data = "example data";
  callback?.(data); // Only call if defined
}

fetchData((data) => console.log(`\nCallback: ${data}`));
fetchData(); // No error

// Null object pattern
interface Logger {
  log(message: string): void;
  error(message: string): void;
}

const nullLogger: Logger = {
  log: () => {},
  error: () => {}
};

function processWithLogger(logger: Logger = nullLogger): void {
  logger.log("Processing...");
}

processWithLogger();

// Maybe monad pattern
class Maybe<T> {
  private constructor(private value: T | null | undefined) {}

  static of<T>(value: T | null | undefined): Maybe<T> {
    return new Maybe(value);
  }

  map<U>(fn: (value: T) => U): Maybe<U> {
    if (this.value == null) {
      return Maybe.of<U>(null);
    }
    return Maybe.of(fn(this.value));
  }

  getOrElse(defaultValue: T): T {
    return this.value ?? defaultValue;
  }

  isPresent(): boolean {
    return this.value != null;
  }
}

const maybeValue = Maybe.of("hello")
  .map(s => s.toUpperCase())
  .map(s => s.length);

console.log(`\nMaybe: ${maybeValue.getOrElse(0)}`);

const emptyMaybe = Maybe.of<string>(null)
  .map(s => s.toUpperCase());

console.log(`Empty maybe: ${emptyMaybe.getOrElse("default")}`);

// ============================================
// BEST PRACTICES
// ============================================

// ✅ GOOD: Check before use
// function good1(value: string | null): void {
//   if (value !== null) {
//     console.log(value.toUpperCase());
//   }
// }

// ✅ GOOD: Use optional chaining
// function good2(user: User | null): void {
//   console.log(user?.email ?? "No email");
// }

// ✅ GOOD: Provide defaults
// function good3(config: Config): void {
//   const timeout = config.timeout ?? 5000;
//   console.log(`Timeout: ${timeout}`);
// }

// ❌ BAD: Non-null assertion without certainty
// function bad1(user: User | null): void {
//   console.log(user!.email); // Might crash if user is null
// }

// ❌ BAD: Ignoring potential undefined
// function bad2(arr: number[]): void {
//   const first = arr[0]; // Might be undefined
//   console.log(first.toFixed(2)); // Might crash
// }

console.log("\nNull handling examples completed");

// ============================================
// EXPORTED TYPES
// ============================================

export type { User, Company, Config, Result, Nullable };
export { Maybe, greet, findUser, getUserEmail };
