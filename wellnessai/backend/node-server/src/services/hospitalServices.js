const hospitals = require("../../shared/database/seeds/hospitals.json");

class HospitalService {
  async listHospitalsBySpecialty(specialty) {
    return hospitals.filter((hospital) =>
      hospital.specialties.includes(specialty.toLowerCase())
    );
  }

  async getHospitalById(hospitalId) {
    return hospitals.find((hospital) => hospital.id === hospitalId);
  }

  async searchHospitals(query) {
    const q = query.toLowerCase();
    return hospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(q) ||
      hospital.address.toLowerCase().includes(q)
    );
  }
}

module.exports = new HospitalService();
