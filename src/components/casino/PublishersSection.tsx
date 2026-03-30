"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const publishers = [
  { id: 1, name: "Pragmatic Play", players: 5420, color: "from-blue-600 to-blue-800" },
  { id: 2, name: "Royal Flush Originals", players: 3890, color: "from-[#B20710] to-[#5C0A0A]" },
  { id: 3, name: "Hacksaw Gaming", players: 2340, color: "from-orange-600 to-orange-800" },
  { id: 4, name: "Evolution", players: 4560, color: "from-red-600 to-red-800" },
  { id: 5, name: "Nolimit City", players: 1890, color: "from-purple-600 to-purple-800" },
  { id: 6, name: "Massive Studios", players: 987, color: "from-green-600 to-green-800" },
  { id: 7, name: "Twist Gaming", players: 654, color: "from-pink-600 to-pink-800" },
  { id: 8, name: "Titan Play", players: 1234, color: "from-indigo-600 to-indigo-800" },
];

export const PublishersSection = () => {
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
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm md:text-base font-semibold">Publishers</h3>
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

      <div ref={scrollRef} className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-1 md:pb-2">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="flex-shrink-0 w-[140px] md:w-[160px] h-[70px] md:h-[80px] rounded-xl" />
            ))
          : publishers.map((publisher) => (
              <div
                key={publisher.id}
                className={`flex-shrink-0 w-[140px] md:w-[160px] h-[70px] md:h-[80px] rounded-xl bg-gradient-to-br ${publisher.color} p-3 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <span className="text-xs md:text-sm font-bold text-white truncate">
                  {publisher.name}
                </span>
                <p className="text-[10px] md:text-xs text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {publisher.players.toLocaleString()} playing
                </p>
              </div>
            ))}
      </div>
    </section>
  );
};
