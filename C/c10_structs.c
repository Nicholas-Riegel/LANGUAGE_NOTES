#include <stdio.h>
#include <string.h>

// ===== STRUCT DEFINITION =====

struct Person {
    char name[50];
    int age;
    float height;
};

// Typedef for cleaner syntax
typedef struct {
    char brand[50];
    char model[50];
    int year;
} Car;

// Nested struct
typedef struct {
    char street[100];
    char city[50];
    int zipCode;
} Address;

typedef struct {
    char name[50];
    int age;
    Address address;  // Nested struct
} Employee;

int main() {
    
    printf("===== CREATING STRUCTS =====\n");
    
    // Method 1: Declare then assign
    struct Person person1;
    strcpy(person1.name, "John");
    person1.age = 30;
    person1.height = 5.9;
    
    printf("Person 1: %s, %d years, %.1f ft\n", 
           person1.name, person1.age, person1.height);
    
    // Method 2: Initialize during declaration
    struct Person person2 = {"Alice", 25, 5.5};
    printf("Person 2: %s, %d years, %.1f ft\n", 
           person2.name, person2.age, person2.height);
    
    printf("\n===== USING TYPEDEF =====\n");
    
    // With typedef, no need for 'struct' keyword
    Car car1 = {"Toyota", "Camry", 2020};
    printf("Car: %s %s (%d)\n", car1.brand, car1.model, car1.year);
    
    printf("\n===== ACCESSING STRUCT MEMBERS =====\n");
    
    Car car2;
    strcpy(car2.brand, "Honda");
    strcpy(car2.model, "Civic");
    car2.year = 2021;
    
    printf("Brand: %s\n", car2.brand);
    printf("Model: %s\n", car2.model);
    printf("Year: %d\n", car2.year);
    
    printf("\n===== MODIFYING STRUCT MEMBERS =====\n");
    
    printf("Before: %s, age %d\n", person1.name, person1.age);
    person1.age = 31;
    printf("After: %s, age %d\n", person1.name, person1.age);
    
    printf("\n===== NESTED STRUCTS =====\n");
    
    Employee emp;
    strcpy(emp.name, "Bob");
    emp.age = 35;
    strcpy(emp.address.street, "123 Main St");
    strcpy(emp.address.city, "Springfield");
    emp.address.zipCode = 12345;
    
    printf("Employee: %s\n", emp.name);
    printf("Address: %s, %s %d\n", 
           emp.address.street, emp.address.city, emp.address.zipCode);
    
    printf("\n===== ARRAY OF STRUCTS =====\n");
    
    Car cars[3] = {
        {"Toyota", "Camry", 2020},
        {"Honda", "Civic", 2021},
        {"Ford", "Mustang", 2019}
    };
    
    printf("Cars in array:\n");
    for (int i = 0; i < 3; i++) {
        printf("%d. %s %s (%d)\n", 
               i + 1, cars[i].brand, cars[i].model, cars[i].year);
    }
    
    printf("\n===== POINTERS TO STRUCTS =====\n");
    
    Car myCar = {"Tesla", "Model 3", 2022};
    Car *carPtr = &myCar;
    
    // Access members using arrow operator
    printf("Brand: %s\n", carPtr->brand);
    printf("Model: %s\n", carPtr->model);
    printf("Year: %d\n", carPtr->year);
    
    // Alternative (less common)
    printf("Brand: %s\n", (*carPtr).brand);
    
    printf("\n===== PASSING STRUCTS TO FUNCTIONS =====\n");
    
    // Pass by value (creates copy)
    void printCar(Car c) {
        printf("Car: %s %s (%d)\n", c.brand, c.model, c.year);
    }
    
    // Pass by reference (using pointer)
    void updateYear(Car *c, int newYear) {
        c->year = newYear;
    }
    
    printCar(myCar);
    printf("Before update: year = %d\n", myCar.year);
    updateYear(&myCar, 2023);
    printf("After update: year = %d\n", myCar.year);
    
    printf("\n===== COPYING STRUCTS =====\n");
    
    Car original = {"BMW", "X5", 2020};
    Car copy = original;  // Simple assignment copies all members
    
    printf("Original: %s %s\n", original.brand, original.model);
    printf("Copy: %s %s\n", copy.brand, copy.model);
    
    // Modifying copy doesn't affect original
    strcpy(copy.brand, "Mercedes");
    printf("After modifying copy:\n");
    printf("Original: %s\n", original.brand);  // Still BMW
    printf("Copy: %s\n", copy.brand);          // Mercedes
    
    printf("\n===== STRUCT SIZE =====\n");
    
    printf("Size of Person: %lu bytes\n", sizeof(struct Person));
    printf("Size of Car: %lu bytes\n", sizeof(Car));
    printf("Size of Employee: %lu bytes\n", sizeof(Employee));
    
    return 0;
}

// Notes:
// - Structs group related data together
// - Use typedef to avoid writing 'struct' keyword
// - Access members with dot operator: structVar.member
// - Access members through pointer with arrow: structPtr->member
// - Structs can be copied with simple assignment (=)
// - Pass by value copies the entire struct (can be slow for large structs)
// - Pass by pointer (reference) for efficiency
// - Structs can contain other structs (nesting)
// - Arrays of structs are common for storing multiple records
// - Struct size may be larger than sum of members (due to padding/alignment)
