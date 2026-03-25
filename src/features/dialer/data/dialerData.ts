export type DialerDisposition =
  | "No Answer"
  | "Connected"
  | "Callback"
  | "Not Interested"
  | "Wrong Number";

export type CallHistoryRecord = {
  id: string;
  leadName: string;
  phone: string;
  list: string;
  duration: string;
  callTime: string;
  disposition: DialerDisposition;
  email: string;
  timezone: string;
  event: string;
  representative: string;
  representativeAvatar: string;
  nextAction: string;
  personalNote: string;
  keepNote: string;
  recordingDuration: string;
};

export type CallbackTimelineItem = {
  id: string;
  title: string;
  subtitle: string;
};

export type CallbackPurchase = {
  id: string;
  product: string;
  amount: string;
  purchaseDate: string;
};

export type CallbackScheduleRecord = {
  id: string;
  leadName: string;
  phone: string;
  list: string;
  scheduledTime: string;
  email: string;
  sendTimezone: string;
  registeredEvent: string;
  eventDate: string;
  eventLocation: string;
  referredBy: string;
  currentStatus: string;
  leadOwner: string;
  totalPurchase: string;
  purchases: CallbackPurchase[];
  timeline: CallbackTimelineItem[];
  keapNotes: string[];
  personalNotes: string[];
};

export const callHistorySummary = [
  { label: "Total Call", value: "24" },
  { label: "Call Today", value: "12" },
  { label: "Connected", value: "4" },
  { label: "No Answer", value: "6" },
  { label: "Callbacks Scheduled", value: "2" },
] as const;

export const callHistoryRows: CallHistoryRecord[] = [
  {
    id: "ch-001",
    leadName: "Sarah Mitchell",
    phone: "+1 555 123 45 67",
    list: "Golden Event",
    duration: "00:12",
    callTime: "07/15/26 – 11:45 AM",
    disposition: "No Answer",
    email: "sarah.mitchell@email.com",
    timezone: "Australia/Sydney",
    event: "Sydney Masterclass",
    representative: "Sarah Kim",
    representativeAvatar: "SK",
    nextAction: "Cooldown",
    personalNote: "Lead asked to call tomorrow...",
    keepNote: "No Answer – James Carter – Feb 21, 2025 – 10:12 AM”",
    recordingDuration: "04:15",
  },
  {
    id: "ch-002",
    leadName: "Evelyn Hayes",
    phone: "+1 444 987 65 43",
    list: "Masterclass Follow-Up",
    duration: "03:45",
    callTime: "08/22/26 – 09:30 AM",
    disposition: "Connected",
    email: "evelyn.hayes@email.com",
    timezone: "Australia/Melbourne",
    event: "Masterclass Follow-Up",
    representative: "Evelyn Stone",
    representativeAvatar: "ES",
    nextAction: "Send recap",
    personalNote: "Requested pricing email after the call.",
    keepNote: "Connected – Shared event details and promised brochure.",
    recordingDuration: "03:45",
  },
  {
    id: "ch-003",
    leadName: "Elijah Bennett",
    phone: "+1 555 123 45 67",
    list: "Live Event Brisbane",
    duration: "00:45",
    callTime: "09/10/26 – 02:15 PM",
    disposition: "Callback",
    email: "elijah.bennett@email.com",
    timezone: "Australia/Brisbane",
    event: "Live Event Brisbane",
    representative: "Olivia Smith",
    representativeAvatar: "OS",
    nextAction: "Call tomorrow",
    personalNote: "Asked for a callback after work.",
    keepNote: "Callback requested for tomorrow afternoon.",
    recordingDuration: "00:45",
  },
  {
    id: "ch-004",
    leadName: "Abigail Carter",
    phone: "+1 222 765 43 21",
    list: "Silver Event Confirm",
    duration: "01:37",
    callTime: "10/05/26 – 03:00 PM",
    disposition: "Not Interested",
    email: "abigail.carter@email.com",
    timezone: "Australia/Perth",
    event: "Silver Event Confirm",
    representative: "Mia Hall",
    representativeAvatar: "MH",
    nextAction: "Archive",
    personalNote: "Not interested this quarter.",
    keepNote: "Declined invitation and requested removal from list.",
    recordingDuration: "01:37",
  },
  {
    id: "ch-005",
    leadName: "Jackson Reed",
    phone: "+1 555 123 45 67",
    list: "Event Gold Coast VIP",
    duration: "02:55",
    callTime: "11/12/26 – 01:20 PM",
    disposition: "Wrong Number",
    email: "jackson.reed@email.com",
    timezone: "Australia/Brisbane",
    event: "Gold Coast VIP",
    representative: "Noah Lee",
    representativeAvatar: "NL",
    nextAction: "Verify contact",
    personalNote: "Number belongs to someone else.",
    keepNote: "Wrong number confirmed on first connection.",
    recordingDuration: "02:55",
  },
  {
    id: "ch-006",
    leadName: "Chloe Wright",
    phone: "+1 555 123 45 67",
    list: "Gold Cost Event",
    duration: "01:10",
    callTime: "12/01/26 – 12:00 PM",
    disposition: "Not Interested",
    email: "chloe.wright@email.com",
    timezone: "Australia/Sydney",
    event: "Gold Cost Event",
    representative: "Sophia Green",
    representativeAvatar: "SG",
    nextAction: "Archive",
    personalNote: "Only wants email updates.",
    keepNote: "Lead asked not to be called again.",
    recordingDuration: "01:10",
  },
  {
    id: "ch-007",
    leadName: "Sarah Mitchell",
    phone: "+1 888 456 78 90",
    list: "COD New Registrations",
    duration: "02:55",
    callTime: "01/25/26 – 10:05 AM",
    disposition: "Connected",
    email: "sarah.mitchell@email.com",
    timezone: "Australia/Sydney",
    event: "COD New Registrations",
    representative: "Sarah Kim",
    representativeAvatar: "SK",
    nextAction: "Send recap",
    personalNote: "Strong interest in upcoming event.",
    keepNote: "Connected – warm lead, follow up with agenda.",
    recordingDuration: "02:55",
  },
  {
    id: "ch-008",
    leadName: "Scarlett Bell",
    phone: "+1 555 123 45 67",
    list: "Gold Cost Event",
    duration: "04:15",
    callTime: "02/14/26 – 04:30 PM",
    disposition: "No Answer",
    email: "scarlett.bell@email.com",
    timezone: "Australia/Adelaide",
    event: "Gold Cost Event",
    representative: "James Carter",
    representativeAvatar: "JC",
    nextAction: "Cooldown",
    personalNote: "Try again next week.",
    keepNote: "Two missed attempts today.",
    recordingDuration: "04:15",
  },
  {
    id: "ch-009",
    leadName: "Owen Price",
    phone: "+1 555 123 45 67",
    list: "Silver Event Confirm",
    duration: "01:36",
    callTime: "03/30/26 – 08:50 AM",
    disposition: "Callback",
    email: "owen.price@email.com",
    timezone: "Australia/Hobart",
    event: "Silver Event Confirm",
    representative: "Mila Chen",
    representativeAvatar: "MC",
    nextAction: "Call this afternoon",
    personalNote: "Requested afternoon callback.",
    keepNote: "Callback planned after 3 PM.",
    recordingDuration: "01:36",
  },
  {
    id: "ch-010",
    leadName: "Madison Gray",
    phone: "+1 555 678 90 12",
    list: "Silver Event Confirm",
    duration: "02:45",
    callTime: "04/18/26 – 06:15 PM",
    disposition: "No Answer",
    email: "madison.gray@email.com",
    timezone: "Australia/Sydney",
    event: "Silver Event Confirm",
    representative: "Liam Scott",
    representativeAvatar: "LS",
    nextAction: "Cooldown",
    personalNote: "Voicemail unavailable.",
    keepNote: "No answer on evening call.",
    recordingDuration: "02:45",
  },
];

const sarahPurchases: CallbackPurchase[] = [
  { id: "ph-1", product: "VIP Ticket", amount: "$997", purchaseDate: "06/12/26" },
  { id: "ph-2", product: "VIP Ticket", amount: "$997", purchaseDate: "06/12/26" },
  { id: "ph-3", product: "VIP Ticket", amount: "$997", purchaseDate: "06/12/26" },
  { id: "ph-4", product: "VIP Ticket", amount: "$997", purchaseDate: "06/12/26" },
  { id: "ph-5", product: "VIP Ticket", amount: "$997", purchaseDate: "06/12/26" },
  { id: "ph-6", product: "VIP Ticket", amount: "$997", purchaseDate: "06/12/26" },
  { id: "ph-7", product: "VIP Ticket", amount: "$997", purchaseDate: "06/12/26" },
];

const sarahTimeline: CallbackTimelineItem[] = [
  {
    id: "tl-1",
    title: "No Answer",
    subtitle: "Olivia Smith on Feb 20, 2025 at 10:12 AM",
  },
  {
    id: "tl-2",
    title: "No Answer",
    subtitle: "Olivia Smith on Feb 20, 2025 at 10:12 AM",
  },
  {
    id: "tl-3",
    title: "No Answer",
    subtitle: "Olivia Smith on Feb 20, 2025 at 10:12 AM",
  },
  {
    id: "tl-4",
    title: "Voice Mail",
    subtitle: "Olivia Smith on Feb 20, 2025 at 10:12 AM",
  },
] as const;

export const callbackScheduleRows: CallbackScheduleRecord[] = [
  {
    id: "cb-001",
    leadName: "Sarah Mitchell",
    phone: "+1 555 123 45 67",
    list: "Golden Event",
    scheduledTime: "Today – 11:45 AM",
    email: "sarah@gmail.com",
    sendTimezone: "Australia/Sydney",
    registeredEvent: "Sydney Masterclass",
    eventDate: "March 15, 2025",
    eventLocation: "Los Angeles, CA",
    referredBy: "Michael Stevens",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 2,300",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: [
      "Requested event details and asked for a reminder 24 hours before the call.",
      "Warm lead with prior purchase history and strong interest in VIP seating.",
    ],
    personalNotes: [
      "Prefers late-morning callbacks.",
      "Mention the Sydney offer bundle on the next conversation.",
    ],
  },
  {
    id: "cb-002",
    leadName: "Evelyn Hayes",
    phone: "+1 444 987 65 43",
    list: "Masterclass Follow-Up",
    scheduledTime: "Today – 01:30 PM",
    email: "evelyn@email.com",
    sendTimezone: "Australia/Melbourne",
    registeredEvent: "Growth Masterclass",
    eventDate: "March 22, 2025",
    eventLocation: "Melbourne, AU",
    referredBy: "Julia Norris",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 1,200",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: ["Interested in early bird upgrade."],
    personalNotes: ["Follow up with payment link."],
  },
  {
    id: "cb-003",
    leadName: "Elijah Bennett",
    phone: "+1 555 123 45 67",
    list: "Live Event Brisbane",
    scheduledTime: "09/10/26 – 02:15 PM",
    email: "elijah@email.com",
    sendTimezone: "Australia/Brisbane",
    registeredEvent: "Live Event Brisbane",
    eventDate: "September 10, 2026",
    eventLocation: "Brisbane, AU",
    referredBy: "Olivia Smith",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 900",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: ["Requested afternoon callback."],
    personalNotes: ["Mention Brisbane seating options."],
  },
  {
    id: "cb-004",
    leadName: "Abigail Carter",
    phone: "+1 222 765 43 21",
    list: "Silver Event Confirm",
    scheduledTime: "10/05/26 – 03:00 PM",
    email: "abigail@email.com",
    sendTimezone: "Australia/Perth",
    registeredEvent: "Silver Event Confirm",
    eventDate: "October 5, 2026",
    eventLocation: "Perth, AU",
    referredBy: "Mia Hall",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 560",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: ["Waiting on manager approval."],
    personalNotes: ["Send venue map if she confirms."],
  },
  {
    id: "cb-005",
    leadName: "Jackson Reed",
    phone: "+1 555 123 45 67",
    list: "Event Gold Coast VIP",
    scheduledTime: "11/12/26 – 01:20 PM",
    email: "jackson@email.com",
    sendTimezone: "Australia/Brisbane",
    registeredEvent: "Event Gold Coast VIP",
    eventDate: "November 12, 2026",
    eventLocation: "Gold Coast, AU",
    referredBy: "Noah Lee",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 0",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: ["Reconfirm number before next call."],
    personalNotes: ["Potential wrong-number issue on prior call."],
  },
  {
    id: "cb-006",
    leadName: "Chloe Wright",
    phone: "+1 555 123 45 67",
    list: "Gold Cost Event",
    scheduledTime: "12/01/26 – 12:00 PM",
    email: "chloe@email.com",
    sendTimezone: "Australia/Sydney",
    registeredEvent: "Gold Cost Event",
    eventDate: "December 1, 2026",
    eventLocation: "Sydney, AU",
    referredBy: "Sophia Green",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 1,400",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: ["Asked for more detail on event schedule."],
    personalNotes: ["Try during lunch break."],
  },
  {
    id: "cb-007",
    leadName: "Sarah Mitchell",
    phone: "+1 888 456 78 90",
    list: "COD New Registrations",
    scheduledTime: "01/25/26 – 10:05 AM",
    email: "sarah@email.com",
    sendTimezone: "Australia/Sydney",
    registeredEvent: "COD New Registrations",
    eventDate: "January 25, 2026",
    eventLocation: "Sydney, AU",
    referredBy: "Michael Stevens",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 980",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: ["Connected previously and asked for recap."],
    personalNotes: ["Mention waitlist bonus."],
  },
  {
    id: "cb-008",
    leadName: "Scarlett Bell",
    phone: "+1 555 123 45 67",
    list: "Gold Cost Event",
    scheduledTime: "02/14/26 – 04:30 PM",
    email: "scarlett@email.com",
    sendTimezone: "Australia/Adelaide",
    registeredEvent: "Gold Cost Event",
    eventDate: "February 14, 2026",
    eventLocation: "Adelaide, AU",
    referredBy: "Noah Lee",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 640",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: ["Retry next week if no response."],
    personalNotes: ["Evening callbacks perform better."],
  },
  {
    id: "cb-009",
    leadName: "Owen Price",
    phone: "+1 555 123 45 67",
    list: "Silver Event Confirm",
    scheduledTime: "03/30/26 – 08:50 AM",
    email: "owen@email.com",
    sendTimezone: "Australia/Hobart",
    registeredEvent: "Silver Event Confirm",
    eventDate: "March 30, 2026",
    eventLocation: "Hobart, AU",
    referredBy: "Mila Chen",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 760",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: ["Requested afternoon callback."],
    personalNotes: ["Prefer text reminder before calling."],
  },
  {
    id: "cb-010",
    leadName: "Madison Gray",
    phone: "+1 555 678 90 12",
    list: "Silver Event Confirm",
    scheduledTime: "04/18/26 – 06:15 PM",
    email: "madison@email.com",
    sendTimezone: "Australia/Sydney",
    registeredEvent: "Silver Event Confirm",
    eventDate: "April 18, 2026",
    eventLocation: "Sydney, AU",
    referredBy: "Liam Scott",
    currentStatus: "Cooldown",
    leadOwner: "James Carter",
    totalPurchase: "$ 820",
    purchases: sarahPurchases,
    timeline: [...sarahTimeline],
    keapNotes: ["Voicemail unavailable on last attempt."],
    personalNotes: ["Try a morning slot instead."],
  },
];

export const callbackStatusOptions = ["All Status", "Cooldown", "Callback"] as const;

