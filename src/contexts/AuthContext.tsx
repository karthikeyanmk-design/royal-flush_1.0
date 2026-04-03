"use client";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import { auth } from "@/services/api";
import type { User, LoginRequest, RegisterRequest, AuthTokens } from "@/types/api";

// ─── Demo Accounts (works without backend) ──────────────────────────────────

const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
    "admin@stake.local": {
        password: "admin123",
        user: { id: 1, email: "admin@stake.local", username: "admin", full_name: "Admin User", role: "admin", is_active: true, is_verified: true, balance: 50000, created_at: "2025-01-01T00:00:00Z" },
    },
    "demo@stake.local": {
        password: "demo123",
        user: { id: 2, email: "demo@stake.local", username: "demo_player", full_name: "Demo Player", role: "user", is_active: true, is_verified: true, balance: 10000, created_at: "2025-01-01T00:00:00Z" },
    },
};

const DEMO_USER_KEY = "demo_user";

function saveDemoUser(user: User) {
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
}

function loadDemoUser(): User | null {
    try {
        const stored = localStorage.getItem(DEMO_USER_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

function clearDemoUser() {
    localStorage.removeItem(DEMO_USER_KEY);
}

// ─── Token Helpers ────────────────────────────────────────────────────────────

function setTokens(tokens: AuthTokens) {
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
}

function clearTokens() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    clearDemoUser();
}

function hasTokens(): boolean {
    return !!localStorage.getItem("access_token") || !!localStorage.getItem(DEMO_USER_KEY);
}

// ─── Context Types ────────────────────────────────────────────────────────────

interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    updateLocalBalance: (delta: number) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch current user from /auth/me (falls back to demo user)
    const refreshUser = useCallback(async () => {
        // Try loading demo user from localStorage first
        const demoUser = loadDemoUser();
        if (demoUser) {
            setUser(demoUser);
            return;
        }
        try {
            const { data } = await auth.me();
            setUser(data);
        } catch {
            clearTokens();
            setUser(null);
        }
    }, []);

    // On mount: if tokens exist, load the user
    useEffect(() => {
        const init = async () => {
            if (hasTokens()) {
                await refreshUser();
            }
            setIsLoading(false);
        };
        init();
    }, [refreshUser]);

    // Login: try backend first, fall back to demo accounts
    const login = useCallback(
        async (email: string, password: string) => {
            // Check demo accounts first
            const demo = DEMO_ACCOUNTS[email.toLowerCase()];
            if (demo && demo.password === password) {
                saveDemoUser(demo.user);
                setUser(demo.user);
                return;
            }
            try {
                const credentials: LoginRequest = { email, password };
                const { data: tokens } = await auth.login(credentials);
                setTokens(tokens);
                await refreshUser();
            } catch {
                // If backend is down, reject non-demo credentials
                throw new Error("Invalid email or password");
            }
        },
        [refreshUser]
    );

    // Register: try backend first, fall back to demo registration
    const register = useCallback(
        async (email: string, username: string, password: string) => {
            try {
                const payload: RegisterRequest = { email, username, password };
                const { data: tokens } = await auth.register(payload);
                setTokens(tokens);
                await refreshUser();
            } catch {
                // If backend is down, create a local demo user
                const newUser: User = {
                    id: Date.now(),
                    email,
                    username,
                    full_name: username,
                    role: "user",
                    is_active: true,
                    is_verified: true,
                    balance: 10000,
                    created_at: new Date().toISOString(),
                };
                saveDemoUser(newUser);
                setUser(newUser);
            }
        },
        [refreshUser]
    );

    // Logout: clear everything
    const logout = useCallback(async () => {
        try {
            await auth.logout();
        } catch {
            // Ignore server errors
        } finally {
            clearTokens();
            setUser(null);
        }
    }, []);

    // Update balance locally (persists for demo users)
    const updateLocalBalance = useCallback((delta: number) => {
        setUser((prev) => {
            if (!prev) return prev;
            const updated = { ...prev, balance: (prev.balance ?? 0) + delta };
            saveDemoUser(updated);
            return updated;
        });
    }, []);

    const value: AuthContextValue = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
        updateLocalBalance,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside <AuthProvider>");
    }
    return ctx;
}
