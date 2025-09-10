#!/usr/bin/env python3
"""
Location Service for CareBot Backend
Provides hospital and pharmacy location services
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from datetime import datetime
import math
import json
import os

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sample hospital data (in production, this would come from a database)
SAMPLE_HOSPITALS = [
    # Delhi Hospitals
    {
        "id": "1",
        "name": "Apollo Hospital Delhi",
        "address": "123 Medical District, Delhi",
        "phone": "+91-11-555-0123",
        "rating": 4.5,
        "latitude": 28.6139,
        "longitude": 77.2090,
        "specialties": ["Emergency", "Cardiology", "Neurology"],
        "emergency": True,
        "website": "https://apollohospital.com",
        "insurance_accepted": ["Aetna", "Blue Cross", "Medicare"]
    },
    {
        "id": "2",
        "name": "City General Hospital Delhi",
        "address": "456 Health Street, Delhi",
        "phone": "+91-11-555-0456",
        "rating": 4.2,
        "latitude": 28.6149,
        "longitude": 77.2100,
        "specialties": ["General Medicine", "Pediatrics"],
        "emergency": True,
        "website": "https://citygeneral.com",
        "insurance_accepted": ["Aetna", "Medicaid"]
    },
    # Kolkata Hospitals
    {
        "id": "3",
        "name": "Apollo Gleneagles Hospital Kolkata",
        "address": "58 Canal Circular Road, Kolkata",
        "phone": "+91-33-2320-3040",
        "rating": 4.6,
        "latitude": 22.7705,
        "longitude": 88.5260,
        "specialties": ["Emergency", "Cardiology", "Neurology", "Oncology"],
        "emergency": True,
        "website": "https://apollohospitals.com",
        "insurance_accepted": ["Apollo Munich", "Star Health", "ICICI Lombard"]
    },
    {
        "id": "4",
        "name": "Fortis Hospital Kolkata",
        "address": "730 Anandapur, Kolkata",
        "phone": "+91-33-6628-4444",
        "rating": 4.4,
        "latitude": 22.7710,
        "longitude": 88.5265,
        "specialties": ["Emergency", "Cardiology", "Orthopedics"],
        "emergency": True,
        "website": "https://fortishealthcare.com",
        "insurance_accepted": ["Fortis Health Insurance", "Star Health"]
    },
    {
        "id": "5",
        "name": "AMRI Hospital Kolkata",
        "address": "16/1 Alipore Road, Kolkata",
        "phone": "+91-33-2440-0000",
        "rating": 4.3,
        "latitude": 22.7700,
        "longitude": 88.5255,
        "specialties": ["Emergency", "General Medicine", "Pediatrics"],
        "emergency": True,
        "website": "https://amrihospitals.com",
        "insurance_accepted": ["AMRI Health Insurance", "Star Health"]
    },
    {
        "id": "6",
        "name": "Ruby General Hospital Kolkata",
        "address": "Kasba, Kolkata",
        "phone": "+91-33-2440-0000",
        "rating": 4.2,
        "latitude": 22.7715,
        "longitude": 88.5270,
        "specialties": ["Emergency", "Cardiology", "Neurology"],
        "emergency": True,
        "website": "https://rubyhospital.com",
        "insurance_accepted": ["Ruby Health Insurance", "Star Health"]
    },
    {
        "id": "7",
        "name": "Peerless Hospital Kolkata",
        "address": "360 Panchasayar, Kolkata",
        "phone": "+91-33-2440-0000",
        "rating": 4.1,
        "latitude": 22.7702,
        "longitude": 88.5262,
        "specialties": ["Emergency", "General Medicine", "Surgery"],
        "emergency": True,
        "website": "https://peerlesshospital.com",
        "insurance_accepted": ["Peerless Health Insurance", "Star Health"]
    }
]

# Sample pharmacy data
SAMPLE_PHARMACIES = [
    # Delhi Pharmacies
    {
        "id": "1",
        "name": "HealthPlus Pharmacy Delhi",
        "address": "321 Medicine Lane, Delhi",
        "phone": "+91-11-555-0321",
        "rating": 4.3,
        "latitude": 28.6140,
        "longitude": 77.2095,
        "open24Hours": True,
        "website": "https://healthplus.com",
        "services": ["Prescription", "OTC", "Vaccinations"]
    },
    {
        "id": "2",
        "name": "QuickCare Pharmacy Delhi",
        "address": "654 Drug Street, Delhi",
        "phone": "+91-11-555-0654",
        "rating": 4.1,
        "latitude": 28.6145,
        "longitude": 77.2105,
        "open24Hours": False,
        "website": "https://quickcare.com",
        "services": ["Prescription", "OTC"]
    },
    # Kolkata Pharmacies
    {
        "id": "3",
        "name": "Apollo Pharmacy Kolkata",
        "address": "58 Canal Circular Road, Kolkata",
        "phone": "+91-33-2320-3040",
        "rating": 4.5,
        "latitude": 22.7706,
        "longitude": 88.5261,
        "open24Hours": True,
        "website": "https://apollopharmacy.com",
        "services": ["Prescription", "OTC", "Vaccinations", "Health Checkups"]
    },
    {
        "id": "4",
        "name": "MedPlus Pharmacy Kolkata",
        "address": "730 Anandapur, Kolkata",
        "phone": "+91-33-6628-4444",
        "rating": 4.2,
        "latitude": 22.7711,
        "longitude": 88.5266,
        "open24Hours": False,
        "website": "https://medplus.com",
        "services": ["Prescription", "OTC", "Vaccinations"]
    },
    {
        "id": "5",
        "name": "Netmeds Pharmacy Kolkata",
        "address": "16/1 Alipore Road, Kolkata",
        "phone": "+91-33-2440-0000",
        "rating": 4.4,
        "latitude": 22.7701,
        "longitude": 88.5256,
        "open24Hours": True,
        "website": "https://netmeds.com",
        "services": ["Prescription", "OTC", "Health Checkups"]
    },
    {
        "id": "6",
        "name": "1mg Pharmacy Kolkata",
        "address": "Kasba, Kolkata",
        "phone": "+91-33-2440-0000",
        "rating": 4.3,
        "latitude": 22.7716,
        "longitude": 88.5271,
        "open24Hours": True,
        "website": "https://1mg.com",
        "services": ["Prescription", "OTC", "Vaccinations"]
    },
    {
        "id": "7",
        "name": "Wellness Forever Pharmacy Kolkata",
        "address": "360 Panchasayar, Kolkata",
        "phone": "+91-33-2440-0000",
        "rating": 4.1,
        "latitude": 22.7703,
        "longitude": 88.5263,
        "open24Hours": False,
        "website": "https://wellnessforever.com",
        "services": ["Prescription", "OTC"]
    }
]

def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two points using Haversine formula"""
    R = 6371  # Earth's radius in kilometers
    
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    
    a = (math.sin(dlat/2) * math.sin(dlat/2) + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * 
         math.sin(dlon/2) * math.sin(dlon/2))
    
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

def get_nearby_hospitals(user_lat, user_lon, radius_km=10):
    """Get hospitals within specified radius"""
    nearby_hospitals = []
    
    for hospital in SAMPLE_HOSPITALS:
        distance = calculate_distance(
            user_lat, user_lon, 
            hospital['latitude'], hospital['longitude']
        )
        
        if distance <= radius_km:
            hospital_with_distance = hospital.copy()
            hospital_with_distance['distance'] = round(distance, 2)
            nearby_hospitals.append(hospital_with_distance)
    
    # Sort by distance
    nearby_hospitals.sort(key=lambda x: x['distance'])
    return nearby_hospitals

def get_nearby_pharmacies(user_lat, user_lon, radius_km=5):
    """Get pharmacies within specified radius"""
    nearby_pharmacies = []
    
    for pharmacy in SAMPLE_PHARMACIES:
        distance = calculate_distance(
            user_lat, user_lon, 
            pharmacy['latitude'], pharmacy['longitude']
        )
        
        if distance <= radius_km:
            pharmacy_with_distance = pharmacy.copy()
            pharmacy_with_distance['distance'] = round(distance, 2)
            nearby_pharmacies.append(pharmacy_with_distance)
    
    # Sort by distance
    nearby_pharmacies.sort(key=lambda x: x['distance'])
    return nearby_pharmacies

@app.route('/api/hospitals', methods=['GET'])
def get_all_hospitals():
    """Get all hospitals"""
    try:
        return jsonify({
            'success': True,
            'hospitals': SAMPLE_HOSPITALS,
            'count': len(SAMPLE_HOSPITALS)
        })
    except Exception as e:
        logger.error(f"Error fetching hospitals: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch hospitals'
        }), 500

@app.route('/api/hospitals/nearby', methods=['GET'])
def get_nearby_hospitals_endpoint():
    """Get nearby hospitals based on user location"""
    try:
        lat = request.args.get('lat', type=float)
        lng = request.args.get('lng', type=float)
        radius = request.args.get('radius', 10, type=int)
        
        if lat is None or lng is None:
            return jsonify({
                'success': False,
                'error': 'Latitude and longitude are required'
            }), 400
        
        hospitals = get_nearby_hospitals(lat, lng, radius)
        
        return jsonify({
            'success': True,
            'hospitals': hospitals,
            'count': len(hospitals),
            'user_location': {'latitude': lat, 'longitude': lng},
            'radius_km': radius
        })
        
    except Exception as e:
        logger.error(f"Error fetching nearby hospitals: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch nearby hospitals'
        }), 500

@app.route('/api/hospitals/<hospital_id>', methods=['GET'])
def get_hospital_by_id(hospital_id):
    """Get hospital by ID"""
    try:
        hospital = next((h for h in SAMPLE_HOSPITALS if h['id'] == hospital_id), None)
        
        if not hospital:
            return jsonify({
                'success': False,
                'error': 'Hospital not found'
            }), 404
        
        return jsonify({
            'success': True,
            'hospital': hospital
        })
        
    except Exception as e:
        logger.error(f"Error fetching hospital: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch hospital'
        }), 500

@app.route('/api/pharmacies', methods=['GET'])
def get_all_pharmacies():
    """Get all pharmacies"""
    try:
        return jsonify({
            'success': True,
            'pharmacies': SAMPLE_PHARMACIES,
            'count': len(SAMPLE_PHARMACIES)
        })
    except Exception as e:
        logger.error(f"Error fetching pharmacies: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch pharmacies'
        }), 500

@app.route('/api/pharmacies/nearby', methods=['GET'])
def get_nearby_pharmacies_endpoint():
    """Get nearby pharmacies based on user location"""
    try:
        lat = request.args.get('lat', type=float)
        lng = request.args.get('lng', type=float)
        radius = request.args.get('radius', 5, type=int)
        
        if lat is None or lng is None:
            return jsonify({
                'success': False,
                'error': 'Latitude and longitude are required'
            }), 400
        
        pharmacies = get_nearby_pharmacies(lat, lng, radius)
        
        return jsonify({
            'success': True,
            'pharmacies': pharmacies,
            'count': len(pharmacies),
            'user_location': {'latitude': lat, 'longitude': lng},
            'radius_km': radius
        })
        
    except Exception as e:
        logger.error(f"Error fetching nearby pharmacies: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch nearby pharmacies'
        }), 500

@app.route('/api/pharmacies/<pharmacy_id>', methods=['GET'])
def get_pharmacy_by_id(pharmacy_id):
    """Get pharmacy by ID"""
    try:
        pharmacy = next((p for p in SAMPLE_PHARMACIES if p['id'] == pharmacy_id), None)
        
        if not pharmacy:
            return jsonify({
                'success': False,
                'error': 'Pharmacy not found'
            }), 404
        
        return jsonify({
            'success': True,
            'pharmacy': pharmacy
        })
        
    except Exception as e:
        logger.error(f"Error fetching pharmacy: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch pharmacy'
        }), 500

@app.route('/api/location/nearby', methods=['GET'])
def get_nearby_services():
    """Get both hospitals and pharmacies nearby"""
    try:
        lat = request.args.get('lat', type=float)
        lng = request.args.get('lng', type=float)
        hospital_radius = request.args.get('hospital_radius', 10, type=int)
        pharmacy_radius = request.args.get('pharmacy_radius', 5, type=int)
        
        if lat is None or lng is None:
            return jsonify({
                'success': False,
                'error': 'Latitude and longitude are required'
            }), 400
        
        hospitals = get_nearby_hospitals(lat, lng, hospital_radius)
        pharmacies = get_nearby_pharmacies(lat, lng, pharmacy_radius)
        
        return jsonify({
            'success': True,
            'hospitals': hospitals,
            'pharmacies': pharmacies,
            'user_location': {'latitude': lat, 'longitude': lng},
            'hospital_radius_km': hospital_radius,
            'pharmacy_radius_km': pharmacy_radius
        })
        
    except Exception as e:
        logger.error(f"Error fetching nearby services: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch nearby services'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'location-service',
        'timestamp': datetime.utcnow().isoformat(),
        'hospitals_count': len(SAMPLE_HOSPITALS),
        'pharmacies_count': len(SAMPLE_PHARMACIES)
    })

if __name__ == '__main__':
    print("📍 Starting CareBot Location Service...")
    print("🌐 Server will run on http://localhost:5001")
    print("📋 Endpoints:")
    print("  - GET /api/hospitals (All hospitals)")
    print("  - GET /api/hospitals/nearby?lat=X&lng=Y (Nearby hospitals)")
    print("  - GET /api/hospitals/{id} (Hospital by ID)")
    print("  - GET /api/pharmacies (All pharmacies)")
    print("  - GET /api/pharmacies/nearby?lat=X&lng=Y (Nearby pharmacies)")
    print("  - GET /api/pharmacies/{id} (Pharmacy by ID)")
    print("  - GET /api/location/nearby?lat=X&lng=Y (Both hospitals & pharmacies)")
    print("  - GET /health (Health check)")
    print("=" * 60)
    print("✅ Sample data loaded:")
    print(f"   - {len(SAMPLE_HOSPITALS)} hospitals")
    print(f"   - {len(SAMPLE_PHARMACIES)} pharmacies")
    print("=" * 60)
    print("🌐 Starting server...")
    app.run(host='0.0.0.0', port=5001, debug=True)
