@echo off
echo CareBot - Fixing Common Issues
echo ================================

echo.
echo 1. Installing Python dependencies...
pip install flask flask-cors requests

echo.
echo 2. Installing Node.js dependencies...
cd wellnessai\frontend
npm install
cd ..

echo.
echo 3. Checking if Ollama is installed...
where ollama >nul 2>nul
if %errorlevel% neq 0 (
    echo Ollama not found. Please install from https://ollama.ai
    echo After installation, run: ollama pull meditron
) else (
    echo Ollama found. Pulling meditron model...
    ollama pull meditron
)

echo.
echo 4. Setting up PowerShell execution policy...
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"

echo.
echo 5. Running system diagnostic...
python check_system.py

echo.
echo Fix completed! Now try running start_servers.bat
pause
