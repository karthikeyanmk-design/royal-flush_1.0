"use client";
import { useState, useEffect, useRef } from "react";
import { Flame, ChevronLeft, ChevronRight, ChevronDown, Tv, Radio } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { BetSelection } from "@/views/Sports";

const leagues = [
  {
    id: 1,
    name: "MLS",
    country: "USA",
    flag: "🇺🇸",
    matches: [
      {
        id: 1,
        date: "Mon, Feb 24 - 2:00 AM",
        team1: "Real Colorado Rapids",
        team2: "Roath Newtons",
        time: "What is Cash Out amount?",
        cashOut: "140.2",
        odds: [
          { label: "Real Colorado", value: "1.84" },
          { label: "Draw", value: "3.95" },
          { label: "Newtons", value: "3.65" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "MX Liga",
    country: "Mexico",
    flag: "🇲🇽",
    matches: [
      {
        id: 1,
        date: "Thu, Feb 25 - 1:00 AM",
        team1: "Manchester City FC",
        team2: "Newcastle United FC",
        time: "1w",
        odds: [
          { label: "Manchester City FC", value: "1.45" },
          { label: "Draw", value: "4.20" },
          { label: "Newcastle United FC", value: "6.50" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Argentina Liga Profesional",
    country: "Argentina",
    flag: "🇦🇷",
    matches: [
      {
        id: 1,
        date: "Thu, Feb 25 - 1:00 AM",
        team1: "Deportivo Alavés",
        team2: "Real Sociedad",
        time: "1w",
        odds: [
          { label: "Alavés", value: "1.84" },
          { label: "Draw", value: "3.50" },
          { label: "Real Sociedad", value: "4.20" },
        ],
      },
      {
        id: 2,
        date: "Thu, Feb 25 - 1:00 AM",
        team1: "Valencia CF",
        team2: "Athletic Bilbao",
        time: "1w",
        odds: [
          { label: "Valencia CF", value: "2.80" },
          { label: "Draw", value: "2.44" },
          { label: "Athletic", value: "3.10" },
        ],
      },
    ],
  },
];

interface PopularEventsProps {
  onSelectOdd?: (selection: BetSelection) => void;
  isSelected?: (id: string) => boolean;
}

export const PopularEvents = ({ onSelectOdd, isSelected }: PopularEventsProps) => {
  const [loading, setLoading] = useState(true);
  const [expandedLeagues, setExpandedLeagues] = useState<number[]>([1, 2, 3]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const toggleLeague = (id: number) => {
    setExpandedLeagues((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-stake-orange" />
          <h3 className="text-sm md:text-base font-semibold">Popular Events</h3>
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
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : (
        <div ref={scrollRef} className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none pb-1 md:pb-0">
          {leagues.map((league) => (
            <div key={league.id} className="bg-card rounded-lg border border-border overflow-hidden flex-shrink-0 w-[85vw] md:w-auto snap-start">
              {/* League Header */}
              <button
                onClick={() => toggleLeague(league.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{league.flag}</span>
                  <span className="text-xs font-medium text-foreground">{league.name}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedLeagues.includes(league.id) ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Matches */}
              {expandedLeagues.includes(league.id) && (
                <div className="border-t border-border">
                  {league.matches.map((match) => {
                    const matchName = `${match.team1} vs ${match.team2}`;
                    return (
                      <div
                        key={match.id}
                        className="p-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                      >
                        {/* Date */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] text-muted-foreground">{match.date}</span>
                          <Tv className="w-3 h-3 text-stake-green" />
                          <Radio className="w-3 h-3 text-stake-orange" />
                        </div>

                        {/* Teams & Odds */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{match.team1}</p>
                            <p className="text-xs text-muted-foreground truncate">{match.team2}</p>
                          </div>

                          <div className="flex gap-1">
                            {match.odds.map((odd, idx) => {
                              const selId = `pop-${league.id}-${match.id}-${idx}`;
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
                                  className={`px-3 py-2 rounded text-center min-w-[70px] transition-colors ${
                                    selected
                                      ? "bg-accent/20 border border-accent"
                                      : "bg-secondary hover:bg-muted"
                                  }`}
                                >
                                  <span className="text-[9px] text-muted-foreground block truncate">{odd.label}</span>
                                  {odd.value && <span className={`text-xs font-semibold ${selected ? "text-accent" : "text-foreground"}`}>{odd.value}</span>}
                                </button>
                              );
                            })}
                          </div>

                          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="w-full mt-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
        Load More
      </button>
    </section>
  );
};
