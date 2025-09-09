# Frontend-Backend Connection Test

This script helps you test the connection between the frontend and backend.

## Prerequisites

1. Make sure the backend server is running on port 5000
2. Make sure the frontend server is running on port 3000
3. MongoDB should be running and accessible

## Test Steps

### 1. Test Backend Server
```bash
# Check if backend is running
curl http://localhost:5000/api/auth/signup -X POST -H "Content-Type: application/json" -d '{
  "fullName": "Test User",
  "email": "test@example.com",
  "mobileNumber": "+1234567890",
  "password": "password123",
  "confirmPassword": "password123"
}'
```

### 2. Test Frontend-Backend Connection
1. Open browser and go to `http://localhost:3000`
2. Navigate to `/auth/signup`
3. Fill out the signup form
4. Check browser console for any errors
5. Check network tab for API requests

### 3. Test Authentication Flow
1. Sign up with a new account
2. Try logging in with the same credentials
3. Navigate to the chat page
4. Send a test message

### 4. Common Issues and Solutions

#### CORS Errors
- Check that backend CORS is configured for `http://localhost:3000`
- Verify backend server is running on port 5000

#### Authentication Errors
- Check JWT_SECRET is set in backend .env
- Verify MongoDB connection
- Check token storage in browser localStorage

#### API Connection Errors
- Verify API_BASE_URL in frontend .env.local
- Check backend server status
- Test API endpoints with Postman

## Expected Behavior

1. **Signup**: Should create account and redirect to chat
2. **Login**: Should authenticate and redirect to chat
3. **Chat**: Should send messages and receive responses
4. **Session**: Should maintain chat session across page reloads
5. **Auth**: Should protect chat page from unauthenticated users

## Debugging

### Frontend Console
Check browser console for:
- Network errors
- JavaScript errors
- API response errors

### Backend Logs
Check backend console for:
- Database connection errors
- Authentication errors
- API request logs

### Network Tab
Check browser network tab for:
- Failed API requests
- Response status codes
- Request/response data

## Success Indicators

✅ Backend server running on port 5000
✅ Frontend server running on port 3000
✅ MongoDB connected
✅ Signup form submits successfully
✅ Login form authenticates user
✅ Chat page loads for authenticated users
✅ Messages send and receive responses
✅ Session persists across page reloads

