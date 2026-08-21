"use client";

import { useEffect, useRef, useState } from "react";

const CHART = {
  width: 420,
  height: 300,
  padLeft: 56,
  padRight: 24,
  padTop: 28,
  padBottom: 48,
} as const;

const CURRENT = { x: 292, y: 178 };
const OPTIMIZED = { x: 148, y: 88 };

const plotWidth = CHART.width - CHART.padLeft - CHART.padRight;
const plotHeight = CHART.height - CHART.padTop - CHART.padBottom;

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

function EfficientFrontierChart({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) return;

    const t1 = window.setTimeout(() => setPhase(1), 400);
    const t2 = window.setTimeout(() => setPhase(2), 1100);
    const t3 = window.setTimeout(() => setPhase(3), 1800);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [active]);

  const gridLines = [0.25, 0.5, 0.75];

  return (
    <div
      className={`rounded-[24px] bg-[#F3F3F5] px-5 py-6 transition-all duration-700 sm:px-7 sm:py-8 ${
        active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="mx-auto w-full max-w-[440px]"
        aria-label="Efficient frontier chart comparing current and optimized portfolio positions"
        role="img"
      >
        {/* Y-axis label */}
        <text
          x={16}
          y={CHART.padTop + plotHeight / 2}
          fill="#B0B4BA"
          fontSize="10"
          fontFamily="var(--font-jetbrains-mono, monospace)"
          fontWeight="600"
          letterSpacing="0.12em"
          transform={`rotate(-90 16 ${CHART.padTop + plotHeight / 2})`}
          textAnchor="middle"
        >
          EXPECTED RETURN
        </text>

        {/* X-axis label */}
        <text
          x={CHART.padLeft + plotWidth / 2}
          y={CHART.height - 12}
          fill="#B0B4BA"
          fontSize="10"
          fontFamily="var(--font-jetbrains-mono, monospace)"
          fontWeight="600"
          letterSpacing="0.12em"
          textAnchor="middle"
        >
          EXPECTED RISK (VOLATILITY)
        </text>

        {/* Plot area grid */}
        {gridLines.map((ratio) => (
          <g key={ratio}>
            <line
              x1={CHART.padLeft}
              y1={CHART.padTop + plotHeight * ratio}
              x2={CHART.padLeft + plotWidth}
              y2={CHART.padTop + plotHeight * ratio}
              stroke="#E4E4E7"
              strokeWidth="1"
            />
            <line
              x1={CHART.padLeft + plotWidth * ratio}
              y1={CHART.padTop}
              x2={CHART.padLeft + plotWidth * ratio}
              y2={CHART.padTop + plotHeight}
              stroke="#E4E4E7"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Axes */}
        <line
          x1={CHART.padLeft}
          y1={CHART.padTop + plotHeight}
          x2={CHART.padLeft + plotWidth}
          y2={CHART.padTop + plotHeight}
          stroke="#D4D4D8"
          strokeWidth="1.5"
        />
        <line
          x1={CHART.padLeft}
          y1={CHART.padTop}
          x2={CHART.padLeft}
          y2={CHART.padTop + plotHeight}
          stroke="#D4D4D8"
          strokeWidth="1.5"
        />

        {/* Optimization path */}
        <line
          x1={CURRENT.x}
          y1={CURRENT.y}
          x2={OPTIMIZED.x}
          y2={OPTIMIZED.y}
          stroke="#2F6EFF"
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinecap="round"
          opacity={phase >= 3 ? 1 : 0}
          className="transition-opacity duration-1000"
        />

        {/* Current portfolio dot */}
        <circle
          cx={CURRENT.x}
          cy={CURRENT.y}
          r={phase >= 1 ? 7 : 0}
          fill="#B0B4BA"
          className="transition-all duration-500"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0)",
            transformOrigin: `${CURRENT.x}px ${CURRENT.y}px`,
          }}
        />
        <circle
          cx={CURRENT.x}
          cy={CURRENT.y}
          r={phase >= 1 ? 12 : 0}
          fill="#B0B4BA"
          fillOpacity="0.18"
          className="transition-all duration-700"
        />

        {/* Optimized portfolio dot */}
        <circle
          cx={OPTIMIZED.x}
          cy={OPTIMIZED.y}
          r={phase >= 2 ? 7 : 0}
          fill="#2F6EFF"
          className="transition-all duration-500"
          style={{
            opacity: phase >= 2 ? 1 : 0,
          }}
        />
        <circle
          cx={OPTIMIZED.x}
          cy={OPTIMIZED.y}
          r={14}
          fill="#2F6EFF"
          fillOpacity={phase >= 2 ? 0.15 : 0}
          className={`transition-all duration-700 ${phase >= 2 ? "frontier-dot-pulse" : ""}`}
        />
      </svg>
    </div>
  );
}

export function QuantifiableOptimization() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="mt-20 border-t border-[#ECECEF] pt-20 sm:mt-24 sm:pt-24 lg:mt-28 lg:pt-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
        <div
          className={`transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className="text-[38px] leading-[1.12] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[44px] lg:text-[48px]">
            Quantifiable Optimization
          </h2>

          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.55] text-[#6B7280] sm:mt-6 sm:text-[20px]">
            Visualize the exact impact of portfolio rebalancing on your efficient
            frontier.
          </p>

          <ul className="mt-8 space-y-4 sm:mt-10">
            <li
              className={`flex items-center gap-3 font-mono text-[14px] text-[#6B7280] transition-all duration-500 sm:text-[15px] ${
                inView ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="size-2.5 shrink-0 rounded-full bg-[#B0B4BA]" />
              Current Portfolio Position
            </li>
            <li
              className={`flex items-center gap-3 font-mono text-[14px] text-[#6B7280] transition-all duration-500 sm:text-[15px] ${
                inView ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              <span className="size-2.5 shrink-0 rounded-full bg-[#2F6EFF]" />
              Optimized Position
            </li>
          </ul>
        </div>

        <EfficientFrontierChart active={inView} />
      </div>
    </section>
  );
}
