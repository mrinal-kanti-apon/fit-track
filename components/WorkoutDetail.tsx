"use client";

import { Bookmark, BookmarkCheck, CalendarCheck, CalendarPlus, RotateCcw } from "lucide-react";
import { NotFoundError } from "@/lib/api";
import { PLAN_CAP } from "@/lib/brand";
import { usePlan } from "@/hooks/usePlan";
import { useWorkout } from "@/hooks/useWorkouts";
import { NotFoundView } from "./NotFoundView";
import { TagPill } from "./WorkoutCard";
import { WorkoutImage } from "./WorkoutImage";

export function DetailSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12" role="status" aria-label="Loading workout">
      <div className="skeleton aspect-[4/5] w-full rounded-2xl bg-base-300/60" />
      <div className="space-y-4">
        <div className="skeleton h-10 w-3/4 bg-base-300/60" />
        <div className="skeleton h-4 w-full bg-base-300/60" />
        <div className="skeleton h-4 w-2/3 bg-base-300/60" />
        <div className="skeleton h-64 w-full rounded-2xl bg-base-300/60" />
      </div>
    </div>
  );
}

export function WorkoutDetail({ id }: { id: string }) {
  const { data: w, loading, error, retry } = useWorkout(id);
  const { plan, saved, planFull, addToPlan, save } = usePlan();

  if (loading) return <DetailSkeleton />;

  if (error instanceof NotFoundError) {
    return (
      <NotFoundView
        title="Workout not found"
        text="We couldn’t find that lift. Pick another one from the library."
      />
    );
  }

  if (error || !w) {
    return (
      <div className="grid place-items-center gap-3 py-24 text-center" role="alert">
        <h1 className="font-display text-2xl uppercase tracking-wide text-white">Couldn’t load this workout</h1>
        <button type="button" onClick={retry} className="btn btn-primary btn-sm rounded-full">
          <RotateCcw className="size-3.5" aria-hidden /> Try again
        </button>
      </div>
    );
  }

  const inPlan = plan.includes(w.id);
  const isSaved = saved.includes(w.id);
  const blocked = inPlan || planFull;

  const specs: [string, string][] = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", String(w.sets)],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.caloriesBurned} kcal`],
    ["Rating", w.rating.toFixed(1)],
  ];

  return (
    <article className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-card shadow-[0_30px_80px_-30px_rgba(204,255,0,0.18)]">
          <WorkoutImage
            src={w.image}
            alt={`${w.name} illustration`}
            sizes="(min-width: 1024px) 560px, 100vw"
            priority
          />
        </div>
      </div>

      <div className="animate-rise">
        <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
          {w.name}
        </h1>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-base-content/65">{w.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {w.muscleGroups.map((g) => (
            <TagPill key={g}>{g}</TagPill>
          ))}
        </div>

        <dl className="mt-7 overflow-hidden rounded-2xl border border-line bg-card">
          {specs.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-line px-5 py-3.5 text-sm last:border-b-0"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-base-content/50">{label}</dt>
              <dd className="font-medium text-white">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-9 text-sm font-bold uppercase tracking-wider text-white">Instructions</h2>
        <ol className="mt-4 space-y-3">
          {w.instructions.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-base-content/75">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime/15 text-[11px] font-bold text-lime">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => addToPlan(w.name, w.id)}
            disabled={blocked}
            className="btn btn-primary h-11 rounded-lg px-5 text-sm font-semibold disabled:border-line disabled:bg-card disabled:text-base-content/50"
          >
            {inPlan ? <CalendarCheck className="size-4" aria-hidden /> : <CalendarPlus className="size-4" aria-hidden />}
            {inPlan ? "In today's plan" : planFull ? `Plan full (${PLAN_CAP}/${PLAN_CAP})` : "Add to today's plan"}
          </button>
          <button
            type="button"
            onClick={() => save(w.name, w.id)}
            disabled={isSaved}
            className="btn btn-outline h-11 rounded-lg border-white/20 px-5 text-sm font-medium text-white hover:border-lime hover:bg-transparent hover:text-lime disabled:border-line disabled:bg-card disabled:text-base-content/50"
          >
            {isSaved ? <BookmarkCheck className="size-4" aria-hidden /> : <Bookmark className="size-4" aria-hidden />}
            {isSaved ? "Saved" : "Save for later"}
          </button>
        </div>
        {planFull && !inPlan && (
          <p className="mt-3 text-xs text-warning">
            Today’s plan is capped at {PLAN_CAP} lifts. Finish or remove one to add more.
          </p>
        )}
      </div>
    </article>
  );
}