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
  Send,
  X,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const productButtons = [
  {
    icon: Gamepad2,
    label: "Casino",
    path: "/casino",
    bg: "bg-[#1a1f2e]",
    iconColor: "text-[#3b5998]/20",
    glow: "shadow-[0_0_20px_rgba(59,89,152,0.15)]",
    borderColor: "border-[#2a3a5f]/30",
  },
  {
    icon: Dumbbell,
    label: "Sports",
    path: "/sports",
    bg: "bg-[#1a2a2e]",
    iconColor: "text-[#2a8a6a]/20",
    glow: "shadow-[0_0_20px_rgba(42,138,106,0.15)]",
    borderColor: "border-[#2a5a4a]/30",
  },
  {
    icon: Ticket,
    label: "Lottery",
    path: "/lottery",
    bg: "bg-[#251a2e]",
    iconColor: "text-[#8a3a9a]/20",
    glow: "shadow-[0_0_20px_rgba(138,58,154,0.15)]",
    borderColor: "border-[#4a2a5a]/30",
  },
];

const menuItems = [
  { icon: Sparkles, label: "Promotions", path: "/promotions", matchPath: "/promotions" },
  { icon: Users, label: "Affiliate", path: "/affiliates", matchPath: "/affiliates" },
  { icon: Trophy, label: "VIP Club", path: "/vip", matchPath: "/vip" },
  { icon: FileText, label: "Blog", path: "#", matchPath: "" },
  { icon: MessageSquare, label: "Forum", path: "#", matchPath: "" },
];

const bottomLinks = [
  { icon: Star, label: "Sponsorships", path: "/promotions", matchPath: "/promotions" },
  { icon: ShieldCheck, label: "Responsible Gambling", path: "/responsible-gambling", matchPath: "/responsible-gambling" },
];

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const pathname = useAppPathname();
  const [supportOpen, setSupportOpen] = useState(false);
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
  const [selectedLang, setSelectedLang] = useState("en");

  const currentLang = languages.find((l) => l.code === selectedLang) || languages[0];

  const handleSendMessage = () => {
    if (!supportMessage.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setSupportMessages((prev) => [
      ...prev,
      { text: supportMessage, from: "user", time: now },
    ]);
    setSupportMessage("");
    // Auto-reply after a short delay
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

  const renderSidebarButton = (
    icon: React.ElementType,
    label: string,
    onClick: () => void,
    key: string
  ) => {
    const Icon = icon;
    const ButtonContent = (
      <button
        onClick={onClick}
        className={cn(
          "w-full flex items-center gap-3 py-2.5 text-sm transition-colors rounded-md",
          "hover:bg-sidebar-accent hover:text-foreground text-sidebar-foreground",
          !isOpen && "justify-center px-2"
        )}
      >
        <Icon className="w-4 h-4 shrink-0 text-muted-foreground" />
        {isOpen && <span className="flex-1 text-left font-normal">{label}</span>}
      </button>
    );

    if (!isOpen) {
      return (
        <li key={key}>
          <Tooltip>
            <TooltipTrigger asChild>{ButtonContent}</TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        </li>
      );
    }
    return <li key={key}>{ButtonContent}</li>;
  };

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
                  "relative flex items-center gap-3 w-full rounded-xl transition-all duration-200 overflow-hidden border",
                  isOpen ? "px-4 py-3" : "p-2.5 justify-center",
                  product.bg,
                  product.borderColor,
                  isActive
                    ? cn(product.glow, "ring-1 ring-white/15 border-white/10")
                    : "opacity-70 hover:opacity-100"
                )}
              >
                {/* Vector icon overlay */}
                <product.icon
                  className={cn(
                    "absolute pointer-events-none",
                    product.iconColor,
                    isOpen
                      ? "w-16 h-16 -right-2 -bottom-2 rotate-[-15deg]"
                      : "w-10 h-10 right-0 bottom-0 rotate-[-15deg]"
                  )}
                  strokeWidth={1.5}
                />
                {/* Content */}
                <product.icon className="relative z-10 shrink-0 text-white/90 w-5 h-5" />
                {isOpen && (
                  <span className="relative z-10 text-sm font-semibold text-white/90">{product.label}</span>
                )}
              </AppLink>
            );

            if (!isOpen) {
              return (
                <Tooltip key={product.path}>
                  <TooltipTrigger asChild>{ButtonContent}</TooltipTrigger>
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
                      <TooltipTrigger asChild>{ItemContent}</TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  </li>
                );
              }

              return <li key={item.label}>{ItemContent}</li>;
            })}
          </ul>

          <div className="my-4 border-t border-sidebar-border" />

          <ul className="space-y-1">
            {/* Static bottom links */}
            {bottomLinks.map((item) => {
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
                      <TooltipTrigger asChild>{ItemContent}</TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  </li>
                );
              }

              return <li key={item.label}>{ItemContent}</li>;
            })}

            {/* Live Support */}
            {renderSidebarButton(Headphones, "Live Support", () => setSupportOpen(true), "live-support")}

            {/* Language Selector */}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "w-full flex items-center gap-3 py-2.5 text-sm transition-colors rounded-md",
                      "hover:bg-sidebar-accent hover:text-foreground text-sidebar-foreground",
                      !isOpen && "justify-center px-2"
                    )}
                  >
                    <Globe className="w-4 h-4 shrink-0 text-muted-foreground" />
                    {isOpen && (
                      <span className="flex-1 text-left font-normal">
                        {currentLang.flag} {currentLang.label}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end" className="w-48">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setSelectedLang(lang.code)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span>{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {selectedLang === lang.code && (
                        <Check className="w-4 h-4 text-accent" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>

          {/* Brand Image */}
          <div className={cn("mt-auto pt-4 pb-3", isOpen ? "px-2" : "px-1.5")}>
            <img
              src="/assets/Royalflushimg.webp"
              alt="Royal Flush"
              className={cn(
                "w-full rounded-lg object-contain opacity-80",
                !isOpen && "w-10 mx-auto"
              )}
            />
          </div>
        </nav>
      </aside>

      {/* Live Support Dialog */}
      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0 bg-background border-border">
          <DialogHeader className="px-4 py-3 border-b border-border">
            <DialogTitle className="flex items-center gap-2 text-base">
              <Headphones className="w-5 h-5 text-accent" />
              Live Support
              <span className="ml-auto flex items-center gap-1.5 text-xs font-normal text-green-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Online
              </span>
            </DialogTitle>
          </DialogHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 min-h-[280px]">
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

          {/* Input */}
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
              className="p-2 rounded-lg bg-accent text-white hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
