import SkillsSection from "@/components/SkillsSection";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-[#0e1116] text-[#ecebe6]">
      <div className="hero-dots pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-48 top-10 h-[32rem] w-[32rem] bg-[radial-gradient(closest-side,rgba(59,115,176,0.2),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div data-reveal className="mb-10 max-w-2xl">
          <p className="eyebrow !text-white/40">Skills</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">What I work with</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/60">
            Backend-first with C#, ASP.NET Core and microservices. Everything listed
            here is also on my CV.
          </p>
        </div>

        <SkillsSection />
      </div>
    </section>
  );
}
