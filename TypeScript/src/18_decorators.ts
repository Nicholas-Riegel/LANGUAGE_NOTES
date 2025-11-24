/**
 * TypeScript Decorators
 * 
 * Decorators provide a way to add annotations and meta-programming
 * syntax for class declarations and members.
 * Note: Enable "experimentalDecorators" in tsconfig.json
 */

// ============================================
// CLASS DECORATORS
// ============================================

// Simple class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

const report = new BugReport("Bug #1");
console.log(`Report: ${report.title}`);

// Class decorator factory
function Component(name: string) {
  return function (constructor: Function) {
    console.log(`Component registered: ${name}`);
    (constructor as any).componentName = name;
  };
}

@Component("UserProfile")
class UserProfile {
  render() {
    return "<div>User Profile</div>";
  }
}

const profile = new UserProfile();
console.log(profile.render());

// ============================================
// METHOD DECORATORS
// ============================================

// Log method calls
function log(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`\nCalling ${propertyKey} with:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(5, 3);
calc.multiply(4, 7);

// ============================================
// PROPERTY DECORATORS
// ============================================

// Readonly property
function readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
    configurable: false
  });
}

class User {
  @readonly
  id: number = 1;

  name: string = "Alice";
}

const user = new User();
console.log(`\nUser ID: ${user.id}`);
// user.id = 2; // Would error at runtime with readonly decorator

// Format property
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    let value: string;

    const getter = function () {
      return value;
    };

    const setter = function (newVal: string) {
      value = formatString.replace("{0}", newVal);
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class Greeting {
  @format("Hello, {0}!")
  message!: string;
}

const greeting = new Greeting();
greeting.message = "World";
console.log(greeting.message);

// ============================================
// PARAMETER DECORATORS
// ============================================

function required(
  _target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  console.log(`Parameter ${parameterIndex} of ${String(propertyKey)} is required`);
}

class UserService {
  greet(@required name: string, age?: number): string {
    return `Hello ${name}, age ${age ?? "unknown"}`;
  }
}

const service = new UserService();
console.log(`\n${service.greet("Bob", 25)}`);

// ============================================
// ACCESSOR DECORATORS
// ============================================

function configurable(value: boolean) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number = 0;
  private _y: number = 0;

  @configurable(false)
  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}

const point = new Point();
point.x = 10;
console.log(`\nPoint X: ${point.x}`);

// ============================================
// DECORATOR COMPOSITION
// ============================================

// Multiple decorators on same target
function first() {
  console.log("first(): factory evaluated");
  return function (_target: any, _propertyKey: string, _descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (_target: any, _propertyKey: string, _descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {
    console.log("method called");
  }
}

const example = new ExampleClass();
example.method();

// ============================================
// PRACTICAL DECORATORS
// ============================================

// Measure execution time
function measure(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`\n${propertyKey} took ${(end - start).toFixed(2)}ms`);
    return result;
  };

  return descriptor;
}

class DataService {
  @measure
  async fetchData(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve("data"), 100);
    });
  }
}

const dataService = new DataService();
dataService.fetchData().then(data => {
  console.log(`Fetched: ${data}`);
});

// Memoization decorator
function memoize(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log(`Cache hit for ${propertyKey}`);
      return cache.get(key);
    }

    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}

class MathService {
  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}

const mathService = new MathService();
console.log(`\nFib(10): ${mathService.fibonacci(10)}`);
console.log(`Fib(10): ${mathService.fibonacci(10)}`); // Cached

// Validate decorator
function validate(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    // Validation logic
    if (args.some(arg => arg === null || arg === undefined)) {
      throw new Error(`Invalid arguments for ${propertyKey}`);
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class ValidationService {
  @validate
  processUser(name: string, age: number): string {
    return `User: ${name}, age: ${age}`;
  }
}

const validationService = new ValidationService();
console.log(`\n${validationService.processUser("Alice", 30)}`);

// Retry decorator
function retry(times: number = 3, delay: number = 1000) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: Error = new Error();

      for (let i = 0; i < times; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));
          if (i < times - 1) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }

      throw lastError;
    };

    return descriptor;
  };
}

class ApiService {
  @retry(3, 100)
  async fetchUser(id: number): Promise<{ id: number; name: string }> {
    // Simulated API call that might fail
    if (Math.random() > 0.5) {
      throw new Error("Network error");
    }
    return { id, name: `User${id}` };
  }
}

const apiService = new ApiService();
apiService.fetchUser(1)
  .then(user => console.log(`\nFetched user: ${user.name}`))
  .catch(err => console.log(`Failed: ${err.message}`));

// ============================================
// METADATA DECORATORS
// ============================================

// Simple metadata storage
const metadataStore = new Map<any, Map<string, any>>();

function metadata(key: string, value: any) {
  return function (target: any, propertyKey?: string) {
    if (propertyKey) {
      // Method/property metadata
      if (!metadataStore.has(target)) {
        metadataStore.set(target, new Map());
      }
      metadataStore.get(target)!.set(`${propertyKey}:${key}`, value);
    } else {
      // Class metadata
      if (!metadataStore.has(target)) {
        metadataStore.set(target, new Map());
      }
      metadataStore.get(target)!.set(key, value);
    }
  };
}

@metadata("version", "1.0")
class MetadataExample {
  @metadata("deprecated", true)
  oldMethod() {
    console.log("This is deprecated");
  }

  @metadata("auth", "required")
  secureMethod() {
    console.log("This requires auth");
  }
}

const metaExample = new MetadataExample();
metaExample.oldMethod();

// ============================================
// DEPENDENCY INJECTION
// ============================================

// Simple DI container
class Container {
  private services = new Map<string, any>();

  register(name: string, service: any): void {
    this.services.set(name, service);
  }

  resolve(name: string): any {
    return this.services.get(name);
  }
}

const container = new Container();

function inject(serviceName: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: () => container.resolve(serviceName),
      enumerable: true,
      configurable: true
    });
  };
}

class Logger {
  log(message: string): void {
    console.log(`LOG: ${message}`);
  }
}

container.register("logger", new Logger());

class Application {
  @inject("logger")
  private logger!: Logger;

  run(): void {
    this.logger.log("Application started");
  }
}

const app = new Application();
app.run();

// ============================================
// BEST PRACTICES
// ============================================

// ✅ GOOD: Use decorator factories for configuration
// function configure(config: any) {
//   return function (target: any) {
//     target.config = config;
//   };
// }

// ✅ GOOD: Return modified descriptor
// function enumerable(value: boolean) {
//   return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
//     descriptor.enumerable = value;
//     return descriptor;
//   };
// }

// ❌ BAD: Modifying class prototype unsafely
// function badDecorator(_target: any) {
//   // Avoid direct prototype manipulation
//   // target.prototype.newMethod = function() { };
// }

console.log("\nDecorators examples completed");

// ============================================
// EXPORTED DECORATORS
// ============================================

export { 
  log, readonly, measure, memoize, validate, retry,
  Component, configurable, inject
};
