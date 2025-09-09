# Frontend Setup Guide for CareBot

This guide will help you set up the frontend to connect to the CareBot backend.

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **npm** or **yarn**
3. **Backend server running** (see backend SETUP.md)

## Installation Steps

### 1. Install Dependencies

Navigate to the frontend directory and install dependencies:

```bash
cd wellnessai/frontend
npm install
```

### 2. Environment Configuration

The frontend is already configured with the correct API URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start the Frontend Development Server

```bash
# Development mode
npm run dev
```

The frontend will start on `http://localhost:3000`

## API Integration

The frontend is now configured to connect to the backend with the following services:

### Authentication Service (`src/services/authService.ts`)
- **Signup**: Register new users
- **Login**: Authenticate users with email/mobile and password
- **Profile Management**: Get and update user profiles
- **Token Management**: Automatic token handling and storage

### Chat Service (`src/services/chatService.ts`)
- **Send Messages**: Send messages to the AI chatbot
- **Session Management**: Handle chat sessions with unique IDs
- **History**: Retrieve chat history for specific sessions

### Emergency Service (`src/services/emergencyService.ts`)
- **Emergency Trigger**: Trigger emergency alerts with location
- **Nearby Hospitals**: Find hospitals near user location
- **Emergency Contacts**: Manage emergency contact list
- **Location Services**: Get user's current location

### Hospital Service (`src/services/hospitalService.ts`)
- **Hospital Management**: CRUD operations for hospitals
- **Nearby Search**: Find hospitals by location
- **Distance Calculation**: Calculate distances between locations

## API Configuration (`src/lib/api.ts`)

The API configuration includes:
- **Base URL**: Points to backend server
- **Authentication**: Automatic token inclusion in requests
- **Error Handling**: Automatic 401 redirects for expired tokens
- **Timeout**: 10-second request timeout
- **CORS**: Configured for cross-origin requests

## Key Features

### 1. Automatic Authentication
- Tokens are automatically stored in localStorage
- Requests include Authorization headers
- Automatic logout on token expiration

### 2. Session Management
- Chat sessions are tracked with unique IDs
- Session persistence across browser sessions
- Automatic session cleanup

### 3. Error Handling
- Consistent error response format
- User-friendly error messages
- Automatic retry logic for network issues

### 4. Type Safety
- Full TypeScript support
- Interface definitions for all API responses
- Type checking for request/response data

## Testing the Connection

1. **Start the backend server** (see backend SETUP.md)
2. **Start the frontend server**: `npm run dev`
3. **Open browser**: Navigate to `http://localhost:3000`
4. **Test authentication**: Try signing up/logging in
5. **Test chat**: Send a message in the chat interface
6. **Test emergency features**: Use the emergency button

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for `http://localhost:3000`
   - Check backend server is running on port 5000

2. **Authentication Issues**
   - Verify JWT_SECRET is set in backend
   - Check token storage in browser localStorage
   - Ensure login/signup endpoints are working

3. **API Connection Errors**
   - Verify backend server is running
   - Check API_BASE_URL in frontend environment
   - Test API endpoints with Postman/curl

4. **Chat Issues**
   - Ensure chat controller is properly configured
   - Check session ID generation and storage
   - Verify message format matches backend expectations

## Development Workflow

1. **Backend First**: Always start backend server before frontend
2. **Environment Sync**: Keep frontend and backend environment variables in sync
3. **API Testing**: Test new endpoints with Postman before frontend integration
4. **Error Monitoring**: Check browser console and network tab for errors

## Production Deployment

For production deployment:
1. Update `NEXT_PUBLIC_API_URL` to production backend URL
2. Configure CORS in backend for production domain
3. Set up proper SSL certificates
4. Configure environment variables for production
5. Build frontend: `npm run build`
6. Deploy to hosting service (Vercel, Netlify, etc.)

## Next Steps

1. Test all API endpoints
2. Implement additional UI features
3. Add real-time chat functionality
4. Set up monitoring and analytics
5. Configure production environment

