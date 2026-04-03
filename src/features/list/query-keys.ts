export const listKeys = {
  all: ["lists"] as const,
  list: (params: object) => ["lists", "list", params] as const,
  leads: (params: object) => ["lists", "leads", params] as const,
  detail: (id: string) => ["lists", "detail", id] as const,
};
