import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopBar } from "@/components/app/TopBar";
import { MobileNav } from "@/components/app/MobileNav";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
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
      <Toaster richColors theme="dark" position="top-right" />
    </div>
  );
}
