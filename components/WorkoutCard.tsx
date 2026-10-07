import Link from "next/link";
import type { Workout } from "@/lib/types";
import { WorkoutImage } from "./WorkoutImage";
import { WorkoutStats } from "./WorkoutStats";

export function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-lime px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-base-100">
      {children}
    </span>
  );
}

export function WorkoutCard({ workout, index = 0 }: { workout: Workout; index?: number }) {
  return (
    <li className="animate-rise" style={{ animationDelay: `${Math.min(index, 11) * 40}ms` }}>
      <Link
        href={`/workouts/${workout.id}`}
        className="group block overflow-hidden rounded-2xl border border-line bg-card transition duration-300 hover:-translate-y-1 hover:border-lime/50 hover:shadow-[0_20px_50px_-20px_rgba(204,255,0,0.25)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-base-200">
          <WorkoutImage
            src={workout.image}
            alt={`${workout.name} illustration`}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2.5 p-4">
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((g) => (
              <TagPill key={g}>{g}</TagPill>
            ))}
          </div>
          <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white transition group-hover:text-lime">
            {workout.name}
          </h3>
          <p className="text-xs text-base-content/55">{workout.equipment}</p>
          <WorkoutStats workout={workout} className="border-t border-line pt-3" />
        </div>
      </Link>
    </li>
  );
}

export function CardSkeleton() {
  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-card" aria-hidden>
      <div className="skeleton aspect-[16/9] w-full rounded-none bg-base-300/60" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-24 bg-base-300/60" />
        <div className="skeleton h-5 w-3/4 bg-base-300/60" />
        <div className="skeleton h-3 w-1/3 bg-base-300/60" />
        <div className="skeleton h-3 w-full bg-base-300/60" />
      </div>
    </li>
  );
}