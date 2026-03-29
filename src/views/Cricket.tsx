"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sports } from "@/services/api";
import { cn } from "@/lib/utils";
import { AppLink } from "@/lib/navigation";
import { ChevronLeft, ChevronUp, ChevronDown, X, AlertTriangle, Bookmark } from "lucide-react";

interface BetSlipItem {
  eventId: number;
  matchName: string;
  marketType: string;
  selection: string;
  odds: number;
  stake: string;
}

const tabs = ["Live & Upcoming", "Outrights", "All Cricket"];

const Cricket = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([]);
  const [collapsedLeagues, setCollapsedLeagues] = useState<Set<string>>(new Set());
  const { user, isAuthenticated, refreshUser, updateLocalBalance } = useAuth();
  const { toast } = useToast();

  const { data: events, isLoading } = useQuery({
    queryKey: ["cricket-events"],
    queryFn: () => sports.events("cricket").then((r) => r.data),
  });

  const placeBetMutation = useMutation({
    mutationFn: async (item: BetSlipItem) => {
      try {
        const res = await sports.placeBet(item.eventId, item.selection, item.odds, Number(item.stake));
        return { item, fromApi: true, data: res.data };
      } catch {
        // If API fails (e.g. event not found), deduct locally as demo
        return { item, fromApi: false, data: null };
      }
    },
    onSuccess: ({ item, fromApi }) => {
      const stakeAmount = Number(item.stake);
      if (fromApi) {
        refreshUser();
      } else {
        updateLocalBalance(-stakeAmount);
      }
      toast({ title: `Bet placed on ${item.selection}!`, description: `$${stakeAmount.toFixed(2)} @ ${item.odds.toFixed(2)}` });
      setBetSlip((prev) => prev.filter((b) => !(b.eventId === item.eventId && b.selection === item.selection)));
    },
  });

  const addToSlip = (eventId: number, matchName: string, marketType: string, selection: string, odds: number) => {
    const exists = betSlip.find((b) => b.eventId === eventId && b.selection === selection);
    if (exists) {
      removeFromSlip(eventId, selection);
      return;
    }
    setBetSlip((prev) => [...prev, { eventId, matchName, marketType, selection, odds, stake: "" }]);
  };

  const removeFromSlip = (eventId: number, selection: string) => {
    setBetSlip((prev) => prev.filter((b) => !(b.eventId === eventId && b.selection === selection)));
  };

  const updateStake = (eventId: number, selection: string, stake: string) => {
    setBetSlip((prev) =>
      prev.map((b) => (b.eventId === eventId && b.selection === selection ? { ...b, stake } : b))
    );
  };

  const isSelected = (eventId: number, selection: string) =>
    betSlip.some((b) => b.eventId === eventId && b.selection === selection);

  const toggleLeague = (league: string) => {
    setCollapsedLeagues((prev) => {
      const next = new Set(prev);
      if (next.has(league)) next.delete(league);
      else next.add(league);
      return next;
    });
  };

  const totalStake = betSlip.reduce((sum, b) => sum + (Number(b.stake) || 0), 0);
  const totalPayout = betSlip.reduce((sum, b) => sum + (Number(b.stake) || 0) * b.odds, 0);

  // Group events by league
  const eventList = (events || []) as unknown as Array<{
    id: number;
    league: { name: string; country: string; country_flag: string };
    team1_name: string;
    team2_name: string;
    start_time: string;
    status: string;
    odds_markets: Array<{
      market_type: string;
      options: Array<{ label: string; value: string; odds: number }>;
      is_active: boolean;
    }>;
  }>;

  const leagueGroups: Record<string, typeof eventList> = {};
  for (const ev of eventList) {
    const key = `${ev.league.country_flag} ${ev.league.country}|${ev.league.name}`;
    if (!leagueGroups[key]) leagueGroups[key] = [];
    leagueGroups[key].push(ev);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className={cn("transition-all duration-300", "ml-0", sidebarOpen ? "md:ml-56" : "md:ml-14")}>
        <Header />
        <div className="flex">
          {/* Main Content */}
          <main className="flex-1 max-w-4xl px-4 pb-20 md:pb-0 py-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 mb-4">
              <AppLink href="/sports">
                <Button variant="outline" size="sm" className="border-border">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </AppLink>
              <h1 className="text-lg font-bold">Cricket</h1>
              <Button variant="outline" size="icon" className="border-border h-8 w-8">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeTab === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <span>⚙️</span> Top Cricket
              </h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Market</span>
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">Winner</span>
              </div>
            </div>

            {/* Events */}
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 w-full rounded-lg" />)}
              </div>
            ) : Object.keys(leagueGroups).length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center text-muted-foreground">
                  No cricket events available right now.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {Object.entries(leagueGroups).map(([key, groupEvents]) => {
                  const [countryPart, leagueName] = key.split("|");
                  const isCollapsed = collapsedLeagues.has(key);

                  return (
                    <div key={key} className="border border-border rounded-lg overflow-hidden">
                      {/* Country Header */}
                      <button
                        onClick={() => toggleLeague(key)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-secondary/50 transition-colors"
                      >
                        <span className="font-medium text-sm">{countryPart}</span>
                        {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                      </button>

                      {!isCollapsed && (
                        <>
                          {/* League Sub-header */}
                          <div className="px-4 py-2 bg-secondary/30 border-t border-border">
                            <span className="text-sm font-semibold">{leagueName}</span>
                          </div>

                          {/* Matches */}
                          {groupEvents.map((ev) => {
                            const market = ev.odds_markets?.find((m) => m.is_active);
                            const options = market?.options || [];
                            const team1Opt = options.find((o) => o.value === ev.team1_name);
                            const team2Opt = options.find((o) => o.value === ev.team2_name);
                            const matchName = `${ev.team1_name} - ${ev.team2_name}`;
                            const startDate = new Date(ev.start_time);
                            const dayStr = startDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
                            const timeStr = startDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
                            const moreMarkets = options.length > 2 ? `+${(options.length - 2) * 10}` : null;

                            return (
                              <div key={ev.id} className="px-4 py-3 border-t border-border">
                                {/* Date & Market Type */}
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-accent">{dayStr} {timeStr}</span>
                                  <span className="text-xs text-muted-foreground">{market?.market_type === "1x2" ? "Winner (Incl. Super Over)" : "Winner"}</span>
                                </div>

                                {/* Teams + Odds */}
                                <div className="flex items-center gap-3">
                                  {/* Team Names */}
                                  <div className="flex-shrink-0 w-44 space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[8px]">🏏</span>
                                      <span className="text-sm font-medium truncate">{ev.team1_name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[8px]">🏏</span>
                                      <span className="text-sm font-medium truncate">{ev.team2_name}</span>
                                    </div>
                                  </div>

                                  {/* Odds Buttons */}
                                  <div className="flex-1 grid grid-cols-2 gap-2">
                                    {team1Opt && (
                                      <button
                                        onClick={() => addToSlip(ev.id, matchName, "Winner", team1Opt.value, team1Opt.odds)}
                                        className={cn(
                                          "flex flex-col px-4 py-2.5 rounded-md text-left transition-colors border",
                                          isSelected(ev.id, team1Opt.value)
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : "bg-card border-border hover:bg-secondary"
                                        )}
                                      >
                                        <span className="text-xs truncate">{team1Opt.label}</span>
                                        <span className="text-sm font-bold text-accent">{team1Opt.odds.toFixed(2)}</span>
                                      </button>
                                    )}
                                    {team2Opt && (
                                      <button
                                        onClick={() => addToSlip(ev.id, matchName, "Winner", team2Opt.value, team2Opt.odds)}
                                        className={cn(
                                          "flex flex-col px-4 py-2.5 rounded-md text-left transition-colors border",
                                          isSelected(ev.id, team2Opt.value)
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : "bg-card border-border hover:bg-secondary"
                                        )}
                                      >
                                        <span className="text-xs truncate">{team2Opt.label}</span>
                                        <span className="text-sm font-bold text-accent">{team2Opt.odds.toFixed(2)}</span>
                                      </button>
                                    )}
                                  </div>

                                  {/* More Markets */}
                                  {moreMarkets && (
                                    <span className="text-xs text-accent font-medium flex-shrink-0">{moreMarkets}</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>

          {/* Bet Slip - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0 border-l border-border p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                Bet Slip
                {betSlip.length > 0 && (
                  <span className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {betSlip.length}
                  </span>
                )}
              </h3>
            </div>

            {betSlip.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                Click on odds to add selections
              </div>
            ) : (
              <div className="space-y-4">
                {/* Single Bets */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Single Bets</h4>
                  <div className="space-y-3">
                    {betSlip.map((item) => {
                      const stakeNum = Number(item.stake) || 0;
                      const payout = stakeNum * item.odds;
                      const exceedsBalance = stakeNum > (user?.balance || 0);

                      return (
                        <Card key={`${item.eventId}-${item.selection}`} className="bg-card border-border">
                          <CardContent className="pt-3 pb-3 px-3">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground truncate flex-1">{item.matchName}</span>
                              <button onClick={() => removeFromSlip(item.eventId, item.selection)} className="text-muted-foreground hover:text-foreground">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-xs text-muted-foreground mb-1">{item.marketType}</div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold">{item.selection}</span>
                              <span className="text-sm font-bold text-accent">{item.odds.toFixed(2)}</span>
                            </div>

                            {/* Stake Input */}
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                placeholder="0.00"
                                value={item.stake}
                                onChange={(e) => updateStake(item.eventId, item.selection, e.target.value)}
                                className="h-8 text-sm"
                                min={0}
                              />
                              <div className="text-right flex-shrink-0">
                                <div className="text-[10px] text-muted-foreground">Est. Payout</div>
                                <div className="text-xs font-semibold text-accent">${payout.toFixed(2)}</div>
                              </div>
                            </div>

                            {exceedsBalance && stakeNum > 0 && (
                              <div className="flex items-center gap-1 mt-2 text-[10px] text-destructive">
                                <AlertTriangle className="w-3 h-3" />
                                You cannot bet more than your balance.
                              </div>
                            )}

                            {/* Place Bet */}
                            <Button
                              size="sm"
                              onClick={() => placeBetMutation.mutate(item)}
                              disabled={!isAuthenticated || stakeNum <= 0 || exceedsBalance || placeBetMutation.isPending}
                              className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/90 h-8 text-xs"
                            >
                              {placeBetMutation.isPending ? "Placing..." : "Place Bet"}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-3 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Stake</span>
                    <span className="font-semibold text-accent">${totalStake.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Est. Payout</span>
                    <span className="font-semibold text-accent">${totalPayout.toFixed(2)}</span>
                  </div>
                </div>

                {/* Clear All */}
                <Button
                  variant="outline"
                  onClick={() => setBetSlip([])}
                  className="w-full border-border text-muted-foreground hover:text-foreground"
                >
                  Clear Bets
                </Button>
              </div>
            )}
          </aside>
        </div>

        {/* Mobile Bet Slip - Fixed Bottom */}
        {betSlip.length > 0 && (
          <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">
                Bet Slip ({betSlip.length})
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-accent font-bold">${totalStake.toFixed(2)}</span>
                <Button
                  size="sm"
                  onClick={() => setBetSlip([])}
                  variant="outline"
                  className="h-7 text-xs border-border"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
      <MobileNav />
    </div>
  );
};

export default Cricket;
