#!/usr/bin/env python3
"""
CareBot System Test Script
Tests all services to ensure they're working properly
"""

import requests
import json
import time

def test_service(name, url, expected_status=200):
    """Test a service endpoint"""
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == expected_status:
            print(f"✅ {name}: OK")
            return True
        else:
            print(f"❌ {name}: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ {name}: {str(e)}")
        return False

def test_chat_service():
    """Test the chat service with a sample query"""
    try:
        response = requests.post(
            "http://localhost:8000/api/medical-chat",
            json={"message": "I have a headache", "user_id": "test"},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        if response.status_code == 200:
            data = response.json()
            if data.get('response', {}).get('message'):
                print("✅ Chat Service: OK (Response received)")
                return True
        print(f"❌ Chat Service: HTTP {response.status_code}")
        return False
    except Exception as e:
        print(f"❌ Chat Service: {str(e)}")
        return False

def test_location_service():
    """Test the location service with sample coordinates"""
    try:
        response = requests.get(
            "http://localhost:5001/api/hospitals/nearby?lat=28.6139&lng=77.2090&radius=10",
            timeout=10
        )
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('hospitals'):
                print(f"✅ Location Service: OK ({len(data['hospitals'])} hospitals found)")
                return True
        print(f"❌ Location Service: HTTP {response.status_code}")
        return False
    except Exception as e:
        print(f"❌ Location Service: {str(e)}")
        return False

def main():
    print("🔍 Testing CareBot System...")
    print("=" * 50)
    
    # Test all services
    services = [
        ("Auth Server", "http://localhost:5000/health"),
        ("Chat Server", "http://localhost:8000/health"),
        ("Location Service", "http://localhost:5001/health"),
    ]
    
    results = []
    for name, url in services:
        results.append(test_service(name, url))
    
    print("\n🧪 Testing Advanced Features...")
    print("-" * 30)
    
    # Test chat functionality
    results.append(test_chat_service())
    
    # Test location functionality
    results.append(test_location_service())
    
    print("\n" + "=" * 50)
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print(f"🎉 All tests passed! ({passed}/{total})")
        print("✅ CareBot system is fully operational!")
    else:
        print(f"⚠️  {passed}/{total} tests passed")
        print("❌ Some services may not be working properly")
    
    print("\nServices Status:")
    print("- Auth Server: http://localhost:5000")
    print("- Chat Server: http://localhost:8000") 
    print("- Location Service: http://localhost:5001")
    print("- Frontend: http://localhost:3000")

if __name__ == "__main__":
    main()
