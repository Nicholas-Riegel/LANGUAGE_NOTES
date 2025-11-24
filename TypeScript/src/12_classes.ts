/**
 * TypeScript Classes
 * 
 * Classes in TypeScript add type safety and additional features
 * like access modifiers, abstract classes, and interfaces.
 */

// ============================================
// BASIC CLASS
// ============================================

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
  }
}

const person1 = new Person("Alice", 30);
console.log(person1.greet());

// ============================================
// ACCESS MODIFIERS
// ============================================

class BankAccount {
  public accountNumber: string;    // accessible everywhere
  private balance: number;          // only within class
  protected owner: string;          // within class and subclasses

  constructor(accountNumber: string, owner: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("123456", "Bob", 1000);
console.log(`\nAccount: ${account.accountNumber}`);
account.deposit(500);
console.log(`Balance: $${account.getBalance()}`);
// console.log(account.balance); // Error: private

// ============================================
// PARAMETER PROPERTIES (SHORTHAND)
// ============================================

class User {
  // Shorthand - creates and assigns properties automatically
  constructor(
    public id: number,
    public username: string,
    private password: string,
    protected role: string = "user"
  ) {}

  login(inputPassword: string): boolean {
    return this.password === inputPassword;
  }

  getInfo(): string {
    return `User ${this.username} (ID: ${this.id})`;
  }
}

const user = new User(1, "alice", "secret123");
console.log(`\n${user.getInfo()}`);
console.log(`Login: ${user.login("secret123")}`);

// ============================================
// READONLY PROPERTIES
// ============================================

class Product {
  readonly id: number;
  name: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  updatePrice(newPrice: number): void {
    this.price = newPrice;
    // this.id = 999; // Error: readonly
  }
}

const product = new Product(1, "Laptop", 999);
console.log(`\nProduct: ${product.name} - $${product.price}`);
product.updatePrice(899);
console.log(`Updated: $${product.price}`);

// ============================================
// INHERITANCE
// ============================================

class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // Call parent constructor
  }

  makeSound(): void {
    console.log(`${this.name} barks: Woof!`);
  }

  fetch(): void {
    console.log(`${this.name} fetches the ball`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(`\nDog: ${dog.name}, ${dog.breed}`);
dog.makeSound();
dog.fetch();

// ============================================
// ABSTRACT CLASSES
// ============================================

abstract class Shape {
  constructor(public color: string) {}

  // Abstract method - must be implemented by subclasses
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // Concrete method - inherited by subclasses
  describe(): string {
    return `A ${this.color} shape with area ${this.getArea()}`;
  }
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(color: string, public width: number, public height: number) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 10, 20);

console.log(`\n${circle.describe()}`);
console.log(`${rectangle.describe()}`);

// ============================================
// INTERFACES WITH CLASSES
// ============================================

interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

class Document implements Printable, Saveable {
  constructor(public title: string, public content: string) {}

  print(): void {
    console.log(`Printing: ${this.title}`);
    console.log(this.content);
  }

  save(): void {
    console.log(`Saving: ${this.title}`);
  }
}

const doc = new Document("Report", "Lorem ipsum dolor sit amet");
console.log("\nDocument:");
doc.print();
doc.save();

// ============================================
// STATIC MEMBERS
// ============================================

class MathUtils {
  static PI: number = 3.14159;
  static E: number = 2.71828;

  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  // Instance method for comparison
  square(n: number): number {
    return n * n;
  }
}

// Static members accessed on class, not instance
console.log(`\nPI: ${MathUtils.PI}`);
console.log(`Add: ${MathUtils.add(5, 3)}`);

// Instance method requires instance
const mathUtils = new MathUtils();
console.log(`Square: ${mathUtils.square(5)}`);

// ============================================
// GETTERS AND SETTERS
// ============================================

class Temperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero!");
    }
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(`\n${temp.celsius}°C = ${temp.fahrenheit}°F`);

temp.fahrenheit = 68;
console.log(`${temp.fahrenheit}°F = ${temp.celsius}°C`);

// ============================================
// INDEX SIGNATURES
// ============================================

class StringMap {
  [key: string]: string | ((key: string) => string | undefined);

  get(key: string): string | undefined {
    const value = this[key];
    return typeof value === "string" ? value : undefined;
  }
}

const map = new StringMap();
map["hello"] = "world";
map["foo"] = "bar";

console.log(`\nMap: ${map.get("hello")}`);

// ============================================
// THIS TYPE
// ============================================

class Calculator {
  constructor(public value: number = 0) {}

  add(n: number): this {
    this.value += n;
    return this;
  }

  subtract(n: number): this {
    this.value -= n;
    return this;
  }

  multiply(n: number): this {
    this.value *= n;
    return this;
  }

  getResult(): number {
    return this.value;
  }
}

// Method chaining
const calc = new Calculator(10);
const result = calc.add(5).multiply(2).subtract(3).getResult();
console.log(`\nCalculator result: ${result}`);

// ============================================
// GENERIC CLASSES
// ============================================

class Box<T> {
  private contents: T[] = [];

  add(item: T): void {
    this.contents.push(item);
  }

  getAll(): T[] {
    return this.contents;
  }

  getFirst(): T | undefined {
    return this.contents[0];
  }
}

const numberBox = new Box<number>();
numberBox.add(1);
numberBox.add(2);
numberBox.add(3);
console.log(`\nNumber box: ${numberBox.getAll().join(", ")}`);

const stringBox = new Box<string>();
stringBox.add("hello");
stringBox.add("world");
console.log(`String box: ${stringBox.getAll().join(" ")}`);

// ============================================
// PRACTICAL PATTERNS
// ============================================

// Singleton Pattern
class Database {
  private static instance: Database;
  private connected: boolean = false;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  connect(): void {
    this.connected = true;
    console.log("Database connected");
  }

  isConnected(): boolean {
    return this.connected;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(`\nSingleton: ${db1 === db2}`); // true
db1.connect();
console.log(`DB connected: ${db2.isConnected()}`);

// Builder Pattern
class UserBuilder {
  private user: Partial<{
    id: number;
    username: string;
    email: string;
    role: string;
    active: boolean;
  }> = {};

  setId(id: number): this {
    this.user.id = id;
    return this;
  }

  setUsername(username: string): this {
    this.user.username = username;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  setRole(role: string): this {
    this.user.role = role;
    return this;
  }

  setActive(active: boolean): this {
    this.user.active = active;
    return this;
  }

  build(): object {
    return { ...this.user };
  }
}

const newUser = new UserBuilder()
  .setId(1)
  .setUsername("alice")
  .setEmail("alice@example.com")
  .setRole("admin")
  .setActive(true)
  .build();

console.log("\nBuilt user:", newUser);

// Repository Pattern
interface Repository<T> {
  findById(id: number): T | undefined;
  findAll(): T[];
  create(item: T): void;
  update(id: number, item: T): void;
  delete(id: number): void;
}

class InMemoryRepository<T extends { id: number }> implements Repository<T> {
  private items: T[] = [];

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  findAll(): T[] {
    return [...this.items];
  }

  create(item: T): void {
    this.items.push(item);
  }

  update(id: number, item: T): void {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      this.items[index] = item;
    }
  }

  delete(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const todoRepo = new InMemoryRepository<TodoItem>();
todoRepo.create({ id: 1, text: "Learn TypeScript", completed: false });
todoRepo.create({ id: 2, text: "Build project", completed: false });

console.log("\nTodos:", todoRepo.findAll());

// ============================================
// MIXINS
// ============================================

type Constructor<T = {}> = new (...args: any[]) => T;

// Timestamped mixin
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = new Date();
    
    getTimestamp(): Date {
      return this.timestamp;
    }
  };
}

// Activatable mixin
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActive = false;
    
    activate(): void {
      this.isActive = true;
    }
    
    deactivate(): void {
      this.isActive = false;
    }
  };
}

class BaseEntity {
  constructor(public id: number) {}
}

// Combine mixins
const TimestampedEntity = Timestamped(BaseEntity);
const FullEntity = Activatable(TimestampedEntity);

const entity = new FullEntity(1);
entity.activate();
console.log(`\nEntity active: ${entity.isActive}`);
console.log(`Entity timestamp: ${entity.getTimestamp()}`);

// ============================================
// EXPORTED CLASSES
// ============================================

export { Person, User, Product, Animal, Dog };
export { Circle, Rectangle, Document, Calculator, Box };
export { Database, InMemoryRepository };
export type { Repository, TodoItem };
