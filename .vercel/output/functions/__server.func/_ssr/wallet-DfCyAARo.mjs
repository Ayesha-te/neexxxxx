import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { B as Button } from "./button-TjZkfKyC.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DIV666p3.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./rewards-system-CD7nypJq.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getMembers, C as CURRENT_MEMBER_ID, a as getBankTransactionsForMember, e as ensureAdminSeedData, s as subscribeToAdminData, c as createBankTransactionRequest } from "./admin-data-BGObWPJk.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { W as Wallet, A as ArrowDownToLine, f as ArrowUpFromLine, g as Landmark } from "../_libs/lucide-react.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tailwind-merge.mjs";
const currencyFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0
});
const initialFormState = {
  accountName: "",
  accountNumber: "",
  bankName: "",
  amount: ""
};
function WalletPage() {
  const [requestType, setRequestType] = reactExports.useState("deposit");
  const [balance, setBalance] = reactExports.useState(0);
  const [history, setHistory] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState(initialFormState);
  const refreshWallet = reactExports.useEffectEvent(() => {
    reactExports.startTransition(() => {
      const member = getMembers().find((entry) => entry.id === CURRENT_MEMBER_ID);
      const transactions = getBankTransactionsForMember(CURRENT_MEMBER_ID).slice().sort((left, right) => new Date(right.requestedAt).getTime() - new Date(left.requestedAt).getTime());
      setBalance(member?.totalEarned ?? 0);
      setHistory(transactions);
    });
  });
  reactExports.useEffect(() => {
    ensureAdminSeedData();
    refreshWallet();
    return subscribeToAdminData(refreshWallet);
  }, [refreshWallet]);
  const summary = reactExports.useMemo(() => ({
    deposits: history.filter((entry) => entry.type === "deposit").length,
    withdrawals: history.filter((entry) => entry.type === "withdrawal").length
  }), [history]);
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const request = createBankTransactionRequest({
        memberId: CURRENT_MEMBER_ID,
        type: requestType,
        accountName: form.accountName,
        accountNumber: form.accountNumber,
        bankName: form.bankName,
        amount: Number(form.amount)
      });
      toast.success(`${request.type === "deposit" ? "Deposit" : "Withdrawal"} request ${request.id} sent to admin.`);
      setForm(initialFormState);
      refreshWallet();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit your request.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Wallet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Add your bank details for deposits and withdrawals. Every request appears in the admin panel." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-primary opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "relative grid gap-6 p-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-4" }),
            "Available balance"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-5xl font-bold", children: formatCurrency(balance) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Deposit requests", value: summary.deposits }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Withdrawal requests", value: summary.withdrawals })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.75rem] border border-white/10 bg-background/60 p-5 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-[1.4rem] bg-background/70 p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RequestTypeButton, { active: requestType === "deposit", label: "Deposit", icon: ArrowDownToLine, onClick: () => setRequestType("deposit") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RequestTypeButton, { active: requestType === "withdrawal", label: "Withdraw", icon: ArrowUpFromLine, onClick: () => setRequestType("withdrawal") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Account name", value: form.accountName, onChange: (value) => setForm((current) => ({
                ...current,
                accountName: value
              })), placeholder: "Ali Khan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Account number", value: form.accountNumber, onChange: (value) => setForm((current) => ({
                ...current,
                accountNumber: value
              })), placeholder: "031234567890" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bank name", value: form.bankName, onChange: (value) => setForm((current) => ({
                ...current,
                bankName: value
              })), placeholder: "Meezan Bank" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Amount", type: "number", value: form.amount, onChange: (value) => setForm((current) => ({
                ...current,
                amount: value
              })), placeholder: "5000", min: "1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/40 bg-background/35 p-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-medium text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "size-4 text-gold" }),
                requestType === "deposit" ? "Deposit details" : "Withdrawal details"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: requestType === "deposit" ? "Submit the bank account you used for the deposit and the amount sent." : "Submit the bank account where you want the withdrawal amount transferred." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "h-12 w-full gradient-gold text-gold-foreground", children: [
              requestType === "deposit" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpFromLine, { className: "size-4" }),
              requestType === "deposit" ? "Submit deposit request" : "Submit withdrawal request"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Bank request history" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border/40 hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Bank" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: history.length ? history.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: formatDateTime(entry.requestedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: entry.type }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: entry.bankName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: entry.accountName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: entry.accountNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: entry.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: formatCurrency(entry.amount) })
        ] }, entry.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { className: "border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "py-10 text-center text-muted-foreground", children: "No deposit or withdrawal requests yet." }) }) })
      ] }) })
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type, min, value, onChange: (event) => onChange(event.target.value), placeholder, className: "h-11 bg-background/35" })
  ] });
}
function RequestTypeButton({
  active,
  label,
  icon: Icon,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: cn("inline-flex min-w-[150px] items-center justify-center gap-2 rounded-[1.1rem] px-5 py-3 text-base font-semibold transition-all", active ? "gradient-gold text-gold-foreground shadow-[0_16px_32px_rgba(255,170,0,0.22)]" : "bg-background/40 text-foreground hover:bg-background/55"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4" }),
    label
  ] });
}
function MiniStat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-background/25 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-semibold", children: value })
  ] });
}
function TypeBadge({
  type
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: cn("border-0", type === "deposit" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"), children: type === "deposit" ? "Deposit" : "Withdrawal" });
}
function StatusBadge({
  status
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: cn("border-0", status === "approved" && "bg-success/20 text-success", status === "rejected" && "bg-destructive/20 text-destructive", status === "pending" && "bg-gold/20 text-gold"), children: status.charAt(0).toUpperCase() + status.slice(1) });
}
function formatCurrency(value) {
  return `Rs ${currencyFormatter.format(value)}`;
}
function formatDateTime(value) {
  return new Date(value).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}
export {
  WalletPage as component
};
