"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const promo1 = "/assets/promo-1.png";
const promo2 = "/assets/promo-2.png";
const promo3 = "/assets/promo-3.png";

const promoCards = [
  {
    id: 1,
    title: "$75,000 Weekly Raffle",
    subtitle: "Top up your account with your cryptos",
    buttonText: "Race Now",
    image: promo1,
  },
  {
    id: 2,
    title: "Royal Flush vs Eddie",
    subtitle: "Guess and win up to $150,000",
    buttonText: "Play Now",
    image: promo2,
  },
  {
    id: 3,
    title: "The Return Challenge",
    subtitle: "Win up to $1,000,000 cash",
    buttonText: "Play Now",
    image: promo3,
  },
];

export const CasinoHero = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="px-3 md:px-4 py-2 md:py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 md:h-32 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        {promoCards.map((card) => (
          <div
            key={card.id}
            className="relative rounded-lg overflow-hidden bg-card border border-border cursor-pointer group hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between p-4">
              {/* Left content */}
              <div className="flex-1 pr-3">
                <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-stake-teal border border-stake-teal rounded mb-2">
                  Promotion
                </span>
                <h3 className="text-sm md:text-base font-bold text-foreground mb-0.5">{card.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{card.subtitle}</p>
                <button className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded hover:bg-primary/90 transition-colors">
                  {card.buttonText}
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
