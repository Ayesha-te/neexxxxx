import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest, formatCurrency } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";

type InvestmentsResponse = {
  items: Array<{
    id: string;
    status: string;
    createdAt: string;
    plan: {
      id: string;
      name: string;
      price: number;
      points: number;
      benefits: string[];
      featured?: boolean;
    } | null;
    payment: {
      id: string;
      manualTransactionId: string;
      status: string;
      proofNote: string;
      proofFileUrl: string | null;
      proofOriginalFileName: string | null;
    } | null;
  }>;
  plans: Array<{
    id: string;
    name: string;
    price: number;
    points: number;
    benefits: string[];
    featured?: boolean;
  }>;
};

type JoinOptionsResponse = {
  settings: {
    paymentDetails: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      instructions: string;
    };
    referralRules: {
      level1Percent: number;
      level2Percent: number;
      level3Percent: number;
    };
  };
};

export const Route = createFileRoute("/_app/plans")({
  head: () => ({ meta: [{ title: pageTitle("Women Earning Plans") }] }),
  component: Plans,
});

function Plans() {
  const { token } = useAppAuth();
  const [data, setData] = useState<InvestmentsResponse | null>(null);
  const [joinData, setJoinData] = useState<JoinOptionsResponse | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [manualTransactionId, setManualTransactionId] = useState("");
  const [proofNote, setProofNote] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const proofFileInputRef = useRef<HTMLInputElement | null>(null);

  const loadData = async () => {
    if (!token) {
      return;
    }

    const [investments, joinOptions] = await Promise.all([
      apiRequest<InvestmentsResponse>("/user/investments", { token }),
      apiRequest<JoinOptionsResponse>("/user/join-options", { token }),
    ]);

    setData(investments);
    setJoinData(joinOptions);
  };

  useEffect(() => {
    void loadData();
  }, [token]);

  const selectedPlan = data?.plans.find((plan) => plan.id === selectedPlanId) ?? null;
  const latestPlanStatuses = useMemo(() => {
    const statuses = new Map<string, string>();

    for (const item of data?.items ?? []) {
      if (item.plan?.id && !statuses.has(item.plan.id)) {
        statuses.set(item.plan.id, item.status);
      }
    }

    return statuses;
  }, [data?.items]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Women Earning Plans</h1>
        <p className="text-muted-foreground">
          Submit your manual payment, wait for admin approval, and the system will add fixed plan
          points plus 3-level referral commissions automatically.
        </p>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Admin Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Info label="Account title" value={joinData?.settings.paymentDetails.accountName ?? "-"} />
          <Info
            label="Account number"
            value={joinData?.settings.paymentDetails.accountNumber ?? "-"}
          />
          <Info label="Bank name" value={joinData?.settings.paymentDetails.bankName ?? "-"} />
          <Info label="Instructions" value={joinData?.settings.paymentDetails.instructions ?? "-"} />
        </CardContent>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {data?.plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative glass border-border/40 transition-all hover:-translate-y-1 hover:glow ${
              plan.featured ? "ring-2 ring-gold glow-gold" : ""
            } ${selectedPlanId === plan.id ? "ring-2 ring-primary" : ""}`}
          >
            {plan.featured ? (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-0 gradient-gold text-gold-foreground">
                <Sparkles className="mr-1 size-3" /> Recommended
              </Badge>
            ) : null}
            <CardContent className="space-y-4 p-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {plan.name}
                </div>
                <div className="mt-1 text-3xl font-bold">{formatCurrency(plan.price)}</div>
                <div className="mt-1 text-sm font-semibold text-gradient-gold">
                  {plan.points} points on approval
                </div>
                {latestPlanStatuses.get(plan.id) ? (
                  <div className="mt-3">
                    <StatusBadge status={latestPlanStatuses.get(plan.id) ?? ""} />
                  </div>
                ) : null}
              </div>
              <ul className="space-y-2 text-sm">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" /> {benefit}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setSelectedPlanId(plan.id)}
                className={`w-full ${
                  plan.featured
                    ? "gradient-gold text-gold-foreground"
                    : "gradient-primary text-primary-foreground"
                }`}
              >
                {selectedPlanId === plan.id ? "Selected for Deposit" : "Choose plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Deposit Money and Submit Proof</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-[0.8fr,1.2fr]">
          <div className="rounded-2xl border border-border/40 bg-background/35 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Selected plan
            </div>
            <div className="mt-2 text-2xl font-bold">
              {selectedPlan?.name ?? "No plan selected yet"}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {selectedPlan
                ? `${formatCurrency(selectedPlan.price)} | ${selectedPlan.points} points | ${
                    joinData
                      ? `${joinData.settings.referralRules.level1Percent}% / ${joinData.settings.referralRules.level2Percent}% / ${joinData.settings.referralRules.level3Percent}%`
                      : "30% / 15% / 5%"
                  } team income`
                : "Choose a plan card first. The plan will only start after admin verifies your deposit."}
            </div>
            <div className="mt-4 rounded-xl border border-border/40 bg-background/45 p-3">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Deposit amount
              </div>
              <div className="mt-2 text-lg font-semibold">
                {selectedPlan ? formatCurrency(selectedPlan.price) : "-"}
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Referral structure:{" "}
              {joinData
                ? `${joinData.settings.referralRules.level1Percent}% / ${joinData.settings.referralRules.level2Percent}% / ${joinData.settings.referralRules.level3Percent}%`
                : "30% / 15% / 5%"}
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              if (!token || !selectedPlan) {
                return;
              }

              setSubmitting(true);
              try {
                const formData = new FormData();
                formData.set("planId", selectedPlan.id);
                formData.set("manualTransactionId", manualTransactionId);
                formData.set("proofNote", proofNote);
                if (proofFile) {
                  formData.set("proofFile", proofFile);
                }

                await apiRequest("/user/investments", {
                  method: "POST",
                  token,
                  body: formData,
                });
                toast.success("Deposit submitted. Admin can now review it and activate the plan.");
                setSelectedPlanId("");
                setManualTransactionId("");
                setProofNote("");
                setProofFile(null);
                if (proofFileInputRef.current) {
                  proofFileInputRef.current.value = "";
                }
                await loadData();
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Unable to submit investment.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction ID</label>
              <Input
                value={manualTransactionId}
                onChange={(event) => setManualTransactionId(event.target.value)}
                placeholder="BANK-TXN-12345"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload proof image or PDF</label>
              <input
                ref={proofFileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(event) => setProofFile(event.target.files?.[0] ?? null)}
                className="block w-full rounded-xl border border-border/40 bg-background/35 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary/15 file:px-3 file:py-2 file:text-primary"
              />
              <div className="text-xs text-muted-foreground">
                JPG, PNG, WEBP, GIF, or PDF up to 5 MB.
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment note</label>
              <Textarea
                value={proofNote}
                onChange={(event) => setProofNote(event.target.value)}
                placeholder="Optional note about the payment time, method, or sender account."
                className="min-h-28"
              />
              <div className="text-xs text-muted-foreground">
                Add a note or upload proof so admin can verify the deposit.
              </div>
            </div>
            <Button
              type="submit"
              disabled={submitting || !selectedPlan}
              className="gradient-primary text-primary-foreground"
            >
              {submitting ? "Submitting..." : "Send Deposit for Approval"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Your investment history</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data?.items.length ? (
            data.items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/40 bg-background/35 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{item.plan?.name ?? "Plan"}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.payment?.manualTransactionId ?? "-"} |{" "}
                      {new Date(item.createdAt).toLocaleString("en-PK", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {item.plan ? `${formatCurrency(item.plan.price)} | ${item.plan.points} points` : ""}
                    </div>
                    {item.payment?.proofFileUrl ? (
                      <a
                        href={item.payment.proofFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex text-xs font-medium text-primary hover:underline"
                      >
                        View uploaded proof
                      </a>
                    ) : null}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">No investment submissions yet.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/35 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.toLowerCase();
  const styles =
    normalizedStatus === "active"
      ? "border-success/30 bg-success/10 text-success"
      : normalizedStatus === "pending"
        ? "border-warning/30 bg-warning/10 text-warning"
        : "border-destructive/30 bg-destructive/10 text-destructive";

  const label =
    normalizedStatus === "active"
      ? "Approved"
      : normalizedStatus === "pending"
        ? "Pending Approval"
        : "Rejected";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`}>
      {label}
    </span>
  );
}
