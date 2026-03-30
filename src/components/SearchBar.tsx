"use client";
import { useState, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";

const categories = ["Casino", "Sports", "Lottery"];

export const SearchBar = () => {
  const [category, setCategory] = useState("Casino");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="px-3 md:px-4 py-2 md:py-3">
      <div
        className={`flex items-center bg-secondary rounded-lg overflow-visible border transition-colors relative ${
          focused ? "border-accent ring-1 ring-accent/30" : "border-border"
        }`}
      >
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-foreground hover:text-accent transition-colors border-r border-border whitespace-nowrap"
          >
            {category}
            <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-lg shadow-xl py-1 min-w-[120px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      category === cat
                        ? "text-accent bg-accent/10"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2.5 px-3 md:px-4">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search your game"
            className="flex-1 bg-transparent text-xs md:text-sm outline-none placeholder:text-muted-foreground py-2.5 md:py-3 text-foreground"
          />
        </div>

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="p-2 mr-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
