export interface AuthUser {
  id: string;
  updated_at: string;
  email: string;
  full_name: string | null;
  first_name: string;
  last_name: string;
  role: "admin";
  has_reset_password: boolean;
  phone_number: string | null;
  status: "active";
  last_login_at: string;
}
