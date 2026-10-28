"use client";

import { useState } from "react";
import ProjectGallery from "@/components/ProjectGallery";

export type IndexProject = {
  name: string;
  category: string;
  images: readonly string[];
  liveUrl: string;
  description: string;
  tags: readonly string[];
  caption?: string;
  period?: string;
};

const shortName = (name: string) => name.split(/ [—·] /)[0];

/** List-view showcase: names on the left, the active project's preview on the right. */
export default function ProjectsIndex({
  projects,
  firstNumber,
}: {
  projects: IndexProject[];
  firstNumber: number;
}) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <div className="hidden gap-14 lg:grid lg:grid-cols-[1fr_1.15fr]">
      <ol className="border-t border-white/10">
        {projects.map((project, i) => {
          const on = i === active;
          return (
            <li key={project.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="group relative flex w-full items-center gap-6 border-b border-white/10 py-6 text-left"
              >
                <span
                  className={`absolute left-0 top-0 h-px bg-sky-400 transition-all duration-500 ${
                    on ? "w-full" : "w-0"
                  }`}
                />
                <span className="w-8 text-sm tabular-nums text-white/30">
                  {String(firstNumber + i).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span
                    className={`font-display block text-3xl leading-tight transition-all duration-300 ${
                      on
                        ? "translate-x-1 text-white"
                        : "text-white/30 group-hover:text-white/65"
                    }`}
                  >
                    {shortName(project.name)}
                  </span>
                  <span className="mt-1 block text-xs text-white/40">
                    {project.category}
                    {project.period ? ` · ${project.period}` : ""}
                  </span>
                </span>
                <span
                  className={`text-xl text-sky-300 transition-all duration-300 ${
                    on ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                  }`}
                >
                  →
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="self-start lg:sticky lg:top-24">
        <div key={current.name} className="skill-in">
          <ProjectGallery images={current.images} name={current.name} url={current.liveUrl} />

          <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">{current.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{current.description}</p>
          {current.caption && (
            <p className="mt-3 border-l-2 border-white/15 pl-3 text-xs leading-relaxed text-white/40">
              {current.caption}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {current.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>
          {current.liveUrl && (
            <a
              href={current.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#0e1116] transition-colors hover:bg-white/85"
            >
              Visit site ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
