const axios = require("axios");

class LocationService {
  async getNearbyHospitals(lat, lng) {
    try {
      const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${mapsApiKey}`;

      const response = await axios.get(url);
      return response.data.results;
    } catch (err) {
      console.error("LocationService Error:", err.message);
      return [];
    }
  }
}

module.exports = new LocationService();
