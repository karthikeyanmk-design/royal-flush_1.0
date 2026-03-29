"use client";
import { useState } from "react";
import { Search, LayoutGrid, Sparkles, Clock, Trophy, Flame, Tv } from "lucide-react";

const tabs = [
  { icon: LayoutGrid, label: "Lobby", id: "lobby" },
  { icon: Sparkles, label: "Only on Royal Flush", id: "exclusive" },
  { icon: Clock, label: "Starting Soon", id: "starting" },
  { icon: Trophy, label: "Outrights", id: "outrights" },
  { icon: Flame, label: "Popular", id: "popular" },
  { icon: Tv, label: "Live Events", id: "live" },
];

interface SportsSearchBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const SportsSearchBar = ({ activeTab: controlledTab, onTabChange }: SportsSearchBarProps) => {
  const [internalTab, setInternalTab] = useState("lobby");
  const activeTab = controlledTab ?? internalTab;

  const handleTabChange = (id: string) => {
    if (onTabChange) {
      onTabChange(id);
    } else {
      setInternalTab(id);
    }
  };

  return (
    <section className="px-3 md:px-4 py-2">
      <div className="relative mb-3">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your event"
          className="w-full h-11 md:h-12 pl-11 pr-4 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
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
