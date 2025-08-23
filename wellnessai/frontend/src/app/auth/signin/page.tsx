// app/login/page.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FacebookIcon } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-sky-300 via-sky-100 to-sky-400 
      bg-[length:300%_300%] animate-bgShift overflow-hidden"
    >
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/40 via-transparent to-white/30 opacity-60 animate-pulse"></div>

      <Card className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(56,189,248,0.6)] backdrop-blur-md">
        
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center items-center p-10 bg-white/90 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            LOGIN
          </h2>
          <p className="text-lg font-medium bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent mb-6 animate-pulse">
            Let’s Get You Started with Carbot
          </p>

          <Input placeholder="Username" className="mb-4 w-full max-w-md rounded-lg border-gray-300 focus:ring-2 focus:ring-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.6)] transition-all duration-300" />

          <Input placeholder="Email or Mobile" className="mb-4 w-full max-w-md rounded-lg border-gray-300 focus:ring-2 focus:ring-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.6)] transition-all duration-300" />

          <Input type="password" placeholder="Password" className="mb-4 w-full max-w-md rounded-lg border-gray-300 focus:ring-2 focus:ring-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.6)] transition-all duration-300" />

          <Button className="w-full py-3 mb-4 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
            Login Now
          </Button>

          <div className="flex items-center w-full my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">or login with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex flex-col space-y-3 w-full">
            <Button variant="outline" className="flex items-center justify-center py-3 rounded-lg border-gray-300 hover:bg-gray-100">
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span className="ml-2 text-sm">Login with Google</span>
            </Button>

            <Button variant="outline" className="flex items-center justify-center py-3 rounded-lg border-gray-300 hover:bg-gray-100">
              <FacebookIcon className="w-5 h-5 text-blue-600" />
              <span className="ml-2 text-sm">Login with Facebook</span>
            </Button>
          </div>
        </div>

        {/* Right Side - Welcome Section */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-2xl animate-textGlow">
             Welcome to <br /> Carebot
          </h1>
        </div>
      </Card>

      {/* Animations */}
      <style jsx>{`
        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes textGlow {
          0% { text-shadow: 0 0 15px rgba(255,255,255,0.7), 0 0 25px rgba(56,189,248,0.7); }
          50% { text-shadow: 0 0 25px rgba(255,255,255,1), 0 0 50px rgba(56,189,248,1); }
          100% { text-shadow: 0 0 15px rgba(255,255,255,0.7), 0 0 25px rgba(56,189,248,0.7); }
        }
        .animate-bgShift {
          animation: bgShift 25s ease infinite;
        }
        .animate-textGlow {
          animation: textGlow 3s ease-in-out infinite alternate;
        }
      `}</style>
    </main>
  );
};

export default LoginPage;
