import type { Metadata } from "next";
import { Suspense } from "react";
import { PlanView } from "@/components/PlanView";

export const metadata: Metadata = { title: "My Plan" };

export default function MyPlanPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <Suspense fallback={<p className="py-20 text-center text-sm text-base-content/60">Loading workouts…</p>}>
        <PlanView />
      </Suspense>
    </main>
  );
}