"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/data/profile";

/**
 * The stack as a system map: how the pieces I use connect in the platforms I
 * built. Lines draw in on scroll; hovering a node lights up everything it
 * touches and shows where it was used.
 */

const LAYERS = ["Frontend", "Backend", "Auth & domain", "Messaging", "Data & CRM"];
const LAYER_X = [9, 29, 49, 69, 89];
const HUES = [262, 212, 152, 32, 188];

type NodeDef = { id: string; layer: number; y: number };

const RAW_NODES: NodeDef[] = [
  { id: "JavaScript", layer: 0, y: 14 },
  { id: "Razor Pages", layer: 0, y: 32 },
  { id: "Blazor", layer: 0, y: 50 },
  { id: "Ocelot", layer: 1, y: 11 },
  { id: "ASP.NET Core", layer: 1, y: 30 },
  { id: "SignalR", layer: 1, y: 49 },
  { id: "Keycloak", layer: 2, y: 11 },
  { id: "JWT", layer: 2, y: 24 },
  { id: "EF Core", layer: 2, y: 38 },
  { id: "Multi-Tenancy", layer: 2, y: 51 },
  { id: "RabbitMQ", layer: 3, y: 16 },
  { id: "MassTransit", layer: 3, y: 32 },
  { id: "Background Workers", layer: 3, y: 48 },
  { id: "PostgreSQL", layer: 4, y: 12 },
  { id: "SQL Server", layer: 4, y: 26 },
  { id: "Redis", layer: 4, y: 40 },
  { id: "Dynamics 365", layer: 4, y: 53 },
];

// Pull the whole map up so it sits close to the layer labels.
const NODES: NodeDef[] = RAW_NODES.map((n) => ({ ...n, y: n.y - 4 }));

const EDGES: Array<[string, string]> = [
  ["JavaScript", "Ocelot"],
  ["Razor Pages", "ASP.NET Core"],
  ["Blazor", "ASP.NET Core"],
  ["Blazor", "SignalR"],
  ["Ocelot", "ASP.NET Core"],
  ["ASP.NET Core", "SignalR"],
  ["ASP.NET Core", "Keycloak"],
  ["ASP.NET Core", "JWT"],
  ["ASP.NET Core", "EF Core"],
  ["ASP.NET Core", "Multi-Tenancy"],
  ["ASP.NET Core", "RabbitMQ"],
  ["RabbitMQ", "MassTransit"],
  ["MassTransit", "Background Workers"],
  ["EF Core", "PostgreSQL"],
  ["EF Core", "SQL Server"],
  ["Multi-Tenancy", "PostgreSQL"],
  ["Background Workers", "Dynamics 365"],
  ["ASP.NET Core", "Redis"],
  ["ASP.NET Core", "Dynamics 365"],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const pos = (id: string) => ({ x: LAYER_X[byId[id].layer], y: byId[id].y });

const curve = (from: string, to: string) => {
  const a = pos(from);
  const b = pos(to);
  const mid = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mid} ${a.y}, ${mid} ${b.y}, ${b.x} ${b.y}`;
};

const ALIASES: Record<string, string[]> = {
  "ASP.NET Core": ["asp.net"],
  "EF Core": ["ef core"],
  "Multi-Tenancy": ["multi-tenant", "tenant"],
  "Background Workers": ["worker"],
  "Razor Pages": ["razor"],
  "Dynamics 365": ["dynamics", "crm"],
  JavaScript: ["javascript", "no-code"],
  Ocelot: ["ocelot"],
};

function usage(skill: string) {
  const needles = [skill, ...(ALIASES[skill] ?? [])].map((n) => n.toLowerCase());
  const has = (text: string) => needles.some((n) => text.toLowerCase().includes(n));
  return {
    roles: profile.experience
      .filter((job) => job.tech.some((t) => has(t)) || job.points.some((p) => has(p)) || has(job.highlight))
      .map((job) => job.company),
    projects: profile.projects
      .filter((project) => project.tags.some((t) => has(t)) || has(project.description))
      .map((project) => project.name.split(/ [—·] /)[0]),
  };
}

export const GRAPH_NODE_IDS = NODES.map((n) => n.id);

export default function SkillsGraph({
  hover,
  setHover,
}: {
  hover: string | null;
  setHover: (id: string | null) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const nodeEls = useRef<Record<string, HTMLButtonElement | null>>({});
  const pathEls = useRef<Array<SVGPathElement | null>>([]);

  const linked = useMemo(() => {
    if (!hover) return null;
    const set = new Set<string>([hover]);
    EDGES.forEach(([a, b]) => {
      if (a === hover) set.add(b);
      if (b === hover) set.add(a);
    });
    return set;
  }, [hover]);

  const info = useMemo(() => (hover ? usage(hover) : null), [hover]);

  // Draw in once when the map scrolls into view.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Object.values(nodeEls.current).filter(Boolean) as HTMLElement[];
    const paths = pathEls.current.filter(Boolean) as SVGPathElement[];
    gsap.set(nodes, { autoAlpha: 0, scale: 0.6 });
    gsap.set(paths, { strokeDashoffset: 1 });

    let tl: gsap.core.Timeline | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        tl = gsap
          .timeline()
          .to(nodes, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: "back.out(1.6)" })
          .to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.04, ease: "power2.inOut" }, "-=0.35");
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      tl?.kill();
    };
  }, []);

  return (
    <div>
      <div
        ref={stage}
        className="relative w-full select-none"
        style={{ aspectRatio: "100 / 54" }}
        onMouseLeave={() => setHover(null)}
      >
        {/* Layer labels */}
        {LAYERS.map((label, i) => (
          <p
            key={label}
            className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-white/35"
            style={{ left: `${LAYER_X[i]}%` }}
          >
            {label}
          </p>
        ))}

        <svg
          viewBox="0 0 100 54"
          className="absolute inset-0 h-full w-full"
          aria-hidden
          fill="none"
        >
          {EDGES.map(([a, b], i) => {
            const active = hover !== null && (a === hover || b === hover);
            const d = curve(a, b);
            const hue = HUES[byId[a].layer];
            return (
              <g key={`${a}-${b}`}>
                <path
                  ref={(el) => {
                    pathEls.current[i] = el;
                  }}
                  d={d}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeWidth={active ? 0.24 : 0.14}
                  stroke={active ? `hsl(${hue} 90% 68%)` : "rgba(255,255,255,0.16)"}
                  style={{
                    opacity: hover && !active ? 0.25 : 1,
                    transition: "stroke 0.25s, stroke-width 0.25s, opacity 0.25s",
                  }}
                />
                {active && (
                  <circle r="0.55" fill={`hsl(${hue} 95% 75%)`}>
                    <animateMotion dur="1.8s" repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {NODES.map((node) => {
          const dim = linked !== null && !linked.has(node.id);
          const isHover = hover === node.id;
          const hue = HUES[node.layer];
          return (
            <button
              key={node.id}
              type="button"
              ref={(el) => {
                nodeEls.current[node.id] = el;
              }}
              onMouseEnter={() => setHover(node.id)}
              onFocus={() => setHover(node.id)}
              onBlur={() => setHover(null)}
              onClick={() => setHover(node.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border bg-[#141a23] px-3.5 py-1.5 text-[13px] font-medium text-white/90 outline-none transition-[opacity,border-color,box-shadow] duration-300"
              style={{
                left: `${LAYER_X[node.layer]}%`,
                top: `${(node.y / 54) * 100}%`,
                opacity: dim ? 0.28 : undefined,
                borderColor: isHover ? `hsl(${hue} 90% 68%)` : "rgba(255,255,255,0.14)",
                boxShadow: isHover
                  ? `0 0 28px -4px hsl(${hue} 95% 60% / 0.65)`
                  : linked?.has(node.id)
                    ? `0 0 18px -6px hsl(${hue} 95% 60% / 0.5)`
                    : undefined,
              }}
            >
              <span
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{ background: `hsl(${hue} 90% 66%)` }}
              />
              {node.id}
            </button>
          );
        })}
      </div>

      {/* Where the highlighted skill was used */}
      <div
        aria-live="polite"
        className="mt-6 flex min-h-[3.5rem] flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm"
      >
        {hover && info ? (
          <>
            <span className="flex items-center gap-2 font-semibold text-white">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: `hsl(${HUES[byId[hover].layer]} 90% 66%)` }}
              />
              {hover}
            </span>
            {info.roles.length > 0 && (
              <span className="text-white/60">
                Used at <span className="text-white/90">{info.roles.join(", ")}</span>
              </span>
            )}
            {info.projects.length > 0 && (
              <span className="text-white/60">
                In <span className="text-white/90">{info.projects.join(", ")}</span>
              </span>
            )}
            {info.roles.length === 0 && info.projects.length === 0 && (
              <span className="text-white/60">Part of my day-to-day toolkit.</span>
            )}
          </>
        ) : (
          <span className="text-white/45">
            Hover or tap a node to see what it connects to and where I used it.
          </span>
        )}
      </div>
    </div>
  );
}
