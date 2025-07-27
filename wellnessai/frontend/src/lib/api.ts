import axios from "axios";

// ✅ Safely remove trailing slashes and provide default fallback URLs
const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "")) ||
  "http://localhost:3000/api";

const AI_SERVER_URL =
  (process.env.NEXT_PUBLIC_AI_SERVER_URL?.replace(/\/+$/, "")) ||
  "http://localhost:8000/api";

/**
 * Send message to the AI (Flask server)
 */
export async function sendMedicalQuery(message: string, userId: string) {
  try {
    const response = await axios.post(`${AI_SERVER_URL}/medical-chat`, {
      message,
      user_id: userId,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error sending medical query:", error);
    throw error;
  }
}

/**
 * Register a new user
 */
export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      password,
      profile: {
        firstName,
        lastName,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error);
    throw error;
  }
}

/**
 * Log in an existing user
 */
export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * Get user profile
 */
export async function fetchUserProfile(token: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

/**
 * Fetch nearby hospitals
 */
export async function fetchNearbyHospitals(lat: number, lng: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/hospitals/nearby`, {
      params: { lat, lng },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
}
