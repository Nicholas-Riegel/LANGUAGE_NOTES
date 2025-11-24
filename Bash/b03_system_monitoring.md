# Bash System Monitoring

## Table of Contents
1. [ps - Process Status](#ps-process-status)
2. [top - List Processes](#top-list-processes)
3. [df - Disk Space](#df-disk-space)
4. [du - Directory Usage](#du-directory-usage)
5. [free - Memory Usage](#free-memory-usage)
6. [kill - Terminate Process](#kill-terminate-process)
7. [uptime - System Uptime](#uptime-system-uptime)

---

## ps - Process Status

View currently running processes.

### Basic Usage

```bash
ps                              # Show your processes
ps aux                          # Show all processes (detailed)
ps -ef                          # Show all processes (full format)
ps -u username                  # Show processes for specific user
```

### Common Options

```bash
ps aux                          # All processes, detailed
ps -ef                          # All processes, full format
ps aux --sort=-%mem             # Sort by memory usage
ps aux --sort=-%cpu             # Sort by CPU usage
ps -eo pid,ppid,cmd,%mem,%cpu   # Custom columns
```

### Practical Examples

```bash
# Find specific process
ps aux | grep "nginx"

# Show process tree
ps auxf
ps -ejH

# Show top memory consumers
ps aux --sort=-%mem | head -10

# Show process with PID
ps -p 1234

# Monitor specific user
ps -u www-data

# Show all processes with threads
ps -eLf
```

---

## top - List Processes

Real-time process monitoring.

### Basic Usage

```bash
top                             # Start top (press 'q' to quit)
top -u username                 # Show specific user's processes
top -d 2                        # Update every 2 seconds
top -n 1                        # Run once and exit (for scripts)
```

### Interactive Commands

While `top` is running:
- `q` - Quit
- `k` - Kill a process
- `M` - Sort by memory usage
- `P` - Sort by CPU usage
- `1` - Show individual CPUs
- `h` or `?` - Help
- `Space` - Refresh immediately

### Understanding Output

```
top - 10:15:32 up 5 days,  2:34,  2 users,  load average: 0.50, 0.40, 0.35
Tasks: 245 total,   1 running, 244 sleeping,   0 stopped,   0 zombie
%Cpu(s):  5.2 us,  2.1 sy,  0.0 ni, 92.5 id,  0.2 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :  15963.4 total,   2048.2 free,   8192.1 used,   5723.1 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   6543.2 avail Mem
```

- **load average**: System load (1, 5, 15 minutes)
- **us**: User CPU time
- **sy**: System CPU time
- **id**: Idle CPU time
- **wa**: Wait for I/O

### Practical Examples

```bash
# Batch mode (for logging)
top -b -n 1 > top_snapshot.txt

# Monitor specific process
top -p 1234

# Top 10 CPU processes
top -b -n 1 | head -17 | tail -10
```

---

## df - Disk Space

Show available disk space on filesystems.

### Basic Usage

```bash
df                              # Show disk space
df -h                           # Human-readable sizes (GB, MB)
df -i                           # Show inode information
df -T                           # Show filesystem type
```

### Common Options

```bash
df -h                           # Human-readable (KB, MB, GB)
df -h /                         # Show specific filesystem
df -h --total                   # Show total at end
df -h -x tmpfs                  # Exclude filesystem type
df -h -t ext4                   # Show only ext4 filesystems
```

### Practical Examples

```bash
# Check root partition
df -h /

# Show all except temporary filesystems
df -h -x tmpfs -x devtmpfs

# Check if disk is full
usage=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
if [ $usage -gt 90 ]; then
    echo "WARNING: Disk usage is ${usage}%"
fi

# Monitor specific mount point
df -h /home
```

---

## du - Directory Usage

Estimate file and directory space usage.

### Basic Usage

```bash
du                              # Show directory sizes
du -h                           # Human-readable sizes
du -sh directory/               # Summary of directory
du -sh *                        # Size of each item in current directory
```

### Common Options

```bash
du -h file.txt                  # Size of file
du -sh directory/               # Summary (total) of directory
du -sh */                       # Size of each subdirectory
du -ah directory/               # All files and directories
du -h --max-depth=1             # Limit depth
```

### Practical Examples

```bash
# Find largest directories
du -h /var | sort -h -r | head -10

# Show sizes sorted
du -sh * | sort -h

# Exclude certain directories
du -h --exclude="*.log" directory/

# Find large files
du -ah /home | sort -h -r | head -20

# Disk usage of current directory
du -sh .

# Compare directory sizes
du -sh /var/log /var/cache /var/tmp
```

---

## free - Memory Usage

Display amount of free and used memory.

### Basic Usage

```bash
free                            # Show memory in KB
free -m                         # Show in MB
free -g                         # Show in GB
free -h                         # Human-readable
```

### Common Options

```bash
free -h                         # Human-readable (MB, GB)
free -t                         # Show total line
free -s 2                       # Update every 2 seconds
free -c 5                       # Display 5 times then exit
```

### Understanding Output

```bash
              total        used        free      shared  buff/cache   available
Mem:           15Gi       8.2Gi       2.1Gi       500Mi       5.0Gi       6.5Gi
Swap:         2.0Gi          0B       2.0Gi
```

- **total**: Total installed RAM
- **used**: Used RAM
- **free**: Completely unused RAM
- **shared**: Shared memory
- **buff/cache**: Used for caching (can be freed)
- **available**: Memory available for new applications

### Practical Examples

```bash
# Check memory usage percentage
free | grep Mem | awk '{printf "%.2f%%\n", $3/$2 * 100.0}'

# Monitor memory in real-time
free -h -s 1

# Check if swap is being used
free -h | grep Swap

# Alert if memory low
available=$(free -m | awk 'NR==2 {print $7}')
if [ $available -lt 1000 ]; then
    echo "Low memory: ${available}MB available"
fi
```

---

## kill - Terminate Process

Send signals to processes.

### Basic Usage

```bash
kill PID                        # Terminate process (SIGTERM)
kill -9 PID                     # Force kill (SIGKILL)
kill -15 PID                    # Graceful termination (SIGTERM)
kill -HUP PID                   # Reload configuration (SIGHUP)
```

### Common Signals

```bash
kill -l                         # List all signals
kill -1 PID                     # SIGHUP (hang up)
kill -2 PID                     # SIGINT (interrupt, like Ctrl+C)
kill -9 PID                     # SIGKILL (force kill, cannot be caught)
kill -15 PID                    # SIGTERM (termination signal, default)
kill -19 PID                    # SIGSTOP (pause process)
kill -18 PID                    # SIGCONT (continue paused process)
```

### Killing by Name

```bash
# killall - kill by process name
killall firefox                 # Kill all Firefox processes
killall -9 firefox              # Force kill all Firefox

# pkill - kill by pattern
pkill firefox                   # Kill processes matching "firefox"
pkill -u username               # Kill all processes by user
pkill -f "python script.py"     # Kill by full command line
```

### Practical Examples

```bash
# Find and kill process
ps aux | grep nginx
kill 1234

# Kill all processes by name
pkill nginx

# Graceful shutdown then force
kill PID
sleep 5
kill -9 PID

# Kill all user processes
pkill -u username

# Kill process using port 8080
lsof -ti:8080 | xargs kill

# Kill zombie processes
ps aux | grep 'Z' | awk '{print $2}' | xargs kill -9
```

---

## uptime - System Uptime

Show how long system has been running.

### Basic Usage

```bash
uptime                          # Show uptime and load

# Example output:
# 14:30:01 up 10 days, 3:45, 2 users, load average: 0.50, 0.40, 0.35
```

### Understanding Output

- **14:30:01** - Current time
- **up 10 days, 3:45** - System has been running for 10 days, 3 hours, 45 minutes
- **2 users** - Number of logged-in users
- **load average: 0.50, 0.40, 0.35** - System load (1, 5, 15 minutes)

### Load Average

The load average shows:
- First number: Last 1 minute
- Second number: Last 5 minutes
- Third number: Last 15 minutes

**Rule of thumb**: Load should be less than number of CPU cores.

```bash
# Get number of CPUs
nproc

# Check if load is high
load=$(uptime | awk -F'load average:' '{print $2}' | awk -F',' '{print $1}' | tr -d ' ')
cpus=$(nproc)
echo "Load: $load on $cpus CPU(s)"
```

### Practical Examples

```bash
# Just show load average
uptime | awk -F'load average:' '{print $2}'

# Get uptime in days
uptime -p

# Check system status
uptime && free -h && df -h /
```

---

## Monitoring Scripts

### System Health Check

```bash
#!/bin/bash
echo "=== System Health Check ==="
echo "Date: $(date)"
echo ""

echo "=== Uptime and Load ==="
uptime
echo ""

echo "=== Memory Usage ==="
free -h
echo ""

echo "=== Disk Usage ==="
df -h | grep -v tmpfs
echo ""

echo "=== Top 5 CPU Processes ==="
ps aux --sort=-%cpu | head -6
echo ""

echo "=== Top 5 Memory Processes ==="
ps aux --sort=-%mem | head -6
```

### Disk Space Alert

```bash
#!/bin/bash
threshold=90

df -h | grep -vE '^Filesystem|tmpfs' | awk '{print $5 " " $1}' | while read output; do
    usage=$(echo $output | awk '{print $1}' | tr -d '%')
    partition=$(echo $output | awk '{print $2}')
    
    if [ $usage -ge $threshold ]; then
        echo "ALERT: $partition is ${usage}% full"
    fi
done
```

### Process Monitor

```bash
#!/bin/bash
process_name="nginx"

if pgrep "$process_name" > /dev/null; then
    echo "$process_name is running"
    ps aux | grep "$process_name" | grep -v grep
else
    echo "ERROR: $process_name is NOT running!"
fi
```

---

## Quick Reference

```bash
# Processes
ps aux                          # All processes
ps aux | grep name              # Find process
ps aux --sort=-%mem             # Sort by memory
top                             # Real-time monitor

# Disk
df -h                           # Disk space
du -sh directory/               # Directory size
du -sh * | sort -h              # Sorted sizes

# Memory
free -h                         # Memory usage

# System
uptime                          # Uptime and load
nproc                           # Number of CPUs

# Kill
kill PID                        # Terminate
kill -9 PID                     # Force kill
killall name                    # Kill by name
pkill pattern                   # Kill by pattern
```

---

## Next Steps

- **b01_basic_commands.md** - Basic file operations
- **b07_scripting.md** - Automate monitoring with scripts
- **b04_networking.md** - Network monitoring tools
