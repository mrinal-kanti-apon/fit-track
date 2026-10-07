import type { Workout } from "./types";

// Primary API first, alternative API as an automatic fallback.
const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export class NotFoundError extends Error {
  constructor() {
    super("Workout not found");
    this.name = "NotFoundError";
  }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let lastError: unknown = new Error("Request failed");

  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { signal });
      if (res.status === 404) throw new NotFoundError();
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return (await res.json()) as T;
    } catch (err) {
      // A 404 or a cancelled request is final, so do not try the fallback.
      if (err instanceof NotFoundError) throw err;
      if (err instanceof DOMException && err.name === "AbortError") throw err;
      lastError = err;
    }
  }
  throw lastError;
}

export async function getWorkouts(signal?: AbortSignal): Promise<Workout[]> {
  const data = await request<Workout[]>("", signal);
  if (!Array.isArray(data)) throw new Error("Unexpected response");
  return data;
}

export async function getWorkout(id: string, signal?: AbortSignal): Promise<Workout> {
  const data = await request<Workout>(`/${encodeURIComponent(id)}`, signal);
  if (!data || typeof data !== "object" || typeof data.id !== "number") {
    throw new NotFoundError();
  }
  return data;
}