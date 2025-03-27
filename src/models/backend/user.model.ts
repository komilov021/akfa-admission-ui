export interface ILoginInfo {
  email?: string;
  phone_number?: string;
  password: string;
  is_foreign: boolean;
}
export interface IAcceptInvite {
  code: string;
  confirm_password: string;
  password: string;
}

export interface ISigninForm {
  email: string;
  country_id: string;
  phone: string;
  confirm_password: string;
  password: string;
}
export interface ICountryCodes {
  name: string;
  code: string;
  dial_code: string;
  id: string;
}
export interface ISigninVerify {
  phone_number?: string;
  email?: string;
  is_foreign: boolean;
  code: string;
  is_verified: boolean;
  status: string;
  seconds: number;
}
export interface IRegister {
  phone_number?: string | null;
  email?: string | null;
  is_foreign: boolean;
  country_id: string | undefined;
  city: string | undefined;
  new_password: string;
}

export interface IResetInvite {
  code: string;
  otp?: string;
  confirm_password: string;
  password: string;
}

export interface IUserRole {
  id: string;
  name: { ru: string; uz: string };
}

export interface IUser {
  id: string;
  email: string;
  phone?: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  is_foreign: boolean;
  country: { code: string };
  role: "user" | "admin" | "moderator" | "super_admin";
  is_verified: boolean;
  register_status: boolean;
}
export enum LoginType {
  LOCAL = "local",
  FOREIGN = "foreign",
}
export interface IRegisterApplication {
  code: string;
  status: string;
  phone_number: string;
  seconds: number;
}
