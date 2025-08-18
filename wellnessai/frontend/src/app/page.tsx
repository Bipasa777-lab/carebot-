import { ArrowRightIcon, FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export const Frame = (): JSX.Element => {
  return (
    <main className="bg-[#bcf3f3] min-h-screen w-full flex justify-center">
      <div className="bg-[#bcf3f3] overflow-hidden w-full max-w-[1440px] h-[1027px] relative">
        
        <section className="absolute w-[1049px] h-[468px] top-[556px] left-0">
          <div className="absolute w-[1024px] h-[370px] top-[98px] left-[25px]">
            <img
              className="absolute w-[657px] h-[370px] top-0 left-[367px] object-cover"
              alt="Untitled design"
              src="/robot.svg"
            />

            <p className="absolute w-[407px] top-[23px] left-0 [font-family:'Outfit',Helvetica] font-medium text-black text-3xl tracking-[0] leading-[normal]">
              CaReBot is your intelligent health companion, designed to guide,
              support, and simplify healthcare by providing smart solutions to
              everyday health issues—anytime, anywhere.
            </p>
          </div>

          <div className="absolute w-[210px] top-0 left-0 [font-family:'Outfit',Helvetica] font-medium text-black text-[150px] tracking-[0] leading-[normal] whitespace-nowrap">
            &quot;
          </div>

          <Button className="absolute w-[207px] h-[43px] top-[379px] left-[51px] bg-[#6cf0f2] rounded-[40px] border border-solid shadow-[4px_4px_6px_#000000b2] hover:bg-[#5ce0e2]">
            <div className="relative w-[162px] h-[30px] flex items-center justify-between">
              <span className="[font-family:'Outfit',Helvetica] font-medium text-black text-2xl tracking-[0] leading-[normal]">
                Join Today
              </span>
              <ArrowRightIcon className="w-[13px] h-[19px] text-black" />
            </div>
          </Button>
        </section>

        {/* Header Section */}
        <header className="absolute w-full max-w-[1251px] top-[187px] left-1/2 transform -translate-x-1/2 text-center">
          <h2 className="w-full [font-family:'Outfit',Helvetica] font-medium text-transparent text-6xl tracking-[0] leading-[normal] mb-6">
            <span className="text-white">With </span>
            <span className="text-[#0c0966]">CaRebot</span>
            <span className="text-white">, Every Health Issue Finds a Cure</span>
          </h2>

          <h1 className="[text-shadow:4px_4px_4px_#00000040] [font-family:'Outfit',Helvetica] font-normal text-transparent text-[120px] leading-[normal]">
            <span className="text-[#0c0966]">your </span>
            <span className="text-white">AI </span>
            <span className="text-[#0c0966]">health companion</span>
          </h1>
        </header>
        
        {/* Social Media Section with Tagline */}
        <aside className="absolute bottom-5 right-10 flex flex-col items-end space-y-3">
          {/* Short Line Above Social Icons */}
          <h1><p className="[font-family:'Outfit',Helvetica] font-medium  text-black text-3xl tracking-[0] leading-[normal] ">
            Stay Healthy, Stay Smart
          </p></h1>
          <h2><p className="[font-family:'Outfit',Helvetica] font-medium  text-black text-3xl tracking-[0] leading-[normal] ">
              with CaReBot
          </p></h2>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <FacebookIcon className="w-[40px] h-[40px] text-blue-600 cursor-pointer hover:scale-110 transition" />
            <TwitterIcon className="w-[40px] h-[40px] text-black cursor-pointer hover:scale-110 transition" />
            <InstagramIcon className="w-[40px] h-[40px] text-pink-500 cursor-pointer hover:scale-110 transition" />
            <YoutubeIcon className="w-[40px] h-[40px] text-red-600 cursor-pointer hover:scale-110 transition" />
          </div>
        </aside>
        
      </div>
    </main>
  );
};

export default Frame;
