#!/usr/bin/env python3
"""
Quick test to verify the medical chat API
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
        print("🔍 Testing medical chat API...")
        print(f"URL: {url}")
        print(f"Message: {test_message['message']}")
        print("-" * 50)
        
        response = requests.post(url, json=test_message, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ SUCCESS! Chat is working")
            print(f"Response: {data.get('response', {}).get('message', 'No message')[:100]}...")
            return True
        elif response.status_code == 503:
            data = response.json()
            print("⚠️  SERVICE UNAVAILABLE")
            print(f"Error: {data.get('error', 'Unknown error')}")
            print(f"Details: {data.get('details', 'No details')}")
            print("💡 Solution: Make sure Ollama is running (ollama serve)")
            return False
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            try:
                error_data = response.json()
                print(f"Error: {error_data.get('error', 'Unknown error')}")
                print(f"Details: {error_data.get('details', 'No details')}")
            except:
                print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ CONNECTION ERROR: Cannot connect to backend server")
        print("💡 Solution: Make sure Flask backend is running (python simple_meditron_server.py)")
        return False
    except requests.exceptions.Timeout:
        print("❌ TIMEOUT ERROR: Request took too long")
        print("💡 Solution: Check if Ollama is responding")
        return False
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

if __name__ == "__main__":
    print("CareBot Quick Test")
    print("=" * 50)
    
    success = test_medical_chat()
    
    print("\n" + "=" * 50)
    if success:
        print("🎉 Everything is working! You can now use the chat assistant.")
    else:
        print("🔧 Please fix the issues above and try again.")
        print("\nQuick fixes:")
        print("1. Start Ollama: ollama serve")
        print("2. Pull model: ollama pull meditron")
        print("3. Start backend: python simple_meditron_server.py")
        print("4. Start frontend: cd wellnessai/frontend && npm run dev")
