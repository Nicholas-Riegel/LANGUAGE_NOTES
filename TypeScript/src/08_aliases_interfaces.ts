/**
 * TypeScript Type Aliases and Interfaces
 * 
 * Both allow you to name object types, but have different capabilities.
 * Interfaces are extendable, aliases are more flexible.
 */

// ============================================
// TYPE ALIASES
// ============================================

// Basic type alias
type UserID = string | number;
type Age = number;

const id1: UserID = "abc123";
const id2: UserID = 12345;
const age: Age = 25;

console.log("Type aliases:");
console.log(`ID1: ${id1}, ID2: ${id2}, Age: ${age}`);

// Object type alias
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };
console.log(`Point: (${point.x}, ${point.y})`);

// Function type alias
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => `Hello, ${name}!`;
console.log(greet("Alice"));

// ============================================
// INTERFACES
// ============================================

// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Bob",
  email: "bob@example.com"
};

console.log(`\nUser: ${user.name}`);

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

console.log(`Calculator: 5 + 3 = ${calc.add(5, 3)}`);

// ============================================
// EXTENDING INTERFACES
// ============================================

interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: "Charlie",
  age: 30,
  employeeId: 1001,
  department: "Engineering"
};

console.log(`\nEmployee: ${employee.name}, ${employee.department}`);

// Multiple inheritance
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

interface Document extends Printable, Saveable {
  title: string;
}

const doc: Document = {
  title: "Report",
  print() { console.log("Printing..."); },
  save() { console.log("Saving..."); }
};

doc.print();

// ============================================
// INTERSECTION WITH TYPE ALIASES
// ============================================

type Name = {
  firstName: string;
  lastName: string;
};

type Contact = {
  email: string;
  phone: string;
};

type ContactPerson = Name & Contact;

const contact: ContactPerson = {
  firstName: "Alice",
  lastName: "Smith",
  email: "alice@example.com",
  phone: "555-1234"
};

console.log(`\nContact: ${contact.firstName} ${contact.lastName}`);

// ============================================
// UNION TYPES WITH ALIASES
// ============================================

type Status = "success" | "error" | "loading";
type ID = string | number;

function handleStatus(status: Status): void {
  console.log(`Status: ${status}`);
}

function processId(id: ID): void {
  console.log(`Processing ID: ${id}`);
}

handleStatus("success");
processId(123);

// ============================================
// INTERFACE vs TYPE ALIAS - KEY DIFFERENCES
// ============================================

// They look similar for objects, but have important differences:

// 1. INTERFACES CAN BE EXTENDED (inheritance)
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// TYPE ALIASES USE INTERSECTION (&) instead
type Animal2 = {
  name: string;
};
type Dog2 = Animal2 & {
  breed: string;
};

const myDog: Dog = { name: "Buddy", breed: "Golden Retriever" };
const myDog2: Dog2 = { name: "Max", breed: "Labrador" };
console.log(`\nDogs: ${myDog.name}, ${myDog2.name}`);

// 2. DECLARATION MERGING - Interfaces can be defined multiple times
// TypeScript automatically merges them into one
interface Window {
  title: string;
}
interface Window {
  size: number;
}
// Result: Window has both title AND size
// Useful for extending third-party types

const myWindow: Window = { title: "Main", size: 100 };
console.log(`Window: ${myWindow.title}`);

// TYPE ALIASES CANNOT BE MERGED - this would error:
// type Window2 = { title: string };
// type Window2 = { size: number }; // Error: Duplicate identifier

// 3. TYPE ALIASES CAN DO MORE - not just objects
type ID2 = string | number;                    // Union types
type Status2 = "active" | "inactive";          // Literal types
type Point2 = [number, number];                // Tuple types
type Callback2 = (data: string) => void;       // Function types
type MaybeString = string | null;              // Nullable types

const value: ID2 = "test";
console.log(`Value: ${value}`);

// INTERFACES ARE OBJECT-ONLY - these would error:
// interface ID2 = string | number; // Error!
// interface Status2 = "active" | "inactive"; // Error!

// 4. INTERSECTION TYPES - Type aliases can create complex combinations
type HasName = { name: string };
type HasAge = { age: number };
type PersonWithAge = HasName & HasAge;  // Combines both

// Interfaces use extends for similar behavior
interface HasName2 { name: string; }
interface HasAge2 { age: number; }
interface PersonWithAge2 extends HasName2, HasAge2 {}  // Can extend multiple

const person: PersonWithAge = { name: "Alice", age: 30 };
console.log(`Person: ${person.name}`);

// ============================================
// PRACTICAL DECISION GUIDE
// ============================================

// Use INTERFACE when:
// ✓ Defining object shapes (most common)
// ✓ Working with classes (class implements MyInterface)
// ✓ Building public APIs (declaration merging is useful)
// ✓ Creating extensible hierarchies
// Example: interface User { id: number; name: string; }

// Use TYPE ALIAS when:
// ✓ Creating union types: type Result = Success | Error
// ✓ Creating intersection types: type Admin = User & Permissions
// ✓ Aliasing primitives or literals: type Status = "active" | "inactive"
// ✓ Defining function types: type Handler = (event: Event) => void
// ✓ Creating tuple types: type Coordinates = [number, number]
// ✓ Using mapped/conditional types (advanced)
// Example: type UserID = string | number

// RULE OF THUMB:
// - For object shapes → Use interface (by convention)
// - For everything else → Use type
// - For simple objects → Either works, choose one style and stick to it!

// PERFORMANCE NOTE: No runtime difference - both compile away
// The differences are only at compile-time for type checking

// ============================================
// OPTIONAL PROPERTIES
// ============================================

interface Config {
  apiUrl: string;
  timeout?: number;  // optional
  retries?: number;  // optional
}

const config1: Config = {
  apiUrl: "https://api.example.com"
};

const config2: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

console.log(`\nConfig1: ${config1.apiUrl}`);
console.log(`Config2 timeout: ${config2.timeout}`);

// ============================================
// READONLY PROPERTIES
// ============================================

interface ImmutablePoint {
  readonly x: number;
  readonly y: number;
}

const immutablePoint: ImmutablePoint = { x: 10, y: 20 };
console.log(`Immutable: (${immutablePoint.x}, ${immutablePoint.y})`);
// immutablePoint.x = 30; // Error: readonly

type ReadonlyUser = {
  readonly id: number;
  name: string;
};

const roUser: ReadonlyUser = { id: 1, name: "Alice" };
console.log(`User: ${roUser.name}`);

// ============================================
// INDEX SIGNATURES
// ============================================

interface StringMap {
  [key: string]: string;
}

const translations: StringMap = {
  hello: "Hola",
  goodbye: "Adiós"
};

console.log(`Translation: ${translations.hello}`);

interface NumberDictionary {
  [key: string]: number;
  length: number;  // OK
  // name: string;  // Error: must be number
}

const scores: NumberDictionary = { length: 2, math: 95, english: 88 };
console.log(`Scores length: ${scores.length}`);

// ============================================
// FUNCTION INTERFACES
// ============================================

interface SearchFunc {
  (source: string, substring: string): boolean;
}

const search: SearchFunc = (src, sub) => {
  return src.includes(sub);
};

console.log(`\nSearch: ${search("hello world", "world")}`);

// ============================================
// GENERIC INTERFACES
// ============================================

interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

console.log(`\nBox values: ${stringBox.value}, ${numberBox.value}`);

interface Pair<T, U> {
  first: T;
  second: U;
}

const pair: Pair<string, number> = {
  first: "age",
  second: 25
};

console.log(`Pair: ${pair.first} = ${pair.second}`);

// ============================================
// PRACTICAL EXAMPLES
// ============================================

// API Response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: Date;
}

interface UserData {
  id: number;
  username: string;
}

const response: ApiResponse<UserData> = {
  success: true,
  data: { id: 1, username: "alice" },
  timestamp: new Date()
};

console.log(`\nAPI: ${response.data.username}`);

// Redux-style Action
type Action<T = any> = {
  type: string;
  payload?: T;
};

const loginAction: Action<UserData> = {
  type: "LOGIN",
  payload: { id: 1, username: "alice" }
};

console.log(`Action: ${loginAction.type}`);

// React-style Props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const buttonProps: ButtonProps = {
  label: "Click me",
  onClick: () => console.log("Clicked!")
};

console.log(`Button: ${buttonProps.label}`);

// Database Model
interface Model {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Product extends Model {
  name: string;
  price: number;
  stock: number;
}

// ============================================
// WHEN TO USE WHICH
// ============================================

// Use INTERFACE when:
// - Defining object shapes
// - You might need to extend it later
// - Working with classes
// - Building a library (better for consumers)

// Use TYPE ALIAS when:
// - Creating unions or intersections
// - Aliasing primitives or tuples
// - Working with mapped types
// - Need more complex type operations

// ============================================
// EXPORTED TYPES
// ============================================

export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, "id">): Promise<T>;
  update(id: number, entity: Partial<T>): Promise<T>;
  delete(id: number): Promise<boolean>;
}

export type UpdateFunction<T> = (prev: T) => T;

export type { User, Employee, Config, Product };
