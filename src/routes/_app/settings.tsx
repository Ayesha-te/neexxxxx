import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: pageTitle("Settings") }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account, security and preferences.</p>
      </div>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="glass">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="kyc">KYC</TabsTrigger>
          <TabsTrigger value="notif">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="glass border-border/40">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="size-20 ring-2 ring-gold/40">
                  <AvatarFallback className="gradient-primary text-primary-foreground text-xl">
                    AK
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline">Change photo</Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <Input defaultValue="Ali Khan" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="ali@apex.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+92 300 0000000" />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input defaultValue="Pakistan" />
                </div>
              </div>
              <Button
                onClick={() => toast.success("Profile updated")}
                className="gradient-primary text-primary-foreground"
              >
                Save changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="glass border-border/40">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Current password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm new password</Label>
                <Input type="password" />
              </div>
              <Button
                onClick={() => toast.success("Password updated")}
                className="gradient-primary text-primary-foreground"
              >
                Update password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyc">
          <Card className="glass border-border/40">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>CNIC / National ID</Label>
                <Input placeholder="00000-0000000-0" />
              </div>
              <div className="space-y-2">
                <Label>Upload ID document</Label>
                <Input type="file" />
              </div>
              <Button
                onClick={() => toast.success("KYC submitted for review")}
                className="gradient-gold text-gold-foreground"
              >
                Submit for verification
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notif">
          <Card className="glass border-border/40">
            <CardContent className="p-6 space-y-5">
              {[
                ["Email updates", "Investment & earnings emails"],
                ["Push notifications", "Real-time activity alerts"],
                ["Marketing", "New plans and promotions"],
              ].map(([t, s]) => (
                <div key={t} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-sm text-muted-foreground">{s}</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
