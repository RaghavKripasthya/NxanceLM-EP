import Image from "next/image";
import { WaitlistForm } from "@/components/waitlist-form";
import { PortfolioPreview } from "@/components/portfolio-preview";
import { LaunchStatusBar } from "@/components/launch-status-bar";
import { FeaturesGrid } from "@/components/features-grid";
import { HealthCheckFeature } from "@/components/health-check-feature";
import { PortfolioConstructionFeature } from "@/components/portfolio-construction-feature";
import { NxanceLmFeature } from "@/components/nxance-lm-feature";
import { NxanceLmTerminal } from "@/components/nxance-lm-terminal";
import { CoreMathStrategyFlow } from "@/components/core-math-strategy-flow";
import { QuantifiableOptimization } from "@/components/quantifiable-optimization";
import { LandingClosing } from "@/components/landing-closing";
import { WaitlistStatusProvider } from "@/components/waitlist-status";
import { getWaitlistCount } from "@/app/actions/waitlist";

function RisingLine({
  children,
  delayMs,
  className,
}: {
  children: React.ReactNode;
  delayMs: number;
  className?: string;
}) {
  return (
    <span className={`rise-line ${className ?? ""}`}>
      <span style={{ animationDelay: `${delayMs}ms` }}>{children}</span>
    </span>
  );
}

export default async function Home() {
  const waitlistCount = await getWaitlistCount();

  return (
    <WaitlistStatusProvider>
      <div className="flex min-h-dvh flex-col bg-white">
        <header className="flex shrink-0 flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14 xl:px-16">
          <Image
            src="/logo.svg"
            alt="Nxance by Ohshn Intelligence"
            width={830}
            height={375}
            priority
            className="h-auto w-[170px] sm:w-[185px] lg:w-[200px]"
          />
          <WaitlistForm />
        </header>

        <main className="grid items-start gap-10 px-6 py-8 sm:px-10 lg:min-h-[calc(100dvh-72px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:px-14 lg:py-0 xl:px-16">
          <section className="flex w-full flex-col items-start justify-center py-4 text-left lg:max-w-[640px] lg:py-0">
            <h1 className="w-full text-[44px] leading-[1.08] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[50px] lg:text-[56px] xl:text-[58px]">
              <RisingLine delayMs={160} className="lg:whitespace-nowrap">
                AI-powered investment
              </RisingLine>
              <RisingLine delayMs={480}>intelligence.</RisingLine>
            </h1>
            <p className="mt-5 w-full text-[20px] leading-[1.45] font-semibold text-[#6B7280] sm:mt-6 sm:text-[21px] lg:whitespace-nowrap lg:text-[22px]">
              <RisingLine delayMs={820}>
                See the true health of every asset you hold.
              </RisingLine>
            </p>
            <p className="mt-6 w-full text-[11px] font-semibold tracking-[0.12em] text-[#2F6EFF] uppercase sm:mt-7 lg:mt-8">
              <RisingLine delayMs={1180}>
                Backed by research-driven, proprietary models.
              </RisingLine>
            </p>
          </section>

          <div className="rise-panel flex items-center justify-center lg:h-full">
            <PortfolioPreview />
          </div>
        </main>

        <section className="relative z-10 px-6 sm:px-10 lg:px-14 xl:px-16">
          <LaunchStatusBar waitlistCount={waitlistCount} />
          <FeaturesGrid />
          <HealthCheckFeature />
          <PortfolioConstructionFeature />
          <NxanceLmFeature />
          <NxanceLmTerminal />
          <CoreMathStrategyFlow />
          <QuantifiableOptimization />
          <LandingClosing />
        </section>
      </div>
    </WaitlistStatusProvider>
  );
}
