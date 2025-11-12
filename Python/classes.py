# Define a class
class Dog:
    # Constructor
    def __init__(self, name, age):
        self.name = name  # instance variable
        self.age = age

    # Instance method - requires 'self' as first parameter
    # 'self' refers to the instance calling the method
    def speak(self, sound):
        return f"{self.name} says {sound}"

# Create an object
fido = Dog("Fido", 5)

# Access attributes/methods
print(fido.name)            # 'Fido'
print(fido.speak("woof"))   # 'Fido says woof'


# Inheritance
class Puppy(Dog):
    def speak(self, sound="yip"):
        return super().speak(sound)

# Using inherited class
puppy = Puppy("Buddy", 1)
print(puppy.name)              # 'Buddy' (inherited attribute)
print(puppy.speak())           # 'Buddy says yip' (uses default parameter)
print(puppy.speak("arf"))      # 'Buddy says arf' (overrides default)

# Class variables
class Counter:
    count = 0
    def __init__(self):
        Counter.count += 1

# __str__ method
class Person:
    def __init__(self, name):
        self.name = name
    def __str__(self):
        return f"Person({self.name})"

print(str(Person("Nick")))  # Person(Nick)


# ===== METHOD TYPES IN PYTHON CLASSES =====

# 1. INSTANCE METHODS
# - Most common type of method
# - First parameter must be 'self' (refers to the instance)
# - Can access and modify instance state
# - Can access class state through self.__class__

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    # Instance method
    def deposit(self, amount):
        self.balance += amount
        return f"{self.owner} deposited ${amount}. New balance: ${self.balance}"
    
    # Instance method
    def withdraw(self, amount):
        if amount > self.balance:
            return "Insufficient funds"
        self.balance -= amount
        return f"Withdrew ${amount}. New balance: ${self.balance}"

# Using instance methods
account = BankAccount("Alice", 100)
print(account.deposit(50))   # Alice deposited $50. New balance: $150
print(account.withdraw(30))  # Withdrew $30. New balance: $120


# 2. CLASS METHODS
# - Decorated with @classmethod
# - First parameter must be 'cls' (refers to the class itself)
# - Can access and modify class state
# - Cannot access instance state (no access to 'self')
# - Often used as alternative constructors

class Employee:
    company = "TechCorp"  # class variable
    employee_count = 0
    
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.employee_count += 1
    
    # Class method - alternative constructor from string
    @classmethod
    def from_string(cls, emp_string):
        name, salary = emp_string.split('-')
        return cls(name, int(salary))
    
    # Class method - access/modify class variables
    @classmethod
    def set_company(cls, new_company):
        cls.company = new_company
    
    @classmethod
    def get_employee_count(cls):
        return f"Total employees: {cls.employee_count}"

# Using class methods
emp1 = Employee("Bob", 50000)
emp2 = Employee.from_string("Charlie-60000")  # Alternative constructor
print(Employee.get_employee_count())  # Total employees: 2
Employee.set_company("NewTech")
print(Employee.company)  # NewTech


# 3. STATIC METHODS
# - Decorated with @staticmethod
# - No 'self' or 'cls' parameter required
# - Cannot access or modify instance or class state
# - Behave like regular functions but belong to class namespace
# - Used for utility functions related to the class

class Calculator:
    @staticmethod
    def add(x, y):
        return x + y
    
    @staticmethod
    def multiply(x, y):
        return x * y
    
    @staticmethod
    def is_even(num):
        return num % 2 == 0

# Using static methods (can call on class or instance)
print(Calculator.add(5, 3))        # 8
print(Calculator.is_even(10))      # True
calc = Calculator()
print(calc.multiply(4, 7))         # 28


# SUMMARY:
# - Instance methods: require 'self', work with instance data
# - Class methods: require 'cls', work with class data, use @classmethod
# - Static methods: no self/cls needed, utility functions, use @staticmethod

