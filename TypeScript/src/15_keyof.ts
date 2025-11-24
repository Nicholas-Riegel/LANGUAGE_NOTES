/**
 * TypeScript Keyof Operator
 * 
 * The keyof operator takes an object type and produces a string
 * or numeric literal union of its keys.
 */

// ============================================
// BASIC KEYOF
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserKeys = keyof User;
// "id" | "name" | "email" | "age"

const key1: UserKeys = "name";
const key2: UserKeys = "email";
console.log(`Keys: ${key1}, ${key2}`);

// ============================================
// KEYOF WITH FUNCTIONS
// ============================================

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30
};

console.log(`\nProperty: ${getProperty(user, "name")}`);
console.log(`Property: ${getProperty(user, "age")}`);
// getProperty(user, "invalid"); // Error: invalid key

// ============================================
// KEYOF WITH MAPPED TYPES
// ============================================

// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties readonly
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };

interface Product {
  id: number;
  name: string;
  price: number;
}

const partialProduct: Partial<Product> = {
  name: "Laptop"
  // Other properties optional
};

console.log(`\nPartial product: ${partialProduct.name}`);

// ============================================
// KEYOF WITH INDEX SIGNATURES
// ============================================

interface StringMap {
  [key: string]: string;
}

// type StringMapKeys = keyof StringMap;
// string | number (index signatures include number)

const map: StringMap = {
  hello: "world",
  foo: "bar"
};

function getValue(obj: StringMap, key: string): string {
  return obj[key];
}

console.log(`Value: ${getValue(map, "hello")}`);

// ============================================
// KEYOF WITH GENERIC CONSTRAINTS
// ============================================

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

const picked = pick(user, ["id", "name"]);
console.log(`\nPicked: ${picked.name} (${picked.id})`);

// ============================================
// KEYOF WITH TYPE GUARDS
// ============================================

function hasKey<T extends object>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return key in obj;
}

const obj = { a: 1, b: 2, c: 3 };

function safeGet(key: string): number | undefined {
  if (hasKey(obj, key)) {
    return obj[key]; // TypeScript knows key is valid
  }
  return undefined;
}

console.log(`Safe get: ${safeGet("a")}`);
console.log(`Safe get: ${safeGet("invalid")}`);

// ============================================
// KEYOF WITH UNIONS
// ============================================

// interface Cat {
//   meow(): void;
//   purr(): void;
// }

// interface Dog {
//   bark(): void;
//   wag(): void;
// }

// type AnimalKeys = keyof (Cat | Dog);
// never - only common keys (intersection)

// type AnimalAllKeys = keyof Cat | keyof Dog;
// "meow" | "purr" | "bark" | "wag" (union)

// ============================================
// KEYOF WITH CLASSES
// ============================================

class Person {
  constructor(
    public name: string,
    public age: number,
    private password: string
  ) {}

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }

  checkPassword(input: string): boolean {
    return this.password === input;
  }
}

type PersonKeys = keyof Person;
// "name" | "age" | "greet" | "checkPassword" (public members)

const person = new Person("Bob", 25, "secret");
const personKey: PersonKeys = "name";
console.log(`\nPerson key: ${personKey}`);
console.log(`Password check: ${person.checkPassword("secret")}`);

// ============================================
// KEYOF WITH CONDITIONAL TYPES
// ============================================

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface Mixed {
  id: number;
  name: string;
  email: string;
  age: number;
  active: boolean;
}

type StringKeysOnly = StringKeys<Mixed>;
// "name" | "email"

const stringKey: StringKeysOnly = "name";
console.log(`String key: ${stringKey}`);

// ============================================
// KEYOF WITH FUNCTION PARAMETERS
// ============================================

function updateProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

const product: Product = {
  id: 1,
  name: "Mouse",
  price: 25
};

updateProperty(product, "price", 20);
console.log(`\nUpdated price: ${product.price}`);
// updateProperty(product, "price", "invalid"); // Error: wrong type

// ============================================
// KEYOF WITH NESTED OBJECTS
// ============================================

interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
    maxConnections: number;
  };
}

// type ConfigKeys = keyof Config;
// "server" | "database"

// type ServerKeys = keyof Config["server"];
// "host" | "port"

function getNestedValue<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1]
>(obj: T, key1: K1, key2: K2): T[K1][K2] {
  return obj[key1][key2];
}

const config: Config = {
  server: { host: "localhost", port: 3000 },
  database: { url: "postgres://...", maxConnections: 10 }
};

console.log(`Nested: ${getNestedValue(config, "server", "host")}`);
console.log(`Nested: ${getNestedValue(config, "database", "maxConnections")}`);

// ============================================
// KEYOF WITH RECORD
// ============================================

type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

type PermissionKeys = keyof Permissions;
// "admin" | "user" | "guest"

function getPermissions(role: PermissionKeys): string[] {
  return permissions[role];
}

console.log(`\nPermissions: ${getPermissions("admin").join(", ")}`);

// ============================================
// KEYOF WITH EXCLUDE/EXTRACT
// ============================================

interface Article {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Exclude certain keys
type EditableKeys = Exclude<keyof Article, "id" | "createdAt" | "updatedAt">;
// "title" | "content" | "authorId"

type EditableArticle = Pick<Article, EditableKeys>;

const editable: EditableArticle = {
  title: "New Article",
  content: "Lorem ipsum",
  authorId: 1
};

console.log(`\nEditable: ${editable.title}`);

// Extract only Date keys
// type DateKeys<T> = {
//   [K in keyof T]: T[K] extends Date ? K : never;
// }[keyof T];

// type ArticleDateKeys = DateKeys<Article>;
// "createdAt" | "updatedAt"

// ============================================
// PRACTICAL PATTERNS
// ============================================

// Form validation
type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => boolean | string;
};

interface LoginForm {
  username: string;
  password: string;
}

const loginRules: ValidationRules<LoginForm> = {
  username: (value) => value.length >= 3 || "Too short",
  password: (value) => value.length >= 8 || "Password too short"
};

function validate<T>(data: T, rules: ValidationRules<T>): boolean {
  for (const key in rules) {
    const rule = rules[key];
    if (rule) {
      const result = rule(data[key]);
      if (result !== true) {
        console.log(`Validation error for ${String(key)}: ${result}`);
        return false;
      }
    }
  }
  return true;
}

console.log(`\nValidation: ${validate({ username: "al", password: "12345678" }, loginRules)}`);

// Event emitter with typed events
type EventMap = {
  click: { x: number; y: number };
  keypress: { key: string };
  submit: { data: Record<string, any> };
};

class TypedEventEmitter<T extends Record<string, any>> {
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

const emitter = new TypedEventEmitter<EventMap>();

emitter.on("click", (data) => {
  console.log(`\nClicked at (${data.x}, ${data.y})`);
});

emitter.emit("click", { x: 100, y: 200 });

// Query builder
type QueryOperator<T> = {
  [K in keyof T]?: {
    equals?: T[K];
    notEquals?: T[K];
    in?: T[K][];
    notIn?: T[K][];
  };
};

interface UserFilter {
  id: number;
  name: string;
  age: number;
}

const query: QueryOperator<UserFilter> = {
  age: { equals: 30 },
  name: { in: ["Alice", "Bob"] }
};

console.log(`\nQuery age: ${query.age?.equals}`);

// ============================================
// EXPORTED TYPES
// ============================================

export type { User, Product, Config, Article };
export { getProperty, pick, hasKey, updateProperty, TypedEventEmitter };
export type { ValidationRules, EventMap, QueryOperator };
