"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { LotteryHero } from "@/components/lottery/LotteryHero";
import { LotterySearchBar } from "@/components/lottery/LotterySearchBar";
import { LotteryCategories } from "@/components/lottery/LotteryCategories";
import { TicketSelection } from "@/components/lottery/TicketSelection";
import { RecentWinners } from "@/components/lottery/RecentWinners";
import { PastResults } from "@/components/lottery/PastResults";
import { LotteryFAQ } from "@/components/lottery/LotteryFAQ";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const Lottery = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("lobby");

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

        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0">
          <LotteryHero />
          <LotterySearchBar activeTab={activeTab} onTabChange={setActiveTab} />

          {(activeTab === "lobby" || activeTab === "starting-soon") && (
            <LotteryCategories />
          )}
          {(activeTab === "lobby" || activeTab === "my-tickets") && (
            <TicketSelection />
          )}
          {activeTab === "lobby" && <RecentWinners />}
          {(activeTab === "lobby" || activeTab === "favourites") && (
            <PastResults />
          )}
          {activeTab === "lobby" && <LotteryFAQ />}

          {activeTab === "my-tickets" && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Your purchased tickets will appear here
            </div>
          )}
          {activeTab === "favourites" && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Your favourite lotteries will appear here
            </div>
          )}
        </main>
        <Footer />
      </div>

    </div>
  );
};

export default Lottery;
