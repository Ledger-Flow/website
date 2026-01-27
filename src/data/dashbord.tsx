import { mockTeamMembers } from "@/constant/team";
import { Percent, ShoppingCart, TrendingUp, Users } from "lucide-react";

// Mock data for the overview
export const kpiData = [
  {
    title: "Total Revenue",
    value: "₦2,450,000",
    change: "+12.5%",
    icon: ShoppingCart,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "New Customers",
    value: "24",
    change: "+8.2%",
    icon: Users,
    color: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Total Sales",
    value: "156",
    change: "+5.1%",
    icon: TrendingUp,
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Growth Rate",
    value: "23.5%",
    change: "+2.3%",
    icon: Percent,
    color: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export const salesChartData = [
  { month: "Jan", sales: 45 },
  { month: "Feb", sales: 52 },
  { month: "Mar", sales: 48 },
  { month: "Apr", sales: 61 },
  { month: "May", sales: 55 },
  { month: "Jun", sales: 67 },
  { month: "Jul", sales: 72 },
  { month: "Aug", sales: 68 },
];

export const salesSummary = [
  { label: "Pending Invoices", value: "₦375,000" },
  { label: "Low Stock Items", value: "5" },
  { label: "Tax Due", value: "₦125,000" },
  { label: "Credits Used", value: "3/5" },
];

export const mockInvoices = [
  {
    invoiceNumber: "INV-001",
    customer: "Acme Corp",
    totalAmount: "₦150,000",
    issuedAt: "2024-02-15",
    createdBy: mockTeamMembers[0],
  },
  {
    invoiceNumber: "INV-002",
    customer: "Tech Solutions Ltd",
    totalAmount: "₦75,000",
    issuedAt: "2024-02-20",
    createdBy: mockTeamMembers[1],
  },
  {
    invoiceNumber: "INV-003",
    customer: "Global Enterprises",
    totalAmount: "₦200,000",
    issuedAt: "2024-02-10",
    createdBy: mockTeamMembers[2],
  },
  {
    invoiceNumber: "INV-004",
    customer: "Local Business Co",
    totalAmount: "₦45,000",
    issuedAt: "2024-02-25",
    createdBy: mockTeamMembers[3],
  },
  {
    invoiceNumber: "INV-005",
    customer: "Startup Hub",
    totalAmount: "₦85,000",
    issuedAt: "2024-03-01",
    createdBy: mockTeamMembers[4],
  },
];

export const recentSalesData = mockInvoices.slice(0, 5);

export const mockProducts = [
  {
    id: 1,
    name: "Laptop Pro 15",
    sku: "LP-15-001",
    quantityInStock: 8,
    unitPrice: "₦450,000",
    lowStockThreshold: 3,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    sku: "WM-001",
    quantityInStock: 3,
    unitPrice: "₦2,500",
    lowStockThreshold: 3,
  },
  {
    id: 3,
    name: "USB-C Cable",
    sku: "USB-C-01",
    quantityInStock: 45,
    unitPrice: "₦1,200",
    lowStockThreshold: 5,
  },
  {
    id: 4,
    name: "Monitor 27 Inch",
    sku: "MON-27-01",
    quantityInStock: 2,
    unitPrice: "₦65,000",
    lowStockThreshold: 3,
  },
  {
    id: 5,
    name: "Keyboard Mechanical",
    sku: "KB-MEC-01",
    quantityInStock: 12,
    unitPrice: "₦15,000",
    lowStockThreshold: 3,
  },
  {
    id: 6,
    name: "CPU Core i7",
    sku: "CPU-I7-01",
    quantityInStock: 10,
    unitPrice: "₦120,000",
    lowStockThreshold: 3,
  },
];

export const taxKPI = [
  { label: "Tax Due This Quarter", value: "₦125,000", des: "Q1 2024" },
  { label: "Total Tax Filed", value: "₦529,500", des: "Last 3 quarters" },
  { label: "Filing Deadline", value: "15 days", des: "Until Q1 deadline" },
];

export const mockTaxData = [
  {
    id: 1,
    period: "Q1 2024",
    type: "VAT",
    amount: "₦125,000",
    status: "calculated",
    dateCalculated: "2024-01-15",
  },
  {
    id: 2,
    period: "Q4 2023",
    type: "CIT",
    amount: "₦275,000",
    status: "filed",
    dateCalculated: "2023-12-31",
  },
  {
    id: 3,
    period: "Q3 2023",
    type: "VAT",
    amount: "₦98,500",
    status: "filed",
    dateCalculated: "2023-09-30",
  },
  {
    id: 4,
    period: "Q2 2023",
    type: "CIT",
    amount: "₦156,000",
    status: "filed",
    dateCalculated: "2023-06-30",
  },
];

export const creditHistory = [
  {
    id: 1,
    date: "2024-01-15",
    action: "Invoice Generated",
    creditsUsed: 1,
    balance: 4,
  },
  {
    id: 2,
    date: "2024-01-14",
    action: "Report Generated",
    creditsUsed: 1,
    balance: 5,
  },
  {
    id: 3,
    date: "2024-01-13",
    action: "AI Analysis",
    creditsUsed: 1,
    balance: 6,
  },
  {
    id: 4,
    date: "2024-01-12",
    action: "Monthly Credits Added",
    creditsUsed: -5,
    balance: 7,
  },
  {
    id: 5,
    date: "2024-01-01",
    action: "Monthly Credits Added",
    creditsUsed: -5,
    balance: 12,
  },
];

export const mockCustomers = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "08012345678",
    totalPurchases: 8,
    lastTransaction: "2024-01-15",
  },
  {
    id: 2,
    name: "Tech Solutions Ltd",
    email: "info@techsol.com",
    phone: "08098765432",
    totalPurchases: 5,
    lastTransaction: "2024-01-14",
  },
  {
    id: 3,
    name: "Global Enterprises",
    email: "sales@globalent.com",
    phone: "08123456789",
    totalPurchases: 12,
    lastTransaction: "2024-01-13",
  },
  {
    id: 4,
    name: "Local Business Co",
    email: "hello@localbiz.com",
    phone: "08134567890",
    totalPurchases: 3,
    lastTransaction: "2024-01-12",
  },
  {
    id: 5,
    name: "Startup Hub",
    email: "contact@startuphub.com",
    phone: "08145678901",
    totalPurchases: 6,
    lastTransaction: "2024-01-11",
  },
];
