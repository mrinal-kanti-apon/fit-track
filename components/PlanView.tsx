"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Check, ChevronDown, RotateCcw, X } from "lucide-react";
import { PLAN_CAP } from "@/lib/brand";
import { SORT_OPTIONS, sortWorkouts } from "@/lib/sort";
import type { SortKey, Workout } from "@/lib/types";
import { usePlan } from "@/hooks/usePlan";
import { useWorkouts } from "@/hooks/useWorkouts";
import { WorkoutStats } from "./WorkoutStats";

type Tab = "plan" | "saved";

function Metric({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="px-5 py-5 sm:px-8">
      <p className="text-xs text-base-content/55">{label}</p>
      <p className={`mt-1 font-display text-4xl font-semibold tabular-nums ${accent ? "text-lime" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function Row({
  workout,
  tab,
  done,
  onDone,
  onRemove,
}: {
  workout: Workout;
  tab: Tab;
  done: boolean;
  onDone: () => void;
  onRemove: () => void;
}) {
  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl border border-line bg-card p-3 transition sm:flex-row sm:items-center ${
        done ? "opacity-60" : "hover:border-lime/30"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-base-200">
          <Image src={workout.image} alt="" fill sizes="112px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <h3
            className={`truncate font-display text-base font-semibold uppercase tracking-wide text-white ${
              done ? "line-through decoration-lime/60" : ""
            }`}
          >
            {workout.name}
          </h3>
          <p className="mt-0.5 truncate text-xs text-base-content/55">{workout.equipment}</p>
          <WorkoutStats workout={workout} className="mt-1.5" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="btn btn-outline btn-sm h-9 rounded-full border-white/20 px-4 text-xs font-medium text-white hover:border-lime hover:bg-transparent hover:text-lime"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            type="button"
            onClick={onDone}
            disabled={done}
            className="btn btn-primary btn-sm h-9 rounded-full px-4 text-xs font-bold disabled:border-line disabled:bg-base-300 disabled:text-lime"
          >
            <Check className="size-3.5" aria-hidden /> {done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="btn btn-ghost btn-sm btn-circle size-9 text-base-content/50 hover:bg-white/10 hover:text-white"
          aria-label={`Remove ${workout.name}`}
        >
          <X className="size-4" />
        </button>
      </div>
    </li>
  );
}

export function PlanView() {
  const params = useSearchParams();
  const [tabChoice, setTabChoice] = useState<Tab | null>(null);
  const tab: Tab = tabChoice ?? (params.get("tab") === "saved" ? "saved" : "plan");

  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [ascending, setAscending] = useState(true);

  const { data, loading, error, retry } = useWorkouts();
  const { plan, saved, done, markDone, removeFromPlan, removeFromSaved } = usePlan();

  const byId = useMemo(() => new Map((data ?? []).map((w) => [w.id, w])), [data]);
  const pick = (ids: number[]) => ids.map((id) => byId.get(id)).filter((w): w is Workout => Boolean(w));

  const planItems = pick(plan);
  const savedItems = pick(saved);
  const list = useMemo(
    () => sortWorkouts(tab === "plan" ? planItems : savedItems, sortKey, ascending),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tab, plan, saved, byId, sortKey, ascending],
  );

  // Metrics always describe today's plan and update live.
  const minutes = planItems.reduce((n, w) => n + w.duration, 0);
  const calories = planItems.reduce((n, w) => n + w.caloriesBurned, 0);
  const doneCount = planItems.filter((w) => done.includes(w.id)).length;

  return (
    <>
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">My Plan</h1>
      <p className="mt-1.5 text-sm text-base-content/55">Cap of five lifts for today. Finish them, then load more.</p>

      <section aria-label="Plan summary" className="mt-6 overflow-hidden rounded-2xl border border-line bg-card">
        <div className="grid grid-cols-3 divide-x divide-line">
          <Metric label="Exercises" value={planItems.length} accent />
          <Metric label="Minutes" value={minutes} />
          <Metric label="Calories" value={calories} />
        </div>
        <div className="flex items-center gap-3 border-t border-line px-5 py-3 text-xs text-base-content/55 sm:px-8">
          <progress
            className="progress progress-primary h-1.5 flex-1 bg-base-300"
            value={planItems.length}
            max={PLAN_CAP}
            aria-label="Plan capacity"
          />
          <span className="tabular-nums">
            {planItems.length}/{PLAN_CAP} slots · {doneCount} done
          </span>
        </div>
      </section>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Plan tabs" className="inline-flex rounded-xl border border-line bg-card p-1">
          {(
            [
              ["plan", "Today's Plan"],
              ["saved", "Saved"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              type="button"
              aria-selected={tab === key}
              onClick={() => setTabChoice(key)}
              className={`rounded-lg px-4 py-1.5 text-xs font-medium transition ${
                tab === key ? "bg-base-300 text-white shadow-inner" : "text-base-content/55 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-base-content/55">
          <label htmlFor="sort" className="mr-1">
            Sort By
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="h-9 appearance-none rounded-lg border border-line bg-card pl-3 pr-8 text-xs font-medium text-white focus:border-lime/60 focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2"
              aria-hidden
            />
          </div>
          <button
            type="button"
            onClick={() => setAscending((v) => !v)}
            className="grid size-9 place-items-center rounded-lg border border-line bg-card text-white transition hover:border-lime/50"
            aria-label={
              ascending ? "Sorted low to high. Switch to high to low" : "Sorted high to low. Switch to low to high"
            }
            title={ascending ? "Low to high" : "High to low"}
          >
            {ascending ? <ArrowUpNarrowWide className="size-4" /> : <ArrowDownWideNarrow className="size-4" />}
          </button>
        </div>
      </div>

      <div className="mt-4" role="tabpanel">
        {loading && (
          <div
            className="grid place-items-center gap-3 rounded-2xl border border-line bg-card py-20 text-sm text-base-content/60"
            role="status"
          >
            <span className="loading loading-ring loading-lg text-lime" aria-hidden />
            Loading workouts…
          </div>
        )}

        {error != null && (
          <div
            className="grid place-items-center gap-3 rounded-2xl border border-line bg-card py-16 text-center"
            role="alert"
          >
            <p className="text-sm text-base-content/70">Couldn’t load your workouts.</p>
            <button type="button" onClick={retry} className="btn btn-primary btn-sm rounded-full">
              <RotateCcw className="size-3.5" aria-hidden /> Try again
            </button>
          </div>
        )}

        {data && list.length === 0 && (
          <div className="grid place-items-center gap-2 rounded-2xl border border-line bg-card px-6 py-20 text-center">
            <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-white">Nothing here yet</h2>
            <p className="text-xs text-base-content/55">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/"
              className="btn btn-primary mt-3 rounded-full px-6 text-xs font-bold shadow-[0_8px_30px_-8px_rgba(204,255,0,0.55)]"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {data && list.length > 0 && (
          <ul className="space-y-3">
            {list.map((w) => (
              <Row
                key={w.id}
                workout={w}
                tab={tab}
                done={done.includes(w.id)}
                onDone={() => markDone(w.name, w.id)}
                onRemove={() => (tab === "plan" ? removeFromPlan(w.name, w.id) : removeFromSaved(w.name, w.id))}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}