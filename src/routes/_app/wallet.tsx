import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownCircle, Clock3, Landmark, Wallet as WalletIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";
import { useCurrency } from "@/lib/currency";
import { getPaymentMethodIcon } from "@/lib/paymentMethodIcons";

type WalletResponse = {
  balance: number;
  availableBalance: number;
  reservedAmount: number;
  rules: {
    minimumAmount: number;
    taxPercent: number;
    dailyLimitMin: number;
    dailyLimitMax: number;
    processingHoursMin: number;
    processingHoursMax: number;
  };
  transactions: Array<{
    id: string;
    amount: number;
    direction: "credit" | "debit";
    type:
      | "investment_commission"
      | "referral_commission"
      | "rise_coins_reward"
      | "withdrawal";
    description: string;
    referenceId: string | null;
    referenceType: string | null;
    createdAt: string;
  }>;
  withdrawals: Array<{
    id: string;
    amount: number;
    taxPercent: number;
    taxAmount: number;
    netAmount: number;
    accountType: "easypaisa" | "jazzcash" | "bank_transfer" | "binance";
    accountDetails: string;
    status: "pending" | "approved" | "rejected";
    note: string;
    reviewNote: string;
    createdAt: string;
    reviewedAt: string | null;
    reviewedByUserId: string | null;
  }>;
};

const BANK_SUB_TYPES = ["Pesa", "Adapay", "UPaisa", "Other bank"] as const;

export const Route = createFileRoute("/_app/wallet")({
  head: () => ({ meta: [{ title: pageTitle("Wallet") }] }),
  component: WalletPage,
});

function WalletPage() {
  const { token } = useAppAuth();
  const { format: formatCurrency } = useCurrency();
  const [data, setData] = useState<WalletResponse | null>(null);
  const [amount, setAmount] = useState("");
  const [accountType, setAccountType] = useState<
    "easypaisa" | "jazzcash" | "bank_transfer" | "binance"
  >("easypaisa");
  const [bankSubType, setBankSubType] = useState<(typeof BANK_SUB_TYPES)[number]>("Pesa");
  const [bankOtherName, setBankOtherName] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    if (!token) {
      return;
    }

    const response = await apiRequest<WalletResponse>("/user/wallet", { token });
    setData(response);
  };

  useEffect(() => {
    void loadData();
  }, [token]);

  const pendingWithdrawal = data?.withdrawals.find((item) => item.status === "pending") ?? null;
  const requestedAmount = Number(amount || 0);
  const taxEstimate = data ? roundMoney((requestedAmount * data.rules.taxPercent) / 100) : 0;
  const netEstimate = roundMoney(Math.max(requestedAmount - taxEstimate, 0));

  const todayRequested = useMemo(() => {
    const today = new Date().toDateString();

    return (
      data?.withdrawals
        .filter((item) => {
          const sameDay = new Date(item.createdAt).toDateString() === today;
          return sameDay && (item.status === "pending" || item.status === "approved");
        })
        .reduce((sum, item) => sum + item.amount, 0) ?? 0
    );
  }, [data?.withdrawals]);

  const dailyRemaining = data
    ? Math.max(data.rules.dailyLimitMax - todayRequested, 0)
    : 0;

  const belowMinimumBalance = data
    ? data.availableBalance < data.rules.minimumAmount
    : false;
  const maxRequestable = data ? Math.min(data.availableBalance, dailyRemaining) : 0;
  const amountError = data
    ? requestedAmount > 0 && requestedAmount > maxRequestable
      ? requestedAmount > data.availableBalance
        ? `You only have ${formatCurrency(data.availableBalance)} available to withdraw right now.`
        : `You can request at most ${formatCurrency(dailyRemaining)} more today (daily limit reached).`
      : requestedAmount > 0 && requestedAmount < data.rules.minimumAmount
        ? `Minimum withdrawal is ${formatCurrency(data.rules.minimumAmount)}.`
        : null
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">
          Review your wallet balance, request withdrawals, and track credits from referrals and
          rewards.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={WalletIcon}
          label="Total Balance"
          value={formatCurrency(data?.balance ?? 0)}
          hint="All wallet credits"
        />
        <SummaryCard
          icon={Landmark}
          label="Available Now"
          value={formatCurrency(data?.availableBalance ?? 0)}
          hint="Ready for withdrawal"
        />
        <SummaryCard
          icon={Clock3}
          label="Reserved"
          value={formatCurrency(data?.reservedAmount ?? 0)}
          hint="Held for pending requests"
        />
        <SummaryCard
          icon={ArrowDownCircle}
          label="Daily Remaining"
          value={formatCurrency(dailyRemaining)}
          hint={`Max ${formatCurrency(data?.rules.dailyLimitMax ?? 0)} today`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Request Withdrawal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Info label="Minimum withdrawal" value={formatCurrency(data?.rules.minimumAmount ?? 0)} />
              <Info label="Tax" value={`${data?.rules.taxPercent ?? 0}%`} />
              <Info
                label="Daily range"
                value={`${formatCurrency(data?.rules.dailyLimitMin ?? 0)} - ${formatCurrency(
                  data?.rules.dailyLimitMax ?? 0,
                )}`}
              />
              <Info
                label="Processing time"
                value={`${data?.rules.processingHoursMin ?? 0}-${data?.rules.processingHoursMax ?? 0} hours`}
              />
            </div>

            {pendingWithdrawal ? (
              <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
                You already have a pending withdrawal of {formatCurrency(pendingWithdrawal.amount)}.
                New requests will unlock after admin reviews it.
              </div>
            ) : belowMinimumBalance ? (
              <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
                You need at least {formatCurrency(data?.rules.minimumAmount ?? 0)} in available
                balance to request a withdrawal. Your available balance right now is{" "}
                {formatCurrency(data?.availableBalance ?? 0)}. Available balance comes from
                approved commissions and rewards, not from your plan deposit itself — keep building
                your team or wait for approvals to unlock withdrawals.
              </div>
            ) : null}

            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                if (!token || !data) {
                  return;
                }

                setSubmitting(true);
                try {
                  const bankLabel =
                    bankSubType === "Other bank" ? bankOtherName.trim() || "Other bank" : bankSubType;
                  const finalAccountDetails =
                    accountType === "bank_transfer"
                      ? `${bankLabel}: ${accountDetails.trim()}`
                      : accountDetails.trim();

                  await apiRequest("/user/withdrawals", {
                    method: "POST",
                    token,
                    body: {
                      amount: Number(amount),
                      accountType,
                      accountDetails: finalAccountDetails,
                      note: note.trim(),
                    },
                  });
                  toast.success("Withdrawal request submitted for admin review.");
                  setAmount("");
                  setAccountType("easypaisa");
                  setBankSubType("Pesa");
                  setBankOtherName("");
                  setAccountDetails("");
                  setNote("");
                  await loadData();
                } catch (error) {
                  toast.error(
                    error instanceof Error ? error.message : "Unable to submit withdrawal request.",
                  );
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">Withdrawal amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="1000"
                  disabled={belowMinimumBalance || !!pendingWithdrawal}
                  required
                />
                {amountError ? (
                  <p className="text-sm font-medium text-destructive">{amountError}</p>
                ) : null}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <EstimateCard label="Tax estimate" value={formatCurrency(taxEstimate)} />
                <EstimateCard label="Net you receive" value={formatCurrency(netEstimate)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account type</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      { value: "easypaisa", label: "EasyPaisa" },
                      { value: "jazzcash", label: "JazzCash" },
                      { value: "bank_transfer", label: "Bank Transfer" },
                      { value: "binance", label: "Binance" },
                    ] as const
                  ).map((option) => {
                    const Icon = getPaymentMethodIcon(option.value);
                    const isSelected = accountType === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAccountType(option.value)}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-input bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="truncate">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {accountType === "bank_transfer" ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bank</label>
                  <select
                    value={bankSubType}
                    onChange={(event) =>
                      setBankSubType(event.target.value as (typeof BANK_SUB_TYPES)[number])
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    {BANK_SUB_TYPES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {bankSubType === "Other bank" ? (
                    <Input
                      value={bankOtherName}
                      onChange={(event) => setBankOtherName(event.target.value)}
                      placeholder="Enter bank name"
                      required
                    />
                  ) : null}
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {accountType === "bank_transfer" ? "Bank account / IBAN" : "Account number"}
                </label>
                <Input
                  value={accountDetails}
                  onChange={(event) => setAccountDetails(event.target.value)}
                  placeholder={
                    accountType === "bank_transfer"
                      ? "Enter bank account number or IBAN"
                      : accountType === "binance"
                        ? "Enter Binance ID / email"
                        : "Enter mobile wallet number"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Note for admin</label>
                <Textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Optional note for this withdrawal request."
                  className="min-h-28"
                />
              </div>

              <Button
                type="submit"
                disabled={
                  submitting ||
                  !data ||
                  !!pendingWithdrawal ||
                  belowMinimumBalance ||
                  !accountDetails.trim() ||
                  requestedAmount <= 0 ||
                  !!amountError
                }
                className="gradient-primary text-primary-foreground"
              >
                {submitting ? "Submitting..." : "Request Withdrawal"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.withdrawals.length ? (
              data.withdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="rounded-2xl border border-border/40 bg-background/35 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">
                        {formatCurrency(withdrawal.amount)} requested
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Net {formatCurrency(withdrawal.netAmount)} after{" "}
                        {formatCurrency(withdrawal.taxAmount)} tax
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        {(() => {
                          const Icon = getPaymentMethodIcon(withdrawal.accountType);
                          return <Icon className="size-3.5 shrink-0" />;
                        })()}
                        {formatWithdrawalAccountType(withdrawal.accountType)}:{" "}
                        {withdrawal.accountDetails || "-"}
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {new Date(withdrawal.createdAt).toLocaleString("en-PK", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                    <StatusBadge status={withdrawal.status} />
                  </div>
                  {withdrawal.note ? (
                    <div className="mt-3 text-sm text-muted-foreground">{withdrawal.note}</div>
                  ) : null}
                  {withdrawal.reviewNote ? (
                    <div className="mt-3 rounded-xl border border-border/40 bg-background/45 p-3 text-sm text-muted-foreground">
                      {withdrawal.reviewNote}
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/40 p-6 text-sm text-muted-foreground">
                No withdrawal requests yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Wallet Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data?.transactions.length ? (
            data.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-background/35 p-4"
              >
                <div>
                  <div className="font-semibold">{transaction.description}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {formatTransactionType(transaction.type)}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {new Date(transaction.createdAt).toLocaleString("en-PK", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${
                      transaction.direction === "debit" ? "text-destructive" : "text-success"
                    }`}
                  >
                    {transaction.direction === "debit" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </div>
                  <Badge variant="outline" className="mt-2 capitalize">
                    {transaction.direction}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border/40 p-6 text-sm text-muted-foreground">
              No wallet transactions yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof WalletIcon;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="glass border-border/40">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="grid size-11 place-items-center rounded-2xl gradient-primary text-primary-foreground">
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-bold">{value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{hint}</div>
        </div>
      </CardContent>
    </Card>
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

function EstimateCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
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

function formatTransactionType(type: WalletResponse["transactions"][number]["type"]) {
  switch (type) {
    case "investment_commission":
      return "Investment commission";
    case "referral_commission":
      return "Referral commission";
    case "rise_coins_reward":
      return "Rise Coins reward";
    case "withdrawal":
      return "Withdrawal debit";
    default:
      return type;
  }
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function formatWithdrawalAccountType(
  type: WalletResponse["withdrawals"][number]["accountType"],
) {
  if (type === "easypaisa") return "EasyPaisa";
  if (type === "jazzcash") return "JazzCash";
  if (type === "binance") return "Binance";
  return "Bank Transfer";
}
