/**
 * TypeScript Utility Types
 * 
 * TypeScript provides built-in utility types to facilitate
 * common type transformations.
 */

// ============================================
// PARTIAL<T>
// ============================================

// Makes all properties optional
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

// Makes all properties required
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

// Makes all properties readonly
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

// Creates object type with keys K and values T
type Role = "admin" | "user" | "guest";

const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

console.log(`\nAdmin permissions: ${permissions.admin.join(", ")}`);

// String keys
type PageInfo = Record<string, { title: string; views: number }>;

const pages: PageInfo = {
  home: { title: "Home", views: 1000 },
  about: { title: "About", views: 500 }
};

console.log(`Page: ${pages.home.title}`);

// ============================================
// PICK<T, K>
// ============================================

// Creates type by picking properties K from T
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

// Creates type by removing properties K from T
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

// Excludes from T types that are assignable to U
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

// Extracts from T types that are assignable to U
type AllValues = "a" | "b" | "c" | 1 | 2 | 3;
type OnlyStrings = Extract<AllValues, string>;
// "a" | "b" | "c"

const extracted: OnlyStrings = "a";
console.log(`Extracted: ${extracted}`);

// ============================================
// NONNULLABLE<T>
// ============================================

// Removes null and undefined from T
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

const str: DefiniteString = "hello";
console.log(`\nNonNullable: ${str}`);

// ============================================
// RETURNTYPE<T>
// ============================================

// Gets return type of function T
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

// Gets parameter types of function T as tuple
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

// Gets parameter types of constructor
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

// Gets instance type of constructor
class Database {
  connect(): void {
    console.log("Connected");
  }
}

type DbInstance = InstanceType<typeof Database>;

const db: DbInstance = new Database();
db.connect();

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
