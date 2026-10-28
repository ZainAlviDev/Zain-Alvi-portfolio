import { profile } from "@/data/profile";

export default function Testimonials() {
  const review = profile.testimonials[0];
  if (!review) return null;

  return (
    <section id="testimonials" className="border-t border-border py-16 sm:py-24">
      <figure
        data-reveal
        className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-7 sm:p-10"
      >
        <p className="eyebrow">What a client says</p>
        <blockquote className="font-display mt-5 text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border pt-5 text-sm">
          <span className="font-semibold">{review.name}</span>
          <span className="text-muted">{review.role}</span>
          <a
            href={review.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-muted"
          >
            LinkedIn ↗
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
