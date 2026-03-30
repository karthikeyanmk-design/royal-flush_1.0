"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Ticket } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LotteryCategory {
  id: number;
  name: string;
  prize: string;
  nextDraw: string;
  ticketPrice: string;
}

const categories: LotteryCategory[] = [
  { id: 1, name: "Daily Lottery", prize: "₹10,00,000", nextDraw: "Today 9 PM", ticketPrice: "₹50" },
  { id: 2, name: "Weekly Lottery", prize: "₹1,00,00,000", nextDraw: "Sunday 8 PM", ticketPrice: "₹100" },
  { id: 3, name: "Mega Jackpot", prize: "₹25,00,00,000", nextDraw: "1st of Month", ticketPrice: "₹500" },
  { id: 4, name: "Special Draw", prize: "₹5,00,00,000", nextDraw: "Diwali Special", ticketPrice: "₹200" },
  { id: 5, name: "Flash Lottery", prize: "₹1,00,000", nextDraw: "Every Hour", ticketPrice: "₹10" },
];

export const LotteryCategories = () => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-3 md:px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Ticket className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold">Lottery Categories</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => scroll("left")} className="p-1.5 bg-secondary hover:bg-muted rounded transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => scroll("right")} className="p-1.5 bg-secondary hover:bg-muted rounded transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[160px] md:w-[180px]">
                <Skeleton className="h-[100px] rounded-lg" />
              </div>
            ))
          : categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-[170px] md:w-[200px] cursor-pointer"
              >
                <div className="h-[110px] rounded-lg bg-card border border-border p-4 transition-colors hover:border-primary/40">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{category.name}</p>
                  <p className="text-lg font-bold mt-1 mb-1">{category.prize}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-muted-foreground">{category.nextDraw}</span>
                    <span className="text-xs font-medium text-primary">{category.ticketPrice}</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};
