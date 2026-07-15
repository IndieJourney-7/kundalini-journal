#!/bin/bash
# Start Laravel dev server with the project's PHP and php.ini
cd "$(dirname "$0")"
"../php/php.exe" -c "../php/php.ini" artisan serve --port=8000 &
echo $! > /tmp/laravel-pid.txt
echo "Laravel server starting on port 8000 (PID: $(cat /tmp/laravel-pid.txt))"
