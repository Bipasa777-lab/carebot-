@echo off
echo ========================================
echo    CareBot Complete Startup Script
echo ========================================
echo.

echo [1/6] Checking system requirements...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python first.
    pause
    exit /b 1
)
echo ✅ Python found

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)
echo ✅ Node.js found

echo.
echo [2/6] Installing Python dependencies...
pip install flask flask-cors requests
echo ✅ Python dependencies installed

echo.
echo [3/6] Installing Node.js dependencies...
cd wellnessai\frontend
npm install
cd ..\..
echo ✅ Node.js dependencies installed

echo.
echo [4/6] Starting Ollama server...
where ollama >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Ollama not found. Please install from https://ollama.ai
    echo    After installation, run this script again.
    pause
    exit /b 1
)

start "Ollama Server" cmd /k "ollama serve"
echo ✅ Ollama server starting...

echo.
echo [5/6] Waiting for Ollama to start and pulling meditron model...
timeout /t 5 /nobreak >nul
ollama pull meditron
echo ✅ Meditron model ready

echo.
echo [6/6] Starting Flask backend and Frontend...
start "Flask Backend" cmd /k "python simple_meditron_server.py"
timeout /t 3 /nobreak >nul

cd wellnessai\frontend
start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo    🎉 CareBot is starting up!
echo ========================================
echo.
echo Services:
echo - Ollama: http://localhost:11434
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:3000
echo.
echo Features:
echo - Landing Page: http://localhost:3000
echo - Sign Up: http://localhost:3000/auth/signup
echo - Sign In: http://localhost:3000/auth/signin
echo - Dashboard: http://localhost:3000/dashboard (after login)
echo - Chat Assistant: Available from Dashboard
echo.
echo Press any key to exit this window...
pause >nul
