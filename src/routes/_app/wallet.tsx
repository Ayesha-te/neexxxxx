import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpFromLine, Wallet as WalletIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/wallet")({
  head: () => ({ meta: [{ title: "Wallet — Apex Invest" }] }),
  component: WalletPage,
});

const tx = [
  { d: "2026-04-25", t: "Direct income", a: 1200, type: "in" as const },
  { d: "2026-04-24", t: "Withdraw to bank", a: 5000, type: "out" as const },
  { d: "2026-04-22", t: "Level 2 bonus", a: 800, type: "in" as const },
  { d: "2026-04-20", t: "Plan 5 subscription", a: 9500, type: "out" as const },
  { d: "2026-04-18", t: "Milestone reward", a: 12000, type: "in" as const },
];

function WalletPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Manage your balance, deposits and withdrawals.</p>
      </div>

      <Card className="glass border-border/40 overflow-hidden relative">
        <div className="absolute inset-0 gradient-primary opacity-30" />
        <CardContent className="relative p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><WalletIcon className="size-4" /> Available balance</div>
            <div className="text-5xl font-bold mt-2">₨ 24,820</div>
            <div className="text-sm text-success mt-1">+ ₨ 2,000 this week</div>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => toast.success("Deposit initiated")} className="gradient-gold text-gold-foreground glow-gold h-12 px-6">
              <ArrowDownToLine className="size-4 mr-2" /> Deposit
            </Button>
            <Button onClick={() => toast.success("Withdrawal requested")} variant="outline" className="h-12 px-6 border-border/60">
              <ArrowUpFromLine className="size-4 mr-2" /> Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-border/40">
        <CardHeader><CardTitle>Transaction history</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tx.map((t, i) => (
                <TableRow key={i} className="border-border/30">
                  <TableCell className="text-muted-foreground">{t.d}</TableCell>
                  <TableCell>{t.t}</TableCell>
                  <TableCell className={`text-right font-semibold ${t.type === "in" ? "text-success" : "text-destructive"}`}>
                    {t.type === "in" ? "+" : "−"} ₨ {t.a.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
