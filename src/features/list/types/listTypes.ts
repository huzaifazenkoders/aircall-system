export interface List {
  id: string;
  name: string;
  priority: number;
  status: ListStatus;
  total_leads: number;
}

export type ListStatus = "waiting";
