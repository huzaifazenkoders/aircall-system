import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";

const CallHistoryIllustration = () => {
  return (
    <svg
      viewBox="0 0 420 240"
      className="w-full max-w-[26rem]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="219" cy="116" rx="163" ry="104" fill="#F4F5F7" />
      <rect x="106" y="26" width="138" height="186" rx="18" fill="#333333" />
      <rect x="114" y="33" width="123" height="171" rx="14" fill="#FFFFFF" stroke="#B5B7C0" strokeWidth="2" />
      <rect x="126" y="84" width="30" height="21" rx="4" fill="#E4E8F5" />
      <path d="M135 92H147M132 98H150" stroke="#AAB2C8" strokeWidth="3" strokeLinecap="round" />
      <rect x="191" y="36" width="98" height="21" rx="4" fill="#2FBF9B" />
      <path d="M204 47H273" stroke="#CFF8EE" strokeWidth="4" strokeLinecap="round" />
      <path d="M151 61L175 41" stroke="#C8CEDB" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M150 145H196" stroke="#E8EBF2" strokeWidth="2" strokeLinecap="round" />
      <path d="M150 159H181" stroke="#E8EBF2" strokeWidth="2" strokeLinecap="round" />
      <circle cx="176" cy="196" r="8" fill="#F7F7F7" />
      <g transform="rotate(22 267 118)">
        <rect x="194" y="89" width="150" height="102" rx="9" fill="#FFFFFF" stroke="#5F6272" strokeWidth="1.5" />
        <rect x="194" y="89" width="150" height="18" rx="9" fill="#E7EBF3" />
        <circle cx="208" cy="98" r="3" fill="#B3BAC9" />
        <circle cx="219" cy="98" r="3" fill="#B3BAC9" />
        <circle cx="230" cy="98" r="3" fill="#B3BAC9" />
        <rect x="209" y="116" width="23" height="23" rx="11.5" fill="#2FBF9B" />
        <path d="M215 131C216.4 125.9 224.7 125.9 226 131" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="220.5" cy="121.5" r="5.5" fill="#D9ECF7" />
        <path d="M241 120H321" stroke="#A0A7B6" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M241 132H313" stroke="#A0A7B6" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M241 144H297" stroke="#A0A7B6" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="209" y="154" width="49" height="20" rx="10" fill="#2FBF9B" />
        <path d="M223 164H244" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <path d="M86 69H126L106 86H86V69Z" fill="#FFFFFF" stroke="#7A7A7A" strokeWidth="1.5" />
      <path d="M86 69L106 82L126 69" stroke="#7A7A7A" strokeWidth="1.5" />
      <path d="M318 72H351L334 86H318V72Z" fill="#FFFFFF" stroke="#7A7A7A" strokeWidth="1.5" />
      <path d="M318 72L334 83L351 72" stroke="#7A7A7A" strokeWidth="1.5" />
      <path d="M60 128H91L75 142H60V128Z" fill="#FFFFFF" stroke="#7A7A7A" strokeWidth="1.5" />
      <path d="M60 128L75 139L91 128" stroke="#7A7A7A" strokeWidth="1.5" />
      <rect x="85" y="45" width="51" height="28" rx="8" fill="#FFFFFF" stroke="#5F5F5F" strokeWidth="1.5" />
      <circle cx="101" cy="58.5" r="2.5" fill="#8E95A6" />
      <circle cx="116" cy="58.5" r="2.5" fill="#8E95A6" />
      <path d="M98 73L110 66L122 73" stroke="#5F5F5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const CallHistoryEmptyState = () => {
  return (
    <div className={callHistoryStyles.emptyWrap}>
      <div className={callHistoryStyles.emptyInner}>
        <CallHistoryIllustration />
        <h2 className={callHistoryStyles.emptyTitle}>No Call Activity Yet</h2>
        <p className={callHistoryStyles.emptyDescription}>
          Call records will appear here once You begin making outbound calls.
        </p>
      </div>
    </div>
  );
};

export default CallHistoryEmptyState;

