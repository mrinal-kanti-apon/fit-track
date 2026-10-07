"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, SearchX, TriangleAlert } from "lucide-react";
import { useWorkouts } from "@/hooks/useWorkouts";
import { CardSkeleton, WorkoutCard } from "./WorkoutCard";

export function Library() {
  const { data, loading, error, retry } = useWorkouts();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");

  const groups = useMemo(
    () => ["All", ...Array.from(new Set((data ?? []).flatMap((w) => w.muscleGroups))).sort()],
    [data],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data ?? []).filter(
      (w) =>
        (group === "All" || w.muscleGroups.includes(group)) &&
        (!q || w.name.toLowerCase().includes(q) || w.muscleGroups.some((g) => g.toLowerCase().includes(q))),
    );
  }, [data, query, group]);

  return (
    <section id="library" aria-labelledby="library-title" className="pt-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="library-title" className="font-display text-3xl font-semibold uppercase tracking-wide text-white">
            The Library
          </h2>
          <p className="mt-1 text-sm text-base-content/55">Twelve lifts covering every major muscle group.</p>
        </div>

        <label className="relative block w-full sm:w-72">
          <span className="sr-only">Search workouts by name or tag</span>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-base-content/40"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tag"
            className="h-10 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm text-white placeholder:text-base-content/40 focus:border-lime/60 focus:outline-none"
          />
        </label>
      </div>

      {data && (
        <div
          className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filter by muscle group"
        >
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              aria-pressed={group === g}
              className={`shrink-0 rounded-full border px-3.5 py-1 text-xs font-medium transition ${
                group === g
                  ? "border-lime bg-lime text-base-100"
                  : "border-line text-base-content/70 hover:border-lime/40 hover:text-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6">
        {loading && (
          <>
            <div className="mb-5 flex items-center gap-3 text-sm text-base-content/60" role="status">
              <span className="loading loading-ring loading-md text-lime" aria-hidden />
              Loading workouts…
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <CardSkeleton key={i} />
              ))}
            </ul>
          </>
        )}

        {error != null && (
          <div
            className="grid place-items-center gap-3 rounded-2xl border border-line bg-card px-6 py-16 text-center"
            role="alert"
          >
            <TriangleAlert className="size-8 text-warning" aria-hidden />
            <h3 className="font-display text-xl uppercase tracking-wide text-white">Couldn’t load workouts</h3>
            <p className="text-sm text-base-content/60">Check your connection and try again.</p>
            <button type="button" onClick={retry} className="btn btn-primary btn-sm mt-2 rounded-full">
              <RotateCcw className="size-3.5" aria-hidden /> Try again
            </button>
          </div>
        )}

        {data && visible.length > 0 && (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((w, i) => (
              <WorkoutCard key={w.id} workout={w} index={i} />
            ))}
          </ul>
        )}

        {data && visible.length === 0 && (
          <div className="grid place-items-center gap-2 rounded-2xl border border-line bg-card px-6 py-16 text-center">
            <SearchX className="size-8 text-base-content/40" aria-hidden />
            <h3 className="font-display text-xl uppercase tracking-wide text-white">No matches</h3>
            <p className="text-sm text-base-content/60">Try a different name or muscle group.</p>
          </div>
        )}
      </div>
    </section>
  );
}