import GameClient from "./client";

export function generateStaticParams() {
  return [
    // Originals
    "dice", "mines", "plinko", "crash", "limbo", "keno", "hilo",
    // Slots
    "sweet-bonanza", "gates-of-olympus", "sugar-rush", "wanted-dead",
    "big-bass", "book-of-dead", "starlight-princess",
    // Live Casino
    "blackjack-vip", "lightning-roulette", "baccarat", "dragon-tiger",
    "mega-ball", "crazy-time", "speed-baccarat",
    "speed-blackjack", "infinite-blackjack", "free-bet-blackjack",
    "power-blackjack", "classic-blackjack", "blackjack-party",
    "immersive-roulette", "auto-roulette", "speed-roulette",
    "double-ball-roulette", "mega-roulette", "turkish-roulette",
    "lightning-baccarat", "no-commission-baccarat", "baccarat-squeeze",
    "super-6-baccarat",
    // Game Shows
    "monopoly-live", "dream-catcher", "deal-or-no-deal",
    "football-studio", "lightning-dice", "funky-time",
    // Exclusive
    "le-rapper", "catastrophe", "bank-basher", "royal-flush-royale",
    "lucky-gems", "gold-rush", "diamond-strike",
    // Burst
    "aviator", "aviamasters", "angry-balls", "spaceman",
    "jetx", "rocket-x", "cappadocia",
    // New Releases
    "zeus-lightning", "wild-don", "wicked-brew", "fortune-tiger",
    "mystic-fortune", "dragons-gold", "pharaohs-riches",
  ].map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GameClient slug={slug} />;
}
