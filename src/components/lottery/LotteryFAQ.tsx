"use client";
import { HelpCircle, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "how-to-play",
    question: "How do I play the lottery?",
    answer: "Select your preferred lottery type, choose 6 numbers from 1-49 (or use Quick Pick for random selection), and purchase your ticket. Wait for the draw and check if your numbers match the winning combination.",
  },
  {
    id: "draw-times",
    question: "When are the lottery draws?",
    answer: "Daily Lottery draws happen every day at 9 PM IST. Weekly Lottery draws are every Sunday at 8 PM IST. Mega Jackpot draws occur on the 1st of every month. Flash Lottery draws happen every hour.",
  },
  {
    id: "claim-winnings",
    question: "How do I claim my winnings?",
    answer: "Winnings are automatically credited to your account balance within minutes of the draw results being announced. You can withdraw your winnings using any of our supported payment methods.",
  },
  {
    id: "odds",
    question: "What are the odds of winning?",
    answer: "Odds vary by lottery type. Daily Lottery: 1 in 500,000 for jackpot. Weekly Lottery: 1 in 2,000,000. Mega Jackpot: 1 in 14,000,000. Smaller prizes have significantly better odds.",
  },
  {
    id: "taxes",
    question: "Are lottery winnings taxable?",
    answer: "All lottery winnings are tax-free on our platform. Winners receive the full advertised prize amount. However, please consult your local tax authority regarding any personal tax obligations.",
  },
];

export const LotteryFAQ = () => {
  return (
    <section className="px-3 md:px-4 py-4">
      {/* Responsible Play Disclaimer */}
      <div className="bg-card border border-border rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium mb-1">Play Responsibly</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Lottery is a form of entertainment. Please play within your means. Must be 18+ to play.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h3 className="text-base font-semibold">FAQ</h3>
      </div>

      <Accordion type="single" collapsible className="space-y-1.5">
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="bg-card rounded-lg border-none overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline hover:bg-secondary/30 [&[data-state=open]>svg]:rotate-180">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
