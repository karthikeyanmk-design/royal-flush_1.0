

# Casino Page Design Plan

## Overview
Create a dedicated Casino page (`/casino`) that matches the reference design, featuring promotional cards, a categorized game search, and multiple game section carousels organized by category (Stake Originals, Slots, Live Casino, etc.).

---

## Page Structure

```text
+--------------------------------------------------+
|                     Header                        |
+--------------------------------------------------+
|              Hero (3 Promo Cards)                 |
+--------------------------------------------------+
|    Search Bar (full-width with category tabs)    |
+--------------------------------------------------+
|            Stake Originals Section                |
|  [Dice][Mines][Plinko][Chicken][Crash][...]      |
+--------------------------------------------------+
|                 Slots Section                     |
|  [Sweet Bonanza][Wanted][Gates of Olympus][...]  |
+--------------------------------------------------+
|              Publishers Section                   |
|  [Pragmatic][Stake][Hacksaw][Evolution][...]     |
+--------------------------------------------------+
|              Live Casino Section                  |
|  [Blackjack][Roulette][Baccarat][...]            |
+--------------------------------------------------+
|              Game Shows Section                   |
|  [Crazy Time][Lightning Roulette][...]           |
+--------------------------------------------------+
|            Only on Stake Section                  |
|  [Le Rapper][Catastrophe][Bank Basher][...]      |
+--------------------------------------------------+
|             Burst Games Section                   |
|  [Aviamasters][Angry Balls][Aviator][...]        |
+--------------------------------------------------+
|            Top Sports Picks Section               |
|  [Match Cards with Odds]                          |
+--------------------------------------------------+
|             New Releases Section                  |
|  [Zeus][Wild Don][Wicked Brew][...]              |
+--------------------------------------------------+
|                   Bets Table                      |
|  [My Bets | All Bets | High Rollers | Race]      |
+--------------------------------------------------+
|                     Footer                        |
+--------------------------------------------------+
```

---

## Components to Create

### 1. Casino Page (`src/pages/Casino.tsx`)
Main page component that assembles all casino-specific sections with the shared layout (Sidebar, Header, Footer, MobileNav).

### 2. Casino Hero (`src/components/casino/CasinoHero.tsx`)
- 3 promotional cards in a horizontal grid
- Each card: "Promotion" badge (teal border), title, subtitle, "Play Now/Race Now" button, promotional image
- Skeleton loading state
- Reuses similar structure to `SportsHero.tsx`

### 3. Casino Search Bar (`src/components/casino/CasinoSearchBar.tsx`)
- Full-width search input with search icon
- Category tabs below: Lobby, Only on Stake, New Releases, Stake Originals, Slots, Live Casino
- Active tab styling (teal/primary background)
- Horizontal scrolling on mobile

### 4. Game Section Component (`src/components/casino/GameSection.tsx`)
Reusable component for game carousels with:
- Section header (icon + title + navigation arrows)
- Horizontal scrollable game cards
- Each game card shows: image, optional tag/badge, player count
- Skeleton loading state
- Props: `title`, `icon`, `games[]`, `showTag`, `showPlayers`

### 5. Publishers Section (`src/components/casino/PublishersSection.tsx`)
Special horizontal carousel for publisher logos:
- Rounded/pill-shaped containers with publisher logos
- Player count displayed below each
- Publishers: Pragmatic Play, Stake, Hacksaw, Evolution, Nolimit, Massive, Twist, Titan

### 6. Top Sports Picks (`src/components/casino/TopSportsPicks.tsx`)
Match cards for casino page:
- Team matchups with odds buttons
- Wagered amounts display
- Similar to sports match cards but simpler layout

### 7. Casino Bets Table (`src/components/casino/CasinoBetsTable.tsx`)
Enhanced version of existing BetsTable with:
- Tabs: My Bets, All Bets, High Rollers, Race Leaderboard
- Dropdown to select number of rows (10)
- Game icon, user (hidden option), time, bet amount, multiplier, payout

---

## Routing Changes

Update `src/App.tsx`:
- Add `/casino` route pointing to the Casino page
- Update Sidebar "Casino" button to link to `/casino`

---

## Assets Needed

Game images will be generated or reused from existing assets. Key categories:
- Stake Originals: Dice, Mines, Plinko, Chicken, Crash, Keno, Limbo, Hilo
- Slots: Reuse existing game-1 through game-7 assets
- Live Casino: Blackjack, Roulette, Baccarat, Dragon Tiger, etc.
- Publishers: Logo images for each publisher

---

## Technical Details

### Shared Components
- Reuse existing: `Sidebar`, `Header`, `Footer`, `MobileNav`, `Skeleton`
- Reuse game card pattern from `TrendingGames.tsx`

### State Management
- Local `useState` for loading states (1.2-1.8s skeleton display)
- Local `useState` for active tab selection

### Styling Patterns
- Cards: `bg-card border border-border rounded-lg`
- Hover: `hover:border-primary/50 transition-colors`
- Player count: Green text with animated dot
- Sections: `px-3 md:px-4 py-2 md:py-3`

### Component Hierarchy
```text
Casino.tsx
├── Sidebar
├── Header
├── CasinoHero
├── CasinoSearchBar
├── GameSection (Stake Originals)
├── GameSection (Slots)
├── PublishersSection
├── GameSection (Live Casino)
├── GameSection (Game Shows)
├── GameSection (Only on Stake)
├── GameSection (Burst Games)
├── TopSportsPicks
├── GameSection (New Releases)
├── CasinoBetsTable
├── Footer
└── MobileNav
```

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/pages/Casino.tsx` | Create |
| `src/components/casino/CasinoHero.tsx` | Create |
| `src/components/casino/CasinoSearchBar.tsx` | Create |
| `src/components/casino/GameSection.tsx` | Create |
| `src/components/casino/PublishersSection.tsx` | Create |
| `src/components/casino/TopSportsPicks.tsx` | Create |
| `src/components/casino/CasinoBetsTable.tsx` | Create |
| `src/App.tsx` | Modify (add route) |
| `src/components/Sidebar.tsx` | Modify (link Casino button) |

---

## Implementation Order

1. Create `Casino.tsx` page with shared layout
2. Create `CasinoHero.tsx` (promo cards)
3. Create `CasinoSearchBar.tsx` (search + category tabs)
4. Create `GameSection.tsx` (reusable carousel component)
5. Create `PublishersSection.tsx`
6. Create `TopSportsPicks.tsx`
7. Create `CasinoBetsTable.tsx` (enhanced bets table)
8. Generate necessary game/publisher images
9. Update routing in `App.tsx`
10. Update Sidebar navigation link

