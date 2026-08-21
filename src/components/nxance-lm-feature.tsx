"use client";

import { useEffect, useRef, useState } from "react";

const CAPABILITIES = [
  {
    title: "Purpose-Built Model",
    description:
      "Nxance LM is a large language model designed specifically for the financial sector.",
  },
  {
    title: "Zero-Hallucination Objective",
    description:
      "It is engineered to eliminate false information and provide highly accurate financial intelligence.",
  },
  {
    title: "Verified Datasets",
    description:
      "The model works strictly within verified financial data sources rather than broad, generalized information.",
  },
  {
    title: "Number Guard Protocol",
    description:
      "A proprietary security and verification layer checks mathematical and numeric data points for accuracy and auditability.",
  },
] as const;

const PIPELINE = [
  { title: "Intent Reader" },
  { title: "Number Guard Verification" },
  { title: "Nxance LM", center: true },
  { title: "Conversational Interface (Chat)" },
  { title: "Automated Report Writer" },
] as const;

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

function CapabilityCards({ active }: { active: boolean }) {
  return (
    <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16">
      {CAPABILITIES.map((item, index) => (
        <article
          key={item.title}
          className={`lm-capability-card rounded-2xl border border-[#E8E8EA] bg-white px-7 py-7 sm:px-8 sm:py-8 ${
            active ? "lm-capability-visible" : ""
          }`}
          style={{ transitionDelay: `${180 + index * 120}ms` }}
        >
          <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-[#111111] sm:text-[20px]">
            {item.title}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#6B7280] sm:text-[16px]">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}

function PipelineFlow({
  active,
  highlight,
}: {
  active: boolean;
  highlight: number;
}) {
  return (
    <div className="mt-14 sm:mt-16 lg:mt-20">
      <div className="-mx-2 overflow-x-auto pb-2 sm:mx-0">
        <div className="flex min-w-[920px] items-stretch px-2 sm:min-w-0 sm:px-0">
          {PIPELINE.map((node, index) => (
            <div key={node.title} className="contents">
              <article
                className={`lm-pipeline-node flex min-h-[132px] min-w-0 flex-1 flex-col rounded-xl border bg-white px-4 py-5 transition-all duration-500 sm:min-h-[140px] sm:px-5 sm:py-6 ${
                  active ? "lm-pipeline-visible" : ""
                } ${
                  active && highlight === index
                    ? "border-[#2F6EFF] shadow-[0_0_0_1px_#2F6EFF,0_12px_32px_rgba(47,110,255,0.12)]"
                    : "border-[#E8E8EA]"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <p className="text-[10px] font-semibold tracking-[0.12em] text-[#2F6EFF] uppercase sm:text-[11px]">
                  Feature 03 — Nxance LM
                </p>
                <p
                  className={`mt-auto pt-4 text-[15px] leading-[1.35] font-semibold transition-colors duration-500 sm:text-[16px] ${
                    active && highlight === index
                      ? "text-[#2F6EFF]"
                      : "text-[#111111]"
                  } ${"center" in node && node.center ? "text-center" : ""}`}
                >
                  {node.title}
                </p>
              </article>

              {index < PIPELINE.length - 1 ? (
                <div className="flex w-8 shrink-0 items-center sm:w-10 lg:w-12">
                  <div
                    className={`lm-pipeline-line h-[2px] w-full rounded-full bg-[#D9E4FF] transition-colors duration-500 ${
                      active && highlight > index ? "bg-[#2F6EFF]" : ""
                    }`}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NxanceLmFeature() {
  const { ref, inView } = useInView(0.12);
  const [highlight, setHighlight] = useState(2);

  useEffect(() => {
    if (!inView) return;

    const timer = window.setInterval(() => {
      setHighlight((current) => (current + 1) % PIPELINE.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="mt-20 border-t border-[#ECECEF] pt-20 sm:mt-24 sm:pt-24 lg:mt-28 lg:pt-28"
    >
      <div className="mx-auto max-w-[980px] text-center">
        <p
          className={`text-[13px] font-semibold tracking-[0.14em] text-[#2F6EFF] uppercase transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Feature 03 — Nxance LM
        </p>

        <h2
          className={`mt-5 text-[38px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#111111] transition-all duration-700 delay-100 sm:text-[44px] lg:text-[52px] ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Turn complex data into decisions.
        </h2>

        <p
          className={`mx-auto mt-6 max-w-[760px] text-[18px] leading-[1.55] text-[#6B7280] transition-all duration-700 delay-150 sm:mt-7 sm:text-[20px] ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          A purpose-built financial intelligence model designed to interpret
          verified financial data and translate complex analysis into clear
          decisions.
        </p>
      </div>

      <CapabilityCards active={inView} />
      <PipelineFlow active={inView} highlight={highlight} />
    </section>
  );
}
