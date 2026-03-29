"use client";
import { useState } from "react";
import { Shuffle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ticketOptions = [
  { id: 1, price: 50, label: "₹50" },
  { id: 2, price: 100, label: "₹100" },
  { id: 3, price: 200, label: "₹200" },
  { id: 4, price: 500, label: "₹500" },
];

export const TicketSelection = () => {
  const [selectedTicket, setSelectedTicket] = useState<number>(2);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const quickPick = () => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    setSelectedNumbers(numbers.sort((a, b) => a - b));
  };

  const totalPrice = ticketOptions.find((t) => t.id === selectedTicket)!.price * quantity;

  return (
    <section className="px-3 md:px-4 py-3">
      <div className="bg-card border border-border rounded-lg p-4 md:p-5">
        <h3 className="text-sm font-semibold mb-4">Buy Lottery Ticket</h3>

        {/* Ticket Price Options */}
        <div className="mb-5">
          <label className="text-xs text-muted-foreground mb-2 block">Ticket Value</label>
          <div className="grid grid-cols-4 gap-2">
            {ticketOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedTicket(option.id)}
                className={cn(
                  "py-2 rounded-md border text-sm font-medium transition-colors",
                  selectedTicket === option.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary hover:border-muted-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Number Selection Grid */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-muted-foreground">
              Pick 6 Numbers
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedNumbers([])}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={quickPick}
                className="h-6 text-xs px-2"
              >
                <Shuffle className="w-3 h-3 mr-1" />
                Quick Pick
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 md:grid-cols-10 gap-1">
            {Array.from({ length: 49 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                disabled={selectedNumbers.length >= 6 && !selectedNumbers.includes(num)}
                className={cn(
                  "aspect-square rounded text-xs font-medium transition-colors",
                  selectedNumbers.includes(num)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Selected Numbers */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Selected:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-7 h-7 rounded flex items-center justify-center text-xs font-medium",
                    selectedNumbers[i]
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary border border-dashed border-border text-muted-foreground"
                  )}
                >
                  {selectedNumbers[i] || "-"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-5">
          <label className="text-xs text-muted-foreground mb-2 block">Quantity</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded bg-secondary hover:bg-muted flex items-center justify-center font-medium"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="w-8 h-8 rounded bg-secondary hover:bg-muted flex items-center justify-center font-medium"
            >
              +
            </button>
          </div>
        </div>

        {/* Purchase Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold">₹{totalPrice.toLocaleString()}</p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            disabled={selectedNumbers.length < 6}
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" />
            Buy Ticket
          </Button>
        </div>
      </div>
    </section>
  );
};
