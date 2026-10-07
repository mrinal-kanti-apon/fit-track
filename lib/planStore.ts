import { PLAN_CAP } from "./brand";

export interface PlanState {
  plan: number[]; // workout ids in today's plan
  saved: number[]; // workout ids saved for later
  done: number[]; // plan ids marked as done
}

export type AddResult = "added" | "exists" | "full";

const KEY = "fittrack:v1";
const EMPTY: PlanState = { plan: [], saved: [], done: [] };

let state: PlanState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

const isIdList = (v: unknown): v is number[] =>
  Array.isArray(v) && v.every((n) => typeof n === "number");

function read(): PlanState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw);
    if (isIdList(p?.plan) && isIdList(p?.saved) && isIdList(p?.done)) {
      return { plan: p.plan.slice(0, PLAN_CAP), saved: p.saved, done: p.done };
    }
  } catch {
    /* corrupted or blocked storage: start fresh */
  }
  return EMPTY;
}

function commit(next: PlanState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage may be unavailable (private mode): keep in memory */
  }
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = read();
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      state = read();
      listeners.forEach((l) => l());
    }
  });
}

export const planStore = {
  subscribe(listener: () => void) {
    hydrate();
    listeners.add(listener);
    // State may have been hydrated after the first server-matching render.
    queueMicrotask(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => state,
  getServerSnapshot: () => EMPTY,

  addToPlan(id: number): AddResult {
    if (state.plan.includes(id)) return "exists";
    if (state.plan.length >= PLAN_CAP) return "full";
    commit({ ...state, plan: [...state.plan, id] });
    return "added";
  },
  save(id: number): AddResult {
    if (state.saved.includes(id)) return "exists";
    commit({ ...state, saved: [...state.saved, id] });
    return "added";
  },
  removeFromPlan(id: number) {
    commit({
      ...state,
      plan: state.plan.filter((n) => n !== id),
      done: state.done.filter((n) => n !== id),
    });
  },
  removeFromSaved(id: number) {
    commit({ ...state, saved: state.saved.filter((n) => n !== id) });
  },
  markDone(id: number) {
    if (!state.plan.includes(id) || state.done.includes(id)) return;
    commit({ ...state, done: [...state.done, id] });
  },
};