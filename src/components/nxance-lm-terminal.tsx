"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SECTORS = [
  "Market",
  "News",
  "Currency",
  "Commodities",
  "Equities",
  "Macro",
  "Technology",
  "Startups",
  "Trade",
  "Research",
  "Analysis",
] as const;

const SUGGESTED_QUERIES = [
  "How current scenario affects my strategy?",
  "Make report card of my portfolio?",
  "Build strategy for me?",
  "What's going on in the market today?",
  "How can I improve my portfolio?",
] as const;

const DEFAULT_QUERY = "Analyze my overall portfolio health.";

const VERIFICATION_LINES = [
  "Verified Data: Pulled from internal ledger.",
  "Validated Inputs: Current market prices confirmed.",
  "Checked Calculations: Structural math passed.",
  "Audit Ready: Record ID #NX-8832-A.",
] as const;

const ANALYSIS_TEXT =
  "Your portfolio Sharpe Ratio is 1.42. You have a 6% overallocation in US Equities compared to your stated 'Aggressive Growth' baseline. Rebalancing could improve risk-adjusted returns by ~0.8%.";

type DemoPhase =
  | "idle"
  | "typing"
  | "query"
  | "verify"
  | "analysis"
  | "document"
  | "hold";

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 5 6v6c0 4.4 3 8.5 7 9.8 4-1.3 7-5.4 7-9.8V6l-7-3Z"
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

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m5 12 14-7-4 7 4 7-14-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useInView(threshold = 0.12) {
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

export function NxanceLmTerminal() {
  const { ref, inView } = useInView();
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [inputText, setInputText] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [visibleVerifyLines, setVisibleVerifyLines] = useState(0);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
    null,
  );
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);
  const runDemoRef = useRef<(query: string, suggestionIndex?: number | null) => void>(
    () => {},
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const resetDemo = useCallback(() => {
    setPhase("idle");
    setInputText("");
    setActiveQuery("");
    setVisibleVerifyLines(0);
  }, []);

  const runDemo = useCallback(
    (query: string, suggestionIndex: number | null = null) => {
      clearTimers();
      resetDemo();
      setSelectedSuggestion(suggestionIndex);

      schedule(() => setPhase("typing"), 400);

      query.split("").forEach((_, index) => {
        schedule(() => {
          setInputText(query.slice(0, index + 1));
        }, 500 + index * 45);
      });

      const typingDone = 500 + query.length * 45 + 600;
      schedule(() => {
        setPhase("query");
        setActiveQuery(query);
      }, typingDone);

      schedule(() => {
        setPhase("verify");
        setVisibleVerifyLines(1);
      }, typingDone + 700);

      VERIFICATION_LINES.forEach((_, index) => {
        if (index === 0) return;
        schedule(() => setVisibleVerifyLines(index + 1), typingDone + 700 + index * 450);
      });

      const verifyDone =
        typingDone + 700 + VERIFICATION_LINES.length * 450 + 400;
      schedule(() => setPhase("analysis"), verifyDone);
      schedule(() => setPhase("document"), verifyDone + 900);
      schedule(() => setPhase("hold"), verifyDone + 1600);
      schedule(() => {
        resetDemo();
        setSelectedSuggestion(null);
        schedule(() => runDemoRef.current(DEFAULT_QUERY), 1200);
      }, verifyDone + 5500);
    },
    [clearTimers, resetDemo, schedule],
  );

  useEffect(() => {
    runDemoRef.current = runDemo;
  }, [runDemo]);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    runDemo(DEFAULT_QUERY);
    return clearTimers;
  }, [inView, runDemo, clearTimers]);

  const handleSuggestionClick = (query: string, index: number) => {
    runDemo(
      query.endsWith("?") ? query : query,
      index,
    );
  };

  return (
    <div ref={ref} className="mt-14 sm:mt-16 lg:mt-20">
      <div className="overflow-hidden rounded-2xl border border-[#2A3140] bg-[#0F1218] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A3140] px-5 py-4 sm:px-6">
          <p className="font-mono text-[12px] font-semibold tracking-[0.1em] text-white uppercase sm:text-[13px]">
            Nxance LM{" "}
            <span className="text-[#6B7280]">|</span> Financial Intelligence
            Terminal
          </p>
          <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-[#2F6EFF] sm:text-[12px]">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-[#2F6EFF]" />
            Number Guard Active{" "}
            <span className="text-[#4B5563]">|</span> Verified Data Environment
          </p>
        </div>

        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="border-b border-[#2A3140] p-5 lg:border-r lg:border-b-0 lg:p-6">
            <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase sm:text-[11px]">
              Sectors & Data Streams
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SECTORS.map((sector) => (
                <span
                  key={sector}
                  className="rounded-md border border-[#2A3140] bg-[#161B22] px-2.5 py-1.5 font-mono text-[11px] font-medium text-[#9CA3AF] sm:text-[12px]"
                >
                  {sector}
                </span>
              ))}
            </div>

            <p className="mt-6 font-mono text-[10px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase sm:text-[11px]">
              Suggested Query Vectors
            </p>
            <ul className="mt-3 space-y-2">
              {SUGGESTED_QUERIES.map((query, index) => (
                <li key={query}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(query, index)}
                    className={`w-full rounded-lg border px-3 py-2.5 text-left font-mono text-[12px] leading-snug transition-all duration-300 sm:text-[13px] ${
                      selectedSuggestion === index
                        ? "border-[#2F6EFF] bg-[#2F6EFF]/10 text-[#93B4FF]"
                        : "border-[#2A3140] bg-[#161B22] text-[#C9D1D9] hover:border-[#3D4F6F] hover:bg-[#1C2330]"
                    }`}
                  >
                    <span className="text-[#2F6EFF]">&gt;</span> {query}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main terminal */}
          <div className="flex min-h-[420px] flex-col p-5 sm:min-h-[480px] sm:p-6 lg:p-7">
            <div className="flex-1 space-y-5">
              {/* User query */}
              <div
                className={`font-mono text-[14px] transition-all duration-500 sm:text-[15px] ${
                  activeQuery
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {activeQuery ? (
                  <p className="text-[#E6EDF3]">
                    <span className="text-[#2F6EFF]">&gt;</span> {activeQuery}
                  </p>
                ) : null}
              </div>

              {/* Number Guard */}
              <div
                className={`rounded-xl border transition-all duration-600 ${
                  phase === "verify" ||
                  phase === "analysis" ||
                  phase === "document" ||
                  phase === "hold"
                    ? "translate-y-0 border-[#2F6EFF]/60 opacity-100 shadow-[0_0_24px_rgba(47,110,255,0.12)]"
                    : "translate-y-3 border-transparent opacity-0"
                }`}
              >
                <div className="rounded-xl border border-[#2F6EFF]/40 bg-[#161B22]/80 px-4 py-4 sm:px-5 sm:py-5">
                  <div className="flex items-center gap-2 text-[#2F6EFF]">
                    <ShieldIcon />
                    <p className="font-mono text-[11px] font-semibold tracking-[0.12em] uppercase sm:text-[12px]">
                      Number Guard Verification
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {VERIFICATION_LINES.map((line, index) => (
                      <li
                        key={line}
                        className={`font-mono text-[12px] leading-relaxed transition-all duration-500 sm:text-[13px] ${
                          index < visibleVerifyLines
                            ? "translate-x-0 opacity-100"
                            : "translate-x-2 opacity-0"
                        }`}
                      >
                        <span className="text-[#2F6EFF]">
                          Feature 03 – Nxance LM
                        </span>
                        <span className="text-[#6B7280]"> · </span>
                        <span className="text-[#93B4FF]">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Analysis */}
              <div
                className={`transition-all duration-500 ${
                  phase === "analysis" ||
                  phase === "document" ||
                  phase === "hold"
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase sm:text-[11px]">
                  Portfolio Analysis Result
                </p>
                <p className="mt-3 font-mono text-[14px] leading-[1.65] text-[#E6EDF3] sm:text-[15px]">
                  {ANALYSIS_TEXT}
                </p>
              </div>

              {/* Document card */}
              <div
                className={`rounded-xl border border-[#2A3140] bg-[#161B22] px-4 py-4 transition-all duration-600 sm:px-5 sm:py-5 ${
                  phase === "document" || phase === "hold"
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase sm:text-[11px]">
                  Attached Document
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[14px] font-semibold text-white sm:text-[15px]">
                    Nxance Financial Research Report
                  </p>
                  <button
                    type="button"
                    className="rounded-md bg-[#2F6EFF] px-4 py-2 font-mono text-[12px] font-semibold text-white transition-colors hover:bg-[#2558D9] sm:text-[13px]"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="mt-6 border-t border-[#2A3140] pt-5">
              <p className="mb-2 font-mono text-[10px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase sm:text-[11px]">
                Ask Nxance
              </p>
              <div className="flex items-center gap-3 rounded-xl border border-[#2A3140] bg-[#0A0D12] px-4 py-3.5">
                <div className="min-w-0 flex-1 font-mono text-[13px] sm:text-[14px]">
                  {phase === "typing" || inputText ? (
                    <span className="text-[#E6EDF3]">
                      {inputText}
                      {phase === "typing" ? (
                        <span className="terminal-cursor ml-0.5 inline-block h-[1em] w-[2px] translate-y-0.5 bg-[#2F6EFF]" />
                      ) : null}
                    </span>
                  ) : (
                    <span className="terminal-glitch text-[#2F6EFF]/80">
                      Feature 03 – Nxance LM
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-[#6B7280]">
                  <SendIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
