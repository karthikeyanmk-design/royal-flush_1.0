"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { SportCardSkeleton } from "./SportCardSkeleton";
import { AppLink } from "@/lib/navigation";
const sportMma = "/assets/sport-mma.png";
const sportSoccer = "/assets/sport-soccer.png";
const sportTennis = "/assets/sport-tennis.png";
const sportBasketball = "/assets/sport-basketball.png";
const sportFootball = "/assets/sport-football.png";
const sportHockey = "/assets/sport-hockey.png";
const sportCricket = "/assets/sport-cricket.png";

const sports = [{
  id: 1,
  name: "MMA",
  slug: "mma",
  image: sportMma
}, {
  id: 2,
  name: "SOCCER",
  slug: "soccer",
  image: sportSoccer
}, {
  id: 3,
  name: "TENNIS",
  slug: "tennis",
  image: sportTennis
}, {
  id: 4,
  name: "BASKETBALL",
  slug: "basketball",
  image: sportBasketball
}, {
  id: 5,
  name: "AMERICAN FOOTBALL",
  slug: "football",
  image: sportFootball
}, {
  id: 6,
  name: "ICE HOCKEY",
  slug: "hockey",
  image: sportHockey
}, {
  id: 7,
  name: "CRICKET",
  slug: "cricket",
  image: sportCricket
}];

export const TrendingSports = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-stake-teal" />
          <h3 className="text-sm md:text-base font-semibold">Trending Sports</h3>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <button className="p-1 md:p-1.5 bg-secondary hover:bg-muted rounded-md transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button className="p-1 md:p-1.5 bg-secondary hover:bg-muted rounded-md transition-colors">
            <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide pb-1 md:pb-2">
        {loading
          ? Array.from({ length: 7 }).map((_, i) => <SportCardSkeleton key={i} />)
          : sports.map((sport) => (
              <AppLink
                key={sport.id}
                href={`/sports/${sport.slug}`}
                className="flex-shrink-0 w-[110px] md:w-[136px] group"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-[147px] md:h-[182px] object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[10px] md:text-xs font-bold text-center">{sport.name}</p>
                  </div>
                </div>
              </AppLink>
            ))}
      </div>
    </section>
  );
};