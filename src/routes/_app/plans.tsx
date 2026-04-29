import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/plans")({
  head: () => ({ meta: [{ title: "Investment Plans — Apex Invest" }] }),
  component: Plans,
});

const plans = [
  { n: 1, p: 1000, pts: 6, perks: ["Direct income access", "Basic dashboard"] },
  { n: 2, p: 2000, pts: 12, perks: ["Direct income", "Level 2 unlock"] },
  { n: 3, p: 4000, pts: 30, perks: ["3-level earnings", "Priority support"] },
  { n: 4, p: 6500, pts: 44, perks: ["3-level earnings", "Higher % rates"] },
  { n: 5, p: 9500, pts: 63, perks: ["Premium plan", "Gold tier", "Reward boost"], featured: true },
  { n: 6, p: 12000, pts: 80, perks: ["Premium plan", "Higher rewards"] },
  { n: 7, p: 15000, pts: 100, perks: ["VIP plan", "Maximum rewards", "Concierge"] },
];

function Plans() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Investment Plans</h1>
        <p className="text-muted-foreground">Pick a plan to start earning across 3 levels. Higher plans = more points & higher %.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {plans.map((pl) => (
          <Card
            key={pl.n}
            className={`relative glass border-border/40 transition-all hover:-translate-y-1 hover:glow ${pl.featured ? "ring-2 ring-gold glow-gold" : ""}`}
          >
            {pl.featured && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-gold text-gold-foreground border-0">
                <Sparkles className="size-3 mr-1" /> Recommended
              </Badge>
            )}
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Plan {pl.n}</div>
                <div className="text-3xl font-bold mt-1">₨ {pl.p.toLocaleString()}</div>
                <div className="text-sm text-gradient-gold font-semibold mt-1">{pl.pts} Points</div>
              </div>
              <ul className="space-y-2 text-sm">
                {pl.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="size-4 text-success shrink-0 mt-0.5" /> {perk}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => toast.success(`Subscribed to Plan ${pl.n}!`)}
                className={`w-full ${pl.featured ? "gradient-gold text-gold-foreground" : "gradient-primary text-primary-foreground"}`}
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
