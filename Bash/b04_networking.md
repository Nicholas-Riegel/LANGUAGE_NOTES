# Bash Networking

## Table of Contents
1. [ping - Test Connectivity](#ping-test-connectivity)
2. [curl - URL Transfer](#curl-url-transfer)
3. [wget - Downloader](#wget-downloader)
4. [ssh - Remote Connect](#ssh-remote-connect)
5. [scp - Secure Copy](#scp-secure-copy)
6. [rsync - File Sync](#rsync-file-sync)

---

## ping - Test Connectivity

Test network connectivity to a host.

### Basic Usage

```bash
ping google.com                  # Ping continuously (Ctrl+C to stop)
ping -c 4 google.com            # Ping 4 times then stop
ping -i 2 google.com            # Ping every 2 seconds
ping 192.168.1.1                # Ping IP address
```

### Common Options

```bash
ping -c 10 host                 # Send 10 packets
ping -i 0.5 host                # 0.5 second interval
ping -W 2 host                  # 2 second timeout
ping -s 1000 host               # Packet size 1000 bytes
ping -q host                    # Quiet mode (summary only)
```

### Practical Examples

```bash
# Quick connectivity test
ping -c 1 -W 2 google.com

# Check if host is up
if ping -c 1 -W 2 google.com > /dev/null 2>&1; then
    echo "Host is up"
else
    echo "Host is down"
fi

# Get average ping time
ping -c 5 google.com | tail -1 | awk -F '/' '{print $5}'

# Test multiple hosts
for host in google.com github.com stackoverflow.com; do
    if ping -c 1 -W 2 "$host" > /dev/null 2>&1; then
        echo "$host is UP"
    else
        echo "$host is DOWN"
    fi
done
```

---

## curl - URL Transfer

Transfer data from or to a server.

### Basic GET Requests

```bash
curl https://example.com                    # Get webpage
curl -o page.html https://example.com       # Save to file
curl -O https://example.com/file.zip        # Save with original filename
curl -L https://example.com                 # Follow redirects
curl -I https://example.com                 # Show headers only
curl -v https://example.com                 # Verbose output
```

### Download Files

```bash
# Download file
curl -O https://example.com/file.zip

# Download with custom name
curl -o myfile.zip https://example.com/file.zip

# Resume download
curl -C - -O https://example.com/largefile.zip

# Download multiple files
curl -O https://example.com/file1.zip -O https://example.com/file2.zip
```

### POST Requests

```bash
# POST form data
curl -X POST -d "name=John&age=30" https://api.example.com/users

# POST JSON
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"John","age":30}' \
  https://api.example.com/users

# POST from file
curl -X POST -d @data.json https://api.example.com/users
```

### Authentication

```bash
# Basic authentication
curl -u username:password https://api.example.com/data

# Bearer token
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/data

# API key
curl -H "X-API-Key: YOUR_KEY" https://api.example.com/data
```

### Useful Options

```bash
# Silent mode
curl -s https://example.com

# Show only HTTP status code
curl -s -o /dev/null -w "%{http_code}" https://example.com

# Timeout
curl --connect-timeout 5 --max-time 10 https://example.com

# Custom user agent
curl -A "Mozilla/5.0" https://example.com

# Custom headers
curl -H "Accept: application/json" https://api.example.com/data

# Save cookies
curl -c cookies.txt https://example.com

# Use cookies
curl -b cookies.txt https://example.com
```

### Practical Examples

```bash
# Check if website is up
status=$(curl -s -o /dev/null -w "%{http_code}" https://example.com)
if [ "$status" = "200" ]; then
    echo "Website is up"
else
    echo "Website returned status: $status"
fi

# Download with progress bar
curl -# -O https://example.com/file.zip

# GET API data
curl -s https://api.github.com/users/octocat

# Test API endpoint
curl -X GET \
  -H "Authorization: Bearer token" \
  https://api.example.com/v1/users
```

---

## wget - Downloader

Download files from the web.

### Basic Usage

```bash
wget https://example.com/file.zip           # Download file
wget -O myfile.zip https://example.com/file.zip    # Save with custom name
wget -c https://example.com/file.zip        # Resume download
wget -b https://example.com/file.zip        # Background download
```

### Download Multiple Files

```bash
# Download from file list
wget -i urls.txt

# Example urls.txt:
# https://example.com/file1.zip
# https://example.com/file2.zip
# https://example.com/file3.zip
```

### Mirror Website

```bash
# Download entire website
wget --mirror --convert-links --page-requisites https://example.com

# Limit recursion depth
wget -r -l 2 https://example.com

# Download specific file types
wget -r -A pdf,zip https://example.com
```

### Common Options

```bash
wget -q file.zip                    # Quiet mode
wget --progress=bar:force file.zip  # Show progress bar
wget --limit-rate=200k file.zip     # Limit download speed
wget --tries=5 file.zip             # Retry 5 times
wget --wait=2 -i urls.txt           # Wait 2 seconds between downloads
```

### Practical Examples

```bash
# Download with retry
wget --tries=10 --retry-connrefused https://example.com/file.zip

# Download all PDFs from a page
wget -r -l1 -A pdf https://example.com

# Continue interrupted download
wget -c https://example.com/largefile.zip

# Download in background and log
wget -b -o download.log https://example.com/file.zip
# Check progress: tail -f download.log
```

---

## ssh - Remote Connect

Connect to remote servers securely.

### Basic Connection

```bash
ssh username@hostname               # Connect to server
ssh user@192.168.1.100             # Connect by IP
ssh -p 2222 user@hostname          # Specify port
ssh -i ~/.ssh/key.pem user@host    # Use specific key
```

### Execute Remote Commands

```bash
# Run single command
ssh user@host "ls -la"

# Run multiple commands
ssh user@host "cd /var/log && tail -n 20 syslog"

# Pipe to remote command
cat localfile.txt | ssh user@host "cat > remotefile.txt"

# Get output from remote
output=$(ssh user@host "hostname")
echo "Remote hostname: $output"
```

### SSH Configuration

Create `~/.ssh/config`:

```bash
Host myserver
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/mykey.pem

Host prod
    HostName prod.example.com
    User deploy
    IdentityFile ~/.ssh/prod_key.pem
```

Then connect simply:

```bash
ssh myserver
ssh prod
```

### SSH Keys

```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Copy key to server
ssh-copy-id username@hostname

# Or manually
cat ~/.ssh/id_rsa.pub | ssh username@hostname \
  "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Practical Examples

```bash
# Run script on remote server
ssh user@host "bash -s" < local_script.sh

# Forward port (access remote port 8080 via local 8080)
ssh -L 8080:localhost:8080 user@host

# Keep connection alive
ssh -o ServerAliveInterval=60 user@host

# Jump through bastion host
ssh -J bastion@jump.example.com user@target.example.com
```

---

## scp - Secure Copy

Copy files between local and remote systems.

### Copy to Remote

```bash
# Copy file to remote
scp file.txt user@host:/path/to/destination/

# Copy directory
scp -r mydir/ user@host:/path/to/destination/

# Copy multiple files
scp file1.txt file2.txt user@host:/path/to/destination/

# Specify port
scp -P 2222 file.txt user@host:/path/to/destination/

# Use specific key
scp -i ~/.ssh/key.pem file.txt user@host:/path/to/destination/
```

### Copy from Remote

```bash
# Copy file from remote
scp user@host:/path/to/file.txt ./

# Copy directory from remote
scp -r user@host:/path/to/dir ./

# Copy to specific local location
scp user@host:/path/to/file.txt /local/path/
```

### Copy Between Remote Hosts

```bash
# Copy from one remote to another
scp user1@host1:/path/to/file.txt user2@host2:/path/to/destination/
```

### Options

```bash
scp -p file.txt user@host:/path/    # Preserve permissions and times
scp -q file.txt user@host:/path/    # Quiet mode
scp -v file.txt user@host:/path/    # Verbose mode
scp -C file.txt user@host:/path/    # Enable compression
```

### Practical Examples

```bash
# Backup to remote server
scp -r ~/important_data user@backup:/backups/

# Copy log files
scp user@server:/var/log/*.log ./logs/

# Copy with progress (using pv)
tar czf - directory/ | pv | ssh user@host "cat > backup.tar.gz"
```

---

## rsync - File Sync

Efficiently sync files and directories.

### Basic Usage

```bash
# Sync directory locally
rsync -av source/ destination/

# Sync to remote
rsync -av source/ user@host:/path/to/destination/

# Sync from remote
rsync -av user@host:/path/to/source/ destination/
```

### Common Options

```bash
# Recommended combination
rsync -avzP source/ user@host:/destination/

# Options explained:
# -a : Archive mode (preserves permissions, times, etc.)
# -v : Verbose
# -z : Compress during transfer
# -P : Show progress and keep partial files
# -h : Human-readable sizes
```

### Advanced Usage

```bash
# Dry run (preview)
rsync -avzP --dry-run source/ user@host:/destination/

# Delete files in destination not in source
rsync -av --delete source/ destination/

# Exclude files
rsync -av --exclude="*.log" source/ destination/

# Exclude multiple patterns
rsync -av \
  --exclude="*.log" \
  --exclude="*.tmp" \
  --exclude="node_modules/" \
  source/ destination/

# Exclude from file
rsync -av --exclude-from="exclude.txt" source/ destination/
```

### Practical Examples

```bash
# Backup with progress
rsync -avzP ~/Documents/ user@backup:/backups/documents/

# Sync website files
rsync -avz --delete /var/www/html/ user@webserver:/var/www/html/

# Backup excluding large files
rsync -av --exclude="*.iso" --exclude="*.mp4" source/ backup/

# Copy only certain file types
rsync -av --include="*.txt" --exclude="*" source/ destination/

# Sync with bandwidth limit
rsync -avz --bwlimit=1000 source/ user@host:/destination/
```

### Backup Script Example

```bash
#!/bin/bash
source="/home/user/data"
destination="user@backup-server:/backups/"
timestamp=$(date +%Y%m%d)

rsync -avzP \
    --delete \
    --exclude="*.tmp" \
    --exclude=".cache" \
    --log-file="backup_${timestamp}.log" \
    "$source/" \
    "$destination"

if [ $? -eq 0 ]; then
    echo "Backup completed successfully"
else
    echo "Backup failed"
fi
```

---

## Practical Networking Scripts

### Connection Tester

```bash
#!/bin/bash
hosts=("8.8.8.8" "google.com" "github.com")

echo "=== Network Connection Test ==="
for host in "${hosts[@]}"; do
    if ping -c 1 -W 2 "$host" > /dev/null 2>&1; then
        echo "$host: UP"
    else
        echo "$host: DOWN"
    fi
done
```

### Website Monitor

```bash
#!/bin/bash
url="https://example.com"
check_interval=60

while true; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" = "200" ]; then
        echo "[$(date)] $url is UP"
    else
        echo "[$(date)] $url is DOWN (Status: $status)"
    fi
    
    sleep $check_interval
done
```

### Batch Download

```bash
#!/bin/bash
# urls.txt contains one URL per line

while IFS= read -r url; do
    echo "Downloading: $url"
    wget -q "$url"
    
    if [ $? -eq 0 ]; then
        echo "Success: $url"
    else
        echo "Failed: $url"
    fi
done < urls.txt
```

---

## Quick Reference

```bash
# Connectivity
ping -c 4 host                  # Test connection
ping -c 1 host > /dev/null && echo "UP" || echo "DOWN"

# Download
curl -O url                     # Download with curl
wget url                        # Download with wget
curl -L url                     # Follow redirects

# API Requests
curl -X POST -d "data" url      # POST request
curl -H "Key: Value" url        # Custom header
curl -u user:pass url           # Basic auth

# Remote Access
ssh user@host                   # Connect to server
ssh user@host "command"         # Execute command
scp file user@host:/path        # Copy file
scp -r dir user@host:/path      # Copy directory

# Sync
rsync -avzP src/ user@host:/dst/    # Sync with progress
rsync -av --delete src/ dst/        # Sync and delete extras
```

---

## Next Steps

- **b01_basic_commands.md** - File operations for downloads
- **b07_scripting.md** - Automate networking tasks
- **b03_system_monitoring.md** - Monitor network processes
