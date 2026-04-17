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
  | "expired"
  | "N/A";

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
  lead_status?: LeadDisplayStatus;
  activity_status?: LeadDisplayStatus;
  disposition?: string;
  days_to_expiry?: number;
  lead_activities?: {
    id: string;
    last_disposition_type: string;
    last_resulting_lead_status: string;
    assigned_user_id: string;
    attempt_count: number;
    last_attempt_at: string;
    next_allowed_at: null;
    scheduled_call_at: null;
    status: string;
    assigned_user: {
      id: string;
      first_name: string;
      last_name: string;
    };
  }[];
}
