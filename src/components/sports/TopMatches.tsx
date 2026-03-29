"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trophy, Play, BarChart2, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { BetSelection } from "@/views/Sports";

const matches = [
  {
    id: 1,
    league: "8h",
    viewers: "13,562",
    team1: { name: "Manchester City FC", logo: "🔵" },
    team2: { name: "Newcastle United FC", logo: "⚫" },
    betInfo: "93% of 1x2 bets on Manchester City FC",
    odds: [
      { label: "Manchester ...", value: "1.75" },
      { label: "Draw", value: "3.95" },
      { label: "Newcastle U...", value: "3.95" },
    ],
  },
  {
    id: 2,
    league: "8h",
    viewers: "12,217",
    team1: { name: "FC Inter Milano", logo: "🔵" },
    team2: { name: "Torino FC", logo: "🟤" },
    betInfo: "99% of 1x2 bets on FC Inter Milano",
    odds: [
      { label: "FC Inter Mila...", value: "1.29" },
      { label: "Draw", value: "5.40" },
      { label: "Torino FC", value: "9.60" },
    ],
  },
  {
    id: 3,
    league: "8h",
    viewers: "8,913",
    team1: { name: "Olympique Lyonnais", logo: "🔴" },
    team2: { name: "Stade Lavallois Mayenne FC", logo: "🟠" },
    betInfo: "99% of 1x2 bets on Olympique Lyonnais",
    odds: [
      { label: "Olympique L...", value: "1.26" },
      { label: "Draw", value: "5.60" },
      { label: "Stade Lavall...", value: "11.00" },
    ],
  },
];

interface TopMatchesProps {
  onSelectOdd?: (selection: BetSelection) => void;
  isSelected?: (id: string) => boolean;
}

export const TopMatches = ({ onSelectOdd, isSelected }: TopMatchesProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-stake-teal" />
          <h3 className="text-sm md:text-base font-semibold">Top Matches</h3>
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

      <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="flex-shrink-0 w-[300px] md:w-[340px] h-[160px] md:h-[180px] rounded-lg" />
            ))
          : matches.map((match) => {
              const matchName = `${match.team1.name} vs ${match.team2.name}`;
              return (
                <div
                  key={match.id}
                  className="flex-shrink-0 w-[300px] md:w-[340px] bg-card rounded-lg border border-border hover:border-primary/50 transition-colors overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                        {match.league}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Play className="w-3 h-3 text-muted-foreground" />
                        <BarChart2 className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground px-1 border border-border rounded">SGM</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {match.viewers}
                    </span>
                  </div>

                  {/* Teams */}
                  <div className="px-3 py-3">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-xl flex-shrink-0">
                        {match.team1.logo}
                      </div>
                      <div className="text-center flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-foreground truncate">{match.team1.name}</p>
                        <p className="text-xs md:text-sm font-medium text-foreground truncate">{match.team2.name}</p>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-xl flex-shrink-0">
                        {match.team2.logo}
                      </div>
                    </div>
                    <p className="text-[10px] text-stake-yellow mt-2 flex items-center justify-start gap-1">
                      <span className="text-stake-yellow">🔥🔥</span>
                      {match.betInfo}
                    </p>
                  </div>

                  {/* Odds */}
                  <div className="grid grid-cols-3 gap-1.5 px-3 pb-3">
                    {match.odds.map((odd, idx) => {
                      const selId = `top-${match.id}-${idx}`;
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
                          className={`flex flex-col items-center p-2 rounded text-center transition-all ${
                            selected
                              ? "bg-accent/20 border-2 border-accent ring-1 ring-accent/30 scale-105"
                              : "bg-secondary hover:bg-muted border border-transparent"
                          }`}
                        >
                          <span className="text-[9px] text-muted-foreground truncate w-full">{odd.label}</span>
                          <span className={`text-sm font-semibold ${selected ? "text-accent" : "text-stake-blue"}`}>{odd.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};
