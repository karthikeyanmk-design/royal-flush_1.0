"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    defaultTab?: "login" | "register";
}

export const AuthModal = ({
    open,
    onClose,
    defaultTab = "login",
}: AuthModalProps) => {
    const [tab, setTab] = useState<"login" | "register">(defaultTab);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const { toast } = useToast();

    const clearForm = () => {
        setEmail("");
        setUsername("");
        setPassword("");
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (tab === "login") {
                await login(email, password);
                toast({ title: "Welcome back!" });
            } else {
                await register(email, username, password);
                toast({ title: "Account created! You got 10,000 demo coins." });
            }
            clearForm();
            onClose();
        } catch (err: unknown) {
            const detail =
                (err as { response?: { data?: { detail?: string } } })?.response?.data
                    ?.detail ?? "Something went wrong";
            toast({
                title: "Error",
                description: detail,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (newTab: "login" | "register") => {
        setTab(newTab);
        clearForm();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                    <DialogTitle>
                        {tab === "login" ? "Login" : "Create Account"}
                    </DialogTitle>
                </DialogHeader>

                {/* Tab toggle */}
                <div className="flex gap-2 mb-4">
                    <Button
                        variant={tab === "login" ? "default" : "ghost"}
                        onClick={() => handleTabChange("login")}
                        className="flex-1"
                    >
                        Login
                    </Button>
                    <Button
                        variant={tab === "register" ? "default" : "ghost"}
                        onClick={() => handleTabChange("register")}
                        className="flex-1"
                    >
                        Register
                    </Button>
                </div>

                {/* Form fields */}
                <div className="space-y-3">
                    <div>
                        <Label htmlFor="auth-email">Email</Label>
                        <Input
                            id="auth-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>

                    {tab === "register" && (
                        <div>
                            <Label htmlFor="auth-username">Username</Label>
                            <Input
                                id="auth-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="coolplayer123"
                            />
                        </div>
                    )}

                    <div>
                        <Label htmlFor="auth-password">Password</Label>
                        <Input
                            id="auth-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit()}
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading
                            ? "Loading..."
                            : tab === "login"
                                ? "Login"
                                : "Create Account"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
