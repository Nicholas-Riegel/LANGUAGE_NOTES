// Create objects (JavaScript equivalent of Python dictionaries)
const person = { name: 'Alice', age: 30 };
const person2 = { name: 'Bob', age: 25 };
const person3 = Object.fromEntries([['name', 'Carol'], ['age', 35]]);

// Access
console.log(person['name']);
console.log(person.name);  // Dot notation (unique to JS)
console.log(person.email || 'Not Found!');  // Default value

// Modify
person['age'] = 31;
person.age = 31;  // Dot notation

// Add
person['email'] = 'alice@example.com';
person.email = 'alice@example.com';  // Dot notation

// Delete
delete person['age'];
delete person.name;

// Check
if ('email' in person) {
    console.log('yes');
}

// Keys, values, entries
console.log(Object.keys(person));
console.log(Object.values(person));
console.log(Object.entries(person));

// Iterate
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

// Iterate over keys only
for (const key of Object.keys(person)) {
    console.log(key);
}

// Iterate over values only
for (const value of Object.values(person)) {
    console.log(value);
}

// Object comprehension equivalent (using Object.fromEntries)
const squares = Object.fromEntries(
    Array.from({ length: 5 }, (_, x) => [x, x * x])
);  // {0:0, 1:1, 2:4, ...}

// Alternative using reduce
const squares2 = Array.from({ length: 5 }, (_, x) => x)
    .reduce((acc, x) => ({ ...acc, [x]: x * x }), {});
