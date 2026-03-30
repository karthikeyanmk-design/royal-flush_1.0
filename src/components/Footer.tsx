"use client";
const footerSections = [
  {
    title: "Casino",
    links: ["Casino Games", "Slots", "Live Casino", "Roulette", "Blackjack", "Poker", "Publishers", "Promos & Competitions"],
  },
  {
    title: "Sports",
    links: ["Sportsbook", "Live Sports", "Soccer", "Basketball", "Tennis", "eSports", "Bet Bonuses", "Sports Rules"],
  },
  {
    title: "Support",
    links: ["Help Center ↗", "Fairness", "Responsible Gambling", "Gambling Helpline ↗", "Live Support", "Self Exclusion", "Law Enforcement Request"],
  },
  {
    title: "About Us",
    links: ["VIP Club", "Affiliate", "Privacy Policy", "AML Policy", "Terms of Service"],
  },
  {
    title: "Payment Info",
    links: ["Deposit & Withdrawals", "Currency Guide", "Crypto Guide", "Supported Crypto", "How to Use the Vault", "How Much to Bet With"],
  },
  {
    title: "FAQ",
    links: ["How to Guides", "Online Casino Guide", "Sports Betting Guide", "How to Live Stream Sports", "Royal Flush VIP Guide", "House Edge Guide"],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-stake-darker border-t border-border px-4 py-8 mt-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold text-sm mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="/assets/logo.svg" alt="Royal Flush" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-accent tracking-wide uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Royal Flush</span>
            <span className="text-xs text-muted-foreground">All Rights Reserved © 2026 Royal Flush - Website Designed by <a href="https://tech-tide.in" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Tech-tide.in</a></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-xs">🔞</div>
            <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-xs">🎰</div>
            <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-xs">🛡️</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
