"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * All page motion lives here and stays deliberately quiet. Server components
 * opt in with data attributes:
 *   data-hero="…"   hero entrance on load
 *   data-reveal     fade and rise once when scrolled into view
 *   data-stagger    children rise one after another
 *   data-line       timeline rail that draws as you scroll
 *   data-img        image settles from a slight zoom
 */
export default function Motion() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Smooth scrolling, driven by GSAP's ticker.
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Thin reading-progress line.
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      });

      // Hero: name settles letter by letter, the rest follows.
      const name = document.querySelector<HTMLElement>('[data-hero="name"]');
      const rest = gsap.utils
        .toArray<HTMLElement>("[data-hero]")
        .filter((el) => el.dataset.hero !== "name");
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (name) {
        gsap.set(name, { autoAlpha: 1, y: 0 });
        const split = SplitText.create(name, { type: "chars" });
        intro.from(split.chars, { yPercent: 45, autoAlpha: 0, duration: 0.7, stagger: 0.03 });
      }
      intro.to(rest, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, name ? "-=0.45" : 0);

      // Content blocks rise once.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Project images settle from a slight zoom.
      gsap.utils.toArray<HTMLElement>("[data-img]").forEach((el) => {
        gsap.from(el, {
          scale: 1.08,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Timeline rail draws as you read down.
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 65%", scrub: 0.5 },
          },
        );
      });

      // Cards tilt a few degrees toward the cursor (mouse devices only).
      const tiltCleanups: Array<() => void> = [];
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
          gsap.set(el, { transformPerspective: 900 });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
          const move = (e: MouseEvent) => {
            const box = el.getBoundingClientRect();
            ry(((e.clientX - box.left) / box.width - 0.5) * 8);
            rx(-((e.clientY - box.top) / box.height - 0.5) * 8);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
          tiltCleanups.push(() => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          });
        });
      }

      return () => {
        tiltCleanups.forEach((fn) => fn());
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  });

  return (
    <div
      ref={bar}
      className="pointer-events-none fixed left-0 top-0 z-[70] h-[2px] w-full origin-left scale-x-0 bg-accent"
    />
  );
}
