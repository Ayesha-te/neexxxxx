import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, GraduationCap, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { apiRequest } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";
import { courses, totalCourses } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_app/courses")({
  head: () => ({ meta: [{ title: pageTitle("Courses") }] }),
  component: MemberCoursesPage,
});

const WHATSAPP_CHANNEL_URL =
  "https://whatsapp.com/channel/0029VbClmg56LwHqK2IXYy1Y?utm_source=chatgpt.com";

function MemberCoursesPage() {
  const { token } = useAppAuth();
  const [seatOpen, setSeatOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", qualification: "" });
  const [agreed, setAgreed] = useState(false);

  const handleConfirmSeat = async () => {
    if (!token) return;
    if (!form.name.trim() || !form.age || !form.qualification.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    const age = Number(form.age);
    if (!Number.isFinite(age) || age <= 0) {
      toast.error("Enter a valid age.");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the training policy to continue.");
      return;
    }

    setSubmitting(true);
    try {
      await apiRequest("/user/training/confirm-seat", {
        method: "POST",
        token,
        body: { name: form.name.trim(), age, qualification: form.qualification.trim() },
      });
      setSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to confirm your seat.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <div className="dashboard-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <GraduationCap className="size-3.5" /> Member Learning Center
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Courses</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalCourses}+ practical courses across {Object.keys(courses).length} categories, free
            for every NexoRise member.
          </p>
        </div>
        <Button
          onClick={() => {
            setSeatOpen(true);
            setSubmitted(false);
          }}
          className="gradient-primary text-primary-foreground"
        >
          <GraduationCap className="mr-2 size-4" /> Confirm Your Seat
        </Button>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
        Beginner Level Training sessions are scheduled weekly. Confirm your seat above to reserve
        your place and get access to the training WhatsApp Channel.
      </div>

      <div className="space-y-6">
        {Object.entries(courses).map(([key, category]) => (
          <section key={key} className="dashboard-panel p-5 sm:p-6">
            <h2 className="section-title">
              <span className="text-xl">{category.icon}</span> {category.name.replace(/^\S+\s/, "")}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.courses.map((courseName) => (
                <div
                  key={courseName}
                  className="flex items-start gap-3 rounded-xl bg-muted/50 p-4 transition-colors hover:bg-muted"
                >
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <BookOpen className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{courseName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Included with your NexoRise membership.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Dialog open={seatOpen} onOpenChange={setSeatOpen}>
        <DialogContent>
          {submitted ? (
            <div className="space-y-4 text-center">
              <DialogHeader>
                <DialogTitle>Congratulations! Your seat has been reserved.</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                WhatsApp Channel ko follow karein aur active rahein, kyun ke tamam training
                sessions aur updates isi channel par provide ki jayengi.
              </p>
              <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noreferrer">
                <Button className="gradient-primary w-full text-primary-foreground">
                  <MessageCircle className="mr-2 size-4" /> NexoRise WhatsApp Channel
                </Button>
              </a>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Your Seat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input
                    type="number"
                    value={form.age}
                    onChange={(event) => setForm((current) => ({ ...current, age: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Qualification</Label>
                  <Input
                    value={form.qualification}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, qualification: event.target.value }))
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Agar member ek dafa confirmed training seat skip karta hai ya given time par
                  training attend nahi karta, to usay next week's training session ke liye dobara
                  seat confirm karni hogi.
                </p>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={agreed} onCheckedChange={(value) => setAgreed(Boolean(value))} />
                  I Agree
                </label>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => void handleConfirmSeat()}
                  disabled={submitting}
                  className="gradient-primary w-full text-primary-foreground"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
