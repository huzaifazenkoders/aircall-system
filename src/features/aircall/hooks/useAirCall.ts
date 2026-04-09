"use client";

import { useEffect, useRef, useState } from "react";
import AircallPhone from "aircall-everywhere";

type Props = {
  containerId: string;
  // eslint-disabled-next-line
  onCallEnded?: (data: any) => void;
};

export function useAircall({ containerId, onCallEnded }: Props) {
  const phoneRef = useRef<AircallPhone | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (phoneRef.current) return;

    const phone = new AircallPhone({
      domToLoadPhone: containerId,
      onLogin: () => {
        setIsReady(true);
        console.log("Aircall agent logged in");
      },
      onLogout: () => {
        setIsReady(false);
        console.log("Aircall agent logged out");
      }
    });

    phone.on("outgoing_call", () => {
      console.log("Call started");
    });

    phone.on("call_ended", (data) => {
      console.log("Call ended");

      if (onCallEnded) {
        onCallEnded(data);
      }
    });

    phoneRef.current = phone;
    console.log("Aircall workspace initialized");

    return () => {
      phoneRef.current = null;
      setIsReady(false);
    };
  }, [containerId]);

  const dial = (number: string) => {
    phoneRef.current?.send(
      "dial_number",
      { phone_number: number },
      (success) => {
        if (!success) {
          console.error("Aircall dial failed");
        }
      }
    );
  };

  const logout = () => {
    phoneRef.current?.logout?.();
  };

  return {
    dial,
    isReady,
    logout,
    phone: phoneRef.current
  };
}
