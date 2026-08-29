import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest, formatCurrency } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";

type PlanOption = {
  id: string;
  name: string;
  price: number;
  riseCoins: number;
};

type JoinOptionsResponse = {
  plans: PlanOption[];
};

type PaymentMethod = {
  id: string;
  type: "easypaisa" | "jazzcash" | "bank" | "binance";
  label: string;
  accountNumber: string;
  accountHolderName: string;
  extraInstructions: string;
  active: boolean;
};

type SiteInfoResponse = {
  paymentMethods: PaymentMethod[];
};

type AccountRequestItem = {
  id: string;
  newMemberName: string;
  newMemberEmail: string;
  planAmount: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  reviewNote: string;
};

export const Route = createFileRoute("/_app/create-account")({
  head: () => ({ meta: [{ title: pageTitle("Create Account") }] }),
  component: CreateAccountPage,
});

function CreateAccountPage() {
  const { token, user } = useAppAuth();
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [myRequests, setMyRequests] = useState<AccountRequestItem[]>([]);

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberMobile, setNewMemberMobile] = useState("");
  const [planId, setPlanId] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [paymentMethodType, setPaymentMethodType] = useState<
    "easypaisa" | "jazzcash" | "bank" | "binance" | ""
  >("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<AccountRequestItem | null>(null);

  const loadRequests = async () => {
    if (!token) {
      return;
    }
    const response = await apiRequest<{ items: AccountRequestItem[] }>("/user/account-requests", {
      token,
    });
    setMyRequests(response.items);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    void Promise.all([
      apiRequest<JoinOptionsResponse>("/user/join-options", { token }),
      apiRequest<SiteInfoResponse>("/public/site-info"),
    ]).then(([joinOptions, siteInfo]) => {
      setPlans(joinOptions.plans);
      setPaymentMethods(siteInfo.paymentMethods.filter((method) => method.active));
    });

    void loadRequests();
  }, [token]);

  const selectedPlan = plans.find((plan) => plan.id === planId) ?? null;
  const selectedMethod = paymentMethods.find((method) => method.type === paymentMethodType) ?? null;

  const resetForm = () => {
    setNewMemberName("");
    setNewMemberEmail("");
    setNewMemberMobile("");
    setPlanId("");
    setReferralCode("");
    setPaymentNumber("");
    setPaymentMethodType("");
    setScreenshot(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || !selectedPlan || !paymentMethodType || !screenshot) {
      toast.error("Fill in all required fields and attach a payment screenshot.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("newMemberName", newMemberName.trim());
      formData.set("newMemberEmail", newMemberEmail.trim());
      formData.set("newMemberMobile", newMemberMobile.trim());
      formData.set("planId", selectedPlan.id);
      if (referralCode.trim()) {
        formData.set("referralCode", referralCode.trim());
      }
      formData.set("paymentNumber", paymentNumber.trim());
      formData.set("paymentMethodType", paymentMethodType);
      formData.set("paymentScreenshot", screenshot);

      const response = await apiRequest<{ request: AccountRequestItem }>("/user/account-requests", {
        method: "POST",
        token,
        body: formData,
      });

      setLastSubmitted(response.request);
      toast.success("Account request submitted. Pending admin review.");
      resetForm();
      await loadRequests();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit account request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create a New Member Account</h1>
        <p className="text-muted-foreground">
          Existing members can request a new account on behalf of someone joining NexoRise. Submit
          the details below and an admin will review and activate it.
        </p>
      </div>

      {lastSubmitted ? (
        <Card className="glass border-success/30 bg-success/5">
          <CardContent className="flex flex-wrap items-start gap-4 p-6">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-success/15 text-success">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold">Request submitted, pending review</div>
              <div className="text-sm text-muted-foreground">
                Submitted by <span className="font-medium text-foreground">{user?.name}</span> (
                {user?.email}) for new member{" "}
                <span className="font-medium text-foreground">{lastSubmitted.newMemberName}</span> (
                {lastSubmitted.newMemberEmail}) — {formatCurrency(lastSubmitted.planAmount)} plan.
              </div>
              <Badge variant="outline" className="mt-2 capitalize">
                {lastSubmitted.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="size-5 text-primary" />
              New Member Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>New member name</Label>
                  <Input
                    required
                    value={newMemberName}
                    onChange={(event) => setNewMemberName(event.target.value)}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    required
                    value={newMemberEmail}
                    onChange={(event) => setNewMemberEmail(event.target.value)}
                    placeholder="member@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Active mobile number</Label>
                <Input
                  required
                  value={newMemberMobile}
                  onChange={(event) => setNewMemberMobile(event.target.value)}
                  placeholder="+92 300 1234567"
                />
              </div>

              <div className="space-y-2">
                <Label>Purchased plan</Label>
                <select
                  required
                  value={planId}
                  onChange={(event) => setPlanId(event.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select a plan</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} — {formatCurrency(plan.price)} ({plan.riseCoins} Rise Coins)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Plan amount</Label>
                <Input readOnly value={selectedPlan ? formatCurrency(selectedPlan.price) : ""} />
              </div>

              <div className="space-y-2">
                <Label>
                  Referral code <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  value={referralCode}
                  onChange={(event) => setReferralCode(event.target.value)}
                  placeholder="NEXO-1234"
                />
              </div>

              <div className="space-y-2">
                <Label>Payment method</Label>
                <select
                  required
                  value={paymentMethodType}
                  onChange={(event) =>
                    setPaymentMethodType(event.target.value as typeof paymentMethodType)
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select a payment method</option>
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.type}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedMethod ? (
                <div className="rounded-2xl border border-border/40 bg-background/35 p-4 text-sm">
                  <div className="font-semibold">{selectedMethod.label}</div>
                  <div className="mt-1 text-muted-foreground">
                    Account: {selectedMethod.accountNumber} ({selectedMethod.accountHolderName})
                  </div>
                  {selectedMethod.extraInstructions ? (
                    <div className="mt-1 text-xs text-muted-foreground">
                      {selectedMethod.extraInstructions}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="space-y-2">
                <Label>Payment number (sent from)</Label>
                <Input
                  required
                  value={paymentNumber}
                  onChange={(event) => setPaymentNumber(event.target.value)}
                  placeholder="Number you paid from"
                />
              </div>

              <div className="space-y-2">
                <Label>Payment screenshot</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  required
                  onChange={(event) => setScreenshot(event.target.files?.[0] ?? null)}
                  className="block w-full rounded-xl border border-border/40 bg-background/35 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary/15 file:px-3 file:py-2 file:text-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="gradient-primary h-11 w-full text-primary-foreground glow"
              >
                {submitting ? "Submitting..." : "Submit Account Request"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Your Submitted Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myRequests.length ? (
              myRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-border/40 bg-background/35 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{request.newMemberName}</div>
                      <div className="text-sm text-muted-foreground">{request.newMemberEmail}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {formatCurrency(request.planAmount)} ·{" "}
                        {new Date(request.createdAt).toLocaleString("en-PK", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                  {request.reviewNote ? (
                    <div className="mt-2 text-xs text-muted-foreground">{request.reviewNote}</div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                No account requests submitted yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
  const styles =
    status === "approved"
      ? "border-success/30 bg-success/10 text-success"
      : status === "pending"
        ? "border-warning/30 bg-warning/10 text-warning"
        : "border-destructive/30 bg-destructive/10 text-destructive";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${styles}`}>
      {status}
    </span>
  );
}
