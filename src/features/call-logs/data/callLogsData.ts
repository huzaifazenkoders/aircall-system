export type CallDisposition =
  | "No Answer"
  | "Connected"
  | "Callback"
  | "Not Interested"
  | "Wrong Number";

export type CallLog = {
  id: string;
  leadName: string;
  phone: string;
  representative: string;
  representativeAvatar: string;
  list: string;
  callTime: string;
  dateRangeValue: string;
  disposition: CallDisposition;
  email: string;
  timezone: string;
  event: string;
  keapUrlLabel: string;
  nextAction: string;
  note: string;
  recordingDuration: string;
};

export const callLogsData: CallLog[] = [
  {
    id: "cl-001",
    leadName: "Sarah Mitchell",
    phone: "+1 555 123 45 67",
    representative: "Emily Johnson",
    representativeAvatar: "EJ",
    list: "Golden Event",
    callTime: "07/15/26 – 11:45 AM",
    dateRangeValue: "2026-07",
    disposition: "No Answer",
    email: "sarah.mitchell@email.com",
    timezone: "Australia/Sydney",
    event: "Sydney Masterclass",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Cooldown",
    note: "No Answer – James Carter – Feb 21, 2025 – 10:12 AM”",
    recordingDuration: "00:22",
  },
  {
    id: "cl-002",
    leadName: "Evelyn Hayes",
    phone: "+1 444 987 65 43",
    representative: "Michael Thompson",
    representativeAvatar: "MT",
    list: "Masterclass Follow-Up",
    callTime: "08/22/26 – 09:30 AM",
    dateRangeValue: "2026-08",
    disposition: "Connected",
    email: "evelyn.hayes@email.com",
    timezone: "Australia/Melbourne",
    event: "Growth Masterclass",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Follow up",
    note: "Connected – Asked for brochure and pricing to be sent after the event.",
    recordingDuration: "03:14",
  },
  {
    id: "cl-003",
    leadName: "Elijah Bennett",
    phone: "+1 555 123 45 67",
    representative: "Olivia Brown",
    representativeAvatar: "OB",
    list: "Live Event Brisbane",
    callTime: "09/10/26 – 02:15 PM",
    dateRangeValue: "2026-09",
    disposition: "Callback",
    email: "elijah.bennett@email.com",
    timezone: "Australia/Brisbane",
    event: "Brisbane Live Event",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Call tomorrow",
    note: "Callback requested after 5 PM due to work schedule.",
    recordingDuration: "01:08",
  },
  {
    id: "cl-004",
    leadName: "Abigail Carter",
    phone: "+1 222 765 43 21",
    representative: "James Wilson",
    representativeAvatar: "JW",
    list: "Silver Event Confirm",
    callTime: "10/05/26 – 03:00 PM",
    dateRangeValue: "2026-10",
    disposition: "Not Interested",
    email: "abigail.carter@email.com",
    timezone: "Australia/Perth",
    event: "Silver Event",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Archive",
    note: "Not interested at this time due to schedule conflict.",
    recordingDuration: "00:49",
  },
  {
    id: "cl-005",
    leadName: "Jackson Reed",
    phone: "+1 555 123 45 67",
    representative: "Sophia Garcia",
    representativeAvatar: "SG",
    list: "Event Gold Coast VIP",
    callTime: "11/12/26 – 01:20 PM",
    dateRangeValue: "2026-11",
    disposition: "Wrong Number",
    email: "jackson.reed@email.com",
    timezone: "Australia/Brisbane",
    event: "Gold Coast VIP Event",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Verify contact",
    note: "Recipient advised the number belongs to a different person.",
    recordingDuration: "00:17",
  },
  {
    id: "cl-006",
    leadName: "Chloe Wright",
    phone: "+1 555 123 45 67",
    representative: "Liam Martinez",
    representativeAvatar: "LM",
    list: "Gold Cost Event",
    callTime: "12/01/26 – 12:00 PM",
    dateRangeValue: "2026-12",
    disposition: "Not Interested",
    email: "chloe.wright@email.com",
    timezone: "Australia/Sydney",
    event: "Gold Coast Event",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Archive",
    note: "Prospect prefers email updates only, no more calls.",
    recordingDuration: "00:34",
  },
  {
    id: "cl-007",
    leadName: "Sarah Mitchell",
    phone: "+1 888 456 78 90",
    representative: "Ava Rodriguez",
    representativeAvatar: "AR",
    list: "COD New Registrations",
    callTime: "01/25/26 – 10:05 AM",
    dateRangeValue: "2026-01",
    disposition: "Connected",
    email: "sarah.mitchell@email.com",
    timezone: "Australia/Sydney",
    event: "COD Registration Drive",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Send recap",
    note: "Connected and confirmed attendance for the next intro session.",
    recordingDuration: "02:41",
  },
  {
    id: "cl-008",
    leadName: "Scarlett Bell",
    phone: "+1 555 123 45 67",
    representative: "Noah Lee",
    representativeAvatar: "NL",
    list: "Gold Cost Event",
    callTime: "02/14/26 – 04:30 PM",
    dateRangeValue: "2026-02",
    disposition: "No Answer",
    email: "scarlett.bell@email.com",
    timezone: "Australia/Adelaide",
    event: "Gold Coast Event",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Cooldown",
    note: "No answer after two attempts on the same day.",
    recordingDuration: "00:26",
  },
  {
    id: "cl-009",
    leadName: "Owen Price",
    phone: "+1 555 123 45 67",
    representative: "Isabella Perez",
    representativeAvatar: "IP",
    list: "Silver Event Confirm",
    callTime: "03/30/26 – 08:50 AM",
    dateRangeValue: "2026-03",
    disposition: "Callback",
    email: "owen.price@email.com",
    timezone: "Australia/Hobart",
    event: "Silver Event",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Call in afternoon",
    note: "Callback requested after 3 PM local time.",
    recordingDuration: "01:19",
  },
  {
    id: "cl-010",
    leadName: "Madison Gray",
    phone: "+1 555 678 90 12",
    representative: "Ethan Taylor",
    representativeAvatar: "ET",
    list: "Silver Event Confirm",
    callTime: "04/18/26 – 06:15 PM",
    dateRangeValue: "2026-04",
    disposition: "No Answer",
    email: "madison.gray@email.com",
    timezone: "Australia/Sydney",
    event: "Silver Event",
    keapUrlLabel: "Open Contact in Keap",
    nextAction: "Cooldown",
    note: "No answer. Voicemail not available.",
    recordingDuration: "00:12",
  },
];

export const callLogListOptions = [
  "All Lists",
  "Golden Event",
  "COD New Registrations",
  "Silver Event Confirm",
];

export const callLogStatusOptions = [
  "All Status",
  "No Answer",
  "Connected",
  "Callback",
  "Not Interested",
];

export const callLogDateRangeOptions = [
  { label: "Date Range", value: "all" },
  { label: "Jan 2026", value: "2026-01" },
  { label: "Feb 2026", value: "2026-02" },
  { label: "Mar 2026", value: "2026-03" },
  { label: "Apr 2026", value: "2026-04" },
  { label: "Jul 2026", value: "2026-07" },
  { label: "Aug 2026", value: "2026-08" },
  { label: "Sep 2026", value: "2026-09" },
  { label: "Oct 2026", value: "2026-10" },
  { label: "Nov 2026", value: "2026-11" },
  { label: "Dec 2026", value: "2026-12" },
];
