import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

export function WorkoutStats({ workout, className = "" }: { workout: Workout; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[11px] text-base-content/70 ${className}`}>
      <li className="flex items-center gap-1.5">
        <Clock className="size-3.5 text-lime" aria-hidden />
        <span className="sr-only">Duration:</span>
        {workout.duration} min
      </li>
      <li className="flex items-center gap-1.5">
        <Flame className="size-3.5 text-lime" aria-hidden />
        <span className="sr-only">Calories:</span>
        {workout.caloriesBurned} kcal
      </li>
      <li className="flex items-center gap-1.5">
        <Star className="size-3.5 text-lime" aria-hidden />
        <span className="sr-only">Rating:</span>
        {workout.rating.toFixed(1)}
      </li>
    </ul>
  );
}