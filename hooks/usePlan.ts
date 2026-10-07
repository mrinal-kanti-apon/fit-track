"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PLAN_CAP } from "@/lib/brand";
import { planStore } from "@/lib/planStore";
import { useToast } from "@/components/ToastProvider";

/** Plan / saved state (persisted in localStorage) plus toast-aware actions. */
export function usePlan() {
  const state = useSyncExternalStore(
    planStore.subscribe,
    planStore.getSnapshot,
    planStore.getServerSnapshot,
  );
  const toast = useToast();

  const addToPlan = useCallback(
    (name: string, id: number) => {
      const result = planStore.addToPlan(id);
      if (result === "added") toast(`${name} added to today's plan`);
      else if (result === "exists") toast(`${name} is already in today's plan`, "info");
      else toast(`Plan is full — ${PLAN_CAP} lifts max. Finish one to make room.`, "warning");
      return result;
    },
    [toast],
  );

  const save = useCallback(
    (name: string, id: number) => {
      const result = planStore.save(id);
      if (result === "added") toast(`${name} saved for later`);
      else toast(`${name} is already saved`, "info");
      return result;
    },
    [toast],
  );

  const removeFromPlan = useCallback(
    (name: string, id: number) => {
      planStore.removeFromPlan(id);
      toast(`${name} removed from today's plan`, "info");
    },
    [toast],
  );

  const removeFromSaved = useCallback(
    (name: string, id: number) => {
      planStore.removeFromSaved(id);
      toast(`${name} removed from saved`, "info");
    },
    [toast],
  );

  const markDone = useCallback(
    (name: string, id: number) => {
      planStore.markDone(id);
      toast(`${name} marked as done. Nice work!`);
    },
    [toast],
  );

  return {
    ...state,
    planFull: state.plan.length >= PLAN_CAP,
    addToPlan,
    save,
    removeFromPlan,
    removeFromSaved,
    markDone,
  };
}