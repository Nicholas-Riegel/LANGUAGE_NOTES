/**
 * TypeScript Common Patterns
 * Design patterns and idioms for TypeScript development
 */

// ============================================================================
// 1. SINGLETON
// ============================================================================

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected = false;
  
  private constructor() {}
  
  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
  
  connect(): void {
    if (!this.connected) {
      console.log("Connecting to database...");
      this.connected = true;
    }
  }
}

// ============================================================================
// 2. FACTORY
// ============================================================================

interface Product {
  name: string;
  price: number;
}

interface User {
  id: string;
  name: string;
}

class EntityFactory {
  createProduct(name: string, price: number): Product {
    return { name, price };
  }
  
  createUser(name: string): User {
    return { id: Math.random().toString(36), name };
  }
}

// Generic factory
function createEntity<T>(factory: () => T): T {
  return factory();
}

// ============================================================================
// 3. BUILDER
// ============================================================================

class QueryBuilder {
  private query = "";
  private params: Record<string, any> = {};
  
  select(fields: string[]): this {
    this.query = `SELECT ${fields.join(", ")}`;
    return this;
  }
  
  from(table: string): this {
    this.query += ` FROM ${table}`;
    return this;
  }
  
  where(condition: string, params: Record<string, any>): this {
    this.query += ` WHERE ${condition}`;
    this.params = { ...this.params, ...params };
    return this;
  }
  
  build(): { query: string; params: Record<string, any> } {
    return { query: this.query, params: this.params };
  }
}

// Usage: new QueryBuilder().select(["*"]).from("users").where("id = :id", { id: 1 }).build()

// ============================================================================
// 4. REPOSITORY
// ============================================================================

interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  private users: Map<string, User> = new Map();
  
  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }
  
  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async save(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }
  
  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}

// ============================================================================
// 5. STRATEGY
// ============================================================================

interface SortStrategy<T> {
  sort(items: T[]): T[];
}

class AscendingSort implements SortStrategy<number> {
  sort(items: number[]): number[] {
    return [...items].sort((a, b) => a - b);
  }
}

class DescendingSort implements SortStrategy<number> {
  sort(items: number[]): number[] {
    return [...items].sort((a, b) => b - a);
  }
}

class Sorter<T> {
  constructor(private strategy: SortStrategy<T>) {}
  
  setStrategy(strategy: SortStrategy<T>): void {
    this.strategy = strategy;
  }
  
  sort(items: T[]): T[] {
    return this.strategy.sort(items);
  }
}

// ============================================================================
// 6. OBSERVER
// ============================================================================

interface Observer<T> {
  update(data: T): void;
}

class Subject<T> {
  private observers: Observer<T>[] = [];
  
  attach(observer: Observer<T>): void {
    this.observers.push(observer);
  }
  
  detach(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notify(data: T): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

// ============================================================================
// 7. DEPENDENCY INJECTION
// ============================================================================

interface ILogger {
  log(message: string): void;
}

class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(message);
  }
}

class UserService {
  constructor(private logger: ILogger) {}
  
  createUser(name: string): User {
    this.logger.log(`Creating user: ${name}`);
    return { id: Math.random().toString(36), name };
  }
}

// Simple DI container
class Container {
  private services = new Map<string, any>();
  
  register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }
  
  resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service not found: ${key}`);
    }
    return service;
  }
}

// ============================================================================
// 8. RESULT TYPE
// ============================================================================

type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return { success: false, error: new Error("Division by zero") };
  }
  return { success: true, value: a / b };
}

function handleResult<T>(result: Result<T>): T {
  if (result.success) {
    return result.value;
  }
  throw result.error;
}

// ============================================================================
// 9. OPTION/MAYBE TYPE
// ============================================================================

type Option<T> = Some<T> | None;

interface Some<T> {
  readonly _tag: "Some";
  readonly value: T;
}

interface None {
  readonly _tag: "None";
}

function some<T>(value: T): Option<T> {
  return { _tag: "Some", value };
}

function none<T>(): Option<T> {
  return { _tag: "None" };
}

function map<T, U>(option: Option<T>, fn: (value: T) => U): Option<U> {
  return option._tag === "Some" ? some(fn(option.value)) : none();
}

function getOrElse<T>(option: Option<T>, defaultValue: T): T {
  return option._tag === "Some" ? option.value : defaultValue;
}

// ============================================================================
// 10. MEMOIZATION
// ============================================================================

function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Usage:
// const expensiveFn = memoize((n: number) => {
//   return n * 2;
// });

// ============================================================================
// 11. RETRY PATTERN
// ============================================================================

async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  
  throw lastError;
}

// ============================================================================
// 12. THROTTLE & DEBOUNCE
// ============================================================================

function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limitMs: number
): (...args: Parameters<T>) => void {
  let lastRun = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastRun >= limitMs) {
      lastRun = now;
      fn(...args);
    }
  };
}

function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delayMs);
  };
}

// ============================================================================
// 13. CHAIN OF RESPONSIBILITY
// ============================================================================

interface Handler<T> {
  setNext(handler: Handler<T>): Handler<T>;
  handle(request: T): T | null;
}

abstract class AbstractHandler<T> implements Handler<T> {
  private nextHandler: Handler<T> | null = null;
  
  setNext(handler: Handler<T>): Handler<T> {
    this.nextHandler = handler;
    return handler;
  }
  
  handle(request: T): T | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// ============================================================================
// 14. TYPE-SAFE EVENT BUS
// ============================================================================

type EventMap = {
  "user:created": { id: string; name: string };
  "user:deleted": { id: string };
};

class EventBus<T extends Record<string, any>> {
  private listeners = new Map<keyof T, Array<(data: any) => void>>();
  
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler);
  }
  
  emit<K extends keyof T>(event: K, data: T[K]): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      for (const handler of handlers) {
        handler(data);
      }
    }
  }
  
  off<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }
}

// ============================================================================
// 15. BEST PRACTICES
// ============================================================================

/*
✅ DO:
- Use dependency injection for testability
- Return Result types instead of throwing
- Implement interfaces, not concrete classes
- Use strategy pattern for swappable algorithms
- Apply memoization for expensive computations
- Use builder pattern for complex object construction
- Implement observer pattern for event-driven code
- Use repository pattern for data access
- Apply throttle/debounce for frequent events

❌ DON'T:
- Overuse singletons (hard to test)
- Create deep inheritance hierarchies
- Mix business logic with framework code
- Ignore error handling in async patterns
- Use global state when local is sufficient

💡 REMEMBER:
- Patterns solve common problems
- Choose patterns based on needs, not trends
- Keep it simple - don't over-engineer
- Prefer composition over inheritance
- Make code testable and maintainable
*/

export {
  DatabaseConnection,
  EntityFactory,
  QueryBuilder,
  UserRepository,
  Sorter,
  Subject,
  UserService,
  Container,
  divide,
  some,
  none,
  map,
  getOrElse,
  memoize,
  retry,
  throttle,
  debounce,
  EventBus,
  createEntity,
  AscendingSort,
  DescendingSort,
  ConsoleLogger,
  handleResult,
  AbstractHandler,
};

export type { Result, Option, Repository, Observer, ILogger, EventMap };
