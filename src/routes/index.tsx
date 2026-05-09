import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShieldCheck, TrendingUp, Users } from "lucide-react";
import brandLogo from "@/assets/logo.jpeg";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { BRAND_DESCRIPTION, BRAND_NAME } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: BRAND_NAME },
      { name: "description", content: BRAND_DESCRIPTION },
      { property: "og:title", content: BRAND_NAME },
      { property: "og:description", content: BRAND_DESCRIPTION },
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-12">
          <Link to="/" className="min-w-0">
            <BrandLockup titleClassName="text-lg font-bold" subtitleClassName="tracking-[0.22em]" />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:inline-flex">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="gradient-primary text-primary-foreground glow">Get Started</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
        {open ? (
          <div className="flex flex-col gap-1 border-t border-border/40 px-6 py-3 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/40 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/40 sm:hidden"
            >
              Login
            </Link>
          </div>
        ) : null}
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
              <span className="size-2 rounded-full bg-gold animate-pulse" />
              Fixed plans, team income, and transparent rewards
            </div>
            <h1 className="text-4xl font-bold leading-[1.02] tracking-tight lg:text-7xl">
              Build your team and grow with <span className="text-gradient">{BRAND_NAME}</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground lg:max-w-xl">
              Start from Rs 500 to Rs 10,000, earn 30% / 15% / 5% across 3 levels, collect points,
              unlock rank rewards up to Rs 18,000, and withdraw with simple platform rules.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="gradient-primary h-12 px-8 text-base text-primary-foreground glow"
                >
                  Join The System
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-border/60 bg-white/40 px-8 text-base"
                >
                  Explore Dashboard
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: TrendingUp,
                  title: "5 Fixed Plans",
                  subtitle: "Rs 500, 1500, 3000, 6000, and 10000",
                },
                {
                  icon: Users,
                  title: "50% Team Income",
                  subtitle: "30% + 15% + 5% across three levels",
                },
                {
                  icon: ShieldCheck,
                  title: "Rank Rewards",
                  subtitle: "Milestones from 1,000 to 100,000 points",
                },
              ].map((feature) => (
                <div key={feature.subtitle} className="glass rounded-2xl p-5 text-left">
                  <feature.icon className="mb-3 size-6 text-gold" />
                  <div className="text-xl font-bold text-gradient">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-x-12 top-8 h-44 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-6 right-8 h-32 w-32 rounded-full bg-gold/20 blur-3xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-5 lg:p-7">
              <div className="rounded-[1.75rem] bg-white/80 p-4 shadow-[0_28px_60px_-40px_var(--color-primary)]">
                <img
                  src={brandLogo}
                  alt={`${BRAND_NAME} logo`}
                  className="w-full rounded-[1.4rem] object-cover"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] bg-background/80 px-5 py-4">
                <BrandLockup
                  imageClassName="size-12 rounded-[1.4rem]"
                  titleClassName="text-lg font-bold"
                  subtitleClassName="tracking-[0.2em]"
                />
                <div className="text-right">
                  <div className="text-sm font-semibold text-gradient-gold">
                    Women-focused growth model
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Plans, points, rewards, and referrals in one system
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            { icon: TrendingUp, title: "Rs 18,000", subtitle: "Top reward milestone" },
            { icon: Users, title: "3 Levels", subtitle: "Referral commission system" },
            { icon: ShieldCheck, title: "24-48 Hours", subtitle: "Withdrawal processing time" },
          ].map((feature) => (
            <div key={feature.subtitle} className="glass rounded-2xl p-6 text-left">
              <feature.icon className="mb-3 size-6 text-gold" />
              <div className="text-2xl font-bold text-gradient">{feature.title}</div>
              <div className="text-sm text-muted-foreground">{feature.subtitle}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
