"use client";

import { useEffect, useRef, useState } from "react";
import { STARTERS, reply } from "@/lib/bot";

type Message = { role: "user" | "assistant"; content: string };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Avatar() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3b73b0] to-[#1f4b7a] text-[0.65rem] font-semibold text-white">
      MA
    </span>
  );
}

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [follow, setFollow] = useState<string[]>(STARTERS);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, follow]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    setMessages((current) => [
      ...current,
      { role: "user", content: question },
      { role: "assistant", content: "" },
    ]);
    setInput("");
    setFollow([]);
    setBusy(true);

    const answer = reply(question);
    const write = (content: string) =>
      setMessages((current) => [...current.slice(0, -1), { role: "assistant", content }]);

    // Short "thinking" pause, then type the answer out word by word.
    await sleep(500 + Math.min(answer.text.length, 300) * 2);
    const words = answer.text.split(" ");
    let shown = "";
    for (const word of words) {
      shown = shown ? `${shown} ${word}` : word;
      write(shown);
      await sleep(22 + Math.random() * 28);
    }

    setFollow(answer.follow);
    setBusy(false);
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141821] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <div className="relative">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3b73b0] to-[#1f4b7a] text-sm font-semibold text-white">
            MA
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#141821] bg-emerald-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Zain&apos;s AI</p>
          <p className="text-xs text-white/45">Ask me anything about my work</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>
      </div>

      <div ref={scroller} className="flex-1 space-y-5 overflow-y-auto px-5 py-5 text-[0.9rem] leading-relaxed">
        <div className="flex gap-3">
          <Avatar />
          <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-3 text-white/90">
            Hey, I&apos;m the AI version of Zain. Ask me about my projects, the stack I
            work with, or whether I&apos;d fit a role you&apos;re hiring for.
          </p>
        </div>

        {messages.map((message, index) =>
          message.role === "user" ? (
            <p
              key={index}
              className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#2b5c93] px-4 py-3 text-white"
            >
              {message.content}
            </p>
          ) : (
            <div key={index} className="flex gap-3">
              <Avatar />
              <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-3 text-white/90">
                {message.content || (
                  <span className="inline-flex items-center gap-1 py-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:300ms]" />
                  </span>
                )}
              </p>
            </div>
          ),
        )}

        {follow.length > 0 && !busy && (
          <div className="flex flex-wrap gap-2 pl-10">
            {follow.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => send(suggestion)}
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-left text-xs text-white/70 transition hover:border-white/40 hover:bg-white/5 hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-white/10 p-3"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={300}
          placeholder="Type your question…"
          aria-label="Ask a question"
          className="min-w-0 flex-1 rounded-full bg-white/[0.07] px-5 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:ring-1 focus:ring-white/30"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0e1116] transition hover:bg-white/85 disabled:opacity-40"
        >
          ↑
        </button>
      </form>
      <p className="px-5 pb-3 text-center text-[0.68rem] text-white/30">
        Built-in assistant trained on my CV · works offline, no external AI
      </p>
    </div>
  );
}
