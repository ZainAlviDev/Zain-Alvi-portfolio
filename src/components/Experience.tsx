import { profile } from "@/data/profile";

// Each card is a touch lighter than the one before, so the stack reads as layers.
const SHADES = ["#0e1116", "#131923", "#19212e"];

const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? "";

/**
 * Role cards stack as you scroll: each one sticks near the top and the next
 * slides over it, so the earlier roles stay visible as tabs. Pure CSS sticky,
 * so scrolling is never hijacked.
 */
export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24">
      <div data-reveal className="mb-10 max-w-2xl">
        <p className="eyebrow">Experience</p>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl">Where I&apos;ve worked</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Three roles since 2024, from an internship on a US fintech product to
          Dynamics 365 integrations and multi-tenant platforms.
        </p>
      </div>

      <div className="pb-4">
        {profile.experience.map((job, i) => (
          <div
            key={`${job.company}-${job.period}`}
            className="mb-6 lg:sticky lg:mb-[7vh]"
            style={{ top: `${5.5 + i * 3.4}rem` }}
          >
            <article
              className="relative overflow-hidden rounded-3xl border border-white/10 p-7 text-[#ecebe6] shadow-[0_-18px_40px_-24px_rgba(14,17,22,0.55),0_34px_60px_-34px_rgba(14,17,22,0.7)] sm:p-10"
              style={{ background: SHADES[i % SHADES.length] }}
            >
              <div className="hero-dots pointer-events-none absolute inset-0" />
              <span
                aria-hidden
                className="font-display pointer-events-none absolute -right-3 -top-8 select-none text-[9rem] leading-none text-white/[0.06] sm:text-[13rem]"
              >
                {startYear(job.period)}
              </span>

              <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.4fr] lg:gap-14">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/85">
                      {job.period}
                    </span>
                    {i === 0 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="font-display mt-6 text-2xl leading-tight sm:text-3xl">
                    {job.role}
                  </h3>
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-base font-medium text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition hover:decoration-sky-300"
                    >
                      {job.company} ↗
                    </a>
                  ) : (
                    <p className="mt-2 text-base font-medium text-sky-300">{job.company}</p>
                  )}
                  <p className="mt-2 text-sm text-white/45">{job.location}</p>
                </div>

                <div>
                  <p className="text-[15px] leading-relaxed text-white/70">{job.highlight}</p>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-white/80">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/70" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                    {job.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-white/75"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}

        <div
          data-reveal
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-6 py-5 text-sm"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
              Education
            </p>
            <p className="mt-1 font-medium">{profile.education.degree}</p>
            <p className="text-muted">{profile.education.school}</p>
          </div>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            {profile.education.period}
          </span>
        </div>
      </div>
    </section>
  );
}
