"use client";
import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface DrawResult {
  id: number;
  date: string;
  lottery: string;
  numbers: number[];
  jackpot: string;
  winners: number;
}

const pastResults: DrawResult[] = [
  { id: 1, date: "Feb 3, 2026", lottery: "Daily Lottery", numbers: [7, 14, 23, 31, 42, 49], jackpot: "₹10,00,000", winners: 3 },
  { id: 2, date: "Feb 2, 2026", lottery: "Daily Lottery", numbers: [3, 11, 22, 28, 35, 44], jackpot: "₹10,00,000", winners: 2 },
  { id: 3, date: "Feb 1, 2026", lottery: "Weekly Lottery", numbers: [5, 19, 24, 33, 40, 47], jackpot: "₹1,00,00,000", winners: 1 },
  { id: 4, date: "Jan 31, 2026", lottery: "Daily Lottery", numbers: [2, 8, 17, 26, 38, 45], jackpot: "₹10,00,000", winners: 4 },
  { id: 5, date: "Jan 30, 2026", lottery: "Daily Lottery", numbers: [6, 13, 21, 34, 41, 48], jackpot: "₹10,00,000", winners: 2 },
];

export const PastResults = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="px-3 md:px-4 py-3">
      <div className="flex items-center gap-2 mb-2.5">
        <Calendar className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold">Past Draw Results</h3>
      </div>

      <div className="space-y-1.5">
        {pastResults.map((result) => (
          <Collapsible
            key={result.id}
            open={openItems.includes(result.id)}
            onOpenChange={() => toggleItem(result.id)}
          >
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between px-3 py-2.5 hover:bg-secondary/30 transition-colors">
                  <div className="text-left">
                    <p className="text-xs font-medium">{result.date}</p>
                    <p className="text-[10px] text-muted-foreground">{result.lottery}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-0.5">
                      {result.numbers.slice(0, 3).map((num, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded bg-secondary flex items-center justify-center text-[10px] font-medium"
                        >
                          {num}
                        </span>
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-0.5">+3</span>
                    </div>
                    
                    <span className="text-xs font-semibold text-stake-green">{result.jackpot}</span>
                    
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 text-muted-foreground transition-transform",
                        openItems.includes(result.id) && "rotate-180"
                      )}
                    />
                  </div>
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="px-3 pb-3 border-t border-border">
                  <div className="pt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground">Winning:</span>
                      <div className="flex items-center gap-1">
                        {result.numbers.map((num, i) => (
                          <span
                            key={i}
                            className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-[11px] font-semibold"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[11px]">
                      <span className="text-muted-foreground">
                        Jackpot: <span className="font-semibold text-stake-green">{result.jackpot}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Winners: <span className="font-semibold text-foreground">{result.winners}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </section>
  );
};
