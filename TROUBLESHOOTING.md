# CareBot Troubleshooting Guide

## Common Errors and Solutions

### 1. Python/Flask Backend Errors

**Error: Module not found**
```bash
# Install required packages
pip install flask flask-cors requests
```

**Error: Port already in use**
```bash
# Kill process using port 8000
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F
```

**Error: Ollama not found**
```bash
# Download and install Ollama from https://ollama.ai
# Then pull the meditron model
ollama pull meditron
```

### 2. Frontend/Node.js Errors

**Error: PowerShell execution policy**
```bash
# Run this command as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Error: npm not found**
```bash
# Install Node.js from https://nodejs.org
# Then install dependencies
cd wellnessai\frontend
npm install
```

**Error: Port 3000 already in use**
```bash
# Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### 3. Network/Connection Errors

**Error: Network Error in chat**
- Make sure Flask backend is running on port 8000
- Check if Ollama is running
- Verify CORS is enabled in Flask

**Error: CORS issues**
- Backend already has CORS enabled
- Check if both servers are running

## Step-by-Step Startup

### Method 1: Using Batch File (Easiest)
1. Double-click `start_servers.bat`
2. Wait for both servers to start
3. Open http://localhost:3000

### Method 2: Manual Startup

**Step 1: Start Backend**
```bash
# In Terminal 1
python simple_meditron_server.py
```

**Step 2: Start Frontend**
```bash
# In Terminal 2
cd wellnessai\frontend
npm run dev
```

### Method 3: Using PowerShell Bypass
```bash
# For frontend
cd wellnessai\frontend
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

## Testing the Setup

### Test Backend
```bash
python test_chat.py
```

### Test Frontend
1. Open http://localhost:3000
2. Try the chat assistant at http://localhost:3000/chatassistant
3. Sign up and test dashboard at http://localhost:3000/dashboard

## Common Issues

### Issue: "Cannot find module" errors
**Solution**: Run `npm install` in the frontend directory

### Issue: "Port already in use"
**Solution**: Kill the process using that port or use different ports

### Issue: "Network Error" in chat
**Solution**: 
1. Ensure Flask backend is running
2. Check if Ollama is installed and running
3. Verify the meditron model is available

### Issue: "PowerShell execution policy"
**Solution**: Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Quick Fix Commands

```bash
# Install all Python dependencies
pip install flask flask-cors requests

# Install all Node.js dependencies
cd wellnessai\frontend
npm install

# Start everything
python simple_meditron_server.py
# In another terminal:
cd wellnessai\frontend
npm run dev
```

## Need Help?

If you're still getting errors, please share:
1. The exact error message
2. Which step you're on
3. Your operating system
4. Python and Node.js versions
