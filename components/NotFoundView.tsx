import Link from "next/link";
import { Compass } from "lucide-react";

export function NotFoundView({
  title = "Page not found",
  text = "That page skipped leg day and disappeared. Head back to the library.",
  code = "404",
}: {
  title?: string;
  text?: string;
  code?: string;
}) {
  return (
    <div className="grid place-items-center py-24 text-center">
      <p className="font-display text-8xl font-bold leading-none tracking-tight text-lime sm:text-9xl">{code}</p>
      <h1 className="mt-4 font-display text-3xl font-semibold uppercase tracking-wide text-white">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-base-content/60">{text}</p>
      <Link href="/" className="btn btn-primary mt-7 rounded-full px-6 text-xs font-bold uppercase tracking-wider">
        <Compass className="size-4" aria-hidden /> Go to workouts
      </Link>
    </div>
  );
}