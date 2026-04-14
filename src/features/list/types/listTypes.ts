import { AuthUser } from "@/features/auth/types/authTypes";
import { Workflow } from "@/features/workflows/types/workflowTypes";
export { LeadActivityStatus, type Lead } from "./leadTypes";

export interface List {
  id: string;
  code: string;
  name: string;
  priority: number;
  status: ListStatus;
  total_leads: number;
  list_type: ListType;
  assign_type: AssignType;
  available_leads: number;
  call_type: CallType;
  cooldown_leads: number;
  cooldown_minimum_hours: number;
  cooldown_minimum_minutes: number;
  created_at: string;
  created_by: string;
  deleted_at: string | null;
  updated_at: string | null;
  description: string;
  workflow_id: string;
  workflow: Workflow | null;
  assignments: Assignment[];
}

export interface ListDetail extends Omit<List, "assignments"> {
  assignments: {
    is_active: boolean;
    id: string;
    group: { id: string; name: string } | null;
    user: AuthUser | null;
  }[];
  cleanups: {
    created_at: string;
    id: string;
    next_run_at: string;
    updated_at: string;
  }[];
}

export interface Assignment {
  assigned_at: string;
  created_at: string;
  deleted_at: string | null;
  group_id: string | null;
  id: string;
  is_active: boolean;
  list_id: string;
  updated_at: string;
  user_id: string;
}

export type ListStatus = "active" | "inactive" | "waiting";
export type ListType = "shared" | "individual";
export type CallType = "hot_lead" | "inbound";
export type AssignType = "group" | "individual";
