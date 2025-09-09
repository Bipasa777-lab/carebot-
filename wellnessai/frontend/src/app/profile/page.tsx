// src/app/profile/page.tsx

"use client";

import { useEffect, useState } from "react";
import { authAPI, usersAPI } from "@/lib/api";
import emergencyService from "@/services/emergencyService";
import hospitalService from "@/services/hospitalService";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
  });
  const [avatarDataUrl, setAvatarDataUrl] = useState<string>("");
  const [nearbyHospitals, setNearbyHospitals] = useState<any[]>([]);
  const [nearbyPharmacies, setNearbyPharmacies] = useState<any[]>([]);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await authAPI.getProfile();
        const user = data.user || data;
        setFormData({
          username: user?.fullName || "",
          email: user?.email || "",
          password: "",
          mobile: user?.mobileNumber || "",
          location: user?.profile?.location || "",
        });
        setAvatarDataUrl(user?.profile?.avatar || "");
      } catch (e) {
        // if unauthenticated, send to signin
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/signin';
        }
      }
      setAuthChecked(true);
    };
    loadProfile();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setAvatarDataUrl(base64);
      try {
        await usersAPI.updateProfile({ profile: { avatar: base64 } });
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  const locateAndSuggest = async () => {
    try {
      const { latitude, longitude } = await emergencyService.getCurrentLocation();
      const hospitals = await hospitalService.getNearby(latitude, longitude);
      const pharmacies = await emergencyService.getNearbyPharmacies(latitude, longitude);
      setNearbyHospitals(hospitals);
      setNearbyPharmacies(pharmacies);
      setFormData((prev) => ({ ...prev, location: `${latitude},${longitude}` }));
      try {
        await usersAPI.updateProfile({ profile: { location: `${latitude},${longitude}` } });
      } catch {}
    } catch (err) {}
  };

  if (!authChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="text-gray-600">Loading profile…</div>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Sidebar (only visible on md and up) */}
        <aside className="hidden md:block w-12 md:w-16 bg-gray-200 p-2"></aside>

        {/* Profile Section for mobile (avatar above form) */}
        <section className="flex flex-col items-center justify-center w-full lg:hidden bg-gray-50 border-b px-6 py-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-cyan-300 flex items-center justify-center bg-gray-100">
              <img
                src={avatarDataUrl || "/avatar-placeholder.png"}
                alt="avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full"
              />
            </div>
            <label className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer">
              <Camera className="w-5 h-5 text-gray-600" />
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>

          {/* Greeting */}
          <div className="mt-6 text-center">
            <p className="text-lg sm:text-xl font-semibold">Hi,</p>
            <p className="text-xl sm:text-2xl font-bold">
              {formData.username || "User Name"}
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="flex-1 p-6 flex flex-col justify-center">
          <form className="space-y-6 w-full sm:w-[80%] mx-auto" onSubmit={(e)=>e.preventDefault()}>
            <div>
              <label className="text-xs font-semibold">USER NAME</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">E-MAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">MOBILE NUMBER</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">LOCATION</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-2 text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="button"
                className="w-full sm:w-auto bg-cyan-100 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
              >
                Edit
              </button>

              {/* Save Button visible on phone */}
              <button
                type="button"
                className="block lg:hidden w-full sm:w-auto bg-cyan-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
                onClick={locateAndSuggest}
              >
                Use My Location
              </button>
            </div>
          </form>
        </section>

        {/* Profile Section for desktop/tablet */}
        <section className="hidden lg:flex flex-col items-center justify-center w-[45%] bg-gray-50 border-t lg:border-t-0 lg:border-l px-6 py-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-cyan-300 flex items-center justify-center bg-gray-100">
              <img
                src="/avatar-placeholder.png"
                alt="avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full"
              />
            </div>
            <button className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Greeting */}
          <div className="mt-6 text-center">
            <p className="text-lg sm:text-xl font-semibold">Hi,</p>
            <p className="text-xl sm:text-2xl font-bold">
              {formData.username || "User Name"}
            </p>
          </div>

          {/* Save Button for desktop/tablet */}
          <button
            type="button"
            className="mt-6 w-full sm:w-auto bg-cyan-100 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
            onClick={locateAndSuggest}
          >
            Use My Location
          </button>
          {nearbyHospitals?.length > 0 && (
            <div className="w-full mt-6 text-left">
              <h3 className="font-semibold mb-2">Nearby Hospitals</h3>
              <ul className="list-disc ml-6 space-y-1">
                {nearbyHospitals.map((h: any, i: number) => (
                  <li key={i}>{h.name || h.title || "Hospital"}</li>
                ))}
              </ul>
            </div>
          )}
          {nearbyPharmacies?.length > 0 && (
            <div className="w-full mt-6 text-left">
              <h3 className="font-semibold mb-2">Nearby Pharmacies</h3>
              <ul className="list-disc ml-6 space-y-1">
                {nearbyPharmacies.map((p: any, i: number) => (
                  <li key={i}>{p.name || 'Pharmacy'}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
