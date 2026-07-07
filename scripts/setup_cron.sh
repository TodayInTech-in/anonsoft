#!/bin/bash
# setup_cron.sh — Setup local macOS crontab to automate blog posting every 5 hours

REPO_DIR="/Users/skjasimuddin/.zhwork/todayintechweb"
SCRIPT_PATH="$REPO_DIR/scripts/auto_blog.py"
LOG_PATH="$REPO_DIR/scripts/auto_blog.log"

# Verify python script exists
if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Error: $SCRIPT_PATH does not exist!"
    exit 1
fi

# Ensure script is executable
chmod +x "$SCRIPT_PATH"

CRON_JOB="0 */5 * * * cd $REPO_DIR && python3 $SCRIPT_PATH >> $LOG_PATH 2>&1"

# Backup current crontab
crontab -l > current_cron.txt 2>/dev/null || touch current_cron.txt

# Check if job already exists
if grep -q "auto_blog.py" current_cron.txt; then
    echo "Cron job already exists in crontab. No changes made."
    rm current_cron.txt
    exit 0
fi

# Append job
echo "" >> current_cron.txt
echo "$CRON_JOB" >> current_cron.txt
echo "" >> current_cron.txt

# Install new crontab
crontab current_cron.txt
rm current_cron.txt

echo "Successfully scheduled auto-blog post to run every 5 hours!"
echo "You can check scheduled cron jobs by running: crontab -l"
