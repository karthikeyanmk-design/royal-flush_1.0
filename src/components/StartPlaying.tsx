"use client";
import { useState, useEffect } from "react";
import { PlayCircle, CircleDot } from "lucide-react";
import { StartPlayingSkeleton } from "./StartPlayingSkeleton";
const casinoHero = "/assets/casino-hero.png";
const sportsHero = "/assets/sports-hero.png";

export const StartPlaying = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <StartPlayingSkeleton />;
  }

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center gap-2 mb-2 md:mb-3">
        <PlayCircle className="w-4 h-4 text-foreground" />
        <h3 className="text-sm md:text-base font-semibold">Start Playing</h3>
      </div>

      <div className="grid grid-cols-2 gap-1.5 md:gap-3">
        {/* Casino Card */}
        <div className="relative group cursor-pointer rounded-lg overflow-hidden">
          <img
            src={casinoHero}
            alt="Casino"
            className="w-full h-28 md:h-36 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
            <span className="text-xs md:text-sm font-medium text-foreground">Casino</span>
            <span className="text-[10px] md:text-sm text-stake-green flex items-center gap-1">
              <CircleDot className="w-2 h-2 md:w-2.5 md:h-2.5 fill-stake-green text-stake-green" />
              38,133
            </span>
          </div>
        </div>

        {/* Sports Card */}
        <div className="relative group cursor-pointer rounded-lg overflow-hidden">
          <img
            src={sportsHero}
            alt="Sports"
            className="w-full h-28 md:h-36 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
            <span className="text-xs md:text-sm font-medium text-foreground">Sports</span>
            <span className="text-[10px] md:text-sm text-stake-green flex items-center gap-1">
              <CircleDot className="w-2 h-2 md:w-2.5 md:h-2.5 fill-stake-green text-stake-green" />
              21,253
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
