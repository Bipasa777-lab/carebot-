@echo off
echo Starting CareBot with Ollama...
echo ================================

echo.
echo 1. Starting Ollama server...
start "Ollama Server" cmd /k "ollama serve"

echo.
echo 2. Waiting 5 seconds for Ollama to start...
timeout /t 5 /nobreak > nul

echo.
echo 3. Pulling meditron model (if not already available)...
ollama pull meditron

echo.
echo 4. Starting Flask backend...
start "Flask Backend" cmd /k "python simple_meditron_server.py"

echo.
echo 5. Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo 6. Starting Frontend...
cd wellnessai\frontend
start "Frontend" cmd /k "npm run dev"

echo.
echo All services are starting...
echo Ollama: http://localhost:11434
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
