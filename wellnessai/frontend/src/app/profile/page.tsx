// src/app/profile/page.tsx

"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] md:w-[70%] lg:w-[60%] flex bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Sidebar (just placeholder) */}
        <aside className="w-12 md:w-16 bg-gray-200 p-2"></aside>

        {/* Form Section */}
        <section className="flex-1 p-6 flex flex-col justify-center">
          <form className="space-y-6 w-[80%] mx-auto">
            <div>
              <label className="text-xs font-semibold">USER NAME</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">E-MAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">MOBILE NUMBER</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">LOCATION</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none p-1"
              />
            </div>

            <button
              type="button"
              className="bg-cyan-100 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
            >
              Edit
            </button>
          </form>
        </section>

        {/* Profile Section */}
        <section className="flex flex-col items-center justify-center w-[45%] bg-white border-l px-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-cyan-300 flex items-center justify-center bg-gray-100">
              <img
                src="/avatar-placeholder.png"
                alt="avatar"
                className="w-28 h-28 rounded-full"
              />
            </div>
            <button className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Greeting */}
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold">Hi,</p>
            <p className="text-2xl font-bold">{formData.username || "User Name"}</p>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="mt-6 bg-cyan-100 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
          >
            Save & Continue
          </button>
        </section>
      </div>
    </main>
  );
}

