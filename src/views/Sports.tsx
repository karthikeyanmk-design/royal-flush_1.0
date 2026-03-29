"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SportsHero } from "@/components/sports/SportsHero";
import { SportsSearchBar } from "@/components/sports/SportsSearchBar";
import { TopMatches } from "@/components/sports/TopMatches";
import { TopSports } from "@/components/sports/TopSports";
import { TopPicks } from "@/components/sports/TopPicks";
import { LiveEvents } from "@/components/sports/LiveEvents";
import { PopularEvents } from "@/components/sports/PopularEvents";
import { TrendingGames } from "@/components/TrendingGames";
import { BetsTable } from "@/components/BetsTable";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { cn } from "@/lib/utils";
import { X, Trash2, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface BetSelection {
  id: string;
  matchName: string;
  selection: string;
  odds: number;
}

const Sports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [betSlip, setBetSlip] = useState<BetSelection[]>([]);
  const [stake, setStake] = useState("");
  const [showMobileBetSlip, setShowMobileBetSlip] = useState(false);
  const [sportsTab, setSportsTab] = useState("lobby");
  const { user, updateLocalBalance } = useAuth();
  const { toast } = useToast();

  const addToBetSlip = (selection: BetSelection) => {
    const exists = betSlip.find((s) => s.id === selection.id);
    if (exists) {
      setBetSlip((prev) => prev.filter((s) => s.id !== selection.id));
      toast({ title: "Removed from bet slip", description: selection.selection });
    } else {
      setBetSlip((prev) => [...prev, selection]);
      toast({ title: "Added to bet slip", description: `${selection.selection} @ ${selection.odds.toFixed(2)}` });
    }
  };

  const removeFromBetSlip = (id: string) => {
    setBetSlip((prev) => prev.filter((s) => s.id !== id));
  };

  const clearBetSlip = () => {
    setBetSlip([]);
    setStake("");
  };

  const totalOdds = betSlip.reduce((acc, s) => acc * s.odds, 1);
  const stakeNum = parseFloat(stake) || 0;
  const estPayout = (stakeNum * totalOdds).toFixed(2);

  const placeBet = () => {
    if (!user) {
      toast({ title: "Please login to place a bet", variant: "destructive" });
      return;
    }
    if (stakeNum <= 0) {
      toast({ title: "Enter a valid stake amount", variant: "destructive" });
      return;
    }
    if (stakeNum > (user.balance || 0)) {
      toast({ title: "Insufficient balance", variant: "destructive" });
      return;
    }
    updateLocalBalance(-stakeNum);
    toast({
      title: "Bet Placed Successfully!",
      description: `$${stakeNum.toFixed(2)} on ${betSlip.length} selection(s) @ ${totalOdds.toFixed(2)} — Est. Payout: $${estPayout}`,
    });
    clearBetSlip();
  };

  const isSelected = (id: string) => betSlip.some((s) => s.id === id);

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          "ml-0",
          sidebarOpen ? "md:ml-56" : "md:ml-14"
        )}
      >
        <Header />

        <div className="flex gap-4">
          <main className={cn("flex-1 max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0", betSlip.length > 0 && "md:mr-[340px]")}>
            <SportsHero />
            <SportsSearchBar activeTab={sportsTab} onTabChange={setSportsTab} />

            {(sportsTab === "lobby" || sportsTab === "popular") && (
              <TopMatches onSelectOdd={addToBetSlip} isSelected={isSelected} />
            )}
            {(sportsTab === "lobby") && (
              <TopSports />
            )}
            {(sportsTab === "lobby" || sportsTab === "exclusive") && (
              <TopPicks onSelectOdd={addToBetSlip} isSelected={isSelected} />
            )}
            {(sportsTab === "lobby" || sportsTab === "live") && (
              <LiveEvents onSelectOdd={addToBetSlip} isSelected={isSelected} />
            )}
            {(sportsTab === "lobby" || sportsTab === "popular" || sportsTab === "starting" || sportsTab === "outrights") && (
              <PopularEvents onSelectOdd={addToBetSlip} isSelected={isSelected} />
            )}
            {sportsTab === "lobby" && <TrendingGames />}
            <BetsTable />
          </main>

          {/* Desktop Bet Slip */}
          {betSlip.length > 0 && (
            <aside className="hidden md:block fixed right-0 top-0 h-full w-[340px] bg-card border-l border-border z-30 flex flex-col">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-accent" />
                  <h3 className="font-semibold text-sm">Bet Slip ({betSlip.length})</h3>
                </div>
                <button onClick={clearBetSlip} className="text-muted-foreground hover:text-foreground">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {betSlip.map((sel) => (
                  <div key={sel.id} className="bg-secondary rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground truncate">{sel.matchName}</p>
                        <p className="text-sm font-medium">{sel.selection}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-accent">{sel.odds.toFixed(2)}</span>
                        <button onClick={() => removeFromBetSlip(sel.id)} className="text-muted-foreground hover:text-foreground">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border space-y-3">
                {betSlip.length > 1 && (
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Combined Odds</span>
                    <span className="font-bold text-accent">{totalOdds.toFixed(2)}</span>
                  </div>
                )}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2.5 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Est. Payout</span>
                  <span className="font-bold text-foreground">${estPayout}</span>
                </div>
                <Button onClick={placeBet} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Place Bet
                </Button>
              </div>
            </aside>
          )}
        </div>

        <Footer />
      </div>

      {/* Mobile Bet Slip Bar */}
      {betSlip.length > 0 && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-40">
          {showMobileBetSlip && (
            <div className="bg-card border-t border-border p-4 max-h-[60vh] overflow-y-auto space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Bet Slip ({betSlip.length})</h3>
                <button onClick={clearBetSlip} className="text-muted-foreground hover:text-foreground">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {betSlip.map((sel) => (
                <div key={sel.id} className="bg-secondary rounded-lg p-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{sel.matchName}</p>
                    <p className="text-sm font-medium">{sel.selection}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-accent">{sel.odds.toFixed(2)}</span>
                    <button onClick={() => removeFromBetSlip(sel.id)} className="text-muted-foreground hover:text-foreground">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="relative mt-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-3 py-2.5 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">Est. Payout</span>
                <span className="font-bold">${estPayout}</span>
              </div>
              <Button onClick={placeBet} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2">
                Place Bet
              </Button>
            </div>
          )}
          <button
            onClick={() => setShowMobileBetSlip(!showMobileBetSlip)}
            className="w-full bg-accent text-accent-foreground py-3 px-4 flex items-center justify-between"
          >
            <span className="font-semibold text-sm">Bet Slip ({betSlip.length})</span>
            <span className="font-bold text-sm">{stakeNum > 0 ? `$${estPayout}` : "Open"}</span>
          </button>
        </div>
      )}

      <MobileNav />
    </div>
  );
};

export default Sports;
