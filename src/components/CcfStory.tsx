"use client";

import { useEffect, useState } from "react";
import ProjectGallery from "@/components/ProjectGallery";

// Everything here is taken from the CRM integration section of the CV.
const STEPS = [
  {
    layer: "Gateway",
    title: "One gateway, three services",
    text: "Built .NET 8 microservices for inbound partner orders, outward updates and the HSV healthcare platform, all behind an Ocelot API gateway secured with JWT, Keycloak and role-based authorization.",
    chips: [".NET 8", "Ocelot", "Keycloak"],
  },
  {
    layer: "Orders",
    title: "The full order lifecycle",
    text: "REST APIs take a partner order from creation through quotes, bill details, exception pricing, staffing status, record outcome, itinerary changes and cancellation.",
    chips: ["ASP.NET Core", "REST APIs", "Swagger"],
  },
  {
    layer: "Rules",
    title: "Rules before anything is written",
    text: "A business rules engine validates quotes, bills, exception pricing and itinerary changes, and SmartyStreets / Google geocoding checks addresses, before any data reaches the CRM.",
    chips: ["Business rules", "SmartyStreets", "Google"],
  },
  {
    layer: "CRM sync",
    title: "Clean data in Dynamics 365",
    text: "Orders, claimants, claims and referrals are written to Microsoft Dynamics 365 through the Dataverse SDK. Customizing CRM entities, workflows and data mappings cut manual processing by 30%.",
    chips: ["Dynamics 365", "Dataverse SDK"],
  },
  {
    layer: "Operations",
    title: "Async work you can see",
    text: "RabbitMQ / MassTransit consumers and Redis caching keep processing off the request path, and API Calls / API Log dashboards on CCF show every request, CRM call and response, backed by Serilog, Grafana Loki and Prometheus.",
    chips: ["RabbitMQ", "Redis", "Grafana Loki"],
  },
];

const GAP = 62; // px between exploded layers

/**
 * Scrollytelling without scroll-jacking: the text scrolls at normal speed and
 * the 3D platform simply stays beside it while the steps go by.
 */
export default function CcfStory({
  tags,
  images = [],
}: {
  tags: readonly string[];
  images?: readonly string[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const steps = STEPS.map((_, i) => document.getElementById(`ccf-step-${i}`));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    steps.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="pb-8 pt-16 sm:pt-24">
      <div data-reveal className="max-w-2xl">
        <p className="eyebrow">Selected work · Featured case study · Techverx, May 2025 – Present</p>
        <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
          Dynamics 365 CRM Integration Platform
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          .NET 8 microservices at Techverx that connect partner order systems and the
          HSV healthcare platform to Microsoft Dynamics 365, for healthcare
          transportation and interpretation. Five layers I worked on:
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {images.length > 0 && (
        <div data-reveal className="mt-8 max-w-4xl">
          <ProjectGallery images={images} name="Dynamics 365 CRM Integration Platform" url="" />
          <p className="mt-3 text-xs text-muted">
            API Details screen I built on CCF: request status, business-rule result and
            the full log trail for one partner API call.
          </p>
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        {/* Steps scroll normally */}
        <ol>
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              id={`ccf-step-${i}`}
              data-index={i}
              className={`flex flex-col justify-center border-l-2 py-6 pl-6 transition-all duration-500 lg:min-h-[17rem] lg:pl-8 ${
                i === active
                  ? "border-accent opacity-100"
                  : "border-border opacity-100 lg:opacity-35"
              }`}
            >
              <p className="text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")} · {step.layer}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{step.text}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {step.chips.map((chip) => (
                  <span key={chip} className="tag">
                    {chip}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>

        {/* Platform stays beside the text; the active layer lights up and lifts clear. */}
        <div
          aria-hidden
          className="hidden h-[26rem] items-center justify-center self-start [perspective:1500px] lg:sticky lg:top-28 lg:flex"
        >
          <div
            className="relative h-[15rem] w-[24rem] [transform-style:preserve-3d]"
            style={{ transform: "rotateX(58deg) rotateZ(-36deg) translateY(-2rem)" }}
          >
            {STEPS.map((step, i) => {
              const isActive = i === active;
              const lift = i * 34 + (i > active ? GAP : 0) + (isActive ? 10 : 0);
              return (
                <div
                  key={step.layer}
                  className={`absolute inset-0 rounded-2xl border transition-all duration-700 ease-out [transform-style:preserve-3d] ${
                    isActive
                      ? "border-accent bg-accent-soft shadow-[0_30px_50px_-20px_rgba(31,75,122,0.55)]"
                      : "border-border bg-surface shadow-[0_18px_30px_-22px_rgba(22,24,29,0.35)]"
                  }`}
                  style={{ transform: `translateZ(${lift}px)` }}
                >
                  <span
                    className={`absolute bottom-3 left-4 text-[0.8rem] font-semibold tracking-wide transition-colors duration-500 ${
                      isActive ? "text-accent" : "text-subtle"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} · {step.layer}
                  </span>
                  <span
                    className={`absolute right-4 top-4 h-2 w-2 rounded-full transition-colors duration-500 ${
                      isActive ? "bg-accent" : "bg-border"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
