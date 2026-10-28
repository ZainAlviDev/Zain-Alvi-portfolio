"use client";

import { useState } from "react";
import { OPEN_CHAT_EVENT } from "@/components/ChatWidget";
import { profile } from "@/data/profile";

const navItems = [
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0e1116] text-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {profile.name}
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-white/65 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
            className="flex items-center gap-1.5 text-[13px] text-white/65 transition hover:text-white"
          >
            Ask AI
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.cv}
            download
            className="hidden items-center rounded-md bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#0e1116] transition hover:bg-white/85 sm:inline-flex"
          >
            Download CV
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-md border border-white/20 md:hidden"
          >
            <span
              className={`h-px w-4 bg-white transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span className={`h-px w-4 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-4 bg-white transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#0e1116] px-5 py-2 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-white"
            >
              {item.label}
            </a>
          ))}
          <a href={profile.cv} download className="block py-3 text-sm font-medium text-white">
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
}
