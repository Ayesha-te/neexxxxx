import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { pageTitle } from "@/lib/brand";
import { apiRequest } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";
import { useCurrency } from "@/lib/currency";

type InvestmentItem = {
  id: string;
  status: "pending" | "active" | "rejected";
  createdAt: string;
  activatedAt: string | null;
  plan: { id: string; name: string; price: number; riseCoins: number } | null;
};

type InvestmentsResponse = {
  items: InvestmentItem[];
};

export const Route = createFileRoute("/_app/total-investment")({
  head: () => ({ meta: [{ title: pageTitle("Total Investment") }] }),
  component: TotalInvestmentPage,
});

function TotalInvestmentPage() {
  const { token } = useAppAuth();
  const { format } = useCurrency();
  const [data, setData] = useState<InvestmentsResponse | null>(null);

  useEffect(() => {
    if (!token) return;
    void apiRequest<InvestmentsResponse>("/user/investments", { token }).then(setData).catch(() => null);
  }, [token]);

  const activeInvestments = (data?.items ?? []).filter((item) => item.status === "active");
  const totalInvestment = activeInvestments.reduce((sum, item) => sum + (item.plan?.price ?? 0), 0);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Total Investment</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A summary of every approved plan purchase that makes up your total investment.
        </p>
      </div>

      <section className="dashboard-panel flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <Wallet className="size-6" />
          </div>
          <div>
            <p className="eyebrow">Total Investment</p>
            <p className="mt-1 text-3xl font-bold">{format(totalInvestment)}</p>
          </div>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
          {activeInvestments.length} active plan{activeInvestments.length === 1 ? "" : "s"}
        </span>
      </section>

      <section className="dashboard-panel p-5 sm:p-6">
        <h2 className="section-title">Investment History</h2>
        <div className="mt-4 space-y-2">
          {(data?.items ?? []).map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl bg-muted/60 p-4">
              <div>
                <p className="text-sm font-semibold">{item.plan?.name ?? "Unknown plan"}</p>
                <p className="text-xs text-muted-foreground">
                  {item.plan ? `${format(item.plan.price)} · ${item.plan.riseCoins} Rise Coins` : ""}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString("en-PK", { dateStyle: "medium" })}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  item.status === "active"
                    ? "bg-success/10 text-success"
                    : item.status === "pending"
                      ? "bg-warning/10 text-warning"
                      : "bg-destructive/10 text-destructive"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
          {!data?.items.length && (
            <p className="text-sm text-muted-foreground">No investments yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
