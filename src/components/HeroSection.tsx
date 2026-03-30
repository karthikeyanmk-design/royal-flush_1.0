"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleDot, Gamepad2, Dumbbell } from "lucide-react";
import { AppLink } from "@/lib/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";

const casinoHero = "/assets/casino-hero.png";
const sportsHero = "/assets/sports-hero.png";

export const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <section className="relative py-6 md:py-10 px-3 md:px-4 bg-[#111923] pb-10">
        {/* Bottom gradient fade into page background */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-[#111923] to-background pointer-events-none" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
          {/* Left Side — Text + CTA */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground mb-5 md:mb-6">
              The World&apos;s Largest Online
              <br />
              Casino and Sportsbook
            </h2>

            {!isAuthenticated && (
              <>
                <div className="mb-4">
                  <Button
                    onClick={() => setAuthOpen(true)}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-10 py-2.5 rounded text-sm"
                  >
                    Register
                  </Button>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <p className="text-xs md:text-sm text-muted-foreground">Or Sign Up With</p>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    {/* Google */}
                    <button className="h-10 px-5 rounded-md bg-[#1a2332] border border-[#2a3a4f] hover:bg-[#243040] flex items-center gap-2.5 transition-colors text-sm font-medium text-foreground">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.5c1.69 0 3.22.58 4.42 1.56l3.27-3.27A11.97 11.97 0 0 0 12 0C7.39 0 3.4 2.6 1.39 6.41l3.88 3.35z"/>
                        <path fill="#34A853" d="M12 24c5.18 0 9.52-1.72 12-4.64l-3.7-3.04c-1.34 1.19-3.41 2.04-5.82 2.04a7.07 7.07 0 0 1-6.66-4.62l-3.94 3.04C3.37 21.27 7.32 24 12 24z"/>
                        <path fill="#4A90E2" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.7 3.04c2.16-1.99 3.72-4.93 3.72-8.86z"/>
                        <path fill="#FBBC05" d="M5.34 14.26a7.14 7.14 0 0 1 0-4.52L1.39 6.41A11.94 11.94 0 0 0 0 12c0 1.96.47 3.81 1.39 5.59l3.95-3.33z"/>
                      </svg>
                      Google
                    </button>
                    {/* Facebook */}
                    <button className="h-10 px-5 rounded-md bg-[#1a2332] border border-[#2a3a4f] hover:bg-[#243040] flex items-center gap-2.5 transition-colors text-sm font-medium text-foreground">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                  </div>
                </div>
              </>
            )}

            {isAuthenticated && (
              <p className="text-sm text-muted-foreground">
                Welcome back! Start playing your favourite games.
              </p>
            )}
          </div>

          {/* Right Side — Casino & Sports Cards */}
          <div className="w-full md:w-auto flex gap-3 md:gap-4">
            {/* Casino Card */}
            <AppLink href="/casino" className="relative flex-1 md:w-[220px] group cursor-pointer rounded-xl overflow-hidden border border-border/50 hover:border-blue-500/30 transition-all">
              <img
                src={casinoHero}
                alt="Casino"
                className="w-full h-36 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 py-3 md:px-4 md:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-sm font-semibold text-white">Casino</span>
                  </div>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <CircleDot className="w-2 h-2 fill-green-400 text-green-400" />
                    37,240
                  </span>
                </div>
              </div>
            </AppLink>

            {/* Sports Card */}
            <AppLink href="/sports" className="relative flex-1 md:w-[220px] group cursor-pointer rounded-xl overflow-hidden border border-border/50 hover:border-green-500/30 transition-all">
              <img
                src={sportsHero}
                alt="Sports"
                className="w-full h-36 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 py-3 md:px-4 md:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-sm font-semibold text-white">Sports</span>
                  </div>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <CircleDot className="w-2 h-2 fill-green-400 text-green-400" />
                    28,250
                  </span>
                </div>
              </div>
            </AppLink>
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab="register" />
    </>
  );
};
