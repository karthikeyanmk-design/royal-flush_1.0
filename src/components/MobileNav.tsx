"use client";
// "use client"
import { useState } from "react";
import { AppLink, useAppPathname } from "@/lib/navigation";
import { LayoutGrid, Gamepad2, Ticket, Dumbbell, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { 
    icon: LayoutGrid, 
    label: "Browse", 
    path: "/", 
    action: "menu" as const,
    activeColor: "bg-primary" 
  },
  { 
    icon: Gamepad2, 
    label: "Casino", 
    path: "/casino", 
    action: "link" as const,
    activeColor: "bg-[#E50914]"
  },
  {
    icon: Ticket,
    label: "Lottery",
    path: "/lottery",
    action: "link" as const,
    activeColor: "bg-[#E50914]"
  },
  {
    icon: Dumbbell,
    label: "Sports",
    path: "/sports",
    action: "link" as const,
    activeColor: "bg-[#E50914]"
  },
  { 
    icon: MessageCircle, 
    label: "Chat", 
    path: "/chat", 
    action: "link" as const,
    activeColor: "bg-primary" 
  },
];

export const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useAppPathname();

  const isActive = (item: typeof navItems[0]) => {
    if (item.action === "menu") {
      return menuOpen;
    }
    return pathname === item.path;
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.action === "menu") {
      setMenuOpen(!menuOpen);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border md:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const active = isActive(item);
            
            const content = (
              <div className="relative flex flex-col items-center gap-1 px-4 py-2 min-w-[56px]">
                <div 
                  className={cn(
                    "absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-b-full transition-all duration-200",
                    active ? item.activeColor : "bg-transparent"
                  )}
                />
                <item.icon 
                  className={cn(
                    "w-5 h-5 transition-colors duration-200",
                    active ? "text-foreground" : "text-muted-foreground"
                  )} 
                />
                <span 
                  className={cn(
                    "text-[10px] font-medium transition-colors duration-200",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </div>
            );

            if (item.action === "menu") {
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="transition-colors"
                >
                  {content}
                </button>
              );
            }

            return (
              <AppLink
                key={item.label}
                href={item.path}
                onClick={() => handleNavClick(item)}
                className="transition-colors"
              >
                {content}
              </AppLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};
