export const groupKeys = {
  all: ["groups"] as const,
  list: (params: object) => ["groups", "list", params] as const,
  info: (id: string) => ["groups", "info", id] as const,
};
