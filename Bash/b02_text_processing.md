# Bash Text Processing

## Table of Contents
1. [grep - Search Text](#grep-search-text)
2. [awk - Pattern Scanning](#awk-pattern-scanning)
3. [sed - Stream Editor](#sed-stream-editor)
4. [cut - Remove Sections](#cut-remove-sections)
5. [sort - Sort Lines](#sort-sort-lines)
6. [tail - View End](#tail-view-end)
7. [head - View Start](#head-view-start)

---

## grep - Search Text

Search for patterns in text files. "grep" stands for "Global Regular Expression Print" - it globally searches files using regular expressions and prints matching lines.

### Basic Usage

```bash
grep "pattern" file.txt              # Search for pattern (text string) in file
grep "error" logfile.log             # Find all lines containing the word "error"
grep -i "ERROR" file.txt             # -i = "ignore case" - matches error, ERROR, Error, etc.
grep -r "pattern" directory/         # -r = "recursive" - search all files in directory and subdirectories
```

### Common Options

```bash
grep -n "pattern" file.txt           # -n = "number" - show line numbers with matches
grep -v "pattern" file.txt           # -v = "invert" - show lines that DON'T match (opposite)
grep -c "pattern" file.txt           # -c = "count" - just show count of matching lines, not the lines themselves
grep -l "pattern" *.txt              # -l = "list" - show only filenames that contain matches
grep -w "word" file.txt              # -w = "word" - match whole words only (not partial matches)
grep -A 3 "pattern" file.txt         # -A = "after" - show 3 lines of context after each match
grep -B 3 "pattern" file.txt         # -B = "before" - show 3 lines of context before each match
grep -C 3 "pattern" file.txt         # -C = "context" - show 3 lines before and after (combines -A and -B)
```

### Regular Expressions

```bash
grep "^Error" file.txt               # ^ means "start of line" - finds lines starting with "Error"
grep "Error$" file.txt               # $ means "end of line" - finds lines ending with "Error"
grep "^$" file.txt                   # ^$ matches empty lines (start immediately followed by end)
grep "[0-9]" file.txt                # [0-9] is a character class - matches any single digit 0-9
grep "error\|warning" file.txt       # \| means OR - matches lines with either "error" or "warning"
```

### Practical Examples

```bash
# Find IP addresses in logs
# -E = "extended regex" - enables advanced regex features like {}
# {1,3} means "1 to 3 occurrences" - matches numbers from 0 to 999
grep -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" access.log

# Search multiple files using wildcard
# *.log matches all files ending in .log
grep "error" *.log

# Find files containing pattern
# -r = recursive, -l = list filenames only
# . means current directory
grep -rl "TODO" .

# Highlight matches in color for easier reading
# --color=auto adds color highlighting to matched text
grep --color=auto "pattern" file.txt

# Count how many lines contain ERROR
grep -c "ERROR" application.log
```

---

## awk - Pattern Scanning

Process and analyze text files by columns. "awk" is named after its creators: Aho, Weinberger, and Kernighan. It excels at working with structured data where information is organized in columns.

### Basic Usage

```bash
awk '{print}' file.txt               # Print all lines (same as cat)
awk '{print $1}' file.txt            # $1 = first column (fields separated by whitespace)
awk '{print $1, $3}' file.txt        # Print columns 1 and 3 (comma adds space between them)
awk '{print $NF}' file.txt           # $NF = "Number of Fields" - prints last column
```

### Common Patterns

```bash
# Print specific column
awk '{print $2}' file.txt            # $2 refers to second column

# Custom delimiter (field separator)
# -F = "Field separator" - defines what separates columns
awk -F':' '{print $1}' /etc/passwd   # Use : as delimiter (for colon-separated files)

# Multiple columns
awk '{print $1, $3, $5}' file.txt    # Extract columns 1, 3, and 5

# With calculations (awk can do math!)
awk '{print $1, $2, $1+$2}' numbers.txt   # Print col1, col2, and their sum

# Conditional printing (only print if condition is true)
awk '$3 > 100' data.txt              # Print entire line only if column 3 value > 100
```

### Advanced Features

```bash
# BEGIN and END blocks
# BEGIN runs once before processing, END runs once after all lines
awk 'BEGIN {print "Start"} {print $1} END {print "Done"}' file.txt

# Count lines
# NR = "Number of Records" (current line number)
awk 'END {print NR}' file.txt

# Sum a column
# += adds to variable (sum starts at 0), END block prints total
awk '{sum += $1} END {print sum}' numbers.txt

# Calculate average
# Divide total sum by number of records (lines)
awk '{sum += $1} END {print sum/NR}' numbers.txt

# Pattern matching with regex
# /error/ is a regex pattern, $0 = entire line
awk '/error/ {print $0}' logfile.log

# Multiple conditions
# == checks equality, && means AND (both conditions must be true)
awk '$1 == "ERROR" && $3 > 100' log.txt
```

### Practical Examples

```bash
# Extract usernames from /etc/passwd file
# /etc/passwd uses : as delimiter, usernames are in first column
awk -F':' '{print $1}' /etc/passwd

# Print only lines 5 through 10
# NR = current line number, check if it's between 5 and 10
awk 'NR>=5 && NR<=10' file.txt

# Calculate total disk usage (sum of used space)
# df -h shows disk usage, awk adds up column 3 (used space)
df -h | awk '{sum += $3} END {print sum}'

# Format output with printf (like C's printf)
# %-10s = left-aligned string with 10-character width, %d = integer
# \n = newline
awk '{printf "Name: %-10s Age: %d\n", $1, $2}' data.txt
```

### Working with CSV Files

CSV (Comma-Separated Values) files are a common data format where each column is separated by commas instead of spaces. Example CSV structure:

```
name,age,city,salary
John,30,NYC,75000
Jane,25,LA,82000
Bob,35,Chicago,68000
```

#### Basic CSV Processing

```bash
# Set comma as field separator to parse CSV files
# -F',' tells awk that commas separate columns, not spaces
awk -F',' '{print $1}' employees.csv       # Print first column (names)

# Print multiple columns from CSV
awk -F',' '{print $1, $4}' employees.csv   # Print name and salary

# Skip header row (first line) in CSV
# NR = line number, > 1 means "skip line 1"
awk -F',' 'NR > 1 {print $1, $4}' employees.csv

# Print all columns with better formatting
# OFS = "Output Field Separator" - what to put between columns when printing
awk -F',' '{print $1, $2, $3}' employees.csv           # Default: space-separated
awk -F',' 'BEGIN {OFS=","} {print $1, $2, $3}' employees.csv  # Keep as CSV
awk -F',' 'BEGIN {OFS="\t"} {print $1, $2, $3}' employees.csv # Tab-separated
```

#### CSV Filtering and Analysis

```bash
# Filter rows by column value
# $2 is age column, print only employees over 28
awk -F',' '$2 > 28' employees.csv

# Filter with multiple conditions
# Print employees over 28 who earn more than 70000
awk -F',' '$2 > 28 && $4 > 70000' employees.csv

# Calculate sum of a column (total salaries)
# Skip header with NR>1, sum column 4 (salary)
awk -F',' 'NR > 1 {sum += $4} END {print "Total:", sum}' employees.csv

# Calculate average of a column
# NR-1 because we skip the header line
awk -F',' 'NR > 1 {sum += $4} END {print "Average:", sum/(NR-1)}' employees.csv

# Count rows by category (group by city)
# city[$3] creates an associative array, ++ increments the count
# END loop prints all cities and their counts
awk -F',' 'NR > 1 {city[$3]++} END {for (c in city) print c, city[c]}' employees.csv

# Find maximum value in a column
# NR==2 initializes max with first data row (after header)
# $4 > max updates if current value is larger
awk -F',' 'NR==2 {max=$4} NR>2 && $4>max {max=$4} END {print "Max salary:", max}' employees.csv

# Find minimum value in a column
awk -F',' 'NR==2 {min=$4} NR>2 && $4<min {min=$4} END {print "Min salary:", min}' employees.csv
```

#### CSV Transformation

```bash
# Add new calculated column (e.g., salary after 10% raise)
# OFS="," keeps output as CSV format
awk -F',' 'BEGIN {OFS=","} {print $0, $4*1.10}' employees.csv

# Reorder columns (swap columns 1 and 3)
awk -F',' 'BEGIN {OFS=","} {print $3, $2, $1, $4}' employees.csv

# Select specific columns only (like SQL SELECT)
# Extract just name and salary columns
awk -F',' 'BEGIN {OFS=","} {print $1, $4}' employees.csv

# Add a new header to match new columns
awk -F',' 'BEGIN {OFS=","; print "Employee,Income"} NR > 1 {print $1, $4}' employees.csv

# Convert CSV to formatted table
# printf with fixed widths creates aligned columns
awk -F',' '{printf "%-15s %-5s %-10s %-10s\n", $1, $2, $3, $4}' employees.csv
```

#### Handling CSV Edge Cases

```bash
# Handle CSV with quoted fields (e.g., "Smith, John",30,NYC)
# FPAT defines field pattern: quoted strings OR non-comma sequences
awk 'BEGIN {FPAT="([^,]+)|(\"[^\"]+\")"; OFS=","} {print $1, $2}' complex.csv

# Remove quotes from fields
# gsub = "global substitute" - removes all quotes in the line
awk -F',' '{gsub(/"/, ""); print}' employees.csv

# Skip empty lines in CSV
# NF = number of fields, > 0 means line isn't empty
awk -F',' 'NF > 0 {print}' employees.csv

# Convert CSV to JSON-like format
awk -F',' 'NR > 1 {print "{\"name\": \"" $1 "\", \"age\": " $2 ", \"city\": \"" $3 "\", \"salary\": " $4 "}"}' employees.csv
```

#### Practical CSV Examples

```bash
# Generate summary report from sales data
# Assuming columns: product,quantity,price
awk -F',' '
NR > 1 {
    revenue = $2 * $3;              # Calculate revenue per line
    total_revenue += revenue;        # Sum total revenue
    product_count[$1] += $2;         # Count products sold
}
END {
    print "Total Revenue:", total_revenue;
    print "\nProducts Sold:";
    for (p in product_count) {
        print p ":", product_count[p];
    }
}' sales.csv

# Export filtered CSV to new file
awk -F',' 'BEGIN {OFS=","} NR==1 || $4 > 75000' employees.csv > high_earners.csv

# Merge two CSV files by matching ID (simple join)
# Reads file1 into array, then matches with file2
awk -F',' 'NR==FNR {a[$1]=$2; next} $1 in a {print $0, a[$1]}' file1.csv file2.csv
```

---

## sed - Stream Editor

Edit text in a stream (find and replace, delete lines, etc.). "sed" stands for "stream editor" - it processes text line-by-line as a stream, making changes without opening the file in memory. Great for large files and automation.

### Basic Find and Replace

```bash
sed 's/old/new/' file.txt            # s = "substitute" - replaces first occurrence per line only
sed 's/old/new/g' file.txt           # g = "global" - replaces ALL occurrences on each line
sed 's/old/new/gi' file.txt          # i = "ignore case" - case-insensitive replacement
sed -i 's/old/new/g' file.txt        # -i = "in-place" - modifies the file directly (no output to terminal)
sed -i.bak 's/old/new/g' file.txt    # Creates backup file with .bak extension before modifying
```

### Deleting Lines

```bash
sed '/pattern/d' file.txt            # d = "delete" - removes lines containing pattern
sed '5d' file.txt                    # Delete line number 5 specifically
sed '5,10d' file.txt                 # Delete range of lines from 5 to 10 inclusive
sed '/^$/d' file.txt                 # Delete empty lines (^$ matches lines with nothing between start and end)
sed '/^#/d' file.txt                 # Delete comment lines (lines starting with #)
```

### Printing Lines

```bash
sed -n '5p' file.txt                 # -n = "quiet" (don't print all lines), p = "print" - shows only line 5
sed -n '5,10p' file.txt              # Print only lines 5 through 10 (suppresses other lines)
sed -n '/pattern/p' file.txt         # Print only lines matching pattern (like grep)
```

### Advanced Usage

```bash
# Multiple substitutions in one command
# -e = "expression" - allows multiple sed commands
sed -e 's/old1/new1/g' -e 's/old2/new2/g' file.txt

# Using different delimiter (useful when pattern contains /)
# Can use | or any character instead of / to avoid escaping slashes
sed 's|/path/old|/path/new|g' file.txt

# Add text before matching line
# i = "insert" - adds new line before the matched line
sed '/pattern/i\New line before' file.txt

# Add text after matching line
# a = "append" - adds new line after the matched line
sed '/pattern/a\New line after' file.txt

# Replace entire line
# c = "change" - replaces the entire matched line with new text
sed '/pattern/c\Replacement line' file.txt
```

### Practical Examples

```bash
# Remove comments and empty lines (clean up config files)
# Multiple commands separated by ; - first deletes #-comments, second deletes empty lines
sed '/^#/d; /^$/d' config.txt

# Replace IP address in config file
# \. escapes the dot (. is a wildcard in regex, \. is literal dot)
sed -i 's/192\.168\.1\.1/192.168.1.100/g' config.txt

# Add line numbers to file
# = prints line number, N reads next line, s/\n/\t/ replaces newline with tab
sed = file.txt | sed 'N;s/\n/\t/'

# Extract lines between two patterns (inclusive)
# /START/,/END/ is a range from first pattern to second pattern
sed -n '/START/,/END/p' file.txt

# Remove trailing whitespace from end of lines
# [[:space:]] matches any whitespace, * = zero or more, $ = end of line
sed 's/[[:space:]]*$//' file.txt
```

---

## cut - Remove Sections

Extract specific columns or characters from text. "cut" removes (cuts out) sections of each line.

### Basic Usage

```bash
cut -d':' -f1 /etc/passwd            # -d = "delimiter", -f = "field" - extract first field using : as separator
cut -d',' -f1,3 data.csv             # Extract fields 1 and 3 from comma-separated file (CSV)
cut -c1-10 file.txt                  # -c = "characters" - extract characters 1 through 10 from each line
cut -f2,4 file.txt                   # Extract fields 2 and 4 (default delimiter is tab)
```

### Common Options

```bash
-d    # Delimiter - specifies what character separates fields (default is tab)
-f    # Fields - which column numbers to extract (can be ranges like 1-3 or lists like 1,3,5)
-c    # Characters - extract specific character positions instead of fields
--complement    # Invert selection - extract everything EXCEPT specified fields/characters
```

### Practical Examples

```bash
# Extract usernames from system password file
# /etc/passwd uses : delimiter, usernames are in field 1
cut -d':' -f1 /etc/passwd

# Extract date from log (first 3 space-separated fields)
# -f1-3 means fields 1 through 3 (inclusive range)
cut -d' ' -f1-3 access.log

# Get unique IP addresses from access log
# | pipes output through sort then uniq to get unique values
cut -d' ' -f1 access.log | sort | uniq

# Extract email domain (everything after @)
# -f2 gets second field when split by @
echo "user@example.com" | cut -d'@' -f2

# Extract filename without extension
# -f1 gets first field when split by . (dot)
echo "document.txt" | cut -d'.' -f1
```

---

## sort - Sort Lines

Sort text lines in various ways. Arranges lines alphabetically, numerically, or by custom criteria.

### Basic Usage

```bash
sort file.txt                        # Sort alphabetically (A-Z, case-sensitive by default)
sort -r file.txt                     # -r = "reverse" - sort in descending order (Z-A)
sort -n file.txt                     # -n = "numeric" - sort as numbers (2 comes before 10)
sort -u file.txt                     # -u = "unique" - sort AND remove duplicate lines
```

### Common Options

```bash
sort -n numbers.txt                  # -n = "numeric" - proper number sorting (not alphabetic)
sort -h sizes.txt                    # -h = "human-readable" - understands 1K, 2M, 3G suffixes
sort -r file.txt                     # -r = "reverse" - descending order
sort -k2 file.txt                    # -k = "key" - sort by column 2 (default delimiter is whitespace)
sort -t',' -k3 data.csv              # -t = "field separator" - sort CSV by column 3 using comma delimiter
sort -u file.txt                     # -u = "unique" - keep only one copy of duplicate lines
```

### Practical Examples

```bash
# Sort by second column (whitespace-separated)
sort -k2 data.txt

# Sort numbers properly (not alphabetically)
sort -n numbers.txt

# Sort files by size (column 5 in ls -l output)
# -k5 = use column 5, -n = numeric sorting
ls -l | sort -k5 -n

# Sort IP addresses correctly
# -t. = use dot as delimiter, -k1,1n = sort field 1 numerically, etc.
# Ensures 192.168.1.2 comes before 192.168.1.100
sort -t. -k1,1n -k2,2n -k3,3n -k4,4n ips.txt

# Case-insensitive sort
# -f = "fold" (ignore case) - treats A and a as the same
sort -f file.txt

# Sort and save to output file
# -o = "output" - can safely use same filename for input and output
sort file.txt -o sorted.txt
```

---

## tail - View End

Display the end of files. Shows the last few lines, useful for checking recent log entries.

### Basic Usage

```bash
tail file.txt                        # Show last 10 lines (default)
tail -n 20 file.txt                  # -n = "number" - show last 20 lines
tail -n +5 file.txt                  # +5 means "starting from line 5" (shows line 5 to end)
tail -f logfile.log                  # -f = "follow" - continuously watch file and show new lines as added
```

### Common Options

```bash
tail -n 5 file.txt                   # Show last 5 lines
tail -n +10 file.txt                 # Show from line 10 to end (+ means "starting from")
tail -f file.txt                     # -f = "follow" - watch file in real-time (Ctrl+C to exit)
tail -F file.txt                     # -F = "follow with retry" - keeps trying if file is rotated/deleted
tail -c 100 file.txt                 # -c = "bytes" - show last 100 bytes instead of lines
```

### Practical Examples

```bash
# Watch system log file in real-time (great for debugging)
tail -f /var/log/syslog

# Show last 50 lines from all log files
# *.log is a wildcard matching all .log files
tail -n 50 *.log

# Follow multiple files simultaneously
# Shows new lines from both files as they're written
tail -f file1.log file2.log

# Skip first 10 lines (show from line 11 onward)
tail -n +11 file.txt

# Monitor log and filter for errors in real-time
# | pipes tail output to grep for filtering
tail -f access.log | grep "ERROR"
```

---

## head - View Start

Display the beginning of files. Shows the first few lines, useful for previewing file contents.

### Basic Usage

```bash
head file.txt                        # Show first 10 lines (default)
head -n 20 file.txt                  # -n = "number" - show first 20 lines
head -n -5 file.txt                  # Negative number = show all EXCEPT last 5 lines
head -c 100 file.txt                 # -c = "bytes" - show first 100 bytes (characters)
```

### Common Options

```bash
head -n 5 file.txt                   # Show first 5 lines
head -n -10 file.txt                 # Show all lines except the last 10 (negative means "exclude from end")
head -c 100 file.txt                 # Show first 100 bytes/characters
head -q file1.txt file2.txt          # -q = "quiet" - don't print filename headers for multiple files
```

### Practical Examples

```bash
# Preview configuration file (quick look at start)
head config.txt

# Show first 3 lines of all text files
# Useful for checking multiple file headers
head -n 3 *.txt

# See CSV column headers (first row)
head -n 1 data.csv

# Quick preview of large file without opening it all
head -n 50 bigfile.txt

# Combine with tail to extract middle section
# Take first 20 lines, then take last 5 of those = lines 16-20
head -n 20 file.txt | tail -n 5
```

---

## Combining Tools

### Pipes and Redirection

```bash
# Count unique IP addresses in access log
# 1. Extract IPs, 2. Sort them, 3. Remove duplicates, 4. Count lines
# wc -l = "word count lines"
cut -d' ' -f1 access.log | sort | uniq | wc -l

# Find top 10 most common errors
# 1. Find ERROR lines, 2. Extract error type, 3. Sort, 4. Count duplicates,
# 5. Sort by count (descending), 6. Show top 10
# uniq -c = count occurrences, sort -rn = reverse numeric sort
grep "ERROR" app.log | cut -d' ' -f3 | sort | uniq -c | sort -rn | head -10

# Extract and sort usernames alphabetically
cut -d':' -f1 /etc/passwd | sort

# Find 20 largest files and sort by size
# find locates files, du -h shows disk usage, sort -h handles human sizes
find . -type f -exec du -h {} \; | sort -h | tail -20
```

### Text Processing Pipeline Examples

```bash
# Analyze web server access log - find most active IPs
# 1. Extract IP (column 1), 2. Sort, 3. Count duplicates, 4. Sort by count, 5. Top 10
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Extract email addresses using regex
# -E = extended regex, pattern matches standard email format
grep -E "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" file.txt

# Process CSV: extract second column, count occurrences
# Useful for analyzing categorical data
cut -d',' -f2 data.csv | sort | uniq -c

# Get specific line range (50-60) from file
# Take first 60 lines, then take last 11 of those
head -60 file.txt | tail -11

# Monitor log in real-time with timestamps
# --line-buffered prevents output buffering for real-time display
# while read loop processes each line and adds timestamp
tail -f app.log | grep --line-buffered "ERROR" | while read line; do
    echo "[$(date)] $line"    # $(date) adds current timestamp
done
```

### Practical Scripts

```bash
#!/bin/bash
# Log analyzer - comprehensive web server log analysis

log_file="access.log"    # Variable to store filename

echo "=== Top 10 IP Addresses ==="
# $1 in access logs is typically the IP address
awk '{print $1}' "$log_file" | sort | uniq -c | sort -rn | head -10

echo ""    # Empty line for spacing
echo "=== Top 10 Requested URLs ==="
# $7 in access logs is typically the requested URL/path
awk '{print $7}' "$log_file" | sort | uniq -c | sort -rn | head -10

echo ""
echo "=== HTTP Status Codes ==="
# $9 in access logs is typically the HTTP status code (200, 404, 500, etc.)
awk '{print $9}' "$log_file" | sort | uniq -c | sort -rn

echo ""
echo "=== Total Requests ==="
# < redirects file as input, wc -l counts lines
wc -l < "$log_file"
```

---

## Quick Reference

```bash
# Search (grep = Global Regular Expression Print)
grep "pattern" file             # Find lines containing pattern
grep -r "pattern" dir/          # Recursive search through directory
grep -i "pattern" file          # Case-insensitive search (i = ignore case)

# Process columns
awk '{print $1}' file           # awk: Print first column ($1 = field 1)
awk -F':' '{print $1}' file     # Use colon as field separator (F = Field separator)
cut -d':' -f1 file              # cut: Extract field 1 (d = delimiter, f = field)

# Edit text (sed = Stream EDitor)
sed 's/old/new/g' file          # Replace all occurrences (s = substitute, g = global)
sed '/pattern/d' file           # Delete lines matching pattern (d = delete)
sed -n '5,10p' file             # Print only lines 5-10 (n = quiet, p = print)

# Sort and organize
sort file                       # Sort lines alphabetically
sort -n file                    # Numeric sort (n = numeric)
sort -u file                    # Sort and remove duplicates (u = unique)
uniq file                       # Remove adjacent duplicate lines

# View parts of files
head -n 10 file                 # Show first 10 lines
tail -n 10 file                 # Show last 10 lines
tail -f file                    # Follow file updates in real-time (f = follow)

# Combine commands
command1 | command2             # Pipe: send output of command1 to command2
grep "error" file | wc -l       # Count matching lines (wc = word count, l = lines)
```

---

## Next Steps

- **b01_basic_commands.md** - Basic file operations
- **b07_scripting.md** - Use these tools in scripts
- **b03_system_monitoring.md** - Analyze system logs
