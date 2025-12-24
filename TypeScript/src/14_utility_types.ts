/**
 * TypeScript Utility Types
 * 
 * TypeScript provides built-in utility types to facilitate
 * common type transformations.
 */

// ============================================
// PARTIAL<T>
// ============================================

/**
 * Partial<T> makes ALL properties optional
 * 
 * Useful for update functions where you only want to change some fields
 * Without Partial, you'd have to pass ALL properties even if unchanged
 */

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com", age: 30 };
const updated = updateUser(user, { age: 31 });

console.log(`Updated user: ${updated.name}, age ${updated.age}`);

// ============================================
// REQUIRED<T>
// ============================================

/**
 * Required<T> makes ALL properties required (removes ? optional markers)
 * 
 * Opposite of Partial - forces every property to be present
 */

interface PartialUser {
  id?: number;
  name?: string;
  email?: string;
}

type CompleteUser = Required<PartialUser>;
// All properties now required

const complete: CompleteUser = {
  id: 1,
  name: "Bob",
  email: "bob@example.com"
};

console.log(`\nComplete user: ${complete.name}`);

// ============================================
// READONLY<T>
// ============================================

/**
 * Readonly<T> makes ALL properties read-only (can't be reassigned)
 * 
 * Useful for immutable data structures or configuration objects
 * Properties can be read but not modified after creation
 */

interface Config {
  host: string;
  port: number;
  ssl: boolean;
}

const config: Readonly<Config> = {
  host: "localhost",
  port: 3000,
  ssl: true
};

// config.port = 8080; // Error: readonly

console.log(`Config: ${config.host}:${config.port}`);

// ============================================
// RECORD<K, T>
// ============================================

/**
 * Record<K, T> exists purely to avoid writing { [K in ...]: T }
 * 
 * That's it. Just a shorthand to save typing.
 */

type Role = "admin" | "user" | "guest";

// These are IDENTICAL:
type Permissions1 = Record<Role, string[]>;
type Permissions2 = { [K in Role]: string[] };

// Both create: { admin: string[]; user: string[]; guest: string[]; }

const permissions: Permissions1 = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

console.log(`\nAdmin permissions: ${permissions.admin.join(", ")}`);

// With string keys - also IDENTICAL:
type PageInfo1 = Record<string, { title: string; views: number }>;
type PageInfo2 = { [key: string]: { title: string; views: number } };

const pages: PageInfo1 = {
  home: { title: "Home", views: 1000 },
  about: { title: "About", views: 500 }
};

console.log(`Page: ${pages.home.title}`);

// ============================================
// PICK<T, K>
// ============================================

/**
 * Pick<T, K> creates a NEW type with ONLY the properties you specify
 * 
 * Like saying: "I want just these fields from this type"
 * Everything else is excluded
 */

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

type ProductPreview = Pick<Product, "id" | "name" | "price">;

const preview: ProductPreview = {
  id: 1,
  name: "Laptop",
  price: 999
};

console.log(`\nProduct preview: ${preview.name} - $${preview.price}`);

// ============================================
// OMIT<T, K>
// ============================================

/**
 * Omit<T, K> creates a NEW type with the specified properties REMOVED
 * 
 * Opposite of Pick - everything EXCEPT what you list
 * Like saying: "Give me everything but these fields"
 */

type ProductWithoutStock = Omit<Product, "stock">;

const product: ProductWithoutStock = {
  id: 1,
  name: "Mouse",
  price: 25,
  description: "Wireless mouse"
};

console.log(`Product: ${product.name}`);

// Multiple omit
type ProductSummary = Omit<Product, "description" | "stock">;

// ============================================
// EXCLUDE<T, U>
// ============================================

/**
 * Exclude<T, U> removes types from a UNION
 * 
 * Works on union types (|), not object properties
 * Removes any type that matches U from the union T
 */

type AllTypes = "create" | "read" | "update" | "delete" | "admin";
type UserActions = Exclude<AllTypes, "admin">;
// "create" | "read" | "update" | "delete"

const action: UserActions = "read";
console.log(`\nAction: ${action}`);

// With union types
// type StringOrNumber = string | number | boolean;
// type OnlyStringsOrNumbers = Exclude<StringOrNumber, boolean>;

// ============================================
// EXTRACT<T, U>
// ============================================

/**
 * Extract<T, U> keeps ONLY types from a union that match U
 * 
 * Opposite of Exclude - filters a union to keep only matching types
 * Like using .filter() but for type unions
 */

type AllValues = "a" | "b" | "c" | 1 | 2 | 3;
type OnlyStrings = Extract<AllValues, string>;
// "a" | "b" | "c"

const extracted: OnlyStrings = "a";
console.log(`Extracted: ${extracted}`);

// ============================================
// NONNULLABLE<T>
// ============================================

/**
 * NonNullable<T> removes null and undefined from a type
 * 
 * Ensures the value cannot be null or undefined
 * Useful after null checks or with strict null checking
 */

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

const str: DefiniteString = "hello";
console.log(`\nNonNullable: ${str}`);

// ============================================
// RETURNTYPE<T>
// ============================================

/**
 * ReturnType<T> extracts what a function RETURNS
 * 
 * T must be a function type (use typeof for actual functions)
 * Gives you the return type without calling the function
 */

function getUser() {
  return { id: 1, name: "Alice", email: "alice@example.com" };
}

type UserReturnType = ReturnType<typeof getUser>;
// { id: number; name: string; email: string; }

const userReturn: UserReturnType = getUser();
console.log(`Return type: ${userReturn.name}`);

// With generic function
// function createPair<T, U>(first: T, second: U) {
//   return { first, second };
// }

// type PairType = ReturnType<typeof createPair<string, number>>;

// ============================================
// PARAMETERS<T>
// ============================================

/**
 * Parameters<T> extracts function parameter types as a TUPLE
 * 
 * Returns an array type [param1Type, param2Type, ...]
 * Useful for creating wrapper functions or forwarding arguments
 */

function greet(name: string, age: number): string {
  return `Hello ${name}, ${age}`;
}

type GreetParams = Parameters<typeof greet>;
// [string, number]

const params: GreetParams = ["Bob", 25];
console.log(`\nParams: ${greet(...params)}`);

// ============================================
// CONSTRUCTORPARAMETERS<T>
// ============================================

/**
 * ConstructorParameters<T> extracts constructor parameter types as a TUPLE
 * 
 * Like Parameters but for class constructors
 * Tells you what arguments you need to call `new T(...)`
 */

class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>;
// [string, number]

const personParams: PersonParams = ["Charlie", 35];
const person = new Person(...personParams);
console.log(`Person: ${person.name}`);

// ============================================
// INSTANCETYPE<T>
// ============================================

/**
 * InstanceType<T> extracts the type of what you GET when you call `new T()`
 * 
 * Problem: typeof Database gives you the CLASS itself (the constructor)
 * Solution: InstanceType<typeof Database> gives you the INSTANCE type
 * 
 * Think of it as: "What type is the thing created by this class?"
 */

class Database {
  connect(): void {
    console.log("Connected");
  }
}

// typeof Database = the class constructor
// InstanceType<typeof Database> = the instance (what you get from `new Database()`)

type DbInstance = InstanceType<typeof Database>;
// DbInstance = { connect(): void }

const db: DbInstance = new Database();
db.connect();

// Why use this? When you want to reference the instance type without creating one
// Useful in factory functions, type guards, or when working with class references

// ============================================
// AWAITED<T>
// ============================================

// Gets the type awaited from a Promise
// type PromiseString = Promise<string>;
// type AwaitedString = Awaited<PromiseString>;
// string

// async function fetchData(): Promise<{ data: string }> {
//   return { data: "example" };
// }

// type FetchResult = Awaited<ReturnType<typeof fetchData>>;
// { data: string }

// Nested promises
// type NestedPromise = Promise<Promise<number>>;
// type UnwrappedNested = Awaited<NestedPromise>;
// number

// ============================================
// COMBINING UTILITY TYPES
// ============================================

// Partial + Pick
type PartialProductPreview = Partial<Pick<Product, "name" | "price">>;

const partialPreview: PartialProductPreview = {
  name: "Phone"
  // price is optional
};

console.log(`\nPartial preview: ${partialPreview.name}`);

// Required + Omit
interface FormData {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type LoginData = Required<Pick<FormData, "username" | "password">>;

const login: LoginData = {
  username: "alice",
  password: "secret"
};

console.log(`Login: ${login.username}`);

// ============================================
// CUSTOM UTILITY TYPES
// ============================================

// Nullable version
type Nullable<T> = T | null;

const nullableString: Nullable<string> = null;
console.log(`\nNullable: ${nullableString}`);

// Optional version
type Optional<T> = T | undefined;

// Deep Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedConfig {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
}

const partialConfig: DeepPartial<NestedConfig> = {
  server: {
    ssl: {
      enabled: true
      // cert is optional
    }
  }
};

console.log(`SSL: ${partialConfig.server?.ssl?.enabled}`);

// Deep Readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Mutable (opposite of Readonly)
// type Mutable<T> = {
//   -readonly [P in keyof T]: T[P];
// };

// const readonlyConfig: Readonly<Config> = config;
// const mutableConfig: Mutable<typeof readonlyConfig> = { ...readonlyConfig };

// ============================================
// PRACTICAL PATTERNS
// ============================================

// API Response builder
type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiError = {
  success: false;
  error: string;
  code: number;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

function handleResponse<T>(response: ApiResponse<T>): void {
  if (response.success) {
    console.log(`\nData:`, response.data);
  } else {
    console.log(`Error ${response.code}: ${response.error}`);
  }
}

handleResponse<User>({ success: true, data: user });
handleResponse<User>({ success: false, error: "Not found", code: 404 });

// Form field types - example pattern
// interface TextField {
//   type: "text";
//   value: string;
// }

// interface NumberField {
//   type: "number";
//   value: number;
// }

// type FormField = TextField | NumberField;

// Extract by type
// type ExtractByType<T, U> = T extends { type: U } ? T : never;

// type OnlyTextField = ExtractByType<FormField, "text">;
// TextField

// Update helper
type UpdatePayload<T> = Partial<Omit<T, "id" | "createdAt" | "updatedAt">>;

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const updatePayload: UpdatePayload<Article> = {
  title: "New title"
  // id, createdAt, updatedAt cannot be updated
};

console.log(`\nUpdate: ${updatePayload.title}`);

// ============================================
// MAPPED TYPE MODIFIERS
// ============================================

// Remove optional
// type Concrete<T> = {
//   [P in keyof T]-?: T[P];
// };

// Add optional
// type AllOptional<T> = {
//   [P in keyof T]?: T[P];
// };

// Remove readonly
// type WriteableConfig = {
//   -readonly [P in keyof Readonly<Config>]: Readonly<Config>[P];
// };

// ============================================
// TEMPLATE LITERAL TYPES
// ============================================

type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

const handler: EventHandler = "onClick";
console.log(`\nHandler: ${handler}`);

// HTTP Methods
type HttpMethod = "get" | "post" | "put" | "delete";
type HttpRoute = `/${string}`;

type Endpoint = `${HttpMethod} ${HttpRoute}`;

const endpoint: Endpoint = "get /api/users";
console.log(`Endpoint: ${endpoint}`);

// ============================================
// EXPORTED TYPES
// ============================================

export type { 
  User, Product, Config, Role,
  ProductPreview, ProductSummary,
  ApiResponse, ApiSuccess, ApiError,
  Nullable, Optional, DeepPartial, DeepReadonly
};
