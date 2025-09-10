@echo off
echo ========================================
echo    Ollama DNS Fix for Model Downloads
echo ========================================
echo.

echo [1/3] Checking current DNS settings...
ipconfig /all | findstr "DNS Servers"
echo.

echo [2/3] Temporarily switching to Google DNS...
netsh interface ip set dns "Wi-Fi" static 8.8.8.8
netsh interface ip add dns "Wi-Fi" 8.8.4.4 index=2
echo ✅ DNS changed to Google DNS (8.8.8.8, 8.8.4.4)
echo.

echo [3/3] Testing DNS resolution...
nslookup dd20bb891979d25aebc8bec07b2b3bbc.r2.cloudflarestorage.com
echo.

echo ========================================
echo    🚀 Now try downloading models:
echo ========================================
echo.
echo Try these commands:
echo   ollama pull meditron
echo   ollama pull llama2:7b
echo   ollama pull phi3
echo.
echo If successful, you can restore your original DNS with:
echo   netsh interface ip set dns "Wi-Fi" dhcp
echo.
pause
