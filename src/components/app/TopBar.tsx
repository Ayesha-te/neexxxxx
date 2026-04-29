import { Bell, Search, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function TopBar() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);
  return (
    <header className="sticky top-0 z-30 glass border-b border-border/50 px-4 lg:px-8 py-3 flex items-center gap-3">
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="size-5" />
      </Button>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input placeholder="Search plans, transactions…" className="pl-9 bg-input/50 border-border/50" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)}>
          {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-gold" />
        </Button>
        <div className="flex items-center gap-2 pl-2">
          <Avatar className="size-9 ring-2 ring-primary/40">
            <AvatarFallback className="gradient-primary text-primary-foreground font-semibold">AK</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold leading-tight">Ali Khan</div>
            <div className="text-xs text-muted-foreground">Level 5 · Gold</div>
          </div>
        </div>
      </div>
    </header>
  );
}
