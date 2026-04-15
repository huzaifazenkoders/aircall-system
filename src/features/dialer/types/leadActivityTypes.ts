export type LeadActivityStatus = "scheduled" | "cooldown";
export type MyCallStatus = "completed" | "failed" | "no_answer";

export interface LeadActivityPurchase {
  id: string;
  product: string;
  amount: string;
  purchase_date: string;
}

export interface LeadActivityTimeline {
  id: string;
  title: string;
  subtitle: string;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  list_id: string;
  status: LeadActivityStatus;
  scheduled_at: string | null;
  lead?: {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    timezone: string;
    event_name: string;
    event_date: string;
    event_location: string;
    referred_by: string;
    lead_owner: string;
    created_at: string;
  };
  list?: {
    id: string;
    name: string;
  };
}

export interface LeadActivityDetail extends LeadActivity {
  total_purchase: string;
  purchases: LeadActivityPurchase[];
  timeline: LeadActivityTimeline[];
  keap_notes: string[];
  personal_notes: string[];
  keap_contact_url?: string;
}

export interface MyCallLog {
  id: string;
  lead_id: string;
  list_id: string;
  call_status: MyCallStatus;
  duration: string;
  created_at: string;
  lead?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    timezone: string;
    event_name: string;
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

export interface MyCallLogDetail extends MyCallLog {
  notes: string;
  personal_note: string;
  keap_note: string;
  recording_url?: string;
  recording_duration: string;
  next_action: string;
}

export interface CallHistory {
  id: string;
  lead_name: string;
  lead_phone: string;
  list_name: string;
  user_name: string;
  disposition_type: string;
  call_time: string;
  attempt_number: number;
  call_status: string;
}

export interface CallHistoryDetails {
  id: "f14f14dd-5076-4365-93b3-62c1cfe1ede3";
  created_at: "2026-04-15T13:37:02.668Z";
  lead_name: "first name last name";
  lead_phone: "+92333333333";
  list_name: "Huzaifa's Lista";
  user_name: "Izhana Aarain";
  disposition_name: null;
  disposition_type: "no_answer";
  resulting_lead_status: "completed";
  call_time: "2026-04-15T13:37:02.585Z";
  notes: "no answer";
  attempt_number: 1;
  call_status: "completed";
  lead: {
    id: "bb9d2f4e-19c3-4f5b-9a54-16fbf7d1296c";
    first_name: "first name";
    last_name: "last name";
    phone: "+92333333333";
    email: "leadA@yopmail.com";
    timezone: "ASia";
    event_location: "location";
    event_date: "2026-04-09";
    is_referral: true;
    referred_by: "faris shafi";
  };
  disposition: {
    id: "eb0db2c2-c823-495e-ab8f-217671e7c6c3";
    name: null;
    disposition_type: "no_answer";
    resulting_lead_status: "completed";
    max_attempts: 3;
    cooldown_behavior: "default";
  };
}
