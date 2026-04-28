import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Apex Invest" }] }),
  component: SignupPage,
});

function SignupPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 gradient-hero">
      <div className="hidden lg:flex flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl gradient-primary grid place-items-center glow"><Sparkles className="size-5 text-primary-foreground" /></div>
          <span className="font-bold text-lg">Apex Invest</span>
        </Link>
        <div className="space-y-4 max-w-md">
          <h2 className="text-4xl font-bold leading-tight">Start earning in <span className="text-gradient">3 levels</span> today.</h2>
          <p className="text-muted-foreground">Join thousands building passive income through transparent multi-level rewards.</p>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 Apex Invest.</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Account created!"); nav({ to: "/dashboard" }); }}
          className="w-full max-w-md glass rounded-2xl p-8 space-y-5"
        >
          <div><h1 className="text-2xl font-bold">Create account</h1><p className="text-sm text-muted-foreground">Sign up to get a 6-point welcome bonus.</p></div>
          <div className="space-y-2"><Label>Full name</Label><Input required placeholder="Ali Khan" /></div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" required placeholder="you@apex.com" /></div>
          <div className="space-y-2"><Label>Password</Label><Input type="password" required placeholder="••••••••" /></div>
          <div className="space-y-2"><Label>Referral code <span className="text-muted-foreground font-normal">(optional)</span></Label><Input placeholder="APEX-1234" /></div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground glow h-11">Create account</Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-gold hover:underline">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
