"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProjectGallery({
  images,
  name,
  url,
}: {
  images: readonly string[];
  name: string;
  url: string;
}) {
  const [active, setActive] = useState(0);
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  return (
    <div>
      <div className="browser-frame">
        <div className="browser-bar">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-url">{host || "internal platform"}</span>
        </div>
        <div className="relative aspect-[2/1] bg-white">
          <Image
            key={images[active]}
            src={images[active]}
            alt={`${name} screenshot ${active + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-contain object-center"
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show screenshot ${index + 1} of ${name}`}
              aria-pressed={index === active}
              className={`relative aspect-[16/10] w-24 overflow-hidden rounded border transition ${
                index === active
                  ? "border-foreground"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
