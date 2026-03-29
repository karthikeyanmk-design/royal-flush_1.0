"use client";
// "use client"
import { useState, useRef, useEffect } from "react";
import { AppLink } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import {
  Wallet,
  LogOut,
  User,
  Shield,
  Crown,
  Users,
  BarChart3,
  Receipt,
  Gamepad2,
  Settings,
  ShieldCheck,
  Headphones,
  ChevronRight,
  ChevronDown,
  Info,
} from "lucide-react";
import { CrownLogo } from "@/components/CrownLogo";
import { cn } from "@/lib/utils";

const dropdownItems = [
  { icon: Wallet, label: "Wallet", href: "/wallet" },
  { icon: Shield, label: "Vault", href: "/wallet" },
  { icon: Crown, label: "VIP", href: "/vip" },
  { icon: Users, label: "Affiliate", href: "/affiliates" },
  { icon: BarChart3, label: "Statistics", href: "/account/profile" },
  { icon: Receipt, label: "Transactions", href: "/wallet" },
  { icon: Gamepad2, label: "My Bets", href: "/account/profile" },
  { icon: Settings, label: "Settings", href: "/account/profile" },
  { icon: ShieldCheck, label: "Responsible Gambling", href: "/responsible-gambling", hasChevron: true },
  { icon: Headphones, label: "Live Support", href: "#" },
];

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openLogin = () => { setAuthTab("login"); setAuthOpen(true); };
  const openRegister = () => { setAuthTab("register"); setAuthOpen(true); };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // VIP progress based on balance
  const vipLevel = !user ? "Bronze" : (user.balance || 0) > 50000 ? "Diamond" : (user.balance || 0) > 20000 ? "Platinum" : (user.balance || 0) > 5000 ? "Gold" : (user.balance || 0) > 1000 ? "Silver" : "Bronze";
  const vipNext = vipLevel === "Bronze" ? "Silver" : vipLevel === "Silver" ? "Gold" : vipLevel === "Gold" ? "Platinum" : vipLevel === "Platinum" ? "Diamond" : "Diamond";

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background border-b border-border">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <AppLink href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <CrownLogo className="w-7 h-7 text-accent" />
            <h1 className="text-2xl font-bold italic text-accent tracking-tight cursor-pointer">
              Royal Flush
            </h1>
          </AppLink>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <>
              {/* Balance */}
              <AppLink href="/wallet" className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-md mr-2 hover:bg-muted transition-colors">
                <Wallet className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  ${user.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </AppLink>

              {/* User Profile Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                    dropdownOpen ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.username}</span>
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", dropdownOpen && "rotate-180")} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[260px] bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* VIP Progress Card */}
                    <div className="p-4 border-b border-border">
                      <p className="text-xs text-muted-foreground mb-2">Your VIP Progress</p>
                      <AppLink
                        href="/account/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="block bg-secondary rounded-lg p-3 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold">{user.username}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-xs font-medium text-muted-foreground">0.00%</span>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-1.5 bg-background rounded-full overflow-hidden mb-1.5">
                          <div className="h-full bg-accent rounded-full" style={{ width: "2%" }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">Next level: {vipNext}</span>
                      </AppLink>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {dropdownItems.map((item) => (
                        <AppLink
                          key={item.label}
                          href={item.href}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="flex-1">{item.label}</span>
                          {item.hasChevron && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                        </AppLink>
                      ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border py-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-secondary transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-sm font-semibold text-foreground hover:bg-secondary px-4 py-2"
                onClick={openLogin}
              >
                Login
              </Button>
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-semibold px-5 py-2 rounded"
                onClick={openRegister}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </header>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab={authTab}
      />
    </>
  );
};
