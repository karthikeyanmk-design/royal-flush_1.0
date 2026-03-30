"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLink } from "@/lib/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { CrownLogo } from "@/components/CrownLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Login = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.push("/");
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
      toast({ title: "Welcome back!" });
      router.push("/");
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail ?? "Invalid email or password";
      toast({ title: "Error", description: detail, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className={cn("transition-all duration-300", "ml-0", sidebarOpen ? "md:ml-56" : "md:ml-14")}>
        <Header />
        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0">
          <div className="flex items-center justify-center min-h-[70vh]">
            <Card className="w-full max-w-md bg-card border-border">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="flex flex-col items-center mb-6">
                  <img src="/assets/logo.svg" alt="Royal Flush" className="h-12 w-auto mb-2" />
                  <h1 className="text-2xl font-bold text-accent tracking-wide uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Royal Flush</h1>
                  <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit()}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {loading ? "Signing in..." : "Login"}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Don't have an account?{" "}
                  <AppLink href="/register" className="text-accent hover:underline font-medium">
                    Register
                  </AppLink>
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
};

export default Login;
