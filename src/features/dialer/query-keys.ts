export const dialerKeys = {
  scheduledCooldown: (params: object) => ["lead-activities", "scheduled-cooldown", params] as const,
  activityDetail: (id: string) => ["lead-activities", "detail", id] as const,
  myLogs: (params: object) => ["call-logs", "my-logs", params] as const,
  myLogDetail: (id: string) => ["call-logs", "my-logs", "detail", id] as const,
};
