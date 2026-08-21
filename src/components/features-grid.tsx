import type { ReactNode } from "react";

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

function RobotIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[#B0B4BA]"
    >
      <rect x="5" y="8" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9.5" cy="13" r="1.25" fill="currentColor" />
      <circle cx="14.5" cy="13" r="1.25" fill="currentColor" />
      <path d="M12 4v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[#B0B4BA]"
    >
      <circle cx="12" cy="13" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 13l3.5-2.5M12 6V4M5.5 9.5 4 8.5M18.5 9.5 20 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="13" r="1.25" fill="currentColor" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[#B0B4BA]"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" />
      <path d="M12 12 18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AuditIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[#B0B4BA]"
    >
      <path
        d="M8 4h8l2 3v13H6V7l2-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.5 11 14l3.5-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FEATURES: Feature[] = [
  {
    title: "Generative Analyst",
    description:
      "Synthesizes unstructured financial data into actionable, institutional-grade insights instantly.",
    icon: <RobotIcon />,
  },
  {
    title: "Terminal Speed Node",
    description:
      "Ultra-low latency execution and data retrieval tailored for high-frequency analytical demands.",
    icon: <SpeedIcon />,
  },
  {
    title: "Global Market Radar",
    description:
      "Continuous macro-economic surveillance identifying cross-asset correlations and emerging risks.",
    icon: <RadarIcon />,
  },
  {
    title: "Deep Corporate Auditor",
    description:
      "Automated forensic accounting protocols scanning filings for anomalies and red flags.",
    icon: <AuditIcon />,
  },
];

export function FeaturesGrid() {
  return (
    <section className="mt-16 sm:mt-20 lg:mt-24">
      <p className="text-center text-[11px] font-medium tracking-[0.14em] text-[#B0B4BA] uppercase">
        The Ultimate Financial Combo
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-[#E8E8EA] bg-white px-6 py-7"
          >
            <div className="mb-5">{feature.icon}</div>
            <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
              {feature.title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.55] text-[#6B7280]">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
