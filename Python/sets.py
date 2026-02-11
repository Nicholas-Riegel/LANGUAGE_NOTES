# PYTHON SETS - Comprehensive Notes
# Sets are unordered collections of unique elements

# =============================================================================
# CREATE SETS
# =============================================================================

# Create empty set
empty_set = set()  # Note: {} creates a dict, not an empty set!

# Create set with elements
fruits = {'apple', 'banana', 'orange'}
numbers = {1, 2, 3, 4, 5}

# Create from list (removes duplicates)
my_list = [1, 2, 2, 3, 3, 3, 4]
unique_numbers = set(my_list)  # {1, 2, 3, 4}

# Create from string (each character becomes element)
letters = set('hello')  # {'h', 'e', 'l', 'o'} - note: only one 'l'

# =============================================================================
# ADD ELEMENTS
# =============================================================================

# Add single element
fruits.add('grape')

# Add multiple elements
fruits.update(['kiwi', 'mango'])
fruits.update('pear')  # Adds each character as separate element
numbers.update([6, 7, 8])

# =============================================================================
# REMOVE/DELETE ELEMENTS
# =============================================================================

# Remove specific element (raises KeyError if not found)
fruits.remove('banana')

# Remove specific element (no error if not found)
fruits.discard('banana')  # Safe removal

# Remove and return arbitrary element
removed_fruit = fruits.pop()

# Clear all elements
# fruits.clear()

# =============================================================================
# ACCESS/CHECK MEMBERSHIP
# =============================================================================

# Check if element exists
print('apple' in fruits)        # True/False
print('banana' not in fruits)   # True/False

# Get length
print(len(fruits))

# Check if set is empty
if fruits:
    print("Set is not empty")

# =============================================================================
# SET OPERATIONS
# =============================================================================

set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Union (all elements from both sets)
union_result = set1 | set2           # {1, 2, 3, 4, 5, 6}
union_result2 = set1.union(set2)     # Same result

# Intersection (common elements)
intersection = set1 & set2           # {3, 4}
intersection2 = set1.intersection(set2)  # Same result

# Difference (elements in set1 but not in set2)
difference = set1 - set2             # {1, 2}
difference2 = set1.difference(set2)  # Same result

# Symmetric difference (elements in either set, but not both)
sym_diff = set1 ^ set2               # {1, 2, 5, 6}
sym_diff2 = set1.symmetric_difference(set2)  # Same result

# =============================================================================
# SET RELATIONSHIPS
# =============================================================================

small_set = {1, 2}
large_set = {1, 2, 3, 4, 5}

# Check if subset
print(small_set.issubset(large_set))    # True
print(small_set <= large_set)          # True (same as issubset)

# Check if superset
print(large_set.issuperset(small_set)) # True
print(large_set >= small_set)          # True (same as issuperset)

# Check if disjoint (no common elements)
set_a = {1, 2, 3}
set_b = {4, 5, 6}
print(set_a.isdisjoint(set_b))         # True

# =============================================================================
# ITERATION
# =============================================================================

# Iterate over elements (order not guaranteed)
for fruit in fruits:
    print(fruit)

# Iterate with enumerate (if you need index)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# =============================================================================
# SET COMPREHENSIONS
# =============================================================================

# Create set of squares
squares = {x**2 for x in range(1, 6)}  # {1, 4, 9, 16, 25}

# Filter with condition
even_squares = {x**2 for x in range(1, 11) if x % 2 == 0}

# From existing iterable
words = ['apple', 'banana', 'apple', 'cherry']
unique_lengths = {len(word) for word in words}  # {5, 6}

# =============================================================================
# COPYING SETS
# =============================================================================

# Shallow copy
fruits_copy = fruits.copy()
fruits_copy2 = set(fruits)

# =============================================================================
# FROZEN SETS (Immutable sets)
# =============================================================================

# Create immutable set
frozen_numbers = frozenset([1, 2, 3, 4])
# frozen_numbers.add(5)  # This would raise AttributeError

# Useful as dictionary keys (since they're hashable)
set_dict = {
    frozenset([1, 2]): 'first',
    frozenset([3, 4]): 'second'
}

# =============================================================================
# COMMON USE CASES
# =============================================================================

# Remove duplicates from list
my_list = [1, 2, 2, 3, 3, 3, 4]
unique_list = list(set(my_list))

# Find common elements between lists
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]
common = list(set(list1) & set(list2))  # [4, 5]

# Find differences between lists
only_in_list1 = list(set(list1) - set(list2))  # [1, 2, 3]

# Check if all elements in one list are in another
all_present = set(list1).issubset(set(list2))

# =============================================================================
# PERFORMANCE NOTES
# =============================================================================

# Sets use hash tables, so:
# - Membership testing: O(1) average case
# - Adding/removing: O(1) average case
# - Much faster than lists for membership testing

# Example: Fast membership testing
large_set = set(range(1000000))
print(999999 in large_set)  # Very fast!

# Compare with list (much slower)
large_list = list(range(1000000))
print(999999 in large_list)  # Slower for large collections

print("\nSets are great for:")
print("- Removing duplicates")
print("- Fast membership testing")
print("- Mathematical set operations")
print("- Finding unique elements")
print("- Comparing collections")
