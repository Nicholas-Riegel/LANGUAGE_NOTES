/**
 * TypeScript Object Types
 * 
 * Objects are the most common way to group and pass data in TypeScript.
 * Type checking helps catch errors with object structure.
 */

// ============================================
// OBJECT TYPE ANNOTATION
// ============================================

// Inline object type annotation - defines the shape of the object
// TypeScript checks that the object has exactly these properties with these types
const person: { name: string; age: number; active: boolean } = {
  name: "Alice",
  age: 25,
  active: true
};
// TypeScript will error if:
// - You're missing a required property
// - You have an extra property
// - A property has the wrong type

console.log("Object type annotation:");
console.log(`${person.name} is ${person.age} years old`);

// ============================================
// OPTIONAL PROPERTIES
// ============================================

// The ? makes a property optional - object can exist without it
// age?: number is equivalent to age: number | undefined
const user: { name: string; age?: number } = {
  name: "Bob"
  // age is optional - we can omit it
};

// When accessing optional properties, use optional chaining or nullish coalescing
console.log(`\nOptional property: ${user.name}, age: ${user.age ?? 'unknown'}`);

// IMPORTANT: Optional properties can be undefined, so always check before using
// if (user.age !== undefined) { console.log(user.age * 2); }

// ============================================
// READONLY PROPERTIES (TypeScript-only feature)
// ============================================

// readonly prevents reassignment after object creation
// This is enforced at compile-time, not runtime
const config: { readonly apiKey: string; timeout: number } = {
  apiKey: "abc123",
  timeout: 5000
};

// Attempting to modify readonly property causes compile error:
// config.apiKey = "new"; // Error: Cannot assign to 'apiKey' because it is a read-only property
config.timeout = 10000; // OK - timeout is not readonly

console.log(`\nConfig: ${config.apiKey}, ${config.timeout}ms`);

// USE CASE: Use readonly for values that should never change
// - API keys, configuration constants, IDs
// - Helps prevent accidental modifications

// ============================================
// INDEX SIGNATURES (Advanced TypeScript Feature)
// ============================================

// INDEX SIGNATURES allow objects to have properties with dynamic names
// Syntax: { [key: KeyType]: ValueType }
// - KeyType can only be string, number, or symbol
// - ValueType can be any type

// What is [key: string]: number?
// This tells TypeScript:
// "This object can have any number of properties"
// "Property names are strings (the 'key' part)"
// "Property values are numbers (the ': number' part)"
const scores: { [key: string]: number } = {
  math: 95,
  science: 87,
  english: 92
};

// Because of the index signature, we can add new properties dynamically
scores.history = 88; // OK - TypeScript allows any string key with number value
scores["geography"] = 90; // OK - same thing, bracket notation

// TypeScript will prevent wrong types:
// scores.art = "A+"; // Error: Type 'string' is not assignable to type 'number'

console.log(`\nScores: math=${scores.math}, history=${scores.history}`);

// WHY USE INDEX SIGNATURES?
// 1. Working with dynamic data (API responses, user input)
// 2. Creating dictionaries/maps with unknown keys
// 3. When property names are determined at runtime

// EXAMPLE: User preferences with unknown keys
const userPreferences: { [setting: string]: boolean } = {
  darkMode: true,
  notifications: false,
  autoSave: true
};
// Can add any preference dynamically:
userPreferences.newFeature = true;

// COMBINING INDEX SIGNATURES WITH KNOWN PROPERTIES
interface Dictionary {
  // Known properties with specific types
  length: number;
  // Index signature for unknown properties
  [key: string]: string | number; // Must include types of known properties!
}

const dict: Dictionary = {
  length: 3,
  word1: "hello",
  word2: "world",
  count: 42
};

// LIMITATION: All properties must match the index signature type
// If index signature is [key: string]: number, ALL properties must be numbers
// (except for known properties explicitly defined)

// NUMBER INDEX SIGNATURES
// Used for array-like objects
interface StringArray {
  [index: number]: string; // Access by number returns string
}

const myArray: StringArray = ["Alice", "Bob", "Charlie"];
console.log(myArray[0]); // "Alice"

// KEY DIFFERENCE: string vs number index signatures
// - string index: object["key"] or object.key
// - number index: object[0] or object[1] (array-like)

// ============================================
// NESTED OBJECTS
// ============================================

// Objects can contain other objects (nested structure)
// Each level has its own type definition
const employee: {
  id: number;
  name: string;
  address: {  // Nested object type
    street: string;
    city: string;
    zip: string;
  };
} = {
  id: 1,
  name: "John Doe",
  address: {  // Must match the nested type structure
    street: "123 Main St",
    city: "NYC",
    zip: "10001"
  }
};

console.log(`\nEmployee: ${employee.name} from ${employee.address.city}`);

// TypeScript checks nested objects deeply:
// - employee.address.city is typed as string
// - employee.address.invalidProp would cause an error
// - Nested objects provide full type safety at all levels

// ============================================
// OBJECT TYPE INFERENCE
// ============================================

// TypeScript automatically infers object types from their values
// No type annotation needed - TypeScript figures it out
const product = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  inStock: true
};

// TypeScript infers the type as:
// { id: number; name: string; price: number; inStock: boolean; }
// Hover over 'product' in your IDE to see the inferred type

console.log(`\nProduct: ${product.name} - $${product.price}`);

// BENEFIT: Less typing, but still type-safe!
// TypeScript will still catch errors:
// product.name = 123; // Error: Type 'number' is not assignable to type 'string'
// product.invalid = "test"; // Error: Property 'invalid' does not exist

// WHEN TO USE INFERENCE:
// - Simple objects where type is obvious
// - Internal variables not passed to functions
// 
// WHEN TO USE EXPLICIT TYPES:
// - Function parameters and return types
// - Public API boundaries
// - When inference might be too broad (e.g., const x = null)

// ============================================
// TYPE ALIASES FOR OBJECTS
// ============================================

// Type aliases create reusable named types
// Use 'type' keyword to define an object shape once, use it many times
type User = {
  id: number;
  username: string;
  email: string;
  isAdmin?: boolean;  // Optional property
};

// Now we can use 'User' as a type anywhere
const user1: User = {
  id: 1,
  username: "alice",
  email: "alice@example.com"
  // isAdmin is optional, so we can omit it
};

// Create another user with the same type
// const user2: User = { id: 2, username: "bob", email: "bob@example.com", isAdmin: true };

console.log(`\nUser: ${user1.username} (${user1.email})`);

// BENEFITS OF TYPE ALIASES:
// - DRY (Don't Repeat Yourself) - define once, use everywhere
// - Easy to update - change in one place affects all uses
// - More readable - 'User' is clearer than { id: number; username: string; ... }
// - Can be exported and reused across files

// ============================================
// INTERFACES FOR OBJECTS
// ============================================

// Interfaces are another way to define object shapes
// Similar to type aliases, but with some differences (see below)
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
  // description is optional
};

const phone: Product = {
  id: 2,
  name: "iPhone",
  price: 999,
  description: "Latest model"
};

console.log(`\nProducts: ${laptop.name}, ${phone.name}`);

// Note: For a detailed comparison of interfaces vs type aliases,
// see 08_aliases_interfaces.ts

// ============================================
// INTERSECTION TYPES (&)
// ============================================

// Intersection types combine multiple types into one
// The & operator means "AND" - must have ALL properties from ALL types
type ContactInfo = {
  email: string;
  phone: string;
};

type PersonalInfo = {
  name: string;
  age: number;
};

// Contact has ALL properties from both types
type Contact = ContactInfo & PersonalInfo;
// Equivalent to:
// type Contact = {
//   email: string;
//   phone: string;
//   name: string;
//   age: number;
// }

const contact: Contact = {
  // Must have ALL properties from both types
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  phone: "555-1234"
};

console.log(`\nContact: ${contact.name} - ${contact.email}`);

// INTERSECTION vs UNION:
// - Intersection (&): Must have ALL properties (A AND B)
// - Union (|): Can have properties from either (A OR B)
// 
// Example:
// type A = { x: number };
// type B = { y: number };
// type Inter = A & B; // Must have both x AND y
// type Union = A | B; // Can have x OR y (or both)

// ============================================
// OBJECT METHODS (Functions as Properties)
// ============================================

// Objects can have methods (functions) as properties
// TypeScript types both the parameters and return value
interface Calculator {
  add(a: number, b: number): number;      // Method signature
  subtract(a: number, b: number): number; // Parameters and return type
}

const calc: Calculator = {
  add(a, b) {
    // TypeScript infers parameter types from interface
    // a and b are numbers, return type must be number
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

console.log(`\nCalculator: 5 + 3 = ${calc.add(5, 3)}`);

// ALTERNATIVE METHOD SYNTAX:
// These are equivalent ways to define methods:
// interface Calculator {
//   add: (a: number, b: number) => number;  // Arrow function syntax
//   subtract(a: number, b: number): number;  // Method syntax (preferred)
// }

// TypeScript ensures:
// - Correct number and types of arguments
// - Correct return type
// - Methods are called properly: calc.add(1, 2) ✓, calc.add("1", "2") ✗

// ============================================
// EXTENDING INTERFACES (Inheritance)
// ============================================

// Base interface with common properties
interface Animal {
  name: string;
  age: number;
}

// Dog extends Animal - inherits all Animal properties plus adds its own
interface Dog extends Animal {
  breed: string;   // Dog-specific property
  bark(): void;    // Dog-specific method
}

// Dog objects must have ALL properties:
// - name and age (from Animal)
// - breed and bark (from Dog)
const dog: Dog = {
  name: "Rex",      // From Animal
  age: 3,           // From Animal
  breed: "Golden Retriever",  // From Dog
  bark() {          // From Dog
    console.log("Woof!");
  }
};

console.log(`\nDog: ${dog.name}, ${dog.breed}`);

// WHY USE EXTENDS?
// - Code reuse - don't repeat common properties
// - Hierarchy - models "is-a" relationships (Dog is an Animal)
// - Maintainability - change Animal, all extending interfaces update
// 
// CAN EXTEND MULTIPLE INTERFACES:
// interface Dog extends Animal, Trainable, Friendly {
//   breed: string;
// }

// ============================================
// PRACTICAL EXAMPLES
// ============================================

// API Response with Generic Type
// <T> makes this interface reusable for any data type
interface ApiResponse<T> {
  success: boolean;
  data: T;          // T is a type parameter - can be any type
  error?: string;   // Optional error message
  timestamp: Date;
}

// Use ApiResponse with User type - TypeScript knows data is a User
const userResponse: ApiResponse<User> = {
  success: true,
  data: user1,      // Must be a User object
  timestamp: new Date()
};

console.log(`\nAPI Response: success=${userResponse.success}`);

// Can use with different types:
// const productResponse: ApiResponse<Product> = { ... };
// const numberResponse: ApiResponse<number> = { ... };

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

function getProperty1<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const value = getProperty1(person, "name");
console.log(`\nGet property: ${value}`);

function updateObject<T>(obj: T, updates: Partial<T>): T {
  return { ...obj, ...updates };
}

const updatedUser = updateObject(user1, { username: "alice_updated" });
console.log(`Updated user: ${updatedUser.username}`);

// ============================================
// OBJECT DESTRUCTURING (TypeScript maintains types)
// ============================================

// Extract properties from object and rename them
// TypeScript preserves types: userName is string, userEmail is string
const { username: userName, email: userEmail } = user1;
console.log(`\nDestructured: ${userName}, ${userEmail}`);

// Destructuring with default values
// If isAdmin is undefined, use false as default
const { isAdmin = false } = user1;
console.log(`Is admin: ${isAdmin}`);

// TypeScript tracks types through destructuring:
// - userName is typed as string (from User.username)
// - isAdmin is typed as boolean (from default value or User.isAdmin)
// 
// This prevents errors:
// const { username } = user1;
// username = 123; // Error: Can't assign number to string

// ============================================
// KEY TAKEAWAYS
// ============================================

/*
OBJECT TYPES IN TYPESCRIPT:

1. TYPE ANNOTATIONS: Define exact shape { prop: type }
2. OPTIONAL PROPERTIES: Use ? for optional props
3. READONLY: Prevent modifications with readonly keyword
4. INDEX SIGNATURES: Allow dynamic property names [key: string]: type
5. TYPE ALIASES: Create reusable types with 'type'
6. INTERFACES: Define object shapes, can extend others
7. INTERSECTION: Combine types with & (AND)
8. UNION: Alternative types with | (OR)
9. METHODS: Objects can have typed functions
10. GENERICS: Make types reusable with <T>

INDEX SIGNATURES RECAP:
- Syntax: { [key: string]: ValueType }
- Allows any number of properties with dynamic names
- Key type can be string, number, or symbol
- All properties must match the value type
- Useful for dictionaries, maps, and dynamic data
*/
