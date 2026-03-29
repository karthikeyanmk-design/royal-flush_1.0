"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, className, children, onClick, ...rest }, ref) => {
    return (
      <Link ref={ref} href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }
);
AppLink.displayName = "AppLink";

export function useAppPathname(): string {
  return usePathname();
}
