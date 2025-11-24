/**
 * TypeScript Enums
 * 
 * Enums allow defining a set of named constants.
 * Useful for representing a fixed set of values.
 */

// ============================================
// NUMERIC ENUMS
// ============================================

enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

const move: Direction = Direction.Up;
console.log("Numeric enum:");
console.log(`Direction: ${move}`); // 0
console.log(`Direction name: ${Direction[0]}`); // "Up"

// Custom starting value
enum Status {
  Pending = 1,
  Processing = 2,
  Complete = 3,
  Failed = 4
}

const orderStatus: Status = Status.Processing;
console.log(`\nOrder status: ${orderStatus}`); // 2

// ============================================
// STRING ENUMS
// ============================================

enum LogLevel {
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO",
  Debug = "DEBUG"
}

function log(level: LogLevel, message: string): void {
  console.log(`[${level}] ${message}`);
}

console.log("\nString enums:");
log(LogLevel.Info, "Application started");
log(LogLevel.Warning, "Low memory");

// ============================================
// HETEROGENEOUS ENUMS (Mixed)
// ============================================

enum Response {
  No = 0,
  Yes = "YES"
}

// Not recommended, but possible
const answer: Response = Response.Yes;
console.log(`\nAnswer: ${answer}`);

// ============================================
// COMPUTED ENUMS
// ============================================

enum FileAccess {
  None = 0,
  Read = 1 << 0,    // 1
  Write = 1 << 1,   // 2
  ReadWrite = Read | Write  // 3
}

console.log(`\nFile access: ${FileAccess.ReadWrite}`);

// ============================================
// CONST ENUMS
// ============================================

const enum Color {
  Red,
  Green,
  Blue
}

const favoriteColor: Color = Color.Blue;
console.log(`\nFavorite color: ${favoriteColor}`);

// Const enums are inlined at compile time (no runtime code)

// ============================================
// ENUM AS TYPE
// ============================================

enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

interface User {
  id: number;
  name: string;
  role: UserRole;
}

const admin: User = {
  id: 1,
  name: "Alice",
  role: UserRole.Admin
};

console.log(`\nUser role: ${admin.role}`);

// ============================================
// REVERSE MAPPING (Numeric Enums Only)
// ============================================

enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}

const statusCode = HttpStatus.OK;
const statusName = HttpStatus[200]; // "OK"

console.log(`\nHTTP: ${statusCode} - ${statusName}`);

// ============================================
// PRACTICAL EXAMPLES
// ============================================

// API Status
enum ApiStatus {
  Idle = "IDLE",
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR"
}

interface ApiState<T> {
  status: ApiStatus;
  data?: T;
  error?: string;
}

const apiState: ApiState<string> = {
  status: ApiStatus.Success,
  data: "Hello World"
};

console.log(`\nAPI State: ${apiState.status}`);

// Payment Methods
enum PaymentMethod {
  CreditCard = "CREDIT_CARD",
  PayPal = "PAYPAL",
  BankTransfer = "BANK_TRANSFER",
  Crypto = "CRYPTO"
}

function processPayment(method: PaymentMethod, amount: number): void {
  console.log(`Processing ${amount} via ${method}`);
}

processPayment(PaymentMethod.CreditCard, 99.99);

// Environment
enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production"
}

function checkEnvironment(env: Environment): boolean {
  return env === Environment.Production;
}

console.log(`\nIs production: ${checkEnvironment(Environment.Development)}`);

// ============================================
// ENUM UTILITIES
// ============================================

function getEnumKeys<T extends object>(enumObj: T): (keyof T)[] {
  return Object.keys(enumObj).filter(key => isNaN(Number(key))) as (keyof T)[];
}

function getEnumValues<T extends object>(enumObj: T): T[keyof T][] {
  return getEnumKeys(enumObj).map(key => enumObj[key]);
}

console.log("\nEnum utilities:");
console.log("LogLevel keys:", getEnumKeys(LogLevel));
console.log("LogLevel values:", getEnumValues(LogLevel));

// ============================================
// ENUM vs UNION TYPES
// ============================================

// Enum approach
enum Size {
  Small = "S",
  Medium = "M",
  Large = "L"
}

// Union type approach (modern alternative)
type SizeUnion = "S" | "M" | "L";

const shirtSize: Size = Size.Medium;
const pantsSize: SizeUnion = "L";

console.log(`\nShirt: ${shirtSize}, Pants: ${pantsSize}`);

// ============================================
// WHEN TO USE ENUMS
// ============================================

// ✅ Use enums when:
// - You have a fixed set of related constants
// - You need reverse mapping (number to name)
// - You want autocomplete in your IDE
// - Values might change but names stay the same

// ❌ Consider union types instead when:
// - You just need string literals
// - Bundle size is critical (enums add runtime code)
// - Working with external APIs (plain strings)

// ============================================
// EXPORTED ENUMS AND FUNCTIONS
// ============================================

export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4
}

export enum OrderStatus {
  Pending = "PENDING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED"
}

export function isPriority(priority: Priority): boolean {
  return priority >= Priority.High;
}

export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending: return "yellow";
    case OrderStatus.Shipped: return "blue";
    case OrderStatus.Delivered: return "green";
    case OrderStatus.Cancelled: return "red";
  }
}

export { UserRole, ApiStatus, PaymentMethod };
