# Bash File Compression

## Table of Contents
1. [zip - Compress Files](#zip-compress-files)
2. [unzip - Extract Files](#unzip-extract-files)
3. [tar - Archive Files](#tar-archive-files)

---

## zip - Compress Files

Create ZIP archives (cross-platform).

### Basic Usage

```bash
zip archive.zip file.txt                    # Compress single file
zip archive.zip file1.txt file2.txt        # Compress multiple files
zip -r archive.zip directory/              # Compress directory (recursive)
zip archive.zip newfile.txt                # Add to existing archive
zip -u archive.zip file.txt                # Update file in archive
```

### Common Options

```bash
zip -r archive.zip dir/             # Recursive (include subdirectories)
zip -9 archive.zip file.txt         # Maximum compression
zip -1 archive.zip file.txt         # Fast compression (less compression)
zip -q archive.zip file.txt         # Quiet mode
zip -v archive.zip file.txt         # Verbose mode
zip -e archive.zip file.txt         # Encrypt (password protect)
```

### Exclude Files

```bash
# Exclude specific files
zip -r archive.zip directory/ -x "*.log" "*.tmp"

# Exclude hidden files
zip -r archive.zip directory/ -x "*/.*"

# Exclude multiple patterns
zip -r archive.zip project/ \
    -x "*.log" \
    -x "node_modules/*" \
    -x ".git/*"
```

### Practical Examples

```bash
# Backup with timestamp
timestamp=$(date +%Y%m%d_%H%M%S)
zip -r "backup_${timestamp}.zip" ~/Documents

# Compress only specific file types
zip documents.zip *.txt *.pdf

# Password-protected archive
zip -e -r secure.zip sensitive_data/
# Will prompt for password

# Split large archive into parts
zip -s 100m -r archive.zip large_directory/
# Creates archive.z01, archive.z02, etc.

# Test archive after creation
zip -T archive.zip
```

---

## unzip - Extract Files

Extract ZIP archives.

### Basic Usage

```bash
unzip archive.zip                           # Extract to current directory
unzip archive.zip -d /path/to/destination/  # Extract to specific directory
unzip -l archive.zip                        # List contents (don't extract)
unzip -t archive.zip                        # Test archive integrity
```

### Common Options

```bash
unzip -o archive.zip                # Overwrite existing files
unzip -n archive.zip                # Never overwrite
unzip -q archive.zip                # Quiet mode
unzip -v archive.zip                # Verbose (detailed) listing
unzip -u archive.zip                # Update (extract only newer files)
unzip -j archive.zip                # Extract without directory structure
```

### Extract Specific Files

```bash
# Extract single file
unzip archive.zip file.txt

# Extract multiple files
unzip archive.zip file1.txt file2.txt

# Extract by pattern
unzip archive.zip "*.txt"

# Extract specific directory
unzip archive.zip "docs/*"

# Exclude files
unzip archive.zip -x "*.log"
```

### Password Protected

```bash
# Extract password-protected archive
unzip -P password archive.zip

# Will prompt if password not provided
unzip archive.zip
```

### Practical Examples

```bash
# Check contents before extracting
unzip -l archive.zip
unzip archive.zip

# Extract to new directory
mkdir extracted
unzip archive.zip -d extracted/

# Extract and flatten directory structure
unzip -j archive.zip

# Extract with confirmation
unzip archive.zip
# (Default behavior prompts for overwrites)

# View file in archive without extracting
unzip -p archive.zip file.txt
```

---

## tar - Archive Files

TAR (Tape ARchive) bundles multiple files, often with compression.

### Basic TAR (No Compression)

```bash
tar -cf archive.tar files/          # Create archive
tar -xf archive.tar                 # Extract archive
tar -tf archive.tar                 # List contents
tar -xf archive.tar -C /path/       # Extract to specific directory
```

### TAR with GZIP (.tar.gz or .tgz)

Most common compression format for Linux/Unix.

```bash
# Create compressed archive
tar -czf archive.tar.gz directory/

# Extract compressed archive
tar -xzf archive.tar.gz

# List contents
tar -tzf archive.tar.gz

# Extract to specific directory
tar -xzf archive.tar.gz -C /destination/

# Extract specific file
tar -xzf archive.tar.gz path/to/file.txt

# Create with verbose output
tar -czvf archive.tar.gz directory/
```

### TAR with BZIP2 (.tar.bz2)

Better compression, slower speed.

```bash
# Create
tar -cjf archive.tar.bz2 directory/

# Extract
tar -xjf archive.tar.bz2

# List contents
tar -tjf archive.tar.bz2
```

### TAR with XZ (.tar.xz)

Best compression ratio, slowest speed.

```bash
# Create
tar -cJf archive.tar.xz directory/

# Extract
tar -xJf archive.tar.xz

# List contents
tar -tJf archive.tar.xz
```

### TAR Options Explained

- `c` - Create archive
- `x` - Extract archive
- `t` - List contents
- `f` - File (must be followed by filename)
- `z` - Compress with gzip
- `j` - Compress with bzip2
- `J` - Compress with xz
- `v` - Verbose (show files being processed)
- `C` - Change to directory

### Exclude Files

```bash
# Exclude specific files/directories
tar -czf backup.tar.gz --exclude="*.log" --exclude="tmp/" directory/

# Exclude multiple patterns
tar -czf backup.tar.gz \
    --exclude="*.log" \
    --exclude="node_modules" \
    --exclude=".git" \
    project/

# Exclude from file
tar -czf backup.tar.gz --exclude-from="exclude.txt" directory/

# Example exclude.txt:
# *.log
# *.tmp
# node_modules/
# .git/
```

### Preserve Permissions

```bash
# Preserve permissions (useful for backups)
tar -cpzf backup.tar.gz directory/

# Extract preserving permissions
tar -xpzf backup.tar.gz
```

### Practical Examples

```bash
# Backup home directory
tar -czf home_backup.tar.gz ~/

# Backup with timestamp
tar -czf "backup_$(date +%Y%m%d).tar.gz" /important/data

# Incremental backup (only changed files)
tar -czf backup.tar.gz --newer="2024-01-01" directory/

# Create archive and verify
tar -czf archive.tar.gz directory/
tar -tzf archive.tar.gz > /dev/null && echo "Archive OK"

# Split large archive
tar -czf - large_directory/ | split -b 100M - archive.tar.gz.part
# Reassemble: cat archive.tar.gz.part* | tar -xzf -

# Compare archive with filesystem
tar -df archive.tar directory/

# Extract with progress bar (requires pv)
pv archive.tar.gz | tar -xzf - -C /destination/
```

### Auto-Detect Compression

Modern tar can auto-detect compression:

```bash
# Works for .tar.gz, .tar.bz2, .tar.xz
tar -xf archive.tar.gz
tar -xf archive.tar.bz2
tar -xf archive.tar.xz

# Create with auto compression based on extension
tar -caf archive.tar.gz directory/    # Creates gzip
tar -caf archive.tar.bz2 directory/   # Creates bzip2
tar -caf archive.tar.xz directory/    # Creates xz
```

---

## Comparing Compression Methods

### Compression Comparison

| Method | Speed | Ratio | Compatibility | Best For |
|--------|-------|-------|---------------|----------|
| zip | Fast | Good | Excellent | Cross-platform |
| tar.gz | Fast | Good | Excellent | Linux/Unix standard |
| tar.bz2 | Medium | Better | Very Good | When size matters |
| tar.xz | Slow | Best | Good | Maximum compression |

### When to Use What

```bash
# Cross-platform sharing (Windows, Mac, Linux)
zip -r archive.zip project/

# Linux/Mac backups (fast, good enough)
tar -czf backup.tar.gz directory/

# Archiving logs (better compression)
tar -cjf logs.tar.bz2 logs/

# Long-term storage (best compression)
tar -cJf archive.tar.xz data/
```

---

## Practical Compression Scripts

### Smart Backup Script

```bash
#!/bin/bash
source_dir="$1"
backup_dir="${2:-./backups}"

if [ -z "$source_dir" ]; then
    echo "Usage: $0 <source_dir> [backup_dir]"
    exit 1
fi

# Create backup directory
mkdir -p "$backup_dir"

# Generate backup name
timestamp=$(date +%Y%m%d_%H%M%S)
backup_file="${backup_dir}/backup_${timestamp}.tar.gz"

echo "Creating backup: $backup_file"

# Create compressed archive
tar -czf "$backup_file" \
    --exclude="*.log" \
    --exclude="*.tmp" \
    --exclude="node_modules" \
    --exclude=".git" \
    "$source_dir"

if [ $? -eq 0 ]; then
    size=$(du -h "$backup_file" | cut -f1)
    echo "Backup completed: $backup_file ($size)"
    
    # Keep only last 7 backups
    cd "$backup_dir"
    ls -t backup_*.tar.gz | tail -n +8 | xargs -r rm
    echo "Old backups cleaned up"
else
    echo "Backup failed!"
    exit 1
fi
```

### Extract Any Archive

```bash
#!/bin/bash
archive="$1"

if [ -z "$archive" ] || [ ! -f "$archive" ]; then
    echo "Usage: $0 <archive_file>"
    exit 1
fi

echo "Extracting: $archive"

case "$archive" in
    *.tar.gz|*.tgz)
        tar -xzf "$archive"
        ;;
    *.tar.bz2|*.tbz2)
        tar -xjf "$archive"
        ;;
    *.tar.xz|*.txz)
        tar -xJf "$archive"
        ;;
    *.tar)
        tar -xf "$archive"
        ;;
    *.zip)
        unzip "$archive"
        ;;
    *.gz)
        gunzip "$archive"
        ;;
    *.bz2)
        bunzip2 "$archive"
        ;;
    *)
        echo "Unknown archive format: $archive"
        exit 1
        ;;
esac

if [ $? -eq 0 ]; then
    echo "Extraction completed"
else
    echo "Extraction failed"
    exit 1
fi
```

### Archive Old Files

```bash
#!/bin/bash
days_old=30
archive_name="old_files_$(date +%Y%m%d).tar.gz"

echo "Archiving files older than $days_old days..."

# Find and archive old files
find . -type f -mtime +$days_old -print0 | \
    tar -czf "$archive_name" --null -T -

if [ -s "$archive_name" ]; then
    echo "Archive created: $archive_name"
    
    read -p "Delete original files? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        find . -type f -mtime +$days_old -delete
        echo "Original files deleted"
    fi
else
    echo "No old files found"
    rm "$archive_name"
fi
```

---

## Quick Reference

```bash
# ZIP
zip -r archive.zip directory/       # Create
unzip archive.zip                   # Extract
unzip -l archive.zip                # List contents

# TAR + GZIP (.tar.gz) - Most common
tar -czf archive.tar.gz directory/  # Create
tar -xzf archive.tar.gz             # Extract
tar -tzf archive.tar.gz             # List contents

# TAR + BZIP2 (.tar.bz2) - Better compression
tar -cjf archive.tar.bz2 directory/ # Create
tar -xjf archive.tar.bz2            # Extract

# TAR + XZ (.tar.xz) - Best compression
tar -cJf archive.tar.xz directory/  # Create
tar -xJf archive.tar.xz             # Extract

# Common options
tar -czf archive.tar.gz --exclude="*.log" dir/
unzip -d /path archive.zip
tar -xzf archive.tar.gz -C /destination/
```

---

## Next Steps

- **b01_basic_commands.md** - File operations before compression
- **b07_scripting.md** - Automate backup and compression
- **b03_system_monitoring.md** - Monitor disk space
