import Image from "next/image";
import { WaitlistForm } from "@/components/waitlist-form";

export function LandingClosing() {
  return (
    <>
      <section className="mt-20 border-t border-[#ECECEF] pt-20 text-center sm:mt-24 sm:pt-24 lg:mt-28 lg:pt-28">
        <div className="mx-auto h-1 w-10 rounded-full bg-[#2F6EFF]" />

        <h2 className="mt-8 text-[38px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[44px] lg:text-[48px]">
          Secure Priority Access
        </h2>

        <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.55] text-[#6B7280] sm:mt-6 sm:text-[18px]">
          Join the waitlist to secure your early access position for the Nxance
          Terminal.
        </p>

        <div className="mt-10 sm:mt-12">
          <WaitlistForm variant="cta" />
        </div>
      </section>

      <footer className="mt-16 border-t border-[#ECECEF] py-12 text-center sm:mt-20 sm:py-14">
        <Image
          src="/logo.svg"
          alt="Nxance by Ohshn Intelligence"
          width={830}
          height={375}
          className="mx-auto w-[190px] h-auto sm:w-[230px]"
        />
        <p className="mt-4 text-[15px] text-[#6B7280] sm:text-[16px]">
          Currently building. Follow along.
        </p>
      </footer>
    </>
  );
}
