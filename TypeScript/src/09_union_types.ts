/**
 * TypeScript Union Types
 * 
 * Union types allow a value to be one of several types.
 * Use the | (pipe) operator to combine types.
 */

// ============================================
// BASIC UNION TYPES
// ============================================

// Simple union
type StringOrNumber = string | number;

let value: StringOrNumber;
value = "hello";
console.log(`String value: ${value}`);
value = 42;
console.log(`Number value: ${value}`);

// Multiple types
type ID = string | number | symbol;

function printId(id: ID): void {
  console.log(`ID: ${String(id)}`);
}

printId("abc");
printId(123);
printId(Symbol("unique"));

// ============================================
// TYPE NARROWING
// ============================================

// Using typeof
function processValue(value: string | number): string {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
}

console.log(`\nProcessed: ${processValue("hello")}`);
console.log(`Processed: ${processValue(3.14159)}`);

// Using in operator
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird): void {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}

const fish: Fish = { swim: () => console.log("Swimming...") };
const bird: Bird = { fly: () => console.log("Flying...") };

move(fish);
move(bird);

// Using instanceof
class Dog {
  bark(): void {
    console.log("Woof!");
  }
}

class Cat {
  meow(): void {
    console.log("Meow!");
  }
}

function makeSound(pet: Dog | Cat): void {
  if (pet instanceof Dog) {
    pet.bark();
  } else {
    pet.meow();
  }
}

makeSound(new Dog());
makeSound(new Cat());

// ============================================
// DISCRIMINATED UNIONS (TAGGED UNIONS)
// ============================================

// Shape example with discriminant property
type Circle = {
  kind: "circle";
  radius: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Triangle = {
  kind: "triangle";
  base: number;
  height: number;
};

type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const circle: Circle = { kind: "circle", radius: 5 };
const rect: Rectangle = { kind: "rectangle", width: 10, height: 20 };
const tri: Triangle = { kind: "triangle", base: 8, height: 12 };

console.log(`\nCircle area: ${getArea(circle).toFixed(2)}`);
console.log(`Rectangle area: ${getArea(rect)}`);
console.log(`Triangle area: ${getArea(tri)}`);

// ============================================
// API RESPONSE PATTERN
// ============================================

type SuccessResponse<T> = {
  status: "success";
  data: T;
  timestamp: Date;
};

type ErrorResponse = {
  status: "error";
  message: string;
  code: number;
};

type LoadingResponse = {
  status: "loading";
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse | LoadingResponse;

function handleResponse<T>(response: ApiResponse<T>): string {
  switch (response.status) {
    case "success":
      return `Success: ${JSON.stringify(response.data)}`;
    case "error":
      return `Error ${response.code}: ${response.message}`;
    case "loading":
      return "Loading...";
  }
}

const successRes: ApiResponse<{ id: number; name: string }> = {
  status: "success",
  data: { id: 1, name: "Alice" },
  timestamp: new Date()
};

const errorRes: ApiResponse<never> = {
  status: "error",
  message: "Not found",
  code: 404
};

console.log(`\n${handleResponse(successRes)}`);
console.log(handleResponse(errorRes));

// ============================================
// UNION WITH ARRAYS
// ============================================

type MixedArray = (string | number | boolean)[];

const mixed: MixedArray = ["hello", 42, true, "world", 3.14];
console.log(`\nMixed array: ${mixed.join(", ")}`);

// Array of different object types
type Post = { type: "post"; title: string; content: string };
type Comment = { type: "comment"; text: string; author: string };
type Like = { type: "like"; userId: number };

type FeedItem = Post | Comment | Like;

const feed: FeedItem[] = [
  { type: "post", title: "Hello", content: "First post" },
  { type: "comment", text: "Great!", author: "Bob" },
  { type: "like", userId: 123 }
];

feed.forEach(item => {
  if (item.type === "post") {
    console.log(`Post: ${item.title}`);
  } else if (item.type === "comment") {
    console.log(`Comment by ${item.author}: ${item.text}`);
  } else {
    console.log(`Like from user ${item.userId}`);
  }
});

// ============================================
// LITERAL TYPES IN UNIONS
// ============================================

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Status = "pending" | "approved" | "rejected";

function makeRequest(url: string, method: HttpMethod): void {
  console.log(`${method} ${url}`);
}

makeRequest("/api/users", "GET");
makeRequest("/api/users", "POST");

type Direction = "north" | "south" | "east" | "west";
type Distance = number;

function move2(direction: Direction, distance: Distance): string {
  return `Moving ${distance}m ${direction}`;
}

console.log(`\n${move2("north", 100)}`);

// ============================================
// UNION WITH NULL/UNDEFINED
// ============================================

type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

function greet(name: Maybe<string>): string {
  if (name == null) {  // checks both null and undefined
    return "Hello, Guest!";
  }
  return `Hello, ${name}!`;
}

console.log(`\n${greet("Alice")}`);
console.log(greet(null));
console.log(greet(undefined));

// ============================================
// INTERSECTION TYPES
// ============================================

// Intersection combines types (must have all properties)
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const person: Person = {
  name: "Bob",
  age: 30
};

console.log(`\nPerson: ${person.name}, ${person.age}`);

// Combining interfaces
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

type Document = Printable & Saveable & {
  title: string;
  content: string;
};

const doc: Document = {
  title: "Report",
  content: "Lorem ipsum",
  print() { console.log("Printing..."); },
  save() { console.log("Saving..."); }
};

doc.print();

// ============================================
// PRACTICAL PATTERNS
// ============================================

// Redux Action Pattern
type Action =
  | { type: "ADD_TODO"; payload: { text: string } }
  | { type: "REMOVE_TODO"; payload: { id: number } }
  | { type: "TOGGLE_TODO"; payload: { id: number } }
  | { type: "CLEAR_TODOS" };

function reducer(state: any, action: Action): any {
  switch (action.type) {
    case "ADD_TODO":
      console.log(`Adding: ${action.payload.text}`);
      return state;
    case "REMOVE_TODO":
      console.log(`Removing: ${action.payload.id}`);
      return state;
    case "TOGGLE_TODO":
      console.log(`Toggling: ${action.payload.id}`);
      return state;
    case "CLEAR_TODOS":
      console.log("Clearing all");
      return state;
  }
}

reducer({}, { type: "ADD_TODO", payload: { text: "Learn TypeScript" } });

// Form Field Union
type TextField = {
  type: "text";
  value: string;
  placeholder?: string;
};

type NumberField = {
  type: "number";
  value: number;
  min?: number;
  max?: number;
};

type CheckboxField = {
  type: "checkbox";
  checked: boolean;
};

type FormField = TextField | NumberField | CheckboxField;

function renderField(field: FormField): string {
  switch (field.type) {
    case "text":
      return `<input type="text" value="${field.value}" placeholder="${field.placeholder || ''}" />`;
    case "number":
      return `<input type="number" value="${field.value}" min="${field.min || ''}" max="${field.max || ''}" />`;
    case "checkbox":
      return `<input type="checkbox" ${field.checked ? "checked" : ""} />`;
  }
}

const textField: TextField = { type: "text", value: "Hello", placeholder: "Enter text" };
console.log(`\n${renderField(textField)}`);

// Event Handler Union
type MouseEvent = { type: "click"; x: number; y: number };
type KeyboardEvent = { type: "keypress"; key: string };
type FormEvent = { type: "submit"; data: Record<string, any> };

type UIEvent = MouseEvent | KeyboardEvent | FormEvent;

function handleEvent(event: UIEvent): void {
  switch (event.type) {
    case "click":
      console.log(`Clicked at (${event.x}, ${event.y})`);
      break;
    case "keypress":
      console.log(`Key pressed: ${event.key}`);
      break;
    case "submit":
      console.log(`Form submitted:`, event.data);
      break;
  }
}

handleEvent({ type: "click", x: 100, y: 200 });
handleEvent({ type: "keypress", key: "Enter" });

// ============================================
// TYPE GUARDS
// ============================================

// Custom type guard function
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processUnknown(value: unknown): void {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    console.log("Not a string");
  }
}

processUnknown("hello");
processUnknown(42);

// Type predicate for object
interface Admin {
  role: "admin";
  permissions: string[];
}

interface User {
  role: "user";
  username: string;
}

function isAdmin(user: Admin | User): user is Admin {
  return user.role === "admin";
}

function checkPermissions(user: Admin | User): void {
  if (isAdmin(user)) {
    console.log(`\nAdmin permissions: ${user.permissions.join(", ")}`);
  } else {
    console.log(`User: ${user.username}`);
  }
}

const admin: Admin = { role: "admin", permissions: ["read", "write", "delete"] };
const user: User = { role: "user", username: "alice" };

checkPermissions(admin);
checkPermissions(user);

// ============================================
// EXPORTED TYPES
// ============================================

export type { Shape, Circle, Rectangle, Triangle };
export type { ApiResponse, SuccessResponse, ErrorResponse };
export type { Action, FormField };
export type { HttpMethod, Status, Direction };
export type { Nullable, Optional, Maybe };
