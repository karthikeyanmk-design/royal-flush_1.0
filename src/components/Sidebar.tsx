"use client";
// "use client"
import { useState } from "react";
import { AppLink, useAppPathname } from "@/lib/navigation";
import {
  Menu,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const productButtons = [
  {
    icon: Gamepad2,
    label: "Casino",
    path: "/casino",
    gradient: "bg-gradient-to-r from-[#B20710] to-[#E50914]",
    glow: "shadow-[0_0_20px_rgba(229,9,20,0.4)]",
  },
  {
    icon: Dumbbell,
    label: "Sports",
    path: "/sports",
    gradient: "bg-gradient-to-r from-[#831010] to-[#B20710]",
    glow: "shadow-[0_0_20px_rgba(178,7,16,0.4)]",
  },
  {
    icon: Ticket,
    label: "Lottery",
    path: "/lottery",
    gradient: "bg-gradient-to-r from-[#5C0A0A] to-[#831010]",
    glow: "shadow-[0_0_20px_rgba(131,16,16,0.4)]",
  },
];

const menuItems = [
  { icon: Sparkles, label: "Promotions", path: "/promotions", matchPath: "/promotions" },
  { icon: Users, label: "Affiliate", path: "/affiliates", matchPath: "/affiliates" },
  { icon: Trophy, label: "VIP Club", path: "/vip", matchPath: "/vip" },
  { icon: FileText, label: "Blog", path: "#", matchPath: "" },
  { icon: MessageSquare, label: "Forum", path: "#", matchPath: "" },
];

const bottomItems = [
  { icon: Star, label: "Sponsorships", path: "/promotions", matchPath: "/promotions" },
  { icon: ShieldCheck, label: "Responsible Gambling", path: "/responsible-gambling", matchPath: "/responsible-gambling" },
  { icon: Headphones, label: "Live Support", path: "#", matchPath: "" },
  { icon: Globe, label: "Language: English", path: "#", matchPath: "" },
];

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const pathname = useAppPathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar z-40 transition-all duration-300 flex-col hidden md:flex",
          isOpen ? "w-56" : "w-14"
        )}
      >
        {/* Header with Menu Toggle */}
        <div className="flex items-center p-3 border-b border-sidebar-border">
          <button
            onClick={onToggle}
            className="p-2 hover:bg-sidebar-accent rounded-md transition-colors text-sidebar-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Product Buttons */}
        <div className={cn("p-3 space-y-2", !isOpen && "px-2")}>
          {productButtons.map((product) => {
            const isActive = pathname === product.path;
            const ButtonContent = (
              <AppLink
                key={product.path}
                href={product.path}
                className={cn(
                  "flex items-center gap-3 w-full rounded-lg transition-all duration-200",
                  isOpen ? "px-4 py-3" : "p-2.5 justify-center",
                  product.gradient,
                  isActive 
                    ? cn(product.glow, "ring-1 ring-white/20") 
                    : "opacity-60 hover:opacity-80"
                )}
              >
                <product.icon className={cn("shrink-0 text-white", isOpen ? "w-5 h-5" : "w-5 h-5")} />
                {isOpen && (
                  <span className="text-sm font-semibold text-white">{product.label}</span>
                )}
              </AppLink>
            );

            if (!isOpen) {
              return (
                <Tooltip key={product.path}>
                  <TooltipTrigger asChild>
                    {ButtonContent}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {product.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return ButtonContent;
          })}
        </div>

        <div className="mx-3 border-t border-sidebar-border" />

        {/* Main Menu */}
        <nav className="flex-1 overflow-y-auto pt-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = item.matchPath ? pathname === item.matchPath : false;
              const ItemContent = (
                <AppLink
                  href={item.path}
                  className={cn(
                    "w-full flex items-center gap-3 py-2.5 text-sm transition-colors rounded-md",
                    isActive
                      ? "bg-sidebar-accent text-foreground"
                      : "hover:bg-sidebar-accent hover:text-foreground text-sidebar-foreground",
                    !isOpen && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-accent" : "text-muted-foreground")} />
                  {isOpen && (
                    <span className="flex-1 text-left font-normal">{item.label}</span>
                  )}
                </AppLink>
              );

              if (!isOpen) {
                return (
                  <li key={item.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {ItemContent}
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              }

              return <li key={item.label}>{ItemContent}</li>;
            })}
          </ul>

          <div className="my-4 border-t border-sidebar-border" />

          <ul className="space-y-1">
            {bottomItems.map((item) => {
              const isActive = item.matchPath ? pathname === item.matchPath : false;
              const ItemContent = (
                <AppLink
                  href={item.path}
                  className={cn(
                    "w-full flex items-center gap-3 py-2.5 text-sm transition-colors rounded-md",
                    isActive
                      ? "bg-sidebar-accent text-foreground"
                      : "hover:bg-sidebar-accent hover:text-foreground text-sidebar-foreground",
                    !isOpen && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-accent" : "text-muted-foreground")} />
                  {isOpen && (
                    <span className="flex-1 text-left font-normal">{item.label}</span>
                  )}
                </AppLink>
              );

              if (!isOpen) {
                return (
                  <li key={item.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {ItemContent}
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              }

              return <li key={item.label}>{ItemContent}</li>;
            })}
          </ul>
        </nav>
      </aside>
    </TooltipProvider>
  );
};
