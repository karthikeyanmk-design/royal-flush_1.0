"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Card, CardContent } from "@/components/ui/card";
import { AppLink } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Crown, Gift, Zap, Clock, Star, HeadphonesIcon, Cake } from "lucide-react";

const tiers = [
  { name: "Bronze", wager: "$10,000", color: "border-[#CD7F32] text-[#CD7F32]", bg: "from-[#CD7F32]/20 to-transparent", benefits: ["Weekly Bonus", "Priority Support", "Basic Rewards"] },
  { name: "Silver", wager: "$50,000", color: "border-[#C0C0C0] text-[#C0C0C0]", bg: "from-[#C0C0C0]/20 to-transparent", benefits: ["Monthly Bonus", "Faster Withdrawals", "Reload Bonuses"] },
  { name: "Gold", wager: "$250,000", color: "border-[#E50914] text-[#E50914]", bg: "from-[#E50914]/20 to-transparent", benefits: ["Dedicated Host", "Custom Limits", "Exclusive Events"] },
  { name: "Platinum", wager: "$1,000,000", color: "border-[#E5E4E2] text-[#E5E4E2]", bg: "from-[#E5E4E2]/20 to-transparent", benefits: ["Personal Host", "Travel Packages", "VIP Events"] },
  { name: "Diamond", wager: "$5,000,000", color: "border-[#B9F2FF] text-[#B9F2FF]", bg: "from-[#B9F2FF]/20 to-transparent", benefits: ["Everything Above", "Luxury Gifts", "Bespoke Offers"] },
];

const benefits = [
  { icon: HeadphonesIcon, title: "Dedicated Host", desc: "Personal account manager available 24/7" },
  { icon: Zap, title: "Faster Withdrawals", desc: "Priority processing for all withdrawal requests" },
  { icon: Gift, title: "Exclusive Bonuses", desc: "Higher percentages and custom bonus offers" },
  { icon: Star, title: "Higher Limits", desc: "Increased betting and deposit limits" },
  { icon: Cake, title: "Birthday Rewards", desc: "Special bonus on your birthday every year" },
  { icon: Crown, title: "Personalized Offers", desc: "Tailored promotions based on your play style" },
];

const VipClub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className={cn("transition-all duration-300", "ml-0", sidebarOpen ? "md:ml-56" : "md:ml-14")}>
        <Header />
        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0 py-6 space-y-10">
          {/* Hero */}
          <div className="text-center py-8 rounded-xl bg-gradient-to-br from-[#B20710] to-[#5C0A0A]">
            <Crown className="w-12 h-12 text-accent mx-auto mb-3" />
            <h1 className="text-2xl md:text-4xl font-bold text-accent mb-2">Royal Flush VIP Club</h1>
            <p className="text-white/70 max-w-lg mx-auto">Exclusive rewards for our most valued players. The more you play, the higher you climb.</p>
          </div>

          {/* Tiers */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-center">VIP Tiers</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {tiers.map((tier) => (
                <Card key={tier.name} className={cn("flex-shrink-0 w-56 bg-card border-2", tier.color)}>
                  <CardContent className={cn("pt-6 pb-4 bg-gradient-to-b", tier.bg)}>
                    <Crown className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">Wager {tier.wager}</p>
                    <ul className="space-y-1">
                      {tier.benefits.map((b) => (
                        <li key={b} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-accent" /> {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits Grid */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-center">VIP Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((b) => (
                <Card key={b.title} className="bg-card border-border">
                  <CardContent className="pt-5 pb-4">
                    <b.icon className="w-6 h-6 text-accent mb-2" />
                    <h3 className="font-semibold text-sm mb-1">{b.title}</h3>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center py-8">
            <h2 className="text-xl font-bold mb-2">Start Your VIP Journey</h2>
            <p className="text-muted-foreground mb-4 text-sm">Create an account and start playing to unlock VIP rewards</p>
            <AppLink href="/register">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
                Get Started
              </Button>
            </AppLink>
          </div>
        </main>
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
};

export default VipClub;
