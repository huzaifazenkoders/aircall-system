// eslint-disable
declare module "aircall-everywhere" {
  interface AircallOptions {
    domToLoadPhone?: string;
    integrationToLoad?: string;
    onLogin?: (settings: any) => void;
    onLogout?: () => void;
  }

  type AircallEvent =
    | "incoming_call"
    | "call_end_ringtone"
    | "outgoing_call"
    | "outgoing_answered"
    | "call_ended"
    | "comment_saved"
    | "external_dial"
    | "powerdialer_updated"
    | "redirect_event";

  export default class AircallPhone {
    constructor(options: AircallOptions);

    on(event: AircallEvent, callback: (data: any) => void): void;

    send(
      eventName: string,
      data?: any,
      callback?: (success: boolean, data: any) => void
    ): boolean;

    isLoggedIn(callback: (success: boolean, data: any) => void): void;

    removeListener(eventName: string): boolean;

    logout?(): void;
  }
}
