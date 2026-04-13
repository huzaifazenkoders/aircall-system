export const listKeys = {
  all: ["lists"] as const,
  list: (params: object) => ["lists", "list", params] as const,
  leads: (params: object) => ["lists", "leads", params] as const,
  detail: (id: string) => ["lists", "detail", id] as const,
  myLists: (params: object) => ["lists", "my-lists", params] as const,
  myListPriorityStatus: (list_id: string) => ["lists", "my-list-priority-status", list_id] as const,
};
