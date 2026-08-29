import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Check, Phone, Mail, MapPin, GraduationCap, PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest, readSession } from "@/lib/api";
import { courses, totalCourses } from "@/lib/courses";

type SiteInfoResponse = {
  platformName: string;
  supportEmail: string;
  contactDetails: {
    phone1: string;
    phone2: string;
    email: string;
    location: string;
  };
};

const DEFAULT_WHATSAPP_CHANNEL_URL =
  "https://whatsapp.com/channel/0029VbClmg56LwHqK2IXYy1Y?utm_source=chatgpt.com";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "All Courses - NexoRise" }] }),
  component: CoursesPage,
});

function CoursesPage() {
  const [siteInfo, setSiteInfo] = useState<SiteInfoResponse | null>(null);

  useEffect(() => {
    void apiRequest<SiteInfoResponse>("/public/site-info").then(setSiteInfo).catch(() => null);
  }, []);

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" className="min-w-0 flex items-center gap-3">
            <ArrowLeft className="size-5 text-gold" />
            <BrandLockup titleClassName="text-lg font-bold" subtitleClassName="tracking-[0.22em]" />
          </Link>
          <Link to="/login">
            <Button className="gradient-primary text-primary-foreground glow">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium glass mb-6">
            <BookOpen className="size-4 text-gold" />
            Complete Learning Platform
          </div>
          <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
            All <span className="text-gradient-gold">{totalCourses}+</span> <span className="text-gradient">Premium Courses</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Expert-led training across Digital Marketing, Creative Design, Technical Skills, Languages, 
            Skill-Based Courses, and Islamic Development.
          </p>
        </div>

        <Card className="glass border-border/40 mb-10">
          <CardHeader>
            <CardTitle>Contact Admin for Course Help</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Info label="Phone 1" value={siteInfo?.contactDetails.phone1 ?? "03448252109"} icon={Phone} />
            <Info label="Phone 2" value={siteInfo?.contactDetails.phone2 ?? "03057410110"} icon={Phone} />
            <Info label="Email" value={siteInfo?.contactDetails.email ?? "sardarlaeiq786@gmail.com"} icon={Mail} />
            <Info label="Location" value={siteInfo?.contactDetails.location ?? "Sargodha"} icon={MapPin} />
          </CardContent>
        </Card>

        {/* Beginner Level Training */}
        <Card className="glass border-border/40 mb-10 border-gold/30 bg-gold/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="size-5 text-gold" /> Beginner Level Training
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground max-w-2xl">
              New to NexoRise? Reserve your seat in our next Beginner Level Training session to learn
              the basics of the platform, plans, and referral system before you get started.
            </p>
            <ConfirmSeatDialog />
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid gap-8">
          {Object.values(courses).map((category) => (
            <div key={category.icon} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gradient">{category.name}</h2>
                  <p className="text-sm text-muted-foreground">{category.courses.length} courses</p>
                </div>
              </div>

              {/* Courses in this category */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.courses.map((course, idx) => (
                  <Card key={idx} className="glass border-border/40 hover:border-gold/40 transition-all hover:shadow-lg">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Check className="size-5 text-success" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground leading-tight">{course}</h3>
                        </div>
                      </div>
                      <Link to="/login" className="inline-block">
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          Enroll Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: "👨‍🏫", title: "Expert Instructors", desc: "Learn from industry professionals" },
            { icon: "🎓", title: "Certificates", desc: "Get recognized upon completion" },
            { icon: "⏰", title: "Learn at Your Pace", desc: "No deadlines, study anytime" },
          ].map((feature) => (
            <div key={feature.title} className="glass rounded-2xl p-6 border border-border/40 text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="glass rounded-3xl p-8 border border-gold/30 bg-gold/5 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Join thousands of women empowering themselves through skill development and earning opportunities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/login">
                <Button size="lg" className="gradient-primary text-primary-foreground glow">
                  Enroll Now
                </Button>
              </Link>
              <a href={`mailto:${siteInfo?.contactDetails.email ?? "sardarlaeiq786@gmail.com"}`}>
                <Button size="lg" variant="outline">
                  Contact Admin
                </Button>
              </a>
              <Link to="/">
                <Button size="lg" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type ConfirmSeatResponse = {
  message?: string;
  confirmation?: string;
  whatsappChannelUrl?: string;
};

function ConfirmSeatDialog() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ConfirmSeatResponse | null>(null);
  const [form, setForm] = useState({ name: "", age: "", qualification: "" });
  const [agreed, setAgreed] = useState(false);

  const resetAndClose = () => {
    setOpen(false);
    setResult(null);
    setForm({ name: "", age: "", qualification: "" });
    setAgreed(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          resetAndClose();
        } else {
          setOpen(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="gradient-gold text-gold-foreground shrink-0" onClick={() => setOpen(true)}>
          Confirm Your Seat
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {result ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-success/15 text-success">
              <PartyPopper className="size-7" />
            </div>
            <DialogHeader>
              <DialogTitle>Congratulations! Your seat has been reserved.</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              WhatsApp Channel ko follow karein aur active rahein, kyun ke tamam training sessions aur
              updates isi channel par provide ki jayengi.
            </p>
            <a
              href={result.whatsappChannelUrl ?? DEFAULT_WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="gradient-primary text-primary-foreground glow w-full">
                NexoRise WhatsApp Channel
              </Button>
            </a>
            <Button variant="outline" className="w-full" onClick={resetAndClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Your Seat</DialogTitle>
              <DialogDescription>
                Reserve your seat for the next Beginner Level Training session.
              </DialogDescription>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                const session = readSession();
                if (!session?.token) {
                  toast.error("Please log in first to confirm your training seat.");
                  return;
                }
                if (!agreed) {
                  toast.error("Please agree to the training seat policy first.");
                  return;
                }

                setSubmitting(true);
                try {
                  const response = await apiRequest<ConfirmSeatResponse>(
                    "/user/training/confirm-seat",
                    {
                      method: "POST",
                      token: session.token,
                      body: {
                        name: form.name.trim(),
                        age: Number(form.age),
                        qualification: form.qualification.trim(),
                      },
                    },
                  );
                  setResult(response);
                } catch (error) {
                  toast.error(
                    error instanceof Error ? error.message : "Unable to confirm your seat.",
                  );
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Age</Label>
                <Input
                  type="number"
                  required
                  min={1}
                  value={form.age}
                  onChange={(event) => setForm((current) => ({ ...current, age: event.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Qualification</Label>
                <Input
                  required
                  value={form.qualification}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, qualification: event.target.value }))
                  }
                />
              </div>
              <div className="rounded-xl border border-border/40 bg-background/35 p-3 text-xs text-muted-foreground">
                Agar member ek dafa confirmed training seat skip karta hai ya given time par training
                attend nahi karta, to usay next week's training session ke liye dobara seat confirm
                karni hogi.
              </div>
              <label className="flex items-start gap-2 text-sm">
                <Checkbox
                  checked={agreed}
                  onCheckedChange={(value) => setAgreed(value === true)}
                  className="mt-0.5"
                />
                I Agree
              </label>
              <Button
                type="submit"
                disabled={submitting || !agreed}
                className="gradient-primary text-primary-foreground w-full"
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Info({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Phone }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/30 p-4 flex items-start gap-3">
      <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
        <Icon className="size-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-sm font-semibold break-all">{value}</div>
      </div>
    </div>
  );
}
