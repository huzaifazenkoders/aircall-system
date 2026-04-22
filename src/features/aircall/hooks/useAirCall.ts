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
  // eslint-disable-next-line
  onCallEnded?: (data: any) => void;
  onCallInitiated?: () => void;
};

export function useAircall({ containerId, onCallEnded, onCallInitiated }: Props) {
  const phoneRef = useRef<AircallPhone | null>(null);
  const [isReady, setIsReady] = useState(false);
  // eslint-disable-next-line
  const callbacksRef = useRef<Partial<Record<AircallEvent, (data: any) => void>>>({});
  const isReadyRef = useRef(false);
  const onCallInitiatedRef = useRef(onCallInitiated);
  const onCallEndedRef = useRef(onCallEnded);
  onCallInitiatedRef.current = onCallInitiated;
  onCallEndedRef.current = onCallEnded;
  isReadyRef.current = isReady;

  // When OAuth sign-in opens a new tab, the iframe never reloads on return.
  // Re-trigger it by reloading the iframe src when the user comes back to this tab.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isReadyRef.current) {
        const iframe = document.querySelector<HTMLIFrameElement>(`${containerId} iframe`);
        if (iframe) {
          iframe.src = iframe.src;
          console.log("Aircall iframe reloaded after tab refocus");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [containerId]);

  useEffect(() => {
    if (phoneRef.current) return;

    const phone = new AircallPhone({
      domToLoadWorkspace: containerId,
      onLogin: () => {
        isReadyRef.current = true;
        setIsReady(true);
        console.log("Aircall agent logged in");
      },
      onLogout: () => {
        isReadyRef.current = false;
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
      onCallInitiatedRef.current?.();
    });

    register("call_ended", (data) => {
      console.log("Call ended");
      onCallEndedRef.current?.(data);
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
