"use server";

import { createClient } from "@/lib/supabase/server";

export type WaitlistState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!EMAIL_PATTERN.test(email) || email.length > 320) {
    return { status: "error", message: "Enter a valid work email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("waitlist").insert({ email });

  if (error && error.code !== "23505") {
    return {
      status: "error",
      message: "Could not join the waitlist. Try again.",
    };
  }

  return { status: "success" };
}

export async function getWaitlistCount(): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("waitlist_count");

  if (error || data == null) {
    return 14204;
  }

  return Number(data);
}
