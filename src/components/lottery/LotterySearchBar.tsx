"use client";
import { Search, LayoutGrid, Ticket, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "lobby", label: "Lobby", icon: LayoutGrid },
  { id: "my-tickets", label: "My Tickets", icon: Ticket },
  { id: "favourites", label: "Favourites", icon: Star },
  { id: "starting-soon", label: "Starting Soon", icon: Clock },
];

interface LotterySearchBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const LotterySearchBar = ({ activeTab, onTabChange }: LotterySearchBarProps) => {
  return (
    <section className="px-3 md:px-4 py-3">
      <div className="relative mb-3">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search lottery"
          className="w-full h-11 pl-12 pr-4 bg-card border border-border rounded-lg text-base placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
