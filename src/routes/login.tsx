import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Apex Invest" }] }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 gradient-hero">
      <div className="hidden lg:flex flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl gradient-primary grid place-items-center glow"><Sparkles className="size-5 text-primary-foreground" /></div>
          <span className="font-bold text-lg">Apex Invest</span>
        </Link>
        <div className="space-y-4 max-w-md">
          <h2 className="text-4xl font-bold leading-tight">Welcome back to your <span className="text-gradient-gold">wealth journey</span>.</h2>
          <p className="text-muted-foreground">Track investments, claim rewards and grow your network — all in one premium dashboard.</p>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 Apex Invest. All rights reserved.</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Welcome back!"); nav({ to: "/dashboard" }); }}
          className="w-full max-w-md glass rounded-2xl p-8 space-y-5"
        >
          <div>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to continue.</p>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" required placeholder="you@apex.com" /></div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Password</Label>
              <Link to="/forgot-password" className="text-xs text-gold hover:underline">Forgot?</Link>
            </div>
            <Input type="password" required placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground glow h-11">Sign in</Button>
          <div className="text-center text-sm text-muted-foreground">
            New here? <Link to="/signup" className="text-gold hover:underline">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
