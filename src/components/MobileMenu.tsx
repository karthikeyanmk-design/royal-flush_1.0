"use client";
// "use client"
import { useState } from "react";
import { AppLink, useAppPathname } from "@/lib/navigation";
import {
  Search,
  Sparkles,
  Users,
  Trophy,
  FileText,
  MessageSquare,
  Star,
  ShieldCheck,
  Headphones,
  Globe,
  ChevronDown,
  Gamepad2,
  Dumbbell,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const productTabs = [
  { 
    icon: Gamepad2, 
    label: "Casino", 
    path: "/casino",
    activeClass: "bg-[#B20710] text-[#E50914]",
  },
  { 
    icon: Dumbbell, 
    label: "Sports", 
    path: "/sports",
    activeClass: "bg-[#E50914] text-white",
  },
  { 
    icon: Ticket, 
    label: "Lottery", 
    path: "/lottery",
    activeClass: "bg-[#B20710] text-[#E50914]",
  },
];

const menuItems = [
  { icon: Sparkles, label: "Promotions", hasSubmenu: true },
  { icon: Users, label: "Affiliate", hasSubmenu: false },
  { icon: Trophy, label: "VIP Club", hasSubmenu: false },
  { icon: FileText, label: "Blog", hasSubmenu: false },
  { icon: MessageSquare, label: "Forum", hasSubmenu: false },
];

const bottomItems = [
  { icon: Star, label: "Sponsorships", hasSubmenu: true },
  { icon: ShieldCheck, label: "Responsible Gambling", hasSubmenu: false },
  { icon: Headphones, label: "Live Support", hasSubmenu: false },
  { icon: Globe, label: "Language: English", hasSubmenu: true },
];

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = useAppPathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background md:hidden flex flex-col">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-10 bg-background">
        {/* Header: Logo + Auth */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <AppLink href="/" onClick={onClose} className="flex items-center gap-1.5 text-xl font-bold italic text-accent">
            Royal Flush
          </AppLink>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="text-xs font-medium px-4 h-9">
              Login
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground text-xs font-medium px-4 h-9">
              Register
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <div className="flex items-center bg-secondary rounded-lg overflow-hidden border border-border">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your game"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground py-3 text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Product Segmented Control */}
        <div className="px-4 pb-3">
          <div className="flex bg-secondary rounded-lg p-1">
            {productTabs.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <AppLink
                  key={tab.path}
                  href={tab.path}
                  onClick={onClose}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition-all",
                    isActive
                      ? tab.activeClass
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </AppLink>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-border" />
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() =>
                  item.hasSubmenu &&
                  setExpandedItem(expandedItem === item.label ? null : item.label)
                }
                className={cn(
                  "w-full flex items-center gap-4 min-h-[44px] py-3 text-sm transition-colors rounded-lg",
                  "hover:bg-sidebar-accent text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {item.hasSubmenu && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform text-muted-foreground",
                      expandedItem === item.label && "rotate-180"
                    )}
                  />
                )}
              </button>
              {item.hasSubmenu && expandedItem === item.label && (
                <div className="ml-9 py-2 space-y-1">
                  <button className="w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground">
                    Submenu Item 1
                  </button>
                  <button className="w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground">
                    Submenu Item 2
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="my-4 border-t border-border" />

        <ul className="space-y-1">
          {bottomItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() =>
                  item.hasSubmenu &&
                  setExpandedItem(expandedItem === item.label ? null : item.label)
                }
                className={cn(
                  "w-full flex items-center gap-4 min-h-[44px] py-3 text-sm transition-colors rounded-lg",
                  "hover:bg-sidebar-accent text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {item.hasSubmenu && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform text-muted-foreground",
                      expandedItem === item.label && "rotate-180"
                    )}
                  />
                )}
              </button>
              {item.hasSubmenu && expandedItem === item.label && (
                <div className="ml-9 py-2 space-y-1">
                  <button className="w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground">
                    Submenu Item 1
                  </button>
                  <button className="w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground">
                    Submenu Item 2
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
