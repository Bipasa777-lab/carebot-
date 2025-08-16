"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#c5f3f8] px-6">
      {/* Top Heading */}
      <h2 className="text-xl md:text-2xl font-medium text-center text-black">
        With <span className="text-blue-600 font-bold">CaRebot</span>, Every Health Issue Finds a Cure
      </h2>

      {/* Main Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-center mt-4">
        your <span className="text-blue-600">AI</span> health <br /> companion
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-center w-full max-w-6xl">
        {/* Left Text Section */}
        <div className="space-y-6">
          <p className="text-lg text-gray-800 leading-relaxed">
            <span className="text-3xl">“</span> <br />
            CaReBot is your intelligent health companion, designed to guide, support, 
            and simplify healthcare by providing smart solutions to everyday health 
            issues—anytime, anywhere.
          </p>

          <Button className="rounded-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
            Join Today →
          </Button>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center">
          <Image
            src="/robot.svg"   // ✅ updated to use your SVG
            alt="CareBot AI"
            width={400}
            height={400}
            className="drop-shadow-xl"
          />
        </div>
      </div>

      {/* Footer Small Text */}
      <p className="mt-8 text-sm text-gray-700">
        Stay Healthy, Stay Smart with <span className="font-semibold">CaReBot</span>
      </p>
    </div>
  );
}
