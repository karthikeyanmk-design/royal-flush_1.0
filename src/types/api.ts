// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  role: "user" | "admin";
  is_active: boolean;
  is_verified: boolean;
  balance: number;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  full_name?: string;
}

// ─── Wallet ──────────────────────────────────────────────────────────────────

export interface Wallet {
  balance: number;
  currency: string;
}

export interface Transaction {
  id: number;
  type: "topup" | "bet" | "win" | "refund";
  amount: number;
  balance_after: number;
  description: string;
  created_at: string;
}

export interface PaginatedTransactions {
  items: Transaction[];
  total: number;
  page: number;
  pages: number;
}

// ─── Games ───────────────────────────────────────────────────────────────────

export interface Game {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  publisher: string;
  house_edge: number;
  min_bet: number;
  max_bet: number;
  active_players: number;
  is_active: boolean;
  created_at: string;
}

export interface BetResult {
  id: number;
  game_name: string;
  username: string;
  amount: number;
  multiplier: number;
  payout: number;
  status: "won" | "lost";
  result_data: Record<string, unknown>;
  created_at: string;
}

// ─── Bets ────────────────────────────────────────────────────────────────────

export interface Bet {
  id: number;
  game_name: string;
  username: string;
  amount: number;
  multiplier: number;
  payout: number;
  status: "won" | "lost";
  currency: string;
  result_data: Record<string, unknown>;
  created_at: string;
}

// ─── Provably Fair ───────────────────────────────────────────────────────────

export interface ProvablyFairSeeds {
  server_seed_hash: string;
  client_seed: string;
  nonce: number;
}

// ─── Sports ──────────────────────────────────────────────────────────────────

export interface Sport {
  id: number;
  name: string;
  slug: string;
  icon: string;
  event_count: number;
  live_count: number;
}

export interface OddsOption {
  label: string;
  value: string;
  odds: number;
}

export interface OddsMarket {
  name: string;
  options: OddsOption[];
}

export interface League {
  id: number;
  name: string;
  country: string;
  country_flag: string;
}

export interface SportEvent {
  id: number;
  sport_slug: string;
  league: League;
  team1_name: string;
  team2_name: string;
  team1_logo: string | null;
  team2_logo: string | null;
  starts_at: string;
  is_live: boolean;
  viewers: number;
  odds_markets: OddsMarket[];
}

export interface SportsBet {
  id: number;
  event_id: number;
  event_name: string;
  selection: string;
  odds: number;
  amount: number;
  potential_payout: number;
  status: "pending" | "won" | "lost" | "cashed_out";
  created_at: string;
}

// ─── Lottery ─────────────────────────────────────────────────────────────────

export interface LotteryCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  ticket_price: number;
  jackpot_amount: number;
  next_draw_at: string;
  numbers_count: number;
  max_number: number;
}

export interface LotteryTicket {
  id: number;
  category_slug: string;
  category_name: string;
  numbers: number[];
  quantity: number;
  total_cost: number;
  draw_id: number | null;
  status: "active" | "checked" | "won" | "lost";
  prize_amount: number | null;
  created_at: string;
}

export interface LotteryDraw {
  id: number;
  category_name: string;
  drawn_numbers: number[];
  jackpot_amount: number;
  total_winners: number;
  drawn_at: string;
}

export interface LotteryWinner {
  id: number;
  username: string;
  lottery_name: string;
  prize_amount: number;
  numbers: number[];
  won_at: string;
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export interface AdminDashboard {
  total_users: number;
  total_bets: number;
  total_payout: number;
  house_profit: number;
  active_users_today: number;
}

// ─── Pagination ──────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}
