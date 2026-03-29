"use client";
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Winner {
  id: number;
  user: string;
  lottery: string;
  prize: string;
  time: string;
}

const recentWinners: Winner[] = [
  { id: 1, user: "Hid***n", lottery: "Daily Lottery", prize: "₹5,00,000", time: "2m ago" },
  { id: 2, user: "Luc***y", lottery: "Weekly Lottery", prize: "₹25,00,000", time: "15m ago" },
  { id: 3, user: "Win***r", lottery: "Daily Lottery", prize: "₹1,00,000", time: "1h ago" },
  { id: 4, user: "Jac***t", lottery: "Mega Jackpot", prize: "₹1,00,00,000", time: "3h ago" },
  { id: 5, user: "Sta***e", lottery: "Flash Lottery", prize: "₹50,000", time: "5h ago" },
];

export const RecentWinners = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-3 md:px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-primary" />
        <h3 className="text-base font-semibold">Recent Winners</h3>
        <span className="ml-auto text-xs text-muted-foreground">Live</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-xs text-muted-foreground font-medium h-10">Player</TableHead>
              <TableHead className="text-xs text-muted-foreground font-medium h-10">Lottery</TableHead>
              <TableHead className="text-xs text-muted-foreground font-medium text-right h-10">Prize</TableHead>
              <TableHead className="text-xs text-muted-foreground font-medium text-right h-10">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-border">
                    <TableCell className="py-2.5"><Skeleton className="h-3.5 w-14" /></TableCell>
                    <TableCell className="py-2.5"><Skeleton className="h-3.5 w-20" /></TableCell>
                    <TableCell className="py-2.5"><Skeleton className="h-3.5 w-16 ml-auto" /></TableCell>
                    <TableCell className="py-2.5"><Skeleton className="h-3.5 w-10 ml-auto" /></TableCell>
                  </TableRow>
                ))
              : recentWinners.map((winner) => (
                  <TableRow key={winner.id} className="border-border hover:bg-secondary/30">
                    <TableCell className="text-sm font-medium py-3">{winner.user}</TableCell>
                    <TableCell className="text-sm text-muted-foreground py-3">{winner.lottery}</TableCell>
                    <TableCell className="text-right text-sm font-semibold text-stake-green py-3">{winner.prize}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground py-3">{winner.time}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
