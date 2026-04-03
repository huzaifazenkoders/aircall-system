export interface List {
  id: string;
  name: string;
  priority: number;
  status: ListStatus;
  total_leads: number;
  list_type?: ListType;
}

export type ListStatus = "active" | "inactive" | "waiting";
export type ListType = "shared" | "individual";
