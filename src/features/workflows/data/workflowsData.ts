export type WorkflowStatus = "Active" | "Draft";

export type WorkflowAccent = "mint" | "lilac" | "cream" | "sky" | "lime";

export type WorkflowRuleFormValues = {
  dispositionType: string;
  resultingLeadStatus: string;
  retryStrategy: "retry" | "do-not-retry";
  maxAttempts: string;
  cooldownBehavior: "default" | "custom";
  cooldownHours: string;
  cooldownMinutes: string;
  maxAttemptsReached: string;
  keepNoteTemplate: string;
  keepTag: string;
};

export type WorkflowStat = {
  label: string;
  value: string;
};

export type WorkflowTag = {
  id: string;
  label: string;
  overflow?: boolean;
};

export type WorkflowRule = {
  id: string;
  title: string;
  stats: WorkflowStat[];
  tags?: WorkflowTag[];
  formValues?: WorkflowRuleFormValues;
};

export type WorkflowSummary = {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  status: WorkflowStatus;
  usedBy: string;
  dispositions: string;
  accent: WorkflowAccent;
  isDefault?: boolean;
  publishedRules?: WorkflowRule[];
};

export const workflowDispositionOptions = [
  "No Answer",
  "Connected / Positive",
  "Not Interested",
  "Callback Scheduled",
  "Voicemail Left",
  "Wrong Number",
  "Do Not Call",
  "Ban Contact",
];

export const workflowLeadStatusOptions = [
  "Cooldown",
  "Completed",
  "Scheduled",
  "Invalid",
  "Banned",
];

export const workflowKeepNoteTemplates = [
  "Select a keep note",
  "VIP callback note",
  "Warm lead follow-up",
  "Do not contact note",
];

export const workflowKeepTagOptions = [
  "Add tag",
  "Busy",
  "Call later",
  "High-intent",
  "Needs nurture",
];

export const emptyWorkflowRuleFormValues: WorkflowRuleFormValues = {
  dispositionType: "",
  resultingLeadStatus: "",
  retryStrategy: "retry",
  maxAttempts: "3",
  cooldownBehavior: "custom",
  cooldownHours: "12",
  cooldownMinutes: "30",
  maxAttemptsReached: "Completed",
  keepNoteTemplate: "",
  keepTag: "",
};

export const vipDraftPreset: WorkflowRuleFormValues = {
  dispositionType: "No Answer",
  resultingLeadStatus: "Cooldown",
  retryStrategy: "retry",
  maxAttempts: "3",
  cooldownBehavior: "custom",
  cooldownHours: "12",
  cooldownMinutes: "30",
  maxAttemptsReached: "Completed",
  keepNoteTemplate: "",
  keepTag: "",
};

export const vipPublishedRules: WorkflowRule[] = [
  {
    id: "no-answer",
    title: "No Answer",
    stats: [
      { label: "Lead Status", value: "Cooldown" },
      { label: "Cooldown", value: "Default (12 hr)" },
      { label: "Attempts", value: "3" },
      { label: "Final Action", value: "Completed" },
    ],
    tags: [
      { id: "busy", label: "Busy" },
      { id: "call-later", label: "Call later" },
      { id: "overflow", label: "+2 more", overflow: true },
    ],
    formValues: vipDraftPreset,
  },
  {
    id: "connected-positive",
    title: "Connected / Positive",
    stats: [
      { label: "Lead Status", value: "Completed" },
      { label: "Cooldown", value: "-" },
      { label: "Attempts", value: "-" },
      { label: "Final Action", value: "Completed" },
    ],
  },
  {
    id: "callback-scheduled",
    title: "Callback Scheduled",
    stats: [
      { label: "Lead Status", value: "Scheduled" },
      { label: "Date", value: "02/27/26" },
      { label: "Time", value: "14:00" },
      { label: "Final Action", value: "Completed" },
    ],
    tags: [
      { id: "busy", label: "Busy" },
      { id: "call-later", label: "Call later" },
      { id: "overflow", label: "+2 more", overflow: true },
    ],
  },
  {
    id: "voicemail",
    title: "Voicemail",
    stats: [
      { label: "Lead Status", value: "Cooldown" },
      { label: "Cooldown", value: "Custom (14 hr)" },
      { label: "Attempts", value: "3" },
      { label: "Final Action", value: "Completed" },
    ],
    tags: [
      { id: "busy", label: "Busy" },
      { id: "call-later", label: "Call later" },
    ],
  },
  {
    id: "wrong-number",
    title: "Wrong Number",
    stats: [
      { label: "Lead Status", value: "Invalid" },
      { label: "Cooldown", value: "-" },
      { label: "Attempts", value: "-" },
      { label: "Final Action", value: "Invalid" },
    ],
  },
  {
    id: "do-not-call",
    title: "Do Not Call",
    stats: [
      { label: "Lead Status", value: "Completed" },
      { label: "Cooldown", value: "-" },
      { label: "Attempts", value: "-" },
      { label: "Final Action", value: "Completed" },
    ],
    tags: [
      { id: "busy", label: "Busy" },
      { id: "call-later", label: "Call later" },
      { id: "overflow", label: "+2 more", overflow: true },
    ],
  },
  {
    id: "ban-contact",
    title: "Ban Contact",
    stats: [
      { label: "Lead Status", value: "Banned" },
      { label: "Cooldown", value: "-" },
      { label: "Attempts", value: "-" },
      { label: "Final Action", value: "Banned" },
    ],
    tags: [
      { id: "busy", label: "Busy" },
      { id: "call-later", label: "Call later" },
      { id: "overflow", label: "+2 more", overflow: true },
    ],
  },
];

export const workflowsSummary: WorkflowSummary[] = [
  {
    id: "default-sales-workflow",
    name: "Default Sales Workflow",
    description: "Special automation rules for VIP campaign leads.",
    lastUpdated: "Feb 21, 2025",
    status: "Active",
    usedBy: "8 Lists",
    dispositions: "8",
    accent: "mint",
    isDefault: true,
    publishedRules: vipPublishedRules,
  },
  {
    id: "high-intent-lead-closer",
    name: "High-Intent Lead Closer",
    description: "Follow-ups for hot and ready-to-buy leads.",
    lastUpdated: "Feb 21, 2025",
    status: "Active",
    usedBy: "8 Lists",
    dispositions: "8",
    accent: "lilac",
    publishedRules: vipPublishedRules,
  },
  {
    id: "cold-lead-re-engagement",
    name: "Cold Lead Re-Engagement",
    description: "Nurture inactive prospects and revive conversations.",
    lastUpdated: "Feb 21, 2025",
    status: "Active",
    usedBy: "8 Lists",
    dispositions: "8",
    accent: "cream",
    publishedRules: vipPublishedRules,
  },
  {
    id: "vip-event-workflow",
    name: "VIP Event Workflow",
    description: "Special automation rules for VIP campaign leads.",
    lastUpdated: "Feb 21, 2025",
    status: "Draft",
    usedBy: "8 Lists",
    dispositions: "8",
    accent: "sky",
    publishedRules: vipPublishedRules,
  },
  {
    id: "trial-user-conversion",
    name: "Trial User Conversion",
    description: "Convert free trial users into paying customers.",
    lastUpdated: "Feb 21, 2025",
    status: "Active",
    usedBy: "8 Lists",
    dispositions: "8",
    accent: "lime",
    publishedRules: vipPublishedRules,
  },
];

export const getWorkflowById = (workflowId: string) => {
  return workflowsSummary.find((workflow) => workflow.id === workflowId) ?? null;
};

export const buildWorkflowRuleFromForm = (
  values: WorkflowRuleFormValues
): WorkflowRule => {
  const cooldownValue =
    values.resultingLeadStatus === "Cooldown"
      ? values.cooldownBehavior === "custom"
        ? `Custom (${values.cooldownHours} hr)`
        : "Default (12 hr)"
      : "-";

  const attemptsValue =
    values.retryStrategy === "retry" && values.resultingLeadStatus === "Cooldown"
      ? values.maxAttempts
      : "-";

  return {
    id: values.dispositionType.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-"),
    title: values.dispositionType,
    stats: [
      { label: "Lead Status", value: values.resultingLeadStatus || "-" },
      {
        label:
          values.resultingLeadStatus === "Scheduled"
            ? "Date"
            : "Cooldown",
        value:
          values.resultingLeadStatus === "Scheduled"
            ? "02/27/26"
            : cooldownValue,
      },
      {
        label:
          values.resultingLeadStatus === "Scheduled"
            ? "Time"
            : "Attempts",
        value:
          values.resultingLeadStatus === "Scheduled"
            ? "14:00"
            : attemptsValue,
      },
      {
        label: "Final Action",
        value:
          values.resultingLeadStatus === "Cooldown"
            ? values.maxAttemptsReached || "Completed"
            : values.resultingLeadStatus || "Completed",
      },
    ],
    tags: values.keepTag
      ? [{ id: values.keepTag.toLowerCase(), label: values.keepTag }]
      : undefined,
    formValues: values,
  };
};
