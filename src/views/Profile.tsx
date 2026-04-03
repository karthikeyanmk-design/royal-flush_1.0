"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { bets, auth as authApi } from "@/services/api";
import { cn } from "@/lib/utils";
import { User, Shield, Clock, Wallet, LogOut, Save } from "lucide-react";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, isAuthenticated, isLoading, logout, refreshUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [editUsername, setEditUsername] = useState("");
  const [editFullName, setEditFullName] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user) {
      setEditUsername(user.username || "");
      setEditFullName(user.full_name || "");
    }
  }, [user]);

  const { data: myBets, isLoading: betsLoading } = useQuery({
    queryKey: ["my-bets"],
    queryFn: () => bets.myBets(1, 10).then((r) => r.data),
    enabled: isAuthenticated,
  });

  const updateMutation = useMutation({
    mutationFn: (data: { username: string; full_name: string }) =>
      authApi.updateMe(data),
    onSuccess: () => {
      refreshUser();
      toast({ title: "Profile updated!" });
    },
    onError: () => {
      toast({ title: "Failed to update profile", variant: "destructive" });
    },
  });

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Skeleton className="w-64 h-8" />
      </div>
    );
  }

  const betHistory = myBets?.items || myBets || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className={cn("transition-all duration-300", "ml-0", sidebarOpen ? "md:ml-56" : "md:ml-14")}>
        <Header />
        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0 py-6 space-y-6">
          {/* Profile Header */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-accent text-2xl font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{user.username}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="border-accent text-accent text-xs">
                      {user.role}
                    </Badge>
                    {user.is_active && (
                      <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                        Active
                      </Badge>
                    )}
                    {user.is_verified && (
                      <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="text-2xl font-bold text-accent">
                    ${user.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Edit Profile */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="w-4 h-4 text-accent" /> Edit Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="edit-username">Username</Label>
                  <Input
                    id="edit-username"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-fullname">Full Name</Label>
                  <Input
                    id="edit-fullname"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={() => updateMutation.mutate({ username: editUsername, full_name: editFullName })}
                  disabled={updateMutation.isPending}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-4 h-4 text-accent" /> Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> Balance
                  </span>
                  <span className="font-semibold text-accent">
                    ${user.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Member Since
                  </span>
                  <span className="text-sm">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => { logout(); router.push("/"); }}
                  className="w-full mt-4"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bet History */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Recent Bets</CardTitle>
            </CardHeader>
            <CardContent>
              {betsLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : Array.isArray(betHistory) && betHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground">
                        <th className="text-left py-2 px-2">Game</th>
                        <th className="text-right py-2 px-2">Bet</th>
                        <th className="text-right py-2 px-2">Multiplier</th>
                        <th className="text-right py-2 px-2">Payout</th>
                        <th className="text-right py-2 px-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {betHistory.map((bet: any, i: number) => (
                        <tr key={i} className="border-b border-border hover:bg-secondary">
                          <td className="py-2 px-2">{String(bet.game_name || bet.game || "-")}</td>
                          <td className="text-right py-2 px-2">${Number(bet.amount || 0).toFixed(2)}</td>
                          <td className="text-right py-2 px-2">{Number(bet.multiplier || 0).toFixed(2)}x</td>
                          <td className={cn("text-right py-2 px-2 font-medium", Number(bet.payout || 0) > 0 ? "text-green-400" : "text-red-400")}>
                            ${Number(bet.payout || 0).toFixed(2)}
                          </td>
                          <td className="text-right py-2 px-2 text-muted-foreground">
                            {bet.created_at ? new Date(String(bet.created_at)).toLocaleTimeString() : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No bets yet. Start playing!</p>
              )}
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
