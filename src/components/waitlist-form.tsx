"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

const initialState: WaitlistState = { status: "idle" };

type WaitlistFormProps = {
  variant?: "header" | "cta";
};

export function WaitlistForm({ variant = "header" }: WaitlistFormProps) {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState,
  );

  const emailId =
    variant === "cta" ? "waitlist-email-cta" : "waitlist-email";

  if (state.status === "success") {
    return (
      <p
        className={`font-medium text-[#2F6EFF] ${
          variant === "cta" ? "text-center text-[16px]" : "text-[15px]"
        }`}
      >
        You&apos;re on the waitlist.
      </p>
    );
  }

  if (variant === "cta") {
    return (
      <div className="mx-auto flex w-full max-w-[560px] flex-col items-center gap-2">
        <form
          action={formAction}
          className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <label className="sr-only" htmlFor={emailId}>
            Work email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={320}
            placeholder="Enter work email"
            disabled={pending}
            aria-invalid={state.status === "error"}
            aria-describedby={
              state.status === "error" ? "waitlist-cta-error" : undefined
            }
            className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-[16px] text-[#111111] outline-none placeholder:text-[#B0B4BA] focus:border-[#2F6EFF] disabled:opacity-60 sm:max-w-[320px]"
          />
          <button
            type="submit"
            disabled={pending}
            className="h-12 shrink-0 rounded-lg bg-[#2F6EFF] px-6 text-[14px] font-semibold tracking-[0.06em] whitespace-nowrap text-white uppercase disabled:cursor-not-allowed disabled:opacity-60 sm:px-7"
          >
            {pending ? "Joining..." : "Get Early Access"}
          </button>
        </form>
        {state.status === "error" ? (
          <p
            id="waitlist-cta-error"
            className="text-center text-[13px] text-red-500"
            role="alert"
          >
            {state.message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-stretch gap-1.5 sm:w-auto sm:items-end">
      <form
        action={formAction}
        className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor={emailId}>
          Work email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={320}
          placeholder="Enter work email"
          disabled={pending}
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? "waitlist-error" : undefined}
          className="h-11 w-full min-w-0 rounded-md border border-[#E5E7EB] bg-white px-3.5 text-[15px] text-[#111111] outline-none placeholder:text-[#B0B4BA] focus:border-[#2F6EFF] disabled:opacity-60 sm:w-[210px] lg:w-[240px]"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-11 w-full shrink-0 rounded-md bg-[#2F6EFF] px-5 text-[15px] font-semibold whitespace-nowrap text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Joining..." : "Join Waitlist"}
        </button>
      </form>
      {state.status === "error" ? (
        <p id="waitlist-error" className="text-[12px] text-red-500" role="alert">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
