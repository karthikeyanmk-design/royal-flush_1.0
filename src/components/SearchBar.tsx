"use client";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="px-3 md:px-4 py-2 md:py-4">
      <div className="flex items-center bg-secondary rounded-md overflow-hidden border border-border">
        <div className="flex-1 flex items-center gap-3 px-3 md:px-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your game or event"
            className="flex-1 bg-transparent text-xs md:text-sm outline-none placeholder:text-muted-foreground py-2.5 md:py-3 text-foreground"
          />
        </div>
      </div>
    </div>
  );
};
