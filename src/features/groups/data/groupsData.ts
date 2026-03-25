export type GroupStatus = "Active" | "Inactive";

export type GroupMember = {
  id: string;
  name: string;
  accent: string;
  tint: string;
  role?: string;
};

export type GroupAssignedList = {
  id: string;
  name: string;
  leads: number;
};

export type GroupRecord = {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  assignedLists: GroupAssignedList[];
  createdOn: string;
  status: GroupStatus;
};

export const groupMembers: GroupMember[] = [
  { id: "sarah-kim", name: "Sarah Kim", accent: "#A84E57", tint: "#FBE6E7", role: "Representative" },
  { id: "james-white", name: "James White", accent: "#147B8A", tint: "#DAF4F6", role: "Representative" },
  { id: "robert-fox", name: "Robert Fox", accent: "#D3882A", tint: "#FFF1D8", role: "Representative" },
  { id: "alanah-albert", name: "Alanah Albert", accent: "#7C5C58", tint: "#F8E8E1", role: "Representative" },
  { id: "james-anderson", name: "James Anderson", accent: "#325C88", tint: "#E2EEFB", role: "Representative" },
  { id: "michael-lee", name: "Michael Lee", accent: "#2B7A69", tint: "#DFF6F0", role: "Representative" },
  { id: "olivia-brown", name: "Olivia Brown", accent: "#A05E4A", tint: "#FBE7DD", role: "Representative" },
  { id: "ethan-hall", name: "Ethan Hall", accent: "#4961A8", tint: "#E5EBFD", role: "Representative" },
  { id: "emma-jones", name: "Emma Jones", accent: "#7B628E", tint: "#F0E8F7", role: "Representative" },
];

export const availableListsCatalog: GroupAssignedList[] = [
  { id: "gold-coast-event", name: "Gold Cost Event", leads: 150 },
  { id: "live-event-brisbane", name: "Live Event Brisbane", leads: 80 },
  { id: "event-gold-coast-vip", name: "Event Gold Coast VIP", leads: 77 },
  { id: "cod-new-registrations", name: "COD New Registrations", leads: 90 },
  { id: "event-brisbane", name: "Event Brisbane", leads: 88 },
  { id: "live-event-sydney", name: "Live Event Sydney", leads: 112 },
  { id: "event-melbourne-premium", name: "Event Melbourne Premium", leads: 64 },
];

export const groupsSeedData: GroupRecord[] = [
  {
    id: "sydney-sales-team",
    name: "Sydney Sales Team",
    description: "Primary outbound team focused on Sydney metro campaigns.",
    members: groupMembers.slice(0, 5).concat(groupMembers.slice(5, 9)),
    assignedLists: [
      { id: "syd-metro", name: "Sydney Metro Leads", leads: 220 },
      { id: "syd-premium", name: "Sydney Premium", leads: 148 },
      { id: "syd-renewal", name: "Sydney Renewals", leads: 92 },
    ],
    createdOn: "06/12/26",
    status: "Active",
  },
  {
    id: "cold-outreach-team-1",
    name: "Cold Outreach Team",
    description: "Lead warming pod for newer outbound campaigns.",
    members: groupMembers.slice(0, 9),
    assignedLists: [
      { id: "cold-vic", name: "Victoria Cold List", leads: 180 },
      { id: "cold-nsw", name: "NSW Cold List", leads: 121 },
    ],
    createdOn: "06/18/26",
    status: "Inactive",
  },
  {
    id: "champions-sale-team",
    name: "Champions Sale Team",
    description: "Closers reserved for high-value opportunities.",
    members: groupMembers.slice(1, 5),
    assignedLists: [{ id: "vip-only", name: "VIP Pipeline", leads: 66 }],
    createdOn: "05/30/26",
    status: "Active",
  },
  {
    id: "alpha-team-1",
    name: "Alpha Team",
    description: "Team handling overflow and after-hours callbacks.",
    members: groupMembers.slice(2, 9),
    assignedLists: [
      { id: "alpha-overflow", name: "Overflow Leads", leads: 54 },
      { id: "alpha-retarget", name: "Retargeting Leads", leads: 71 },
    ],
    createdOn: "07/25/26",
    status: "Active",
  },
  {
    id: "beta-team",
    name: "Beta Team",
    description: "Weekend operations and event-day activation.",
    members: groupMembers.slice(0, 4),
    assignedLists: [
      { id: "beta-event", name: "Weekend Event List", leads: 87 },
      { id: "beta-late", name: "Late Shift Follow-ups", leads: 59 },
      { id: "beta-cross", name: "Cross-sell Calls", leads: 44 },
      { id: "beta-special", name: "Special Event Registrations", leads: 31 },
    ],
    createdOn: "03/05/26",
    status: "Active",
  },
  {
    id: "senior-team",
    name: "Senior Team",
    description: "Escalation and senior consultation group.",
    members: groupMembers.slice(0, 9),
    assignedLists: [
      { id: "senior-au", name: "AU Escalations", leads: 90 },
      { id: "senior-nz", name: "NZ Escalations", leads: 60 },
      { id: "senior-vip", name: "VIP Escalations", leads: 40 },
      { id: "senior-late", name: "Late Escalations", leads: 28 },
      { id: "senior-winback", name: "Winback Priority", leads: 16 },
    ],
    createdOn: "08/14/26",
    status: "Inactive",
  },
  {
    id: "alpha-team-2",
    name: "Alpha Team",
    description: "Regional expansion representatives.",
    members: groupMembers.slice(0, 3),
    assignedLists: [
      { id: "regional-qld", name: "Queensland Region", leads: 83 },
      { id: "regional-wa", name: "WA Region", leads: 68 },
      { id: "regional-sa", name: "SA Region", leads: 41 },
    ],
    createdOn: "02/20/26",
    status: "Active",
  },
  {
    id: "cold-outreach-team-2",
    name: "Cold Outreach Team",
    description: "Trial pod for new scripts and lead sources.",
    members: groupMembers.slice(4, 6),
    assignedLists: [
      { id: "pilot-a", name: "Pilot Campaign A", leads: 30 },
      { id: "pilot-b", name: "Pilot Campaign B", leads: 18 },
    ],
    createdOn: "09/22/26",
    status: "Active",
  },
  {
    id: "group-1",
    name: "Group-1",
    description: "Temporary group created for internal testing.",
    members: groupMembers.slice(6, 9),
    assignedLists: [{ id: "temp-ops", name: "Temporary Ops", leads: 22 }],
    createdOn: "01/15/26",
    status: "Inactive",
  },
];
