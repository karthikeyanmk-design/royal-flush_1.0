"use client";
import { useState, useEffect, useRef } from "react";
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
import { cn } from "@/lib/utils";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const sections = mainRef.current?.querySelectorAll(".section-animate");
    sections?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
        <main ref={mainRef} className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0">
          <div className="section-animate"><SearchBar /></div>
          <div className="section-animate"><TrendingGames /></div>
          <div className="section-animate"><TrendingSports /></div>
          <div className="section-animate"><Promotions /></div>
          <div className="section-animate"><BetsTable /></div>
          <div className="section-animate"><FAQ /></div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
