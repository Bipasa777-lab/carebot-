# CareBot Frontend Setup Instructions

## Environment Configuration

Create a `.env.local` file in the frontend directory with the following content:

```bash
# Medical AI Backend URL (Flask with Ollama)
NEXT_PUBLIC_MED_API_URL=http://localhost:8000

# Main API URL (Node.js backend)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Features Implemented

### 1. Chat Assistant Integration
- ✅ Connected to Flask backend with Ollama Meditron model
- ✅ Improved error handling and debugging
- ✅ Real-time chat interface with sample questions
- ✅ Language selection support

### 2. Location-Based Services
- ✅ Location detection using browser geolocation
- ✅ Nearby hospitals and pharmacies display
- ✅ Google Maps integration for directions
- ✅ Distance calculation and sorting

### 3. Authentication System
- ✅ Complete signin/signup pages
- ✅ AuthContext for state management
- ✅ Route protection for dashboard
- ✅ Automatic redirects after auth

### 4. Dashboard Features
- ✅ Protected dashboard route
- ✅ Location-based hospital/pharmacy listings
- ✅ Google Maps integration
- ✅ User-specific content

### 5. Navigation
- ✅ Updated navbar with auth state
- ✅ Mobile-responsive design
- ✅ Conditional menu items based on auth status

## Running the Application

### Backend (Flask + Ollama)
```bash
# Terminal 1: Start Ollama
ollama serve

# Terminal 2: Start Flask backend
cd X:\bot\carebot-
.\venv\Scripts\activate
pip install -r requirements.txt
python simple_meditron_server.py
```

### Frontend (Next.js)
```bash
# Terminal 3: Start frontend
cd X:\bot\carebot-\wellnessai\frontend
npm install
npm run dev
```

## Testing the Chat

1. Navigate to `/chatassistant`
2. Try sample questions or type your own
3. Check browser console for debugging info
4. Ensure Flask backend is running on port 8000

## Testing the Dashboard

1. Sign up for a new account at `/auth/signup`
2. You'll be redirected to `/dashboard`
3. Allow location access when prompted
4. View nearby hospitals and pharmacies
5. Click "View on Map" or "Directions" for Google Maps integration

## Troubleshooting

### Chat Not Working
- Check if Flask backend is running on port 8000
- Verify Ollama is running with meditron model
- Check browser console for error messages
- Ensure CORS is enabled in Flask backend

### Location Services Not Working
- Ensure HTTPS or localhost for geolocation
- Check browser permissions for location access
- Verify mock data is loading correctly

### Authentication Issues
- Check if Node.js backend is running on port 5000
- Verify API endpoints are accessible
- Check browser console for auth errors
