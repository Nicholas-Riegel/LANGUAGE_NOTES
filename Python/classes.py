# Define a class
class Dog:
    # Constructor
    def __init__(self, name, age):
        self.name = name  # instance variable
        self.age = age

    # Method
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
