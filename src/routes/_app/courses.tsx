import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, GraduationCap } from "lucide-react";
import { pageTitle } from "@/lib/brand";
import { featuredCourses } from "@/lib/featuredCourses";

export const Route = createFileRoute("/_app/courses")({
  head: () => ({ meta: [{ title: pageTitle("Courses") }] }),
  component: MemberCoursesPage,
});

function MemberCoursesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <div className="dashboard-panel p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <GraduationCap className="size-3.5" /> Member Learning Center
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Courses</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {featuredCourses.length} practical courses included free with your NexoRise membership.
        </p>
      </div>

      <section className="dashboard-panel p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((courseName) => (
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
    </div>
  );
}
