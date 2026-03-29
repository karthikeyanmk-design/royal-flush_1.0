import axios from "axios";
import type {
    AuthTokens,
    User,
    LoginRequest,
    RegisterRequest,
    Wallet,
    Transaction,
    Game,
    Bet,
    BetResult,
    ProvablyFairSeeds,
    Sport,
    SportEvent,
    SportsBet,
    LotteryCategory,
    LotteryTicket,
    LotteryDraw,
    LotteryWinner,
    AdminDashboard,
    PaginatedResponse,
} from "@/types/api";

// ─── Axios Instance ───────────────────────────────────────────────────────────

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    headers: { "Content-Type": "application/json" },
});

// ─── Request Interceptor: attach access token ─────────────────────────────────

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ─── Response Interceptor: auto-refresh on 401 ───────────────────────────────

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: string) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token!);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) {
                isRefreshing = false;
                return Promise.reject(error);
            }

            try {
                const { data } = await axios.post<AuthTokens>(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/auth/refresh`,
                    { refresh_token: refreshToken }
                );
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
                processQueue(null, data.access_token);
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const auth = {
    login: (data: LoginRequest) =>
        api.post<AuthTokens>("/api/v1/auth/login", data),
    register: (data: RegisterRequest) =>
        api.post<AuthTokens>("/api/v1/auth/register", data),
    refresh: (refreshToken: string) =>
        api.post<AuthTokens>("/api/v1/auth/refresh", { refresh_token: refreshToken }),
    logout: () => api.post("/api/v1/auth/logout"),
    me: () => api.get<User>("/api/v1/auth/me"),
    updateMe: (data: Partial<Pick<User, "username" | "full_name">>) =>
        api.put<User>("/api/v1/auth/me", data),
};

// ─── Wallet ───────────────────────────────────────────────────────────────────

export const wallet = {
    get: () => api.get<Wallet>("/api/v1/wallet"),
    topup: (amount: number) => api.post<Wallet>("/api/v1/wallet/topup", { amount }),
    transactions: (page = 1, limit = 20) =>
        api.get<PaginatedResponse<Transaction>>("/api/v1/wallet/transactions", {
            params: { page, limit },
        }),
};

// ─── Games ────────────────────────────────────────────────────────────────────

export const games = {
    list: (category?: string, sort?: string) =>
        api.get<Game[]>("/api/v1/games", { params: { category, sort } }),
    get: (slug: string) => api.get<Game>(`/api/v1/games/${slug}`),
    play: (slug: string, amount: number, gameData: Record<string, unknown>) =>
        api.post<BetResult>(`/api/v1/games/${slug}/play`, {
            amount,
            game_data: gameData,
        }),
    history: (slug: string, limit = 20) =>
        api.get<Bet[]>(`/api/v1/games/${slug}/history`, { params: { limit } }),
};

// ─── Bets ─────────────────────────────────────────────────────────────────────

export const bets = {
    myBets: (page = 1, limit = 20) =>
        api.get<PaginatedResponse<Bet>>("/api/v1/bets", { params: { page, limit } }),
    live: (limit = 20) =>
        api.get<Bet[]>("/api/v1/bets/live", { params: { limit } }),
    highRollers: (limit = 20) =>
        api.get<Bet[]>("/api/v1/bets/high-rollers", { params: { limit } }),
    get: (id: number) => api.get<Bet>(`/api/v1/bets/${id}`),
};

// ─── Provably Fair ────────────────────────────────────────────────────────────

export const provablyFair = {
    seeds: () => api.get<ProvablyFairSeeds>("/api/v1/provably-fair/seeds"),
    rotate: () => api.post<ProvablyFairSeeds>("/api/v1/provably-fair/rotate"),
    verify: (betId: number) =>
        api.post("/api/v1/provably-fair/verify", { bet_id: betId }),
    setClientSeed: (clientSeed: string) =>
        api.put("/api/v1/provably-fair/client-seed", { client_seed: clientSeed }),
};

// ─── Sports ───────────────────────────────────────────────────────────────────

export const sports = {
    list: () => api.get<Sport[]>("/api/v1/sports"),
    events: (slug: string) =>
        api.get<SportEvent[]>(`/api/v1/sports/${slug}/events`),
    liveEvents: () => api.get<SportEvent[]>("/api/v1/sports/events/live"),
    featuredEvents: () =>
        api.get<SportEvent[]>("/api/v1/sports/events/featured"),
    event: (id: number) => api.get<SportEvent>(`/api/v1/sports/events/${id}`),
    placeBet: (eventId: number, selection: string, odds: number, amount: number) =>
        api.post<SportsBet>("/api/v1/sports/bets", {
            event_id: eventId,
            selection,
            odds,
            amount,
        }),
    myBets: () => api.get<SportsBet[]>("/api/v1/sports/bets"),
    cashout: (betId: number) =>
        api.post<SportsBet>(`/api/v1/sports/bets/${betId}/cashout`),
};

// ─── Lottery ──────────────────────────────────────────────────────────────────

export const lottery = {
    categories: () =>
        api.get<LotteryCategory[]>("/api/v1/lottery/categories"),
    category: (slug: string) =>
        api.get<LotteryCategory>(`/api/v1/lottery/categories/${slug}`),
    buyTicket: (
        categorySlug: string,
        numbers: number[],
        quantity = 1
    ) =>
        api.post<LotteryTicket>("/api/v1/lottery/tickets", {
            category_slug: categorySlug,
            numbers,
            quantity,
        }),
    myTickets: () => api.get<LotteryTicket[]>("/api/v1/lottery/tickets"),
    draws: () => api.get<LotteryDraw[]>("/api/v1/lottery/draws"),
    draw: (id: number) => api.get<LotteryDraw>(`/api/v1/lottery/draws/${id}`),
    winners: (limit = 10) =>
        api.get<LotteryWinner[]>("/api/v1/lottery/winners", { params: { limit } }),
};

// ─── Admin ────────────────────────────────────────────────────────────────────

export const admin = {
    dashboard: () => api.get<AdminDashboard>("/api/v1/admin/dashboard"),
    users: (search?: string) =>
        api.get("/api/v1/admin/users", { params: { search } }),
    updateUser: (id: number, data: Record<string, unknown>) =>
        api.put(`/api/v1/admin/users/${id}`, data),
    createGame: (data: Record<string, unknown>) =>
        api.post("/api/v1/admin/games", data),
    updateGame: (id: number, data: Record<string, unknown>) =>
        api.put(`/api/v1/admin/games/${id}`, data),
    createEvent: (data: Record<string, unknown>) =>
        api.post("/api/v1/admin/sports/events", data),
    settleEvent: (id: number, winningSide: string) =>
        api.post(`/api/v1/admin/sports/events/${id}/settle`, {
            winning_side: winningSide,
        }),
    createLotteryCategory: (data: Record<string, unknown>) =>
        api.post("/api/v1/admin/lottery/categories", data),
    scheduleDraw: (data: Record<string, unknown>) =>
        api.post("/api/v1/admin/lottery/draws", data),
    executeDraw: (id: number) =>
        api.post(`/api/v1/admin/lottery/draws/${id}/execute`),
};

export default api;
