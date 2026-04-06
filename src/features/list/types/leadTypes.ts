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

export type LeadDisplayStatus =
  | LeadActivityStatus
  | "invalid"
  | "banned"
  | "expired";

export interface Lead {
  call_priority: number;
  created_at: string;
  deleted_at: string | null;
  email: string;
  event_date: string;
  event_location: string;
  event_name: string;
  first_name: string;
  id: string;
  is_referral: boolean;
  keap_contact_url: string;
  last_name: string;
  lead_owner: string;
  list_id: string;
  notes: string;
  phone: string;
  referral_link: string;
  referred_by: string;
  timezone: string;
  updated_at: string;
  status?: LeadDisplayStatus;
  lead_status?: LeadDisplayStatus;
  activity_status?: LeadDisplayStatus;
  disposition?: string;
  last_disposition?: string;
  attempt?: number;
  attempts?: number;
  days_to_expiry?: number;
  assigned_rep?: LeadAssignedRep | null;
}
