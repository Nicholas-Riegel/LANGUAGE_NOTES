// Define a class
class Dog {
    // Constructor
    constructor(name, age) {
        this.name = name;  // instance variable
        this.age = age;
    }

    // Method
    speak(sound) {
        return `${this.name} says ${sound}`;
    }
}

// Create an object
const fido = new Dog("Fido", 5);

// Access attributes/methods
console.log(fido.name);            // 'Fido'
console.log(fido.speak("woof"));   // 'Fido says woof'


// Inheritance
class Puppy extends Dog {
    speak(sound = "yip") {
        return super.speak(sound);
    }
}

// Class variables (static)
class Counter {
    static count = 0;
    
    constructor() {
        Counter.count++;
    }
}

// toString method
class Person {
    constructor(name) {
        this.name = name;
    }
    
    toString() {
        return `Person(${this.name})`;
    }
}

console.log(new Person("Nick").toString());  // Person(Nick)
