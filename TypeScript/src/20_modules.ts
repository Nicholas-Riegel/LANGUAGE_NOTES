/**
 * TypeScript Modules
 * 
 * Modules are how you organize and share code between files in TypeScript.
 * Understanding ES6 modules, imports/exports, and module resolution is
 * essential for working with modern TypeScript projects.
 */

// ============================================================================
// 1. EXPORT BASICS
// ============================================================================

// Named exports - can export multiple things
export const API_URL = "https://api.example.com";
export const MAX_RETRIES = 3;

export function formatDate(date: Date): string {
  return date.toISOString();
}

export class Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

export interface Config {
  apiKey: string;
  timeout: number;
}

// Export existing declarations
const VERSION = "1.0.0";
const APP_NAME = "MyApp";
export { VERSION, APP_NAME };

// Export with rename
const internalFunction = () => console.log("Internal");
export { internalFunction as publicFunction };

// ============================================================================
// 2. IMPORT BASICS
// ============================================================================

// In another file, you would import like this:
// import { API_URL, formatDate, Logger } from './20_modules';
// import { VERSION as AppVersion } from './20_modules';
// import * as Utils from './20_modules'; // Import everything as namespace

// ============================================================================
// 3. DEFAULT EXPORTS
// ============================================================================

// Only one default export per module
// export default class User {
//   constructor(public name: string) {}
// }

// Or export default separately
class User {
  constructor(public name: string) {}
}
export default User;

// Import default export (can name it whatever you want):
// import User from './20_modules';
// import MyUser from './20_modules'; // Can rename on import

// Can combine default and named exports:
// import User, { API_URL, Logger } from './20_modules';

// ============================================================================
// 4. RE-EXPORTING
// ============================================================================

// Re-export everything from another module
// export * from './other-module';

// Re-export specific items
// export { SpecificThing, AnotherThing } from './other-module';

// Re-export with rename
// export { OldName as NewName } from './other-module';

// Re-export default as named
// export { default as SomeName } from './other-module';

// ============================================================================
// 5. TYPE-ONLY IMPORTS/EXPORTS
// ============================================================================

// Export types
export type UserId = string;
export type UserRole = "admin" | "user" | "guest";

export interface UserData {
  id: UserId;
  role: UserRole;
  name: string;
}

// Type-only import (stripped at runtime, better for tree-shaking)
// import type { UserData, UserId } from './20_modules';
// import { type UserData, type UserId } from './20_modules'; // Inline type import

// Type-only export
// export type { UserData, UserId };

// ============================================================================
// 6. NAMESPACE IMPORTS
// ============================================================================

// Import everything as a namespace
// import * as MyModule from './20_modules';
// MyModule.formatDate(new Date());
// new MyModule.Logger().log("Hello");

// ============================================================================
// 7. SIDE EFFECT IMPORTS
// ============================================================================

// Import for side effects only (no bindings)
// This executes the module but doesn't import anything
// import './polyfills';
// import './init-app';

// ============================================================================
// 8. DYNAMIC IMPORTS
// ============================================================================

// Import modules dynamically at runtime
// async function loadModule() {
//   const module = await import("./some-module");
//   module.doSomething();
// }

// Useful for code splitting and lazy loading
// async function loadUserModule(userId: string) {
//   if (userId.startsWith("admin")) {
//     const { AdminPanel } = await import("./admin-panel");
//     return new AdminPanel();
//   } else {
//     const { UserPanel } = await import("./user-panel");
//     return new UserPanel();
//   }
// }

// Type for dynamic import
// type ModuleType = typeof import("./some-module");

// ============================================================================
// 9. MODULE RESOLUTION
// ============================================================================

/*
TypeScript uses different strategies to find modules:

1. Relative imports (start with ./ or ../)
   import { User } from './models/user';
   import { Config } from '../config';

2. Non-relative imports (everything else)
   import { Component } from 'react';
   import { map } from 'lodash';

Resolution strategies (set in tsconfig.json):
- "node": Classic Node.js resolution (node_modules)
- "bundler": For bundlers like webpack, vite
- "node16"/"nodenext": Modern Node.js with ESM support

Path mapping in tsconfig.json:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@models/*": ["src/models/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}

Then you can import:
import { User } from '@models/user';
*/

// ============================================================================
// 10. COMMONJS INTEROP
// ============================================================================

// CommonJS style (older Node.js)
// const express = require('express');
// module.exports = { something };

// TypeScript can work with both:
// import express from 'express'; // Works with esModuleInterop: true
// import * as express from 'express'; // Alternative

// Export = syntax (TypeScript specific)
// class SomeClass {}
// export = SomeClass;

// Import = syntax
// import SomeClass = require('./some-class');

// ============================================================================
// 11. BARREL EXPORTS (INDEX FILES)
// ============================================================================

// In src/models/index.ts (barrel file):
// export * from './user';
// export * from './product';
// export * from './order';
// export { default as Customer } from './customer';

// Then import from the directory:
// import { User, Product, Order, Customer } from './models';

// ============================================================================
// 12. NAMESPACE (INTERNAL MODULES)
// ============================================================================

// Old TypeScript style - avoid in modern code
// namespace Validation {
//   export interface StringValidator {
//     isValid(s: string): boolean;
//   }
  
//   export class EmailValidator implements StringValidator {
//     isValid(s: string): boolean {
//       return s.includes("@");
//     }
//   }
// }

// Use it
// const emailValidator = new Validation.EmailValidator();
// console.log(emailValidator.isValid("test@example.com"));

// Prefer ES6 modules over namespaces in modern TypeScript

// ============================================================================
// 13. AMBIENT MODULES
// ============================================================================

// Declare modules that don't have TypeScript definitions
// Usually in a .d.ts file:
/*
declare module 'some-untyped-library' {
  export function doSomething(): void;
  export const value: number;
}

// Wildcard module declarations for assets
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}
*/

// ============================================================================
// 14. MODULE AUGMENTATION
// ============================================================================

// Extend existing modules with new properties
// Useful for extending third-party libraries

// In a .d.ts file or with declare:
declare module "./20_modules" {
  interface Config {
    newProperty?: boolean;
  }
}

// Now Config has newProperty

// Example: Extending Express Request
/*
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}
*/

// ============================================================================
// 15. PRACTICAL PATTERNS
// ============================================================================

// 1. API Client Module
export class ApiClient {
  constructor(private baseUrl: string) {}
  
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }
  
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

// 2. Constants Module Pattern
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

// 3. Factory Pattern
export interface Product {
  id: string;
  name: string;
  price: number;
}

export function createProduct(
  name: string,
  price: number
): Product {
  return {
    id: Math.random().toString(36),
    name,
    price,
  };
}

// 4. Singleton Pattern
export class DatabaseConnection {
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

// 5. Service Layer Pattern
export interface IUserService {
  getUser(id: string): Promise<User>;
  createUser(name: string): Promise<User>;
}

export class UserService implements IUserService {
  async getUser(id: string): Promise<User> {
    // Implementation
    return new User(`User ${id}`);
  }
  
  async createUser(name: string): Promise<User> {
    return new User(name);
  }
}

// ============================================================================
// 16. BEST PRACTICES
// ============================================================================

/*
✅ DO:
- Use ES6 modules (import/export) over namespaces
- Use named exports for utilities and constants
- Use default exports for main class/component per file
- Use type-only imports when only importing types
- Create barrel files (index.ts) for cleaner imports
- Use path aliases for cleaner import paths
- Keep related code in the same module

❌ DON'T:
- Mix CommonJS (require) with ES6 modules in same file
- Create circular dependencies between modules
- Export everything from every file
- Use namespaces in modern code (use modules instead)
- Import entire libraries when you only need one function

💡 TIPS:
- Set "esModuleInterop": true in tsconfig for better CommonJS interop
- Use "moduleResolution": "bundler" for modern bundlers
- Configure path aliases in tsconfig.json for cleaner imports
- Use dynamic imports for code splitting
- Consider barrel exports for better API surface
- Tree-shaking works best with named exports
- Keep module dependencies acyclic (no circular references)

📁 Project Structure Example:
src/
  models/
    user.ts
    product.ts
    index.ts (barrel)
  services/
    user.service.ts
    product.service.ts
    index.ts (barrel)
  utils/
    date.ts
    string.ts
    index.ts (barrel)
  types/
    api.ts
    common.ts
  index.ts (main entry point)
*/

// ============================================================================
// 17. TYPESCRIPT MODULE SETTINGS
// ============================================================================

/*
Key tsconfig.json settings for modules:

{
  "compilerOptions": {
    // Module system
    "module": "ES2022",              // or "CommonJS", "ESNext"
    "moduleResolution": "bundler",    // or "node", "node16"
    
    // ES Module interop
    "esModuleInterop": true,          // Better CommonJS import
    "allowSyntheticDefaultImports": true,
    
    // Path mapping
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@models/*": ["models/*"]
    },
    
    // Type checking
    "skipLibCheck": true,             // Skip checking node_modules
    "isolatedModules": true,          // Each file is a module
    
    // Output
    "outDir": "./dist",
    "rootDir": "./src",
    
    // For Node.js projects
    "types": ["node"],
    "moduleDetection": "force"        // Treat all files as modules
  }
}
*/

// Example imports with path aliases:
// import { User } from '@models/user';
// import { formatDate } from '@utils/date';
// import { ApiClient } from '@/services/api-client';
