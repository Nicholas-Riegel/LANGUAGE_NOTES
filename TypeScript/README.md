# TypeScript Learning Notes

Comprehensive TypeScript notes following W3Schools curriculum with executable examples and tests.

## Setup

```bash
# Install dependencies
npm install

# Build TypeScript files
npm run build

# Watch mode (auto-compile on save)
npm run watch

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Structure

### Fundamentals (01-10)
- `01_simple_types.ts` - Basic types (string, number, boolean)
- `02_explicit_inference.ts` - Type annotation vs inference
- `03_special_types.ts` - any, unknown, never, undefined, null
- `04_arrays.ts` - Array types and operations
- `05_tuples.ts` - Fixed-length arrays with specific types
- `06_object_types.ts` - Object type definitions
- `07_enums.ts` - Enumerated types
- `08_aliases_interfaces.ts` - Type aliases and interfaces
- `09_union_types.ts` - Union and intersection types
- `10_functions.ts` - Function types and signatures

### Intermediate (11-20)
- `11_casting.ts` - Type assertions and casting
- `12_classes.ts` - Class syntax and OOP concepts
- `13_basic_generics.ts` - Generic types and functions
- `14_utility_types.ts` - Built-in utility types
- `15_keyof.ts` - Keyof operator
- `16_null_handling.ts` - Null and undefined handling
- `17_definitely_typed.ts` - @types packages
- `18_ts5_updates.ts` - TypeScript 5 new features
- `19_configuration.ts` - tsconfig.json explained
- `20_nodejs.ts` - TypeScript with Node.js

### Advanced (21-30)
- `21_advanced_types.ts` - Advanced type patterns
- `22_type_guards.ts` - Type narrowing techniques
- `23_conditional_types.ts` - Conditional type expressions
- `24_mapped_types.ts` - Mapped and transform types
- `25_type_inference.ts` - Type inference deep dive
- `26_literal_types.ts` - String/number literal types
- `27_namespaces.ts` - Namespace organization
- `28_index_signatures.ts` - Dynamic property access
- `29_declaration_merging.ts` - Interface/namespace merging
- `30_async_programming.ts` - Promises and async/await

### Expert (31-35)
- `31_decorators.ts` - Decorator patterns (experimental)
- `32_js_projects.ts` - TypeScript in JS projects
- `33_migration.ts` - Migration strategies
- `34_error_handling.ts` - Error handling patterns
- `35_best_practices.ts` - Best practices and patterns

## Running Individual Files

```bash
# Compile specific file
npx tsc src/01_simple_types.ts --outDir dist

# Run compiled file
node dist/01_simple_types.js

# Or use ts-node (install globally: npm i -g ts-node)
ts-node src/01_simple_types.ts
```

## Testing

Each topic has a corresponding test file:
- `01_simple_types.test.ts`
- `02_explicit_inference.test.ts`
- etc.

Run all tests: `npm test`
Run specific test: `npm test 01_simple_types`

## W3Schools Reference

This repository follows the W3Schools TypeScript tutorial structure:
https://www.w3schools.com/typescript/

## Notes

- All files are executable and demonstrate practical examples
- Tests verify the concepts work as expected
- Comments explain each concept in detail
- Examples progress from simple to complex
