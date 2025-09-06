# CareBot Backend Setup Guide

This guide will help you set up the backend authentication system for CareBot.

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **npm** or **yarn**

## Installation Steps

### 1. Install Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd wellnessai/backend/node-server
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `node-server` directory:

```bash
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/carebot

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Set Up MongoDB

#### Option A: Local MongoDB Installation

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Create a database named `carebot`

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` in your `.env` file

### 4. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Request Examples

#### Signup
```json
POST /api/auth/signup
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "+1234567890",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Login
```json
POST /api/auth/login
{
  "emailOrMobile": "john@example.com",
  "password": "password123"
}
```

#### Update Profile
```json
PUT /api/auth/profile
Authorization: Bearer <token>
{
  "fullName": "John Smith",
  "location": "New York"
}
```

## Database Schema

### User Model
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  mobileNumber: String (required, unique),
  password: String (required, hashed),
  profile: {
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    bloodGroup: String,
    allergies: [String],
    chronicConditions: [String],
    location: String,
    avatar: String
  },
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  preferences: {
    language: String,
    notifications: Boolean,
    dataPrivacy: String
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS protection
- Input validation
- Error handling

## Testing the API

You can test the API endpoints using tools like:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Ensure network connectivity

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill process using the port

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set
   - Check token expiration

4. **CORS Errors**
   - Update CORS_ORIGIN in `.env`
   - Check frontend URL

## Next Steps

1. Set up the frontend to connect to this backend
2. Implement additional features (chat, emergency contacts, etc.)
3. Add more security measures for production
4. Set up monitoring and logging

