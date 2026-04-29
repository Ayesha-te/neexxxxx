import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — Apex Invest" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  return (
    <div className="min-h-screen grid place-items-center gradient-hero p-6">
      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Reset link sent to your email."); }}
        className="w-full max-w-md glass rounded-2xl p-8 space-y-5"
      >
        <Link to="/" className="flex items-center gap-2"><div className="size-9 rounded-xl gradient-primary grid place-items-center glow"><Sparkles className="size-5 text-primary-foreground" /></div><span className="font-bold">Apex Invest</span></Link>
        <div><h1 className="text-2xl font-bold">Reset password</h1><p className="text-sm text-muted-foreground">We'll email you a recovery link.</p></div>
        <div className="space-y-2"><Label>Email</Label><Input type="email" required placeholder="you@apex.com" /></div>
        <Button type="submit" className="w-full gradient-primary text-primary-foreground glow h-11">Send reset link</Button>
        <div className="text-center text-sm text-muted-foreground">
          Remembered? <Link to="/login" className="text-gold hover:underline">Back to sign in</Link>
        </div>
      </form>
    </div>
  );
}
