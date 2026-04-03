"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
const promoTennis = "/assets/promo-tennis.png";
const promoVip = "/assets/promo-vip.png";
const promoNfl = "/assets/promo-nfl.png";

const promoCards = [
  {
    id: 1,
    title: "Australian Open",
    subtitle: "Final Set Tiebreaker Refund",
    image: promoTennis,
  },
  {
    id: 2,
    title: "Only on Royal Flush VIP",
    subtitle: "2x VIP Progression",
    image: promoVip,
  },
  {
    id: 3,
    title: "NFL 3rd Q Payout",
    subtitle: "7+ Up? You Win",
    image: promoNfl,
  },
];

export const SportsHero = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="px-3 md:px-4 py-2 md:py-3">
        <div className="flex md:grid md:grid-cols-3 gap-2 md:gap-3 overflow-x-auto md:overflow-visible scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 md:h-28 rounded-lg flex-shrink-0 w-[80vw] md:w-auto" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      {/* Mobile scroll arrows */}
      <div className="flex md:hidden items-center justify-end gap-1 mb-2">
        <button onClick={() => scroll("left")} className="p-1 bg-secondary hover:bg-muted rounded-md transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => scroll("right")} className="p-1 bg-secondary hover:bg-muted rounded-md transition-colors">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex md:grid md:grid-cols-3 gap-2 md:gap-3 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none -mx-3 px-3 md:mx-0 md:px-0">
        {promoCards.map((card) => (
          <div
            key={card.id}
            className="relative rounded-lg overflow-hidden bg-card border border-border cursor-pointer group hover:border-primary/50 transition-colors flex-shrink-0 w-[80vw] md:w-auto snap-start"
          >
            <div className="flex items-center justify-between p-4">
              {/* Left content */}
              <div className="flex-1 pr-3">
                <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-stake-teal border border-stake-teal rounded mb-2">
                  Promotion
                </span>
                <h3 className="text-sm md:text-base font-bold text-foreground mb-0.5">{card.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{card.subtitle}</p>
                <button className="text-xs font-medium text-stake-teal hover:underline transition-colors">
                  Read More
                </button>
              </div>

              {/* Right image */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
