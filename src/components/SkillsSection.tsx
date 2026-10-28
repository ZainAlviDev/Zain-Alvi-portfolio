"use client";

import { useState } from "react";
import SkillsGraph, { GRAPH_NODE_IDS } from "@/components/SkillsGraph";
import { profile } from "@/data/profile";

const GROUPS: Array<{ label: string; hue: number; items: readonly string[] }> = [
  { label: "Backend", hue: 212, items: profile.skills.Backend },
  { label: "APIs & integration", hue: 188, items: profile.skills["APIs & Integration"] },
  { label: "Databases & caching", hue: 200, items: profile.skills["Databases & Caching"] },
  { label: "Architecture & messaging", hue: 32, items: profile.skills["Architecture & Messaging"] },
  { label: "Security", hue: 152, items: profile.skills.Security },
  { label: "Frontend", hue: 262, items: profile.skills.Frontend },
  { label: "Tools & observability", hue: 336, items: profile.skills["Tools & Observability"] },
];

// Skills that aren't a node themselves point at the node they run on.
const POINTS_TO: Record<string, string> = {
  "C#": "ASP.NET Core",
  ".NET 8": "ASP.NET Core",
  "Web API": "ASP.NET Core",
  "ASP.NET MVC": "ASP.NET Core",
  "REST APIs": "ASP.NET Core",
  "Entity Framework Core": "EF Core",
  Dapper: "EF Core",
  LINQ: "EF Core",
  TypeScript: "JavaScript",
  "No-Code / Low-Code (CCF)": "JavaScript",
  "Dynamics 365 CRM": "Dynamics 365",
  "Dataverse SDK": "Dynamics 365",
  "Ocelot API Gateway": "Ocelot",
  Hangfire: "Background Workers",
  "OAuth 2.0": "JWT",
  "Role-Based Access Control": "JWT",
  Microservices: "Ocelot",
};

const nodeFor = (skill: string) =>
  GRAPH_NODE_IDS.includes(skill) ? skill : (POINTS_TO[skill] ?? null);

export default function SkillsSection() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div>
      {/* The plain list: everything, grouped, nothing hidden */}
      <div data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((group) => (
          <div
            key={group.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: `hsl(${group.hue} 90% 66%)` }}
                />
                {group.label}
              </h3>
              <span className="text-xs tabular-nums text-white/35">{group.items.length}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((skill) => {
                const node = nodeFor(skill);
                const lit = node !== null && node === hover;
                return (
                  <span
                    key={skill}
                    onMouseEnter={() => node && setHover(node)}
                    onMouseLeave={() => node && setHover(null)}
                    className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                      node ? "cursor-pointer" : ""
                    } ${
                      lit
                        ? "text-white"
                        : "border-white/12 text-white/75 hover:border-white/30 hover:text-white"
                    }`}
                    style={
                      lit
                        ? {
                            borderColor: `hsl(${group.hue} 90% 66%)`,
                            background: `hsl(${group.hue} 90% 66% / 0.15)`,
                          }
                        : undefined
                    }
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* The map: how they connect (wide screens only) */}
      <div className="mt-16 hidden md:block">
        <div data-reveal className="mb-8 max-w-2xl">
          <h3 className="font-display text-2xl sm:text-3xl">How they fit together</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-white/60">
            A simplified map of the systems I&apos;ve built, from the frontend to the
            database. Hover or tap a skill above, or a node here, to follow its connections.
          </p>
        </div>
        <div data-reveal>
          <SkillsGraph hover={hover} setHover={setHover} />
        </div>
      </div>
    </div>
  );
}
