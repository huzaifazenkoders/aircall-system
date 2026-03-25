export type UserRole = "Representative" | "Admin";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdOn: string;
  status: "Active" | "Inactive";
  stats: {
    totalCalls: number;
    noAnswer: number;
    scheduled: number;
    completedLeads: number;
  };
  groups: {
    id: string;
    name: string;
    members: number;
  }[];
  assignedLists: {
    id: string;
    name: string;
    leads: number;
  }[];
};

export const usersData: UserRecord[] = [
  {
    id: "james-carter",
    name: "James Carter",
    email: "james@gmail.com",
    phone: "+1 555 123 45 67",
    role: "Representative",
    createdOn: "05/12/26",
    status: "Active",
    stats: { totalCalls: 148, noAnswer: 32, scheduled: 41, completedLeads: 41 },
    groups: [
      { id: "sydney-sales", name: "Sydney Sales Team", members: 7 },
      { id: "team-alpha", name: "Team Alpha", members: 12 },
      { id: "sale-champions", name: "Sale Champions", members: 12 },
      { id: "team-beta", name: "Team Beta", members: 8 },
      { id: "events", name: "Events Pod", members: 5 },
    ],
    assignedLists: [
      { id: "idv", name: "James Carter IDV List", leads: 20 },
      { id: "gold-coast-event", name: "Gold Cost Event", leads: 150 },
      { id: "live-event-brisbane", name: "Live Event Brisbane", leads: 80 },
      { id: "event-gold-vip", name: "Event Gold Coast VIP", leads: 77 },
      { id: "winter-leads", name: "Winter Prospect Leads", leads: 42 },
    ],
  },
  {
    id: "oliver-bennett",
    name: "Oliver Bennett",
    email: "oliver@gmail.com",
    phone: "+1 555 234 56 78",
    role: "Representative",
    createdOn: "05/10/26",
    status: "Active",
    stats: { totalCalls: 124, noAnswer: 21, scheduled: 39, completedLeads: 34 },
    groups: [],
    assignedLists: [],
  },
  {
    id: "mason-brown",
    name: "Mason Brown",
    email: "mason@gmail.com",
    phone: "+1 555 890 12 34",
    role: "Representative",
    createdOn: "05/07/26",
    status: "Inactive",
    stats: { totalCalls: 80, noAnswer: 15, scheduled: 18, completedLeads: 21 },
    groups: [],
    assignedLists: [],
  },
  {
    id: "lucas-martinez",
    name: "Lucas Martinez",
    email: "lucas@gmail.com",
    phone: "+1 555 012 34 56",
    role: "Admin",
    createdOn: "04/28/26",
    status: "Active",
    stats: { totalCalls: 0, noAnswer: 0, scheduled: 0, completedLeads: 0 },
    groups: [],
    assignedLists: [],
  },
  {
    id: "isabella-garcia",
    name: "Isabella Garcia",
    email: "isabella@gmail.com",
    phone: "+1 555 901 23 45",
    role: "Representative",
    createdOn: "04/25/26",
    status: "Active",
    stats: { totalCalls: 90, noAnswer: 23, scheduled: 28, completedLeads: 19 },
    groups: [],
    assignedLists: [],
  },
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    email: "emma@gmail.com",
    phone: "+1 555 567 89 01",
    role: "Representative",
    createdOn: "04/20/26",
    status: "Active",
    stats: { totalCalls: 102, noAnswer: 14, scheduled: 31, completedLeads: 28 },
    groups: [],
    assignedLists: [],
  },
  {
    id: "liam-johnson",
    name: "Liam Johnson",
    email: "liam@gmail.com",
    phone: "+1 555 456 78 90",
    role: "Admin",
    createdOn: "04/17/26",
    status: "Active",
    stats: { totalCalls: 0, noAnswer: 0, scheduled: 0, completedLeads: 0 },
    groups: [],
    assignedLists: [],
  },
  {
    id: "ava-davis",
    name: "Ava Davis",
    email: "ava@gmail.com",
    phone: "+1 555 789 01 23",
    role: "Representative",
    createdOn: "04/12/26",
    status: "Inactive",
    stats: { totalCalls: 67, noAnswer: 18, scheduled: 17, completedLeads: 15 },
    groups: [],
    assignedLists: [],
  },
  {
    id: "noah-smith",
    name: "Noah Smith",
    email: "noah@gmail.com",
    phone: "+1 555 678 90 12",
    role: "Representative",
    createdOn: "04/08/26",
    status: "Active",
    stats: { totalCalls: 56, noAnswer: 11, scheduled: 15, completedLeads: 12 },
    groups: [],
    assignedLists: [],
  },
  {
    id: "sophia-turner",
    name: "Sophia Turner",
    email: "sophia@gmail.com",
    phone: "+1 555 345 67 89",
    role: "Admin",
    createdOn: "04/02/26",
    status: "Active",
    stats: { totalCalls: 0, noAnswer: 0, scheduled: 0, completedLeads: 0 },
    groups: [],
    assignedLists: [],
  },
];

export const availableGroups = [
  { id: "group-1", name: "Group-1", users: 5 },
  { id: "group-2", name: "Group-2", users: 4 },
  { id: "group-3", name: "Group-3", users: 8 },
];
