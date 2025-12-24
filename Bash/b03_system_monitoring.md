# Bash System Monitoring

## Table of Contents
1. [ps - Process Status](#ps-process-status)
2. [top - List Processes](#top-list-processes)
3. [df - Disk Space](#df-disk-space)
4. [du - Directory Usage](#du-directory-usage)
5. [free - Memory Usage](#free-memory-usage)
6. [kill - Terminate Process](#kill-terminate-process)
7. [uptime - System Uptime](#uptime-system-uptime)
8. [netstat - Network Statistics](#netstat-network-statistics)
9. [lsof - List Open Files](#lsof-list-open-files)

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

## netstat - Network Statistics

Display network connections, routing tables, interface statistics, and network protocol information. "netstat" shows what network activity is happening on your system.

**Note:** On Linux systems, `ss` (socket statistics) is the modern replacement for `netstat` and is faster. On macOS, continue using `netstat` as `ss` is not available.

### Basic Usage

```bash
netstat -an                     # Show all connections and listening ports
                                # -a = all, -n = numeric (show IPs not hostnames)

netstat -tuln                   # Show listening TCP/UDP ports (Linux)
                                # -t = TCP, -u = UDP, -l = listening, -n = numeric

netstat -r                      # Show routing table (where network traffic is directed)

netstat -i                      # Show network interface statistics (packets sent/received)

netstat -s                      # Show protocol statistics (TCP, UDP, ICMP, etc.)
```

### macOS Specific Commands

```bash
# Show listening TCP ports
netstat -an -p tcp | grep LISTEN

# Show all TCP connections
netstat -an -p tcp

# Show all UDP connections  
netstat -an -p udp

# Show statistics for specific protocol
netstat -s -p tcp               # TCP statistics
netstat -s -p udp               # UDP statistics

# Show routing table with more details
netstat -rn                     # -n shows numeric addresses
```

### Linux Specific Commands

```bash
# Show listening ports with process info (requires root)
sudo netstat -tulnp             # -p shows program/PID using each connection

# Show all connections with process info
sudo netstat -tunap

# Show only TCP connections
netstat -tan

# Show only UDP connections
netstat -uan
```

### Practical Examples

```bash
# Find what's using port 8080
netstat -an | grep 8080

# Check if port 3000 is in use
netstat -an | grep :3000

# See all active connections (macOS)
netstat -an -p tcp | grep ESTABLISHED

# Find listening ports (macOS)
netstat -an -p tcp | grep LISTEN

# Monitor network connections in real-time
watch -n 1 'netstat -an -p tcp | grep ESTABLISHED | wc -l'

# Show network interface statistics
netstat -i
```

### Understanding netstat Output

```bash
Proto Recv-Q Send-Q  Local Address          Foreign Address        (state)
tcp4       0      0  192.168.1.10.50234     93.184.216.34.443      ESTABLISHED
tcp4       0      0  *.8080                 *.*                    LISTEN
```

- **Proto**: Protocol (tcp4, tcp6, udp4, udp6)
- **Recv-Q**: Received queue (data waiting to be read)
- **Send-Q**: Send queue (data waiting to be sent)
- **Local Address**: Your machine's IP:port
- **Foreign Address**: Remote machine's IP:port
- **State**: Connection state (LISTEN, ESTABLISHED, TIME_WAIT, etc.)

**Common States:**
- **LISTEN**: Waiting for incoming connections
- **ESTABLISHED**: Active connection
- **TIME_WAIT**: Connection closed, waiting to ensure all packets received
- **CLOSE_WAIT**: Remote side closed connection
- **SYN_SENT**: Attempting to establish connection

---

## lsof - List Open Files

"lsof" means "list open files" - it shows which files are opened by which processes. Since everything in Unix/Linux is a file (including network connections), lsof is extremely powerful for monitoring network activity, especially on macOS.

### Basic Network Usage

```bash
lsof -i                         # Show all network connections

lsof -i -P                      # Show connections with port numbers (not service names)
                                # -P = don't convert port numbers to names

lsof -i -n                      # Show connections with numeric IPs (no DNS lookup)
                                # -n = don't resolve hostnames

lsof -i -P -n                   # Both: show IPs and port numbers
```

### Finding Specific Ports

```bash
# What's using port 8080?
lsof -i :8080

# What's using TCP port 3000?
lsof -i tcp:3000

# What's using UDP port 53?
lsof -i udp:53

# Show all listening ports
sudo lsof -i -P | grep LISTEN

# Show all established connections
sudo lsof -i -P | grep ESTABLISHED
```

### Port Range and Protocol

```bash
# Show connections on ports 1-1024 (common services)
lsof -i tcp:1-1024

# Show all TCP connections
lsof -i tcp

# Show all UDP connections
lsof -i udp

# Show IPv4 connections only
lsof -i 4

# Show IPv6 connections only
lsof -i 6
```

### By IP Address

```bash
# Show connections to specific IP
lsof -i @192.168.1.1

# Show connections to specific host
lsof -i @example.com

# Show connections from local IP
lsof -i @127.0.0.1
```

### Process Information

```bash
# Find what ports a process is using
lsof -p 1234                    # By PID
lsof -c nginx                   # By process name (matches start of name)
lsof -c /nginx/                 # By regex pattern

# Find which process is using a port
lsof -i :8080 -t                # -t returns just the PID
sudo kill $(lsof -i :8080 -t)   # Kill process using port 8080
```

### Practical Examples

```bash
# Complete network overview
sudo lsof -i -P -n

# Find zombie processes holding ports
lsof -i -P | grep CLOSE_WAIT

# Monitor a specific application's network activity
lsof -c Chrome -i

# Find all processes using internet
lsof -i -P -n | grep ESTABLISHED

# Check if port is available (empty output = available)
lsof -i :9000

# List all listening services
sudo lsof -i -P -n | grep LISTEN | sort -k9

# Find the process that opened the most network connections
lsof -i -P | awk '{print $1}' | sort | uniq -c | sort -rn | head
```

### Understanding lsof Output

```bash
COMMAND    PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node     12345  user   23u  IPv4 0x123456      0t0  TCP *:3000 (LISTEN)
Chrome   67890  user   45u  IPv4 0x789abc      0t0  TCP 192.168.1.10:52341->93.184.216.34:443 (ESTABLISHED)
```

- **COMMAND**: Process name
- **PID**: Process ID
- **USER**: User running the process
- **FD**: File descriptor (number + u/r/w for read/write mode)
- **TYPE**: Connection type (IPv4, IPv6)
- **NODE**: Protocol (TCP, UDP)
- **NAME**: Connection details (local:port->remote:port)

### File Monitoring (Bonus)

Since lsof lists all open files, not just network:

```bash
# See what files a process has open
lsof -p 1234

# Find who's using a specific file
lsof /var/log/system.log

# Find all files open in a directory
lsof +D /var/log

# Find deleted files still held by processes (recover disk space)
lsof | grep deleted
```

### Comparison: netstat vs lsof

**Use netstat for:**
- Quick overview of all connections
- Routing table information (`netstat -r`)
- Protocol statistics (`netstat -s`)
- Interface statistics (`netstat -i`)

**Use lsof for:**
- Finding which process is using a port
- Detailed process information
- macOS network monitoring (better than netstat)
- Killing processes by port
- File and network connection combined view

**Quick Reference:**
```bash
# netstat: "What's happening on the network?"
netstat -an | grep LISTEN

# lsof: "Who's doing it?"
sudo lsof -i -P | grep LISTEN
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
