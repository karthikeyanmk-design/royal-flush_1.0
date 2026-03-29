"use client";
import { Search, Gamepad2, Star, Gift, Sparkles, Zap, Video } from "lucide-react";

const tabs = [
  { icon: Gamepad2, label: "Lobby", id: "lobby" },
  { icon: Star, label: "Only on Royal Flush", id: "exclusive" },
  { icon: Gift, label: "New Releases", id: "new" },
  { icon: Sparkles, label: "Royal Flush Originals", id: "originals" },
  { icon: Zap, label: "Slots", id: "slots" },
  { icon: Video, label: "Live Casino", id: "live" },
];

interface CasinoSearchBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CasinoSearchBar = ({ activeTab, onTabChange, searchQuery, onSearchChange }: CasinoSearchBarProps) => {
  return (
    <section className="px-3 md:px-4 py-2">
      <div className="relative mb-3">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your game"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-11 md:h-12 pl-11 pr-4 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
};
