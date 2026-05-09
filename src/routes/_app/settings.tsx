import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { apiRequest, type AppUser } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: pageTitle("Settings") }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, token, refresh } = useAppAuth();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name ?? "",
      phone: user?.phone ?? "",
    });
  }, [user?.name, user?.phone]);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Update your profile and review your current account configuration.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,0.95fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-20 ring-2 ring-gold/40">
                <AvatarFallback className="gradient-primary text-xl text-primary-foreground">
                  {user?.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() ?? "NX"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg font-semibold">{user?.name ?? "Nexo User"}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {(user?.accountType ?? "prospect").replace("_", " ")}
                </div>
              </div>
            </div>

            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                if (!token) {
                  return;
                }

                setSaving(true);
                try {
                  await apiRequest<{ user: AppUser }>("/user/profile", {
                    method: "PUT",
                    token,
                    body: form,
                  });
                  await refresh();
                  toast.success("Profile updated");
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Unable to update profile.");
                } finally {
                  setSaving(false);
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <Input
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email ?? ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Referral code</Label>
                  <Input value={user?.referralCode ?? ""} readOnly />
                </div>
              </div>
              <Button type="submit" disabled={saving} className="gradient-primary text-primary-foreground">
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Account Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Info label="Account type" value={(user?.accountType ?? "prospect").replace("_", " ")} />
            <Info label="Referral code" value={user?.referralCode ?? "-"} />
            <Info
              label="Referral link"
              value={user?.referralLink ?? "Unlocks after approved investment"}
            />
            <Info
              label="Joined"
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-PK", { dateStyle: "medium" })
                  : "-"
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/35 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm font-semibold capitalize">{value}</div>
    </div>
  );
}
