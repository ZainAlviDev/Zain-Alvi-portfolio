import Image from "next/image";
import CcfStory from "@/components/CcfStory";
import ProjectsIndex, { type IndexProject } from "@/components/ProjectsIndex";
import { profile } from "@/data/profile";

// The CRM integration platform is the featured case study above; these are the rest.
const isCcf = (project: IndexProject) => project.name.startsWith("Dynamics 365");

/** Phones: a plain stack of cards instead of the hover index. */
function MobileCard({ project }: { project: IndexProject }) {
  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
      <div className="relative aspect-[2/1] border-b border-white/10 bg-white">
        <Image
          src={project.images[0]}
          alt={`${project.name} preview`}
          fill
          sizes="100vw"
          className="object-contain object-center"
        />
      </div>
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">
          {project.category}
          {project.period ? ` · ${project.period}` : ""}
        </p>
        <h3 className="mt-2 text-base font-semibold text-white">{project.name}</h3>
        <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-white/60">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-white/75"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-4"
          >
            Visit site ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const all = profile.projects as unknown as IndexProject[];
  const ccf = all.find(isCcf);
  const rest = all.filter((project) => !isCcf(project));

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{ccf && <CcfStory tags={ccf.tags} images={ccf.images} />}</div>

      <section className="relative overflow-hidden bg-[#0e1116] text-[#ecebe6]">
        <div className="hero-dots pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div data-reveal className="mb-12 max-w-2xl">
            <p className="eyebrow !text-white/40">More work</p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              Other products I&apos;ve helped build
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">
              Healthcare, restaurant tech, HR tech and fintech, each with the company and dates I worked on it.
              <span className="hidden lg:inline"> Hover a project to preview it.</span>
            </p>
          </div>

          <div data-reveal>
            <ProjectsIndex projects={rest} firstNumber={2} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
            {rest.map((project) => (
              <MobileCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
