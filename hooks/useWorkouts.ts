"use client";

import { getWorkout, getWorkouts } from "@/lib/api";
import { useAsync } from "./useAsync";

export const useWorkouts = () => useAsync("all", getWorkouts);
export const useWorkout = (id: string) => useAsync(`one:${id}`, (signal) => getWorkout(id, signal));