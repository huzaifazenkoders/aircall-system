export type LeadActivityStatus = "scheduled" | "cooldown";

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
