import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Shared: Dot Background Parallax ─── */

/**
 * Applies a vertical parallax shift to dot-pattern backgrounds.
 * The dots layer moves slower than the content, creating depth.
 *
 * @param container - The section element containing `[data-parallax="dots"]`
 * @param speed     - Parallax intensity in px (default 80). Higher = more shift.
 */
export function dotsParallax(container: HTMLElement, speed = 80) {
  const dots = container.querySelector<HTMLElement>("[data-parallax='dots']");
  if (!dots) return;

  // 1. Continuous subtle pulsing glow effect
  gsap.fromTo(
    dots,
    { opacity: 0.25 },
    {
      opacity: 0.50,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    }
  );
}


/* ─── Hero Section Animations ─── */

/**
 * Staggered text reveal for the hero headline and sub-elements.
 * Animates children of the container in sequence with a fade-up effect.
 */
export function heroEntrance(container: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Animate the badge / label
  const badge = container.querySelector("[data-hero='badge']");
  if (badge) {
    tl.fromTo(
      badge,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    );
  }

  // Stagger headline words
  const words = container.querySelectorAll("[data-hero='headline'] .word");
  if (words.length) {
    tl.fromTo(
      words,
      { opacity: 0, y: 60, rotateX: -15 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08 },
      "-=0.3"
    );
  }

  // Sub-headline
  const subheadline = container.querySelector("[data-hero='subheadline']");
  if (subheadline) {
    tl.fromTo(
      subheadline,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4"
    );
  }

  // CTA buttons
  const ctas = container.querySelectorAll("[data-hero='cta']");
  if (ctas.length) {
    tl.fromTo(
      ctas,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
      "-=0.3"
    );
  }

  // Tech stack pills (if they exist)
  const techPills = container.querySelectorAll("[data-hero='tech']");
  if (techPills.length) {
    tl.fromTo(
      techPills,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06 },
      "-=0.2"
    );
  }

  // Scroll indicator
  const scrollIndicator = container.querySelector("[data-hero='scroll']");
  if (scrollIndicator) {
    tl.fromTo(
      scrollIndicator,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.1"
    );
  }

  return tl;
}

/* ─── Timeline Section Animations ─── */

/**
 * Draws the vertical timeline line and reveals cards on scroll.
 */
export function timelineScrollReveal(container: HTMLElement) {
  // Animate the timeline line height
  const line = container.querySelector("[data-timeline='line']");
  if (line) {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: "bottom 85%",
          scrub: 0.5,
        },
      }
    );
  }

  // Reveal each card
  const cards = container.querySelectorAll("[data-timeline='card']");
  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { opacity: 0, x: -40, y: 20 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Pulse nodes in
  const nodes = container.querySelectorAll("[data-timeline='node']");
  nodes.forEach((node) => {
    gsap.fromTo(
      node,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: node,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

/* ─── Sidebar Nav Scroll Tracking ─── */

/**
 * Updates the active nav indicator based on which section is in view.
 * Handles nested sections (e.g. `#education` inside `#experience`)
 * by processing in DOM order and using onLeaveBack to restore the
 * previous section's active state.
 */
export function setupScrollSpy(
  sectionIds: string[],
  onActiveChange: (id: string) => void
) {
  // Filter to only IDs that exist in the DOM, preserving the caller's order
  const validIds = sectionIds.filter((id) => document.getElementById(id));

  validIds.forEach((id, index) => {
    const el = document.getElementById(id)!;
    const prevId = index > 0 ? validIds[index - 1] : null;

    ScrollTrigger.create({
      trigger: el,
      start: "top center",
      end: "bottom center",
      onEnter: () => onActiveChange(id),
      onEnterBack: () => onActiveChange(id),
      // When scrolling back above this section, activate the previous one
      onLeaveBack: () => {
        if (prevId) onActiveChange(prevId);
      },
    });
  });
}
