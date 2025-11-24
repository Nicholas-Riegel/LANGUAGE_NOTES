# Bash Scripting

## Table of Contents
1. [Script Basics](#script-basics)
2. [Variables](#variables)
3. [Data Types](#data-types)
4. [Operators](#operators)
5. [If...Else](#ifelse)
6. [Loops](#loops)
7. [Functions](#functions)
8. [Arrays](#arrays)
9. [Cron Jobs](#cron-jobs)

---

## Script Basics

### Creating a Script

```bash
# Create script file
touch script.sh

# Make executable
chmod +x script.sh

# Run script
./script.sh                         # Current directory
bash script.sh                      # Using bash explicitly
```

### Shebang

First line tells system which interpreter to use.

```bash
#!/bin/bash                         # Standard bash
#!/usr/bin/env bash                 # Portable (finds bash in PATH)
#!/bin/sh                           # POSIX shell (more compatible)
#!/usr/bin/zsh                      # Z shell
```

### Basic Script Structure

```bash
#!/bin/bash

# Script: hello.sh
# Description: Simple greeting script
# Author: Your Name
# Date: 2024-01-15

# Exit on error
set -e

# Exit on undefined variable
set -u

# Variables
name="World"

# Main logic
echo "Hello, $name!"

# Exit successfully
exit 0
```

### Script Options

```bash
set -e                              # Exit on error
set -u                              # Exit on undefined variable
set -x                              # Print commands before execution (debug)
set -o pipefail                     # Pipeline fails if any command fails

# Combine options
set -euo pipefail

# Or on shebang line
#!/bin/bash -eu
```

### Comments

```bash
# Single line comment

: '
Multi-line comment
Everything here is ignored
'

# Inline comment
echo "Hello"                        # This prints Hello
```

### Command Line Arguments

```bash
#!/bin/bash

# Access arguments
echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"
echo "Number of arguments: $#"

# Check if arguments provided
if [ $# -eq 0 ]; then
    echo "No arguments provided"
    exit 1
fi
```

Usage:
```bash
./script.sh arg1 arg2 arg3
# $0 = ./script.sh
# $1 = arg1
# $2 = arg2
# $@ = arg1 arg2 arg3
# $# = 3
```

### Special Variables

```bash
$0                                  # Script name
$1, $2, $3...                       # Positional arguments
$#                                  # Number of arguments
$@                                  # All arguments (as separate words)
$*                                  # All arguments (as single word)
$?                                  # Exit status of last command
$$                                  # Process ID of current script
$!                                  # Process ID of last background command
```

---

## Variables

### Declaration and Assignment

```bash
# Simple assignment (no spaces around =)
name="John"
age=25
path="/home/user"

# Command substitution
current_date=$(date)
files=$(ls)

# Read user input
read -p "Enter name: " user_name
echo "Hello, $user_name"
```

### Using Variables

```bash
name="Alice"

# Basic usage
echo $name                          # Alice
echo "$name"                        # Alice (recommended)
echo "${name}"                      # Alice (clearer)

# Concatenation
greeting="Hello, $name!"
full_name="${first_name} ${last_name}"

# Default values
echo "${name:-Guest}"               # Use "Guest" if name is unset/empty
echo "${name:=Guest}"               # Set name to "Guest" if unset/empty
echo "${name:?Error: name not set}" # Error if name is unset/empty
echo "${name:+Alternative}"         # Use "Alternative" if name is set
```

### Variable Scope

```bash
# Global variable (default)
global_var="I'm global"

function test_scope() {
    # Local variable (only in function)
    local local_var="I'm local"
    echo $global_var                # Can access global
    echo $local_var
}

test_scope
echo $global_var                    # Works
echo $local_var                     # Empty (not defined here)
```

### Environment Variables

```bash
# View environment variables
env                                 # All environment variables
echo $PATH                          # Specific variable
echo $HOME
echo $USER

# Set environment variable
export MY_VAR="value"               # Available to child processes

# Set for single command
MY_VAR="value" command

# Unset variable
unset MY_VAR
```

### Common Environment Variables

```bash
$HOME                               # User's home directory
$USER                               # Current username
$SHELL                              # Current shell
$PATH                               # Executable search path
$PWD                                # Current directory
$OLDPWD                             # Previous directory
$HOSTNAME                           # Computer name
```

### String Manipulation

```bash
text="Hello World"

# Length
echo ${#text}                       # 11

# Substring
echo ${text:0:5}                    # Hello (from position 0, length 5)
echo ${text:6}                      # World (from position 6 to end)

# Replace
echo ${text/World/Bash}             # Hello Bash (first occurrence)
echo ${text//l/L}                   # HeLLo WorLd (all occurrences)

# Remove prefix/suffix
filename="document.txt"
echo ${filename%.txt}               # document (remove .txt)
echo ${filename#*/}                 # Remove up to first /
echo ${filename##*/}                # Remove up to last / (basename)

# Case conversion (Bash 4+)
echo ${text^^}                      # HELLO WORLD (uppercase)
echo ${text,,}                      # hello world (lowercase)
echo ${text^}                       # Hello World (capitalize first)
```

---

## Data Types

Bash is untyped, but variables can be treated as strings or numbers.

### Strings

```bash
# Single quotes (literal)
name='John'
echo '$name'                        # Prints: $name

# Double quotes (interpolation)
name="John"
echo "Hello, $name"                 # Prints: Hello, John

# Concatenation
first="John"
last="Doe"
full="$first $last"                 # John Doe
full="${first} ${last}"             # John Doe (clearer)

# Multi-line strings
text="Line 1
Line 2
Line 3"

# Here document
cat << EOF
This is a multi-line
string that can contain $variables
and "quotes" without escaping
EOF
```

### Numbers (Integers)

```bash
# Arithmetic
num=10
((num++))                           # Increment: 11
((num--))                           # Decrement: 10
((num += 5))                        # Add: 15
((num *= 2))                        # Multiply: 30

# Arithmetic expansion
result=$((5 + 3))                   # 8
result=$((10 - 4))                  # 6
result=$((6 * 7))                   # 42
result=$((20 / 4))                  # 5
result=$((20 % 3))                  # 2 (modulo/remainder)
```

### Floating Point (using bc)

```bash
# bc for floating point
result=$(echo "scale=2; 10 / 3" | bc)   # 3.33
result=$(echo "scale=2; 5.5 + 2.3" | bc) # 7.80

# awk for floating point
result=$(awk "BEGIN {print 10 / 3}")     # 3.33333
```

### Booleans

```bash
# Bash uses exit codes: 0 = true, non-zero = false

# Boolean-like variables
is_active=true
is_debug=false

if [ "$is_active" = true ]; then
    echo "Active"
fi

# Using 0/1
enabled=1
if [ $enabled -eq 1 ]; then
    echo "Enabled"
fi
```

---

## Operators

### Arithmetic Operators

```bash
# Basic arithmetic
$((5 + 3))                          # Addition: 8
$((10 - 4))                         # Subtraction: 6
$((6 * 7))                          # Multiplication: 42
$((20 / 4))                         # Division: 5
$((20 % 3))                         # Modulo: 2
$((2 ** 3))                         # Exponentiation: 8

# Assignment operators
((num += 5))                        # Add and assign
((num -= 3))                        # Subtract and assign
((num *= 2))                        # Multiply and assign
((num /= 4))                        # Divide and assign
((num %= 3))                        # Modulo and assign

# Increment/Decrement
((num++))                           # Post-increment
((++num))                           # Pre-increment
((num--))                           # Post-decrement
((--num))                           # Pre-decrement
```

### Comparison Operators (Numbers)

Use with `[[ ]]` or `[ ]`:

```bash
# Numeric comparisons
[[ 5 -eq 5 ]]                       # Equal
[[ 5 -ne 3 ]]                       # Not equal
[[ 5 -gt 3 ]]                       # Greater than
[[ 5 -ge 5 ]]                       # Greater than or equal
[[ 3 -lt 5 ]]                       # Less than
[[ 3 -le 5 ]]                       # Less than or equal
```

### Comparison Operators (Strings)

```bash
# String comparisons
[[ "abc" = "abc" ]]                 # Equal (single =)
[[ "abc" == "abc" ]]                # Equal (double ==, same as =)
[[ "abc" != "xyz" ]]                # Not equal
[[ "abc" < "xyz" ]]                 # Lexicographic less than
[[ "xyz" > "abc" ]]                 # Lexicographic greater than
[[ -z "$var" ]]                     # Empty string (zero length)
[[ -n "$var" ]]                     # Non-empty string
```

### Logical Operators

```bash
# AND
[[ condition1 && condition2 ]]
[[ 5 -gt 3 && 10 -lt 20 ]]         # Both must be true

# OR
[[ condition1 || condition2 ]]
[[ 5 -lt 3 || 10 -lt 20 ]]         # At least one must be true

# NOT
[[ ! condition ]]
[[ ! 5 -lt 3 ]]                     # Negation
```

### File Test Operators

```bash
[[ -e file ]]                       # File exists
[[ -f file ]]                       # Regular file exists
[[ -d directory ]]                  # Directory exists
[[ -r file ]]                       # Readable
[[ -w file ]]                       # Writable
[[ -x file ]]                       # Executable
[[ -s file ]]                       # File exists and not empty
[[ file1 -nt file2 ]]               # file1 newer than file2
[[ file1 -ot file2 ]]               # file1 older than file2
```

---

## If...Else

### Basic If Statement

```bash
if [ condition ]; then
    # commands
fi

# Example
age=20
if [ $age -ge 18 ]; then
    echo "Adult"
fi
```

### If-Else

```bash
if [ condition ]; then
    # commands if true
else
    # commands if false
fi

# Example
age=15
if [ $age -ge 18 ]; then
    echo "Adult"
else
    echo "Minor"
fi
```

### If-Elif-Else

```bash
if [ condition1 ]; then
    # commands if condition1 true
elif [ condition2 ]; then
    # commands if condition2 true
else
    # commands if all false
fi

# Example
score=75
if [ $score -ge 90 ]; then
    echo "A"
elif [ $score -ge 80 ]; then
    echo "B"
elif [ $score -ge 70 ]; then
    echo "C"
else
    echo "F"
fi
```

### Modern Test Syntax

```bash
# Prefer [[ ]] over [ ]
# [[ ]] is more powerful and safer

# Old style [ ]
if [ "$name" = "John" ]; then
    echo "Hello John"
fi

# New style [[ ]] (recommended)
if [[ $name == "John" ]]; then
    echo "Hello John"
fi

# Benefits of [[ ]]
# - No word splitting
# - Pattern matching
# - Regex support
# - && and || operators work
```

### Multiple Conditions

```bash
# AND
if [[ $age -ge 18 && $age -le 65 ]]; then
    echo "Working age"
fi

# OR
if [[ $day == "Saturday" || $day == "Sunday" ]]; then
    echo "Weekend"
fi

# Combined
if [[ ($age -ge 18 && $age -le 30) || $status == "student" ]]; then
    echo "Eligible for discount"
fi
```

### Pattern Matching

```bash
# Pattern matching with ==
if [[ $filename == *.txt ]]; then
    echo "Text file"
fi

# Regex matching with =~
if [[ $email =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
    echo "Valid email"
fi
```

### Case Statement

Better for multiple conditions:

```bash
case $variable in
    pattern1)
        # commands
        ;;
    pattern2)
        # commands
        ;;
    *)
        # default commands
        ;;
esac

# Example
read -p "Enter fruit: " fruit
case $fruit in
    apple|Apple)
        echo "Red or green"
        ;;
    banana|Banana)
        echo "Yellow"
        ;;
    orange|Orange)
        echo "Orange colored"
        ;;
    *)
        echo "Unknown fruit"
        ;;
esac
```

### One-Line If

```bash
# Simple one-liner
[ $age -ge 18 ] && echo "Adult" || echo "Minor"

# Command if condition true
[ -f file.txt ] && cat file.txt

# Command if condition false
[ ! -f file.txt ] || echo "File exists"
```

---

## Loops

### For Loop

```bash
# Iterate over list
for item in apple banana orange; do
    echo $item
done

# Iterate over array
fruits=("apple" "banana" "orange")
for fruit in "${fruits[@]}"; do
    echo $fruit
done

# Range (C-style)
for ((i=1; i<=5; i++)); do
    echo "Number: $i"
done

# Range (sequence)
for i in {1..5}; do
    echo "Number: $i"
done

# Range with step
for i in {0..10..2}; do
    echo "Even: $i"
done

# Iterate over files
for file in *.txt; do
    echo "Processing: $file"
done

# Iterate over command output
for user in $(cat users.txt); do
    echo "User: $user"
done
```

### While Loop

```bash
# Basic while
counter=1
while [ $counter -le 5 ]; do
    echo "Count: $counter"
    ((counter++))
done

# Read file line by line
while read line; do
    echo "Line: $line"
done < file.txt

# Infinite loop
while true; do
    echo "Running..."
    sleep 1
done

# While with condition
while [[ $response != "quit" ]]; do
    read -p "Enter command (quit to exit): " response
    echo "You entered: $response"
done
```

### Until Loop

Opposite of while (runs until condition becomes true):

```bash
counter=1
until [ $counter -gt 5 ]; do
    echo "Count: $counter"
    ((counter++))
done
```

### Loop Control

```bash
# Break - exit loop
for i in {1..10}; do
    if [ $i -eq 5 ]; then
        break
    fi
    echo $i
done
# Prints: 1 2 3 4

# Continue - skip to next iteration
for i in {1..10}; do
    if [ $i -eq 5 ]; then
        continue
    fi
    echo $i
done
# Prints: 1 2 3 4 6 7 8 9 10
```

### Nested Loops

```bash
for i in {1..3}; do
    for j in {1..3}; do
        echo "i=$i, j=$j"
    done
done
```

---

## Functions

### Basic Function

```bash
# Method 1
function greet() {
    echo "Hello, World!"
}

# Method 2 (preferred)
greet() {
    echo "Hello, World!"
}

# Call function
greet
```

### Function with Arguments

```bash
greet() {
    local name=$1
    local age=$2
    echo "Hello, $name! You are $age years old."
}

# Call with arguments
greet "Alice" 25
# Output: Hello, Alice! You are 25 years old.
```

### Function Arguments

```bash
my_function() {
    echo "Function name: $0"
    echo "First argument: $1"
    echo "Second argument: $2"
    echo "All arguments: $@"
    echo "Number of arguments: $#"
}

my_function arg1 arg2 arg3
```

### Return Values

```bash
# Return exit status (0-255)
is_valid() {
    local num=$1
    if [ $num -gt 0 ]; then
        return 0                    # Success
    else
        return 1                    # Failure
    fi
}

# Check return value
if is_valid 5; then
    echo "Valid"
else
    echo "Invalid"
fi

# Capture return code
is_valid 5
result=$?
echo "Result: $result"
```

### Return Strings (using echo)

```bash
get_greeting() {
    local name=$1
    echo "Hello, $name!"
}

# Capture output
message=$(get_greeting "Alice")
echo $message
```

### Local Variables

```bash
global_var="I'm global"

test_function() {
    local local_var="I'm local"
    global_var="Modified global"
    
    echo $local_var
    echo $global_var
}

test_function
echo $global_var                    # Modified global
echo $local_var                     # Empty (not defined here)
```

### Function Examples

```bash
# Check if file exists
file_exists() {
    local file=$1
    if [[ -f $file ]]; then
        echo "File exists: $file"
        return 0
    else
        echo "File not found: $file"
        return 1
    fi
}

# Calculate sum
sum() {
    local result=$(($1 + $2))
    echo $result
}

result=$(sum 10 20)
echo "Sum: $result"                 # 30

# Process files
process_files() {
    local pattern=$1
    for file in $pattern; do
        echo "Processing: $file"
        # Do something with file
    done
}

process_files "*.txt"
```

---

## Arrays

### Create Arrays

```bash
# Method 1: Direct assignment
fruits=("apple" "banana" "orange")

# Method 2: Index assignment
fruits[0]="apple"
fruits[1]="banana"
fruits[2]="orange"

# Method 3: Declare
declare -a fruits
fruits=("apple" "banana" "orange")

# Empty array
empty_array=()
```

### Access Elements

```bash
fruits=("apple" "banana" "orange")

# Access single element
echo ${fruits[0]}                   # apple
echo ${fruits[1]}                   # banana

# All elements
echo ${fruits[@]}                   # apple banana orange
echo ${fruits[*]}                   # apple banana orange

# Number of elements
echo ${#fruits[@]}                  # 3

# Indices
echo ${!fruits[@]}                  # 0 1 2
```

### Iterate Arrays

```bash
fruits=("apple" "banana" "orange")

# Method 1
for fruit in "${fruits[@]}"; do
    echo $fruit
done

# Method 2: With indices
for i in "${!fruits[@]}"; do
    echo "Index $i: ${fruits[$i]}"
done

# Method 3: C-style
for ((i=0; i<${#fruits[@]}; i++)); do
    echo ${fruits[$i]}
done
```

### Modify Arrays

```bash
fruits=("apple" "banana" "orange")

# Add element
fruits+=("grape")
echo ${fruits[@]}                   # apple banana orange grape

# Change element
fruits[1]="blueberry"
echo ${fruits[@]}                   # apple blueberry orange grape

# Remove element (unset)
unset fruits[1]
echo ${fruits[@]}                   # apple orange grape
echo ${#fruits[@]}                  # 3 (but index 1 is now empty)

# Remove last element
unset fruits[-1]
```

### Array Slicing

```bash
numbers=(1 2 3 4 5 6 7 8 9 10)

# Get slice
echo ${numbers[@]:2:3}              # 3 4 5 (from index 2, 3 elements)
echo ${numbers[@]:5}                # 6 7 8 9 10 (from index 5 to end)

# Copy array
copy=("${numbers[@]}")
```

### Associative Arrays (Key-Value)

Bash 4+ only:

```bash
# Declare associative array
declare -A person

# Assign values
person[name]="Alice"
person[age]=25
person[city]="New York"

# Access values
echo ${person[name]}                # Alice
echo ${person[age]}                 # 25

# All keys
echo ${!person[@]}                  # name age city

# All values
echo ${person[@]}                   # Alice 25 New York

# Iterate
for key in "${!person[@]}"; do
    echo "$key: ${person[$key]}"
done
```

### Array Examples

```bash
# Read file into array
mapfile -t lines < file.txt
# or
IFS=$'\n' read -d '' -r -a lines < file.txt

# Split string into array
IFS=',' read -ra parts <<< "apple,banana,orange"
echo ${parts[0]}                    # apple

# Join array into string
fruits=("apple" "banana" "orange")
joined=$(IFS=,; echo "${fruits[*]}")
echo $joined                        # apple,banana,orange

# Check if element exists
fruits=("apple" "banana" "orange")
if [[ " ${fruits[@]} " =~ " banana " ]]; then
    echo "Found banana"
fi

# Remove duplicates
array=(1 2 3 2 4 3 5)
unique=($(echo "${array[@]}" | tr ' ' '\n' | sort -u))
echo ${unique[@]}                   # 1 2 3 4 5
```

---

## Cron Jobs

Automate script execution at scheduled times.

### Cron Syntax

```
* * * * * command
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, 0 and 7 are Sunday)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

### Cron Examples

```bash
# Every minute
* * * * * /path/to/script.sh

# Every 5 minutes
*/5 * * * * /path/to/script.sh

# Every hour at minute 30
30 * * * * /path/to/script.sh

# Every day at 2:30 AM
30 2 * * * /path/to/script.sh

# Every Sunday at midnight
0 0 * * 0 /path/to/script.sh

# First day of every month at midnight
0 0 1 * * /path/to/script.sh

# Weekdays at 9 AM
0 9 * * 1-5 /path/to/script.sh

# Every 15 minutes between 9 AM and 5 PM
*/15 9-17 * * * /path/to/script.sh
```

### Manage Crontab

```bash
# View current crontab
crontab -l

# Edit crontab
crontab -e

# Remove all cron jobs
crontab -r

# Load crontab from file
crontab myfile.cron
```

### Cron Special Strings

```bash
@reboot        # Run at startup
@yearly        # Run once a year (0 0 1 1 *)
@annually      # Same as @yearly
@monthly       # Run once a month (0 0 1 * *)
@weekly        # Run once a week (0 0 * * 0)
@daily         # Run once a day (0 0 * * *)
@midnight      # Same as @daily
@hourly        # Run once an hour (0 * * * *)
```

Example:
```bash
@daily /path/to/backup.sh
@reboot /path/to/startup.sh
```

### Cron Environment

```bash
# Set variables in crontab
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin
HOME=/home/user

# Use full paths
0 2 * * * /usr/bin/python3 /home/user/script.py

# Redirect output
0 2 * * * /path/to/script.sh > /dev/null 2>&1

# Log output
0 2 * * * /path/to/script.sh >> /var/log/script.log 2>&1
```

### Cron Script Best Practices

```bash
#!/bin/bash

# Use absolute paths
LOG_FILE="/var/log/myscript.log"
DATA_DIR="/home/user/data"

# Set PATH
export PATH="/usr/local/bin:/usr/bin:/bin"

# Redirect output
exec >> "$LOG_FILE" 2>&1

# Timestamp
echo "Script started at $(date)"

# Your script logic
cd "$DATA_DIR" || exit 1
# Do work...

# Completion
echo "Script completed at $(date)"
```

### Example Crontab

```bash
# Backup database every night at 2 AM
0 2 * * * /home/user/scripts/backup.sh >> /var/log/backup.log 2>&1

# Clean temp files every Sunday at midnight
0 0 * * 0 /home/user/scripts/cleanup.sh

# Monitor server every 5 minutes
*/5 * * * * /home/user/scripts/monitor.sh

# Send report first day of month
0 9 1 * * /home/user/scripts/report.sh

# Restart service at 3 AM daily
0 3 * * * systemctl restart myservice
```

---

## Quick Reference

```bash
# Script basics
#!/bin/bash                         # Shebang
chmod +x script.sh                  # Make executable
./script.sh                         # Run script

# Variables
name="value"                        # Assign
echo $name                          # Use
echo "${name}"                      # Use (safer)

# Operators
$((5 + 3))                          # Arithmetic
[[ $a -eq $b ]]                     # Numeric comparison
[[ $a == $b ]]                      # String comparison
[[ -f file ]]                       # File test

# If statement
if [[ condition ]]; then
    # commands
fi

# Loops
for i in {1..5}; do
    echo $i
done

while [[ condition ]]; do
    # commands
done

# Functions
function_name() {
    local var=$1
    echo "Result"
}

# Arrays
arr=("a" "b" "c")
echo ${arr[0]}
echo ${arr[@]}

# Cron
crontab -e                          # Edit crontab
0 2 * * * /path/script.sh          # Daily at 2 AM
```

---

## Complete Script Example

```bash
#!/bin/bash
set -euo pipefail

# Script: system_report.sh
# Description: Generate system report
# Author: Your Name

# Variables
REPORT_DIR="/var/reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="${REPORT_DIR}/report_${TIMESTAMP}.txt"

# Function: Print header
print_header() {
    local title=$1
    echo "================================"
    echo "$title"
    echo "================================"
}

# Function: Check disk space
check_disk() {
    print_header "Disk Usage"
    df -h / /home | awk 'NR==1 || $5+0 > 80 {print}'
}

# Function: Check memory
check_memory() {
    print_header "Memory Usage"
    free -h
}

# Function: List top processes
check_processes() {
    print_header "Top 5 Processes by CPU"
    ps aux --sort=-%cpu | head -6
}

# Main
main() {
    # Create report directory
    mkdir -p "$REPORT_DIR"
    
    # Generate report
    {
        echo "System Report - $(date)"
        echo ""
        check_disk
        echo ""
        check_memory
        echo ""
        check_processes
    } > "$REPORT_FILE"
    
    echo "Report generated: $REPORT_FILE"
    
    # Email if needed
    # mail -s "System Report" admin@example.com < "$REPORT_FILE"
}

# Run main function
main "$@"
```

---

## Next Steps

- **b01_basic_commands.md** - Basic Unix commands
- **b02_text_processing.md** - Process script output
- **b03_system_monitoring.md** - System info in scripts
- **b04_networking.md** - Network operations in scripts
- **b05_file_compression.md** - Automate backups
- **b06_file_permissions.md** - Script security
