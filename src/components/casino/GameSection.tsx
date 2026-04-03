"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { GameCardSkeleton } from "@/components/GameCardSkeleton";
import { AppLink } from "@/lib/navigation";

interface Game {
  id: number;
  name: string;
  slug?: string;
  image: string;
  players: number;
  tag?: string;
}

// Map of known game slugs that have actual pages
const knownSlugs: Record<string, string> = {
  "dice": "dice", "mines": "mines", "plinko": "plinko", "crash": "crash",
  "limbo": "limbo", "keno": "keno", "hilo": "hilo",
  "sweet-bonanza-1000": "sweet-bonanza", "sweet-bonanza": "sweet-bonanza",
  "gates-of-olympus-1000": "gates-of-olympus", "gates-of-olympus": "gates-of-olympus",
  "sugar-rush-1000": "sugar-rush", "sugar-rush": "sugar-rush",
  "wanted-dead-or-wild": "wanted-dead", "wanted-dead": "wanted-dead",
  "big-bass-bonanza": "big-bass", "big-bass": "big-bass",
  "crazy-time": "crazy-time", "lightning-roulette": "lightning-roulette",
  "aviator": "aviator",
};

// Convert game name to URL slug, mapping to known pages
const toSlug = (name: string) => {
  const raw = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return knownSlugs[raw] || raw;
};

interface GameSectionProps {
  title: string;
  icon: LucideIcon;
  games: Game[];
  iconColor?: string;
  showTag?: boolean;
  showPlayers?: boolean;
}

export const GameSection = ({
  title,
  icon: Icon,
  games,
  iconColor = "text-primary",
  showTag = true,
  showPlayers = true
}: GameSectionProps) => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200 + Math.random() * 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <h3 className="text-sm md:text-base font-semibold">{title}</h3>
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
          ? Array.from({ length: 7 }).map((_, i) => <GameCardSkeleton key={i} />)
          : games.map((game) => (
              <AppLink
                key={game.id}
                href={`/casino/game/${game.slug || toSlug(game.name)}`}
                className="flex-shrink-0 w-[110px] md:w-[136px] group"
              >
                <div className="relative rounded-lg overflow-hidden mb-1">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-[147px] md:h-[182px] object-cover transition-transform group-hover:scale-105"
                  />
                  {showTag && game.tag && (
                    <div className="absolute top-1.5 left-1.5 px-1 py-0.5 bg-secondary/80 backdrop-blur-sm rounded text-[8px] md:text-[10px] font-medium">
                      {game.tag}
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-accent px-3 py-1.5 rounded-lg transition-opacity">
                      Play Now
                    </span>
                  </div>
                </div>
                {showPlayers && (
                  <p className="text-[10px] md:text-xs text-stake-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-stake-green rounded-full animate-pulse" />
                    {game.players} playing
                  </p>
                )}
              </AppLink>
            ))}
      </div>
    </section>
  );
};
