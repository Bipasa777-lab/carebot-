#!/usr/bin/env python3
"""
System diagnostic script for CareBot
"""

import sys
import subprocess
import os
import requests

def check_python():
    """Check Python version and packages"""
    print("🐍 Checking Python...")
    print(f"Python version: {sys.version}")
    
    required_packages = ['flask', 'flask_cors', 'requests']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package} is installed")
        except ImportError:
            print(f"❌ {package} is missing")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\n📦 Install missing packages with:")
        print(f"pip install {' '.join(missing_packages)}")
    
    return len(missing_packages) == 0

def check_node():
    """Check Node.js and npm"""
    print("\n📦 Checking Node.js...")
    
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Node.js version: {result.stdout.strip()}")
        else:
            print("❌ Node.js not found")
            return False
    except FileNotFoundError:
        print("❌ Node.js not found")
        return False
    
    try:
        result = subprocess.run(['npm', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ npm version: {result.stdout.strip()}")
        else:
            print("❌ npm not found")
            return False
    except FileNotFoundError:
        print("❌ npm not found")
        return False
    
    return True

def check_ports():
    """Check if ports are available"""
    print("\n🔌 Checking ports...")
    
    import socket
    
    ports_to_check = [3000, 8000]
    available_ports = []
    
    for port in ports_to_check:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('localhost', port))
        sock.close()
        
        if result == 0:
            print(f"⚠️  Port {port} is in use")
        else:
            print(f"✅ Port {port} is available")
            available_ports.append(port)
    
    return available_ports

def check_ollama():
    """Check if Ollama is running"""
    print("\n🤖 Checking Ollama...")
    
    try:
        response = requests.get('http://localhost:11434/api/tags', timeout=5)
        if response.status_code == 200:
            print("✅ Ollama is running")
            models = response.json().get('models', [])
            if models:
                print(f"✅ Available models: {[m.get('name', 'Unknown') for m in models]}")
                meditron_available = any('meditron' in m.get('name', '') for m in models)
                if meditron_available:
                    print("✅ Meditron model is available")
                else:
                    print("⚠️  Meditron model not found. Run: ollama pull meditron")
            else:
                print("⚠️  No models found. Run: ollama pull meditron")
            return True
        else:
            print(f"❌ Ollama responded with status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Ollama is not running")
        print("   Install from: https://ollama.ai")
        print("   Then run: ollama serve")
        return False
    except Exception as e:
        print(f"❌ Error checking Ollama: {e}")
        return False

def check_files():
    """Check if required files exist"""
    print("\n📁 Checking files...")
    
    required_files = [
        'simple_meditron_server.py',
        'wellnessai/frontend/package.json',
        'wellnessai/frontend/src/app/chatassistant/page.tsx'
    ]
    
    all_exist = True
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} missing")
            all_exist = False
    
    return all_exist

def main():
    print("🔍 CareBot System Diagnostic")
    print("=" * 50)
    
    python_ok = check_python()
    node_ok = check_node()
    ports = check_ports()
    ollama_ok = check_ollama()
    files_ok = check_files()
    
    print("\n" + "=" * 50)
    print("📊 SUMMARY")
    print("=" * 50)
    
    if python_ok and node_ok and files_ok:
        print("✅ System is ready!")
        print("\n🚀 To start the application:")
        print("1. Start Ollama: ollama serve")
        print("2. Start Backend: python simple_meditron_server.py")
        print("3. Start Frontend: cd wellnessai/frontend && npm run dev")
        print("\nOr simply run: start_servers.bat")
    else:
        print("❌ System needs fixes:")
        if not python_ok:
            print("   - Install missing Python packages")
        if not node_ok:
            print("   - Install Node.js and npm")
        if not files_ok:
            print("   - Check file structure")
        if not ollama_ok:
            print("   - Install and start Ollama")
    
    print(f"\nAvailable ports: {ports}")
    print("\nFor detailed help, see TROUBLESHOOTING.md")

if __name__ == "__main__":
    main()
