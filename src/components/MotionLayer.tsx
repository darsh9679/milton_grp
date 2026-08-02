"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionLayer() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      return;
    }

    document.documentElement.classList.add("motion-ready");
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const revealTweens = gsap.utils
      .toArray<HTMLElement>(".reveal")
      .map((element) =>
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%"
          }
        })
      );

    const counterTweens = gsap.utils
      .toArray<HTMLElement>("[data-counter]")
      .map((element) => {
        const target = Number(element.dataset.counter || "0");
        const suffix = element.dataset.suffix || "";
        const proxy = { value: 0 };
        return gsap.to(proxy, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = `${Math.round(proxy.value).toLocaleString(
              "en-IN"
            )}${suffix}`;
          },
          scrollTrigger: {
            trigger: element,
            start: "top 85%"
          }
        });
      });

    const floatingTween = gsap.fromTo(
      ".floating-action",
      { opacity: 0, scale: 0.86, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        delay: 0.45,
        ease: "back.out(1.7)"
      }
    );

    const heroElements = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
    const heroTweens = heroElements.map((element, index) =>
      gsap.fromTo(
        element,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.16 + index * 0.1,
          ease: "power3.out"
        }
      )
    );

    const pointerTargets = gsap.utils.toArray<HTMLElement>("[data-mouse-reveal]");
    const pointerHandlers = pointerTargets.map((target) => {
      const handler = (event: MouseEvent) => {
        const rect = target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        target.style.setProperty("--mx", `${x}%`);
        target.style.setProperty("--my", `${y}%`);
      };
      target.addEventListener("mousemove", handler);
      return () => target.removeEventListener("mousemove", handler);
    });

    ScrollTrigger.refresh();

    return () => {
      pointerHandlers.forEach((dispose) => dispose());
      revealTweens.forEach((tween) => tween.kill());
      counterTweens.forEach((tween) => tween.kill());
      heroTweens.forEach((tween) => tween.kill());
      floatingTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
