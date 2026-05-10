import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShieldCheck, TrendingUp, Users, BookOpen } from "lucide-react";
import brandLogo from "@/assets/logo.jpeg";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { BRAND_DESCRIPTION, BRAND_NAME } from "@/lib/brand";
import { courses, totalCourses } from "@/lib/courses";

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
              Start from Rs. 1,000 to Rs. 10,000, earn 48% / 18% / 10% across 3 levels, collect points,
              unlock rank rewards up to Rs 35,000, and withdraw with simple platform rules.
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
                  title: "7 Fixed Plans",
                  subtitle: "Rs 1,000, 2,000, 4,000, 6,500, 9,500, 12,000, 15,000",
                },
                {
                  icon: Users,
                  title: "Team Income",
                  subtitle: "48% + 18% + 10% across three levels",
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

      {/* Courses Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="text-center mb-12">
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <BookOpen className="size-4 text-gold" />
            Learn, Earn & Empower Your Future
          </div>
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl mb-3">
            35+ <span className="text-gradient-gold">Premium Courses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Skills for Today, Success for Tomorrow - One Platform, Endless Opportunities
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(courses).map((category) => (
            <div key={category.icon} className="glass rounded-2xl p-6 border border-border/40">
              <div className="mb-5 space-y-2">
                <div className="text-3xl">{category.icon}</div>
                <h3 className="text-xl font-bold text-gradient">{category.name}</h3>
              </div>
              <ul className="space-y-2">
                {category.courses.map((course, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <span className="text-gold mt-1">✓</span>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass inline-block rounded-2xl p-8 border border-gold/30 bg-gold/5 max-w-md">
            <div className="text-4xl font-bold text-gradient-gold mb-2">{totalCourses}+</div>
            <div className="text-lg font-semibold text-foreground mb-4">Premium Courses Available</div>
            <p className="text-sm text-muted-foreground mb-6">
              Expert Instructors • Certificate of Completion • Learn at Your Pace • Practical Skills for Real Success
            </p>
            <Link to="/courses">
              <Button className="gradient-primary text-primary-foreground glow w-full">
                Explore All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            { icon: TrendingUp, title: "Up to 48%", subtitle: "Income visibility" },
            { icon: Users, title: "3 Levels", subtitle: "Referral support" },
            { icon: ShieldCheck, title: "Always Clear", subtitle: "Dashboard-first tracking" },
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
