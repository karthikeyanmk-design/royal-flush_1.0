"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CasinoBetsTable } from "@/components/casino/CasinoBetsTable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AppLink } from "@/lib/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Volume2,
  VolumeX,
  Star,
  Bookmark,
  Users,
  Sparkles,
  Heart,
  Share2,
  RotateCcw,
  Minus,
  Plus,
  Zap,
} from "lucide-react";

const game1 = "/assets/game-1.png";
const game2 = "/assets/game-2.png";
const game3 = "/assets/game-3.png";
const game4 = "/assets/game-4.png";
const game5 = "/assets/game-5.png";
const game6 = "/assets/game-6.png";
const game7 = "/assets/game-7.png";

// Game database
const allGames: Record<string, GameInfo> = {
  dice: { name: "Dice", slug: "dice", image: game1, publisher: "Royal Flush Original", players: 1250, category: "originals", description: "Roll the dice and predict the outcome. Set your target and win big!", minBet: 0.1, maxBet: 10000, rtp: 99 },
  mines: { name: "Mines", slug: "mines", image: game2, publisher: "Royal Flush Original", players: 980, category: "originals", description: "Navigate through a minefield. The more tiles you reveal, the higher your multiplier!", minBet: 0.1, maxBet: 10000, rtp: 99 },
  plinko: { name: "Plinko", slug: "plinko", image: game3, publisher: "Royal Flush Original", players: 756, category: "originals", description: "Drop the ball and watch it bounce through pegs. Land on high multipliers to win!", minBet: 0.1, maxBet: 10000, rtp: 99 },
  crash: { name: "Crash", slug: "crash", image: game4, publisher: "Royal Flush Original", players: 1420, category: "originals", description: "Place your bet and watch the multiplier rise. Cash out before it crashes!", minBet: 0.1, maxBet: 10000, rtp: 99 },
  limbo: { name: "Limbo", slug: "limbo", image: game5, publisher: "Royal Flush Original", players: 543, category: "originals", description: "Set a target multiplier and hope the result goes higher!", minBet: 0.1, maxBet: 10000, rtp: 99 },
  keno: { name: "Keno", slug: "keno", image: game6, publisher: "Royal Flush Original", players: 321, category: "originals", description: "Pick your numbers and match them to win. More matches means bigger prizes!", minBet: 0.1, maxBet: 10000, rtp: 99 },
  hilo: { name: "Hilo", slug: "hilo", image: game7, publisher: "Royal Flush Original", players: 412, category: "originals", description: "Predict whether the next card will be higher or lower!", minBet: 0.1, maxBet: 10000, rtp: 99 },
  "sweet-bonanza": { name: "Sweet Bonanza 1000", slug: "sweet-bonanza", image: game1, publisher: "Pragmatic Play", players: 585, category: "slots", description: "Tumbling reels with sweet symbols. Land 8+ matching symbols anywhere to win!", minBet: 0.2, maxBet: 500, rtp: 96.48 },
  "gates-of-olympus": { name: "Gates of Olympus", slug: "gates-of-olympus", image: game2, publisher: "Pragmatic Play", players: 538, category: "slots", description: "Zeus drops multipliers from the sky in this high-volatility slot!", minBet: 0.2, maxBet: 500, rtp: 96.5 },
  "sugar-rush": { name: "Sugar Rush 1000", slug: "sugar-rush", image: game3, publisher: "Pragmatic Play", players: 406, category: "slots", description: "Sweet candy-themed slot with cluster pays and multiplier positions!", minBet: 0.2, maxBet: 500, rtp: 96.53 },
  "wanted-dead": { name: "Wanted Dead or Wild", slug: "wanted-dead", image: game4, publisher: "Hacksaw Gaming", players: 250, category: "slots", description: "Wild West themed slot with dueling wilds and big win potential!", minBet: 0.2, maxBet: 500, rtp: 96.38 },
  "big-bass": { name: "Big Bass Bonanza", slug: "big-bass", image: game5, publisher: "Pragmatic Play", players: 383, category: "slots", description: "Go fishing for big wins in this popular slot with free spins!", minBet: 0.1, maxBet: 250, rtp: 96.71 },
  "crazy-time": { name: "Crazy Time", slug: "crazy-time", image: game1, publisher: "Evolution", players: 2340, category: "live", description: "The ultimate game show with 4 exciting bonus rounds!", minBet: 0.1, maxBet: 25000, rtp: 95.5 },
  "lightning-roulette": { name: "Lightning Roulette", slug: "lightning-roulette", image: game3, publisher: "Evolution", players: 1120, category: "live", description: "Classic roulette with random lightning multipliers up to 500x!", minBet: 0.2, maxBet: 10000, rtp: 97.3 },
  aviator: { name: "Aviator", slug: "aviator", image: game5, publisher: "Spribe", players: 2100, category: "burst", description: "Watch the plane fly and cash out before it disappears!", minBet: 0.1, maxBet: 10000, rtp: 97 },
  // Additional Slots
  "book-of-dead": { name: "Book of Dead", slug: "book-of-dead", image: game6, publisher: "Play'n GO", players: 264, category: "slots", description: "Journey to ancient Egypt with Rich Wilde in this legendary slot!", minBet: 0.1, maxBet: 500, rtp: 96.21 },
  "starlight-princess": { name: "Starlight Princess", slug: "starlight-princess", image: game7, publisher: "Pragmatic Play", players: 296, category: "slots", description: "Magical princess-themed slot with cascading wins and multipliers!", minBet: 0.2, maxBet: 500, rtp: 96.5 },
  // Live Casino
  "blackjack-vip": { name: "Blackjack VIP", slug: "blackjack-vip", image: game2, publisher: "Evolution", players: 890, category: "live", description: "Premium blackjack experience with high stakes and VIP dealers!", minBet: 5, maxBet: 25000, rtp: 99.5 },
  "baccarat": { name: "Baccarat", slug: "baccarat", image: game4, publisher: "Evolution", players: 654, category: "live", description: "Classic baccarat with professional dealers and elegant gameplay!", minBet: 1, maxBet: 10000, rtp: 98.94 },
  "dragon-tiger": { name: "Dragon Tiger", slug: "dragon-tiger", image: game5, publisher: "Evolution", players: 432, category: "live", description: "Fast-paced card game — Dragon or Tiger, who wins?", minBet: 0.5, maxBet: 5000, rtp: 96.27 },
  "mega-ball": { name: "Mega Ball", slug: "mega-ball", image: game6, publisher: "Evolution", players: 567, category: "live", description: "Bingo-style game show with massive multipliers!", minBet: 0.1, maxBet: 10000, rtp: 95.4 },
  "speed-baccarat": { name: "Speed Baccarat", slug: "speed-baccarat", image: game7, publisher: "Evolution", players: 345, category: "live", description: "Lightning-fast baccarat rounds for the impatient player!", minBet: 1, maxBet: 10000, rtp: 98.94 },
  "speed-blackjack": { name: "Speed Blackjack", slug: "speed-blackjack", image: game3, publisher: "Evolution", players: 654, category: "live", description: "Fastest blackjack online — decisions in seconds!", minBet: 1, maxBet: 10000, rtp: 99.5 },
  "infinite-blackjack": { name: "Infinite Blackjack", slug: "infinite-blackjack", image: game5, publisher: "Evolution", players: 432, category: "live", description: "Unlimited seats at the blackjack table!", minBet: 1, maxBet: 5000, rtp: 99.47 },
  "free-bet-blackjack": { name: "Free Bet Blackjack", slug: "free-bet-blackjack", image: game1, publisher: "Evolution", players: 321, category: "live", description: "Get free double down and split bets!", minBet: 1, maxBet: 5000, rtp: 98.45 },
  "power-blackjack": { name: "Power Blackjack", slug: "power-blackjack", image: game7, publisher: "Evolution", players: 256, category: "live", description: "Triple and quadruple down for massive payouts!", minBet: 1, maxBet: 5000, rtp: 98.8 },
  "classic-blackjack": { name: "Classic Blackjack", slug: "classic-blackjack", image: game4, publisher: "Pragmatic Play", players: 198, category: "live", description: "Traditional blackjack with a modern twist!", minBet: 1, maxBet: 5000, rtp: 99.5 },
  "blackjack-party": { name: "Blackjack Party", slug: "blackjack-party", image: game6, publisher: "Evolution", players: 543, category: "live", description: "Fun party atmosphere with two entertaining hosts!", minBet: 0.5, maxBet: 1000, rtp: 99.29 },
  "immersive-roulette": { name: "Immersive Roulette", slug: "immersive-roulette", image: game1, publisher: "Evolution", players: 876, category: "live", description: "Multi-camera slow-motion roulette experience!", minBet: 0.5, maxBet: 10000, rtp: 97.3 },
  "auto-roulette": { name: "Auto Roulette", slug: "auto-roulette", image: game5, publisher: "Evolution", players: 543, category: "live", description: "Automated roulette — fast rounds, no dealer needed!", minBet: 0.1, maxBet: 10000, rtp: 97.3 },
  "speed-roulette": { name: "Speed Roulette", slug: "speed-roulette", image: game2, publisher: "Evolution", players: 432, category: "live", description: "New round every 25 seconds — non-stop action!", minBet: 0.2, maxBet: 10000, rtp: 97.3 },
  "double-ball-roulette": { name: "Double Ball Roulette", slug: "double-ball-roulette", image: game6, publisher: "Evolution", players: 321, category: "live", description: "Two balls, double the excitement and winning chances!", minBet: 0.2, maxBet: 5000, rtp: 97.3 },
  "mega-roulette": { name: "Mega Roulette", slug: "mega-roulette", image: game4, publisher: "Pragmatic Play", players: 567, category: "live", description: "Up to 500x multipliers on random numbers each round!", minBet: 0.1, maxBet: 5000, rtp: 97.3 },
  "turkish-roulette": { name: "Turkish Roulette", slug: "turkish-roulette", image: game7, publisher: "Evolution", players: 234, category: "live", description: "Roulette with Turkish-speaking dealer!", minBet: 0.2, maxBet: 5000, rtp: 97.3 },
  "lightning-baccarat": { name: "Lightning Baccarat", slug: "lightning-baccarat", image: game1, publisher: "Evolution", players: 567, category: "live", description: "Random lightning multipliers up to 512x!", minBet: 1, maxBet: 10000, rtp: 98.76 },
  "no-commission-baccarat": { name: "No Commission Baccarat", slug: "no-commission-baccarat", image: game3, publisher: "Evolution", players: 234, category: "live", description: "Classic baccarat without the banker commission!", minBet: 1, maxBet: 10000, rtp: 98.94 },
  "baccarat-squeeze": { name: "Baccarat Squeeze", slug: "baccarat-squeeze", image: game5, publisher: "Evolution", players: 432, category: "live", description: "Dramatic card reveal with the classic squeeze!", minBet: 1, maxBet: 10000, rtp: 98.94 },
  "super-6-baccarat": { name: "Super 6 Baccarat", slug: "super-6-baccarat", image: game6, publisher: "Pragmatic Play", players: 198, category: "live", description: "Baccarat variant with the exciting Super 6 side bet!", minBet: 1, maxBet: 5000, rtp: 98.94 },
  // Game Shows
  "monopoly-live": { name: "Monopoly Live", slug: "monopoly-live", image: game2, publisher: "Evolution", players: 1890, category: "live", description: "Spin the wheel and enter the Monopoly bonus world!", minBet: 0.1, maxBet: 10000, rtp: 96.23 },
  "dream-catcher": { name: "Dream Catcher", slug: "dream-catcher", image: game3, publisher: "Evolution", players: 987, category: "live", description: "Spin the big money wheel for instant wins!", minBet: 0.1, maxBet: 10000, rtp: 96.58 },
  "deal-or-no-deal": { name: "Deal or No Deal", slug: "deal-or-no-deal", image: game4, publisher: "Evolution", players: 765, category: "live", description: "The classic TV game show — deal or no deal?", minBet: 0.1, maxBet: 10000, rtp: 95.42 },
  "football-studio": { name: "Football Studio", slug: "football-studio", image: game5, publisher: "Evolution", players: 543, category: "live", description: "Simple card game with a football twist!", minBet: 0.5, maxBet: 5000, rtp: 96.27 },
  "lightning-dice": { name: "Lightning Dice", slug: "lightning-dice", image: game6, publisher: "Evolution", players: 654, category: "live", description: "Three dice with random lightning multipliers!", minBet: 0.2, maxBet: 5000, rtp: 96.21 },
  "funky-time": { name: "Funky Time", slug: "funky-time", image: game7, publisher: "Evolution", players: 876, category: "live", description: "Groovy game show with disco-themed bonus rounds!", minBet: 0.1, maxBet: 10000, rtp: 95.49 },
  // Exclusive
  "le-rapper": { name: "Le Rapper", slug: "le-rapper", image: game3, publisher: "Exclusive", players: 234, category: "exclusive", description: "Hip-hop themed slot with sick beats and big wins!", minBet: 0.1, maxBet: 500, rtp: 96 },
  "catastrophe": { name: "Catastrophe", slug: "catastrophe", image: game4, publisher: "Exclusive", players: 456, category: "exclusive", description: "Chaotic fun with explosive multipliers!", minBet: 0.1, maxBet: 500, rtp: 96 },
  "bank-basher": { name: "Bank Basher", slug: "bank-basher", image: game5, publisher: "Exclusive", players: 321, category: "exclusive", description: "Smash open vaults for hidden treasures!", minBet: 0.1, maxBet: 500, rtp: 96 },
  "royal-flush-royale": { name: "Royal Flush Royale", slug: "royal-flush-royale", image: game6, publisher: "Exclusive", players: 567, category: "exclusive", description: "Our signature game with royal payouts!", minBet: 0.1, maxBet: 1000, rtp: 97 },
  "lucky-gems": { name: "Lucky Gems", slug: "lucky-gems", image: game1, publisher: "Exclusive", players: 432, category: "exclusive", description: "Match sparkling gems for dazzling wins!", minBet: 0.1, maxBet: 500, rtp: 96 },
  "gold-rush": { name: "Gold Rush", slug: "gold-rush", image: game2, publisher: "Exclusive", players: 654, category: "exclusive", description: "Strike gold in this Wild West adventure!", minBet: 0.1, maxBet: 500, rtp: 96 },
  "diamond-strike": { name: "Diamond Strike", slug: "diamond-strike", image: game7, publisher: "Exclusive", players: 345, category: "exclusive", description: "Find diamonds in the rough for sparkling payouts!", minBet: 0.1, maxBet: 500, rtp: 96 },
  // Burst
  "aviamasters": { name: "Aviamasters", slug: "aviamasters", image: game6, publisher: "Royal Flush Original", players: 890, category: "burst", description: "Master the skies and cash out at the right moment!", minBet: 0.1, maxBet: 10000, rtp: 97 },
  "angry-balls": { name: "Angry Balls", slug: "angry-balls", image: game7, publisher: "Royal Flush Original", players: 567, category: "burst", description: "Bouncing balls with explosive multipliers!", minBet: 0.1, maxBet: 10000, rtp: 97 },
  "spaceman": { name: "Spaceman", slug: "spaceman", image: game1, publisher: "Pragmatic Play", players: 765, category: "burst", description: "Launch into space and cash out before the astronaut floats away!", minBet: 0.1, maxBet: 10000, rtp: 96.5 },
  "jetx": { name: "JetX", slug: "jetx", image: game2, publisher: "SmartSoft", players: 543, category: "burst", description: "Bet on the jet and cash out before it explodes!", minBet: 0.1, maxBet: 5000, rtp: 97 },
  "rocket-x": { name: "Rocket X", slug: "rocket-x", image: game3, publisher: "1x2 Gaming", players: 432, category: "burst", description: "Ride the rocket to massive multipliers!", minBet: 0.1, maxBet: 5000, rtp: 97 },
  "cappadocia": { name: "Cappadocia", slug: "cappadocia", image: game4, publisher: "SmartSoft", players: 321, category: "burst", description: "Float in a hot air balloon over Cappadocia!", minBet: 0.1, maxBet: 5000, rtp: 97 },
  // New Releases
  "zeus-lightning": { name: "Zeus Lightning", slug: "zeus-lightning", image: game7, publisher: "Red Tiger", players: 123, category: "slots", description: "Zeus strikes with lightning bolts and massive wins!", minBet: 0.1, maxBet: 500, rtp: 95.79 },
  "wild-don": { name: "Wild Don", slug: "wild-don", image: game1, publisher: "Pragmatic Play", players: 87, category: "slots", description: "Join the Wild Don in his quest for riches!", minBet: 0.1, maxBet: 500, rtp: 96.5 },
  "wicked-brew": { name: "Wicked Brew", slug: "wicked-brew", image: game2, publisher: "Hacksaw Gaming", players: 65, category: "slots", description: "Brew up a wicked potion of wins!", minBet: 0.2, maxBet: 500, rtp: 96.2 },
  "fortune-tiger": { name: "Fortune Tiger", slug: "fortune-tiger", image: game3, publisher: "PG Soft", players: 234, category: "slots", description: "The fortune tiger brings luck and prosperity!", minBet: 0.1, maxBet: 500, rtp: 96.81 },
  "mystic-fortune": { name: "Mystic Fortune", slug: "mystic-fortune", image: game4, publisher: "Habanero", players: 156, category: "slots", description: "Unlock mystic powers for fortunate spins!", minBet: 0.1, maxBet: 500, rtp: 96 },
  "dragons-gold": { name: "Dragon's Gold", slug: "dragons-gold", image: game5, publisher: "Red Tiger", players: 98, category: "slots", description: "Guard the dragon's hoard and claim your share!", minBet: 0.1, maxBet: 500, rtp: 95.72 },
  "pharaohs-riches": { name: "Pharaoh's Riches", slug: "pharaohs-riches", image: game6, publisher: "Novomatic", players: 187, category: "slots", description: "Explore the pharaoh's tomb for ancient riches!", minBet: 0.1, maxBet: 500, rtp: 95.97 },
};

interface GameInfo {
  name: string;
  slug: string;
  image: string;
  publisher: string;
  players: number;
  category: string;
  description: string;
  minBet: number;
  maxBet: number;
  rtp: number;
}

const recommendedGames = [
  { slug: "dice", name: "Dice", image: game1, players: 1250 },
  { slug: "mines", name: "Mines", image: game2, players: 980 },
  { slug: "plinko", name: "Plinko", image: game3, players: 756 },
  { slug: "crash", name: "Crash", image: game4, players: 1420 },
  { slug: "limbo", name: "Limbo", image: game5, players: 543 },
  { slug: "keno", name: "Keno", image: game6, players: 321 },
  { slug: "hilo", name: "Hilo", image: game7, players: 412 },
  { slug: "sweet-bonanza", name: "Sweet Bonanza", image: game1, players: 585 },
];

const publishers = [
  { name: "Pragmatic Play", players: 7456, color: "from-gray-700 to-gray-800" },
  { name: "Royal Flush", players: 13856, color: "from-[#B20710] to-[#E50914]" },
  { name: "Hacksaw", players: 2419, color: "from-red-800 to-red-900" },
  { name: "Evolution", players: 2514, color: "from-orange-700 to-orange-800" },
  { name: "Nolimit City", players: 881, color: "from-purple-800 to-purple-900" },
  { name: "Spribe", players: 206, color: "from-blue-800 to-blue-900" },
  { name: "Twist", players: 246, color: "from-teal-700 to-teal-800" },
  { name: "Titan", players: 422, color: "from-amber-800 to-amber-900" },
];

const CasinoGame = ({ slug }: { slug?: string }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mode, setMode] = useState<"fun" | "real">("fun");
  const [betAmount, setBetAmount] = useState("10.00");
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastResult, setLastResult] = useState<{ won: boolean; multiplier: number; payout: number } | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const { user, updateLocalBalance } = useAuth();
  const { toast } = useToast();

  const game = allGames[slug || ""] || allGames["dice"];

  // Simulated game play
  const playGame = () => {
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Enter a valid bet amount", variant: "destructive" });
      return;
    }
    if (mode === "real") {
      if (!user) {
        toast({ title: "Please login to play with real balance", variant: "destructive" });
        return;
      }
      if (amount > (user.balance || 0)) {
        toast({ title: "Insufficient balance", variant: "destructive" });
        return;
      }
    }

    setIsPlaying(true);

    setTimeout(() => {
      // Random outcome
      const rand = Math.random();
      let multiplier: number;
      let won: boolean;

      if (rand < 0.45) {
        // Win (45% chance)
        multiplier = parseFloat((1 + Math.random() * 4).toFixed(2));
        won = true;
      } else if (rand < 0.75) {
        // Small loss
        multiplier = 0;
        won = false;
      } else {
        // Big win (25%)
        multiplier = parseFloat((2 + Math.random() * 8).toFixed(2));
        won = true;
      }

      const payout = won ? parseFloat((amount * multiplier).toFixed(2)) : 0;

      if (mode === "real") {
        if (won) {
          updateLocalBalance(payout - amount);
        } else {
          updateLocalBalance(-amount);
        }
      }

      setLastResult({ won, multiplier, payout });
      setIsPlaying(false);

      if (won) {
        toast({
          title: `You Won! ${multiplier}x`,
          description: `Payout: $${payout.toFixed(2)}`,
        });
      } else {
        toast({
          title: "No luck this time",
          description: `Lost $${amount.toFixed(2)}`,
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const adjustBet = (factor: number) => {
    const current = parseFloat(betAmount) || 0;
    const newAmount = Math.max(game.minBet, Math.min(game.maxBet, current * factor));
    setBetAmount(newAmount.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      <div className={cn("transition-all duration-300", "ml-0", sidebarOpen ? "md:ml-56" : "md:ml-14")}>
        <Header />

        <main className="max-w-6xl mx-auto px-4 md:px-0 pb-20 md:pb-0">
          {/* Game Display Area */}
          <div className={cn("relative rounded-xl overflow-hidden bg-black mt-4", isFullscreen ? "fixed inset-0 z-50 rounded-none mt-0" : "aspect-[16/9] max-h-[560px]")}>
            {/* Game Visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={game.image} alt={game.name} className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />

              {/* Game Play UI Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                {isPlaying ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    <span className="text-lg font-bold text-white animate-pulse">Playing...</span>
                  </div>
                ) : lastResult ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "text-6xl md:text-8xl font-black",
                      lastResult.won ? "text-accent" : "text-red-500"
                    )}>
                      {lastResult.won ? `${lastResult.multiplier}x` : "0.00x"}
                    </div>
                    <div className={cn(
                      "text-xl md:text-2xl font-bold",
                      lastResult.won ? "text-green-400" : "text-red-400"
                    )}>
                      {lastResult.won ? `+$${lastResult.payout.toFixed(2)}` : `-$${parseFloat(betAmount).toFixed(2)}`}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <Zap className="w-16 h-16 text-accent" />
                    <h2 className="text-2xl md:text-4xl font-black text-white">{game.name}</h2>
                    <p className="text-sm text-white/60 max-w-md text-center">{game.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Controls */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <AppLink href="/casino" className="flex items-center gap-1 px-3 py-1.5 bg-black/60 hover:bg-black/80 rounded-lg text-sm text-white/80 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Casino
              </AppLink>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsFavorited(!isFavorited)} className={cn("p-2 rounded-lg transition-colors", isFavorited ? "bg-accent/20 text-accent" : "bg-black/60 text-white/60 hover:text-white")}>
                  <Heart className={cn("w-4 h-4", isFavorited && "fill-accent")} />
                </button>
                <button className="p-2 bg-black/60 hover:bg-black/80 rounded-lg text-white/60 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button onClick={() => setMuted(!muted)} className="p-2 bg-black/60 hover:bg-black/80 rounded-lg text-white/60 hover:text-white transition-colors">
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 bg-black/60 hover:bg-black/80 rounded-lg text-white/60 hover:text-white transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Betting Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-4 px-4">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {/* Bet Amount */}
                <div className="flex items-center gap-1 bg-white/10 rounded-lg overflow-hidden">
                  <button onClick={() => adjustBet(0.5)} className="p-2.5 hover:bg-white/10 transition-colors text-white/60">
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1 px-2">
                    <span className="text-white/60 text-sm">$</span>
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      className="w-24 bg-transparent text-white text-center font-semibold text-sm focus:outline-none"
                    />
                  </div>
                  <button onClick={() => adjustBet(2)} className="p-2.5 hover:bg-white/10 transition-colors text-white/60">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick amounts */}
                <div className="hidden md:flex items-center gap-1">
                  {[1, 5, 10, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setBetAmount(amt.toFixed(2))}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-white/80 font-medium transition-colors"
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                {/* Play Button */}
                <Button
                  onClick={playGame}
                  disabled={isPlaying}
                  className={cn(
                    "px-8 py-2.5 text-sm font-bold rounded-lg transition-all",
                    mode === "real"
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  )}
                >
                  {isPlaying ? (
                    <RotateCcw className="w-4 h-4 animate-spin" />
                  ) : (
                    mode === "real" ? "Bet" : "Play"
                  )}
                </Button>

                {/* Mode Toggle */}
                <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setMode("fun")}
                    className={cn(
                      "px-4 py-2.5 text-xs font-semibold transition-colors",
                      mode === "fun" ? "bg-green-600 text-white" : "text-white/60 hover:text-white"
                    )}
                  >
                    Fun Play
                  </button>
                  <button
                    onClick={() => setMode("real")}
                    className={cn(
                      "px-4 py-2.5 text-xs font-semibold transition-colors",
                      mode === "real" ? "bg-accent text-accent-foreground" : "text-white/60 hover:text-white"
                    )}
                  >
                    Real Play
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Game Info Bar */}
          <div className="flex items-center justify-between py-3 px-4 bg-card rounded-lg mt-2 border border-border">
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-accent transition-colors" />
              <div>
                <span className="text-sm font-semibold">{game.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{game.publisher}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-accent" />
                <span className="text-accent font-semibold">{game.players.toLocaleString()}</span>
                playing
              </span>
              <span className="hidden md:inline">RTP: {game.rtp}%</span>
              <span className="hidden md:inline">Min: ${game.minBet}</span>
              <span className="hidden md:inline">Max: ${game.maxBet.toLocaleString()}</span>
            </div>
          </div>

          {/* Recommended Games */}
          <section className="mt-6 px-3 md:px-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="text-sm md:text-base font-semibold">Recommended Games</h3>
              </div>
              <AppLink href="/casino" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                View All
              </AppLink>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {recommendedGames.map((g) => (
                <AppLink
                  key={g.slug}
                  href={`/casino/game/${g.slug}`}
                  className="flex-shrink-0 w-[110px] md:w-[130px] group"
                >
                  <div className="relative rounded-lg overflow-hidden mb-1">
                    <img
                      src={g.image}
                      alt={g.name}
                      className="w-full h-[147px] md:h-[174px] object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-accent px-3 py-1 rounded transition-opacity">Play</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-stake-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-stake-green rounded-full animate-pulse" />
                    {g.players} playing
                  </p>
                </AppLink>
              ))}
            </div>
            <div className="text-center mt-2">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Load More</button>
            </div>
          </section>

          {/* Publishers */}
          <section className="mt-6 px-3 md:px-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                <h3 className="text-sm md:text-base font-semibold">Publishers</h3>
              </div>
              <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">View All</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {publishers.map((pub) => (
                <div
                  key={pub.name}
                  className={cn(
                    "flex-shrink-0 w-[140px] md:w-[160px] rounded-lg bg-gradient-to-br p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity",
                    pub.color
                  )}
                >
                  <span className="text-sm font-bold text-white text-center">{pub.name}</span>
                  <span className="text-[10px] text-white/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
                    {pub.players.toLocaleString()} playing
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Load More</button>
            </div>
          </section>

          {/* Bets Table */}
          <CasinoBetsTable />
        </main>
        <Footer />
      </div>

    </div>
  );
};

export default CasinoGame;
