"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wallet } from "@/services/api";
import { cn } from "@/lib/utils";
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

const quickAmounts = [100, 500, 1000, 5000];

const WalletPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, isAuthenticated, isLoading, refreshUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [topupAmount, setTopupAmount] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  const { data: transactions, isLoading: txLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => wallet.transactions(1, 30).then((r) => r.data),
    enabled: isAuthenticated,
  });

  const topupMutation = useMutation({
    mutationFn: (amount: number) => wallet.topup(amount),
    onSuccess: () => {
      refreshUser();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setTopupAmount("");
      toast({ title: "Funds added successfully!" });
    },
    onError: () => {
      toast({ title: "Top-up failed", variant: "destructive" });
    },
  });

  const handleTopup = (amount?: number) => {
    const val = amount || Number(topupAmount);
    if (val < 1 || val > 10000) {
      toast({ title: "Amount must be between 1 and 10,000", variant: "destructive" });
      return;
    }
    topupMutation.mutate(val);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Skeleton className="w-64 h-8" />
      </div>
    );
  }

  const txList = transactions?.items || transactions || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className={cn("transition-all duration-300", "ml-0", sidebarOpen ? "md:ml-56" : "md:ml-14")}>
        <Header />
        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0 py-6 space-y-6">
          {/* Balance Hero */}
          <Card className="bg-gradient-to-br from-[#B20710] to-[#5C0A0A] border-none">
            <CardContent className="pt-8 pb-8 flex flex-col items-center">
              <WalletIcon className="w-10 h-10 text-accent mb-3" />
              <p className="text-sm text-white/70 mb-1">Your Balance</p>
              <p className="text-4xl font-bold text-accent">
                ${user.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-white/50 mt-2">Play Money (DEMO)</p>
            </CardContent>
          </Card>

          {/* Top Up Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Plus className="w-4 h-4 text-accent" /> Add Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                {quickAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    onClick={() => handleTopup(amt)}
                    disabled={topupMutation.isPending}
                    className="flex-1 border-border hover:bg-primary hover:text-accent"
                  >
                    ${amt.toLocaleString()}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Custom amount (1 - 10,000)"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  min={1}
                  max={10000}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleTopup()}
                  disabled={topupMutation.isPending || !topupAmount}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-8"
                >
                  {topupMutation.isPending ? "Adding..." : "Add Funds"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="w-4 h-4 text-accent" /> Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {txLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : Array.isArray(txList) && txList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground">
                        <th className="text-left py-2 px-2">Type</th>
                        <th className="text-left py-2 px-2">Description</th>
                        <th className="text-right py-2 px-2">Amount</th>
                        <th className="text-right py-2 px-2">Balance</th>
                        <th className="text-right py-2 px-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {txList.map((tx: any, i: number) => {
                        const amount = Number(tx.amount || 0);
                        const isPositive = amount >= 0 || String(tx.type) === "topup" || String(tx.type) === "win";
                        return (
                          <tr key={i} className="border-b border-border hover:bg-secondary">
                            <td className="py-2 px-2">
                              <Badge variant="outline" className="text-xs flex items-center gap-1 w-fit">
                                {isPositive
                                  ? <ArrowDownRight className="w-3 h-3 text-green-400" />
                                  : <ArrowUpRight className="w-3 h-3 text-red-400" />}
                                {String(tx.type || "—")}
                              </Badge>
                            </td>
                            <td className="py-2 px-2 text-muted-foreground">{String(tx.description || "—")}</td>
                            <td className={cn("text-right py-2 px-2 font-medium", isPositive ? "text-green-400" : "text-red-400")}>
                              {isPositive ? "+" : ""}${Math.abs(amount).toFixed(2)}
                            </td>
                            <td className="text-right py-2 px-2">${Number(tx.balance_after || 0).toFixed(2)}</td>
                            <td className="text-right py-2 px-2 text-muted-foreground">
                              {tx.created_at ? new Date(String(tx.created_at)).toLocaleDateString() : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No transactions yet.</p>
              )}
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
};

export default WalletPage;
