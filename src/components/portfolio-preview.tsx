"use client";

import { useEffect, useState } from "react";

const ACTIVE_BLUE = "#2F6EFF";
const IDLE_GRAY = "#D4D4D8";

type Snapshot = {
  score: number;
  sharpe: number;
  volatility: number;
  bars: number[];
  activeIndex: number;
};

const INITIAL: Snapshot = {
  score: 61,
  sharpe: 1.42,
  volatility: 8.2,
  bars: [38, 52, 64, 76, 88, 100],
  activeIndex: 5,
};

function randomIn(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createSnapshot(): Snapshot {
  const bases = [34, 46, 58, 70, 84, 96];
  const bars = bases.map((base) =>
    Math.min(100, Math.max(24, Math.round(base + randomIn(-8, 8)))),
  );
  const tallest = bars.reduce(
    (best, height, index) => (height > bars[best] ? index : best),
    0,
  );

  return {
    score: Math.round(randomIn(54, 79)),
    sharpe: Math.round(randomIn(1.12, 1.86) * 100) / 100,
    volatility: Math.round(randomIn(6.1, 10.4) * 10) / 10,
    bars,
    activeIndex: tallest,
  };
}

export function PortfolioPreview() {
  const [snapshot, setSnapshot] = useState<Snapshot>(INITIAL);
  const [activeIndex, setActiveIndex] = useState(INITIAL.activeIndex);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const next = createSnapshot();
      setSnapshot(next);
      setActiveIndex(next.activeIndex);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      className="relative flex min-h-[380px] w-full flex-col overflow-hidden rounded-[18px] border border-[#E8E8EA] bg-white sm:min-h-[440px] lg:min-h-[560px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #D8D8DC 1.15px, transparent 1.15px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="absolute top-4 right-5 z-10 flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#22C55E]" />
        <span className="text-[12px] font-medium tracking-[0.14em] text-[#9CA3AF] uppercase">
          System Ready
        </span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center p-6 pt-14 sm:p-8 sm:pt-16">
        <div className="flex w-full max-w-[440px] flex-1 flex-col rounded-2xl border border-[#EEEEF0] bg-white px-7 py-6 shadow-[0_12px_40px_rgba(17,17,17,0.06)]">
          <div className="flex shrink-0 items-center justify-between">
            <p className="text-[13px] font-medium tracking-[0.12em] text-[#9CA3AF] uppercase">
              Portfolio Health
            </p>
            <p className="text-[20px] font-semibold text-[#2F6EFF]">
              {snapshot.score}/100
            </p>
          </div>

          <div className="mt-6 flex h-[200px] items-end gap-3">
            {snapshot.bars.map((height, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={index}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Select column ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className="flex h-full min-w-0 flex-1 cursor-pointer items-end rounded-none border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6EFF]"
                >
                  <span
                    className="block w-full rounded-t-[6px] rounded-b-[2px] transition-colors duration-200"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isActive ? ACTIVE_BLUE : IDLE_GRAY,
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid shrink-0 grid-cols-2 gap-6">
            <div>
              <p className="text-[34px] leading-none font-bold tracking-tight text-[#111111]">
                {snapshot.sharpe.toFixed(2)}
              </p>
              <p className="mt-2 text-[12px] font-medium tracking-[0.12em] text-[#9CA3AF] uppercase">
                Sharpe Ratio
              </p>
            </div>
            <div>
              <p className="text-[34px] leading-none font-bold tracking-tight text-[#111111]">
                {snapshot.volatility.toFixed(1)}%
              </p>
              <p className="mt-2 text-[12px] font-medium tracking-[0.12em] text-[#9CA3AF] uppercase">
                Exp. Volatility
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
