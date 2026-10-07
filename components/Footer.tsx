import { Logo } from "./Logo";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-base-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">
        <Logo size="sm" />
        <p className="text-xs text-base-content/50">{BRAND.footer}</p>
      </div>
    </footer>
  );
}