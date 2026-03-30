"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";
const promo1 = "/assets/promo-1.png";
const promo2 = "/assets/promo-2.png";
const promo3 = "/assets/promo-3.png";
const promotions = [{
  id: 1,
  title: "Australian Open",
  subtitle: "Final Set Tiebreaker Refund",
  cta: "Read More",
  image: promo1
}, {
  id: 2,
  title: "Only on Royal Flush VIP",
  subtitle: "2x VIP Progression",
  cta: "Read More",
  image: promo2
}, {
  id: 3,
  title: "NFL 3rd Q Payout",
  subtitle: "7+ Up? You Win",
  cta: "Read More",
  image: promo3
}];
export const Promotions = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return <section className="px-3 md:px-4 py-2 md:py-4">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <div className="flex items-center gap-2">
          <Gift className="w-4 md:w-5 h-4 md:h-5 text-stake-yellow" />
          <h3 className="text-sm md:text-lg font-semibold">Promotions</h3>
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

      {/* Mobile: horizontal scroll, Desktop: 3-column grid */}
      <div ref={scrollRef} className="flex md:grid md:grid-cols-3 gap-2 md:gap-4 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none -mx-3 px-3 md:mx-0 md:px-0">
        {promotions.map(promo => (
          <div 
            key={promo.id} 
            className="flex items-center gap-3 md:gap-4 bg-card rounded-lg p-3 md:p-4 hover:bg-stake-card-hover transition-colors cursor-pointer flex-shrink-0 w-[80vw] md:w-auto snap-start"
          >
            <div className="flex-1 min-w-0">
              <span className="inline-block px-1.5 md:px-2 py-0.5 text-[8px] md:text-[10px] rounded mb-1.5 md:mb-2 bg-zinc-300 font-bold text-secondary">
                Promotion
              </span>
              <h4 className="font-semibold text-xs md:text-sm mb-0.5 md:mb-1">{promo.title}</h4>
              <p className="text-[10px] md:text-xs text-muted-foreground mb-1.5 md:mb-2">{promo.subtitle}</p>
              <button className="text-[10px] md:text-xs text-stake-teal font-semibold hover:underline">
                {promo.cta}
              </button>
            </div>
            <img src={promo.image} alt={promo.title} className="w-20 h-16 md:w-24 md:h-20 object-cover rounded-lg flex-shrink-0" />
          </div>
        ))}
      </div>
    </section>;
};