"use client";
import { useState, useEffect, useRef } from "react";
import { Trophy, ChevronLeft, ChevronRight, Clock, Play, BarChart3, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const matches = [
  {
    id: 1,
    team1: "Manchester City FC",
    team2: "Newcastle United FC",
    odds1: "1.75",
    oddsDraw: "3.95",
    odds2: "3.95",
    betPercentage: 93,
    favTeam: "Manchester City FC",
    viewers: 13562,
    time: "8h",
    sport: "Soccer",
  },
  {
    id: 2,
    team1: "FC Inter Milano",
    team2: "Torino FC",
    odds1: "1.29",
    oddsDraw: "5.40",
    odds2: "9.60",
    betPercentage: 99,
    favTeam: "FC Inter Milano",
    viewers: 12217,
    time: "8h",
    sport: "Soccer",
  },
  {
    id: 3,
    team1: "Olympique Lyonnais",
    team2: "Stade Lavallois Mayenne FC",
    odds1: "1.26",
    oddsDraw: "5.60",
    odds2: "11.00",
    betPercentage: 99,
    favTeam: "Olympique Lyonnais",
    viewers: 8913,
    time: "8h",
    sport: "Soccer",
  },
  {
    id: 4,
    team1: "Real Madrid",
    team2: "Barcelona",
    odds1: "2.10",
    oddsDraw: "3.40",
    odds2: "2.85",
    betPercentage: 52,
    favTeam: "Real Madrid",
    viewers: 45230,
    time: "Live",
    sport: "Soccer",
  },
];

export const TopSportsPicks = () => {
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
          <Trophy className="w-4 h-4 text-yellow-500" />
          <h3 className="text-sm md:text-base font-semibold">Top Sports Picks</h3>
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
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="flex-shrink-0 w-[280px] md:w-[320px] h-[180px] md:h-[200px] rounded-lg" />
            ))
          : matches.map((match) => (
              <div
                key={match.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] bg-card border border-border rounded-lg p-3 md:p-4 cursor-pointer hover:border-primary/50 transition-colors"
              >
                {/* Header with time, icons, viewers */}
                <div className="flex items-center justify-between mb-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className={`text-[10px] md:text-xs ${match.time === "Live" ? "text-destructive font-semibold" : ""}`}>
                        {match.time}
                      </span>
                    </div>
                    <Play className="w-3 h-3" />
                    <div className="flex items-center gap-0.5">
                      <BarChart3 className="w-3 h-3" />
                      <span className="text-[10px] md:text-xs">SGM</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span className="text-[10px] md:text-xs">{match.viewers.toLocaleString()}</span>
                  </div>
                </div>

                {/* Teams with icons */}
                <div className="flex flex-col items-center gap-1 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-600" />
                    <span className="text-xs md:text-sm font-medium text-center">{match.team1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700" />
                    <span className="text-xs md:text-sm font-medium text-center">{match.team2}</span>
                  </div>
                </div>

                {/* Betting percentage indicator */}
                <div className="flex items-center justify-center gap-1.5 mb-4">
                  <span className="text-orange-500">🔥</span>
                  <span className="text-orange-500">🔥</span>
                  <span className="text-[10px] md:text-xs text-stake-teal">
                    {match.betPercentage}% of 1x2 bets on {match.favTeam}
                  </span>
                </div>

                {/* Odds buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="flex flex-col items-center py-2 px-1 bg-secondary hover:bg-muted rounded transition-colors">
                    <span className="text-[9px] md:text-[10px] text-muted-foreground truncate w-full text-center">
                      {match.team1.split(' ')[0]}...
                    </span>
                    <span className="text-xs md:text-sm font-bold text-stake-teal">{match.odds1}</span>
                  </button>
                  <button className="flex flex-col items-center py-2 px-1 bg-secondary hover:bg-muted rounded transition-colors">
                    <span className="text-[9px] md:text-[10px] text-muted-foreground">Draw</span>
                    <span className="text-xs md:text-sm font-bold text-foreground">{match.oddsDraw}</span>
                  </button>
                  <button className="flex flex-col items-center py-2 px-1 bg-secondary hover:bg-muted rounded transition-colors">
                    <span className="text-[9px] md:text-[10px] text-muted-foreground truncate w-full text-center">
                      {match.team2.split(' ')[0]}...
                    </span>
                    <span className="text-xs md:text-sm font-bold text-foreground">{match.odds2}</span>
                  </button>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};
