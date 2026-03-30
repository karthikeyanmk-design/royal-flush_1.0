"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { GameCardSkeleton } from "./GameCardSkeleton";
import { AppLink } from "@/lib/navigation";
const game1 = "/assets/game-1.png";
const game2 = "/assets/game-2.png";
const game3 = "/assets/game-3.png";
const game4 = "/assets/game-4.png";
const game5 = "/assets/game-5.png";
const game6 = "/assets/game-6.png";
const game7 = "/assets/game-7.png";

const games = [{
  id: 1,
  name: "Sweet Bonanza 1000",
  image: game1,
  players: 575,
  tag: "PRAGMATIC PLAY"
}, {
  id: 2,
  name: "Gates of Olympus 1000",
  image: game2,
  players: 538,
  tag: "PRAGMATIC PLAY"
}, {
  id: 3,
  name: "Sugar Rush 1000",
  image: game3,
  players: 406,
  tag: "PRAGMATIC PLAY"
}, {
  id: 4,
  name: "Zeus vs Hades",
  image: game4,
  players: 250,
  tag: "PRAGMATIC PLAY"
}, {
  id: 5,
  name: "Sugar Rush",
  image: game5,
  players: 383,
  tag: "PRAGMATIC PLAY"
}, {
  id: 6,
  name: "Deal With Death",
  image: game6,
  players: 64,
  tag: "RELAX GAME"
}, {
  id: 7,
  name: "Big Bass Bonanza",
  image: game7,
  players: 296,
  tag: "PRAGMATIC PLAY"
}, {
  id: 8,
  name: "Power of Ten",
  image: game1,
  players: 201,
  tag: "PRAGMATIC PLAY"
}, {
  id: 9,
  name: "Sword Drop",
  image: game4,
  players: 129,
  tag: "PRAGMATIC PLAY"
}];

export const TrendingGames = () => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-stake-orange" />
          <h3 className="text-sm md:text-base font-semibold">Trending Games</h3>
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
          : games.map((game) => {
              const slug = game.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <AppLink
                  key={game.id}
                  href={`/casino/game/${slug}`}
                  className="flex-shrink-0 w-[110px] md:w-[136px] group"
                >
                  <div className="relative rounded-lg overflow-hidden mb-1">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-[147px] md:h-[182px] object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1.5 px-1 py-0.5 bg-secondary/80 backdrop-blur-sm rounded text-[8px] md:text-[10px] font-medium">
                      {game.tag}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-accent px-3 py-1.5 rounded-lg transition-opacity">
                        Play Now
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] md:text-xs text-stake-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-stake-green rounded-full" />
                    {game.players} playing
                  </p>
                </AppLink>
              );
            })}
      </div>
    </section>
  );
};