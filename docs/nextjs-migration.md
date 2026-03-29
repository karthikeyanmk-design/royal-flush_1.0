# Next.js App Router Migration Checklist

> **Purpose**: Step-by-step guide for migrating this Vite + React codebase into a clean Next.js 14+ App Router project outside of Lovable.

---

## 1. High-Level Overview

This project is a frontend-only Vite + React application using:

- **React 18** with TypeScript
- **react-router-dom** for client-side routing (isolated in `src/lib/navigation.tsx`)
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **@tanstack/react-query** for data fetching
- **lucide-react** for icons

The migration involves:

1. Scaffolding a new Next.js 14+ project
2. Copying components, assets, and styles
3. Replacing the routing abstraction layer
4. Converting pages to the `/app` directory structure
5. Adding `"use client"` directives where required

---

## 2. Preconditions

- [ ] Node.js 18.17+ installed
- [ ] Create a new Next.js project: `npx create-next-app@latest --typescript --tailwind --eslint --app --src-dir`
- [ ] Install dependencies:
  ```bash
  npm install @tanstack/react-query class-variance-authority clsx tailwind-merge tailwindcss-animate lucide-react
  npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip
  npm install cmdk date-fns embla-carousel-react input-otp react-day-picker react-hook-form react-resizable-panels recharts sonner vaul zod @hookform/resolvers
  ```
- [ ] Initialize shadcn/ui: `npx shadcn-ui@latest init` and copy `components.json`
- [ ] Confirm `tsconfig.json` has `@/*` path alias pointing to `./src/*`

---

## 3. File-by-File Mapping

### 3.1 Configuration Files

| Vite Source | Next.js Target | Action |
|---|---|---|
| `tailwind.config.ts` | `tailwind.config.ts` | Copy as-is |
| `postcss.config.js` | `postcss.config.js` | Copy as-is (or use Next.js default) |
| `components.json` | `components.json` | Copy as-is |
| `src/index.css` | `src/app/globals.css` | Copy contents |
| `index.html` | `src/app/layout.tsx` | Extract `<head>` content into metadata export |
| `vite.config.ts` | — | **Delete** (not needed) |
| `vitest.config.ts` | — | Replace with Jest/Playwright config if needed |
| `tsconfig.app.json` | — | **Delete** (Next.js manages its own) |
| `tsconfig.node.json` | — | **Delete** |

### 3.2 App Shell & Routing

| Vite Source | Next.js Target | Action |
|---|---|---|
| `src/main.tsx` | — | **Delete** (Next.js handles entry) |
| `src/App.tsx` | `src/app/layout.tsx` | Extract providers into layout (see §4) |
| `src/App.css` | `src/app/globals.css` | Merge into globals |
| `src/pages/Index.tsx` | `src/app/page.tsx` | Convert to page component |
| `src/pages/Sports.tsx` | `src/app/sports/page.tsx` | Convert to page component |
| `src/pages/Casino.tsx` | `src/app/casino/page.tsx` | Convert to page component |
| `src/pages/Lottery.tsx` | `src/app/lottery/page.tsx` | Convert to page component |
| `src/pages/NotFound.tsx` | `src/app/not-found.tsx` | Rename; remove `useAppPathname` |

### 3.3 Navigation Abstraction

| Vite Source | Next.js Target | Action |
|---|---|---|
| `src/lib/navigation.tsx` | `src/lib/navigation.tsx` | **Replace internals** (see §4) |
| `src/lib/utils.ts` | `src/lib/utils.ts` | Copy as-is |

### 3.4 Shared Components

All files copy to the **same relative path** under `src/`.

| Vite Source | Next.js Target | "use client" Required |
|---|---|---|
| `src/components/Header.tsx` | Same | ✅ Yes (contains `AppLink`) |
| `src/components/Sidebar.tsx` | Same | ✅ Yes (`useState`, `useAppPathname`) |
| `src/components/MobileNav.tsx` | Same | ✅ Yes (`useState`, `useAppPathname`) |
| `src/components/MobileMenu.tsx` | Same | ✅ Yes (`useState`, `useAppPathname`, `onClick`) |
| `src/components/NavLink.tsx` | Same | ✅ Yes (`useAppPathname`) |
| `src/components/HeroSection.tsx` | Same | ✅ Yes (`onClick` handlers) |
| `src/components/SearchBar.tsx` | Same | ✅ Yes (interactive input) |
| `src/components/StartPlaying.tsx` | Same | ✅ Yes (`useState`, `useEffect`) |
| `src/components/TrendingGames.tsx` | Same | ✅ Yes (`useState`, `useEffect`) |
| `src/components/TrendingSports.tsx` | Same | ✅ Yes (`useState`, `useEffect`) |
| `src/components/Promotions.tsx` | Same | ✅ Yes (`useState`, `useEffect`) |
| `src/components/BetsTable.tsx` | Same | ✅ Yes (`useState`) |
| `src/components/FAQ.tsx` | Same | ✅ Yes (accordion interaction) |
| `src/components/Footer.tsx` | Same | ❌ No (pure render) |
| `src/components/GameCardSkeleton.tsx` | Same | ❌ No (pure render) |
| `src/components/SportCardSkeleton.tsx` | Same | ❌ No (pure render) |
| `src/components/StartPlayingSkeleton.tsx` | Same | ❌ No (pure render) |

### 3.5 Casino Components

| Vite Source | Next.js Target | "use client" Required |
|---|---|---|
| `src/components/casino/CasinoHero.tsx` | Same | ✅ Yes |
| `src/components/casino/CasinoSearchBar.tsx` | Same | ✅ Yes |
| `src/components/casino/GameSection.tsx` | Same | ✅ Yes |
| `src/components/casino/PublishersSection.tsx` | Same | ✅ Yes |
| `src/components/casino/TopSportsPicks.tsx` | Same | ✅ Yes |
| `src/components/casino/CasinoBetsTable.tsx` | Same | ✅ Yes |

### 3.6 Sports Components

| Vite Source | Next.js Target | "use client" Required |
|---|---|---|
| `src/components/sports/SportsHero.tsx` | Same | ✅ Yes |
| `src/components/sports/SportsSearchBar.tsx` | Same | ✅ Yes |
| `src/components/sports/TopMatches.tsx` | Same | ✅ Yes |
| `src/components/sports/TopSports.tsx` | Same | ✅ Yes |
| `src/components/sports/TopPicks.tsx` | Same | ✅ Yes |
| `src/components/sports/LiveEvents.tsx` | Same | ✅ Yes |
| `src/components/sports/PopularEvents.tsx` | Same | ✅ Yes |

### 3.7 Lottery Components

| Vite Source | Next.js Target | "use client" Required |
|---|---|---|
| `src/components/lottery/LotteryHero.tsx` | Same | ✅ Yes |
| `src/components/lottery/LotterySearchBar.tsx` | Same | ✅ Yes |
| `src/components/lottery/LotteryCategories.tsx` | Same | ✅ Yes |
| `src/components/lottery/TicketSelection.tsx` | Same | ✅ Yes |
| `src/components/lottery/RecentWinners.tsx` | Same | ✅ Yes |
| `src/components/lottery/PastResults.tsx` | Same | ✅ Yes |
| `src/components/lottery/LotteryFAQ.tsx` | Same | ✅ Yes |

### 3.8 UI Components (shadcn)

All `src/components/ui/*.tsx` files copy as-is. Most need `"use client"` since they use Radix primitives with interactivity.

### 3.9 Assets

| Vite Source | Next.js Target | Notes |
|---|---|---|
| `src/assets/*` | `src/assets/*` | Copy all; use `next/image` for optimization |
| `public/*` | `public/*` | Copy as-is |

### 3.10 Hooks

| Vite Source | Next.js Target | "use client" Required |
|---|---|---|
| `src/hooks/use-mobile.tsx` | Same | ✅ Yes |
| `src/hooks/use-toast.ts` | Same | ✅ Yes |

---

## 4. Routing Migration

### 4.1 Replace `src/lib/navigation.tsx`

**Before (Vite — react-router-dom):**
```tsx
import { Link, useLocation } from "react-router-dom";

export const AppLink = forwardRef(({ href, ...props }, ref) => (
  <Link ref={ref} to={href} {...props} />
));

export function useAppPathname(): string {
  return useLocation().pathname;
}
```

**After (Next.js):**
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, children, ...props }, ref) => (
    <Link ref={ref} href={href} {...props}>
      {children}
    </Link>
  )
);
AppLink.displayName = "AppLink";

export function useAppPathname(): string {
  return usePathname();
}
```

### 4.2 Create `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stake",
  description: "World's Largest Online Casino and Sportsbook",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 4.3 Create `src/components/Providers.tsx`

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
```

### 4.4 Create Page Files

Each page file follows this pattern (example: `src/app/page.tsx`):

```tsx
import Index from "@/pages/Index";

export default function HomePage() {
  return <Index />;
}
```

Or inline the page content directly and delete the `src/pages/` folder.

---

## 5. "use client" Conversion Checklist

Convert all `// "use client"` comments to actual directives:

- [ ] `src/lib/navigation.tsx` — Add `"use client";` at line 1
- [ ] `src/components/Header.tsx`
- [ ] `src/components/Sidebar.tsx`
- [ ] `src/components/MobileNav.tsx`
- [ ] `src/components/MobileMenu.tsx`
- [ ] `src/components/NavLink.tsx`
- [ ] `src/pages/NotFound.tsx` → `src/app/not-found.tsx`
- [ ] All components marked ✅ in §3 tables above

**Rule**: A component needs `"use client"` if it uses any of:
- `useState`, `useEffect`, `useRef`, `useReducer`, `useContext`
- `useAppPathname()` (wraps `usePathname`)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Browser APIs (`window`, `document`, `localStorage`)

---

## 6. Files to Delete After Migration

| File | Reason |
|---|---|
| `src/main.tsx` | Next.js handles app entry |
| `src/App.tsx` | Replaced by `app/layout.tsx` |
| `src/App.css` | Merged into `app/globals.css` |
| `src/vite-env.d.ts` | Vite-specific types |
| `vite.config.ts` | Vite bundler config |
| `vitest.config.ts` | Vite test config |
| `tsconfig.app.json` | Vite-specific TS config |
| `tsconfig.node.json` | Vite-specific TS config |
| `eslint.config.js` | Replace with Next.js ESLint config |
| `src/pages/` (entire folder) | Content moved to `app/` routes |

---

## 7. Post-Migration Verification Checklist

### Build & Lint
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] No TypeScript errors

### Routing
- [ ] `/` renders Home page
- [ ] `/casino` renders Casino page
- [ ] `/sports` renders Sports page
- [ ] `/lottery` renders Lottery page
- [ ] Invalid routes show the `not-found.tsx` page
- [ ] All `AppLink` navigation works (no full page reloads)
- [ ] Active route highlighting works in Sidebar
- [ ] Active route highlighting works in MobileNav

### Layout
- [ ] Sidebar renders on desktop, hidden on mobile
- [ ] Mobile bottom nav renders on mobile, hidden on desktop
- [ ] Sidebar collapse/expand toggle works
- [ ] Content area adjusts when sidebar toggles

### Components
- [ ] Hero section renders with social login buttons
- [ ] Search bars render on all pages
- [ ] Game/sport card carousels scroll horizontally
- [ ] Skeleton loading states appear then resolve
- [ ] Bets table tabs switch correctly
- [ ] FAQ accordion expands/collapses
- [ ] Footer renders with all link sections

### Assets
- [ ] All images in `src/assets/` load correctly
- [ ] Favicon displays in browser tab
- [ ] No 404s in browser Network tab

### Responsive
- [ ] Desktop (1920px): full sidebar + content
- [ ] Tablet (768px): sidebar auto-collapses
- [ ] Mobile (375px): bottom nav visible, no sidebar, full-width content

---

## 8. Common Pitfalls & Fixes

### Pitfall 1: Image Imports
**Problem**: Vite uses ES module imports for images (`import img from "@/assets/img.png"`), which return a URL string. Next.js `next/image` expects different handling.

**Fix**: Either:
- Continue using `<img>` tags with ES imports (works in Next.js)
- Migrate to `<Image>` from `next/image` with `width`/`height` props for optimization

### Pitfall 2: CSS `@import` in globals
**Problem**: Vite processes CSS imports differently from Next.js.

**Fix**: Ensure `globals.css` uses `@tailwind` directives at the top and all custom CSS below. Remove any Vite-specific PostCSS plugins.

### Pitfall 3: QueryClient in Server Component
**Problem**: `new QueryClient()` at module scope causes SSR issues.

**Fix**: Use `useState(() => new QueryClient())` inside the `"use client"` Providers component (shown in §4.3).

### Pitfall 4: Missing "use client"
**Problem**: Component uses hooks or event handlers but lacks the directive.

**Fix**: The error message will say "useState is not a function" or similar. Add `"use client";` as the first line.

### Pitfall 5: `usePathname()` Returns `null` on First Render
**Problem**: During SSR, `usePathname()` may behave differently than `useLocation()`.

**Fix**: Add a null check or default: `const pathname = useAppPathname() ?? "/"`.

### Pitfall 6: Tailwind Config `content` Paths
**Problem**: Vite and Next.js have different file structures.

**Fix**: Update `tailwind.config.ts` content array:
```ts
content: [
  "./src/app/**/*.{ts,tsx}",
  "./src/components/**/*.{ts,tsx}",
  "./src/lib/**/*.{ts,tsx}",
]
```

### Pitfall 7: Environment Variables
**Problem**: Vite uses `VITE_` prefix; Next.js uses `NEXT_PUBLIC_` for client-side vars.

**Fix**: Rename any `VITE_*` env vars to `NEXT_PUBLIC_*` and update references.

### Pitfall 8: `next/font` vs CSS Font Import
**Problem**: The project uses Inter via CSS. Next.js has built-in font optimization.

**Fix**: Use `next/font/google` (shown in §4.2) and remove any CSS `@import` for fonts.

---

## Summary

The codebase is **migration-ready**. All `react-router-dom` usage is isolated in `src/lib/navigation.tsx`. Components use the `AppLink` / `useAppPathname` abstractions. The migration requires:

1. **1 file rewrite**: `src/lib/navigation.tsx` (swap to `next/link` + `usePathname`)
2. **2 new files**: `app/layout.tsx`, `components/Providers.tsx`
3. **4 page moves**: `pages/*.tsx` → `app/*/page.tsx`
4. **~30 comment→directive conversions**: `// "use client"` → `"use client";`
5. **10 file deletions**: Vite-specific configs and entry points

Estimated migration time: **1–2 hours** for an experienced developer.
