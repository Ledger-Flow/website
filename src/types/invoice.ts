import { Member } from "./members";

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number | string;
  unitPrice: number | string;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: number | string;
  issuedAt: string;
  issuedBy: Member;
  items: InvoiceItem[];
  taxRate: number;
  subTotal: number;
  taxAmount: number;
  totalAmount: number;
  note?: string;
}
