import { Hero } from "@/components/Hero";
import { Library } from "@/components/Library";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-8 sm:px-6">
      <Hero />
      <Library />
    </main>
  );
}
