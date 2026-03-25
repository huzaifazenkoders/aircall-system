import { callbackStyles } from "@/features/dialer/styles/dialerStyles";

const CallbackSchedulesIllustration = () => {
  return (
    <svg
      viewBox="0 0 520 340"
      className="w-full max-w-[34rem]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="125" y="64" width="276" height="194" rx="18" fill="#F8F8F8" />
      <rect x="151" y="88" width="230" height="110" rx="12" fill="#FFFFFF" stroke="#E7E8EB" strokeWidth="5" />
      <path d="M162 130H360" stroke="#E8EAF0" strokeWidth="2" />
      <path d="M162 164H360" stroke="#E8EAF0" strokeWidth="2" />
      <path d="M200 92V198" stroke="#E8EAF0" strokeWidth="2" />
      <path d="M244 92V198" stroke="#E8EAF0" strokeWidth="2" />
      <path d="M288 92V198" stroke="#E8EAF0" strokeWidth="2" />
      <path d="M332 92V198" stroke="#E8EAF0" strokeWidth="2" />
      <path d="M193 84C193 74.059 201.059 66 211 66C220.941 66 229 74.059 229 84" stroke="#2B3946" strokeWidth="8" strokeLinecap="round" />
      <path d="M249 84C249 74.059 257.059 66 267 66C276.941 66 285 74.059 285 84" stroke="#2B3946" strokeWidth="8" strokeLinecap="round" />
      <path d="M305 84C305 74.059 313.059 66 323 66C332.941 66 341 74.059 341 84" stroke="#2B3946" strokeWidth="8" strokeLinecap="round" />
      <rect x="178" y="84" width="190" height="20" rx="10" fill="#28B6B0" />
      <path d="M189 128C202 110 241 104 255 116C269 128 247 162 220 162C193 162 179 144 189 128Z" stroke="#28B6B0" strokeWidth="3" />
      <circle cx="266" cy="150" r="10" stroke="#28B6B0" strokeWidth="3" />
      <rect x="322" y="112" width="52" height="28" rx="4" fill="#2CB8B1" />
      <rect x="288" y="152" width="24" height="28" rx="4" fill="#A3E4E2" />
      <rect x="317" y="188" width="30" height="30" rx="6" fill="#92DDD8" />
      <path d="M323 203L330 210L342 196" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M176 206H258" stroke="#E5E7EB" strokeWidth="14" strokeLinecap="round" />
      <circle cx="323" cy="245" r="12" stroke="#28B6B0" strokeWidth="4" />
      <path d="M105 171C84 139 67 177 81 211C95 245 131 246 139 280" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
      <path d="M415 129C442 94 450 126 438 155C426 184 391 185 377 208" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
      <path d="M421 174C454 145 464 167 448 192C432 217 405 214 389 242" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
      <rect x="146" y="258" width="35" height="32" rx="2" fill="#E5E5E5" />
      <rect x="199" y="236" width="18" height="54" fill="#EFEFEF" />
      <rect x="217" y="236" width="108" height="14" rx="2" fill="#EFEFEF" />
      <rect x="217" y="262" width="108" height="14" rx="2" fill="#EFEFEF" />
      <rect x="358" y="252" width="35" height="38" rx="2" fill="#E5E5E5" />
      <path d="M383 160H405V189L396 181H383V160Z" fill="#E8FBFA" stroke="#28B6B0" strokeWidth="2" />
    </svg>
  );
};

const CallbackSchedulesEmptyState = () => {
  return (
    <div className={callbackStyles.emptyWrap}>
      <div className={callbackStyles.emptyInner}>
        <CallbackSchedulesIllustration />
        <h2 className={callbackStyles.emptyTitle}>No Callbacks Scheduled</h2>
        <p className={callbackStyles.emptyDescription}>
          You don&apos;t have any upcoming callbacks. Scheduled calls will appear here once they are set.
        </p>
      </div>
    </div>
  );
};

export default CallbackSchedulesEmptyState;

