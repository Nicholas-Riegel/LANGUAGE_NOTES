/**
 * TypeScript Advanced Types
 * 
 * Conditional types, mapped types, template literals, and type manipulation
 */

// ============================================================================
// 1. CONDITIONAL TYPES
// ============================================================================

// Basic syntax: T extends U ? X : Y
type IsString<T> = T extends string ? true : false;
// type A = IsString<string>;  // true
// type B = IsString<number>;  // false

// Extract return type
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;
// type Func = () => number;
// type Result = ReturnTypeOf<Func>;  // number

// Unwrap Promise type
type Unwrap<T> = T extends Promise<infer U> ? U : T;
// type UnwrappedString = Unwrap<Promise<string>>;  // string
// type UnwrappedNumber = Unwrap<number>;  // number

// ============================================================================
// 2. MAPPED TYPES
// ============================================================================

// Make all properties optional
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties required
type MyRequired<T> = {
  [P in keyof T]-?: T[P];  // -? removes optional
};

// Make all properties readonly
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Pick specific properties
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit specific properties
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

// Add prefix to keys
type Prefixed<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${string & K}`]: T[K];
};

interface User {
  id: number;
  name: string;
}
// type PrefixedUser = Prefixed<User, "user_">;
// { user_id: number; user_name: string; }

// ============================================================================
// 3. TEMPLATE LITERAL TYPES
// ============================================================================

type Color = "red" | "blue" | "green";
type Size = "small" | "medium" | "large";

// Combine strings
type ColorfulSize = `${Color}-${Size}`;
// "red-small" | "red-medium" | ... | "green-large"

// Event names
type EventName<T extends string> = `on${Capitalize<T>}`;
// type ClickEvent = EventName<"click">;  // "onClick"

// Practical: API endpoints
type HttpMethod = "get" | "post" | "put" | "delete";
type Endpoint = "/users" | "/products" | "/orders";
type ApiRoute = `${HttpMethod} ${Endpoint}`;
// "get /users" | "post /users" | ...

// ============================================================================
// 4. DISTRIBUTIVE CONDITIONAL TYPES
// ============================================================================

// Conditional types distribute over unions
type ToArray<T> = T extends any ? T[] : never;
// type StrOrNum = string | number;
// type Arrays = ToArray<StrOrNum>;  // string[] | number[]

// Extract types from union
type ExtractString<T> = T extends string ? T : never;
// type OnlyStrings = ExtractString<string | number | boolean>;  // string

// Filter nullable
type NonNullableUnion<T> = T extends null | undefined ? never : T;
// type Clean = NonNullableUnion<string | null | number | undefined>;  // string | number

// ============================================================================
// 5. INFER KEYWORD
// ============================================================================

// Extract function parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
// type MyFunc = (a: string, b: number) => void;
// type Params = Parameters<MyFunc>;  // [string, number]

// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;
// type NumArray = number[];
// type Num = ElementType<NumArray>;  // number

// Extract Promise value
type PromiseValue<T> = T extends Promise<infer V> ? V : T;

// Nested inference
type DeepPromise<T> = T extends Promise<infer U> 
  ? U extends Promise<any> 
    ? DeepPromise<U> 
    : U 
  : T;

// ============================================================================
// 6. RECURSIVE TYPES
// ============================================================================

// Nested object type
type NestedObject = {
  value: string;
  children?: NestedObject[];
};

// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Flatten nested array
type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;
// type Nested = number[][][];
// type Flat = Flatten<Nested>;  // number

// ============================================================================
// 7. PRACTICAL PATTERNS
// ============================================================================

// Builder pattern with required fields
type BuilderState<T, Built extends keyof T = never> = {
  [K in keyof T]: K extends Built 
    ? T[K] 
    : (value: T[K]) => BuilderState<T, Built | K>;
} & (Built extends keyof T 
  ? { build: () => Pick<T, Built> } 
  : { build?: never });

// Type-safe event emitter
type EventMap = {
  click: { x: number; y: number };
  submit: { data: string };
  error: { message: string };
};

type EventEmitter<T extends Record<string, any>> = {
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void;
  emit<K extends keyof T>(event: K, data: T[K]): void;
};

// const emitter: EventEmitter<EventMap> = ...
// emitter.on("click", (data) => { /* data has correct type */ });

// Function overload types
type OverloadedFunction = {
  (x: string): string;
  (x: number): number;
  (x: boolean): boolean;
};

// Discriminated union from keys
type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = 
  T extends Record<K, V> ? T : never;

// ============================================================================
// 8. TYPE CONSTRAINTS & VALIDATION
// ============================================================================

// Ensure type has property
type HasId<T> = T extends { id: any } ? T : never;

// Validate exact type match
type Equals<X, Y> = 
  (<T>() => T extends X ? 1 : 2) extends 
  (<T>() => T extends Y ? 1 : 2) ? true : false;

// Assert type compatibility
type Assert<T, Expected> = T extends Expected ? T : never;

// ============================================================================
// 9. BEST PRACTICES
// ============================================================================

/*
✅ DO:
- Use conditional types for type inference and transformation
- Leverage template literals for string-based types
- Use mapped types to transform object shapes
- Apply infer for extracting nested types
- Keep recursive types bounded to avoid infinite loops

❌ DON'T:
- Overuse complex types when simple ones suffice
- Create deeply nested conditional types (hard to debug)
- Ignore type distribution behavior in unions
- Use 'any' to bypass type errors in advanced types

💡 TIPS:
- Test complex types with simple examples first
- Use type assertions to debug type inference
- Consider helper types to break down complexity
- Distributive conditionals work with naked type parameters
- Use 'infer' when you need to extract a type from a structure
*/

export type {
  IsString,
  Unwrap,
  MyPartial,
  MyRequired,
  MyReadonly,
  MyPick,
  MyOmit,
  Prefixed,
  ColorfulSize,
  ApiRoute,
  DeepReadonly,
  DeepPartial,
  EventEmitter,
  ReturnTypeOf,
  ToArray,
  ExtractString,
  NonNullableUnion,
  ElementType,
  PromiseValue,
  DeepPromise,
  Flatten,
  EventMap,
  OverloadedFunction,
  DiscriminateUnion,
  HasId,
  Equals,
  EventName,
  User,
  Parameters,
  NestedObject,
  BuilderState,
  Assert,
};
