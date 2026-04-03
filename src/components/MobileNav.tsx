"use client";
import { AppLink, useAppPathname } from "@/lib/navigation";
import { cn } from "@/lib/utils";

// Filled icon components
const BrowseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const CasinoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 2.5C14.46 2.5 12 4.96 12 8s2.46 5.5 5.5 5.5S23 11.04 23 8s-2.46-5.5-5.5-5.5zm0 8a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM6.5 10.5C3.46 10.5 1 12.96 1 16s2.46 5.5 5.5 5.5S12 19.04 12 16s-2.46-5.5-5.5-5.5zm0 8a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
  </svg>
);

const LotteryIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h2v2H6v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
  </svg>
);

const SportsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 2.07c2.59.44 4.73 2.16 5.71 4.49l-2.03.83a6.01 6.01 0 00-3.68-3.31V4.07zm-2 0v2.01a6.01 6.01 0 00-3.68 3.31l-2.03-.83A8.03 8.03 0 0111 4.07zM4.63 14.03l1.87-.76c.33 1.35 1.12 2.52 2.19 3.32l-1.04 1.73a8.02 8.02 0 01-3.02-4.29zm6.87 5.9a8.1 8.1 0 01-1.16-.15l1.04-1.74a5.98 5.98 0 003.24 0l1.04 1.74c-.37.08-.76.12-1.16.15a8.2 8.2 0 01-3 0zm7.87-5.9a8.02 8.02 0 01-3.02 4.29l-1.04-1.73a5.99 5.99 0 002.19-3.32l1.87.76z"/>
  </svg>
);

const MyBetsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 9h-2v2H9v-2H7v-2h2V7h2v2h2v2zm-1-7.5L17.5 9H12V3.5z"/>
  </svg>
);

const navItems = [
  {
    icon: BrowseIcon,
    label: "Browse",
    path: "/",
    activeColor: "bg-primary"
  },
  {
    icon: CasinoIcon,
    label: "Casino",
    path: "/casino",
    activeColor: "bg-[#E50914]"
  },
  {
    icon: LotteryIcon,
    label: "Lottery",
    path: "/lottery",
    activeColor: "bg-[#E50914]"
  },
  {
    icon: SportsIcon,
    label: "Sports",
    path: "/sports",
    activeColor: "bg-[#E50914]"
  },
  {
    icon: MyBetsIcon,
    label: "My Bets",
    path: "/wallet",
    activeColor: "bg-[#E50914]"
  },
];

export const MobileNav = () => {
  const pathname = useAppPathname();

  const isActive = (item: typeof navItems[0]) => {
    if (item.path === "/") return pathname === "/";
    return pathname.startsWith(item.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const active = isActive(item);

          return (
            <AppLink
              key={item.label}
              href={item.path}
              className="transition-colors"
            >
              <div className="relative flex flex-col items-center gap-1 px-2 py-2 min-w-[48px]">
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
            </AppLink>
          );
        })}
      </div>
    </nav>
  );
};
