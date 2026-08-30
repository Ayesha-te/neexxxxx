import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  ShieldCheck,
  TrendingUp,
  Users,
  BookOpen,
  HelpCircle,
  Building2,
  GraduationCap,
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Target,
  Layers,
  Award,
} from "lucide-react";
import brandLogo from "@/assets/logo.jpeg";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND_DESCRIPTION, BRAND_NAME } from "@/lib/brand";
import { courses, totalCourses } from "@/lib/courses";
import { apiRequest } from "@/lib/api";
import { getAdminWhatsAppLink } from "@/lib/whatsapp";

type SiteInfoResponse = {
  platformName: string;
  supportEmail: string;
  contactDetails: {
    phone1: string;
    phone2: string;
    email: string;
    location: string;
  };
  adminWhatsApp?: string;
};

const departments = [
  {
    icon: Building2,
    name: "Business Development",
    items: [
      "Business Development",
      "Business Growth",
      "Member/Customer Communication",
      "Opportunity Development",
      "Business Support",
      "Team/Business Expansion",
    ],
  },
  {
    icon: GraduationCap,
    name: "Leadership & Training",
    items: [
      "Leadership Development",
      "Beginner Training",
      "Trainer Sessions",
      "Member Guidance",
      "Team Development",
      "Skills Development",
      "Personal Growth",
    ],
  },
  {
    icon: ShoppingBag,
    name: "E-Commerce",
    items: [
      "E-Commerce Activities",
      "Online Selling",
      "Product/Service Management",
      "Customer Handling",
      "E-Commerce Development",
      "Online Business Growth",
    ],
  },
];

function whatsappHref(number: string) {
  return getAdminWhatsAppLink(number);
}

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
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [siteInfo, setSiteInfo] = useState<SiteInfoResponse | null>(null);

  useEffect(() => {
    void apiRequest<SiteInfoResponse>("/public/site-info").then(setSiteInfo).catch(() => null);
  }, []);

  const navLinks = [
    { label: "Plans", to: "/plans" as const },
    { label: "Courses", to: "/courses" as const },
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
            <Link to="/login">
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
              Start from Rs. 800 to Rs. 10,000, earn 48% / 18% / 10% across 3 steps, collect Rise Coins,
              unlock rank rewards up to Rs 35,000, and withdraw from Rs 1,000 with simple platform rules.
            </p>
            <p className="mt-2 max-w-2xl text-base font-semibold text-gold lg:max-w-xl">
              Earn Rs 50 on signup.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link to="/login">
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
              <Button
                type="button"
                size="lg"
                variant="ghost"
                className="h-12 px-8 text-base"
                onClick={() => setHowItWorksOpen(true)}
              >
                <HelpCircle className="mr-1 size-4" />
                How It Works
              </Button>
              <Link to="/login">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Login
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: TrendingUp,
                  title: "10 Fixed Plans",
                  subtitle: "Rs 800 to Rs 10,000",
                },
                {
                  icon: Users,
                  title: "Team Income",
                  subtitle: "48% + 18% + 10% across three levels",
                },
                {
                  icon: ShieldCheck,
                  title: "Rank Rewards",
                  subtitle: "Ten ranks from a 30-coin starter to Rs 35,000",
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
                    Plans, Rise Coins, rewards, and referrals in one system
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            { icon: TrendingUp, title: "Rs 35,000", subtitle: "Top reward milestone" },
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

      {/* About Us Section */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="text-center mb-12">
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <Target className="size-4 text-gold" />
            About Us
          </div>
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl mb-3">
            What is <span className="text-gradient-gold">{BRAND_NAME}</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {BRAND_NAME} is a member-driven earning and skill-development platform that combines
            structured investment plans, professional training, and a transparent referral system in
            one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass border-border/40">
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-gradient">Our Purpose</h3>
              <p className="text-sm text-muted-foreground">
                We exist to give members a clear path to build income opportunities through fixed
                plans, skill-building courses, and a fair, rule-based referral network. Every member
                joins by invite from an existing member, keeping the community trusted and
                accountable. {BRAND_NAME} is built as an opportunity to grow through effort, training,
                and referrals — not a promise of guaranteed profit.
              </p>
            </CardContent>
          </Card>
          <Card className="glass border-border/40">
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-gradient">What We Offer</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>10 fixed investment plans with transparent Rise Coins and rank rewards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>35+ skill-development and training courses across multiple categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>A 3-step referral commission structure with clear, published percentages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>Dashboard-first tracking of plans, earnings, and withdrawals</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card className="glass border-border/40">
            <CardContent className="p-6 space-y-2">
              <Layers className="size-6 text-gold" />
              <h3 className="font-bold">Work Process</h3>
              <p className="text-sm text-muted-foreground">
                Choose a plan, submit payment for admin verification, and start earning Rise Coins and
                referral commissions once your plan is approved.
              </p>
            </CardContent>
          </Card>
          <Card className="glass border-border/40">
            <CardContent className="p-6 space-y-2">
              <GraduationCap className="size-6 text-gold" />
              <h3 className="font-bold">Training & Skills</h3>
              <p className="text-sm text-muted-foreground">
                Access structured beginner training and 35+ courses so members can build real,
                transferable skills alongside their earning journey.
              </p>
            </CardContent>
          </Card>
          <Card className="glass border-border/40">
            <CardContent className="p-6 space-y-2">
              <Users className="size-6 text-gold" />
              <h3 className="font-bold">Team & Community</h3>
              <p className="text-sm text-muted-foreground">
                Grow a direct and indirect team through referrals, guided by leadership and training
                departments that support every member's progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Working Departments Section */}
      <section id="departments" className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="text-center mb-12">
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <Building2 className="size-4 text-gold" />
            Working Departments
          </div>
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl mb-3">
            How <span className="text-gradient-gold">{BRAND_NAME}</span> Is Organized
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three core departments keep the platform running smoothly for every member.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {departments.map((department) => (
            <Card key={department.name} className="glass border-border/40">
              <CardContent className="p-6 space-y-4">
                <div className="grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground">
                  <department.icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-gradient">{department.name}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {department.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-gold mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="text-center mb-12">
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <MessageCircle className="size-4 text-gold" />
            Contact Us
          </div>
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl mb-3">
            We're Here to <span className="text-gradient-gold">Help</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reach out with any questions about plans, courses, or your account.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          <a
            href={whatsappHref(siteInfo?.adminWhatsApp ?? "923057410110")}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-2xl p-5 flex items-start gap-3 hover:border-gold/40 border border-border/40 transition-colors"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary shrink-0">
              <MessageCircle className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                WhatsApp Support
              </div>
              <div className="mt-1 text-sm font-semibold break-all">
                {siteInfo?.adminWhatsApp ?? "+92 305 7410110"}
              </div>
            </div>
          </a>
          <div className="glass rounded-2xl p-5 flex items-start gap-3 border border-border/40">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary shrink-0">
              <Phone className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Contact Number
              </div>
              <div className="mt-1 text-sm font-semibold break-all">
                {siteInfo?.contactDetails.phone2 ?? "+92 320 7598146"}
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-start gap-3 border border-border/40">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary shrink-0">
              <Mail className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Official Email
              </div>
              <div className="mt-1 text-sm font-semibold break-all">
                {siteInfo?.supportEmail ?? "nexorise333@gmail.com"}
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-start gap-3 border border-border/40">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary shrink-0">
              <MapPin className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Location
              </div>
              <div className="mt-1 text-sm font-semibold break-all">
                {siteInfo?.contactDetails.location ?? "Sargodha"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>How {BRAND_NAME} Works</DialogTitle>
            <DialogDescription>
              A quick overview of our services, work process, and system rules.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <Award className="size-4 text-gold" /> Services
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• 10 fixed investment plans, from Rs 800 to Rs 10,000</li>
                <li>• 35+ skill-development and training courses</li>
                <li>• Beginner-level training sessions with seat confirmation</li>
                <li>• A 3-step referral commission structure and rank-based rewards</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <Layers className="size-4 text-gold" /> Work Process
              </h3>
              <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
                <li>An existing member invites you and helps you sign up.</li>
                <li>Choose a plan and submit your payment details for admin verification.</li>
                <li>Once approved, your plan activates and Rise Coins are credited.</li>
                <li>Build your team through referrals to unlock 3-step commissions and rank rewards.</li>
                <li>Track everything — plans, earnings, and withdrawals — from your dashboard.</li>
              </ol>
            </div>
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <ShieldCheck className="size-4 text-gold" /> System Info
              </h3>
              <p className="text-sm text-muted-foreground">
                {BRAND_NAME} is an earning and skill-development opportunity, not a guaranteed-income
                scheme. Returns depend on your plan, training, and referral activity, and all payments
                are manually reviewed by admin before any plan is activated. Withdrawal rules and
                processing times are published on your dashboard for full transparency.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
