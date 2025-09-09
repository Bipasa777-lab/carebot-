"use client";

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone?: string;
  rating?: number;
  distance?: number;
  latitude: number;
  longitude: number;
  specialties?: string[];
  emergency?: boolean;
  website?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone?: string;
  rating?: number;
  distance?: number;
  latitude: number;
  longitude: number;
  open24Hours?: boolean;
  website?: string;
}

export class LocationService {
  static async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }

  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  static async getNearbyHospitals(
    location: Location,
    radius: number = 10
  ): Promise<Hospital[]> {
    // Mock data - in production, this would call your backend API
    const mockHospitals: Hospital[] = [
      {
        id: "1",
        name: "Apollo Hospital",
        address: "123 Medical District, City Center",
        phone: "+1-555-0123",
        rating: 4.5,
        latitude: location.latitude + 0.01,
        longitude: location.longitude + 0.01,
        specialties: ["Emergency", "Cardiology", "Neurology"],
        emergency: true,
        website: "https://apollohospital.com",
      },
      {
        id: "2",
        name: "City General Hospital",
        address: "456 Health Street, Downtown",
        phone: "+1-555-0456",
        rating: 4.2,
        latitude: location.latitude - 0.005,
        longitude: location.longitude + 0.015,
        specialties: ["General Medicine", "Pediatrics"],
        emergency: true,
        website: "https://citygeneral.com",
      },
      {
        id: "3",
        name: "Metro Medical Center",
        address: "789 Care Avenue, Suburb",
        phone: "+1-555-0789",
        rating: 4.7,
        latitude: location.latitude + 0.02,
        longitude: location.longitude - 0.01,
        specialties: ["Orthopedics", "Surgery", "Emergency"],
        emergency: true,
        website: "https://metromedical.com",
      },
    ];

    // Calculate distances and filter by radius
    const hospitalsWithDistance = mockHospitals.map((hospital) => ({
      ...hospital,
      distance: this.calculateDistance(
        location.latitude,
        location.longitude,
        hospital.latitude,
        hospital.longitude
      ),
    }));

    return hospitalsWithDistance
      .filter((hospital) => hospital.distance! <= radius)
      .sort((a, b) => a.distance! - b.distance!);
  }

  static async getNearbyPharmacies(
    location: Location,
    radius: number = 5
  ): Promise<Pharmacy[]> {
    // Mock data - in production, this would call your backend API
    const mockPharmacies: Pharmacy[] = [
      {
        id: "1",
        name: "HealthPlus Pharmacy",
        address: "321 Medicine Lane, City Center",
        phone: "+1-555-0321",
        rating: 4.3,
        latitude: location.latitude + 0.008,
        longitude: location.longitude + 0.005,
        open24Hours: true,
        website: "https://healthplus.com",
      },
      {
        id: "2",
        name: "QuickCare Pharmacy",
        address: "654 Drug Street, Downtown",
        phone: "+1-555-0654",
        rating: 4.1,
        latitude: location.latitude - 0.003,
        longitude: location.longitude + 0.012,
        open24Hours: false,
        website: "https://quickcare.com",
      },
      {
        id: "3",
        name: "24/7 Meds",
        address: "987 Prescription Road, Suburb",
        phone: "+1-555-0987",
        rating: 4.6,
        latitude: location.latitude + 0.015,
        longitude: location.longitude - 0.008,
        open24Hours: true,
        website: "https://24meds.com",
      },
    ];

    // Calculate distances and filter by radius
    const pharmaciesWithDistance = mockPharmacies.map((pharmacy) => ({
      ...pharmacy,
      distance: this.calculateDistance(
        location.latitude,
        location.longitude,
        pharmacy.latitude,
        pharmacy.longitude
      ),
    }));

    return pharmaciesWithDistance
      .filter((pharmacy) => pharmacy.distance! <= radius)
      .sort((a, b) => a.distance! - b.distance!);
  }

  static getGoogleMapsUrl(latitude: number, longitude: number): string {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }

  static getGoogleMapsDirectionsUrl(
    fromLat: number,
    fromLng: number,
    toLat: number,
    toLng: number
  ): string {
    return `https://www.google.com/maps/dir/${fromLat},${fromLng}/${toLat},${toLng}`;
  }
}
