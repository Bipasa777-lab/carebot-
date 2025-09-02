"use client";
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Sign up
  signup: async (userData: {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
  }) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Login
  login: async (credentials: {
    emailOrMobile: string;
    password: string;
  }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData: {
    fullName?: string;
    email?: string;
    mobileNumber?: string;
    location?: string;
  }) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },
};

// Chat API functions
export const chatAPI = {
  sendMessage: async (message: string) => {
    const response = await api.post('/chat/message', { message });
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data;
  },
};

// Emergency API functions
export const emergencyAPI = {
  getContacts: async () => {
    const response = await api.get('/emergency/contacts');
    return response.data;
  },

  addContact: async (contact: {
    name: string;
    phone: string;
    relationship: string;
  }) => {
    const response = await api.post('/emergency/contacts', contact);
    return response.data;
  },
};

// Hospital API functions
export const hospitalAPI = {
  getNearby: async (latitude: number, longitude: number) => {
    const response = await api.get(`/hospitals/nearby?lat=${latitude}&lng=${longitude}`);
    return response.data;
  },
};

export default api;
