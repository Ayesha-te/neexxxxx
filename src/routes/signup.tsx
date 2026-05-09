import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest, writeSession, type AppUser } from "@/lib/api";
import { BRAND_NAME, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: pageTitle("Sign up") }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referralCode: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const referralCode = new URLSearchParams(window.location.search).get("ref") ?? "";
    if (referralCode) {
      setForm((current) => ({ ...current, referralCode }));
    }
  }, []);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 gradient-hero">
      <div className="hidden flex-col justify-between p-12 lg:flex">
        <Link to="/" className="w-fit">
          <BrandLockup titleClassName="text-lg font-bold" subtitleClassName="tracking-[0.22em]" />
        </Link>
        <div className="max-w-md space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Join a system built to help women{" "}
            <span className="text-gradient">earn and grow together</span>.
          </h2>
          <p className="text-muted-foreground">
            Create your account to unlock fixed plans, 3-level team income, points, and reward
            milestones.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">(c) 2026 {BRAND_NAME}.</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitting(true);
            try {
              const response = await apiRequest<{ token: string; user: AppUser }>("/auth/register", {
                method: "POST",
                body: form,
              });
              writeSession(response);
              toast.success("Account created!");
              await navigate({ to: "/join" });
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Unable to create account.");
            } finally {
              setSubmitting(false);
            }
          }}
          className="glass w-full max-w-md space-y-5 rounded-2xl p-8"
        >
          <div>
            <h1 className="text-2xl font-bold">Create account</h1>
            <p className="text-sm text-muted-foreground">Sign up to begin your Nexo journey.</p>
          </div>
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input
              required
              placeholder="Ali Khan"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              required
              placeholder="you@nexo.com"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              required
              placeholder="+92 300 1234567"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              required
              placeholder="********"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>
              Referral code <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input
              placeholder="NEXO-1234"
              value={form.referralCode}
              onChange={(event) =>
                setForm((current) => ({ ...current, referralCode: event.target.value }))
              }
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="gradient-primary h-11 w-full text-primary-foreground glow"
          >
            {submitting ? "Creating account..." : "Create account"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-gold hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
