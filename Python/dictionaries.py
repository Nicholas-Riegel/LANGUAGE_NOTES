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

# Working with arrays/lists as values
students_subjects = {
    'Alice': ['Math', 'Science'],
    'Bob': ['English', 'History'],
    'Carol': []
}

# Add single item to array
students_subjects['Alice'].append('Art')

# Add multiple items to array
students_subjects['Bob'].extend(['Geography', 'Music'])

# Add to array using += operator
students_subjects['Carol'] += ['Math', 'Science']

# Check if key exists before adding (safer approach)
if 'David' not in students_subjects:
    students_subjects['David'] = []
students_subjects['David'].append('Physics')

# Alternative: Use setdefault() to ensure key exists
students_subjects.setdefault('Eve', []).append('Chemistry')

print("Students and their subjects:")
for student, subjects in students_subjects.items():
    print(f"{student}: {subjects}")
