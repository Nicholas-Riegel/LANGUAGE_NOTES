/**
 * TypeScript Generics
 * 
 * Generics allow you to create reusable components that work with
 * multiple types while maintaining type safety.
 */

// ============================================
// BASIC GENERICS
// ============================================

// Generic function
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("hello"));
console.log(identity<number>(42));
console.log(identity(true)); // Type inferred

// Generic with array
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(`\nFirst: ${firstElement([1, 2, 3])}`);
console.log(`First: ${firstElement(["a", "b", "c"])}`);

// ============================================
// GENERIC INTERFACES
// ============================================

interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const stringBox = new Box("hello");
console.log(`\nBox value: ${stringBox.getValue()}`);

const numberBox = new Box(42);
console.log(`Box value: ${numberBox.getValue()}`);

// ============================================
// GENERIC CONSTRAINTS
// ============================================

// Constraint with extends
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): number {
  console.log(`Length: ${arg.length}`);
  return arg.length;
}

logLength("hello");
logLength([1, 2, 3]);
logLength({ length: 10, value: "test" });
// logLength(42); // Error: number has no length

// Constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user5 = { id: 1, name: "Alice", age: 30 };
console.log(`\nProperty: ${getProperty(user5, "name")}`);
console.log(`Property: ${getProperty(user5, "age")}`);
// getProperty(user5, "invalid"); // Error: not a key

/**
 * WHEN TO USE 'extends' WITH GENERICS:
 * 
 * 'extends' creates a CONSTRAINT - it means "must be compatible with" or 
 * "must have at least these properties/be assignable to this type"
 * 
 * Two main uses:
 * 
 * 1. WITH INTERFACES/OBJECTS: T extends Interface
 *    - T must have AT LEAST the properties in Interface (can have more)
 *    - Lets you safely access those properties
 *    - Example: T extends Lengthwise means T has .length (and maybe other stuff)
 * 
 * 2. WITH UNIONS: T extends string | number
 *    - T must be EXACTLY one of those types (no extra properties matter)
 *    - More restrictive - limits to specific types only
 *    - Example: T extends string | number means only strings3 or numbers5 allowed
 * 
 * WITHOUT extends: T can be ANY type at all
 */

// Constraint with union types - EXACT type match required
function createLoggedPair<S extends string | number, T extends string | number>(
  v1: S, 
  v2: T
): [S, T] {
  console.log(`creating pair: v1='${v1}', v2='${v2}'`);
  return [v1, v2];
}

const pair1 = createLoggedPair("hello", 42);
const pair2 = createLoggedPair(10, 20);
console.log(`\nLogged pair: [${pair1[0]}, ${pair1[1]}]`);
// createLoggedPair(true, "test"); // Error: boolean not in union
// createLoggedPair({}, []); // Error: object not in union

// ============================================
// MULTIPLE TYPE PARAMETERS
// ============================================

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair("age", 25);
const p2 = pair(true, "yes");
console.log(`\nPair: [${p1[0]}, ${p1[1]}]`);
console.log(`Pair: [${p2[0]}, ${p2[1]}]`);

// Map function with two types
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const numbers5 = [1, 2, 3];
const doubled5 = map(numbers5, n => n * 2);
const strings3 = map(numbers5, n => `Number: ${n}`);

console.log(`Mapped: ${doubled5.join(", ")}`);
console.log(`Mapped: ${strings3.join(", ")}`);

// ============================================
// GENERIC CLASSES
// ============================================

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(`\nStack peek: ${numberStack.peek()}`);
console.log(`Stack pop: ${numberStack.pop()}`);
console.log(`Stack size: ${numberStack.size()}`);

// ============================================
// GENERIC CONSTRAINTS WITH MULTIPLE TYPES
// ============================================

function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 30 });
console.log(`\nMerged: ${merged.name}, ${merged.age}`);

// ============================================
// DEFAULT GENERIC TYPES
// ============================================

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

const response11: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  success: false,
  timestamp: new Date()
};

const response22: ApiResponse = {
  data: "anything",
  status: 200,
  success: false,
  timestamp: new Date()
};

console.log(`\nResponse: ${response11.data.name}`);
console.log(`Response status: ${response22.status}`);

// ============================================
// GENERIC TYPE ALIASES
// ============================================

type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };

function divide2(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { success: false, error: "Division by zero" };
  }
  return { success: true, value: a / b };
}

const result1 = divide2(10, 2);
const result2 = divide2(10, 0);

if (result1.success) {
  console.log(`\nDivision: ${result1.value}`);
}

if (!result2.success) {
  console.log(`Error: ${result2.error}`);
}

// ============================================
// GENERIC ARRAY UTILITIES
// ============================================

function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

function find<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
  return arr.find(predicate);
}

function reduce<T, U>(
  arr: T[],
  fn: (acc: U, item: T) => U,
  initial: U
): U {
  return arr.reduce(fn, initial);
}

const nums = [1, 2, 3, 4, 5];
const evens = filter(nums, n => n % 2 === 0);
const firstEven = find(nums, n => n % 2 === 0);
const sum1 = reduce(nums, (acc, n) => acc + n, 0);

console.log(`\nEvens: ${evens.join(", ")}`);
console.log(`First even: ${firstEven}`);
console.log(`Sum: ${sum1}`);

// ============================================
// GENERIC PROMISE UTILITIES
// ============================================

// async function fetchData<T>(url: string): Promise<T> {
//   // Simulated fetch
//   return new Promise<T>((resolve) => {
//     setTimeout(() => {
//       resolve({ data: "example" } as T);
//     }, 100);
//   });
// }

// async function fetchWithRetry<T>(
//   fn: () => Promise<T>,
//   retries: number = 3
// ): Promise<T> {
//   try {
//     return await fn();
//   } catch (error) {
//     if (retries > 0) {
//       return fetchWithRetry(fn, retries - 1);
//     }
//     throw error;
//   }
// }

// ============================================
// CONDITIONAL TYPES WITH GENERICS
// ============================================

type Unwrap<T> = T extends Promise<infer U> ? U : T;

// type A = Unwrap<Promise<string>>;  // string
// type B = Unwrap<number>;           // number

function unwrap<T>(value: T): Unwrap<T> {
  if (value instanceof Promise) {
    throw new Error("Cannot unwrap Promise synchronously");
  }
  return value as Unwrap<T>;
}

console.log(`\nUnwrapped: ${unwrap(42)}`);

// ============================================
// MAPPED TYPES WITH GENERICS
// ============================================

type Readonly2<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial2<T> = {
  [P in keyof T]?: T[P];
};

// type Required<T> = {
//   [P in keyof T]-?: T[P];
// };

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const readonlyTodo: Readonly2<Todo> = {
  title: "Learn TypeScript",
  description: "Study generics",
  completed: false
};

// readonlyTodo.completed = true; // Error: readonly

const partialTodo: Partial2<Todo> = {
  title: "Partial2 todo"
  // Other fields optional
};

console.log(`Todo: ${readonlyTodo.title}`);
console.log(`Partial2: ${partialTodo.title}`);

// ============================================
// GENERIC FACTORY PATTERN
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
}

class Factory<T> {
  private counter = 0;

  create(props: Omit<T, "id"> & { id?: number }): T {
    const id = props.id ?? ++this.counter;
    return { ...props, id } as T;
  }
}

const productFactory = new Factory<Product>();
const product1 = productFactory.create({ name: "Laptop", price: 999 });
const product2 = productFactory.create({ name: "Mouse", price: 25 });

console.log(`\nProduct: ${product1.name} (${product1.id})`);
console.log(`Product: ${product2.name} (${product2.id})`);

// ============================================
// GENERIC EVENT EMITTER
// ============================================

class EventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }
}

interface Events {
  login: { username: string; timestamp: Date };
  logout: { username: string };
  error: { message: string; code: number };
}

const emitter = new EventEmitter<Events>();

emitter.on("login", (data) => {
  console.log(`\nUser logged in: ${data.username}`);
});

emitter.on("error", (data) => {
  console.log(`Error ${data.code}: ${data.message}`);
});

emitter.emit("login", { username: "alice", timestamp: new Date() });
emitter.emit("error", { message: "Not found", code: 404 });

// ============================================
// GENERIC REPOSITORY PATTERN
// ============================================

interface Entity {
  id: number | string;
}

interface Repository<T extends Entity> {
  findById(id: T["id"]): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, "id">): Promise<T>;
  update(id: T["id"], entity: Partial2<T>): Promise<T>;
  delete(id: T["id"]): Promise<boolean>;
}

class InMemoryRepository<T extends Entity> implements Repository<T> {
  private items = new Map<T["id"], T>();
  private idCounter = 0;

  async findById(id: T["id"]): Promise<T | null> {
    return this.items.get(id) || null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }

  async create(entity: Omit<T, "id">): Promise<T> {
    const id = ++this.idCounter as T["id"];
    const newEntity = { ...entity, id } as T;
    this.items.set(id, newEntity);
    return newEntity;
  }

  async update(id: T["id"], entity: Partial2<T>): Promise<T> {
    const existing = this.items.get(id);
    if (!existing) throw new Error("Not found");
    const updated = { ...existing, ...entity };
    this.items.set(id, updated);
    return updated;
  }

  async delete(id: T["id"]): Promise<boolean> {
    return this.items.delete(id);
  }
}

interface UserEntity extends Entity {
  username: string;
  email: string;
}

const userRepo = new InMemoryRepository<UserEntity>();

async function testRepo(): Promise<void> {
  const user5 = await userRepo.create({ username: "bob", email: "bob@example.com" });
  console.log(`\nCreated user5: ${user5.username} (${user5.id})`);
  
  const found = await userRepo.findById(user5.id);
  if (found) {
    console.log(`Found user5: ${found.username}`);
  }
}

testRepo();

// ============================================
// VARIANCE IN GENERICS
// ============================================

// Covariance (reading)
// interface Producer<out T> {
//   produce(): T;
// }

// Contravariance (writing)
// interface Consumer<in T> {
//   consume(item: T): void;
// }

// Invariance (both)
// interface Both<T> {
//   get(): T;
//   set(value: T): void;
// }

