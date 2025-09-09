#!/usr/bin/env python3
"""
Complete system test for CareBot
Tests all services and endpoints
"""

import requests
import json
import time

def test_auth_server():
    """Test authentication server"""
    print("🔐 Testing Authentication Server...")
    
    try:
        # Test health
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            print("✅ Auth server is running")
        else:
            print(f"❌ Auth server health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Auth server not accessible: {e}")
        return False
    
    # Test signup
    try:
        signup_data = {
            "fullName": "Test User",
            "email": "test@example.com",
            "mobileNumber": "1234567890",
            "password": "testpassword",
            "confirmPassword": "testpassword"
        }
        
        response = requests.post('http://localhost:5000/api/auth/signup', json=signup_data, timeout=10)
        if response.status_code == 201:
            data = response.json()
            print("✅ Signup test passed")
            token = data.get('token')
            return token
        else:
            print(f"❌ Signup failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Signup test error: {e}")
        return False

def test_medical_server():
    """Test medical AI server"""
    print("\n🤖 Testing Medical AI Server...")
    
    try:
        # Test health
        response = requests.get('http://localhost:8000/health', timeout=5)
        if response.status_code == 200:
            print("✅ Medical AI server is running")
        else:
            print(f"❌ Medical AI server health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Medical AI server not accessible: {e}")
        return False
    
    # Test medical chat
    try:
        chat_data = {
            "message": "I have a headache, what should I do?",
            "user_id": "test_user"
        }
        
        response = requests.post('http://localhost:8000/api/medical-chat', json=chat_data, timeout=30)
        if response.status_code == 200:
            print("✅ Medical chat test passed")
            return True
        elif response.status_code == 503:
            print("⚠️  Medical chat unavailable (Ollama not running)")
            return True  # This is expected if Ollama isn't running
        else:
            print(f"❌ Medical chat failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Medical chat test error: {e}")
        return False

def test_frontend():
    """Test frontend server"""
    print("\n🌐 Testing Frontend Server...")
    
    try:
        response = requests.get('http://localhost:3000', timeout=10)
        if response.status_code == 200:
            print("✅ Frontend server is running")
            return True
        else:
            print(f"❌ Frontend server failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Frontend server not accessible: {e}")
        return False

def main():
    print("🧪 CareBot Complete System Test")
    print("=" * 50)
    
    # Test all services
    auth_ok = test_auth_server()
    medical_ok = test_medical_server()
    frontend_ok = test_frontend()
    
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS")
    print("=" * 50)
    
    if auth_ok and frontend_ok:
        print("🎉 Core system is working!")
        print("\n✅ You can now:")
        print("1. Open http://localhost:3000")
        print("2. Click 'Get Started Free'")
        print("3. Sign up for an account")
        print("4. Access the dashboard")
        print("5. Use medical chat (if Ollama is running)")
        
        if not medical_ok:
            print("\n⚠️  Medical AI chat may not work until Ollama is running:")
            print("   - Start Ollama: ollama serve")
            print("   - Pull model: ollama pull meditron")
    else:
        print("❌ Some services are not working:")
        if not auth_ok:
            print("   - Authentication server needs to be started")
        if not frontend_ok:
            print("   - Frontend server needs to be started")
        if not medical_ok:
            print("   - Medical AI server needs to be started")
        
        print("\n💡 To fix:")
        print("   Run: start_all_services.bat")
    
    print("\n" + "=" * 50)

if __name__ == "__main__":
    main()
