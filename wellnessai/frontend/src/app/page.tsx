"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, UserIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-sky-100 min-h-screen px-4 py-6 font-sans">
      {/* Header */}
      <nav className="flex justify-between items-center mb-10 px-4">
        <MenuIcon className="w-6 h-6" />
        <div className="space-x-6 text-sm font-medium">
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact Us</a>
          <UserIcon className="inline w-5 h-5" />
        </div>
      </nav>

      <section className="grid md:grid-cols-2 gap-10 items-start">
        {/* Recent Chats */}
        <div className="bg-sky-200 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
          <ul className="space-y-3">
            <li className="text-black">“I'm feeling mild fever since last night.”</li>
            <li className="bg-gray-300 rounded-full px-4 py-1 inline-block">“Can you suggest a diet for diabetes control?”</li>
            <li className="text-black">“I have a headache and low energy today.”</li>
            <li className="text-black">“What are the side effects of this medicine?”</li>
            <li className="text-black">“Can you remind me to take my BP tablets daily?”</li>
          </ul>
        </div>

        {/* Hospital Cards */}
        <div className="space-y-6">
          <div className="bg-gray-200 p-4 rounded-xl flex items-start gap-4">
            <img src="/hospital1.jpg" alt="Narayana Hospital" className="w-32 h-24 object-cover rounded-md" />
            <div>
              <p className="font-semibold">Narayana Hospital<br />Madhyamgram, North 24 Parganas</p>
              <p className="text-sm">OPD 10:00 AM - 12:00 PM</p>
              <p className="text-sm text-blue-800">‪+919564099834‬</p>
            </div>
          </div>

          <div className="bg-gray-200 p-4 rounded-xl flex items-start gap-4">
            <img src="/hospital2.jpg" alt="Medica Hospital" className="w-32 h-24 object-cover rounded-md" />
            <div>
              <p className="font-semibold">Medica Superspecialty Hospital<br />Mukundapur, Kolkata</p>
              <p className="text-sm">OPD 9:00 AM - 7:00 PM</p>
              <p className="text-sm text-blue-800">‪+917076102587‬</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
