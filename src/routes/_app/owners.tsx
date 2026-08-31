import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Quote } from "lucide-react";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/owners")({
  head: () => ({ meta: [{ title: pageTitle("Company Leadership") }] }),
  component: OwnersPage,
});

const leaders = [
  {
    name: "Sardar Laeiq Ahmed",
    role: "Founder & Chief Executive Officer (CEO)",
    bio: "A visionary entrepreneur driven by purpose, innovation, and the ambition to create meaningful digital opportunities. As Founder & CEO, Sardar Laeiq Ahmed leads the company's overall vision, strategic direction, and long-term growth. With a commitment to leadership, integrity, innovation, and sustainable development, he focuses on building a trusted and forward-thinking business environment where individuals can discover opportunities, develop their potential, and grow with confidence.",
    quote:
      "A vision becomes powerful when it inspires people, creates opportunity, and builds a future beyond expectations.",
    tags: ["Vision", "Leadership", "Innovation", "Excellence"],
    phone: "03057410110",
    email: "sardarlaeiqahmad@gmail.com",
  },
  {
    name: "Yashfa Mushtaq",
    role: "Co-Founder & Chief Operating Officer (COO)",
    bio: "A visionary leader dedicated to transforming ideas into meaningful digital opportunities. As Co-Founder & COO, Yashfa Mushtaq oversees the company's day-to-day operations, strategic execution, team development, community management, and long-term growth initiatives. With a strong focus on leadership, innovation, transparency, and sustainable growth, she works closely with the team to build an environment where ambition meets opportunity and every individual is encouraged to grow.",
    quote:
      "Building more than a business — creating a vision, empowering people, and turning possibilities into progress.",
    tags: ["Leadership", "Strategy", "Innovation", "Growth"],
    phone: "03207598146",
    email: "nexorise333@gmail.com",
  },
];

function OwnersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Leadership</h1>
        <p className="text-muted-foreground">
          Meet the founders guiding NexoRise's vision, operations, and growth.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {leaders.map((leader) => (
          <Card key={leader.name} className="glass border-border/40">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="size-16 ring-2 ring-gold/40">
                  <AvatarFallback className="gradient-primary text-lg text-primary-foreground">
                    {leader.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-bold">{leader.name}</div>
                  <div className="text-sm text-gradient-gold font-semibold">{leader.role}</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{leader.bio}</p>

              <div className="flex items-start gap-2 rounded-2xl border border-gold/30 bg-gold/5 p-4">
                <Quote className="size-4 text-gold shrink-0 mt-0.5" />
                <p className="text-sm italic text-foreground">{leader.quote}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {leader.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gold/40">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/35 p-3">
                  <Phone className="size-4 text-primary shrink-0" />
                  <span className="text-sm font-semibold break-all">{leader.phone}</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/35 p-3">
                  <Mail className="size-4 text-primary shrink-0" />
                  <span className="text-sm font-semibold break-all">{leader.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
