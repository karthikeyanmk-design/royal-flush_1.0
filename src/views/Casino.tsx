"use client";
import { useState, useMemo } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { CasinoHero } from "@/components/casino/CasinoHero";
import { CasinoSearchBar } from "@/components/casino/CasinoSearchBar";
import { GameSection } from "@/components/casino/GameSection";
import { PublishersSection } from "@/components/casino/PublishersSection";
import { TopSportsPicks } from "@/components/casino/TopSportsPicks";
import { CasinoBetsTable } from "@/components/casino/CasinoBetsTable";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, Video, Tv, Star, Rocket, Gift } from "lucide-react";

const game1 = "/assets/game-1.png";
const game2 = "/assets/game-2.png";
const game3 = "/assets/game-3.png";
const game4 = "/assets/game-4.png";
const game5 = "/assets/game-5.png";
const game6 = "/assets/game-6.png";
const game7 = "/assets/game-7.png";

const royalFlushOriginalsGames = [
  { id: 1, name: "Dice", image: game1, players: 1250, tag: "ROYAL FLUSH ORIGINAL" },
  { id: 2, name: "Mines", image: game2, players: 980, tag: "ROYAL FLUSH ORIGINAL" },
  { id: 3, name: "Plinko", image: game3, players: 756, tag: "ROYAL FLUSH ORIGINAL" },
  { id: 4, name: "Crash", image: game4, players: 1420, tag: "ROYAL FLUSH ORIGINAL" },
  { id: 5, name: "Limbo", image: game5, players: 543, tag: "ROYAL FLUSH ORIGINAL" },
  { id: 6, name: "Keno", image: game6, players: 321, tag: "ROYAL FLUSH ORIGINAL" },
  { id: 7, name: "Hilo", image: game7, players: 412, tag: "ROYAL FLUSH ORIGINAL" },
];

const slotsGames = [
  { id: 1, name: "Sweet Bonanza 1000", image: game1, players: 585, tag: "PRAGMATIC PLAY" },
  { id: 2, name: "Gates of Olympus", image: game2, players: 538, tag: "PRAGMATIC PLAY" },
  { id: 3, name: "Sugar Rush 1000", image: game3, players: 406, tag: "PRAGMATIC PLAY" },
  { id: 4, name: "Wanted Dead or Wild", image: game4, players: 250, tag: "HACKSAW" },
  { id: 5, name: "Big Bass Bonanza", image: game5, players: 383, tag: "PRAGMATIC PLAY" },
  { id: 6, name: "Book of Dead", image: game6, players: 264, tag: "PLAY'N GO" },
  { id: 7, name: "Starlight Princess", image: game7, players: 296, tag: "PRAGMATIC PLAY" },
];

const liveCasinoGames = [
  { id: 1, name: "Blackjack VIP", image: game2, players: 890, tag: "EVOLUTION" },
  { id: 2, name: "Lightning Roulette", image: game3, players: 1120, tag: "EVOLUTION" },
  { id: 3, name: "Baccarat", image: game4, players: 654, tag: "EVOLUTION" },
  { id: 4, name: "Dragon Tiger", image: game5, players: 432, tag: "EVOLUTION" },
  { id: 5, name: "Mega Ball", image: game6, players: 567, tag: "EVOLUTION" },
  { id: 6, name: "Crazy Time", image: game1, players: 1340, tag: "EVOLUTION" },
  { id: 7, name: "Speed Baccarat", image: game7, players: 345, tag: "EVOLUTION" },
];

const gameShowsGames = [
  { id: 1, name: "Crazy Time", image: game1, players: 2340, tag: "EVOLUTION" },
  { id: 2, name: "Monopoly Live", image: game2, players: 1890, tag: "EVOLUTION" },
  { id: 3, name: "Dream Catcher", image: game3, players: 987, tag: "EVOLUTION" },
  { id: 4, name: "Deal or No Deal", image: game4, players: 765, tag: "EVOLUTION" },
  { id: 5, name: "Football Studio", image: game5, players: 543, tag: "EVOLUTION" },
  { id: 6, name: "Lightning Dice", image: game6, players: 654, tag: "EVOLUTION" },
  { id: 7, name: "Funky Time", image: game7, players: 876, tag: "EVOLUTION" },
];

const onlyOnRoyalFlushGames = [
  { id: 1, name: "Le Rapper", image: game3, players: 234, tag: "EXCLUSIVE" },
  { id: 2, name: "Catastrophe", image: game4, players: 456, tag: "EXCLUSIVE" },
  { id: 3, name: "Bank Basher", image: game5, players: 321, tag: "EXCLUSIVE" },
  { id: 4, name: "Royal Flush Royale", image: game6, players: 567, tag: "EXCLUSIVE" },
  { id: 5, name: "Lucky Gems", image: game1, players: 432, tag: "EXCLUSIVE" },
  { id: 6, name: "Gold Rush", image: game2, players: 654, tag: "EXCLUSIVE" },
  { id: 7, name: "Diamond Strike", image: game7, players: 345, tag: "EXCLUSIVE" },
];

const burstGames = [
  { id: 1, name: "Aviator", image: game5, players: 2100, tag: "SPRIBE" },
  { id: 2, name: "Aviamasters", image: game6, players: 890, tag: "ROYAL FLUSH ORIGINAL" },
  { id: 3, name: "Angry Balls", image: game7, players: 567, tag: "ROYAL FLUSH ORIGINAL" },
  { id: 4, name: "Spaceman", image: game1, players: 765, tag: "PRAGMATIC PLAY" },
  { id: 5, name: "JetX", image: game2, players: 543, tag: "SMARTSOFT" },
  { id: 6, name: "Rocket X", image: game3, players: 432, tag: "1X2 GAMING" },
  { id: 7, name: "Cappadocia", image: game4, players: 321, tag: "SMARTSOFT" },
];

const newReleasesGames = [
  { id: 1, name: "Zeus Lightning", image: game7, players: 123, tag: "NEW" },
  { id: 2, name: "Wild Don", image: game1, players: 87, tag: "NEW" },
  { id: 3, name: "Wicked Brew", image: game2, players: 65, tag: "NEW" },
  { id: 4, name: "Fortune Tiger", image: game3, players: 234, tag: "NEW" },
  { id: 5, name: "Mystic Fortune", image: game4, players: 156, tag: "NEW" },
  { id: 6, name: "Dragon's Gold", image: game5, players: 98, tag: "NEW" },
  { id: 7, name: "Pharaoh's Riches", image: game6, players: 187, tag: "NEW" },
];

// Map tab IDs to which sections to show
const tabSections: Record<string, string[]> = {
  lobby: ["originals", "slots", "live", "shows", "exclusive", "burst", "new"],
  exclusive: ["exclusive"],
  new: ["new"],
  originals: ["originals"],
  slots: ["slots", "burst"],
  live: ["live", "shows"],
};

const allSections = [
  { id: "originals", title: "Royal Flush Originals", icon: Sparkles, games: royalFlushOriginalsGames, iconColor: "text-stake-teal" },
  { id: "slots", title: "Slots", icon: Zap, games: slotsGames, iconColor: "text-stake-orange" },
  { id: "live", title: "Live Casino", icon: Video, games: liveCasinoGames, iconColor: "text-red-500" },
  { id: "shows", title: "Game Shows", icon: Tv, games: gameShowsGames, iconColor: "text-purple-500" },
  { id: "exclusive", title: "Only on Royal Flush", icon: Star, games: onlyOnRoyalFlushGames, iconColor: "text-yellow-500" },
  { id: "burst", title: "Burst Games", icon: Rocket, games: burstGames, iconColor: "text-blue-500" },
  { id: "new", title: "New Releases", icon: Gift, games: newReleasesGames, iconColor: "text-green-500" },
];

const Casino = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("lobby");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleSections = useMemo(() => {
    const allowed = tabSections[activeTab] || tabSections.lobby;
    let sections = allSections.filter((s) => allowed.includes(s.id));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      sections = sections
        .map((s) => ({
          ...s,
          games: s.games.filter(
            (g) =>
              g.name.toLowerCase().includes(q) ||
              (g.tag && g.tag.toLowerCase().includes(q))
          ),
        }))
        .filter((s) => s.games.length > 0);
    }

    return sections;
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      <div className={cn("transition-all duration-300", "ml-0", sidebarOpen ? "md:ml-56" : "md:ml-14")}>
        <Header />

        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0">
          <CasinoHero />
          <CasinoSearchBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {visibleSections.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">No games found{searchQuery ? ` for "${searchQuery}"` : ""}</p>
            </div>
          ) : (
            visibleSections.map((section) => (
              <GameSection
                key={section.id}
                title={section.title}
                icon={section.icon}
                games={section.games}
                iconColor={section.iconColor}
              />
            ))
          )}

          {activeTab === "lobby" && (
            <>
              <PublishersSection />
              <TopSportsPicks />
            </>
          )}
          <CasinoBetsTable />
        </main>
        <Footer />
      </div>

      <MobileNav />
    </div>
  );
};

export default Casino;
