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

// ─── Token Helpers ────────────────────────────────────────────────────────────

function setTokens(tokens: AuthTokens) {
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
}

function clearTokens() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
}

function hasTokens(): boolean {
    return !!localStorage.getItem("access_token");
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

    // Fetch current user from /auth/me and update state
    const refreshUser = useCallback(async () => {
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

    // Login: POST /auth/login → save tokens → load user
    const login = useCallback(
        async (email: string, password: string) => {
            const credentials: LoginRequest = { email, password };
            const { data: tokens } = await auth.login(credentials);
            setTokens(tokens);
            await refreshUser();
        },
        [refreshUser]
    );

    // Register: POST /auth/register → save tokens → load user
    const register = useCallback(
        async (email: string, username: string, password: string) => {
            const payload: RegisterRequest = { email, username, password };
            const { data: tokens } = await auth.register(payload);
            setTokens(tokens);
            await refreshUser();
        },
        [refreshUser]
    );

    // Logout: POST /auth/logout → clear tokens → clear user
    const logout = useCallback(async () => {
        try {
            await auth.logout();
        } catch {
            // Ignore server errors — always clear local state
        } finally {
            clearTokens();
            setUser(null);
        }
    }, []);

    // Update balance locally (for demo bets without real backend event IDs)
    const updateLocalBalance = useCallback((delta: number) => {
        setUser((prev) =>
            prev ? { ...prev, balance: (prev.balance ?? 0) + delta } : prev
        );
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
