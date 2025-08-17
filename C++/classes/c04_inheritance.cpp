#include <iostream>
#include <string>

using namespace std;

// Base class
class Vehicle {
  public:
    string brand = "Ford";
    void honk() {
      cout << "Tuut, tuut! \n" ;
    }
};

class Vehicle2 {
};

// Derived class
// if you say protected, public and protected members of Base become protected in Derived.
// if you say private, public and protected members of Base become private in Derived.
class Car: public Vehicle, public Vehicle2 {
  public:
    string model = "Mustang";
};

int main() {
  Car myCar;
  myCar.honk();
  cout << myCar.brand + " " + myCar.model;
  return 0;
}