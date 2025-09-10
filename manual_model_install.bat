@echo off
echo ========================================
echo    Manual Ollama Model Installation
echo ========================================
echo.

echo This script will help you install models manually if DNS issues persist.
echo.

echo [1/4] Checking Ollama status...
ollama list
echo.

echo [2/4] Testing Ollama connectivity...
curl -s http://localhost:11434/api/tags
echo.

echo [3/4] Available models to try:
echo   - llama2:7b (smaller, faster)
echo   - phi3 (Microsoft's model)
echo   - meditron (medical AI)
echo   - mistral (general purpose)
echo.

echo [4/4] Manual download commands:
echo   ollama pull llama2:7b
echo   ollama pull phi3
echo   ollama pull meditron
echo.

echo If DNS issues persist, try:
echo 1. Run fix_ollama_dns.bat first
echo 2. Use a VPN to change your location
echo 3. Try downloading during off-peak hours
echo 4. Contact your ISP about DNS issues
echo.

pause
