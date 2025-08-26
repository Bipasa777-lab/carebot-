"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ✅ Dummy pharmacy data
const pharmacies = [
  {
    name: "Apollo Pharmacy",
    location: "Salt Lake Sector V",
    area: "Kolkata",
    timing: "Open 24/7",
    phone: "+91 9876543210",
    image:
      "https://images.unsplash.com/photo-1588776814546-3fcb6f4a50d6?auto=format&fit=crop&w=800&q=80",
    mapsUrl: "https://www.google.com/maps?q=Apollo+Pharmacy+Salt+Lake+Kolkata",
  },
  {
    name: "MedPlus Pharmacy",
    location: "Park Street",
    area: "Kolkata",
    timing: "8 AM - 10 PM",
    phone: "+91 9123456780",
    image:
      "https://images.unsplash.com/photo-1584362917165-72a8f8f3c5f3?auto=format&fit=crop&w=800&q=80",
    mapsUrl: "https://www.google.com/maps?q=MedPlus+Pharmacy+Park+Street+Kolkata",
  },
];

export default function PharmacyPage() {
  return (
    <div className="bg-[#bcf3f3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto py-12">
        {/* ✅ Page Heading */}
        <h1 className="text-4xl font-bold text-center text-black mb-12 [font-family:'Outfit',Helvetica]">
          Nearby Pharmacies
        </h1>

        {/* ✅ Pharmacies Section */}
        <div className="px-6 sm:px-12 pb-12">
          <div className="space-y-8">
            {pharmacies.map((pharmacy, index) => (
              <Card
                key={index}
                className="w-full bg-white/60 border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-0 flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="w-full sm:w-1/3">
                    <img
                      className="w-full h-[250px] object-cover"
                      alt={pharmacy.name}
                      src={pharmacy.image}
                    />
                  </div>

                  {/* Details */}
                  <div className="w-full sm:w-2/3 p-6 sm:p-8">
                    <h3 className="text-2xl font-semibold text-black mb-4 [font-family:'Outfit',Helvetica]">
                      {pharmacy.name}
                    </h3>
                    <div className="space-y-2 [font-family:'Outfit',Helvetica] font-medium text-black text-lg">
                      <p>📍 {pharmacy.location} {pharmacy.area}</p>
                      <p>🕒 {pharmacy.timing}</p>
                      <p>📞 {pharmacy.phone}</p>
                    </div>

                    {/* ✅ Location Button */}
                    <Button
                      onClick={() => window.open(pharmacy.mapsUrl, "_blank")}
                      className="mt-6 bg-[#bcf3f3] hover:bg-[#a0e8e8] text-black font-medium px-6 py-2 rounded-lg transition-colors"
                    >
                      View Location
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
