import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: pageTitle("Forgot password") }] }),
  component: ForgotPage,
});

function ForgotPage() {
  return (
    <div className="min-h-screen grid place-items-center gradient-hero p-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          toast.success("Reset link sent to your email.");
        }}
        className="glass w-full max-w-md space-y-5 rounded-2xl p-8"
      >
        <Link to="/" className="w-fit">
          <BrandLockup titleClassName="font-bold" subtitleClassName="tracking-[0.22em]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-sm text-muted-foreground">We&apos;ll email you a recovery link.</p>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" required placeholder="you@nexo.com" />
        </div>
        <Button type="submit" className="gradient-primary h-11 w-full text-primary-foreground glow">
          Send reset link
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Remembered?{" "}
          <Link to="/login" className="text-gold hover:underline">
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
