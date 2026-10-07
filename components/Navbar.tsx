"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { usePlan } from "@/hooks/usePlan";

const LINKS = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const links = (
    <ul className="flex items-center gap-1">
      {LINKS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                active
                  ? "bg-lime/15 text-lime ring-1 ring-lime/20"
                  : "text-base-content/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base-100/80 backdrop-blur-xl">
      <nav
        className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-y-3 px-4 py-3 sm:px-6 md:grid-cols-[1fr_auto_1fr]"
        aria-label="Main"
      >
        <Logo />

        {/* Mobile: links sit on their own row; desktop: centered */}
        <div className="order-3 col-span-2 flex justify-center md:order-none md:col-span-1">{links}</div>

        <div className="flex items-center justify-end gap-4 text-xs">
          <Link
            href="/my-plan"
            className="group flex items-center gap-2 text-base-content/80 hover:text-white"
            aria-label={`Today's plan, ${plan.length} workouts`}
          >
            Plan
            <span
              key={plan.length}
              className="grid min-w-6 animate-pop place-items-center rounded-full bg-lime px-1.5 py-0.5 text-[11px] font-bold text-base-100"
            >
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="group flex items-center gap-2 text-base-content/80 hover:text-white"
            aria-label={`Saved, ${saved.length} workouts`}
          >
            Saved
            <span
              key={saved.length}
              className="grid min-w-6 animate-pop place-items-center rounded-full border border-white/25 px-1.5 py-0.5 text-[11px] font-semibold text-white"
            >
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}