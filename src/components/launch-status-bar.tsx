"use client";

import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-12-15T00:00:00+05:30");
const BUILD_PROGRESS = 50;

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function CountdownUnit({
  value,
  label,
  padValue = true,
}: {
  value: number;
  label: string;
  padValue?: boolean;
}) {
  const display = padValue ? pad(value) : String(value);

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1 sm:flex-none sm:flex-row sm:items-baseline sm:gap-1.5">
      <span className="text-[28px] leading-none font-bold tracking-tight text-[#111111] tabular-nums sm:text-[38px] lg:text-[42px]">
        {display}
      </span>
      <span className="text-[11px] font-medium tracking-[0.08em] text-[#B0B4BA] uppercase">
        {label}
      </span>
    </div>
  );
}

export function LaunchStatusBar({ waitlistCount }: { waitlistCount: number }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(LAUNCH_DATE));
    tick();
    const timer = window.setInterval(tick, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdown = timeLeft ?? {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const formattedCount = waitlistCount.toLocaleString("en-US");

  return (
    <div className="rounded-2xl border border-[#E8E8EA] bg-white px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        {/* 1. Launch countdown — always first */}
        <div className="w-full shrink-0 lg:w-auto">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-[#2F6EFF] uppercase">
            Launch Window
          </p>
          <div className="mt-4 flex w-full items-end justify-between gap-2 sm:mt-3 sm:w-auto sm:items-baseline sm:justify-start sm:gap-5">
            <CountdownUnit value={countdown.days} label="D" padValue={false} />
            <CountdownUnit value={countdown.hours} label="H" />
            <CountdownUnit value={countdown.minutes} label="M" />
            <CountdownUnit value={countdown.seconds} label="S" />
          </div>
        </div>

        {/* 2. Build progress — middle */}
        <div className="w-full min-w-0 border-t border-[#ECECEF] pt-7 lg:max-w-[420px] lg:border-t-0 lg:px-6 lg:pt-0">
          <p className="mb-2 text-[10px] font-medium tracking-[0.1em] text-[#C4C8CE] uppercase sm:text-right">
            Nxance is being built
          </p>
          <div className="h-[6px] overflow-hidden rounded-full bg-[#ECECEF]">
            <div
              className="h-full rounded-full bg-[#2F6EFF] transition-[width] duration-700"
              style={{ width: `${BUILD_PROGRESS}%` }}
            />
          </div>
        </div>

        {/* 3. Waitlist size — last */}
        <div className="w-full shrink-0 border-t border-[#ECECEF] pt-7 lg:w-auto lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          <p className="text-[34px] leading-none font-bold tracking-tight text-[#111111] tabular-nums sm:text-[38px] lg:text-[42px]">
            {formattedCount}
          </p>
          <p className="mt-2 text-[11px] font-medium tracking-[0.12em] text-[#B0B4BA] uppercase">
            Waitlist Size
          </p>
        </div>
      </div>
    </div>
  );
}
