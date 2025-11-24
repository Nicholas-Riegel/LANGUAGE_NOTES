# Bash File Permissions

## Table of Contents
1. [Understanding Permissions](#understanding-permissions)
2. [chmod - Change Permissions](#chmod-change-permissions)
3. [chown - Change Owner](#chown-change-owner)
4. [chgrp - Change Group](#chgrp-change-group)
5. [Special Permissions](#special-permissions)

---

## Understanding Permissions

### Permission String Format

```
-rwxrwxrwx
│││││││││└─ Other: execute
││││││││└── Other: write
│││││││└─── Other: read
││││││└──── Group: execute
│││││└───── Group: write
││││└────── Group: read
│││└─────── Owner: execute
││└──────── Owner: write
│└───────── Owner: read
└────────── File type (- = file, d = directory, l = link)
```

### Permission Values

| Symbol | Number | Meaning |
|--------|--------|---------|
| r | 4 | Read |
| w | 2 | Write |
| x | 1 | Execute |
| - | 0 | No permission |

### Common Permission Combinations

| Numeric | Symbolic | Meaning |
|---------|----------|---------|
| 755 | rwxr-xr-x | Owner full, others read+execute |
| 644 | rw-r--r-- | Owner read+write, others read only |
| 700 | rwx------ | Owner full, no one else |
| 777 | rwxrwxrwx | Everyone full (dangerous!) |
| 600 | rw------- | Owner read+write, no one else |
| 666 | rw-rw-rw- | Everyone read+write, no execute |

### View Permissions

```bash
ls -l file.txt                      # View file permissions
ls -ld directory/                   # View directory permissions
ls -la                              # View all including hidden
stat file.txt                       # Detailed file info
```

Example output:
```
-rw-r--r-- 1 user group 1234 Jan 15 10:30 file.txt
│          │ │    │     │    │           │
│          │ │    │     │    │           └─ filename
│          │ │    │     │    └─ timestamp
│          │ │    │     └─ size (bytes)
│          │ │    └─ group
│          │ └─ owner
│          └─ number of links
└─ permissions
```

---

## chmod - Change Permissions

Change file and directory permissions.

### Numeric (Octal) Mode

```bash
chmod 755 script.sh                 # rwxr-xr-x
chmod 644 file.txt                  # rw-r--r--
chmod 600 private.txt               # rw-------
chmod 777 shared.txt                # rwxrwxrwx (avoid this!)
chmod 700 ~/.ssh                    # Owner only for .ssh directory
```

### How to Calculate Numeric Permissions

```
r (read)    = 4
w (write)   = 2
x (execute) = 1

Owner: rwx = 4+2+1 = 7
Group: r-x = 4+0+1 = 5
Other: r-x = 4+0+1 = 5
Result: 755
```

### Symbolic Mode

More flexible for selective changes.

#### Syntax
```
chmod [who][operation][permissions] file
```

#### Who
- `u` - User (owner)
- `g` - Group
- `o` - Others
- `a` - All (same as ugo)

#### Operation
- `+` - Add permission
- `-` - Remove permission
- `=` - Set exact permission

#### Permissions
- `r` - Read
- `w` - Write
- `x` - Execute

### Symbolic Examples

```bash
# Add permissions
chmod u+x script.sh                 # Add execute for owner
chmod g+w file.txt                  # Add write for group
chmod o+r file.txt                  # Add read for others
chmod a+x script.sh                 # Add execute for all

# Remove permissions
chmod u-x script.sh                 # Remove execute from owner
chmod g-w file.txt                  # Remove write from group
chmod o-r file.txt                  # Remove read from others
chmod a-x file.txt                  # Remove execute from all

# Set exact permissions
chmod u=rwx file.txt                # Owner: rwx (7)
chmod g=rx file.txt                 # Group: r-x (5)
chmod o= file.txt                   # Others: none (0)
chmod a=r file.txt                  # All: read only

# Multiple changes at once
chmod u+x,g+x script.sh             # Add execute for owner and group
chmod u=rwx,g=rx,o=r file.txt      # Set different for each
chmod go-w file.txt                 # Remove write from group and others
```

### Recursive Changes

```bash
# Apply to all files in directory
chmod -R 755 directory/

# Make all scripts executable
find . -name "*.sh" -exec chmod +x {} \;

# Fix common permission issues
chmod -R u+rwX directory/           # Capital X: execute only for dirs
```

### Capital X in Symbolic Mode

`X` (capital) only adds execute if:
- File is a directory
- File already has execute for someone

```bash
chmod -R u+rwX directory/
# Directories: rwx (can enter)
# Files: rw- (unless already executable)
```

### Common Scenarios

```bash
# Make script executable
chmod +x script.sh                  # Same as chmod a+x

# Secure private key
chmod 600 ~/.ssh/id_rsa

# Secure SSH directory
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*
chmod 644 ~/.ssh/*.pub

# Web server files
chmod 755 ~/public_html             # Directories
find ~/public_html -type f -exec chmod 644 {} \;  # Files

# Shared directory
chmod 775 /shared/project           # rwxrwxr-x
```

---

## chown - Change Owner

Change file owner and/or group.

### Basic Usage

```bash
chown user file.txt                 # Change owner only
chown user:group file.txt           # Change owner and group
chown :group file.txt               # Change group only (same as chgrp)
chown -R user:group directory/      # Recursive
```

### Practical Examples

```bash
# Change owner
sudo chown alice file.txt

# Change owner and group
sudo chown alice:developers file.txt

# Change only group
sudo chown :developers file.txt

# Recursive for directory
sudo chown -R alice:developers project/

# Copy permissions from another file
sudo chown --reference=file1.txt file2.txt

# Show changes as they happen
sudo chown -v alice:developers file.txt
# Output: changed ownership of 'file.txt' from root:root to alice:developers
```

### Common Scenarios

```bash
# Fix ownership after sudo operations
sudo chown -R $USER:$USER ~/project

# Change web files to web server user
sudo chown -R www-data:www-data /var/www/html

# Give ownership to specific user
sudo chown john:john /home/john/file.txt

# Change files but not symlinks
sudo chown -h user:group symlink
```

---

## chgrp - Change Group

Change group ownership (alternative to `chown :group`).

### Basic Usage

```bash
chgrp group file.txt                # Change group
chgrp -R group directory/           # Recursive
chgrp --reference=file1 file2       # Copy group from file1
```

### Practical Examples

```bash
# Change group
sudo chgrp developers file.txt

# Recursive
sudo chgrp -R developers project/

# Match another file's group
sudo chgrp --reference=file1.txt file2.txt

# Verbose output
sudo chgrp -v developers file.txt
```

---

## Special Permissions

### Setuid (Set User ID)

When set on executable, runs as file owner (not executor).

```bash
chmod u+s executable                # Add setuid
chmod 4755 executable               # Numeric: 4 prefix
ls -l executable                    # Shows: -rwsr-xr-x
```

**Common Example:** `/usr/bin/passwd` (allows users to change password)

```bash
ls -l /usr/bin/passwd
-rwsr-xr-x 1 root root 59640 Mar 22  2019 /usr/bin/passwd
```

### Setgid (Set Group ID)

On executables: runs as file's group.
On directories: new files inherit directory's group.

```bash
chmod g+s directory/                # Add setgid
chmod 2755 directory/               # Numeric: 2 prefix
ls -ld directory/                   # Shows: drwxr-sr-x
```

**Common Use:** Shared project directories

```bash
# Create shared project directory
mkdir /shared/project
chgrp developers /shared/project
chmod 2775 /shared/project          # setgid + rwxrwxr-x
# Now all files created inside inherit "developers" group
```

### Sticky Bit

On directories: only owner can delete files (even if others have write).

```bash
chmod +t directory/                 # Add sticky bit
chmod 1777 directory/               # Numeric: 1 prefix
ls -ld directory/                   # Shows: drwxrwxrwt
```

**Common Example:** `/tmp` directory

```bash
ls -ld /tmp
drwxrwxrwt 10 root root 4096 Jan 15 10:30 /tmp
```

### Special Permissions Numeric Format

```
4 = Setuid
2 = Setgid
1 = Sticky bit

chmod 4755 file     # Setuid + rwxr-xr-x
chmod 2755 dir      # Setgid + rwxr-xr-x
chmod 1777 dir      # Sticky + rwxrwxrwx
chmod 6755 file     # Setuid + Setgid + rwxr-xr-x
```

---

## Practical Permission Scripts

### Fix Directory Permissions

```bash
#!/bin/bash
directory="${1:-.}"

echo "Fixing permissions in: $directory"

# Directories: 755 (rwxr-xr-x)
find "$directory" -type d -exec chmod 755 {} \;

# Files: 644 (rw-r--r--)
find "$directory" -type f -exec chmod 644 {} \;

# Scripts: make executable
find "$directory" -type f -name "*.sh" -exec chmod +x {} \;

echo "Permissions fixed!"
```

### Check Insecure Permissions

```bash
#!/bin/bash
directory="${1:-.}"

echo "Checking for insecure permissions in: $directory"

# World-writable files
echo "World-writable files:"
find "$directory" -type f -perm -002 -ls

# Files with 777
echo -e "\nFiles with 777 permissions:"
find "$directory" -type f -perm 777 -ls

# Directories with 777
echo -e "\nDirectories with 777 permissions:"
find "$directory" -type d -perm 777 -ls

# Setuid files
echo -e "\nSetuid files:"
find "$directory" -type f -perm -4000 -ls
```

### Setup Shared Project

```bash
#!/bin/bash
project_dir="$1"
group_name="$2"

if [ -z "$project_dir" ] || [ -z "$group_name" ]; then
    echo "Usage: $0 <project_dir> <group_name>"
    exit 1
fi

echo "Setting up shared project: $project_dir"

# Create directory
mkdir -p "$project_dir"

# Set group
sudo chgrp "$group_name" "$project_dir"

# Set permissions with setgid
sudo chmod 2775 "$project_dir"

# Verify
ls -ld "$project_dir"

echo "Setup complete!"
echo "Members of '$group_name' can now collaborate in $project_dir"
```

### Secure SSH Directory

```bash
#!/bin/bash
ssh_dir="${HOME}/.ssh"

echo "Securing SSH directory: $ssh_dir"

# SSH directory: 700
chmod 700 "$ssh_dir"

# Private keys: 600
chmod 600 "$ssh_dir"/id_* 2>/dev/null

# Public keys: 644
chmod 644 "$ssh_dir"/*.pub 2>/dev/null

# Authorized keys: 600
[ -f "$ssh_dir/authorized_keys" ] && chmod 600 "$ssh_dir/authorized_keys"

# Config: 600
[ -f "$ssh_dir/config" ] && chmod 600 "$ssh_dir/config"

# Known hosts: 644
[ -f "$ssh_dir/known_hosts" ] && chmod 644 "$ssh_dir/known_hosts"

echo "SSH directory secured!"
ls -la "$ssh_dir"
```

---

## Common Permission Problems & Solutions

### Problem: "Permission denied"

```bash
# Check who owns the file
ls -l file.txt

# Fix: Make executable
chmod +x script.sh

# Fix: Change owner to yourself
sudo chown $USER file.txt

# Fix: Add read permission
chmod +r file.txt
```

### Problem: Can't delete file in directory

```bash
# Need write permission on directory (not file!)
chmod u+w directory/

# Or change directory ownership
sudo chown $USER directory/
```

### Problem: SSH key "UNPROTECTED PRIVATE KEY FILE"

```bash
# SSH requires 600 permissions
chmod 600 ~/.ssh/id_rsa

# Fix entire .ssh directory
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_*
chmod 644 ~/.ssh/*.pub
```

### Problem: Web server can't read files

```bash
# Make readable by web server (www-data)
sudo chown -R www-data:www-data /var/www/html

# Or make world-readable (less secure)
chmod -R 755 /var/www/html
find /var/www/html -type f -exec chmod 644 {} \;
```

---

## Best Practices

### Security Guidelines

```bash
# ✅ GOOD
chmod 644 documents.txt             # Files: owner write, others read
chmod 755 scripts.sh                # Scripts: owner write, all execute
chmod 700 ~/.ssh                    # Private directories: owner only
chmod 600 ~/.ssh/id_rsa             # Private keys: owner read/write only

# ❌ BAD (avoid these)
chmod 777 file.txt                  # Everyone can do everything
chmod 666 script.sh                 # Script not executable + world writable
chmod 644 ~/.ssh/id_rsa             # Private key readable by others
```

### Default Permissions

Set default permissions for new files using `umask`:

```bash
# Check current umask
umask
# Output: 0022

# Set umask (in ~/.bashrc or ~/.zshrc)
umask 022                           # New files: 644, dirs: 755
umask 077                           # New files: 600, dirs: 700 (more secure)

# Umask calculation
# Files created with: 666 - umask
# Dirs created with: 777 - umask

# umask 022:
# Files: 666 - 022 = 644 (rw-r--r--)
# Dirs:  777 - 022 = 755 (rwxr-xr-x)
```

### Quick Permission Checklist

- **Scripts:** `755` or `700` (executable)
- **Documents:** `644` or `600` (not executable)
- **Directories:** `755` or `700` (enter-able)
- **SSH keys:** `600` (private), `644` (public)
- **SSH directory:** `700`
- **Shared project:** `2775` (setgid + group write)
- **Temp/shared:** `1777` (sticky bit + all write)

---

## Quick Reference

```bash
# View permissions
ls -l file.txt
ls -ld directory/
stat file.txt

# chmod - Change permissions (numeric)
chmod 755 script.sh                 # rwxr-xr-x
chmod 644 file.txt                  # rw-r--r--
chmod 600 private.txt               # rw-------
chmod -R 755 directory/             # Recursive

# chmod - Change permissions (symbolic)
chmod u+x script.sh                 # Add execute for owner
chmod g+w file.txt                  # Add write for group
chmod o-r file.txt                  # Remove read from others
chmod a+x script.sh                 # Add execute for all
chmod u=rwx,g=rx,o=r file.txt      # Set all at once

# chown - Change owner/group
sudo chown user file.txt            # Change owner
sudo chown user:group file.txt     # Change owner and group
sudo chown -R user:group dir/      # Recursive

# chgrp - Change group
sudo chgrp group file.txt           # Change group
sudo chgrp -R group dir/            # Recursive

# Special permissions
chmod u+s executable                # Setuid
chmod g+s directory/                # Setgid
chmod +t directory/                 # Sticky bit
chmod 4755 file                     # Setuid (numeric)
chmod 2755 dir                      # Setgid (numeric)
chmod 1777 dir                      # Sticky (numeric)
```

---

## Next Steps

- **b01_basic_commands.md** - File operations (cp, mv, rm)
- **b03_system_monitoring.md** - Monitor file system usage
- **b07_scripting.md** - Automate permission management
