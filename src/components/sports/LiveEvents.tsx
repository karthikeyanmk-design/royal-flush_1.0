"use client";
import { useState, useEffect, useRef } from "react";
import { Radio, ChevronLeft, ChevronRight, Tv, Filter, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { BetSelection } from "@/views/Sports";

const sportTabs = [
  { icon: "⚽", label: "Soccer", slug: "soccer" },
  { icon: "🎾", label: "Tennis", slug: "tennis" },
  { icon: "🏀", label: "Basketball", slug: "basketball" },
  { icon: "🏈", label: "Football", slug: "football" },
  { icon: "🏒", label: "Hockey", slug: "hockey" },
  { icon: "🏏", label: "Cricket", slug: "cricket" },
  { icon: "🥊", label: "MMA", slug: "mma" },
  { icon: "⛳", label: "Golf", slug: "golf" },
  { icon: "🎮", label: "Esports", slug: "esports" },
];

interface LiveMatch {
  id: number;
  sport: string;
  league: string;
  team1: { name: string; score: string };
  team2: { name: string; score: string };
  set?: string;
  time?: string;
  odds: { label: string; value: string }[];
}

const liveMatches: LiveMatch[] = [
  // Soccer
  {
    id: 1, sport: "soccer",
    league: "Premier League / England",
    team1: { name: "Manchester City FC", score: "2" },
    team2: { name: "Newcastle United FC", score: "1" },
    set: "67'", time: "LIVE",
    odds: [
      { label: "Man City", value: "1.35" },
      { label: "Draw", value: "5.20" },
      { label: "Newcastle", value: "8.50" },
    ],
  },
  {
    id: 2, sport: "soccer",
    league: "La Liga / Spain",
    team1: { name: "FC Barcelona", score: "1" },
    team2: { name: "Real Madrid", score: "1" },
    set: "55'", time: "LIVE",
    odds: [
      { label: "Barcelona", value: "2.10" },
      { label: "Draw", value: "3.40" },
      { label: "Real Madrid", value: "3.25" },
    ],
  },
  // Tennis
  {
    id: 3, sport: "tennis",
    league: "WTA / WTA Abu Dhabi / UAE Women Singles",
    team1: { name: "Kicab, Sara", score: "0 2" },
    team2: { name: "Cresaperta, Joana", score: "0 4" },
    set: "Set 1", time: "1:19",
    odds: [
      { label: "Kicab, Sara", value: "2.10" },
      { label: "Cresaperta, J.", value: "1.75" },
    ],
  },
  {
    id: 4, sport: "tennis",
    league: "WTA / WTA Ostrava / Women Singles",
    team1: { name: "Kreybcikova, Barbora", score: "1 6" },
    team2: { name: "Aragop, Daidanea", score: "0 3" },
    set: "Set 2", time: "0:42",
    odds: [
      { label: "Kreybcikova, B.", value: "1.17" },
      { label: "Aragop, D.", value: "4.50" },
    ],
  },
  // Basketball
  {
    id: 5, sport: "basketball",
    league: "NBA / USA",
    team1: { name: "LA Lakers", score: "89" },
    team2: { name: "Golden State Warriors", score: "95" },
    set: "Q3", time: "4:32",
    odds: [
      { label: "Lakers", value: "2.40" },
      { label: "Warriors", value: "1.58" },
    ],
  },
  // Football
  {
    id: 6, sport: "football",
    league: "NFL / USA",
    team1: { name: "Kansas City Chiefs", score: "14" },
    team2: { name: "Buffalo Bills", score: "10" },
    set: "Q2", time: "8:15",
    odds: [
      { label: "Chiefs", value: "1.65" },
      { label: "Bills", value: "2.25" },
    ],
  },
  // Hockey
  {
    id: 7, sport: "hockey",
    league: "NHL / USA",
    team1: { name: "Toronto Maple Leafs", score: "3" },
    team2: { name: "Boston Bruins", score: "2" },
    set: "P2", time: "12:05",
    odds: [
      { label: "Maple Leafs", value: "1.80" },
      { label: "Bruins", value: "2.00" },
    ],
  },
  // Cricket
  {
    id: 8, sport: "cricket",
    league: "IPL / India",
    team1: { name: "Mumbai Indians", score: "167/4" },
    team2: { name: "Chennai Super Kings", score: "120/3" },
    set: "15.2 ov", time: "LIVE",
    odds: [
      { label: "Mumbai Indians", value: "1.55" },
      { label: "Chennai SK", value: "2.45" },
    ],
  },
  {
    id: 9, sport: "cricket",
    league: "IPL / India",
    team1: { name: "Royal Challengers", score: "189/5" },
    team2: { name: "Kolkata Knight Riders", score: "" },
    set: "Innings Break",
    odds: [
      { label: "RCB", value: "1.72" },
      { label: "KKR", value: "2.15" },
    ],
  },
  {
    id: 10, sport: "cricket",
    league: "IPL / India",
    team1: { name: "Delhi Capitals", score: "145/6" },
    team2: { name: "Rajasthan Royals", score: "98/2" },
    set: "12.4 ov", time: "LIVE",
    odds: [
      { label: "Delhi Capitals", value: "2.30" },
      { label: "Rajasthan Royals", value: "1.65" },
    ],
  },
  // MMA
  {
    id: 11, sport: "mma",
    league: "UFC 310 / Las Vegas",
    team1: { name: "Jon Jones", score: "" },
    team2: { name: "Tom Aspinall", score: "" },
    set: "R2",
    odds: [
      { label: "Jones", value: "1.90" },
      { label: "Aspinall", value: "1.95" },
    ],
  },
  // Esports
  {
    id: 12, sport: "esports",
    league: "CS2 / IEM Katowice",
    team1: { name: "Team Vitality", score: "13" },
    team2: { name: "FaZe Clan", score: "11" },
    set: "Map 2", time: "LIVE",
    odds: [
      { label: "Vitality", value: "1.45" },
      { label: "FaZe", value: "2.70" },
    ],
  },
];

interface LiveEventsProps {
  onSelectOdd?: (selection: BetSelection) => void;
  isSelected?: (id: string) => boolean;
}

export const LiveEvents = ({ onSelectOdd, isSelected }: LiveEventsProps) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  const activeSport = sportTabs[activeTab]?.slug;
  const filteredMatches = liveMatches.filter((m) => m.sport === activeSport);

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-stake-orange" />
          <h3 className="text-sm md:text-base font-semibold">Live Events</h3>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <button className="hidden md:flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground bg-secondary rounded transition-colors">
            <Filter className="w-3 h-3" />
            Filters
          </button>
          <button className="hidden md:flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground bg-secondary rounded transition-colors">
            <Clock className="w-3 h-3" />
            Standard
          </button>
          <button onClick={() => scroll("left")} className="p-1 md:p-1.5 bg-secondary hover:bg-muted rounded-md transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button onClick={() => scroll("right")} className="p-1 md:p-1.5 bg-secondary hover:bg-muted rounded-md transition-colors">
            <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>

      {/* Sport Tabs */}
      <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-hide pb-1">
        {sportTabs.map((tab, idx) => {
          const count = liveMatches.filter((m) => m.sport === tab.slug).length;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === idx
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="text-lg mb-0.5">{tab.icon}</span>
              <span className="text-[10px]">{tab.label} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Live Matches */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No live {sportTabs[activeTab]?.label} events right now
        </div>
      ) : (
        <div ref={scrollRef} className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none pb-1 md:pb-0">
          {filteredMatches.map((match) => {
            const matchName = `${match.team1.name} vs ${match.team2.name}`;
            return (
              <div
                key={match.id}
                className="bg-card rounded-lg border border-border p-3 hover:border-primary/50 transition-colors flex-shrink-0 w-[85vw] md:w-auto snap-start"
              >
                {/* League Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-muted-foreground truncate flex-1">{match.league}</span>
                  {match.time && (
                    <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">
                      {match.time}
                    </span>
                  )}
                  <Tv className="w-3 h-3 text-stake-green" />
                  <Radio className="w-3 h-3 text-stake-orange" />
                </div>

                {/* Match Content */}
                <div className="flex items-center gap-3">
                  {/* Teams */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground truncate">{match.team1.name}</span>
                      <span className="text-xs font-semibold text-foreground">{match.team1.score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground truncate">{match.team2.name}</span>
                      <span className="text-xs font-semibold text-foreground">{match.team2.score}</span>
                    </div>
                  </div>

                  {/* Set/Period */}
                  {match.set && (
                    <div className="text-center px-2">
                      <span className="text-[10px] text-muted-foreground">{match.set}</span>
                    </div>
                  )}

                  {/* Odds */}
                  <div className="flex gap-1">
                    {match.odds.map((odd, idx) => {
                      const selId = `live-${match.id}-${idx}`;
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
                          className={`px-3 py-2 rounded text-center min-w-[80px] transition-all ${
                            selected
                              ? "bg-accent/20 border-2 border-accent ring-1 ring-accent/30"
                              : "bg-secondary hover:bg-muted border border-transparent"
                          }`}
                        >
                          <span className="text-[9px] text-muted-foreground block truncate">{odd.label}</span>
                          <span className={`text-xs font-semibold ${selected ? "text-accent" : "text-foreground"}`}>{odd.value}</span>
                        </button>
                      );
                    })}
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
