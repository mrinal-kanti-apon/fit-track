import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function LogoMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 19 19 5" />
      <path d="m3.5 14.5 6 6M2 16l6 6M14.5 3.5l6 6M16 2l6 6" />
    </svg>
  );
}

export function Logo({ size = "md" }: { size?: "md" | "sm" }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 text-lime" aria-label={`${BRAND.name} home`}>
      <LogoMark className={size === "md" ? "size-6" : "size-5"} />
      <span
        className={`font-display font-semibold uppercase tracking-wide text-white ${
          size === "md" ? "text-xl" : "text-base"
        }`}
      >
        {BRAND.name}
      </span>
    </Link>
  );
}