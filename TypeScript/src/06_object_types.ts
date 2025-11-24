/**
 * TypeScript Object Types
 * 
 * Objects are the most common way to group and pass data in TypeScript.
 * Type checking helps catch errors with object structure.
 */

// ============================================
// OBJECT TYPE ANNOTATION
// ============================================

// Inline object type
const person: { name: string; age: number; active: boolean } = {
  name: "Alice",
  age: 25,
  active: true
};

console.log("Object type annotation:");
console.log(`${person.name} is ${person.age} years old`);

// ============================================
// OPTIONAL PROPERTIES
// ============================================

const user: { name: string; age?: number } = {
  name: "Bob"
  // age is optional
};

console.log(`\nOptional property: ${user.name}, age: ${user.age ?? 'unknown'}`);

// ============================================
// READONLY PROPERTIES
// ============================================

const config: { readonly apiKey: string; timeout: number } = {
  apiKey: "abc123",
  timeout: 5000
};

// config.apiKey = "new"; // Error: readonly property
config.timeout = 10000; // OK

console.log(`\nConfig: ${config.apiKey}, ${config.timeout}ms`);

// ============================================
// INDEX SIGNATURES
// ============================================

// Allow dynamic property names
const scores: { [key: string]: number } = {
  math: 95,
  science: 87,
  english: 92
};

scores.history = 88; // OK
console.log(`\nScores: math=${scores.math}, history=${scores.history}`);

// ============================================
// NESTED OBJECTS
// ============================================

const employee: {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
} = {
  id: 1,
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "NYC",
    zip: "10001"
  }
};

console.log(`\nEmployee: ${employee.name} from ${employee.address.city}`);

// ============================================
// OBJECT TYPE INFERENCE
// ============================================

// TypeScript infers the type
const product = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  inStock: true
};

// Type is inferred as:
// { id: number; name: string; price: number; inStock: boolean; }

console.log(`\nProduct: ${product.name} - $${product.price}`);

// ============================================
// TYPE ALIASES FOR OBJECTS
// ============================================

type User = {
  id: number;
  username: string;
  email: string;
  isAdmin?: boolean;
};

const user1: User = {
  id: 1,
  username: "alice",
  email: "alice@example.com"
};

// Example with admin flag
// const user2: User = { id: 2, username: "bob", email: "bob@example.com", isAdmin: true };

console.log(`\nUser: ${user1.username} (${user1.email})`);

// ============================================
// INTERFACES FOR OBJECTS
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

const laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 2499
};

const phone: Product = {
  id: 2,
  name: "iPhone",
  price: 999,
  description: "Latest model"
};

console.log(`\nProducts: ${laptop.name}, ${phone.name}`);

// ============================================
// INTERSECTION TYPES
// ============================================

type ContactInfo = {
  email: string;
  phone: string;
};

type PersonalInfo = {
  name: string;
  age: number;
};

type Contact = ContactInfo & PersonalInfo;

const contact: Contact = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  phone: "555-1234"
};

console.log(`\nContact: ${contact.name} - ${contact.email}`);

// ============================================
// OBJECT METHODS
// ============================================

interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

console.log(`\nCalculator: 5 + 3 = ${calc.add(5, 3)}`);

// ============================================
// EXTENDING INTERFACES
// ============================================

interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const dog: Dog = {
  name: "Rex",
  age: 3,
  breed: "Golden Retriever",
  bark() {
    console.log("Woof!");
  }
};

console.log(`\nDog: ${dog.name}, ${dog.breed}`);

// ============================================
// PRACTICAL EXAMPLES
// ============================================

// API Response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: Date;
}

const userResponse: ApiResponse<User> = {
  success: true,
  data: user1,
  timestamp: new Date()
};

console.log(`\nAPI Response: success=${userResponse.success}`);

// Database Record
interface DBRecord {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UserRecord extends DBRecord {
  username: string;
  email: string;
}

const dbUser: UserRecord = {
  id: 1,
  username: "alice",
  email: "alice@example.com",
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log(`\nDB User: ${dbUser.username} (ID: ${dbUser.id})`);

// Configuration Object
interface AppConfig {
  apiUrl: string;
  timeout: number;
  retryAttempts: number;
  features: {
    darkMode: boolean;
    notifications: boolean;
  };
}

const appConfig: AppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retryAttempts: 3,
  features: {
    darkMode: true,
    notifications: false
  }
};

console.log(`\nApp config: ${appConfig.apiUrl}`);

// ============================================
// OBJECT UTILITY FUNCTIONS
// ============================================

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const value = getProperty(person, "name");
console.log(`\nGet property: ${value}`);

function updateObject<T>(obj: T, updates: Partial<T>): T {
  return { ...obj, ...updates };
}

const updatedUser = updateObject(user1, { username: "alice_updated" });
console.log(`Updated user: ${updatedUser.username}`);

// ============================================
// OBJECT DESTRUCTURING
// ============================================

const { username: userName, email: userEmail } = user1;
console.log(`\nDestructured: ${userName}, ${userEmail}`);

// With defaults
const { isAdmin = false } = user1;
console.log(`Is admin: ${isAdmin}`);

// ============================================
// EXPORTED TYPES AND FUNCTIONS
// ============================================

export interface Person {
  name: string;
  age: number;
  email?: string;
}

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export function createPerson(name: string, age: number): Person {
  return { name, age };
}

export function getFullAddress(address: Address): string {
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
}

export function mergeObjects<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  return { ...obj1, ...obj2 };
}

export { user1, product, calc };
