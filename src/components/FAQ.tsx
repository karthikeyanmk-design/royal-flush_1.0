"use client";
import { ChevronDown, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "who",
    question: "Who is Royal Flush?",
    answer:
      "Leading the online gambling industry since 2017, Royal Flush offers a wide variety of online casino and sports betting options, operating globally in 15 different languages. With a reputable and secure platform, Royal Flush Casino is home to worldwide local currencies and crypto betting options for online slot games, Royal Flush Originals and live casino games. Royal Flush Sportsbook offers unbeatable odds on all major sporting events including a range of Esport leagues. We host regular bet bonuses and promotions and offer an exclusive VIP Club experience - all with a simple-to-use deposit process on our licensed platform.",
  },
  {
    id: "licensed",
    question: "Is Royal Flush Licensed?",
    answer: "Yes, Royal Flush operates under a gaming license and follows strict regulatory requirements to ensure fair and secure gaming experiences for all users.",
  },
  {
    id: "safe",
    question: "Is Betting on Royal Flush Safe?",
    answer: "Royal Flush uses industry-leading security measures including SSL encryption, 2FA authentication, and cold storage for cryptocurrency to protect user funds and data.",
  },
  {
    id: "currencies",
    question: "What Currencies Can I Bet With?",
    answer: "Royal Flush supports a wide range of cryptocurrencies including Bitcoin, Ethereum, Litecoin, Dogecoin, and many more, as well as various fiat currencies.",
  },
  {
    id: "games",
    question: "What Types of Casino Games Can I Play?",
    answer: "Royal Flush offers thousands of casino games including slots, table games, live dealer games, and exclusive Royal Flush Originals like Crash, Dice, and Plinko.",
  },
  {
    id: "sports",
    question: "What Sports Can I Bet On?",
    answer: "Royal Flush Sportsbook covers all major sports including football, basketball, tennis, MMA, esports, and many more with competitive odds.",
  },
  {
    id: "streams",
    question: "How Do I Watch Live Streams?",
    answer: "Live streams are available for many sporting events directly on the Royal Flush platform. Simply navigate to the event and look for the streaming icon.",
  },
];

export const FAQ = () => {
  return (
    <section className="px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-stake-teal" />
        <h3 className="text-lg font-semibold">Still Have Questions?</h3>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="bg-card rounded-lg border-none overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline hover:bg-secondary/50 [&[data-state=open]>svg]:rotate-180">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
