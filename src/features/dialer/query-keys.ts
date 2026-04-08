export const dialerKeys = {
  scheduledCooldown: (params: object) => ["lead-activities", "scheduled-cooldown", params] as const,
  activityDetail: (id: string) => ["lead-activities", "detail", id] as const,
};
