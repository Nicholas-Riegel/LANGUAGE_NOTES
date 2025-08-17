// C++ Constructors Summary
// Based on: https://www.w3schools.com/cpp/cpp_constructors.asp
//
// Constructors are special class methods that are called automatically when an object is created.
// They are used to initialize the object's attributes and set up its initial state.
//
// Key Points:
// - Constructor has the same name as the class
// - No return type (not even void)
// - Usually declared public
// - Can have parameters (for custom initialization)
// - Can be defined inside or outside the class
// - Called automatically when an object is created
//
// Best Practice: Always initialize all member variables in your constructor.
//
// Example 1: Default Constructor
#include <iostream>
#include <string>
using namespace std;

class MyClass {
public:
    MyClass() {
        cout << "Hello from MyClass constructor!" << endl;
    }
};

// Example 2: Constructor with Parameters
class Car {
public:
    string brand;
    string model;
    int year;
    Car(string x, string y, int z) {
        brand = x;
        model = y;
        year = z;
    }
};

// Example 3: Constructor Defined Outside the Class
class Book {
public:
    string title;
    string author;
    int year;
    Book(string t, string a, int y); // Constructor declaration
};

Book::Book(string t, string a, int y) { // Constructor definition
    title = t;
    author = a;
    year = y;
}

// Constructor overloading
class Car {
  public:
    string brand;
    string model;

    Car() {
      brand = "Unknown";
      model = "Unknown";
    }

    Car(string b, string m) {
      brand = b;
      model = m;
    }
};

