import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: pageTitle("Sign up") }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-2 gradient-hero">
      <div className="hidden flex-col justify-between p-12 lg:flex">
        <Link to="/" className="w-fit">
          <BrandLockup titleClassName="text-lg font-bold" subtitleClassName="tracking-[0.22em]" />
        </Link>
        <div className="max-w-md space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Where women <span className="text-gradient">lead, earn and rise</span> together.
          </h2>
          <p className="text-muted-foreground">
            Create your account to explore growth plans, rewards, and referral milestones in the
            Nexo experience.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 Nexo Women Empowerment.</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            toast.success("Account created!");
            navigate({ to: "/dashboard" });
          }}
          className="glass w-full max-w-md space-y-5 rounded-2xl p-8"
        >
          <div>
            <h1 className="text-2xl font-bold">Create account</h1>
            <p className="text-sm text-muted-foreground">Sign up to begin your Nexo journey.</p>
          </div>
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input required placeholder="Ali Khan" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" required placeholder="you@nexo.com" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" required placeholder="********" />
          </div>
          <div className="space-y-2">
            <Label>
              Referral code <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input placeholder="NEXO-1234" />
          </div>
          <Button
            type="submit"
            className="gradient-primary h-11 w-full text-primary-foreground glow"
          >
            Create account
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
