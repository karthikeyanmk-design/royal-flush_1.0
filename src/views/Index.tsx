"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
// StartPlaying cards are now integrated into HeroSection
import { TrendingGames } from "@/components/TrendingGames";
import { TrendingSports } from "@/components/TrendingSports";
import { Promotions } from "@/components/Promotions";
import { BetsTable } from "@/components/BetsTable";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { cn } from "@/lib/utils";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          "ml-0", // No margin on mobile
          sidebarOpen ? "md:ml-56" : "md:ml-14"
        )}
      >
        <Header />
        
        <HeroSection />
        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0">
          <SearchBar />
          <TrendingGames />
          <TrendingSports />
          <Promotions />
          <BetsTable />
          <FAQ />
        </main>
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export default Index;
