import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, TrendingUp, Users, Menu } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex Invest — Multi-Level Investment & Reward Platform" },
      { name: "description", content: "Invest, earn, and grow with a transparent multi-level reward platform built for beginners and pros." },
      { property: "og:title", content: "Apex Invest — Premium Investment Platform" },
      { property: "og:description", content: "Track investments, earn through 3 levels, and unlock milestone rewards." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { label: "Plans", to: "/plans" as const },
    { label: "Earnings", to: "/earnings" as const },
    { label: "Rewards", to: "/rewards" as const },
    { label: "Referrals", to: "/referrals" as const },
  ];
  return (
    <div className="min-h-screen gradient-hero">
      <header className="sticky top-0 z-40 glass border-b border-border/40">
        <div className="px-6 lg:px-12 py-3 flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl gradient-primary grid place-items-center glow">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Apex Invest</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/40"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:inline-flex"><Button variant="ghost">Login</Button></Link>
            <Link to="/signup"><Button className="gradient-primary text-primary-foreground glow">Get Started</Button></Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border/40 px-6 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/40"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="sm:hidden px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent/40">Login</Link>
          </div>
        )}
      </header>
      <section className="px-6 lg:px-12 py-16 lg:py-28 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium mb-6">
          <span className="size-2 rounded-full bg-gold animate-pulse" />
          Trusted by 50,000+ investors
        </div>
        <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          Invest smart. Earn through <span className="text-gradient-gold">3 levels</span>.
          <br />Grow with <span className="text-gradient">Apex</span>.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          A premium multi-level investment & reward platform with transparent earnings,
          milestone bonuses, and a beautiful dashboard built for everyone.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/signup"><Button size="lg" className="gradient-primary text-primary-foreground glow h-12 px-8 text-base">Start Investing</Button></Link>
          <Link to="/dashboard"><Button size="lg" variant="outline" className="h-12 px-8 text-base border-border/60">View Dashboard</Button></Link>
        </div>
        <div className="mt-20 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: TrendingUp, t: "Up to 48%", s: "Direct income" },
            { icon: Users, t: "3 Levels", s: "Referral rewards" },
            { icon: ShieldCheck, t: "100% Secure", s: "Trusted platform" },
          ].map((f) => (
            <div key={f.s} className="glass rounded-2xl p-6 text-left">
              <f.icon className="size-6 text-gold mb-3" />
              <div className="text-2xl font-bold text-gradient">{f.t}</div>
              <div className="text-sm text-muted-foreground">{f.s}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
