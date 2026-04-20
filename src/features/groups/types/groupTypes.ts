import { AuthUser } from "@/features/auth/types/authTypes";
import { List } from "@/features/list/types/listTypes";

export type GroupUser = AuthUser;

export interface Group {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  total_users?: number;
  total_lists?: number;
}

export interface GroupInfo extends Group {
  list_assignments: {
    id: string;
    is_active: boolean;
    list: List;
  }[];
  user_groups: {
    id: string;
    joined_at: string;
    user: GroupUser;
  }[];
}

export type GroupStatus = "Active" | "Inactive";
