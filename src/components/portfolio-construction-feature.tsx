"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { number: "01", label: "Define Investor Profile" },
  { number: "02", label: "Macro Allocation Strategy" },
  { number: "03", label: "Asset & Instrument Selection" },
  { number: "04", label: "Fraud Screening (Exclusion)" },
  { number: "05", label: "Risk Overlay Validation" },
] as const;

const ALLOCATIONS = [
  { label: "Equity", percent: 65 },
  { label: "Mutual Funds", percent: 15 },
  { label: "Debt/Bonds", percent: 10 },
  { label: "Gold", percent: 5 },
  { label: "FD / Cash", percent: 5 },
] as const;

const PROFILE = [
  { label: "Goal", value: "Long-term Wealth" },
  { label: "Horizon", value: "15+ Years" },
  { label: "Risk", value: "High" },
] as const;

function useInView(threshold = 0.2) {
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

function AllocationBars({
  active,
  highlight,
}: {
  active: boolean;
  highlight: number;
}) {
  return (
    <div className="mt-8 space-y-5">
      {ALLOCATIONS.map((item, index) => {
        const isEmphasized = active && (highlight >= 2 || index === 0);
        const isPrimary = index === 0;
        const delay = 200 + index * 120;

        return (
          <div key={item.label}>
            <div className="mb-2.5 flex items-center justify-between gap-4">
              <span className="font-mono text-[16px] font-medium text-[#111111] sm:text-[17px]">
                {item.label}
              </span>
              <span className="font-mono text-[16px] font-semibold tabular-nums text-[#111111] sm:text-[17px]">
                {item.percent}%
              </span>
            </div>
            <div className="h-[10px] overflow-hidden rounded-full bg-[#ECECEF]">
              <div
                className={`allocation-bar h-full rounded-full transition-colors duration-500 ${
                  isPrimary || isEmphasized
                    ? "bg-[#2F6EFF]"
                    : "bg-[#D4D4D8]"
                } ${active ? "allocation-bar-visible" : ""}`}
                style={{
                  width: active ? `${item.percent}%` : "0%",
                  transitionDelay: `${delay}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ConstructionSteps({
  active,
  highlight,
}: {
  active: boolean;
  highlight: number;
}) {
  return (
    <ol className="mt-10 space-y-1 sm:mt-12">
      {STEPS.map((step, index) => {
        const isActive = active && highlight === index;
        const delay = 120 + index * 140;

        return (
          <li
            key={step.number}
            className={`construction-step relative rounded-lg px-4 py-3.5 sm:px-5 sm:py-4 ${
              active ? "construction-step-visible" : ""
            } ${isActive ? "bg-[#EEF3FF]" : "bg-transparent"}`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <div className="flex items-center gap-5 sm:gap-6">
              <span
                className={`w-8 shrink-0 font-mono text-[17px] font-semibold tabular-nums transition-colors duration-500 sm:text-[18px] ${
                  isActive ? "text-[#2F6EFF]" : "text-[#9CA3AF]"
                }`}
              >
                {step.number}
              </span>
              <span
                className={`font-sans text-[18px] font-medium transition-all duration-500 sm:text-[20px] ${
                  isActive
                    ? "translate-x-0.5 font-semibold text-[#2F6EFF]"
                    : "text-[#4B5563]"
                }`}
              >
                {step.label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function TargetAllocationCard({
  active,
  highlight,
}: {
  active: boolean;
  highlight: number;
}) {
  return (
    <div
      className={`rounded-[24px] border border-[#E8E8EA] bg-white px-7 py-8 shadow-[0_16px_48px_rgba(17,17,17,0.06)] transition-all duration-700 sm:px-8 sm:py-9 lg:px-9 lg:py-10 ${
        active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#ECECEF] pb-5">
        <p className="text-[12px] font-semibold tracking-[0.14em] text-[#B0B4BA] uppercase">
          Target Allocation Model
        </p>
        <p className="text-[17px] font-semibold text-[#111111] sm:text-[18px]">
          Aggressive Growth
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 sm:gap-6">
        {PROFILE.map((item) => (
          <div key={item.label}>
            <p className="text-[12px] font-medium tracking-[0.08em] text-[#B0B4BA] uppercase">
              {item.label}
            </p>
            <p className="mt-1.5 text-[16px] font-semibold text-[#111111] sm:text-[17px]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <AllocationBars active={active} highlight={highlight} />
    </div>
  );
}

export function PortfolioConstructionFeature() {
  const { ref, inView } = useInView(0.15);
  const [highlight, setHighlight] = useState(2);

  useEffect(() => {
    if (!inView) return;

    const timer = window.setInterval(() => {
      setHighlight((current) => (current + 1) % STEPS.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="mt-20 border-t border-[#ECECEF] pt-20 sm:mt-24 sm:pt-24 lg:mt-28 lg:pt-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
        <TargetAllocationCard active={inView} highlight={highlight} />

        <div className="lg:pl-4 xl:pl-8">
          <p
            className={`text-[13px] font-semibold tracking-[0.14em] text-[#2F6EFF] uppercase transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Feature 02 — Construction
          </p>

          <h2
            className={`mt-5 max-w-[560px] text-[38px] leading-[1.12] font-semibold tracking-[-0.03em] text-[#111111] transition-all duration-700 delay-100 sm:text-[44px] lg:mt-6 lg:text-[48px] ${
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Build a goal-aligned portfolio from scratch.
          </h2>

          <ConstructionSteps active={inView} highlight={highlight} />
        </div>
      </div>
    </section>
  );
}
