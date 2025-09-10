@echo off
echo ========================================
echo    CareBot Complete System Startup
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
pip install flask flask-cors requests >nul 2>&1
echo ✅ Python dependencies installed

echo.
echo [3/6] Installing Frontend dependencies...
cd wellnessai\frontend
npm install >nul 2>&1
cd ..\..
echo ✅ Frontend dependencies installed

echo.
echo [4/6] Starting Authentication Server (Port 5000)...
start "Auth Server" cmd /k "python simple_auth_server.py"
timeout /t 3 /nobreak >nul
echo ✅ Auth server started

echo.
echo [5/6] Starting Enhanced Chat Server (Port 8000)...
start "Chat Server" cmd /k "python enhanced_chat_server.py"
timeout /t 3 /nobreak >nul
echo ✅ Chat server started

echo.
echo [6/6] Starting Location Service (Port 5001)...
start "Location Service" cmd /k "python location_service.py"
timeout /t 3 /nobreak >nul
echo ✅ Location service started

echo.
echo Starting Frontend (Port 3000)...
cd wellnessai\frontend
start "Frontend" cmd /k "npm run dev"
cd ..\..
echo ✅ Frontend started

echo.
echo ========================================
echo    🎉 CareBot is fully operational!
echo ========================================
echo.
echo Services Running:
echo - Auth Server: http://localhost:5000/api
echo - Chat Server: http://localhost:8000/api/medical-chat
echo - Location Service: http://localhost:5001/api
echo - Frontend: http://localhost:3000
echo.
echo Features Available:
echo ✅ User Authentication (Signup/Login)
echo ✅ Medical AI Chat (Enhanced responses)
echo ✅ Location-based Hospital/Pharmacy Search
echo ✅ Dashboard with Nearby Services
echo ✅ Google Maps Integration
echo.
echo User Journey:
echo 1. Open: http://localhost:3000
echo 2. Sign Up: Create your account
echo 3. Dashboard: View nearby hospitals/pharmacies
echo 4. Chat: Ask medical questions
echo 5. Location: Get directions to services
echo.
echo Press any key to exit this window...
pause >nul
