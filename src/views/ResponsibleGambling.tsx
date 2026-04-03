"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShieldCheck, Clock, Ban, DollarSign, AlertTriangle, ExternalLink, HeadphonesIcon } from "lucide-react";

const tools = [
  { icon: DollarSign, title: "Deposit Limits", desc: "Set daily, weekly, or monthly limits on how much you can deposit." },
  { icon: AlertTriangle, title: "Loss Limits", desc: "Control your maximum losses over a set period." },
  { icon: Clock, title: "Session Time Limits", desc: "Set reminders or hard limits on how long you play." },
  { icon: Ban, title: "Self-Exclusion", desc: "Temporarily or permanently exclude yourself from the platform." },
];

const resources = [
  { name: "GamCare", url: "https://www.gamcare.org.uk", desc: "Free counselling and support for gambling" },
  { name: "Gamblers Anonymous", url: "https://www.gamblersanonymous.org", desc: "Support groups for problem gambling" },
  { name: "BeGambleAware", url: "https://www.begambleaware.org", desc: "Information and resources for safer gambling" },
  { name: "National Council on Problem Gambling", url: "https://www.ncpgambling.org", desc: "US-based gambling helpline" },
];

const ResponsibleGambling = () => {
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
            <ShieldCheck className="w-10 h-10 text-accent mx-auto mb-3" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Responsible Gambling</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              At Royal Flush, we are committed to providing a safe and enjoyable gaming environment. Gambling should always be fun, never a problem.
            </p>
          </div>

          {/* Our Commitment */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6 pb-4">
              <h2 className="font-semibold mb-3">Our Commitment</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Royal Flush takes responsible gambling seriously. We provide tools and resources to help you stay in control of your gaming experience. We believe that gambling should be an entertaining pastime, not a way to make money. If you feel that gambling is becoming a problem for you or someone you know, we encourage you to seek help.
              </p>
            </CardContent>
          </Card>

          {/* Self-Assessment */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Self-Assessment</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-5 pb-4 space-y-3">
                <p className="text-sm text-muted-foreground mb-3">Ask yourself these questions:</p>
                {[
                  "Do you spend more money on gambling than you can afford?",
                  "Do you borrow money or sell things to gamble?",
                  "Have you tried to stop gambling but couldn't?",
                  "Does gambling cause arguments with family or friends?",
                  "Do you gamble to escape problems or relieve stress?",
                  "Do you lie about how much time or money you spend gambling?",
                ].map((q, i) => (
                  <div key={i} className="flex items-start gap-3 py-1">
                    <div className="w-5 h-5 rounded border border-border bg-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{q}</p>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-4">
                  If you answered "yes" to any of these questions, you may want to seek help. Please use the resources below.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Tools & Limits */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Tools & Limits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map((t) => (
                <Card key={t.title} className="bg-card border-border">
                  <CardContent className="pt-5 pb-4 flex items-start gap-3">
                    <t.icon className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{t.title}</h3>
                      <p className="text-xs text-muted-foreground">{t.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Help & Resources */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Help & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer">
                  <Card className="bg-card border-border hover:border-accent/30 transition-colors cursor-pointer">
                    <CardContent className="pt-5 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{r.name}</h3>
                        <p className="text-xs text-muted-foreground">{r.desc}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </section>

          {/* Contact Support */}
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-3 text-sm">Need help? Our support team is available 24/7.</p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
              <HeadphonesIcon className="w-4 h-4 mr-2" /> Contact Support
            </Button>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-2xl">🔞</span>
              <p className="text-xs text-muted-foreground">You must be 18+ to use this platform</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ResponsibleGambling;
