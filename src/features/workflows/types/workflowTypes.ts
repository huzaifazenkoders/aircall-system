export type WorkflowStatus = "draft" | "publish";

export type DispositionType =
  | "no_answer"
  | "connected_positive"
  | "not_interested"
  | "callback_scheduled"
  | "voicemail_left"
  | "wrong_number"
  | "do_not_call"
  | "ban_contact";

export type ResultingLeadStatus =
  | "cooldown"
  | "completed"
  | "scheduled"
  | "invalid"
  | "banned";

export type CooldownBehavior = "default" | "custom";

export type MaxAttemptReached = "completed" | "invalid" | "banned";

export interface Workflow {
  created_at: string;
  deleted_at: string | null;
  description: string;
  id: string;
  is_default: boolean;
  name: string;
  status: WorkflowStatus;
  updated_at: string;
  disposition_count: number;
  list_count: number;
}

export interface Disposition {
  id: string;
  workflow_id: string;
  disposition_type: DispositionType;
  resulting_lead_status: ResultingLeadStatus;
  max_attempts: number;
  cooldown_behavior: CooldownBehavior;
  custom_cooldown_hours: number;
  custom_cooldown_min: number;
  max_attempt_reached: MaxAttemptReached;
  keap_note: string;
  is_retry_allowed: boolean;
  created_at: string;
  updated_at: string;
}

export interface RemainingDispositionType {
  disposition_type: DispositionType;
  label: string;
}

export interface ExistingDispositionType {
  id: string;
  disposition_type: DispositionType;
  name: string;
}
