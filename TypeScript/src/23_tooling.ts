/**
 * TypeScript Tooling & Configuration
 * Essential tooling knowledge for professional TypeScript development
 */

// ============================================================================
// 1. TSCONFIG.JSON ESSENTIALS
// ============================================================================

/*
Basic tsconfig.json structure:

{
  "compilerOptions": {
    // Language & Environment
    "target": "ES2022",                 // JS version to compile to
    "lib": ["ES2022", "DOM"],          // Available APIs
    "module": "ES2022",                 // Module system
    "jsx": "react",                     // JSX support (react/react-jsx/preserve)
    
    // Modules
    "moduleResolution": "bundler",      // How to resolve modules (node/bundler)
    "baseUrl": "./src",                 // Base for relative imports
    "paths": {                          // Path aliases
      "@/*": ["./*"],
      "@components/*": ["components/*"]
    },
    "resolveJsonModule": true,          // Import JSON files
    
    // Emit
    "outDir": "./dist",                 // Output directory
    "rootDir": "./src",                 // Input root
    "declaration": true,                // Generate .d.ts files
    "sourceMap": true,                  // Generate source maps
    "removeComments": true,             // Remove comments
    "noEmit": true,                     // Don't emit (for bundlers)
    
    // Type Checking
    "strict": true,                     // Enable ALL strict checks
    "noImplicitAny": true,             // No implicit 'any'
    "strictNullChecks": true,          // Null/undefined checking
    "strictFunctionTypes": true,       // Function type checking
    "noUnusedLocals": true,            // Error on unused variables
    "noUnusedParameters": true,        // Error on unused params
    "noImplicitReturns": true,         // All paths must return
    "noFallthroughCasesInSwitch": true, // No switch fallthrough
    
    // Interop
    "esModuleInterop": true,           // Better CommonJS imports
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    
    // Advanced
    "skipLibCheck": true,               // Skip checking node_modules
    "isolatedModules": true             // Each file is a module
  }
  // "include": ["src/ ** /*"],
  // "exclude": ["node_modules", "dist"]
}
*/

// ============================================================================
// 2. DECLARATION FILES (.d.ts)
// ============================================================================

// Declare types for untyped libraries
// declare module "some-untyped-package" {
//   export function doSomething(x: string): number;
//   export const VERSION: string;
// }

// Augment existing modules
// declare module "express" {
//   interface Request {
//     user?: { id: string; name: string };
//   }
// }

// Global declarations
// declare global {
//   interface Window {
//     myCustomProperty: string;
//   }
  
//   const MY_GLOBAL_VAR: string;
// }

// Ambient module for assets
// declare module "*.css" {
//   const content: Record<string, string>;
//   export default content;
// }

// declare module "*.png" {
//   const value: string;
//   export default value;
// }

// ============================================================================
// 3. LINTING (ESLINT)
// ============================================================================

/*
Install:
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

.eslintrc.json:
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
*/

// ============================================================================
// 4. TESTING (JEST)
// ============================================================================

/*
Install:
npm install -D jest @types/jest ts-jest

jest.config.js:
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['** /__tests__/** /*.ts', '** /?(*.)+(spec|test).ts'],
  collectCoverageFrom: ['src/** /*.ts', '!src/** /*.d.ts'],
};

Example test:
// user.test.ts
import { createUser } from './user';

describe('User', () => {
  it('creates a user', () => {
    const user = createUser('John');
    expect(user.name).toBe('John');
  });
});
*/

// ============================================================================
// 5. BUILD TOOLS
// ============================================================================

/*
TSC (TypeScript Compiler):
- tsc              # Compile based on tsconfig.json
- tsc --watch      # Watch mode
- tsc --noEmit     # Type check only
- tsc src/index.ts --outDir dist

Webpack with TypeScript:
npm install -D webpack webpack-cli ts-loader

webpack.config.js:
module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

Vite (Recommended for modern projects):
npm create vite@latest my-app -- --template vanilla-ts

esbuild (Fastest):
npm install -D esbuild
esbuild src/index.ts --bundle --outfile=dist/bundle.js
*/

// ============================================================================
// 6. PACKAGE.JSON SCRIPTS
// ============================================================================

/*
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint 'src/** /*.ts'",
    "lint:fix": "eslint 'src/** /*.ts' --fix",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  }
}
*/

// ============================================================================
// 7. DEFINITELYTYPED (@types)
// ============================================================================

/*
Type definitions for untyped npm packages:

npm install --save-dev @types/node
npm install --save-dev @types/express
npm install --save-dev @types/jest
npm install --save-dev @types/react

Search for types: https://www.typescriptlibrary.com/
*/

// ============================================================================
// 8. DEBUGGING
// ============================================================================

/*
VS Code launch.json for debugging:
{
  "version": "0.2.0",
  "configurations": [{
    "type": "node",
    "request": "launch",
    "name": "Debug TypeScript",
    "program": "${workspaceFolder}/src/index.ts",
    "preLaunchTask": "tsc: build - tsconfig.json",
    "outFiles": ["${workspaceFolder}/dist/** /*.js"],
    "sourceMaps": true
  }]
}

Chrome DevTools:
- Enable source maps in tsconfig.json
- Use debugger statement in code
- Inspect in browser DevTools
*/

// ============================================================================
// 9. COMMON COMMANDS
// ============================================================================

/*
# Initialize TypeScript project
npm init -y
npm install --save-dev typescript

# Generate tsconfig.json
npx tsc --init

# Install types
npm install --save-dev @types/node

# Run TypeScript file directly
npx ts-node src/index.ts

# Type check without emit
npx tsc --noEmit

# Watch mode
npx tsc --watch

# Check version
npx tsc --version
*/

// ============================================================================
// 10. PROJECT STRUCTURE
// ============================================================================

/*
Typical TypeScript project structure:

my-project/
├── src/
│   ├── index.ts          # Entry point
│   ├── types/            # Type definitions
│   │   ├── index.ts
│   │   └── user.ts
│   ├── utils/            # Utilities
│   │   └── helpers.ts
│   ├── services/         # Business logic
│   │   └── api.ts
│   └── __tests__/        # Tests
│       └── index.test.ts
├── dist/                 # Compiled output
├── node_modules/
├── .eslintrc.json       # ESLint config
├── .gitignore
├── jest.config.js       # Jest config
├── package.json
├── tsconfig.json        # TypeScript config
└── README.md
*/

// ============================================================================
// 11. MIGRATION STRATEGIES
// ============================================================================

/*
Migrating JS to TS:

1. Rename .js to .ts files gradually
2. Start with loose tsconfig, tighten over time:
   {
     "compilerOptions": {
       "strict": false,
       "allowJs": true,
       "checkJs": false
     }
   }
3. Add types incrementally
4. Use @ts-ignore or @ts-expect-error temporarily
5. Gradually enable strict mode options

Tips:
- Start with leaf modules (no dependencies)
- Use JSDoc comments before converting
- Run both JS and TS side-by-side initially
*/

// ============================================================================
// 12. BEST PRACTICES
// ============================================================================

/*
✅ DO:
- Enable "strict": true in production
- Use path aliases for cleaner imports
- Generate declaration files for libraries
- Use source maps for debugging
- Set up pre-commit hooks (husky + lint-staged)
- Use ts-node or tsx for development
- Keep tsconfig.json consistent across team

❌ DON'T:
- Commit generated .js files to git
- Mix TypeScript versions across projects
- Ignore type errors in development
- Skip setting up linting
- Use skipLibCheck as a band-aid for type errors

💡 REMEMBER:
- TypeScript is a superset of JavaScript
- All JS is valid TS (with allowJs)
- Types are stripped at runtime
- Use strict mode for maximum safety
- Configure your editor for best experience
*/

// Example: Using path aliases
// Instead of: import { User } from '../../../types/user';
// Use: import { User } from '@/types/user';

export {};
