import { ClockIcon, SendIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

const locationSuggestions = [{ name: "New Town" }, { name: "Bagbazar" }];

export const Frame = (): JSX.Element => {
  return (
    <div className="bg-[#bcf3f3] grid justify-items-center [align-items:start] w-screen">
      <div className="bg-[#bcf3f3] overflow-hidden w-[1440px] h-[1024px] relative">
        <div className="absolute w-[1090px] h-[259px] top-[97px] left-[175px]">
          <Card className="w-[1090px] h-[189px] bg-[#d9d9d9e8] rounded-[50px] absolute top-0 left-0 shadow-[0px_0px_8px_4px_#00000040] border-0">
            <CardContent className="flex items-center justify-center h-full p-0">
              <div className="w-[740px] [text-shadow:0px_0px_9px_#9ad4d9] [font-family:'Outfit',Helvetica] font-medium text-[#00000099] text-6xl tracking-[0] leading-[normal] text-center">
                Please specify your location
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="absolute w-[1290px] h-[154px] top-[413px] left-[163px]">
          <Card className="w-[1114px] h-[99px] bg-[#d9d9d961] rounded-[40px] absolute top-0 left-0 shadow-[0px_0px_8px_4px_#00000040] border-0">
            <CardContent className="flex items-center h-full p-0 relative">
              <Input
                className="w-full h-full bg-transparent border-0 pl-[41px] pr-[100px] opacity-60 [font-family:'Outfit',Helvetica] font-normal text-black text-[25px] tracking-[0] leading-[normal] placeholder:opacity-60 placeholder:[font-family:'Outfit',Helvetica] placeholder:font-normal placeholder:text-black placeholder:text-[25px] placeholder:tracking-[0] placeholder:leading-[normal] focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="search your location here"
                defaultValue=""
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-[26px] w-[52px] h-[52px] p-0 hover:bg-transparent"
              >
                <SendIcon className="w-[52px] h-[52px]" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="absolute w-[1279px] h-[379px] top-[568px] left-20 bg-[#ffffff6b] rounded-[70px] border-0">
          <CardContent className="p-0 h-full">
            <div className="absolute w-[1157px] h-[237px] top-[23px] left-[81px]">
              {locationSuggestions.map((location, index) => (
                <div key={location.name} className="flex items-center">
                  <ClockIcon
                    className="absolute w-[25px] h-[25px] top-[26px] left-[18px]"
                    style={{ top: `${26 + index * 43}px` }}
                  />
                  <div
                    className="absolute w-[1086px] left-[71px] [font-family:'Outfit',Helvetica] font-light text-[#00000080] text-[25px] tracking-[0] leading-[normal]"
                    style={{ top: `${index === 0 ? 0 : 54}px` }}
                  >
                    {location.name}
                  </div>
                </div>
              ))}
              
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
