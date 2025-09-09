'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '@/lib/api';

interface User {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  profile: {
    firstName: string;
    lastName: string;
    location?: string;
    avatar?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (emailOrMobile: string, password: string) => Promise<void>;
  signup: (userData: {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        // Verify token is still valid
        authAPI.getProfile().catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (emailOrMobile: string, password: string) => {
    try {
      const response = await authAPI.login({ emailOrMobile, password });
      
      if (response.success && response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle network errors specifically
      if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error') || error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please make sure the auth server is running on http://localhost:5000');
      }
      
      // Handle API errors
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      
      // Handle other errors
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await authAPI.signup(userData);
      
      if (response.success && response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
      } else {
        throw new Error(response.error || 'Signup failed');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Handle network errors specifically
      if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error') || error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please make sure the auth server is running on http://localhost:5000');
      }
      
      // Handle API errors
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      
      // Handle other errors
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      const updatedUser = { ...user, ...response.user };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Profile update failed');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
