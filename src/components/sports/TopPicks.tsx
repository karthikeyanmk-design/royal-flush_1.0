"use client";
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Tv, Radio } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { BetSelection } from "@/views/Sports";

const picks = [
  {
    id: 1,
    league: "FA",
    live: true,
    viewers: "6,898",
    team1: "FC Inter Milan",
    team2: "Roma FC",
    highlight: "Olympique Lyonnais",
    highlightSub: "Olympique de sports - Serie A",
    odds: [
      { label: "Over 2.5", value: "1.85" },
    ],
  },
  {
    id: 2,
    league: "ICC",
    live: false,
    viewers: "7,196",
    team1: "Kolkata",
    team2: "Chennai",
    highlight: "Kolkata Knight Riders",
    highlightSub: "IPL T20 Cricket",
    odds: [
      { label: "Kolkata Win", value: "2.10" },
    ],
  },
];

interface TopPicksProps {
  onSelectOdd?: (selection: BetSelection) => void;
  isSelected?: (id: string) => boolean;
}

export const TopPicks = ({ onSelectOdd, isSelected }: TopPicksProps) => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-stake-yellow fill-stake-yellow" />
          <h3 className="text-sm md:text-base font-semibold">Top Picks</h3>
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

      {loading ? (
        <div className="flex md:grid md:grid-cols-2 gap-2 md:gap-3 overflow-x-auto md:overflow-visible scrollbar-hide">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-24 rounded-lg flex-shrink-0 w-[85vw] md:w-auto" />
          ))}
        </div>
      ) : (
        <div ref={scrollRef} className="flex md:grid md:grid-cols-2 gap-2 md:gap-3 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none pb-1">
          {picks.map((pick) => {
            const matchName = `${pick.team1} vs ${pick.team2}`;
            return (
              <div
                key={pick.id}
                className="bg-card rounded-lg border border-border p-3 hover:border-primary/50 transition-colors flex-shrink-0 w-[85vw] md:w-auto snap-start"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                      {pick.league}
                    </span>
                    {pick.live && (
                      <>
                        <Tv className="w-3 h-3 text-stake-green" />
                        <Radio className="w-3 h-3 text-stake-orange" />
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-stake-green rounded-full" />
                    {pick.viewers}
                  </span>
                </div>

                {/* Content */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{pick.highlight}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{pick.highlightSub}</p>
                  </div>
                  <div className="flex gap-1">
                    {pick.odds.map((odd, idx) => {
                      const selId = `pick-${pick.id}-${idx}`;
                      const selected = isSelected?.(selId);
                      return (
                        <button
                          key={idx}
                          onClick={() =>
                            onSelectOdd?.({
                              id: selId,
                              matchName,
                              selection: odd.label,
                              odds: parseFloat(odd.value) || 1,
                            })
                          }
                          className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                            selected
                              ? "bg-accent/20 border border-accent text-accent"
                              : "bg-secondary hover:bg-muted text-stake-blue"
                          }`}
                        >
                          {odd.label} <span className="font-bold ml-1">{odd.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Teams row */}
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">{pick.team1}</span>
                    <span className="text-[10px] text-muted-foreground">vs</span>
                    <span className="text-[10px] text-muted-foreground">{pick.team2}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
