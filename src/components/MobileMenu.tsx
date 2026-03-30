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
  Send,
  Check,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const productTabs = [
  {
    icon: Gamepad2,
    label: "Casino",
    path: "/casino",
    bg: "bg-[#1a1f2e]",
    iconColor: "text-[#3b5998]/20",
    borderColor: "border-[#2a3a5f]/30",
  },
  {
    icon: Dumbbell,
    label: "Sports",
    path: "/sports",
    bg: "bg-[#1a2a2e]",
    iconColor: "text-[#2a8a6a]/20",
    borderColor: "border-[#2a5a4a]/30",
  },
  {
    icon: Ticket,
    label: "Lottery",
    path: "/lottery",
    bg: "bg-[#251a2e]",
    iconColor: "text-[#8a3a9a]/20",
    borderColor: "border-[#4a2a5a]/30",
  },
];

const menuItems = [
  { icon: Sparkles, label: "Promotions", hasSubmenu: true },
  { icon: Users, label: "Affiliate", hasSubmenu: false },
  { icon: Trophy, label: "VIP Club", hasSubmenu: false },
  { icon: FileText, label: "Blog", hasSubmenu: false },
  { icon: MessageSquare, label: "Forum", hasSubmenu: false },
];

const bottomLinks = [
  { icon: Star, label: "Sponsorships", hasSubmenu: true },
  { icon: ShieldCheck, label: "Responsible Gambling", hasSubmenu: false },
];

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [view, setView] = useState<"menu" | "support" | "language">("menu");
  const [selectedLang, setSelectedLang] = useState("en");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportMessages, setSupportMessages] = useState<
    { text: string; from: "user" | "bot"; time: string }[]
  >([
    {
      text: "Hello! Welcome to Royal Flush support. How can we help you today?",
      from: "bot",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const pathname = useAppPathname();

  const currentLang = languages.find((l) => l.code === selectedLang) || languages[0];

  const handleSendMessage = () => {
    if (!supportMessage.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setSupportMessages((prev) => [
      ...prev,
      { text: supportMessage, from: "user", time: now },
    ]);
    setSupportMessage("");
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setSupportMessages((prev) => [
        ...prev,
        {
          text: "Thank you for reaching out! Our support team typically responds within a few minutes. Is there anything specific you need help with?",
          from: "bot",
          time: replyTime,
        },
      ]);
    }, 1500);
  };

  if (!isOpen) return null;

  // Live Support View
  if (view === "support") {
    return (
      <div className="fixed inset-0 z-50 bg-background md:hidden flex flex-col">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <button onClick={() => setView("menu")} className="p-1">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <Headphones className="w-5 h-5 text-accent" />
          <span className="font-semibold text-foreground">Live Support</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-green-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Online
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {supportMessages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col max-w-[80%]",
                msg.from === "user" ? "ml-auto items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-3 py-2 text-sm",
                  msg.from === "user"
                    ? "bg-accent text-white"
                    : "bg-sidebar-accent text-foreground"
                )}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1">{msg.time}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3 flex items-center gap-2">
          <input
            type="text"
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-sidebar-accent rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted-foreground text-foreground"
          />
          <button
            onClick={handleSendMessage}
            disabled={!supportMessage.trim()}
            className="p-2 rounded-lg bg-accent text-white hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Language Selection View
  if (view === "language") {
    return (
      <div className="fixed inset-0 z-50 bg-background md:hidden flex flex-col">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <button onClick={() => setView("menu")} className="p-1">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <Globe className="w-5 h-5 text-accent" />
          <span className="font-semibold text-foreground">Select Language</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => {
                    setSelectedLang(lang.code);
                    setView("menu");
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 min-h-[44px] py-3 px-3 text-sm transition-colors rounded-lg",
                    selectedLang === lang.code
                      ? "bg-sidebar-accent text-foreground"
                      : "hover:bg-sidebar-accent text-foreground"
                  )}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="flex-1 text-left font-medium">{lang.label}</span>
                  {selectedLang === lang.code && (
                    <Check className="w-4 h-4 text-accent" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Default Menu View
  return (
    <div className="fixed inset-0 z-50 bg-background md:hidden flex flex-col">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-10 bg-background">
        {/* Header: Logo + Auth */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <AppLink href="/" onClick={onClose} className="flex items-center gap-1.5 text-xl font-bold text-accent tracking-wide uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            <img src="/assets/logo.svg" alt="Royal Flush" className="h-7 w-auto" />
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
          <div className="flex gap-2">
            {productTabs.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <AppLink
                  key={tab.path}
                  href={tab.path}
                  onClick={onClose}
                  className={cn(
                    "relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all overflow-hidden border",
                    tab.bg,
                    tab.borderColor,
                    isActive
                      ? "border-white/15 shadow-lg ring-1 ring-white/10"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  {/* Vector icon overlay */}
                  <tab.icon
                    className={cn("absolute w-14 h-14 -right-1 -bottom-1 rotate-[-15deg] pointer-events-none", tab.iconColor)}
                    strokeWidth={1.5}
                  />
                  <tab.icon className="relative z-10 w-4 h-4 text-white/90" />
                  <span className="relative z-10 text-white/90">{tab.label}</span>
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
          {/* Static bottom links */}
          {bottomLinks.map((item) => (
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

          {/* Live Support */}
          <li>
            <button
              onClick={() => setView("support")}
              className="w-full flex items-center gap-4 min-h-[44px] py-3 text-sm transition-colors rounded-lg hover:bg-sidebar-accent text-foreground"
            >
              <Headphones className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-left font-medium">Live Support</span>
            </button>
          </li>

          {/* Language Selector */}
          <li>
            <button
              onClick={() => setView("language")}
              className="w-full flex items-center gap-4 min-h-[44px] py-3 text-sm transition-colors rounded-lg hover:bg-sidebar-accent text-foreground"
            >
              <Globe className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-left font-medium">
                {currentLang.flag} {currentLang.label}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
