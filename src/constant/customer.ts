import { Customer } from "@/types/customer";

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "08012345678",
    totalPurchases: 0,
    lastTransaction: "2024-01-15",
    invoices: [],
  },
  {
    id: "2",
    name: "Tech Solutions Ltd",
    email: "info@techsol.com",
    phone: "08098765432",
    totalPurchases: 0,
    lastTransaction: "2024-01-14",
    invoices: [],
  },
];
