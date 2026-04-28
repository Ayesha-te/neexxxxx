import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, TrendingUp, Layers, Network } from "lucide-react";

export const Route = createFileRoute("/_app/earnings")({
  head: () => ({ meta: [{ title: "Earning System — Apex Invest" }] }),
  component: Earnings,
});

const levels = [
  { l: 1, p: 30, d: 28, s: 16, t: 0 },
  { l: 2, p: 1000, d: 30, s: 16, t: 0 },
  { l: 3, p: 4000, d: 33, s: 16, t: 3 },
  { l: 4, p: 8000, d: 35, s: 16, t: 4 },
  { l: 5, p: 20000, d: 37, s: 17, t: 5 },
  { l: 6, p: 50000, d: 39, s: 17, t: 6 },
  { l: 7, p: 150000, d: 41, s: 18, t: 7 },
  { l: 8, p: 500000, d: 43, s: 18, t: 8 },
  { l: 9, p: 2000000, d: 46, s: 18, t: 9 },
  { l: 10, p: 5000000, d: 48, s: 18, t: 10 },
];

const currentLevel = 5;

function Earnings() {
  const steps = [
    { icon: TrendingUp, t: "Level 1 — Direct", s: "Earn from people you invite directly.", c: "gradient-primary" },
    { icon: Layers, t: "Level 2 — Second Step", s: "Earn from referrals of your referrals.", c: "gradient-gold" },
    { icon: Network, t: "Level 3 — Third Step", s: "Earn from the third tier of your network.", c: "bg-success" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Earning System</h1>
        <p className="text-muted-foreground">A transparent 3-step earning model that rewards growth at every level.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {steps.map((s, i) => (
          <Card key={s.t} className="glass border-border/40 relative overflow-hidden">
            <CardContent className="p-6 space-y-3">
              <div className={`size-12 rounded-xl ${s.c} grid place-items-center text-primary-foreground glow`}>
                <s.icon className="size-6" />
              </div>
              <div className="text-lg font-semibold">{s.t}</div>
              <div className="text-sm text-muted-foreground">{s.s}</div>
              {i < 2 && <ArrowRight className="hidden lg:block absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/40" />}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-border/40">
        <CardHeader><CardTitle>Level Ladder & Earning %</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead>Level</TableHead>
                <TableHead>Points Required</TableHead>
                <TableHead className="text-primary">Direct %</TableHead>
                <TableHead className="text-gold">Second %</TableHead>
                <TableHead className="text-success">Third %</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levels.map((lv) => {
                const reached = lv.l <= currentLevel;
                return (
                  <TableRow key={lv.l} className={`border-border/30 ${lv.l === currentLevel ? "bg-primary/10" : ""}`}>
                    <TableCell className="font-bold">L{lv.l}</TableCell>
                    <TableCell>{lv.p.toLocaleString()}</TableCell>
                    <TableCell><Bar pct={lv.d} color="bg-primary" /></TableCell>
                    <TableCell><Bar pct={lv.s} color="bg-gold" /></TableCell>
                    <TableCell><Bar pct={lv.t} color="bg-success" /></TableCell>
                    <TableCell>
                      {lv.l === currentLevel ? (
                        <span className="text-xs px-2 py-1 rounded-full gradient-gold text-gold-foreground font-semibold">Current</span>
                      ) : reached ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">Unlocked</span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Locked</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(100, pct * 2)}%` }} />
      </div>
      <span className="text-sm font-medium w-10">{pct}%</span>
    </div>
  );
}
