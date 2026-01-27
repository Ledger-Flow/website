import { InvoiceData } from "./invoice";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | number;
  totalPurchases: number;
  lastTransaction: string;
  invoices: InvoiceData[];
}
