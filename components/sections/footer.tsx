"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dotsParallax } from "@/lib/gsap/animations";
import {
  Mail,
  Phone,
  ArrowUpRight,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/sections/_components/icons";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "kenfrianeza.dev@gmail.com",
    href: "mailto:kenfrianeza.dev@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 976 341 3896",
    href: "tel:+639763413896",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "Ken Frianeza",
    href: "https://www.linkedin.com/in/ken-frianeza-18a598370/",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "kenfrianeza-dev",
    href: "https://github.com/kenfrianeza-dev",
  },
] as const;

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const els = containerRef.current.querySelectorAll("[data-footer='reveal']");
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Dot background parallax
      dotsParallax(containerRef.current);

      // Creative animated border line
      const borderLines = containerRef.current.querySelectorAll(".animated-border-line");
      if (borderLines.length > 0) {
        gsap.to(borderLines, {
          x: "400%",
          duration: 3.5,
          ease: "linear",
          repeat: -1,
        });
      }
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Build mailto link with form data as a simple fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.open(`mailto:kenfrianeza.dev@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative bg-surface-900"
    >
      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px w-full overflow-hidden bg-surface-800">
        <div 
          className="animated-border-line absolute top-0 bottom-0 left-0 w-1/4 bg-linear-to-r from-transparent via-accent-400 to-transparent opacity-70 -translate-x-full"
        />
        <div 
          className="animated-border-line absolute top-0 bottom-0 left-0 w-1/4 bg-linear-to-r from-transparent via-accent-500 to-transparent blur-[2px] -translate-x-full"
        />
      </div>

      {/* Main CTA + Contact area */}
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ── Left Column: CTA & Contact Form ── */}
          <div data-footer="reveal" className="opacity-0">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-400">
              Get In Touch
            </p>
            <h2 className="mb-4 text-3xl font-bold text-surface-50 sm:text-4xl leading-tight">
              Let&apos;s Engineer<br />
              <span className="text-accent-400">Something Great</span>
            </h2>
            <p className="mb-10 text-surface-400 leading-relaxed max-w-md">
              Have a project in mind or want to discuss opportunities? 
              Drop me a message and I&apos;ll get back to you within 24 hours.
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="group relative">
                <User className="absolute left-0 top-3 h-4 w-4 text-surface-600 transition-colors duration-200 group-focus-within:text-accent-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  className="w-full border-b border-surface-700 bg-transparent py-3 pl-7 text-sm text-surface-100 placeholder:text-surface-600 outline-none transition-colors duration-200 focus:border-accent-500"
                />
              </div>

              {/* Email */}
              <div className="group relative">
                <Mail className="absolute left-0 top-3 h-4 w-4 text-surface-600 transition-colors duration-200 group-focus-within:text-accent-400" />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  className="w-full border-b border-surface-700 bg-transparent py-3 pl-7 text-sm text-surface-100 placeholder:text-surface-600 outline-none transition-colors duration-200 focus:border-accent-500"
                />
              </div>

              {/* Message */}
              <div className="group relative">
                <MessageSquare className="absolute left-0 top-3 h-4 w-4 text-surface-600 transition-colors duration-200 group-focus-within:text-accent-400" />
                <textarea
                  placeholder="Your Message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="w-full resize-none border-b border-surface-700 bg-transparent py-3 pl-7 text-sm text-surface-100 placeholder:text-surface-600 outline-none transition-colors duration-200 focus:border-accent-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 cursor-pointer"
              >
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

          {/* ── Right Column: Contact Info ── */}
          <div data-footer="reveal" className="opacity-0">
            <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-accent-400">
              Contact Information
            </p>

            <div className="space-y-6">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 rounded-xl border border-surface-800/40 bg-surface-900/30 p-4 transition-all duration-300 hover:border-accent-500/25 hover:bg-surface-800/40"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/20 transition-colors duration-300 group-hover:bg-accent-500/15">
                      <Icon className="h-4 w-4 text-accent-400" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-surface-500">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-surface-200 truncate group-hover:text-accent-400 transition-colors duration-200">
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-surface-600 transition-all duration-300 group-hover:text-accent-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                );
              })}
            </div>

            {/* Location note */}
            <div className="mt-8 rounded-lg border border-surface-800/40 bg-surface-900/20 px-4 py-3">
              <p className="text-xs text-surface-500">
                <span className="font-medium text-surface-400">Based in</span>{" "}
                Quezon City, Philippines 🇵🇭
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-surface-500">
            &copy; {new Date().getFullYear()} Ken Frianeza. Engineered with precision.
          </p>
          <p className="text-xs text-surface-600">
            Built with Next.js, Tailwind CSS & GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
