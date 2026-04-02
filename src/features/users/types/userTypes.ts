import { AuthUser } from "@/features/auth/types/authTypes";

export type { AuthUser as Me };

export type UserRole = "admin" | "sales_person";
export type UserStatus = "active" | "invited" | "suspend";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  total_groups?: number;
  total_lists?: number;
}

export interface UserGroup {
  id: string;
  name: string;
  total_users?: number;
}

export interface UserList {
  id: string;
  name: string;
  total_leads?: number;
}

export interface UserDetail extends User {
  keap_id?: string;
  stats: {
    total_calls: number;
    no_answer: number;
    scheduled: number;
    completed_leads: number;
  };
  groups: UserGroup[];
  lists: UserList[];
}
