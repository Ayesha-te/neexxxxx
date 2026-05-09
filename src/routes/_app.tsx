import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopBar } from "@/components/app/TopBar";
import { MobileNav } from "@/components/app/MobileNav";
import { Toaster } from "@/components/ui/sonner";
import { AppAuthProvider, useAppAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app")({ component: AppShell });

function AppShell() {
  return (
    <AppAuthProvider>
      <AppLayout />
    </AppAuthProvider>
  );
}

function AppLayout() {
  const { loading, user } = useAppAuth();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="text-center">
          <div className="mx-auto size-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Loading your Nexo workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileNav />
      <Toaster richColors theme="light" position="top-right" />
    </div>
  );
}
