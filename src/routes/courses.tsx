import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Check, Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/api";
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

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "All Courses - Nexo Women Empowerment" }] }),
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
          <Link to="/signup">
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
                      <Link to="/signup" className="inline-block">
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
              <Link to="/signup">
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
