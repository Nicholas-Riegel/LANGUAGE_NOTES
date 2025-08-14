#include <iostream>
#include <string>

using namespace std;

// Named structure declaration (outside of main)
struct Car {
    string brand;
    string model;
    int year;
};

// Structure for student information
struct Student {
    string name;
    int age;
    char grade;
};

// Structure with different data types
struct Person {
    string firstName;
    string lastName;
    int age;
    bool isEmployed;
    double salary;
};

int main() {
    
    cout << "===== BASIC STRUCTURE =====\n";
    
    // Anonymous structure (declared and used immediately)
    struct {
        int myNum;
        string myString;
    } myStructure;
    
    // Assign values to members
    myStructure.myNum = 42;
    myStructure.myString = "Hello World!";
    
    // Access and print members
    cout << "Number: " << myStructure.myNum << endl;
    cout << "String: " << myStructure.myString << endl;
    
    cout << "\n===== MULTIPLE VARIABLES WITH SAME STRUCTURE =====\n";
    
    // Multiple variables with anonymous structure
    struct {
        string brand;
        string model;
        int year;
    } myCar1, myCar2;
    
    // Assign data to first car
    myCar1.brand = "BMW";
    myCar1.model = "X5";
    myCar1.year = 1999;
    
    // Assign data to second car
    myCar2.brand = "Ford";
    myCar2.model = "Mustang";
    myCar2.year = 1969;
    
    // Print both cars
    cout << "Car 1: " << myCar1.brand << " " << myCar1.model << " " << myCar1.year << endl;
    cout << "Car 2: " << myCar2.brand << " " << myCar2.model << " " << myCar2.year << endl;
    
    cout << "\n===== NAMED STRUCTURES =====\n";
    
    // Using the named Car structure
    Car car1;
    car1.brand = "Toyota";
    car1.model = "Camry";
    car1.year = 2020;
    
    Car car2;
    car2.brand = "Honda";
    car2.model = "Civic";
    car2.year = 2021;
    
    cout << "Named Car 1: " << car1.brand << " " << car1.model << " " << car1.year << endl;
    cout << "Named Car 2: " << car2.brand << " " << car2.model << " " << car2.year << endl;
    
    cout << "\n===== STUDENT STRUCTURE (Challenge Task) =====\n";
    
    // Create and use student structure
    Student student1;
    student1.name = "Liam";
    student1.age = 35;
    student1.grade = 'A';
    
    // Print student information
    cout << "Name: " << student1.name << endl;
    cout << "Age: " << student1.age << endl;
    cout << "Grade: " << student1.grade << endl;
    
    cout << "\n===== STRUCTURE WITH MIXED DATA TYPES =====\n";
    
    // Using Person structure with various data types
    Person person1;
    person1.firstName = "Alice";
    person1.lastName = "Johnson";
    person1.age = 28;
    person1.isEmployed = true;
    person1.salary = 65000.50;
    
    cout << "Employee: " << person1.firstName << " " << person1.lastName << endl;
    cout << "Age: " << person1.age << endl;
    cout << "Employed: " << (person1.isEmployed ? "Yes" : "No") << endl;
    cout << "Salary: $" << person1.salary << endl;
    
    cout << "\n===== ARRAY OF STRUCTURES =====\n";
    
    // Create array of students
    Student students[3];
    
    // Assign data to students
    students[0] = {"John", 20, 'B'};
    students[1] = {"Sarah", 22, 'A'};
    students[2] = {"Mike", 21, 'C'};
    
    // Print all students
    cout << "Class roster:" << endl;
    for (int i = 0; i < 3; i++) {
        cout << "Student " << (i+1) << ": " << students[i].name 
             << ", Age: " << students[i].age 
             << ", Grade: " << students[i].grade << endl;
    }
    
    cout << "\n===== STRUCTURE INITIALIZATION =====\n";
    
    // Initialize structure at declaration
    Car car3 = {"Tesla", "Model 3", 2023};
    cout << "Initialized Car: " << car3.brand << " " << car3.model << " " << car3.year << endl;
    
    // Initialize with designated initializers (C++20 feature)
    Person person2 = {
        .firstName = "Bob",
        .lastName = "Smith", 
        .age = 45,
        .isEmployed = false,
        .salary = 0.0
    };
    
    cout << "Initialized Person: " << person2.firstName << " " << person2.lastName 
         << ", Age: " << person2.age << ", Employed: " << (person2.isEmployed ? "Yes" : "No") << endl;
    
    return 0;
}
