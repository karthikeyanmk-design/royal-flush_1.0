"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Gift, Gamepad2, Dumbbell, Ticket, Crown } from "lucide-react";

const promo1 = "/assets/promo-1.png";
const promo2 = "/assets/promo-2.png";
const promo3 = "/assets/promo-3.png";
const promoTennis = "/assets/promo-tennis.png";
const promoVip = "/assets/promo-vip.png";
const promoNfl = "/assets/promo-nfl.png";

const filters = [
  { id: "all", label: "All", icon: Gift },
  { id: "casino", label: "Casino", icon: Gamepad2 },
  { id: "sports", label: "Sports", icon: Dumbbell },
  { id: "lottery", label: "Lottery", icon: Ticket },
  { id: "vip", label: "VIP", icon: Crown },
];

const promotions = [
  { id: 1, title: "$75,000 Weekly Raffle", desc: "Wager to earn raffle tickets. The more you play, the more entries you get.", category: "casino", image: promo1, cta: "Join Raffle" },
  { id: 2, title: "Royal Flush VIP Rewards", desc: "Exclusive 2x VIP progression for all VIP members this month.", category: "vip", image: promoVip, cta: "Learn More" },
  { id: 3, title: "NFL 3rd Quarter Payout", desc: "If your team is up by 7+ at the end of the 3rd quarter, you win!", category: "sports", image: promoNfl, cta: "Bet Now" },
  { id: 4, title: "Australian Open Refund", desc: "Final set tiebreaker refund on all Australian Open matches.", category: "sports", image: promoTennis, cta: "Bet Now" },
  { id: 5, title: "The Return Challenge", desc: "Win up to $1,000,000 in our biggest casino challenge ever.", category: "casino", image: promo2, cta: "Play Now" },
  { id: 6, title: "Daily Lottery Bonus", desc: "Buy 3 lottery tickets and get the 4th one free. Every day!", category: "lottery", image: promo3, cta: "Buy Tickets" },
  { id: 7, title: "Weekend Reload", desc: "Deposit on weekends and receive a 50% bonus up to $500.", category: "casino", image: promo1, cta: "Claim Bonus" },
  { id: 8, title: "Esports Special", desc: "Enhanced odds on all CS2 and Dota 2 matches this week.", category: "sports", image: promoNfl, cta: "Bet Now" },
  { id: 9, title: "VIP Birthday Reward", desc: "VIP members receive a special birthday bonus every year.", category: "vip", image: promoVip, cta: "Learn More" },
];

const PromotionsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? promotions
    : promotions.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className={cn("transition-all duration-300", "ml-0", sidebarOpen ? "md:ml-56" : "md:ml-14")}>
        <Header />
        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0 py-6">
          {/* Hero */}
          <div className="text-center mb-8">
            <Gift className="w-10 h-10 text-accent mx-auto mb-3" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Promotions & Bonuses</h1>
            <p className="text-muted-foreground">Exclusive offers for Royal Flush players</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeFilter === f.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <f.icon className="w-4 h-4" />
                {f.label}
              </button>
            ))}
          </div>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((promo) => (
              <Card key={promo.id} className="bg-card border-border overflow-hidden group hover:border-accent/30 transition-colors">
                <div className="h-40 overflow-hidden">
                  <img src={promo.image} alt={promo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <CardContent className="pt-4 pb-4">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-accent border border-accent rounded mb-2 uppercase">
                    {promo.category}
                  </span>
                  <h3 className="font-bold text-sm mb-1">{promo.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{promo.desc}</p>
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs">
                    {promo.cta}
                  </Button>
                  <p className="text-[10px] text-muted-foreground mt-2">Terms Apply</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PromotionsPage;
