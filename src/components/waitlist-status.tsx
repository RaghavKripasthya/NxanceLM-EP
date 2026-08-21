"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type WaitlistStatusContextValue = {
  joined: boolean;
  markJoined: () => void;
};

const WaitlistStatusContext = createContext<WaitlistStatusContextValue>({
  joined: false,
  markJoined: () => {},
});

export function WaitlistStatusProvider({ children }: { children: ReactNode }) {
  const [joined, setJoined] = useState(false);

  return (
    <WaitlistStatusContext.Provider
      value={{ joined, markJoined: () => setJoined(true) }}
    >
      {children}
    </WaitlistStatusContext.Provider>
  );
}

export function useWaitlistStatus() {
  return useContext(WaitlistStatusContext);
}
