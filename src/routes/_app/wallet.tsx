import {
  startTransition,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Landmark,
  Wallet as WalletIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  CURRENT_MEMBER_ID,
  createBankTransactionRequest,
  ensureAdminSeedData,
  getBankTransactionsForMember,
  getMembers,
  subscribeToAdminData,
  type BankTransaction,
  type BankTransactionType,
} from "@/lib/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/wallet")({
  head: () => ({ meta: [{ title: "Wallet - Apex Invest" }] }),
  component: WalletPage,
});

const currencyFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0,
});

type WalletFormState = {
  accountName: string;
  accountNumber: string;
  bankName: string;
  amount: string;
};

const initialFormState: WalletFormState = {
  accountName: "",
  accountNumber: "",
  bankName: "",
  amount: "",
};

function WalletPage() {
  const [requestType, setRequestType] = useState<BankTransactionType>("deposit");
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<BankTransaction[]>([]);
  const [form, setForm] = useState<WalletFormState>(initialFormState);

  const refreshWallet = useEffectEvent(() => {
    startTransition(() => {
      const member = getMembers().find((entry) => entry.id === CURRENT_MEMBER_ID);
      const transactions = getBankTransactionsForMember(CURRENT_MEMBER_ID)
        .slice()
        .sort(
          (left, right) =>
            new Date(right.requestedAt).getTime() - new Date(left.requestedAt).getTime(),
        );

      setBalance(member?.totalEarned ?? 0);
      setHistory(transactions);
    });
  });

  useEffect(() => {
    ensureAdminSeedData();
    refreshWallet();
    return subscribeToAdminData(refreshWallet);
  }, [refreshWallet]);

  const summary = useMemo(
    () => ({
      deposits: history.filter((entry) => entry.type === "deposit").length,
      withdrawals: history.filter((entry) => entry.type === "withdrawal").length,
    }),
    [history],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const request = createBankTransactionRequest({
        memberId: CURRENT_MEMBER_ID,
        type: requestType,
        accountName: form.accountName,
        accountNumber: form.accountNumber,
        bankName: form.bankName,
        amount: Number(form.amount),
      });

      toast.success(
        `${request.type === "deposit" ? "Deposit" : "Withdrawal"} request ${request.id} sent to admin.`,
      );
      setForm(initialFormState);
      refreshWallet();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit your request.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">
          Add your bank details for deposits and withdrawals. Every request appears in the admin
          panel.
        </p>
      </div>

      <Card className="glass border-border/40 overflow-hidden relative">
        <div className="absolute inset-0 gradient-primary opacity-30" />
        <CardContent className="relative grid gap-6 p-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <WalletIcon className="size-4" />
              Available balance
            </div>
            <div className="mt-2 text-5xl font-bold">{formatCurrency(balance)}</div>
            <div className="mt-3 flex flex-wrap gap-3">
              <MiniStat label="Deposit requests" value={summary.deposits} />
              <MiniStat label="Withdrawal requests" value={summary.withdrawals} />
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-background/60 p-5 backdrop-blur-sm">
            <div className="inline-flex rounded-[1.4rem] bg-background/70 p-1">
              <RequestTypeButton
                active={requestType === "deposit"}
                label="Deposit"
                icon={ArrowDownToLine}
                onClick={() => setRequestType("deposit")}
              />
              <RequestTypeButton
                active={requestType === "withdrawal"}
                label="Withdraw"
                icon={ArrowUpFromLine}
                onClick={() => setRequestType("withdrawal")}
              />
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Account name"
                  value={form.accountName}
                  onChange={(value) => setForm((current) => ({ ...current, accountName: value }))}
                  placeholder="Ali Khan"
                />
                <Field
                  label="Account number"
                  value={form.accountNumber}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, accountNumber: value }))
                  }
                  placeholder="031234567890"
                />
                <Field
                  label="Bank name"
                  value={form.bankName}
                  onChange={(value) => setForm((current) => ({ ...current, bankName: value }))}
                  placeholder="Meezan Bank"
                />
                <Field
                  label="Amount"
                  type="number"
                  value={form.amount}
                  onChange={(value) => setForm((current) => ({ ...current, amount: value }))}
                  placeholder="5000"
                  min="1"
                />
              </div>

              <div className="rounded-2xl border border-border/40 bg-background/35 p-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Landmark className="size-4 text-gold" />
                  {requestType === "deposit" ? "Deposit details" : "Withdrawal details"}
                </div>
                <p className="mt-2">
                  {requestType === "deposit"
                    ? "Submit the bank account you used for the deposit and the amount sent."
                    : "Submit the bank account where you want the withdrawal amount transferred."}
                </p>
              </div>

              <Button type="submit" className="h-12 w-full gradient-gold text-gold-foreground">
                {requestType === "deposit" ? (
                  <ArrowDownToLine className="size-4" />
                ) : (
                  <ArrowUpFromLine className="size-4" />
                )}
                {requestType === "deposit" ? "Submit deposit request" : "Submit withdrawal request"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Bank request history</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length ? (
                history.map((entry) => (
                  <TableRow key={entry.id} className="border-border/30">
                    <TableCell className="text-muted-foreground">
                      {formatDateTime(entry.requestedAt)}
                    </TableCell>
                    <TableCell>
                      <TypeBadge type={entry.type} />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{entry.bankName}</div>
                      <div className="text-xs text-muted-foreground">{entry.accountName}</div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{entry.accountNumber}</TableCell>
                    <TableCell>
                      <StatusBadge status={entry.status} />
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(entry.amount)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-border/30">
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No deposit or withdrawal requests yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "number";
  min?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Input
        type={type}
        min={min}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 bg-background/35"
      />
    </div>
  );
}

function RequestTypeButton({
  active,
  label,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: typeof ArrowDownToLine;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-w-[150px] items-center justify-center gap-2 rounded-[1.1rem] px-5 py-3 text-base font-semibold transition-all",
        active
          ? "gradient-gold text-gold-foreground shadow-[0_16px_32px_rgba(255,170,0,0.22)]"
          : "bg-background/40 text-foreground hover:bg-background/55",
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-background/25 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}

function TypeBadge({ type }: { type: BankTransactionType }) {
  return (
    <Badge
      className={cn(
        "border-0",
        type === "deposit" ? "bg-success/20 text-success" : "bg-primary/20 text-primary",
      )}
    >
      {type === "deposit" ? "Deposit" : "Withdrawal"}
    </Badge>
  );
}

function StatusBadge({ status }: { status: BankTransaction["status"] }) {
  return (
    <Badge
      className={cn(
        "border-0",
        status === "approved" && "bg-success/20 text-success",
        status === "rejected" && "bg-destructive/20 text-destructive",
        status === "pending" && "bg-gold/20 text-gold",
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function formatCurrency(value: number) {
  return `Rs ${currencyFormatter.format(value)}`;
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
