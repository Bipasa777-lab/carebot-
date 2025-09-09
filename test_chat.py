#!/usr/bin/env python3
"""
Test script to verify the medical chat API is working
"""

import requests
import json

def test_medical_chat():
    """Test the medical chat endpoint"""
    url = "http://localhost:8000/api/medical-chat"
    
    test_message = {
        "message": "I have a headache, what should I do?",
        "user_id": "test_user"
    }
    
    try:
        print("Testing medical chat API...")
        print(f"URL: {url}")
        print(f"Message: {test_message['message']}")
        print("-" * 50)
        
        response = requests.post(url, json=test_message, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ SUCCESS! API is working")
            print(f"Response: {data.get('response', {}).get('message', 'No message')[:100]}...")
            print(f"Source: {data.get('source', 'Unknown')}")
            print(f"Confidence: {data.get('confidence', 'Unknown')}")
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ CONNECTION ERROR: Cannot connect to backend server")
        print("Make sure the Flask server is running on port 8000")
    except requests.exceptions.Timeout:
        print("❌ TIMEOUT ERROR: Request took too long")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")

def test_health():
    """Test the health endpoint"""
    url = "http://localhost:8000/health"
    
    try:
        print("\nTesting health endpoint...")
        response = requests.get(url, timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Health check passed")
            print(f"Status: {data.get('status', 'Unknown')}")
            print(f"Services: {data.get('services', {})}")
        else:
            print(f"❌ Health check failed: HTTP {response.status_code}")
            
    except Exception as e:
        print(f"❌ Health check error: {str(e)}")

if __name__ == "__main__":
    print("CareBot API Test")
    print("=" * 50)
    
    test_health()
    test_medical_chat()
    
    print("\n" + "=" * 50)
    print("Test completed!")
