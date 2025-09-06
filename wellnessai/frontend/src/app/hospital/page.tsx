"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const hospitals = [
  {
    name: "Apollo Gleneagles Hospital",
    location: "Kolkata",
    area: "Salt Lake",
    timing: "Open 24 Hours",
    phone: "+91 33 2320 3040",
    image:
      "https://images.unsplash.com/photo-1576765974172-223d9039f1c9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "AMRI Hospital",
    location: "Kolkata",
    area: "Dhakuria",
    timing: "Open 24 Hours",
    phone: "+91 33 6626 0000",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Fortis Hospital",
    location: "Kolkata",
    area: "Anandapur",
    timing: "Open 24 Hours",
    phone: "+91 33 6628 4444",
    image:
      "https://images.unsplash.com/photo-1600959907703-125ba1f62d4f?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function HospitalPage() {
  return (
    <div className="bg-[#bcf3f3] min-h-screen py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-12 text-center [font-family:'Outfit',Helvetica]">
          Nearby Hospitals
        </h1>

        <div className="space-y-8 px-6 sm:px-12">
          {hospitals.map((hospital, index) => (
            <Card
              key={index}
              className="w-full bg-white/60 border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-0 flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3">
                  <img
                    className="w-full h-[250px] object-cover"
                    alt={hospital.name}
                    src={hospital.image}
                  />
                </div>
                <div className="w-full sm:w-2/3 p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold text-black mb-4">
                    {hospital.name}
                  </h3>
                  <div className="space-y-2 font-medium text-black text-lg">
                    <p>📍 {hospital.location}, {hospital.area}</p>
                    <p>🕒 {hospital.timing}</p>
                    <p>📞 {hospital.phone}</p>
                  </div>
                  <Button className="mt-6 bg-[#bcf3f3] hover:bg-[#a0e8e8] text-black font-medium px-6 py-2 rounded-lg">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
