"use client";

import { useEffect, useRef, useState } from "react";

const FLOW_STEPS = [
  {
    title: "User Data",
    subtitle: "Input Parameters",
    variant: "light" as const,
  },
  {
    title: "Math Engines",
    subtitle: "XIRR, Mean-Variance, Covariance",
    variant: "light" as const,
  },
  {
    title: "Number Guard",
    subtitle: "Audit & Validation",
    variant: "light" as const,
  },
  {
    title: "Nxance LM",
    subtitle: '"Clear Strategy."',
    variant: "dark" as const,
  },
] as const;

const TRAITS = [
  "Deterministic Models",
  "Auditable Trails",
  "Zero Hallucination",
] as const;

function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className="flex w-8 shrink-0 items-center justify-center sm:w-10 lg:w-12">
      <div className="relative h-px w-full bg-[#E4E4E7]">
        <div
          className={`flow-arrow-pulse absolute inset-y-0 left-0 h-full rounded-full bg-[#2F6EFF] transition-opacity duration-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
        <svg
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1 text-[#C4C8CE]"
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="currentColor"
          aria-hidden
        >
          <path d="M1 1l5 5-5 5V1Z" />
        </svg>
      </div>
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function CoreMathStrategyFlow() {
  const { ref, inView } = useInView();
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (!inView) return;

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % FLOW_STEPS.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="mt-20 border-t border-[#ECECEF] pt-20 sm:mt-24 sm:pt-24 lg:mt-28 lg:pt-28"
    >
      {/* Heading */}
      <div
        className={`text-center ${
          inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        } transition-all duration-700`}
      >
        <h2 className="text-[38px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[44px] lg:text-[52px]">
          From Core Math to Clear Strategy
        </h2>

        <p className="mt-4 font-mono text-[12px] font-semibold tracking-[0.14em] text-[#B0B4BA] uppercase sm:text-[13px]">
          Not a Generic Chatbot
        </p>

        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px] text-[#6B7280] sm:text-[16px]">
          {TRAITS.map((trait, index) => (
            <span key={trait} className="flex items-center gap-2">
              {index > 0 ? (
                <span className="text-[#D1D5DB]" aria-hidden>
                  •
                </span>
              ) : null}
              {trait}
            </span>
          ))}
        </p>
      </div>

      {/* Process flow */}
      <div className="mt-12 sm:mt-14 lg:mt-16">
        <div className="-mx-2 overflow-x-auto pb-2 sm:mx-0">
          <div className="flex min-w-[880px] items-stretch px-2 sm:min-w-0 sm:px-0">
            {FLOW_STEPS.map((step, index) => {
              const isActive = inView && activeStep === index;
              const isDark = step.variant === "dark";
              const delay = 200 + index * 120;

              return (
                <div key={step.title} className="contents">
                  <article
                    className={`math-flow-card flex min-h-[108px] min-w-0 flex-1 flex-col items-center justify-center rounded-xl border px-4 py-5 text-center transition-all duration-500 sm:min-h-[116px] sm:px-5 sm:py-6 ${
                      inView ? "math-flow-visible" : ""
                    } ${
                      isDark
                        ? isActive
                          ? "border-[#2F6EFF] bg-[#0F1218] shadow-[0_0_0_1px_#2F6EFF,0_12px_32px_rgba(47,110,255,0.15)]"
                          : "border-[#2A3140] bg-[#0F1218]"
                        : isActive
                          ? "border-[#2F6EFF] bg-white shadow-[0_0_0_1px_#2F6EFF,0_12px_32px_rgba(47,110,255,0.1)]"
                          : "border-[#E8E8EA] bg-white"
                    } ${isActive && !isDark ? "math-flow-active-pulse" : ""}`}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <p
                      className={`font-mono text-[13px] font-bold tracking-[0.08em] uppercase sm:text-[14px] ${
                        isDark
                          ? "text-white"
                          : isActive
                            ? "text-[#2F6EFF]"
                            : "text-[#111111]"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`mt-2 font-mono text-[12px] leading-snug sm:text-[13px] ${
                        isDark ? "text-[#9CA3AF]" : "text-[#6B7280]"
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </article>

                  {index < FLOW_STEPS.length - 1 ? (
                    <FlowArrow active={inView && activeStep > index} />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
