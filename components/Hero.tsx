import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-line bg-card">
      {/* soft lime glow behind the banner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 size-[28rem] -translate-y-1/2 rounded-full bg-lime/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_right,transparent,black_70%)]"
      />

      <div className="grid items-center gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1.3fr_1fr] md:py-14 lg:grid-cols-[1.7fr_1fr] lg:px-14">
        <div className="animate-rise">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-lime">Workout Library</p>
          <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-base-content/65">{BRAND.description}</p>
          <a
            href="#library"
            className="btn btn-primary mt-8 h-11 rounded-lg border-0 px-6 text-xs font-bold uppercase tracking-wider shadow-[0_8px_30px_-8px_rgba(204,255,0,0.55)] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Browse workouts
            <ArrowDownRight className="size-4" aria-hidden />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs md:max-w-sm">
          <Image
            src="/banner.png"
            alt="Anatomical model performing a preacher curl"
            width={868}
            height={900}
            priority
            sizes="(min-width: 768px) 384px, 70vw"
            className="relative h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
          />
        </div>
      </div>
    </section>
  );
}