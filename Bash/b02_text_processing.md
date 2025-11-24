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

Search for patterns in text files.

### Basic Usage

```bash
grep "pattern" file.txt              # Search for pattern
grep "error" logfile.log             # Find lines with "error"
grep -i "ERROR" file.txt             # Case-insensitive search
grep -r "pattern" directory/         # Recursive search in directory
```

### Common Options

```bash
grep -n "pattern" file.txt           # Show line numbers
grep -v "pattern" file.txt           # Invert match (show non-matching lines)
grep -c "pattern" file.txt           # Count matching lines
grep -l "pattern" *.txt              # List files with matches
grep -w "word" file.txt              # Match whole words only
grep -A 3 "pattern" file.txt         # Show 3 lines after match
grep -B 3 "pattern" file.txt         # Show 3 lines before match
grep -C 3 "pattern" file.txt         # Show 3 lines before and after
```

### Regular Expressions

```bash
grep "^Error" file.txt               # Lines starting with "Error"
grep "Error$" file.txt               # Lines ending with "Error"
grep "^$" file.txt                   # Empty lines
grep "[0-9]" file.txt                # Lines with numbers
grep "error\|warning" file.txt       # Multiple patterns (error OR warning)
```

### Practical Examples

```bash
# Find IP addresses in logs
grep -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" access.log

# Search multiple files
grep "error" *.log

# Find files containing pattern
grep -rl "TODO" .

# Highlight matches
grep --color=auto "pattern" file.txt

# Count errors in log
grep -c "ERROR" application.log
```

---

## awk - Pattern Scanning

Process and analyze text files by columns.

### Basic Usage

```bash
awk '{print}' file.txt               # Print all lines
awk '{print $1}' file.txt            # Print first column
awk '{print $1, $3}' file.txt        # Print columns 1 and 3
awk '{print $NF}' file.txt           # Print last column
```

### Common Patterns

```bash
# Print specific column
awk '{print $2}' file.txt

# Custom delimiter
awk -F':' '{print $1}' /etc/passwd   # Use : as delimiter

# Multiple columns
awk '{print $1, $3, $5}' file.txt

# With calculations
awk '{print $1, $2, $1+$2}' numbers.txt

# Conditional printing
awk '$3 > 100' data.txt              # Print lines where column 3 > 100
```

### Advanced Features

```bash
# BEGIN and END blocks
awk 'BEGIN {print "Start"} {print $1} END {print "Done"}' file.txt

# Count lines
awk 'END {print NR}' file.txt

# Sum column
awk '{sum += $1} END {print sum}' numbers.txt

# Average
awk '{sum += $1} END {print sum/NR}' numbers.txt

# Pattern matching
awk '/error/ {print $0}' logfile.log

# Multiple conditions
awk '$1 == "ERROR" && $3 > 100' log.txt
```

### Practical Examples

```bash
# Extract usernames from /etc/passwd
awk -F':' '{print $1}' /etc/passwd

# Print lines 5-10
awk 'NR>=5 && NR<=10' file.txt

# Calculate total disk usage
df -h | awk '{sum += $3} END {print sum}'

# Format output
awk '{printf "Name: %-10s Age: %d\n", $1, $2}' data.txt

# Process CSV
awk -F',' '{print $1, $3}' data.csv
```

---

## sed - Stream Editor

Edit text in a stream (find and replace, delete lines, etc.).

### Basic Find and Replace

```bash
sed 's/old/new/' file.txt            # Replace first occurrence per line
sed 's/old/new/g' file.txt           # Replace all occurrences (global)
sed 's/old/new/gi' file.txt          # Case-insensitive replacement
sed -i 's/old/new/g' file.txt        # Edit file in-place
sed -i.bak 's/old/new/g' file.txt    # Edit with backup
```

### Deleting Lines

```bash
sed '/pattern/d' file.txt            # Delete lines matching pattern
sed '5d' file.txt                    # Delete line 5
sed '5,10d' file.txt                 # Delete lines 5-10
sed '/^$/d' file.txt                 # Delete empty lines
sed '/^#/d' file.txt                 # Delete comment lines
```

### Printing Lines

```bash
sed -n '5p' file.txt                 # Print only line 5
sed -n '5,10p' file.txt              # Print lines 5-10
sed -n '/pattern/p' file.txt         # Print matching lines
```

### Advanced Usage

```bash
# Multiple substitutions
sed -e 's/old1/new1/g' -e 's/old2/new2/g' file.txt

# Using different delimiter
sed 's|/path/old|/path/new|g' file.txt

# Add text before line
sed '/pattern/i\New line before' file.txt

# Add text after line
sed '/pattern/a\New line after' file.txt

# Replace line entirely
sed '/pattern/c\Replacement line' file.txt
```

### Practical Examples

```bash
# Remove comments and empty lines
sed '/^#/d; /^$/d' config.txt

# Replace IP address
sed -i 's/192\.168\.1\.1/192.168.1.100/g' config.txt

# Add line numbers
sed = file.txt | sed 'N;s/\n/\t/'

# Extract lines between patterns
sed -n '/START/,/END/p' file.txt

# Remove trailing whitespace
sed 's/[[:space:]]*$//' file.txt
```

---

## cut - Remove Sections

Extract columns from text.

### Basic Usage

```bash
cut -d':' -f1 /etc/passwd            # Extract first field (delimiter :)
cut -d',' -f1,3 data.csv             # Extract fields 1 and 3 (CSV)
cut -c1-10 file.txt                  # Extract characters 1-10
cut -f2,4 file.txt                   # Extract fields 2 and 4 (tab-delimited)
```

### Common Options

```bash
-d    # Delimiter (default is tab)
-f    # Fields to extract
-c    # Characters to extract
--complement    # Invert selection
```

### Practical Examples

```bash
# Extract usernames
cut -d':' -f1 /etc/passwd

# Extract date from log
cut -d' ' -f1-3 access.log

# Get IP addresses (column 1)
cut -d' ' -f1 access.log | sort | uniq

# Extract email domain
echo "user@example.com" | cut -d'@' -f2

# Extract filename without extension
echo "document.txt" | cut -d'.' -f1
```

---

## sort - Sort Lines

Sort text lines.

### Basic Usage

```bash
sort file.txt                        # Sort alphabetically
sort -r file.txt                     # Reverse sort
sort -n file.txt                     # Numeric sort
sort -u file.txt                     # Sort and remove duplicates
```

### Common Options

```bash
sort -n numbers.txt                  # Numeric sort
sort -h sizes.txt                    # Human-readable numbers (1K, 2M, 3G)
sort -r file.txt                     # Reverse order
sort -k2 file.txt                    # Sort by column 2
sort -t',' -k3 data.csv              # Sort CSV by column 3
sort -u file.txt                     # Unique (remove duplicates)
```

### Practical Examples

```bash
# Sort by second column
sort -k2 data.txt

# Sort numbers
sort -n numbers.txt

# Sort by file size
ls -l | sort -k5 -n

# Sort IPs
sort -t. -k1,1n -k2,2n -k3,3n -k4,4n ips.txt

# Case-insensitive sort
sort -f file.txt

# Sort and save
sort file.txt -o sorted.txt
```

---

## tail - View End

Display the end of files.

### Basic Usage

```bash
tail file.txt                        # Show last 10 lines
tail -n 20 file.txt                  # Show last 20 lines
tail -n +5 file.txt                  # Show from line 5 to end
tail -f logfile.log                  # Follow file (watch for new lines)
```

### Common Options

```bash
tail -n 5 file.txt                   # Last 5 lines
tail -n +10 file.txt                 # From line 10 onwards
tail -f file.txt                     # Follow mode (real-time)
tail -F file.txt                     # Follow with retry (if file rotates)
tail -c 100 file.txt                 # Last 100 bytes
```

### Practical Examples

```bash
# Watch log file in real-time
tail -f /var/log/syslog

# Last 50 lines of multiple files
tail -n 50 *.log

# Follow multiple files
tail -f file1.log file2.log

# Skip first 10 lines
tail -n +11 file.txt

# Combine with grep
tail -f access.log | grep "ERROR"
```

---

## head - View Start

Display the beginning of files.

### Basic Usage

```bash
head file.txt                        # Show first 10 lines
head -n 20 file.txt                  # Show first 20 lines
head -n -5 file.txt                  # All except last 5 lines
head -c 100 file.txt                 # First 100 bytes
```

### Common Options

```bash
head -n 5 file.txt                   # First 5 lines
head -n -10 file.txt                 # All except last 10 lines
head -c 100 file.txt                 # First 100 characters
head -q file1.txt file2.txt          # Quiet (no file headers)
```

### Practical Examples

```bash
# Preview file
head config.txt

# First 3 lines of multiple files
head -n 3 *.txt

# See CSV headers
head -n 1 data.csv

# Quick look at large file
head -n 50 bigfile.txt

# Combine with tail for middle section
head -n 20 file.txt | tail -n 5     # Lines 16-20
```

---

## Combining Tools

### Pipes and Redirection

```bash
# Count unique IPs in access log
cut -d' ' -f1 access.log | sort | uniq | wc -l

# Top 10 most common errors
grep "ERROR" app.log | cut -d' ' -f3 | sort | uniq -c | sort -rn | head -10

# Extract and sort usernames
cut -d':' -f1 /etc/passwd | sort

# Find large files and sort by size
find . -type f -exec du -h {} \; | sort -h | tail -20
```

### Text Processing Pipeline Examples

```bash
# Analyze web server access log
# Get top 10 IPs by request count
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Extract emails from file
grep -E "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" file.txt

# Process CSV: extract column, remove duplicates, count
cut -d',' -f2 data.csv | sort | uniq -c

# Get lines 50-60 from file
head -60 file.txt | tail -11

# Monitor specific errors in real-time
tail -f app.log | grep --line-buffered "ERROR" | while read line; do
    echo "[$(date)] $line"
done
```

### Practical Scripts

```bash
#!/bin/bash
# Log analyzer

log_file="access.log"

echo "=== Top 10 IP Addresses ==="
awk '{print $1}' "$log_file" | sort | uniq -c | sort -rn | head -10

echo ""
echo "=== Top 10 Requested URLs ==="
awk '{print $7}' "$log_file" | sort | uniq -c | sort -rn | head -10

echo ""
echo "=== HTTP Status Codes ==="
awk '{print $9}' "$log_file" | sort | uniq -c | sort -rn

echo ""
echo "=== Total Requests ==="
wc -l < "$log_file"
```

---

## Quick Reference

```bash
# Search
grep "pattern" file             # Find pattern
grep -r "pattern" dir/          # Recursive search
grep -i "pattern" file          # Case-insensitive

# Process columns
awk '{print $1}' file           # Print column 1
awk -F':' '{print $1}' file     # Custom delimiter
cut -d':' -f1 file              # Extract field 1

# Edit text
sed 's/old/new/g' file          # Replace text
sed '/pattern/d' file           # Delete matching lines
sed -n '5,10p' file             # Print lines 5-10

# Sort and organize
sort file                       # Sort lines
sort -n file                    # Numeric sort
sort -u file                    # Unique sort
uniq file                       # Remove adjacent duplicates

# View parts
head -n 10 file                 # First 10 lines
tail -n 10 file                 # Last 10 lines
tail -f file                    # Follow file (real-time)

# Combine
command1 | command2             # Pipe output
grep "error" file | wc -l       # Count matches
```

---

## Next Steps

- **b01_basic_commands.md** - Basic file operations
- **b07_scripting.md** - Use these tools in scripts
- **b03_system_monitoring.md** - Analyze system logs
