@echo off
echo Starting CareBot Servers...

echo.
echo Starting Auth Server (Python, Port 5000)...
start "Auth Server" cmd /k "python simple_auth_server.py"

echo.
echo Waiting 3 seconds for auth server to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend (Port 3000)...
cd wellnessai\frontend
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Auth Server: http://localhost:5000/api
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
