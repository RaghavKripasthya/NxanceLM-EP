"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { number: "01", label: "Input Portfolio Data" },
  { number: "02", label: "Deep Structural Analysis" },
  { number: "03", label: "Risk & Correlation Mapping" },
  { number: "04", label: "Fraud & Anomaly Detection" },
  { number: "05", label: "Actionable Guidance Output" },
] as const;

const INSIGHTS = [
  { label: "Concentration Risk", value: "Elevated", tone: "warning" },
  { label: "Tax Inefficiency", value: "High", tone: "danger" },
  { label: "Fee Drag", value: "Optimal", tone: "success" },
] as const;

const TONE_CLASS = {
  warning: "text-[#E08B2E]",
  danger: "text-[#E05252]",
  success: "text-[#22A06B]",
} as const;

const SCORE = 61;
const STEP_SCORES = [45, 52, 57, 59, 61] as const;
const GAUGE_SIZE = 260;
const STROKE = 16;

function useInView(threshold = 0.25) {
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

function useCountUp(target: number, active: boolean, duration = 650) {
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    if (!active) return;

    const from = valueRef.current;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + (target - from) * eased);
      valueRef.current = next;
      setValue(next);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        valueRef.current = target;
        setValue(target);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, target]);

  return value;
}

function AnimatedHealthGauge({
  score,
  active,
  emphasized,
}: {
  score: number;
  active: boolean;
  emphasized?: boolean;
}) {
  const radius = (GAUGE_SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);
  const offsetRef = useRef(circumference);
  const displayScore = useCountUp(score, active, emphasized ? 900 : 650);

  useEffect(() => {
    if (!active) return;

    const targetOffset = circumference - (score / 100) * circumference;
    const fromOffset = offsetRef.current;
    const start = performance.now();
    const duration = emphasized ? 900 : 650;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = fromOffset + (targetOffset - fromOffset) * eased;
      offsetRef.current = next;
      setOffset(next);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        offsetRef.current = targetOffset;
        setOffset(targetOffset);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, circumference, emphasized, score]);

  return (
    <div className="relative mx-auto flex size-[260px] items-center justify-center">
      <div
        className={`absolute inset-4 rounded-full bg-[#2F6EFF]/10 blur-2xl transition-opacity duration-1000 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />

      <svg
        width={GAUGE_SIZE}
        height={GAUGE_SIZE}
        viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`}
        aria-hidden
        className="absolute inset-0 drop-shadow-[0_8px_24px_rgba(47,110,255,0.18)]"
      >
        <defs>
          <linearGradient id="healthGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B8CFF" />
            <stop offset="100%" stopColor="#2F6EFF" />
          </linearGradient>
        </defs>
        <circle
          cx={GAUGE_SIZE / 2}
          cy={GAUGE_SIZE / 2}
          r={radius}
          fill="none"
          stroke="#E4E4E7"
          strokeWidth={STROKE}
        />
        <circle
          cx={GAUGE_SIZE / 2}
          cy={GAUGE_SIZE / 2}
          r={radius}
          fill="none"
          stroke="url(#healthGaugeGradient)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${GAUGE_SIZE / 2} ${GAUGE_SIZE / 2})`}
          className={active ? "health-gauge-glow" : undefined}
          style={
            emphasized
              ? { filter: "drop-shadow(0 0 12px rgba(47,110,255,0.45))" }
              : undefined
          }
        />
      </svg>

      <div
        className={`relative text-center transition-transform duration-700 ${
          active ? "scale-100" : "scale-95 opacity-70"
        }`}
      >
        <p className="text-[68px] leading-none font-bold tracking-tight text-[#111111] tabular-nums">
          {displayScore}
        </p>
        <p className="mt-2 text-[15px] font-medium tracking-[0.08em] text-[#B0B4BA] uppercase">
          /100 Health
        </p>
      </div>
    </div>
  );
}

function FeatureSteps({
  active,
  highlight,
}: {
  active: boolean;
  highlight: number;
}) {
  return (
    <ol className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
      {STEPS.map((step, index) => {
        const isActive = active && highlight === index;
        const isFinal = index === STEPS.length - 1;
        const delay = 120 + index * 140;

        return (
          <li
            key={step.number}
            className={`feature-step-item flex items-center gap-5 sm:gap-6 ${
              active ? "feature-step-visible" : ""
            } ${isActive ? "feature-step-active" : ""} ${
              isActive && isFinal ? "feature-step-final" : ""
            }`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-[15px] font-semibold tabular-nums transition-all duration-500 sm:size-11 sm:text-[16px] ${
                isActive && isFinal
                  ? "border-[#22A06B] bg-[#22A06B] text-white shadow-[0_8px_20px_rgba(34,160,107,0.35)]"
                  : isActive
                    ? "border-[#2F6EFF] bg-[#2F6EFF] text-white shadow-[0_8px_20px_rgba(47,110,255,0.35)]"
                    : "border-[#E4E4E7] bg-white text-[#111111]"
              }`}
            >
              {step.number}
            </span>
            <span
              className={`font-sans text-[18px] font-medium transition-all duration-500 sm:text-[20px] ${
                isActive && isFinal
                  ? "translate-x-1 font-semibold text-[#111111]"
                  : isActive
                    ? "text-[#111111]"
                    : "text-[#4B5563]"
              }`}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function InsightPanel({ active }: { active: boolean }) {
  return (
    <div
      className={`mx-auto mt-10 max-w-[420px] rounded-2xl border border-[#E8E8EA] bg-white px-6 py-5 shadow-[0_12px_40px_rgba(17,17,17,0.06)] transition-all duration-700 sm:mt-12 sm:px-7 sm:py-6 ${
        active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <p className="text-[12px] font-semibold tracking-[0.14em] text-[#B0B4BA] uppercase">
        Insight Panel
      </p>

      <ul className="mt-5 divide-y divide-[#ECECEF]">
        {INSIGHTS.map((item, index) => (
          <li
            key={item.label}
            className={`insight-row flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 ${
              active ? "insight-row-visible" : ""
            }`}
            style={{ transitionDelay: `${500 + index * 140}ms` }}
          >
            <span className="font-mono text-[16px] font-medium text-[#111111] sm:text-[17px]">
              {item.label}
            </span>
            <span
              className={`font-mono text-[16px] font-semibold sm:text-[17px] ${TONE_CLASS[item.tone]}`}
            >
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HealthCheckFeature() {
  const { ref, inView } = useInView(0.2);
  const [highlight, setHighlight] = useState(0);
  const gaugeScore = STEP_SCORES[highlight] ?? SCORE;
  const isFinalStep = highlight === STEPS.length - 1;

  useEffect(() => {
    if (!inView) return;

    const timer = window.setInterval(() => {
      setHighlight((current) => (current + 1) % STEPS.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="mt-20 border-t border-[#ECECEF] pt-20 sm:mt-24 sm:pt-24 lg:mt-28 lg:pt-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
        <div>
          <p
            className={`text-[13px] font-semibold tracking-[0.14em] text-[#2F6EFF] uppercase transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Feature 01 — Health Check
          </p>

          <h2
            className={`mt-5 max-w-[560px] text-[38px] leading-[1.12] font-semibold tracking-[-0.03em] text-[#111111] transition-all duration-700 delay-100 sm:text-[44px] lg:mt-6 lg:text-[48px] ${
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Know the true health of what you already own.
          </h2>

          <FeatureSteps active={inView} highlight={highlight} />
        </div>

        <div
          className={`relative overflow-hidden rounded-[24px] bg-[#F3F3F5] px-8 py-10 transition-all duration-700 sm:px-10 sm:py-12 lg:px-12 lg:py-14 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "180ms" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 20%, rgba(47,110,255,0.08), transparent 55%)",
            }}
          />

          <AnimatedHealthGauge
            score={gaugeScore}
            active={inView}
            emphasized={isFinalStep}
          />
          <InsightPanel active={inView} />
        </div>
      </div>
    </section>
  );
}
