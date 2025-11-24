/**
 * TypeScript Best Practices
 * Professional patterns and conventions for production code
 */

// ============================================================================
// 1. TYPE SAFETY
// ============================================================================

// ✅ Use strict types, avoid 'any'
function processData(data: unknown): string {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  return String(data);
}

// ❌ Avoid
// function processData(data: any) {
//   return data.toUpperCase();
// }

// ✅ Use type guards for narrowing
// function formatValue(value: string | number): string {
//   return typeof value === "string" ? value : value.toFixed(2);
// }

// ✅ Prefer interfaces for objects, types for unions/intersections
interface User {
  id: number;
  name: string;
}

type Status = "pending" | "approved" | "rejected";
type Result<T> = { success: true; data: T } | { success: false; error: string };

// ============================================================================
// 2. NAMING CONVENTIONS
// ============================================================================

// Interfaces: PascalCase
// interface UserProfile { id: number; }

// Types: PascalCase
// type UserId = string;

// Enums: PascalCase
enum HttpStatus {
  OK = 200,
  NotFound = 404,
}

// Functions/variables: camelCase
// const getUserById = (id: string) => ({ id, name: "User" });

// Constants: UPPER_SNAKE_CASE
// const API_BASE_URL = "https://api.example.com";
// const MAX_RETRY_COUNT = 3;

// Classes: PascalCase
class DatabaseConnection {
  connect() {}
}

// ============================================================================
// 3. ERROR HANDLING
// ============================================================================

// ✅ Type-safe error handling with Result type
type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code?: number };

async function fetchUser(id: string): Promise<ApiResult<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return { success: false, error: "User not found", code: response.status };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// ✅ Custom error classes
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// ============================================================================
// 4. NULL/UNDEFINED HANDLING
// ============================================================================

// ✅ Use optional chaining
// const userName = user?.profile?.name;

// ✅ Use nullish coalescing
// const displayName = userName ?? "Anonymous";

// ✅ Handle both explicitly
// function getLength(str: string | null | undefined): number {
//   if (str == null) return 0;  // Checks both null and undefined
//   return str.length;
// }

// ✅ Use NonNullable utility type
// type RequiredUser = NonNullable<User | null | undefined>;

// ============================================================================
// 5. FUNCTION SIGNATURES
// ============================================================================

// ✅ Explicit return types for public APIs
export function sumItems(items: number[]): number {
  return items.reduce((sum, item) => sum + item, 0);
}

// ✅ Use readonly for parameters you won't modify
// function processItems(items: readonly number[]): number[] {
//   return items.map(x => x * 2);  // ✅ Can read
//   // items.push(5);  // ❌ Error: readonly
// }

// ✅ Use const assertions for literal types
// const config = {
//   apiUrl: "https://api.example.com",
//   timeout: 5000,
// } as const;

// ✅ Prefer function declarations for hoisting
// function add(a: number, b: number): number {
//   return a + b;
// }

// ============================================================================
// 6. ASYNC/AWAIT
// ============================================================================

// ✅ Always handle errors in async functions
// async function loadData(): Promise<User[]> {
//   try {
//     const response = await fetch("/api/users");
//     return await response.json();
//   } catch (error) {
//     console.error("Failed to load data:", error);
//     return [];
//   }
// }

// ✅ Use Promise.all for parallel operations
// async function loadMultiple(ids: string[]): Promise<User[]> {
//   const promises = ids.map(id => fetchUser(id));
//   const results = await Promise.all(promises);
//   return results.filter(r => r.success).map(r => r.success ? r.data : null).filter((u): u is User => u !== null);
// }

// ============================================================================
// 7. OBJECT/ARRAY OPERATIONS
// ============================================================================

// ✅ Use destructuring
// const { id, name } = user;
// const [first, ...rest] = items;

// ✅ Use spread for immutability
// const updatedUser = { ...user, name: "New Name" };
// const newItems = [...items, newItem];

// ✅ Use Array methods instead of loops
// const activeUsers = users.filter(u => u.active);
// const userNames = users.map(u => u.name);
// const totalAge = users.reduce((sum, u => sum + u.age, 0);

// ============================================================================
// 8. TYPE ASSERTIONS
// ============================================================================

// ✅ Use 'as' syntax (not angle brackets)
// const input = document.getElementById("input") as HTMLInputElement;

// ✅ Use type guards instead of assertions when possible
function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "id" in value;
}

// ❌ Avoid double assertions (code smell)
// const x = value as unknown as SomeType;

// ============================================================================
// 9. GENERICS
// ============================================================================

// ✅ Use descriptive type parameter names
// function mapArray<TInput, TOutput>(
//   arr: TInput[],
//   fn: (item: TInput) => TOutput
// ): TOutput[] {
//   return arr.map(fn);
// }

// ✅ Add constraints when needed
// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
//   return obj[key];
// }

// ✅ Use default type parameters
// function createArray<T = string>(length: number, value: T): T[] {
//   return Array(length).fill(value);
// }

// ============================================================================
// 10. IMPORTS/EXPORTS
// ============================================================================

// ✅ Use named exports for utilities
// export { sumItems };

// ✅ Use type-only imports when importing only types
// import type { User, Status } from './types';

// ✅ Use barrel exports for clean imports
// export * from './user';
// export * from './product';

// ============================================================================
// 11. CODE ORGANIZATION
// ============================================================================

/*
Project Structure:

src/
  types/          # Shared type definitions
    user.ts
    api.ts
  utils/          # Utility functions
    date.ts
    string.ts
  services/       # Business logic
    user.service.ts
  models/         # Data models/classes
    user.model.ts
  constants/      # Constants
    config.ts
  index.ts        # Main entry point
*/

// ============================================================================
// 12. COMMENTS & DOCUMENTATION
// ============================================================================

/**
 * Fetches a user by ID from the API
 * @param id - The user's unique identifier
 * @returns A promise that resolves to the user data
 * @throws {ValidationError} If the ID format is invalid
 */
export async function getUserData(id: string): Promise<User> {
  if (!id) throw new ValidationError("id", "ID is required");
  const result = await fetchUser(id);
  if (!result.success) throw new Error(result.error);
  return result.data;
}

// ============================================================================
// 13. PERFORMANCE TIPS
// ============================================================================

// ✅ Use const for values that don't change
// const MAX_USERS = 100;

// ✅ Avoid expensive operations in loops
// ❌ Don't do this:
// for (let i = 0; i < items.length; i++) {
//   const result = expensiveOperation();  // Called every iteration
// }

// ✅ Do this instead:
// const result = expensiveOperation();
// for (let i = 0; i < items.length; i++) {
//   // use result
// }

// ✅ Use Set for unique values
// const uniqueIds = new Set(users.map(u => u.id));

// ✅ Use Map for key-value lookups
// const userMap = new Map(users.map(u => [u.id, u]));

// ============================================================================
// 14. TESTING CONSIDERATIONS
// ============================================================================

// ✅ Make functions pure when possible (easier to test)
// function formatCurrency(amount: number, currency: string): string {
//   return `${currency}${amount.toFixed(2)}`;
// }

// ✅ Inject dependencies for testability
interface Logger {
  log(message: string): void;
}

class UserService {
  constructor(private logger: Logger) {}
  
  createUser(name: string): User {
    this.logger.log(`Creating user: ${name}`);
    return { id: 1, name };
  }
}

// ============================================================================
// 15. TSCONFIG RECOMMENDATIONS
// ============================================================================

/*
{
  "compilerOptions": {
    "strict": true,                      // Enable all strict checks
    "noUnusedLocals": true,             // Error on unused variables
    "noUnusedParameters": true,         // Error on unused parameters
    "noImplicitReturns": true,          // Error if function doesn't return
    "noFallthroughCasesInSwitch": true, // Error on switch fallthrough
    "esModuleInterop": true,            // Better CommonJS interop
    "skipLibCheck": true,               // Skip checking node_modules
    "forceConsistentCasingInFileNames": true,
  }
}
*/

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================

/*
✅ DO:
- Enable strict mode in tsconfig.json
- Use unknown instead of any
- Prefer interfaces for objects, types for unions
- Use const assertions for literal types
- Handle null/undefined explicitly
- Write explicit return types for public functions
- Use readonly for immutability
- Prefer async/await over .then()
- Use descriptive names for generics
- Add JSDoc comments for public APIs

❌ DON'T:
- Use 'any' type (use 'unknown' instead)
- Ignore compiler errors
- Use non-null assertion (!) unless certain
- Mutate parameters
- Use var (use const/let)
- Mix Promise styles (.then and async/await)
- Over-engineer types
- Ignore null/undefined possibilities

💡 REMEMBER:
- Types are removed at runtime
- TypeScript helps catch bugs at compile time
- Stricter types = fewer runtime errors
- Good types make code self-documenting
- Use the compiler to help you refactor safely
*/

export type { User, Status, Result, ApiResult };
export { HttpStatus, DatabaseConnection, ValidationError, UserService, processData, isUser };
