#include <iostream>
using namespace std;

// Base class
class Car {
  public:
    void honk() {
      cout << "Car beeps \n";
    }
};

// Derived class
class Honda : public Car {
  public:
    void honk() {
      cout << "Honda beeps \n";
    }
};

// VIRTUAL FUNCTIONS
class Animal {
  public:
    // virtual void sound() {
    void sound() {
      cout << "Animal sound\n";
    }
};

class Dog : public Animal {
  public:
    void sound() {
      cout << "Dog barks\n";
    }
};

int main() {
  Animal* a;  // Declare a pointer to the base class (Animal)
  Dog d;  // Create an object of the derived class (Dog)
  a = &d;  // Point the base class pointer to the Dog object
  a->sound(); // Call the sound() function using the pointer. Since sound() is not virtual, this calls Animal's version
  return 0;
}

/*
The -> Operator in C++
You might be wondering why we used -> in the examples above.

The -> operator is used to access members (like functions or variables) through a pointer.

It's a shortcut for writing (*pointer).member:

Animal* a = new Animal();
a->sound(); // Same as (*a).sound();
Tip: If you are using a pointer to an object, use -> to access its members.
*/