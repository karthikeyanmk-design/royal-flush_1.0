"use client";
import { useState } from "react";
import { Dice5, Users, Dumbbell, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "casino", label: "Casino Bets" },
  { id: "sports", label: "Sports Bets" },
  { id: "race", label: "Race Leaderboard" },
];

const casinoBets = [
  { game: "Dice", user: "Hidden", time: "2:01 PM", betAmount: "$6,668.00", currency: "eth", multiplier: "1.30×", payout: "$8,685.95", payoutColor: "green" },
  { game: "Mines", user: "swagger00", time: "2:01 PM", betAmount: "$2,582.42", currency: "tron", multiplier: "0.00×", payout: "-$2,582.42", payoutColor: "red" },
  { game: "Crash", user: "Hidden", time: "2:01 PM", betAmount: "$6,668.00", currency: "eth", multiplier: "1.30×", payout: "$8,685.95", payoutColor: "green" },
  { game: "Plinko", user: "cryptoking99", time: "2:00 PM", betAmount: "$12,340.00", currency: "btc", multiplier: "2.50×", payout: "$30,850.00", payoutColor: "green" },
  { game: "Keno", user: "Hidden", time: "2:00 PM", betAmount: "$5,000.00", currency: "eth", multiplier: "0.00×", payout: "-$5,000.00", payoutColor: "red" },
  { game: "Hilo", user: "luckystar", time: "1:59 PM", betAmount: "$890.00", currency: "usdt", multiplier: "5.20×", payout: "$4,628.00", payoutColor: "green" },
  { game: "Limbo", user: "Hidden", time: "1:58 PM", betAmount: "$3,200.00", currency: "eth", multiplier: "1.80×", payout: "$5,760.00", payoutColor: "green" },
];

const sportsBets = [
  { game: "Soccer", user: "betmaster42", time: "1:55 PM", betAmount: "$500.00", currency: "usdt", multiplier: "2.10×", payout: "$1,050.00", payoutColor: "green" },
  { game: "Cricket", user: "Hidden", time: "1:52 PM", betAmount: "$1,200.00", currency: "eth", multiplier: "1.55×", payout: "$1,860.00", payoutColor: "green" },
  { game: "Tennis", user: "acebet99", time: "1:50 PM", betAmount: "$800.00", currency: "btc", multiplier: "0.00×", payout: "-$800.00", payoutColor: "red" },
  { game: "Basketball", user: "Hidden", time: "1:48 PM", betAmount: "$2,500.00", currency: "eth", multiplier: "3.25×", payout: "$8,125.00", payoutColor: "green" },
  { game: "Football", user: "gridiron7", time: "1:45 PM", betAmount: "$350.00", currency: "usdt", multiplier: "0.00×", payout: "-$350.00", payoutColor: "red" },
  { game: "Hockey", user: "Hidden", time: "1:42 PM", betAmount: "$1,800.00", currency: "tron", multiplier: "1.80×", payout: "$3,240.00", payoutColor: "green" },
];

const raceBets = [
  { game: "Dice", user: "cryptoking99", time: "#1", betAmount: "$125,400.00", currency: "btc", multiplier: "—", payout: "$125,400.00", payoutColor: "green" },
  { game: "Crash", user: "swagger00", time: "#2", betAmount: "$98,200.00", currency: "eth", multiplier: "—", payout: "$98,200.00", payoutColor: "green" },
  { game: "Mines", user: "luckystar", time: "#3", betAmount: "$76,500.00", currency: "usdt", multiplier: "—", payout: "$76,500.00", payoutColor: "green" },
  { game: "Plinko", user: "betmaster42", time: "#4", betAmount: "$54,800.00", currency: "tron", multiplier: "—", payout: "$54,800.00", payoutColor: "green" },
  { game: "Keno", user: "acebet99", time: "#5", betAmount: "$43,200.00", currency: "btc", multiplier: "—", payout: "$43,200.00", payoutColor: "green" },
];

const betsMap: Record<string, typeof casinoBets> = {
  casino: casinoBets,
  sports: sportsBets,
  race: raceBets,
};

const CurrencyIcon = ({ currency }: { currency: string }) => {
  switch (currency) {
    case "eth":
      return <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#627eea] text-white text-[10px] font-bold">◆</span>;
    case "tron":
      return <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#eb0029] text-white text-[10px] font-bold">T</span>;
    case "btc":
      return <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#f7931a] text-white text-[10px] font-bold">₿</span>;
    case "usdt":
      return <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#26a17b] text-white text-[10px] font-bold">$</span>;
    default:
      return <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-stake-green text-white text-[10px] font-bold">$</span>;
  }
};

const GameIcon = ({ game, tab }: { game: string; tab: string }) => {
  if (tab === "sports") {
    return <Dumbbell className="w-4 h-4 text-muted-foreground" />;
  }
  if (tab === "race") {
    return <Trophy className="w-4 h-4 text-accent" />;
  }
  return <Dice5 className="w-4 h-4 text-muted-foreground" />;
};

export const BetsTable = () => {
  const [activeTab, setActiveTab] = useState("casino");

  const betsData = betsMap[activeTab] || casinoBets;

  return (
    <section className="px-3 md:px-4 py-4 md:py-6">
      {/* Tabs — scrollable on mobile */}
      <div className="overflow-x-auto scrollbar-hide mb-4 md:mb-6">
        <div className="inline-flex items-center bg-background border border-border rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Game</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{activeTab === "race" ? "Player" : "User"}</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">{activeTab === "race" ? "Rank" : "Time"}</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">{activeTab === "race" ? "Wagered" : "Bet Amount"}</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Multiplier</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Payout</th>
              </tr>
            </thead>
            <tbody>
              {betsData.map((bet, index) => (
                <tr
                  key={`${activeTab}-${index}`}
                  className="border-b border-border hover:bg-secondary/50 transition-colors animate-in fade-in slide-in-from-bottom-1 duration-300"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                        <GameIcon game={bet.game} tab={activeTab} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{bet.game}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {bet.user === "Hidden" ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Hidden</span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-foreground">{bet.user}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-muted-foreground">{bet.time}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-foreground">{bet.betAmount}</span>
                      <CurrencyIcon currency={bet.currency} />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-foreground">{bet.multiplier}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <span className={cn("text-sm font-medium", bet.payoutColor === "red" ? "text-red-500" : "text-stake-green")}>
                        {bet.payout}
                      </span>
                      <CurrencyIcon currency={bet.currency} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-2">
        {betsData.map((bet, index) => (
          <div
            key={`${activeTab}-m-${index}`}
            className="bg-secondary/30 rounded-lg p-3 border border-border/50 animate-in fade-in slide-in-from-bottom-1 duration-300"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-secondary flex items-center justify-center">
                  <GameIcon game={bet.game} tab={activeTab} />
                </div>
                <span className="text-sm font-medium text-foreground">{bet.game}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{bet.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">
                  {bet.user === "Hidden" ? "Hidden" : bet.user}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-foreground">{bet.betAmount}</span>
                  <CurrencyIcon currency={bet.currency} />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{bet.multiplier}</span>
                <span className={cn("text-xs font-semibold", bet.payoutColor === "red" ? "text-red-500" : "text-stake-green")}>
                  {bet.payout}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
