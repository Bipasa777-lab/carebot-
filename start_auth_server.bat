@echo off
echo ========================================
echo    Starting CareBot Auth Server
echo ========================================
echo.

echo Installing required packages...
pip install flask flask-cors

echo.
echo Starting Authentication Server...
echo Server will run on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python simple_auth_server.py
