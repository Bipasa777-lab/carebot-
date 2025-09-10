@echo off
echo ========================================
echo    CareBot Ollama Meditron Setup
echo ========================================
echo.

echo [1/4] Checking if Ollama is installed...
ollama --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Ollama not found. Please install it first.
    echo.
    echo 📥 Download Ollama from: https://ollama.ai/download
    echo    After installation, restart this script.
    echo.
    pause
    exit /b 1
)
echo ✅ Ollama is installed

echo.
echo [2/4] Starting Ollama service...
start "Ollama Service" cmd /k "ollama serve"
echo ✅ Ollama service starting...
timeout /t 5 /nobreak >nul

echo.
echo [3/4] Downloading Meditron model...
echo    This may take several minutes depending on your internet speed...
ollama pull meditron
if %errorlevel% neq 0 (
    echo ❌ Failed to download Meditron model
    echo    Please check your internet connection and try again
    pause
    exit /b 1
)
echo ✅ Meditron model downloaded successfully

echo.
echo [4/4] Verifying installation...
ollama list | findstr meditron >nul
if %errorlevel% neq 0 (
    echo ❌ Meditron model not found in list
    pause
    exit /b 1
)
echo ✅ Meditron model verified

echo.
echo ========================================
echo    🎉 Ollama Meditron Setup Complete!
echo ========================================
echo.
echo Services Status:
echo - Ollama Service: Running on http://localhost:11434
echo - Meditron Model: Ready for medical queries
echo.
echo Next Steps:
echo 1. Restart your CareBot chat server
echo 2. Test medical queries in the frontend
echo 3. Enjoy AI-powered medical responses!
echo.
echo Press any key to exit...
pause >nul
