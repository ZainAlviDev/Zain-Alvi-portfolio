import OpenChatButton from "@/components/OpenChatButton";
import { profile } from "@/data/profile";


export default function Hero() {
  const current = profile.experience[0];

  return (
    <section id="about" className="relative overflow-hidden bg-[#0e1116] text-[#ecebe6]">
      <div className="hero-dots pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-60 -top-40 h-[34rem] w-[34rem] bg-[radial-gradient(closest-side,rgba(59,115,176,0.22),transparent)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-16">
        <div>
          {profile.available && (
            <p
              data-hero="eyebrow"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {profile.availability}
            </p>
          )}

          <h1
            data-hero="name"
            className="font-display mt-5 text-[2.6rem] leading-[1.1] sm:text-6xl"
          >
            {profile.name}
          </h1>
          <p data-hero="title" className="mt-3 text-lg text-white/65 sm:text-xl">
            {profile.title}
          </p>

          <p
            data-hero="summary"
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base"
          >
            {profile.summary}
          </p>

          <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-[#0e1116] transition-colors hover:bg-white/85"
            >
              View work
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/50"
            >
              Download CV
            </a>
            <OpenChatButton className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/50">
              Ask my AI
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </OpenChatButton>
          </div>
        </div>

        <div
          data-hero="card"
          className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
        >
          <dl className="divide-y divide-white/10 text-sm">
            <div className="pb-3.5">
              <dt className="text-xs text-white/40">Currently</dt>
              <dd className="mt-1 font-medium">
                {current.role} at {current.company}
              </dd>
            </div>
            <div className="py-3.5">
              <dt className="text-xs text-white/40">Based in</dt>
              <dd className="mt-1 font-medium">{profile.location}</dd>
            </div>
            <div className="py-3.5">
              <dt className="text-xs text-white/40">Education</dt>
              <dd className="mt-1 font-medium">{profile.education.degree}, {profile.education.shortSchool}</dd>
            </div>
            <div className="pt-3.5">
              <dt className="text-xs text-white/40">Day-to-day stack</dt>
              <dd className="mt-2.5 flex flex-wrap gap-1.5">
                {profile.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
