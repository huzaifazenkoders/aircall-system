"use client";

import { useEffect, useRef, useState } from "react";
import AircallPhone from "aircall-everywhere";

type AircallEvent =
  | "incoming_call"
  | "call_end_ringtone"
  | "outgoing_call"
  | "outgoing_answered"
  | "call_ended"
  | "comment_saved";

type Props = {
  containerId: string;
  // eslint-disabled-next-line
  onCallEnded?: (data: any) => void;
};

export function useAircall({ containerId, onCallEnded }: Props) {
  const phoneRef = useRef<AircallPhone | null>(null);
  const [isReady, setIsReady] = useState(false);
  // eslint-disable-next-line
  const callbacksRef = useRef<Partial<Record<AircallEvent, (data: any) => void>>>({});

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

    const register = (event: AircallEvent, cb: (data: any) => void) => {
      callbacksRef.current[event] = cb;
      phone.on(event, cb);
    };

    register("outgoing_call", () => {
      console.log("Call started");
    });

    register("call_ended", (data) => {
      console.log("Call ended");
      if (onCallEnded) onCallEnded(data);
    });

    register("incoming_call", (data) => {
      console.log("Incoming call", data);
    });

    register("call_end_ringtone", (data) => {
      console.log("Call end ringtone", data);
    });

    register("outgoing_answered", (data) => {
      console.log("Outgoing answered", data);
    });

    register("comment_saved", (data) => {
      console.log("Comment saved", data);
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

  const triggerEvent = (event: AircallEvent, data?: any) => {
    const cb = callbacksRef.current[event];
    if (cb) {
      console.log(`[TEST] Triggering event: ${event}`, data);
      cb(data ?? {});
    } else {
      console.warn(`[TEST] No listener registered for: ${event}`);
    }
  };

  return {
    dial,
    isReady,
    logout,
    phone: phoneRef.current,
    triggerEvent
  };
}
