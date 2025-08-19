// app/login/page.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import { FacebookIcon } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-300">
      <Card className="w-full max-w-sm bg-gradient-to-br from-cyan-50 to-cyan-200 shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-900">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {/* User Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black">User Name</label>
            <Input placeholder="Enter your username" className="bg-cyan-100" />
          </div>

          {/* Email/Number */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black">Email/Number</label>
            <Input placeholder="Enter your email or number" className="bg-cyan-100" />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black">Password</label>
            <Input type="password" placeholder="Enter your password" className="bg-cyan-100" />
          </div>

          {/* Forgot Password */}
          <p className="text-sm text-right text-black underline cursor-pointer">Forgot Password?</p>

          {/* Sign In Button */}
          <Button className="w-full bg-cyan-200 hover:bg-cyan-300 text-black rounded-lg shadow-md mt-2">
            Sign In
          </Button>

          {/* Or continue with */}
          <p className="text-center text-sm text-black mt-2">or continue with</p>
          <div className="flex justify-center space-x-4 mt-1">
            {/* Facebook Button */}
            <Button variant="outline" className="p-2 rounded-full">
              <FacebookIcon className="w-5 h-5 text-blue-600" />
            </Button>

            {/* Google Button with Image */}
            <Button variant="outline" className="p-1 rounded-full flex items-center justify-center">
              <Image src="/google.png" alt="Google" width={20} height={20} />
            </Button>
          </div>

          {/* Sign Up */}
          <p className="text-center text-sm text-black mt-2">
            Don’t have an account?{" "}
            <span className="text-blue-600 underline cursor-pointer">Sign Up</span>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
