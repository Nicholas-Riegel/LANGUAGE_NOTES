# String creation
text = "Hello World"
multiline = """This is a
multiline string"""

# String concatenation
greeting = "Hello" + " " + "World"
name = "Alice"
message = f"Hello {name}!"  # f-string
message2 = "Hello {}!".format(name)  # format method

# String methods
print(text.upper())           # "HELLO WORLD"
print(text.lower())           # "hello world"
print(text.capitalize())      # "Hello world"
print(text.title())           # "Hello World"

# String checking
print(text.startswith("Hello"))  # True
print(text.endswith("World"))    # True
print("123".isdigit())           # True
print("abc".isalpha())           # True
print("abc123".isalnum())        # True

# String searching
print(text.find("World"))        # 6 (index of first occurrence)
print(text.index("World"))       # 6 (throws error if not found)
print(text.count("l"))           # 3 (count occurrences)

# String replacement
new_text = text.replace("World", "Python")
print(new_text)  # "Hello Python"

# String splitting and joining
words = text.split(" ")          # ["Hello", "World"]
rejoined = " ".join(words)       # "Hello World"

csv_data = "apple,banana,cherry"
fruits = csv_data.split(",")     # ["apple", "banana", "cherry"]

# String trimming
spaced = "  Hello World  "
print(spaced.strip())            # "Hello World"
print(spaced.lstrip())           # "Hello World  "
print(spaced.rstrip())           # "  Hello World"

# String slicing
print(text[0:5])                 # "Hello"
print(text[:5])                  # "Hello"
print(text[6:])                  # "World"
print(text[-5:])                 # "World"
print(text[::-1])                # "dlroW olleH" (reverse)

# String length
print(len(text))                 # 11

# String membership
print("World" in text)           # True
print("Python" not in text)     # True

# String formatting
age = 25
formatted = f"I am {age} years old"
formatted2 = "I am {} years old".format(age)
formatted3 = "I am %d years old" % age

# Multiple values
name = "Bob"
age = 30
info = f"Name: {name}, Age: {age}"

# String escape characters
escaped = "He said \"Hello\""
newline = "Line 1\nLine 2"
tab = "Column1\tColumn2"

# Raw strings (useful for regex)
raw = r"C:\Users\name\file.txt"

# String comparison
print("apple" < "banana")        # True (alphabetical order)
print("Apple" < "apple")         # True (uppercase comes first)

# String multiplication
repeated = "Ha" * 3              # "HaHaHa"

# Check if string is empty
empty = ""
print(len(empty) == 0)           # True
print(not empty)                 # True (Pythonic way)
