# Create
fruits = ['apple', 'banana', 'cherry']

# Access
print(fruits[0])      # 'apple'
print(fruits[-1])     # 'cherry'

# Modify
fruits[1] = 'blueberry'

# Add
fruits.append('date')
fruits.insert(1, 'kiwi')  # at index 1

# Remove
fruits.remove('apple')    # by value
fruits.pop()              # last item
del fruits[0]             # by index

# Slice
print(fruits[1:3])  # elements 1 and 2

# Iterate
for fruit in fruits:
    print(fruit)

# Check
if 'banana' in fruits:
    print('yes')

# Length
len(fruits)

# Count occurrences
fruits_with_duplicates = ['apple', 'banana', 'apple', 'cherry']
print(fruits_with_duplicates.count('apple'))  # Returns 2

# Find index of item
print(fruits_with_duplicates.index('banana'))  # Returns 1

# Extend with another list
fruits.extend(['grape', 'mango'])

# Sort list
numbers = [3, 1, 4, 1, 5]
numbers.sort()  # Sorts in place
print(numbers)

# Sort without modifying original
original_numbers = [3, 1, 4, 1, 5]
sorted_numbers = sorted(original_numbers)
print(sorted_numbers)

# Reverse list
numbers.reverse()  # Reverses in place
print(numbers)

# Clear all items
# fruits.clear()  # Removes all items

# Copy list
fruits_copy = fruits.copy()

# Min, max, sum (for numeric lists)
nums = [10, 5, 8, 3, 9]
print(min(nums))
print(max(nums))
print(sum(nums))

# List Comprehension
squares = [x*x for x in range(5)]  # [0, 1, 4, 9, 16]

# Unpacking/Spread operator (*)
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# Combine lists using unpacking
combined = [*list1, *list2]  # [1, 2, 3, 4, 5, 6]

# Insert elements in the middle
mixed = [0, *list1, 99, *list2, 100]  # [0, 1, 2, 3, 99, 4, 5, 6, 100]

# Unpack into function arguments
def add_three(a, b, c):
    return a + b + c

result = add_three(*list1)  # Same as add_three(1, 2, 3)

# Unpack for assignment
first, *middle, last = [1, 2, 3, 4, 5]  # first=1, middle=[2,3,4], last=5
