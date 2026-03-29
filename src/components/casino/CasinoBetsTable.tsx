"use client";
import { useState } from "react";
import { Dice5, Users, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "my-bets", label: "My Bets" },
  { id: "all-bets", label: "All Bets" },
  { id: "high-rollers", label: "High Rollers" },
  { id: "race", label: "Race Leaderboard" },
];

const allBetsData = [
  { game: "Sweet Bonanza 1...", user: "Hidden", time: "12:45 AM", betAmount: "$100.00", currency: "eth", multiplier: "0.70×", payout: "-$29.65", payoutColor: "red" },
  { game: "Plinko", user: "SweatyRabbit86", time: "12:45 AM", betAmount: "$0.27", currency: "usdt", multiplier: "4.00×", payout: "$1.08", payoutColor: "green" },
  { game: "Keno", user: "Hidden", time: "12:45 AM", betAmount: "$250.00", currency: "btc", multiplier: "3.50×", payout: "$875.00", payoutColor: "green" },
  { game: "Le Bandit", user: "Hidden", time: "12:45 AM", betAmount: "$0.03", currency: "usdt", multiplier: "0.00×", payout: "-$0.03", payoutColor: "red" },
  { game: "Dice", user: "YatharthB8605", time: "12:45 AM", betAmount: "$164.06", currency: "eth", multiplier: "0.00×", payout: "-$164.06", payoutColor: "red" },
  { game: "Dice", user: "ragnarok35", time: "12:44 AM", betAmount: "$2.50", currency: "usdt", multiplier: "1.01×", payout: "$2.53", payoutColor: "green" },
  { game: "Extreme Texas Ho...", user: "BanE777", time: "12:44 AM", betAmount: "$42.04", currency: "usdt", multiplier: "0.95×", payout: "-$2.00", payoutColor: "red" },
  { game: "Blackjack", user: "Benniehuls", time: "12:44 AM", betAmount: "$37.88", currency: "btc", multiplier: "0.00×", payout: "-$37.88", payoutColor: "red" },
  { game: "20 Burning Hot", user: "mertingalee", time: "12:44 AM", betAmount: "$36.04", currency: "usdt", multiplier: "0.00×", payout: "-$36.04", payoutColor: "red" },
  { game: "Crash", user: "Hidden", time: "12:43 AM", betAmount: "$1,500.00", currency: "eth", multiplier: "2.40×", payout: "$3,600.00", payoutColor: "green" },
];

const myBetsData = [
  { game: "Dice", user: "You", time: "12:40 AM", betAmount: "$50.00", currency: "usdt", multiplier: "1.96×", payout: "$98.00", payoutColor: "green" },
  { game: "Crash", user: "You", time: "12:38 AM", betAmount: "$100.00", currency: "usdt", multiplier: "0.00×", payout: "-$100.00", payoutColor: "red" },
  { game: "Mines", user: "You", time: "12:35 AM", betAmount: "$25.00", currency: "usdt", multiplier: "2.47×", payout: "$61.75", payoutColor: "green" },
];

const highRollersData = [
  { game: "Crash", user: "Hidden", time: "12:42 AM", betAmount: "$50,000.00", currency: "btc", multiplier: "3.20×", payout: "$160,000.00", payoutColor: "green" },
  { game: "Blackjack", user: "whale_king", time: "12:40 AM", betAmount: "$25,000.00", currency: "eth", multiplier: "2.00×", payout: "$50,000.00", payoutColor: "green" },
  { game: "Roulette", user: "Hidden", time: "12:38 AM", betAmount: "$18,500.00", currency: "btc", multiplier: "0.00×", payout: "-$18,500.00", payoutColor: "red" },
  { game: "Baccarat", user: "highstakes", time: "12:35 AM", betAmount: "$15,000.00", currency: "eth", multiplier: "1.00×", payout: "$15,000.00", payoutColor: "green" },
  { game: "Dice", user: "Hidden", time: "12:33 AM", betAmount: "$12,000.00", currency: "usdt", multiplier: "4.50×", payout: "$54,000.00", payoutColor: "green" },
];

const raceData = [
  { game: "Crash", user: "cryptoking99", time: "#1", betAmount: "$245,000.00", currency: "btc", multiplier: "—", payout: "$245,000.00", payoutColor: "green" },
  { game: "Dice", user: "swagger00", time: "#2", betAmount: "$198,500.00", currency: "eth", multiplier: "—", payout: "$198,500.00", payoutColor: "green" },
  { game: "Blackjack", user: "whale_king", time: "#3", betAmount: "$156,200.00", currency: "btc", multiplier: "—", payout: "$156,200.00", payoutColor: "green" },
  { game: "Mines", user: "luckystar", time: "#4", betAmount: "$98,700.00", currency: "usdt", multiplier: "—", payout: "$98,700.00", payoutColor: "green" },
  { game: "Plinko", user: "highstakes", time: "#5", betAmount: "$76,400.00", currency: "eth", multiplier: "—", payout: "$76,400.00", payoutColor: "green" },
];

const betsMap: Record<string, typeof allBetsData> = {
  "my-bets": myBetsData,
  "all-bets": allBetsData,
  "high-rollers": highRollersData,
  race: raceData,
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

export const CasinoBetsTable = () => {
  const [activeTab, setActiveTab] = useState("all-bets");
  const [rowCount, setRowCount] = useState(10);

  const betsData = betsMap[activeTab] || allBetsData;

  return (
    <section className="px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="inline-flex items-center bg-background border border-border rounded-full p-1.5 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show:</span>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-md text-sm">
            {rowCount}
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[180px]">Game</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[200px]">User</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground w-[120px]">
                  {activeTab === "race" ? "Rank" : "Time"}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground w-[160px]">Bet Amount</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground w-[120px]">Multiplier</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground w-[160px]">Payout</th>
              </tr>
            </thead>
            <tbody>
              {betsData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No bets yet. Place a bet to see it here!
                  </td>
                </tr>
              ) : (
                betsData.slice(0, rowCount).map((bet, index) => (
                  <tr key={index} className="border-b border-border hover:bg-secondary transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                          <Dice5 className="w-4 h-4 text-muted-foreground" />
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
                        <span className={cn("text-sm font-medium", bet.user === "You" ? "text-accent" : "text-foreground")}>{bet.user}</span>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
