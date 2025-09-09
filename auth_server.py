#!/usr/bin/env python3
"""
Simple Authentication Server for CareBot
This provides the auth endpoints that the frontend expects
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import hashlib
import uuid
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Simple in-memory storage (in production, use a real database)
users_db = {}
tokens_db = {}

def hash_password(password):
    """Simple password hashing"""
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token():
    """Generate a simple token"""
    return str(uuid.uuid4())

def verify_token(token):
    """Verify if token is valid"""
    return token in tokens_db

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """User registration endpoint"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['fullName', 'email', 'mobileNumber', 'password', 'confirmPassword']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate email format
        email = data['email'].lower()
        if '@' not in email or '.' not in email.split('@')[1]:
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Validate password match
        if data['password'] != data['confirmPassword']:
            return jsonify({'error': 'Passwords do not match'}), 400
        
        # Check if user already exists
        if email in users_db:
            return jsonify({'error': 'User already exists with this email'}), 400
        
        # Create user
        user_id = str(uuid.uuid4())
        user = {
            'id': user_id,
            'fullName': data['fullName'],
            'email': email,
            'mobileNumber': data['mobileNumber'],
            'password': hash_password(data['password']),
            'createdAt': datetime.utcnow().isoformat()
        }
        
        users_db[email] = user
        
        # Generate token
        token = generate_token()
        tokens_db[token] = {
            'user_id': user_id,
            'email': email,
            'created_at': datetime.utcnow().isoformat()
        }
        
        # Return success response
        return jsonify({
            'success': True,
            'message': 'User created successfully',
            'token': token,
            'user': {
                'id': user_id,
                'fullName': user['fullName'],
                'email': user['email'],
                'mobileNumber': user['mobileNumber']
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': f'Signup failed: {str(e)}'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if 'emailOrMobile' not in data or 'password' not in data:
            return jsonify({'error': 'Email/mobile and password are required'}), 400
        
        email_or_mobile = data['emailOrMobile'].lower()
        password = data['password']
        
        # Find user by email or mobile
        user = None
        for email, user_data in users_db.items():
            if email == email_or_mobile or user_data['mobileNumber'] == email_or_mobile:
                user = user_data
                break
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Verify password
        if user['password'] != hash_password(password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate token
        token = generate_token()
        tokens_db[token] = {
            'user_id': user['id'],
            'email': user['email'],
            'created_at': datetime.utcnow().isoformat()
        }
        
        # Return success response
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user['id'],
                'fullName': user['fullName'],
                'email': user['email'],
                'mobileNumber': user['mobileNumber']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Login failed: {str(e)}'}), 500

@app.route('/api/auth/profile', methods=['GET'])
def get_profile():
    """Get user profile endpoint"""
    try:
        # Get token from Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Authorization token required'}), 401
        
        token = auth_header.split(' ')[1]
        if not verify_token(token):
            return jsonify({'error': 'Invalid token'}), 401
        
        token_data = tokens_db[token]
        user_id = token_data['user_id']
        
        # Find user
        user = None
        for email, user_data in users_db.items():
            if user_data['id'] == user_id:
                user = user_data
                break
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'fullName': user['fullName'],
                'email': user['email'],
                'mobileNumber': user['mobileNumber']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Profile fetch failed: {str(e)}'}), 500

@app.route('/api/auth/profile', methods=['PUT'])
def update_profile():
    """Update user profile endpoint"""
    try:
        # Get token from Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Authorization token required'}), 401
        
        token = auth_header.split(' ')[1]
        if not verify_token(token):
            return jsonify({'error': 'Invalid token'}), 401
        
        token_data = tokens_db[token]
        user_id = token_data['user_id']
        
        # Find user
        user = None
        user_email = None
        for email, user_data in users_db.items():
            if user_data['id'] == user_id:
                user = user_data
                user_email = email
                break
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        
        # Update allowed fields
        if 'fullName' in data:
            user['fullName'] = data['fullName']
        if 'email' in data:
            new_email = data['email'].lower()
            if new_email != user_email and new_email in users_db:
                return jsonify({'error': 'Email already in use'}), 400
            user['email'] = new_email
        if 'mobileNumber' in data:
            user['mobileNumber'] = data['mobileNumber']
        
        # Update in database
        if user_email != user['email']:
            users_db[user['email']] = user
            del users_db[user_email]
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully',
            'user': {
                'id': user['id'],
                'fullName': user['fullName'],
                'email': user['email'],
                'mobileNumber': user['mobileNumber']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Profile update failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'auth-server',
        'timestamp': datetime.utcnow().isoformat(),
        'users_count': len(users_db)
    }), 200

if __name__ == '__main__':
    print("🔐 Starting CareBot Authentication Server...")
    print("🌐 Server will run on http://localhost:5000")
    print("📋 Endpoints:")
    print("  - POST /api/auth/signup")
    print("  - POST /api/auth/login")
    print("  - GET /api/auth/profile")
    print("  - PUT /api/auth/profile")
    print("  - GET /health")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
