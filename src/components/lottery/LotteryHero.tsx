"use client";
import { useState, useEffect } from "react";
import { Clock, Eye, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const LotteryHero = () => {
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 32,
    seconds: 47,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  if (loading) {
    return (
      <section className="px-3 md:px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-[200px] md:h-[220px] rounded-lg" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-[94px] md:h-[104px] rounded-lg" />
            <Skeleton className="h-[94px] md:h-[104px] rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-3 md:px-4 py-4 md:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Jackpot Card */}
        <div className="lg:col-span-2 rounded-lg bg-card border border-border p-5 md:p-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded text-xs font-medium text-primary mb-3">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Next Draw Today
          </div>

          {/* Jackpot Amount */}
          <p className="text-sm text-muted-foreground mb-1">Mega Jackpot</p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-1">
            ₹25,00,00,000
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Guaranteed prize pool • Tax-free
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Draw in</span>
            <div className="flex items-center gap-1.5">
              <span className="bg-secondary px-2.5 py-1.5 rounded text-base font-mono font-semibold">
                {formatTime(timeLeft.hours)}
              </span>
              <span className="text-muted-foreground text-sm">:</span>
              <span className="bg-secondary px-2.5 py-1.5 rounded text-base font-mono font-semibold">
                {formatTime(timeLeft.minutes)}
              </span>
              <span className="text-muted-foreground text-sm">:</span>
              <span className="bg-secondary px-2.5 py-1.5 rounded text-base font-mono font-semibold">
                {formatTime(timeLeft.seconds)}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              <Ticket className="w-3.5 h-3.5 mr-1.5" />
              Buy Ticket
            </Button>
            <Button size="sm" variant="outline" className="border-border hover:bg-secondary">
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              View Results
            </Button>
          </div>
        </div>

        {/* Side Cards */}
        <div className="space-y-3">
          {/* Daily Draw Card */}
          <div className="rounded-lg bg-card border border-border p-4 hover:border-primary/40 transition-colors cursor-pointer">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Daily Draw</span>
            <h3 className="text-2xl font-bold mt-1 mb-1">₹10,00,000</h3>
            <p className="text-xs text-muted-foreground mb-3">Every day at 9 PM</p>
            <Button size="sm" variant="secondary" className="w-full h-9 text-sm">
              Play Now
            </Button>
          </div>

          {/* Weekly Draw Card */}
          <div className="rounded-lg bg-card border border-border p-4 hover:border-primary/40 transition-colors cursor-pointer">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Weekly Draw</span>
            <h3 className="text-2xl font-bold mt-1 mb-1">₹1,00,00,000</h3>
            <p className="text-xs text-muted-foreground mb-3">Every Sunday at 8 PM</p>
            <Button size="sm" variant="secondary" className="w-full h-9 text-sm">
              Play Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
