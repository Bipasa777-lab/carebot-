"use client";

import { ClockIcon, SendIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { useRouter } from "next/navigation";

const locationSuggestions = [{ name: "New Town" }, { name: "Bagbazar" }];

export default function Frame(): JSX.Element {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSend = () => {
    if (location.trim() !== "") {
      router.push(`/hospital?page=1&location=${encodeURIComponent(location)}`);
    } else {
      router.push(`/hospital`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#bcf3f3] flex items-start justify-center p-4">
      <div className="w-full max-w-5xl space-y-8">
        {/* Title Card */}
        <Card className="bg-[#d9d9d9e8] rounded-3xl shadow-md border-0">
          <CardContent className="flex items-center justify-center p-6">
            <h1 className="text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black/70">
              Please specify your location
            </h1>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <Card className="bg-[#d9d9d961] rounded-2xl shadow-md border-0">
          <CardContent className="flex items-center relative p-2">
            <Input
              className="w-full bg-transparent border-0 pl-4 pr-12 text-base sm:text-lg md:text-xl placeholder:text-black/60 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search your location here"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSend}
              className="absolute right-3 w-10 h-10 sm:w-12 sm:h-12 hover:bg-transparent"
            >
              <SendIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </Button>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card className="bg-white/60 rounded-3xl border-0 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {locationSuggestions.map((loc, index) => (
                <div
                  key={loc.name}
                  className="flex items-center gap-3 cursor-pointer hover:text-black text-black/70"
                  onClick={() => setLocation(loc.name)}
                >
                  <ClockIcon className="w-5 h-5 shrink-0" />
                  <span className="text-base sm:text-lg md:text-xl">
                    {loc.name}
                  </span>
                </div>
              ))}
              <Separator className="bg-black/30" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
