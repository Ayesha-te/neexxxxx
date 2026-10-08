import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { pageTitle } from "@/lib/brand";
import { getAdminWhatsAppLink } from "@/lib/whatsapp";

type SiteInfoResponse = {
  adminWhatsApp?: string;
};

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: pageTitle("Forgot password") }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [siteInfo, setSiteInfo] = useState<SiteInfoResponse | null>(null);

  useEffect(() => {
    void apiRequest<SiteInfoResponse>("/public/site-info").then(setSiteInfo).catch(() => null);
  }, []);

  return (
    <div className="min-h-screen grid place-items-center gradient-hero p-6">
      <div className="glass w-full max-w-md space-y-5 rounded-2xl p-8">
        <Link to="/" className="w-fit">
          <BrandLockup titleClassName="font-bold" subtitleClassName="tracking-[0.22em]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-sm text-muted-foreground">
            Password resets are handled directly by an admin for your account's security. Message
            Admin on WhatsApp with your registered email and they'll set a new password for you.
          </p>
        </div>
        <a
          href={getAdminWhatsAppLink(
            siteInfo?.adminWhatsApp,
            "Hi, I forgot my NexoRise account password and need it reset. My registered email is: ",
          )}
          target="_blank"
          rel="noreferrer"
        >
          <Button type="button" className="gradient-primary h-11 w-full text-primary-foreground glow">
            <MessageCircle className="mr-2 size-4" /> Contact Admin on WhatsApp
          </Button>
        </a>
        <div className="text-center text-sm text-muted-foreground">
          Remembered?{" "}
          <Link to="/login" className="text-gold hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
