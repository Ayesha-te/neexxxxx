import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { apiRequest, formatCurrency } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";

type LuckyDrawResponse = {
  activeDraw: {
    id: string;
    title: string;
    entryFee: number;
    drawDate: string;
    terms: string[];
  } | null;
  items: Array<{
    id: string;
    ticketId: string;
    status: string;
    rewardAmount: number;
    createdAt: string;
    payment: {
      status: string;
      manualTransactionId: string;
      proofNote: string;
      proofFileUrl: string | null;
      proofOriginalFileName: string | null;
    } | null;
  }>;
  totalEntries: number;
};

export const Route = createFileRoute("/_app/lucky-draw")({
  head: () => ({ meta: [{ title: pageTitle("Lucky Draw") }] }),
  component: LuckyDrawPage,
});

function LuckyDrawPage() {
  const { token } = useAppAuth();
  const [data, setData] = useState<LuckyDrawResponse | null>(null);
  const [manualTransactionId, setManualTransactionId] = useState("");
  const [proofNote, setProofNote] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const proofFileInputRef = useRef<HTMLInputElement | null>(null);

  const loadData = async () => {
    if (!token) {
      return;
    }

    const response = await apiRequest<LuckyDrawResponse>("/user/lucky-draw", { token });
    setData(response);
  };

  useEffect(() => {
    void loadData();
  }, [token]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lucky Draw</h1>
        <p className="text-muted-foreground">
          Every approved payment creates one ticket. Re-entry always needs a fresh payment and gets
          a brand-new ticket ID.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,0.95fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Current Draw</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.activeDraw ? (
              <>
                <div className="text-3xl font-bold">{data.activeDraw.title}</div>
                <div className="text-sm text-muted-foreground">
                  Entry fee: {formatCurrency(data.activeDraw.entryFee)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Draw date:{" "}
                  {new Date(data.activeDraw.drawDate).toLocaleString("en-PK", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
                <div className="rounded-2xl border border-border/40 bg-background/35 p-4 text-sm">
                  {data.activeDraw.terms.map((term) => (
                    <div key={term} className="mb-2 last:mb-0 text-muted-foreground">
                      - {term}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">No active draw is configured yet.</div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Submit Lucky Draw Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                if (!token || !data?.activeDraw) {
                  return;
                }

                setSubmitting(true);
                try {
                  const formData = new FormData();
                  formData.set("drawId", data.activeDraw.id);
                  formData.set("manualTransactionId", manualTransactionId);
                  formData.set("proofNote", proofNote);
                  if (proofFile) {
                    formData.set("proofFile", proofFile);
                  }

                  await apiRequest("/user/lucky-draw-entries", {
                    method: "POST",
                    token,
                    body: formData,
                  });
                  toast.success("Lucky draw entry submitted for admin verification.");
                  setManualTransactionId("");
                  setProofNote("");
                  setProofFile(null);
                  if (proofFileInputRef.current) {
                    proofFileInputRef.current.value = "";
                  }
                  await loadData();
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Unable to submit entry.");
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
                  placeholder="DRAW-TXN-12345"
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
                  className="block w-full rounded-xl border border-border/40 bg-background/35 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-gold/15 file:px-3 file:py-2 file:text-foreground"
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
                  placeholder="Optional note about the payment reference or amount."
                  className="min-h-28"
                />
                <div className="text-xs text-muted-foreground">
                  A note or uploaded proof is required.
                </div>
              </div>
              <Button
                type="submit"
                disabled={submitting || !data?.activeDraw}
                className="gradient-gold text-gold-foreground"
              >
                {submitting ? "Submitting..." : "Create entry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Your Entry History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data?.items.length ? (
            data.items.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-border/40 bg-background/35 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">{entry.ticketId}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {entry.payment?.manualTransactionId ?? "-"} |{" "}
                      {new Date(entry.createdAt).toLocaleString("en-PK", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                    {entry.payment?.proofFileUrl ? (
                      <a
                        href={entry.payment.proofFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex text-xs font-medium text-primary hover:underline"
                      >
                        View uploaded proof
                      </a>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm">
                      <div className="text-muted-foreground">Reward</div>
                      <div className="font-semibold">{formatCurrency(entry.rewardAmount)}</div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {entry.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">No lucky draw entries yet.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
