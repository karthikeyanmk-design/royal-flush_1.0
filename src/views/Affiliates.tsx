"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppLink } from "@/lib/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Users, Share2, DollarSign, BarChart3, Clock, Headphones, Infinity } from "lucide-react";

const steps = [
  { num: 1, icon: Users, title: "Sign Up", desc: "Create your free affiliate account in minutes" },
  { num: 2, icon: Share2, title: "Share Your Link", desc: "Promote Royal Flush with your unique referral link" },
  { num: 3, icon: DollarSign, title: "Earn Commission", desc: "Get paid for every active player you refer" },
];

const commissionTiers = [
  { tier: "Bronze", players: "1-10", commission: "25%" },
  { tier: "Silver", players: "11-50", commission: "30%" },
  { tier: "Gold", players: "51-200", commission: "35%" },
  { tier: "Platinum", players: "200+", commission: "40%" },
];

const perks = [
  { icon: Infinity, title: "Lifetime Commissions", desc: "Earn from your referrals forever — no expiry" },
  { icon: BarChart3, title: "Real-Time Dashboard", desc: "Track clicks, signups, and earnings live" },
  { icon: Clock, title: "Weekly Payouts", desc: "Get paid every week, on time, every time" },
  { icon: Headphones, title: "Dedicated Support", desc: "Priority affiliate manager for your account" },
];

const faqItems = [
  { q: "How do I become an affiliate?", a: "Simply register for an affiliate account. Once approved, you'll receive your unique referral link and access to marketing materials." },
  { q: "When do I get paid?", a: "Commissions are calculated weekly and paid out every Monday. Minimum withdrawal is $50." },
  { q: "Is there a limit on how much I can earn?", a: "No! There is no cap on your earnings. The more players you refer, the more you earn." },
  { q: "Can I promote Royal Flush on social media?", a: "Yes! You can share your referral link on social media, websites, blogs, YouTube, and more." },
];

const Affiliates = () => {
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
          <div className="text-center py-8">
            <Users className="w-10 h-10 text-accent mx-auto mb-3" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Affiliate Program</h1>
            <p className="text-muted-foreground max-w-md mx-auto">Earn commission by referring players to Royal Flush. No limits, lifetime earnings.</p>
            <AppLink href="/register">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4 px-8">
                Become an Affiliate
              </Button>
            </AppLink>
          </div>

          {/* How It Works */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {steps.map((s) => (
                <Card key={s.num} className="bg-card border-border text-center">
                  <CardContent className="pt-6 pb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-accent text-lg font-bold mx-auto mb-3">
                      {s.num}
                    </div>
                    <s.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                    <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Commission Tiers */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-center">Commission Tiers</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 px-3">Tier</th>
                      <th className="text-center py-2 px-3">Active Players</th>
                      <th className="text-right py-2 px-3">Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionTiers.map((t) => (
                      <tr key={t.tier} className="border-b border-border">
                        <td className="py-3 px-3 font-medium">{t.tier}</td>
                        <td className="text-center py-3 px-3 text-muted-foreground">{t.players}</td>
                        <td className="text-right py-3 px-3 font-bold text-accent">{t.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-center">Why Join?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perks.map((p) => (
                <Card key={p.title} className="bg-card border-border">
                  <CardContent className="pt-5 pb-4 flex items-start gap-3">
                    <p.icon className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
                      <p className="text-xs text-muted-foreground">{p.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-center">FAQ</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border-none overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline hover:bg-secondary/50">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </main>
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
};

export default Affiliates;
