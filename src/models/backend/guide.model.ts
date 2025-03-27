import type { ILanguage } from "./common.model";
export interface IUSD {
  id: number;
  code: string;
  ccy: string;
  name: {
    cr: "АҚШ доллари";
    en: "US Dollar";
    ru: "Доллар США";
    uz: "AQSH dollari";
  };
  nominal: string;
  rate: number;
  diff: number;
  date: string;
  updated_at: string;
}
