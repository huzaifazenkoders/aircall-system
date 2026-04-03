export enum LeadActivityStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Scheduled = "scheduled",
  Cooldown = "cooldown",
  Completed = "completed",
  Cancelled = "cancelled"
}

export interface LeadAssignedRep {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  name?: string;
}

export interface LeadDisposition {
  id?: string;
  name?: string;
  title?: string;
}

export interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  full_name?: string;
  phone?: string | null;
  phone_number?: string | null;
  status: LeadActivityStatus;
  assigned_rep?: LeadAssignedRep | null;
  assigned_user?: LeadAssignedRep | null;
  last_disposition?: LeadDisposition | string | null;
  last_disposition_at?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  attempt?: number | null;
  attempt_count?: number | null;
}
