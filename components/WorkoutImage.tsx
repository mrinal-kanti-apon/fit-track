"use client";

import Image from "next/image";
import { useState } from "react";
import { Dumbbell } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}

/** Remote workout image with a graceful fallback if the URL fails. */
export function WorkoutImage({ src, alt, className = "", sizes, priority }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        className={`grid place-items-center bg-linear-to-br from-base-300 to-base-200 text-lime/60 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Dumbbell className="size-10" aria-hidden />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailedSrc(src)}
      className={`object-cover ${className}`}
    />
  );
}