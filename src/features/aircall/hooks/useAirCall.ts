"use client";

import { useEffect, useRef, useState } from "react";
import AircallPhone from "aircall-everywhere";

type Props = {
  containerId: string;
  onCallEnded?: (data: any) => void;
};

export function useAircall({ containerId, onCallEnded }: Props) {
  const phoneRef = useRef<AircallPhone | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (phoneRef.current) return;

    const phone = new AircallPhone({
      domToLoadWorkspace: containerId,
      size: "auto",
      onLogin: (settings) => {
        setIsReady(true);
        console.log("Aircall agent logged in", settings);
      },
      onLogout: () => {
        setIsReady(false);
        console.log("Aircall agent logged out");
      }
    });

    phone.on("outgoing_call", (data) => {
      console.log("Call started", data);
    });

    phone.on("call_ended", (data) => {
      console.log("Call ended", data);

      if (onCallEnded) {
        onCallEnded(data);
      }
    });

    phoneRef.current = phone;
    console.log("phone", phone);

    return () => {
      phoneRef.current = null;
      setIsReady(false);
    };
  }, [containerId]);

  const dial = (number: string) => {
    phoneRef.current?.send(
      "dial_number",
      { phone_number: number },
      (success, response) => {
        if (!success) {
          console.error("Aircall dial failed", response);
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
