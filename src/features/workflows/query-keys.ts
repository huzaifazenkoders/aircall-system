export const workflowKeys = {
  all: ["workflows"] as const,
  list: (params: object) => ["workflows", "list", params] as const,
  dispositions: (params: object) => ["workflow-dispositions", params] as const,
  remainingDispositionTypes: (id: string) =>
    ["workflow-dispositions", "remaining", id] as const,
  existingDispositionTypes: (id: string) =>
    ["workflow-dispositions", "existing", id] as const,
};
