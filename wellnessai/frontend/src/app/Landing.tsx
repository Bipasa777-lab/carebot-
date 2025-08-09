"use client";
import React from "react";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="bg-sky-100 min-h-screen px-8 py-12 font-sans">
      <nav className="flex justify-between items-center mb-16">
        <h1 className="text-3xl font-bold">caRebot</h1>
        <div className="space-x-6">
          <a href="#" className="text-black font-medium hover:underline">
            FAQ
          </a>
          <a href="#" className="text-black font-medium hover:underline">
            About
          </a>
          <a href="#" className="text-black font-medium hover:underline">
            Sign In
          </a>
          <Button className="bg-gray-300 text-black rounded-full px-4 py-2 hover:bg-gray-400">
            Sign Up
          </Button>
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg">
          <h2 className="text-xl text-sky-700 font-semibold mb-2">
            With <span className="font-bold">CaRebot</span>, Every Health Issue Finds a Cure
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 leading-tight">
            your <span className="text-white">AI health</span> companion
          </h1>
          <p className="mt-6 text-gray-800 text-lg">
            <span className="text-4xl text-black font-serif">“</span>CaReBot is your intelligent
            health companion, designed to guide, support, and simplify healthcare by providing
            smart solutions to everyday health issues—anytime, anywhere.
          </p>
          <Button className="mt-6 bg-sky-300 hover:bg-sky-400 text-black px-6 py-2 rounded-full">
            Join Today →
          </Button>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src="/robot.png"
            alt="AI Robot"
            className="w-[300px] h-auto mx-auto"
          />
          <p className="text-sm text-gray-700 text-right mt-2">Stay Healthy, Stay Smart with CaReBot</p>
        </div>
      </section>
    </main>
  );
}