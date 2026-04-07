export type CallStatus = "completed" | "failed" | "no_answer";

export interface CallLog {
  id: string;
  lead_id: string;
  list_id: string;
  disposition_id: string;
  notes: string;
  attempt_number: number;
  call_status: CallStatus;
  created_at: string;
  updated_at: string;
  lead?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    timezone: string;
  };
  list?: {
    id: string;
    name: string;
  };
  assigned_to?: {
    id: string;
    first_name: string;
    last_name: string;
  };
  disposition?: {
    id: string;
    name: string;
  };
}

export interface CallLogDetail extends CallLog {}
