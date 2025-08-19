import { ArrowRightIcon, FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export const Frame = (): JSX.Element => {
  return (
    <main className="bg-[#bcf3f3] min-h-screen w-full flex justify-center">
      <div className="w-full max-w-[1440px] relative flex flex-col items-center px-4 sm:px-8 md:px-12">

        {/* Header Section */}
        <header className="text-center mt-16 md:mt-28 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 text-white">
            With <span className="text-[#0c0966]">CaReBot</span>, Every Health Issue Finds a Cure
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-[120px] font-normal text-[#0c0966] sm:text-shadow-lg leading-tight">
            your <span className="text-white">AI </span>health companion
          </h1>
        </header>

        {/* Hero Section */}
        <section className="w-full flex flex-col-reverse md:flex-row items-center justify-between mt-12 md:mt-20 relative">
          
          {/* Text Content */}
          <div className="flex-1 md:pr-8 mt-8 md:mt-0">
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-black mb-6 max-w-md">
              CaReBot is your intelligent health companion, designed to guide, support, and simplify healthcare by providing smart solutions to everyday health issues—anytime, anywhere.
            </p>

            <Button className="bg-[#6cf0f2] hover:bg-[#5ce0e2] text-black font-medium px-6 py-3 rounded-2xl shadow-md flex items-center space-x-3">
              <span className="text-lg sm:text-xl font-medium">Join Today</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Robot Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="/robot.svg"
              alt="Robot"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain"
            />
          </div>
        </section>

        {/* Social Media Section with Tagline */}
        <aside className="w-full mt-8 md:mt-0 flex flex-col md:items-end items-center text-center md:text-right space-y-2">
          <p className="text-lg sm:text-xl font-medium text-black">Stay Healthy, Stay Smart</p>
          <p className="text-lg sm:text-xl font-medium text-black">with CaReBot</p>

          <div className="flex space-x-4 mt-2">
            <FacebookIcon className="w-8 h-8 text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
            <TwitterIcon className="w-8 h-8 text-black cursor-pointer hover:scale-110 transition-transform" />
            <InstagramIcon className="w-8 h-8 text-pink-500 cursor-pointer hover:scale-110 transition-transform" />
            <YoutubeIcon className="w-8 h-8 text-red-600 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </aside>

      </div>
    </main>
  );
};

export default Frame;
