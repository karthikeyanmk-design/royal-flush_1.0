"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AppLink } from "@/lib/navigation";
const sportSoccer = "/assets/sport-soccer.png";
const sportTennis = "/assets/sport-tennis.png";
const sportBasketball = "/assets/sport-basketball.png";
const sportFootball = "/assets/sport-football.png";
const sportHockey = "/assets/sport-hockey.png";
const sportCricket = "/assets/sport-cricket.png";
const sportMma = "/assets/sport-mma.png";

const sports = [
  { id: 1, name: "SOCCER", slug: "soccer", image: sportSoccer },
  { id: 2, name: "TENNIS", slug: "tennis", image: sportTennis },
  { id: 3, name: "BASKETBALL", slug: "basketball", image: sportBasketball },
  { id: 4, name: "FOOTBALL", slug: "football", image: sportFootball },
  { id: 5, name: "HOCKEY", slug: "hockey", image: sportHockey },
  { id: 6, name: "CRICKET", slug: "cricket", image: sportCricket },
  { id: 7, name: "ESPORTS", slug: "esports", image: sportMma },
];

export const TopSports = () => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-stake-orange" />
          <h3 className="text-sm md:text-base font-semibold">Top Sports</h3>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <button onClick={() => scroll("left")} className="p-1 md:p-1.5 bg-secondary hover:bg-muted rounded-md transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button onClick={() => scroll("right")} className="p-1 md:p-1.5 bg-secondary hover:bg-muted rounded-md transition-colors">
            <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide pb-1 md:pb-2">
        {loading
          ? Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="flex-shrink-0 w-[100px] md:w-[130px] h-[130px] md:h-[170px] rounded-lg" />
            ))
          : sports.map((sport) => (
              <AppLink
                key={sport.id}
                href={`/sports/${sport.slug}`}
                className="flex-shrink-0 w-[100px] md:w-[130px] group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-[130px] md:h-[170px] object-cover transition-transform group-hover:scale-105"
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
