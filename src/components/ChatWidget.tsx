"use client";

import { useEffect, useState } from "react";
import ChatPanel from "@/components/ChatPanel";

export const OPEN_CHAT_EVENT = "open-chat";

function RobotIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <line x1="24" y1="5" x2="24" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="4.5" r="2.6" fill="#7dd3a8" />
      <rect x="9" y="11" width="30" height="25" rx="9" fill="currentColor" />
      <rect x="4" y="19" width="5" height="10" rx="2.5" fill="currentColor" />
      <rect x="39" y="19" width="5" height="10" rx="2.5" fill="currentColor" />
      <rect x="13" y="16" width="22" height="15" rx="6" fill="#0e1116" />
      <circle cx="19.5" cy="22.5" r="2.6" fill="#7dd3a8" className="robot-eye" />
      <circle cx="28.5" cy="22.5" r="2.6" fill="#7dd3a8" className="robot-eye" />
      <path d="M20 27.5c1.2 1.3 2.5 1.9 4 1.9s2.8-.6 4-1.9" stroke="#7dd3a8" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="16" y="37" width="16" height="6" rx="3" fill="currentColor" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const openChat = () => {
      setOpen(true);
      setHint(false);
    };
    window.addEventListener(OPEN_CHAT_EVENT, openChat);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    // The hint is a one-time nudge: it never lingers over content once you scroll.
    const dismiss = () => {
      if (window.scrollY > 120) setHint(false);
    };
    window.addEventListener("scroll", dismiss, { passive: true });

    const show = setTimeout(() => setHint(true), 4000);
    const hide = setTimeout(() => setHint(false), 10000);
    return () => {
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener(OPEN_CHAT_EVENT, openChat);
      window.removeEventListener("keydown", onKey);
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    // The wrapper itself must never catch taps: when the chat is closed its (invisible)
    // window still takes up space and would otherwise sit on top of the page's buttons.
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Chat window stays mounted so the conversation survives closing. */}
      <div
        inert={!open}
        className={`origin-bottom-right transition-all duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        } h-[min(75vh,34rem)] w-[min(calc(100vw-2rem),24rem)]`}
        aria-hidden={!open}
      >
        <ChatPanel onClose={() => setOpen(false)} />
      </div>

      {hint && !open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setHint(false);
          }}
          className="chat-hint pointer-events-auto relative max-w-[15rem] rounded-2xl rounded-br-sm border border-border bg-surface px-4 py-3 text-left text-sm text-foreground shadow-lg"
        >
          Hi! I&apos;m Zain&apos;s AI. Ask me anything about his work.
        </button>
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          setHint(false);
        }}
        aria-label={open ? "Close chat" : "Chat with Zain's AI"}
        aria-expanded={open}
        className="robot-launcher pointer-events-auto group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2b5c93] to-[#16314f] text-white shadow-[0_12px_30px_-8px_rgba(22,49,79,0.7)] transition hover:scale-105"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#2b5c93]/40 [animation-duration:2.6s]" />}
        {open ? (
          <span className="relative text-2xl leading-none">×</span>
        ) : (
          <RobotIcon className="robot-bob relative h-9 w-9 text-white" />
        )}
      </button>
    </div>
  );
}
