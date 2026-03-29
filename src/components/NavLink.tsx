"use client";
// "use client"
// Legacy NavLink wrapper — kept for backward compatibility.
// In Next.js, replace with next/link + usePathname for active styling.

import { forwardRef } from "react";
import { AppLink, useAppPathname } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, href, ...props }, ref) => {
    const pathname = useAppPathname();
    const isActive = pathname === href;

    return (
      <AppLink
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
