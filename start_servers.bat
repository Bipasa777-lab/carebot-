@echo off
echo Starting CareBot Servers...

echo.
echo Starting Flask Backend (Port 8000)...
start "Flask Backend" cmd /k "python simple_meditron_server.py"

echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend (Port 3000)...
cd wellnessai\frontend
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
