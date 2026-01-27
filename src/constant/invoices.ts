import { InvoiceData } from "@/types/invoice";
import { mockTeamMembers } from "./team";

export const mockInvoices: InvoiceData[] = [
  {
    invoiceNumber: "INV-001",
    customerName: "Acme Corp",
    customerEmail: "acme@acme.com",
    customerPhone: "123-456-7890",
    issuedAt: "2024-02-15",
    issuedBy: mockTeamMembers[0],
    taxRate: 7.5,
    subTotal: 139500,
    taxAmount: 10500,
    totalAmount: 150000,
    items: [
      {
        id: "1",
        name: "Laptop Pro 15",
        quantity: 1,
        unitPrice: 450000,
        amount: 450000,
      },
    ],
    note: "Thank you for your business.",
  },
  {
    invoiceNumber: "INV-002",
    customerName: "Acme Corp",
    customerEmail: "acme@acme.com",
    customerPhone: "123-456-7890",
    issuedAt: "2024-07-10",
    issuedBy: mockTeamMembers[1],
    taxRate: 7.5,
    subTotal: 139500,
    taxAmount: 10500,
    totalAmount: 150000,
    items: [
      {
        id: "2",
        name: "Wireless Mouse",
        quantity: 3,
        unitPrice: 2500,
        amount: 7500,
      },
    ],
    note: "Thank you for your business.",
  },
];
