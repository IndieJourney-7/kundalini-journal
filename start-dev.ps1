# Kundalini Shakti Journal - Development Startup Script
# Run this in PowerShell to start the development server

Write-Host "🚀 Starting Kundalini Shakti Journal Development Server..." -ForegroundColor Cyan

# Add PHP to PATH for this session
$phpPath = "C:\projects\shakti_kundalini\php"
if ($env:Path -notlike "*$phpPath*") {
    $env:Path = "$phpPath;$env:Path"
    Write-Host "✅ Added PHP to PATH for this session" -ForegroundColor Green
}

# Verify PHP is available
try {
    $phpVersion = php -v 2>&1 | Select-Object -First 1
    Write-Host "✅ PHP: $phpVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ PHP not found at $phpPath" -ForegroundColor Red
    exit 1
}

# Verify Composer is available
try {
    $compVer = php composer -V 2>&1 | Select-Object -First 1
    Write-Host "✅ Composer: $compVer" -ForegroundColor Green
} catch {
    Write-Host "❌ Composer not found" -ForegroundColor Red
    exit 1
}

# Verify Node is available
try {
    $nodeVer = node -v 2>&1
    $npmVer = npm -v 2>&1
    Write-Host "✅ Node: $nodeVer, npm: $npmVer" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Node.js not found - frontend builds won't work" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Available commands:" -ForegroundColor Cyan
Write-Host "   php artisan serve          - Start Laravel dev server" -ForegroundColor White
Write-Host "   php artisan migrate        - Run database migrations" -ForegroundColor White
Write-Host "   php artisan make:model     - Create a new model" -ForegroundColor White
Write-Host "   php artisan make:controller - Create a new controller" -ForegroundColor White
Write-Host "   npm run dev                - Start Vite dev server (frontend)" -ForegroundColor White
Write-Host "   npm run build              - Build frontend for production" -ForegroundColor White
Write-Host ""
Write-Host "Starting Laravel development server..." -ForegroundColor Cyan
Write-Host ""

# Start the Laravel development server
php artisan serve
