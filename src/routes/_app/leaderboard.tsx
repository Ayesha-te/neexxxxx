import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { pageTitle } from "@/lib/brand";
import { apiRequest } from "@/lib/api";
import { useCurrency } from "@/lib/currency";

type LeaderboardEntry = {
  rank: number;
  name: string;
  currentIncome: number;
};

type LeaderboardResponse = {
  items: LeaderboardEntry[];
};

export const Route = createFileRoute("/_app/leaderboard")({
  head: () => ({ meta: [{ title: pageTitle("Leaderboard") }] }),
  component: LeaderboardPage,
});

const RANK_STYLES: Record<number, string> = {
  1: "bg-gradient-to-r from-primary/20 to-primary/5 border-primary/40",
  2: "bg-muted/70 border-border",
  3: "bg-muted/50 border-border",
};

function LeaderboardPage() {
  const { format } = useCurrency();
  const [data, setData] = useState<LeaderboardResponse | null>(null);

  useEffect(() => {
    void apiRequest<LeaderboardResponse>("/public/leaderboard").then(setData).catch(() => null);
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Top 10 members ranked by Current Income.
        </p>
      </div>

      <section className="dashboard-panel p-5 sm:p-6">
        <div className="space-y-2">
          {(data?.items ?? []).map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center justify-between rounded-xl border p-4 ${
                RANK_STYLES[entry.rank] ?? "border-border/60 bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {entry.rank <= 3 ? <Trophy className="size-4" /> : `#${entry.rank}`}
                </span>
                <span className="font-semibold">{entry.name}</span>
              </div>
              <span className="font-bold text-primary">{format(entry.currentIncome)}</span>
            </div>
          ))}
          {!data?.items.length && (
            <p className="text-sm text-muted-foreground">No leaderboard data yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
