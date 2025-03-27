import type { IFile } from "./common.model";

export interface ICreateApplecantKanban {
  name: string;
  surname: string;
  passport_id: string;
  kanban_id: string;
  program_id?: string | null;
}
export interface ICreateApplecantForm {
  name: string;
  surname: string;
  date_of_birth: string;
  email: string;
  passport_id: string;
  pnfl: string;
  first_phone_number: string;
  second_phone_number: string;
  country: string;
  region: string;
  city_or_town: string;
  street: string;
  house: string;
  address: string;
  mothers_full_name: string;
  fathers_full_name: string;
  school?: string;
  college?: string;
  university?: string;
  lyceum?: string;
  passport_b: IFile;
  passport_f: IFile;
  diploma: IFile;
  extra_document: IFile;
  contract_type: string;
}
export interface IGetTaskByUser extends ICreateApplecantForm {
  id: string;
  column_id: string;
  title: null;
  description: null;
  dynamic_fields: null;
  order_index: number;
  created_at: string;
  created_by: null;
  is_deleted: boolean;
  is_foreign: boolean;
  user_id: string;
  program_id: string;
  payed: number;
  contract_status: string;
  updated_at: string;
}
export interface IContractInfo {
  id: string;
  program: string;
  payed: number;
  total_fee: number;
  payment_25: number;
  school: string | null;
  status: string;
}
export interface IApplicantKanbans {
  id: any;
  section_id: string;
  name: any;
  created_at: string;
  is_deleted: boolean;
  type: string;
  is_active: boolean;
}
export interface IapplicantProgramSchools {
  school_title: string;
  programs: {
    id: string;
    program: string;
  }[];
}
