import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: pageTitle("Login") }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-2 gradient-hero">
      <div className="hidden flex-col justify-between p-12 lg:flex">
        <Link to="/" className="w-fit">
          <BrandLockup titleClassName="text-lg font-bold" subtitleClassName="tracking-[0.22em]" />
        </Link>
        <div className="max-w-md space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Welcome back to your <span className="text-gradient-gold">growth circle</span>.
          </h2>
          <p className="text-muted-foreground">
            Check plans, rewards, and referrals from a dashboard styled around the new Nexo Women
            Empowerment identity.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          © 2026 Nexo Women Empowerment. All rights reserved.
        </div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            toast.success("Welcome back!");
            navigate({ to: "/dashboard" });
          }}
          className="glass w-full max-w-md space-y-5 rounded-2xl p-8"
        >
          <div>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to continue.</p>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" required placeholder="you@nexo.com" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Password</Label>
              <Link to="/forgot-password" className="text-xs text-gold hover:underline">
                Forgot?
              </Link>
            </div>
            <Input type="password" required placeholder="********" />
          </div>
          <Button
            type="submit"
            className="gradient-primary h-11 w-full text-primary-foreground glow"
          >
            Sign in
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="text-gold hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
