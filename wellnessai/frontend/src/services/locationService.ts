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
    // Try browser geolocation first; on error or timeout, fall back to IP-based location
    const geolocationPromise = new Promise<Location>((resolve, reject) => {
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
          enableHighAccuracy: false, // avoid slow GPS on desktops; still accurate enough
          timeout: 20000, // give more time before timing out
          maximumAge: 300000, // 5 minutes cache
        }
      );
    });

    try {
      return await geolocationPromise;
    } catch (geoError) {
      // Fall back to IP geolocation
      const ipLocation = await this.getLocationViaIP();
      if (ipLocation) return ipLocation;
      throw geoError instanceof Error ? geoError : new Error("Failed to get location");
    }
  }

  private static async getLocationViaIP(): Promise<Location | null> {
    try {
      // Primary: ipapi.co (no key needed; subject to rate limits)
      const res = await fetch("https://ipapi.co/json/");
      if (res.ok) {
        const data: any = await res.json();
        if (typeof data?.latitude === "number" && typeof data?.longitude === "number") {
          return { latitude: data.latitude, longitude: data.longitude };
        }
        // Some variants use lat/long keys
        if (typeof data?.lat === "number" && typeof data?.lon === "number") {
          return { latitude: data.lat, longitude: data.lon };
        }
      }
    } catch (_) {}

    try {
      // Secondary: ipinfo.io (may be approximate; usually no key needed for dev)
      const res2 = await fetch("https://ipinfo.io/json");
      if (res2.ok) {
        const data2: any = await res2.json();
        if (typeof data2?.loc === "string") {
          const [latStr, lngStr] = data2.loc.split(",");
          const lat = parseFloat(latStr);
          const lng = parseFloat(lngStr);
          if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
            return { latitude: lat, longitude: lng };
          }
        }
      }
    } catch (_) {}

    return null;
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
