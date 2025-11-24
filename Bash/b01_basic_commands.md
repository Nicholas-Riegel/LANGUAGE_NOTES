# Bash Basic Commands

## Table of Contents
1. [ls - List Files](#ls-list-files)
2. [cd - Change Directory](#cd-change-directory)
3. [pwd - Print Working Directory](#pwd-print-working-directory)
4. [echo - Display Text](#echo-display-text)
5. [cat - Concatenate Files](#cat-concatenate-files)
6. [cp - Copy Files](#cp-copy-files)
7. [mv - Move/Rename Files](#mv-moverename-files)
8. [rm - Remove Files](#rm-remove-files)
9. [touch - Create/Update Files](#touch-createupdate-files)
10. [mkdir - Make Directory](#mkdir-make-directory)
11. [man - Manual Pages](#man-manual-pages)
12. [alias - Command Shortcuts](#alias-command-shortcuts)

---

## ls - List Files

List files and directories.

### Basic Usage

```bash
ls                    # List files in current directory
ls -l                 # Long format with details
ls -a                 # Show hidden files (starting with .)
ls -la                # Long format including hidden files
ls -lh                # Human-readable file sizes
```

### Common Options

```bash
ls -lt                # Sort by modification time (newest first)
ls -lS                # Sort by size
ls -lr                # Reverse order
ls -R                 # Recursive (show subdirectories)
ls *.txt              # List only .txt files
ls -d */              # List only directories
```

### Practical Examples

```bash
# List with full paths
ls -d $PWD/*

# Count files
ls | wc -l

# Show newest 5 files
ls -lt | head -6

# List only files (not directories)
ls -p | grep -v /
```

---

## cd - Change Directory

Navigate between directories.

### Basic Usage

```bash
cd /path/to/directory    # Go to specific directory
cd                       # Go to home directory
cd ~                     # Go to home directory
cd ..                    # Go up one level
cd ../..                 # Go up two levels
cd -                     # Go to previous directory
cd /                     # Go to root directory
```

### Practical Examples

```bash
# Change to Downloads
cd ~/Downloads

# Save and return to directory
pushd /tmp              # Save current dir and go to /tmp
# ... do work ...
popd                    # Return to saved directory

# Use in scripts
original_dir=$(pwd)
cd /some/directory
# ... do work ...
cd "$original_dir"
```

---

## pwd - Print Working Directory

Show the current directory path.

```bash
pwd                      # Show current directory

# Use in variables
current_dir=$(pwd)
echo "I am in: $current_dir"

# Useful in scripts
echo "Script running from: $(pwd)"
```

---

## echo - Display Text

Print text to the terminal.

### Basic Usage

```bash
echo "Hello, World!"
echo Hello World         # Quotes optional for simple text
echo                     # Print blank line
```

### Options

```bash
echo -n "No newline"     # Don't add newline at end
echo -e "Line1\nLine2"   # Enable escape sequences
echo -e "Tab\there"      # Use tabs
```

### Practical Examples

```bash
# Print variables
name="Alice"
echo "Hello, $name"

# Multiple lines
echo -e "Line 1\nLine 2\nLine 3"

# Write to file
echo "Some text" > file.txt
echo "More text" >> file.txt    # Append
```

---

## cat - Concatenate Files

Display or combine file contents.

### Basic Usage

```bash
cat file.txt                    # Display file
cat file1.txt file2.txt         # Display multiple files
cat file1.txt file2.txt > combined.txt    # Combine into new file
cat newdata.txt >> existing.txt # Append to file
```

### Options

```bash
cat -n file.txt          # Number all lines
cat -b file.txt          # Number non-empty lines only
cat -A file.txt          # Show all characters (including hidden)
```

### Practical Examples

```bash
# Create file with heredoc
cat > config.txt << EOF
setting1=value1
setting2=value2
EOF

# Display with line numbers
cat -n script.sh

# Combine log files
cat *.log > all_logs.txt

# Quick preview
cat file.txt | head -10
```

---

## cp - Copy Files

Copy files and directories.

### Basic Usage

```bash
cp source.txt destination.txt             # Copy file
cp file.txt /path/to/directory/          # Copy to directory
cp file1.txt file2.txt file3.txt /dest/  # Copy multiple files
cp -r source_dir/ dest_dir/              # Copy directory (recursive)
```

### Options

```bash
cp -p file.txt backup.txt    # Preserve attributes (permissions, timestamps)
cp -v file.txt dest.txt      # Verbose (show what's being copied)
cp -u source.txt dest.txt    # Copy only if source is newer
cp -i source.txt dest.txt    # Interactive (ask before overwriting)
```

### Practical Examples

```bash
# Backup before editing
cp config.conf config.conf.backup

# Copy with timestamp
cp important.txt "important_$(date +%Y%m%d).txt"

# Copy directory structure
cp -r project/ project_backup/

# Copy only if destination doesn't exist
cp -n source.txt destination.txt
```

---

## mv - Move/Rename Files

Move or rename files and directories.

### Basic Usage

```bash
mv oldname.txt newname.txt              # Rename file
mv file.txt /path/to/directory/        # Move file
mv file1.txt file2.txt /destination/   # Move multiple files
mv old_folder/ new_folder/             # Rename directory
```

### Options

```bash
mv -i source.txt dest.txt    # Interactive (ask before overwriting)
mv -n source.txt dest.txt    # Don't overwrite existing files
mv -v source.txt dest.txt    # Verbose output
```

### Practical Examples

```bash
# Rename with timestamp
mv report.txt "report_$(date +%Y%m%d).txt"

# Move all .log files
mv *.log logs/

# Archive old files
mv old_*.txt archive/

# Swap filenames
mv file1.txt temp.txt
mv file2.txt file1.txt
mv temp.txt file2.txt
```

---

## rm - Remove Files

Delete files and directories.

### Basic Usage

```bash
rm file.txt                  # Remove file
rm file1.txt file2.txt       # Remove multiple files
rm -r directory/             # Remove directory and contents
rm -f file.txt               # Force removal (no confirmation)
rm -rf directory/            # Force remove directory
rm -i file.txt               # Interactive (ask before each deletion)
```

### Safety Tips

```bash
# NEVER do this!
# rm -rf /    # Deletes everything!

# Always be specific
rm -rf ./temporary_folder/

# Use -i for important files
rm -i important_file.txt

# Check before removing
ls directory/
rm -rf directory/

# Remove only .log files
rm *.log
```

---

## touch - Create/Update Files

Create empty files or update timestamps.

### Basic Usage

```bash
touch newfile.txt                    # Create empty file
touch file1.txt file2.txt file3.txt  # Create multiple files
touch existing_file.txt              # Update modification time
```

### Options

```bash
touch -a file.txt                    # Update access time only
touch -m file.txt                    # Update modification time only
touch -t 202501150830 file.txt       # Set specific timestamp (YYYYMMDDhhmm)
```

### Practical Examples

```bash
# Create file if doesn't exist
touch logfile.txt

# Create placeholder files
touch index.html style.css script.js

# Create files in a loop
for i in {1..5}; do
    touch "file_$i.txt"
done
```

---

## mkdir - Make Directory

Create new directories.

### Basic Usage

```bash
mkdir myfolder                       # Create single directory
mkdir folder1 folder2 folder3        # Create multiple directories
mkdir -p parent/child/grandchild     # Create nested directories
mkdir -m 755 public_folder           # Create with specific permissions
```

### Practical Examples

```bash
# Create project structure
mkdir -p project/{src,docs,tests,bin}

# Create if doesn't exist
if [ ! -d "backup" ]; then
    mkdir backup
fi

# Create with timestamp
mkdir "backup_$(date +%Y%m%d)"

# Create and navigate
mkdir myproject && cd myproject
```

---

## man - Manual Pages

View command documentation.

### Basic Usage

```bash
man ls              # View manual for ls
man grep            # View manual for grep
man bash            # View manual for bash
```

### Navigation

- `Space` - Next page
- `b` - Previous page
- `/pattern` - Search forward
- `n` - Next search result
- `q` - Quit

### Useful Commands

```bash
man -k search_term     # Search man pages for keyword
whatis ls              # Show brief description
which ls               # Show command location
type ls                # Show command type
```

### Getting Help

```bash
ls --help              # Quick help for command
grep --help            # Command-specific help
info bash              # Info documentation (alternative to man)
```

---

## alias - Command Shortcuts

Create shortcuts for frequently used commands.

### Basic Usage

```bash
alias ll='ls -la'               # Create alias
alias gs='git status'           # Git shortcut
alias ..='cd ..'                # Navigate up

alias                           # View all aliases
unalias ll                      # Remove alias
\ls                             # Use original command (bypass alias)
```

### Common Aliases

```bash
# Better ls commands
alias ll='ls -lh'
alias la='ls -A'
alias l='ls -CF'

# Safety nets
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Directory navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# Git shortcuts
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline'

# System
alias update='sudo apt update && sudo apt upgrade'
alias myip='curl ifconfig.me'
```

### Making Aliases Permanent

Add to `~/.bashrc` or `~/.bash_profile`:

```bash
# Edit file
nano ~/.bashrc

# Add your aliases
alias ll='ls -la'
alias gs='git status'

# Save and reload
source ~/.bashrc
```

### Important Note About Scripts

**Aliases don't work in scripts by default!**

```bash
#!/bin/bash
# This won't work:
alias ll='ls -la'
ll

# Unless you enable them:
shopt -s expand_aliases
alias ll='ls -la'
ll    # Now it works

# Better: Just use the full command
ls -la
```

---

## Quick Reference

```bash
# Navigation
ls -la                  # List all files with details
cd /path                # Change directory
pwd                     # Show current directory

# File Operations
touch file.txt          # Create empty file
mkdir dir               # Create directory
cp source dest          # Copy file
mv old new              # Move/rename
rm file                 # Remove file
cat file.txt            # Display file

# Help
man command             # Manual page
command --help          # Quick help

# Shortcuts
alias name='command'    # Create alias
```

---

## Next Steps

- **b07_scripting.md** - Learn to write bash scripts using these commands
- **b02_text_processing.md** - Process file contents
- **b06_file_permissions.md** - Control file access
