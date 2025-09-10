"use client";

import React from "react";
import Dashboard from "../../components/Dashboard";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#bcf3f3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0c0966] mx-auto mb-4"></div>
          <p className="text-[#0c0966] font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to signin
  }

  return (
    <div className="min-h-screen bg-[#bcf3f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0c0966]">
            Welcome back, {user.fullName || user.email}!
          </h1>
          <p className="text-gray-700 mt-2">
            Here are the nearest hospitals and pharmacies to your location.
          </p>
        </div>
        
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
