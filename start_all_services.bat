@echo off
echo ========================================
echo    CareBot Complete System Startup
echo ========================================
echo.

echo [1/7] Checking system requirements...
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
echo [2/7] Installing Python dependencies...
pip install flask flask-cors requests
echo ✅ Python dependencies installed

echo.
echo [3/7] Installing Node.js dependencies...
cd wellnessai\frontend
npm install
cd ..\..
echo ✅ Node.js dependencies installed

echo.
echo [4/7] Starting Ollama server...
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
echo [5/7] Waiting for Ollama and pulling meditron model...
timeout /t 8 /nobreak >nul
ollama pull meditron
echo ✅ Meditron model ready

echo.
echo [6/7] Starting Authentication Server (Port 5000)...
start "Auth Server" cmd /k "python auth_server.py"
timeout /t 3 /nobreak >nul
echo ✅ Auth server started

echo.
echo [7/7] Starting Medical AI Server (Port 8000) and Frontend (Port 3000)...
start "Medical AI Server" cmd /k "python simple_meditron_server.py"
timeout /t 5 /nobreak >nul

cd wellnessai\frontend
start "Frontend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo Running system test...
cd ..\..
python test_complete_system.py

echo.
echo ========================================
echo    🎉 CareBot is fully operational!
echo ========================================
echo.
echo Services Running:
echo - Ollama: http://localhost:11434
echo - Auth Server: http://localhost:5000
echo - Medical AI Server: http://localhost:8000
echo - Frontend: http://localhost:3000
echo.
echo User Journey:
echo 1. Open: http://localhost:3000
echo 2. Click: "Get Started Free"
echo 3. Sign Up: Create your account
echo 4. Dashboard: View nearby hospitals/pharmacies
echo 5. Chat: Access medical AI from dashboard
echo.
echo Press any key to exit this window...
pause >nul
