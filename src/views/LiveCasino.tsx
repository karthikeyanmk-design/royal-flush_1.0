"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { CasinoHero } from "@/components/casino/CasinoHero";
import { GameSection } from "@/components/casino/GameSection";
import { CasinoBetsTable } from "@/components/casino/CasinoBetsTable";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { cn } from "@/lib/utils";
import { Video, Tv, Sparkles, Zap } from "lucide-react";

const game1 = "/assets/game-1.png";
const game2 = "/assets/game-2.png";
const game3 = "/assets/game-3.png";
const game4 = "/assets/game-4.png";
const game5 = "/assets/game-5.png";
const game6 = "/assets/game-6.png";
const game7 = "/assets/game-7.png";

const liveBlackjack = [
  { id: 1, name: "Blackjack VIP", image: game2, players: 890, tag: "EVOLUTION" },
  { id: 2, name: "Speed Blackjack", image: game3, players: 654, tag: "EVOLUTION" },
  { id: 3, name: "Infinite Blackjack", image: game5, players: 432, tag: "EVOLUTION" },
  { id: 4, name: "Free Bet Blackjack", image: game1, players: 321, tag: "EVOLUTION" },
  { id: 5, name: "Power Blackjack", image: game7, players: 256, tag: "EVOLUTION" },
  { id: 6, name: "Classic Blackjack", image: game4, players: 198, tag: "PRAGMATIC PLAY" },
  { id: 7, name: "Blackjack Party", image: game6, players: 543, tag: "EVOLUTION" },
];

const liveRoulette = [
  { id: 1, name: "Lightning Roulette", image: game3, players: 1120, tag: "EVOLUTION" },
  { id: 2, name: "Immersive Roulette", image: game1, players: 876, tag: "EVOLUTION" },
  { id: 3, name: "Auto Roulette", image: game5, players: 543, tag: "EVOLUTION" },
  { id: 4, name: "Speed Roulette", image: game2, players: 432, tag: "EVOLUTION" },
  { id: 5, name: "Double Ball Roulette", image: game6, players: 321, tag: "EVOLUTION" },
  { id: 6, name: "Mega Roulette", image: game4, players: 567, tag: "PRAGMATIC PLAY" },
  { id: 7, name: "Turkish Roulette", image: game7, players: 234, tag: "EVOLUTION" },
];

const liveBaccarat = [
  { id: 1, name: "Baccarat", image: game4, players: 654, tag: "EVOLUTION" },
  { id: 2, name: "Speed Baccarat", image: game7, players: 345, tag: "EVOLUTION" },
  { id: 3, name: "Lightning Baccarat", image: game1, players: 567, tag: "EVOLUTION" },
  { id: 4, name: "No Commission Baccarat", image: game3, players: 234, tag: "EVOLUTION" },
  { id: 5, name: "Baccarat Squeeze", image: game5, players: 432, tag: "EVOLUTION" },
  { id: 6, name: "Dragon Tiger", image: game2, players: 321, tag: "EVOLUTION" },
  { id: 7, name: "Super 6 Baccarat", image: game6, players: 198, tag: "PRAGMATIC PLAY" },
];

const gameShows = [
  { id: 1, name: "Crazy Time", image: game1, players: 2340, tag: "EVOLUTION" },
  { id: 2, name: "Monopoly Live", image: game2, players: 1890, tag: "EVOLUTION" },
  { id: 3, name: "Dream Catcher", image: game3, players: 987, tag: "EVOLUTION" },
  { id: 4, name: "Deal or No Deal", image: game4, players: 765, tag: "EVOLUTION" },
  { id: 5, name: "Football Studio", image: game5, players: 543, tag: "EVOLUTION" },
  { id: 6, name: "Lightning Dice", image: game6, players: 654, tag: "EVOLUTION" },
  { id: 7, name: "Funky Time", image: game7, players: 876, tag: "EVOLUTION" },
];

const LiveCasino = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className={cn("transition-all duration-300", "ml-0", sidebarOpen ? "md:ml-56" : "md:ml-14")}>
        <Header />
        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0">
          <CasinoHero />
          <GameSection title="Live Blackjack" icon={Sparkles} games={liveBlackjack} iconColor="text-accent" />
          <GameSection title="Live Roulette" icon={Zap} games={liveRoulette} iconColor="text-red-500" />
          <GameSection title="Live Baccarat" icon={Video} games={liveBaccarat} iconColor="text-accent" />
          <GameSection title="Game Shows" icon={Tv} games={gameShows} iconColor="text-purple-500" />
          <CasinoBetsTable />
        </main>
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
};

export default LiveCasino;
