import type { SortKey, Workout } from "./types";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export function sortWorkouts(list: Workout[], key: SortKey, ascending: boolean): Workout[] {
  const dir = ascending ? 1 : -1;
  return [...list].sort((a, b) => (a[key] - b[key]) * dir || a.name.localeCompare(b.name));
}