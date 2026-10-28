import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0e1116] text-[#ecebe6]">
      <div className="hero-dots pointer-events-none absolute inset-0" />

      <div
        data-reveal
        className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16"
      >
        <div>
          <p className="eyebrow !text-white/40">Contact</p>
          <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
            I&apos;m open to new .NET backend and software engineering roles. Tell me
            what you&apos;re building and I&apos;ll get back to you.
          </p>
        </div>

        <div>
          <a
            href={`mailto:${profile.email}`}
            className="break-all text-lg font-medium underline decoration-white/25 underline-offset-4 transition hover:decoration-white sm:text-xl"
          >
            {profile.email}
          </a>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.cv}
              download
              className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#0e1116] transition-colors hover:bg-white/85"
            >
              Download CV
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium transition-colors hover:border-white/50"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium transition-colors hover:border-white/50"
            >
              GitHub ↗
            </a>
          </div>

          <p className="mt-6 text-sm text-white/45">
            {profile.phone} · {profile.location}
          </p>
        </div>
      </div>
    </section>
  );
}
