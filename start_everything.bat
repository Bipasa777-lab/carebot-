@echo off
echo ========================================
echo    CareBot Complete System Startup
echo ========================================
echo.

echo [1/4] Installing Python dependencies...
pip install flask flask-cors requests
echo ✅ Python dependencies installed

echo.
echo [2/4] Installing Frontend dependencies...
cd wellnessai\frontend
npm install
cd ..\..
echo ✅ Frontend dependencies installed

echo.
echo [3/4] Starting Authentication Server (Python on 5000)...
start "Auth Server" cmd /k "python simple_auth_server.py"
timeout /t 3 /nobreak >nul
echo ✅ Auth server started

echo.
echo [4/4] Starting Frontend (Port 3000)...
cd wellnessai\frontend
start "Frontend" cmd /k "npm run dev"
cd ..\..
echo ✅ Frontend started

echo.
echo ========================================
echo    🎉 CareBot is ready!
echo ========================================
echo.
echo Services Running:
echo - Auth Server: http://localhost:5000/api
echo - Frontend: http://localhost:3000
echo.
echo User Journey:
echo 1. Open: http://localhost:3000
echo 2. Click: "Get Started Free"
echo 3. Sign Up: Create your account
echo 4. Dashboard: View nearby hospitals/pharmacies
echo.
echo Press any key to exit this window...
pause >nul
