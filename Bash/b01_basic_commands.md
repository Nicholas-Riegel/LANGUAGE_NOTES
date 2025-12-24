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

List files and directories. "ls" stands for "list".

### Basic Usage

```bash
ls                    # List files in current directory
ls -l                 # Long format with details (shows permissions, owner, size, date)
ls -a                 # Show "all" files including hidden files (files starting with .)
ls -la                # Combines -l and -a: long format including hidden files
ls -lh                # Long format with "human-readable" file sizes (KB, MB, GB instead of bytes)
```

### Common Options

```bash
ls -lt                # Sort by modification "time" (newest first, -t = time)
ls -lS                # Sort by "size" (largest first, -S = size, capital S)
ls -lr                # Reverse order (-r = reverse)
ls -R                 # "Recursive" - show subdirectories and their contents (-R = recursive)
ls *.txt              # List only .txt files (the * is a wildcard meaning "any characters")
ls -d */              # List only directories (-d = directory, */ matches directories only)
```

### Practical Examples

```bash
# List with full paths
# $PWD is a variable containing the "Present Working Directory" (current directory path)
ls -d $PWD/*

# Count files in current directory
# The | (pipe) sends output from ls to wc
# wc = "word count", -l = "lines" (counts number of lines)
ls | wc -l

# Show newest 5 files
# head -6 shows first 6 lines (6 because first line is header)
ls -lt | head -6

# List only files (not directories)
# -p adds / to directory names, grep -v / excludes lines with /
# grep = "Global Regular Expression Print", -v = "invert" (exclude matches)
ls -p | grep -v /
```

---

## cd - Change Directory

Navigate between directories. "cd" stands for "change directory".

### Basic Usage

```bash
cd /path/to/directory    # Go to specific directory (absolute path starting with /)
cd                       # Go to home directory (same as cd ~)
cd ~                     # Go to home directory (~ is shorthand for your home directory)
cd ..                    # Go up one level (.. means parent directory)
cd ../..                 # Go up two levels (each .. goes up one level)
cd -                     # Go to previous directory (- remembers last location)
cd /                     # Go to root directory (/ is the top-level directory)
```

### Practical Examples

```bash
# Change to Downloads folder in home directory
cd ~/Downloads

# Save and return to directory
# pushd "pushes" current directory onto a stack and changes to new directory
pushd /tmp              # Save current dir and go to /tmp directory (temporary files)
# ... do work ...
# popd "pops" the saved directory off the stack and returns to it
popd                    # Return to saved directory

# Use in scripts to remember where you started
# $( ) runs a command and captures its output
original_dir=$(pwd)     # Save current directory path in variable
cd /some/directory      # Move to different directory
# ... do work ...
cd "$original_dir"      # Return to original directory (quotes handle spaces in path)
```

---

## pwd - Print Working Directory

Show the current directory path. "pwd" stands for "print working directory".

```bash
pwd                      # Show current directory absolute path

# Use in variables
# $( ) executes the command and captures its output
current_dir=$(pwd)       # Store current directory path in a variable
echo "I am in: $current_dir"  # Display the stored path

# Useful in scripts to log where the script is running
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
echo -n "No newline"     # -n = "no newline" - don't add newline at end
echo -e "Line1\nLine2"   # -e = "enable" escape sequences (\n = newline)
echo -e "Tab\there"      # \t = tab character
```

### Practical Examples

```bash
# Print variables
name="Alice"              # Create a variable (no spaces around =)
echo "Hello, $name"       # $name gets replaced with the variable's value

# Multiple lines using escape sequences
echo -e "Line 1\nLine 2\nLine 3"  # \n creates a new line

# Write to file
echo "Some text" > file.txt         # > redirects output to file (overwrites)
echo "More text" >> file.txt        # >> appends to file (doesn't overwrite)
```

---

## cat - Concatenate Files

Display or combine file contents. "cat" stands for "concatenate" (join together).

### Basic Usage

```bash
cat file.txt                               # Display file contents to terminal
cat file1.txt file2.txt                    # Display multiple files in sequence
cat file1.txt file2.txt > combined.txt     # Combine into new file (> redirects output)
cat newdata.txt >> existing.txt            # Append to file (>> appends instead of overwriting)
```

### Options

```bash
cat -n file.txt          # -n = "number" - add line numbers to all lines
cat -b file.txt          # -b = "number non-blank" - number only non-empty lines
cat -A file.txt          # -A = "show all" - show special characters like tabs (^I) and line endings ($)
```

### Practical Examples

```bash
# Create file with heredoc (here document)
# Heredoc allows you to pass multi-line input to a command
# The << EOF starts the heredoc, and EOF closes it (EOF = End Of File)
# You can use any word as delimiter (DONE, END, etc.), but EOF is conventional
# Everything between the delimiters becomes the content
cat > config.txt << EOF
setting1=value1
setting2=value2
EOF

# Display file with line numbers
cat -n script.sh

# Combine all log files into one
# *.log matches all files ending in .log (wildcard pattern)
cat *.log > all_logs.txt

# Quick preview of first 10 lines
# | (pipe) sends cat output to head command
# head shows the first N lines (default 10, or specify with -N)
cat file.txt | head -10
```

---

## cp - Copy Files

Copy files and directories. "cp" stands for "copy".

### Basic Usage

```bash
cp source.txt destination.txt             # Copy file (creates destination.txt)
cp file.txt /path/to/directory/          # Copy to directory (keeps same name)
cp file1.txt file2.txt file3.txt /dest/  # Copy multiple files to destination
cp -r source_dir/ dest_dir/              # Copy directory recursively (-r = recursive, includes all contents)
```

### Options

```bash
cp -p file.txt backup.txt    # -p = "preserve" - keep original permissions and timestamps
cp -v file.txt dest.txt      # -v = "verbose" - show what's being copied
cp -u source.txt dest.txt    # -u = "update" - copy only if source is newer than destination
cp -i source.txt dest.txt    # -i = "interactive" - ask for confirmation before overwriting
```

### Practical Examples

```bash
# Backup before editing
cp config.conf config.conf.backup

# Copy with timestamp in filename
# $(date +%Y%m%d) runs date command and formats as YYYYMMDD
# +%Y = 4-digit year, %m = month, %d = day
cp important.txt "important_$(date +%Y%m%d).txt"

# Copy entire directory and its contents
# The -r flag makes it recursive (copies subdirectories too)
cp -r project/ project_backup/

# Copy only if destination doesn't exist
# -n = "no clobber" - won't overwrite existing files
cp -n source.txt destination.txt
```

---

## mv - Move/Rename Files

Move or rename files and directories. "mv" stands for "move".

### Basic Usage

```bash
mv oldname.txt newname.txt              # Rename file (move to new name in same directory)
mv file.txt /path/to/directory/        # Move file to different directory
mv file1.txt file2.txt /destination/   # Move multiple files to destination directory
mv old_folder/ new_folder/             # Rename directory (works same as files)
```

### Options

```bash
mv -i source.txt dest.txt    # -i = "interactive" - ask before overwriting existing files
mv -n source.txt dest.txt    # -n = "no clobber" - don't overwrite existing files
mv -v source.txt dest.txt    # -v = "verbose" - show what's being moved
```

### Practical Examples

```bash
# Rename with timestamp appended to filename
mv report.txt "report_$(date +%Y%m%d).txt"

# Move all .log files to logs directory
# *.log is a wildcard pattern matching all files ending in .log
mv *.log logs/

# Archive old files (files starting with "old_" and ending in .txt)
mv old_*.txt archive/

# Swap two filenames (requires temporary name)
mv file1.txt temp.txt      # Rename file1 to temp
mv file2.txt file1.txt     # Rename file2 to file1
mv temp.txt file2.txt      # Rename temp to file2
```

---

## rm - Remove Files

Delete files and directories. "rm" stands for "remove". ⚠️ WARNING: rm permanently deletes files - they don't go to trash!

### Basic Usage

```bash
rm file.txt                  # Remove (delete) a single file
rm file1.txt file2.txt       # Remove multiple files at once
rm -r directory/             # -r = "recursive" - remove directory and all its contents
rm -f file.txt               # -f = "force" - remove without asking for confirmation
rm -rf directory/            # Force remove directory and contents (DANGEROUS - use carefully!)
rm -i file.txt               # -i = "interactive" - ask before each deletion (safer)
```

### Safety Tips

```bash
# ⚠️ NEVER do this - it will delete your entire system!
# rm -rf /    # Deletes everything starting from root directory!

# Always be specific with paths
# ./ means "current directory" - makes it clear you're deleting here
rm -rf ./temporary_folder/

# Use -i (interactive) for important files
# This asks "are you sure?" before deleting
rm -i important_file.txt

# Check what you're about to delete first
ls directory/              # List contents first
rm -rf directory/          # Then delete if you're sure

# Remove only .log files using wildcard
# * matches any characters, so *.log matches all .log files
rm *.log
```

---

## touch - Create/Update Files

Create empty files or update file timestamps. "touch" because it "touches" the file to update its timestamp.

### Basic Usage

```bash
touch newfile.txt                    # Create empty file (if it doesn't exist)
touch file1.txt file2.txt file3.txt  # Create multiple empty files at once
touch existing_file.txt              # Update modification time to now (doesn't change content)
```

### Options

```bash
touch -a file.txt                    # -a = "access" - update access time only (when file was last read)
touch -m file.txt                    # -m = "modification" - update modification time only (when file was last changed)
touch -t 202501150830 file.txt       # -t = "time" - set specific timestamp (format: YYYYMMDDhhmm)
                                      # Example: 202501150830 = Jan 15, 2025 at 08:30
```

### Practical Examples

```bash
# Create file if it doesn't exist (or update timestamp if it does)
touch logfile.txt

# Create multiple placeholder files at once
touch index.html style.css script.js

# Create numbered files using a loop
# {1..5} expands to: 1 2 3 4 5
# $i is the loop variable
for i in {1..5}; do
    touch "file_$i.txt"    # Creates: file_1.txt, file_2.txt, etc.
done
```

---

## mkdir - Make Directory

Create new directories. "mkdir" stands for "make directory".

### Basic Usage

```bash
mkdir myfolder                       # Create a single directory
mkdir folder1 folder2 folder3        # Create multiple directories at once
mkdir -p parent/child/grandchild     # -p = "parents" - create nested directories (makes parent dirs if needed)
mkdir -m 755 public_folder           # -m = "mode" - create with specific permissions (755 = rwxr-xr-x)
```

### Practical Examples

```bash
# Create project structure with multiple directories at once
# The {} (brace expansion) creates all listed directories
mkdir -p project/{src,docs,tests,bin}
# This creates: project/src, project/docs, project/tests, project/bin

# Create directory only if it doesn't already exist
# [ ] is a test command, -d checks if directory exists
# ! negates the test (means "not")
if [ ! -d "backup" ]; then
    mkdir backup
fi

# Create directory with timestamp in name
mkdir "backup_$(date +%Y%m%d)"    # Creates folder like: backup_20250115

# Create directory and immediately navigate into it
# && means "and" - runs second command only if first succeeds
mkdir myproject && cd myproject
```

---

## man - Manual Pages

View command documentation. "man" stands for "manual" - displays the official documentation for commands.

### Basic Usage

```bash
man ls              # View manual (help documentation) for ls command
man grep            # View manual for grep command
man bash            # View manual for bash shell itself
```

### Navigation (while viewing a man page)

- `Space` - Move to next page
- `b` - Move to previous page ("b" = "back")
- `/pattern` - Search forward for text (/ starts search)
- `n` - Jump to next search result ("n" = "next")
- `q` - Quit and exit man page ("q" = "quit")

### Useful Commands

```bash
man -k search_term     # -k = "keyword" - search all man pages for a keyword
whatis ls              # Show one-line description of command
which ls               # Show the file path where the command is located
type ls                # Show command type (built-in, alias, or executable file)
```

### Getting Help

```bash
ls --help              # Quick help summary (faster than man, but less detailed)
grep --help            # Most commands support --help flag
info bash              # Alternative documentation system (more detailed than man)
```

---

## alias - Command Shortcuts

Create shortcuts (aliases) for frequently used commands. Saves typing time!

### Basic Usage

```bash
alias ll='ls -la'               # Create alias: typing "ll" will run "ls -la"
alias gs='git status'           # Create git shortcut
alias ..='cd ..'                # Navigate up one directory with just ".."

alias                           # View all currently defined aliases
unalias ll                      # Remove an alias
\ls                             # Use original command (backslash bypasses alias)
```

### Common Aliases

```bash
# Better ls commands
alias ll='ls -lh'              # Long format with human-readable sizes
alias la='ls -A'               # List all except . and ..
alias l='ls -CF'               # Classify (add indicators like / for directories)

# Safety nets - ask before destructive operations
alias rm='rm -i'               # Ask before deleting (interactive)
alias cp='cp -i'               # Ask before overwriting
alias mv='mv -i'               # Ask before overwriting

# Directory navigation shortcuts
alias ..='cd ..'               # Go up one level
alias ...='cd ../..'           # Go up two levels
alias ....='cd ../../..'       # Go up three levels

# Git shortcuts (saves a lot of typing!)
alias gs='git status'          # Check repository status
alias ga='git add'             # Stage files
alias gc='git commit'          # Commit changes
alias gp='git push'            # Push to remote
alias gl='git log --oneline'   # Compact log view

# System commands
alias update='sudo apt update && sudo apt upgrade'  # Update system (Ubuntu/Debian)
alias myip='curl ifconfig.me'                        # Show public IP address
```

### Making Aliases Permanent

Aliases only last for your current terminal session. To make them permanent, add them to your shell configuration file:

Add to `~/.bashrc` (for bash) or `~/.zshrc` (for zsh):

```bash
# Edit the configuration file (~ means home directory)
nano ~/.bashrc       # For bash users
# or
nano ~/.zshrc        # For zsh users (default on macOS)

# Add your aliases at the end of the file
alias ll='ls -la'
alias gs='git status'

# Save (Ctrl+O in nano) and exit (Ctrl+X)

# Reload the configuration to apply changes
# source reads and executes the file in current shell
source ~/.bashrc     # For bash
# or
source ~/.zshrc      # For zsh
```

### Important Note About Scripts

**Aliases don't work in scripts by default!** This is because scripts run in a non-interactive shell.

```bash
#!/bin/bash
# This won't work in a script:
alias ll='ls -la'
ll                    # Error: ll command not found

# Unless you explicitly enable alias expansion:
shopt -s expand_aliases    # shopt = "shell options", -s = "set" (enable)
alias ll='ls -la'
ll                         # Now it works

# Better approach: Just use the full command in scripts
# This is more portable and doesn't require shopt
ls -la
```

---

## Quick Reference

```bash
# Navigation
ls -la                  # "list" - show all files with details (l=long, a=all including hidden)
cd /path                # "change directory" - navigate to directory
pwd                     # "print working directory" - show current location

# File Operations
touch file.txt          # Create empty file or update timestamp
mkdir dir               # "make directory" - create new directory
cp source dest          # "copy" - duplicate file or directory
mv old new              # "move" - move or rename file/directory
rm file                 # "remove" - delete file (WARNING: permanent!)
cat file.txt            # "concatenate" - display file contents

# Help
man command             # "manual" - view detailed documentation
command --help          # Quick help summary

# Shortcuts
alias name='command'    # Create shortcut for command
```

---

## Next Steps

- **b07_scripting.md** - Learn to write bash scripts using these commands
- **b02_text_processing.md** - Process file contents
- **b06_file_permissions.md** - Control file access
