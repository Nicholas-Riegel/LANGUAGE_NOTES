// String creation
const text = "Hello World";
const multiline = `This is a
multiline string`;

// String concatenation
const greeting = "Hello" + " " + "World";
const name = "Alice";
const message = `Hello ${name}!`;  // Template literal

// String methods
console.log(text.toUpperCase());     // "HELLO WORLD"
console.log(text.toLowerCase());     // "hello world"
console.log(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()); // "Hello world" (capitalize)

// String checking
console.log(text.startsWith("Hello"));  // true
console.log(text.endsWith("World"));    // true
console.log(/^\d+$/.test("123"));       // true (isDigit equivalent)
console.log(/^[a-zA-Z]+$/.test("abc")); // true (isAlpha equivalent)
console.log(/^[a-zA-Z0-9]+$/.test("abc123")); // true (isAlnum equivalent)

// String searching
console.log(text.indexOf("World"));     // 6 (index of first occurrence)
console.log(text.search("World"));      // 6 (using regex)
console.log((text.match(/l/g) || []).length); // 3 (count occurrences)

// String replacement
const newText = text.replace("World", "JavaScript");
console.log(newText);  // "Hello JavaScript"

// Replace all occurrences
const replaceAll = text.replace(/l/g, "L");
console.log(replaceAll);  // "HeLLo WorLd"

// String splitting and joining
const words = text.split(" ");           // ["Hello", "World"]
const rejoined = words.join(" ");        // "Hello World"

const csvData = "apple,banana,cherry";
const fruits = csvData.split(",");       // ["apple", "banana", "cherry"]

// String trimming
const spaced = "  Hello World  ";
console.log(spaced.trim());              // "Hello World"
console.log(spaced.trimStart());         // "Hello World  "
console.log(spaced.trimEnd());           // "  Hello World"

// String slicing (using substring/slice)
console.log(text.slice(0, 5));          // "Hello"
console.log(text.slice(0, 5));          // "Hello"
console.log(text.slice(6));             // "World"
console.log(text.slice(-5));            // "World"
console.log(text.split('').reverse().join('')); // "dlroW olleH" (reverse)

// String length
console.log(text.length);               // 11

// String membership
console.log(text.includes("World"));    // true
console.log(!text.includes("JavaScript")); // true

// String formatting
const age = 25;
const formatted = `I am ${age} years old`;

// Multiple values
const personName = "Bob";
const personAge = 30;
const info = `Name: ${personName}, Age: ${personAge}`;

// String escape characters
const escaped = "He said \"Hello\"";
const newline = "Line 1\nLine 2";
const tab = "Column1\tColumn2";

// Raw strings equivalent (for regex patterns)
const raw = String.raw`C:\Users\name\file.txt`;

// String comparison
console.log("apple" < "banana");         // true (alphabetical order)
console.log("Apple" < "apple");          // true (uppercase comes first)

// String repetition
const repeated = "Ha".repeat(3);         // "HaHaHa"

// Check if string is empty
const empty = "";
console.log(empty.length === 0);         // true
console.log(!empty);                     // true

// Additional useful methods
console.log(text.charAt(0));             // "H" (character at index)
console.log(text.charCodeAt(0));         // 72 (ASCII code)
console.log(text.substring(0, 5));       // "Hello" (alternative to slice)
console.log(text.padStart(15, "*"));     // "****Hello World"
console.log(text.padEnd(15, "*"));       // "Hello World****"
