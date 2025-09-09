#!/usr/bin/env python3
"""
Test script for CareBot Auth Server
"""

import requests
import json

def test_auth_server():
    """Test the authentication server"""
    print("🔐 Testing CareBot Auth Server...")
    print("=" * 40)
    
    # Test 1: Health check
    print("1. Testing health endpoint...")
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            print("✅ Auth server is running")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Cannot connect to auth server: {e}")
        print("   Make sure to run: python simple_auth_server.py")
        return False
    
    # Test 2: Signup
    print("\n2. Testing signup endpoint...")
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
            print(f"   User ID: {data['user']['id']}")
            print(f"   Token: {data['token'][:20]}...")
            return True
        else:
            print(f"❌ Signup failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Signup test error: {e}")
        return False

def main():
    print("🧪 CareBot Auth Server Test")
    print("=" * 50)
    
    if test_auth_server():
        print("\n🎉 Auth server is working correctly!")
        print("\n✅ You can now:")
        print("1. Start the frontend: cd wellnessai/frontend && npm run dev")
        print("2. Open http://localhost:3000")
        print("3. Try signing up - it should work now!")
    else:
        print("\n❌ Auth server is not working")
        print("\n💡 To fix:")
        print("1. Run: python simple_auth_server.py")
        print("2. Or run: start_auth_server.bat")
        print("3. Then run this test again")

if __name__ == "__main__":
    main()
