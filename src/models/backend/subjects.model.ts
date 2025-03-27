import type { IFile } from "./common.model";

export interface IUserSubject {
  id: string;
  user_id: string;
  subject: string;
  task_id: string;
  subject_id: string;
  exam_date_id: string;
  exam_at: string;
  location: string;
  exam_type: string;
  certificate?: IFile | any;
  certificate_status?: null;
  status?: null;
  grade?: null;
}
export interface IupdateSubjects {
  exam_date_id: string;
  certificate: IFile;
  status?: boolean;
}
export interface ExamRecord {
  id: string;
  user_id: string;
  subject: string;
  task_id: string;
  subject_id: string;
  exam_date_id: string | null;
  exam_at: string | null;
  location: string | null;
  exam_type: string | null;
  certificate: IFile | null;
  certificate_status: string | null;
  status: string | null;
  reject_reason: string | null;
  grade: string | number | null;
  program: string | null;
}
