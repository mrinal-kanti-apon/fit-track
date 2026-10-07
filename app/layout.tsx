import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "@fontsource-variable/oswald";
import "@fontsource-variable/inter";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: { default: `${BRAND.name} — Workout Library`, template: `%s · ${BRAND.name}` },
  description: BRAND.description,
};

export const viewport: Viewport = { themeColor: "#0b0d12", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="fittrack">
      <body className="flex min-h-screen flex-col">
        <ToastProvider>
          <Suspense
            fallback={
              <header className="sticky top-0 z-50 border-b border-line bg-base-100/80 px-4 py-3 backdrop-blur-xl sm:px-6">
                <div className="mx-auto max-w-6xl">
                  <Logo />
                </div>
              </header>
            }
          >
            <Navbar />
          </Suspense>
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}