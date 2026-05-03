import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, Users } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/referrals")({
  head: () => ({ meta: [{ title: pageTitle("Referrals") }] }),
  component: Referrals,
});

const link = "https://nexo-women.app/r/NEXO-1234";

function Referrals() {
  const copy = async () => {
    await navigator.clipboard.writeText(link);
    toast.success("Referral link copied!");
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Referral System</h1>
        <p className="text-muted-foreground">
          Invite friends. Earn from 3 levels of their network.
        </p>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Your referral link</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Input readOnly value={link} className="flex-1 bg-input/50" />
          <Button onClick={copy} className="gradient-primary text-primary-foreground">
            <Copy className="size-4 mr-2" /> Copy
          </Button>
          <Button variant="outline" onClick={() => toast.success("Share dialog opened")}>
            <Share2 className="size-4 mr-2" /> Share
          </Button>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { l: "Level 1", n: 12, e: 14200, c: "gradient-primary" },
          { l: "Level 2", n: 38, e: 7820, c: "gradient-gold" },
          { l: "Level 3", n: 96, e: 2800, c: "bg-success" },
        ].map((r) => (
          <Card key={r.l} className="glass border-border/40">
            <CardContent className="p-6 space-y-2">
              <div
                className={`size-10 rounded-xl ${r.c} grid place-items-center text-primary-foreground`}
              >
                <Users className="size-5" />
              </div>
              <div className="text-xs text-muted-foreground uppercase">{r.l}</div>
              <div className="text-3xl font-bold">
                {r.n} <span className="text-sm font-normal text-muted-foreground">people</span>
              </div>
              <div className="text-sm text-gradient-gold font-semibold">
                Earned ₨ {r.e.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Your downline tree</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <Node label="You" big />
            <div className="h-6 w-px bg-border" />
            <div className="flex gap-6">
              {["Sara", "Bilal", "Hina"].map((n) => (
                <div key={n} className="flex flex-col items-center gap-3">
                  <Node label={n} />
                  <div className="h-4 w-px bg-border" />
                  <div className="flex gap-2">
                    <Node label="L2" small />
                    <Node label="L2" small />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Node({ label, big, small }: { label: string; big?: boolean; small?: boolean }) {
  const size = big ? "size-16 text-base" : small ? "size-10 text-xs" : "size-12 text-sm";
  const cls = big ? "gradient-gold text-gold-foreground glow-gold" : "glass text-foreground";
  return (
    <div className={`${size} ${cls} rounded-full grid place-items-center font-semibold`}>
      {label}
    </div>
  );
}
