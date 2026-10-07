"use client";

import { NotFoundView } from "@/components/NotFoundView";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
      <NotFoundView code="500" title="Something went wrong" text="An unexpected error happened. Reload to try again." />
      <div className="-mt-16 pb-20 text-center">
        <button type="button" onClick={reset} className="btn btn-outline btn-sm rounded-full">
          Try again
        </button>
      </div>
    </main>
  );
}