# CareBot - AI-Powered Healthcare Assistant

A comprehensive healthcare application featuring AI-powered medical chat, location-based hospital finder, and user authentication.

## 🚀 Quick Start

### Option 1: One-Click Setup (Recommended)
```bash
# Double-click this file:
complete_startup.bat
```

### Option 2: Manual Setup
```bash
# 1. Install Ollama
# Download from: https://ollama.ai
ollama serve
ollama pull meditron

# 2. Start Backend
python simple_meditron_server.py

# 3. Start Frontend
cd wellnessai/frontend
npm run dev
```

## 🌟 Features

### ✅ **Landing Page**
- Clean, modern design
- Single "Get Started Free" button
- Responsive layout

### ✅ **Authentication System**
- Complete sign up/sign in flow
- Automatic redirect to dashboard after auth
- Protected routes

### ✅ **Dashboard**
- Location-based hospital and pharmacy finder
- Google Maps integration for directions
- Quick access to medical chat
- User-specific content

### ✅ **Medical AI Chat**
- Powered by Ollama + Meditron model
- Accessible only through dashboard
- Real-time medical assistance
- Error handling and fallbacks

### ✅ **Location Services**
- Automatic location detection
- Nearby hospitals and pharmacies
- Distance calculation
- Google Maps integration

## 🔧 Technical Stack

### Backend
- **Flask** - Python web framework
- **Ollama** - Local AI model server
- **Meditron** - Medical AI model
- **CORS** - Cross-origin resource sharing

### Frontend
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components

## 📁 Project Structure

```
carebot/
├── simple_meditron_server.py    # Flask backend
├── complete_startup.bat         # One-click startup
├── wellnessai/
│   └── frontend/                # Next.js frontend
│       ├── src/
│       │   ├── app/            # Pages
│       │   ├── components/     # React components
│       │   ├── services/       # API services
│       │   └── contexts/       # React contexts
│       └── package.json
└── README.md
```

## 🔗 API Endpoints

### Backend (Flask - Port 8000)
- `POST /api/medical-chat` - Medical chat with Ollama
- `POST /api/meditron` - Direct Ollama access
- `GET /health` - Health check

### Frontend (Next.js - Port 3000)
- `/` - Landing page
- `/auth/signup` - User registration
- `/auth/signin` - User login
- `/dashboard` - Main dashboard (protected)
- `/chatassistant` - Medical chat (accessible from dashboard)

## 🛠️ Troubleshooting

### Common Issues

**1. "Network Error" in chat**
- Ensure Ollama is running: `ollama serve`
- Pull the model: `ollama pull meditron`
- Check backend is running on port 8000

**2. "Port already in use"**
```bash
# Kill processes on ports 3000 and 8000
netstat -ano | findstr :3000
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F
```

**3. "PowerShell execution policy"**
```bash
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**4. "Module not found"**
```bash
# Install Python dependencies
pip install flask flask-cors requests

# Install Node.js dependencies
cd wellnessai/frontend
npm install
```

## 🧪 Testing

### Test Backend
```bash
python quick_test.py
```

### Test Full System
1. Open http://localhost:3000
2. Click "Get Started Free"
3. Sign up for new account
4. Access dashboard
5. Try medical chat from dashboard

## 📱 User Flow

1. **Landing Page** → Click "Get Started Free"
2. **Sign Up** → Create account
3. **Dashboard** → View nearby services
4. **Chat Assistant** → Access from dashboard
5. **Location Services** → Find hospitals/pharmacies

## 🔒 Security Features

- Protected dashboard route
- User authentication required
- CORS enabled for API access
- Input validation and error handling

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Run `python check_system.py` for diagnostics
3. Ensure all services are running
4. Check browser console for errors

---

**CareBot** - Your AI-powered healthcare companion 🤖💊
