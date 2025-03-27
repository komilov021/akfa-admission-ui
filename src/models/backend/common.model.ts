export interface ILanguage {
  uz: string;
  ru: string;
}

export interface ListData<T> {
  page: number;
  limit: number;
  total: number;
  data: T[];
}

export type Gender = "MALE" | "FEMALE";

export interface IFile {
  id: string;
  name: string;
  size: number;
  type: string;
  created_at: Date;
  bucket_name: string;
}
