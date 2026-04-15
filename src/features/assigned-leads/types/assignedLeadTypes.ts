export interface CurrentLead {
  id: string;
  lead_id: string;
  list_id: string;
  status: string;
  attempt_number: number;
  scheduled_at: string | null;
  lead: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    timezone: string;
    event_name: string;
    event_date: string;
    event_location: string;
    is_referral: boolean;
    referred_by: string;
    keap_contact_url?: string;
    created_at: string;
  };
  list: {
    id: string;
    name: string;
    call_type: string;
    workflow_id: string;
  };
  assigned_rep?: {
    id: string;
    first_name: string;
    last_name: string;
  };
  timeline?: {
    id: string;
    title: string;
    subtitle: string;
  }[];
  purchases?: {
    id: string;
    product: string;
    amount: string;
    purchase_date: string;
  }[];
  workflow_id?: string;
  total_purchase?: string;
}
