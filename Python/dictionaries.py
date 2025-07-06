# Create
person = {'name': 'Alice', 'age': 30}
person2 = dict(name='Bob', age=25)
person3 = dict([('name', 'Carol'), ('age', 35)])

# Access
print(person['name'])
print(person.get('email', 'Not Found!'))

# Modify
person['age'] = 31

# Add
person['email'] = 'alice@example.com'

# Delete
del person['age']
person.pop('name')

# Check
if 'email' in person:
    print('yes')

# Keys, values, items
print(person.keys())
print(person.values())
print(person.items())

# Iterate
for key, value in person.items():
    print(f"{key}: {value}")

# Iterate over keys only
for key in person.keys():
    print(key)

# Iterate over values only
for value in person.values():
    print(value)

# Dictionary comprehension
squares = {x: x*x for x in range(5)}  # {0:0, 1:1, 2:4, ...}
