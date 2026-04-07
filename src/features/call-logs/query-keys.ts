export const callLogKeys = {
  all: ["call-logs"] as const,
  list: (params: object) => ["call-logs", "list", params] as const,
  detail: (id: string) => ["call-logs", "detail", id] as const,
};
