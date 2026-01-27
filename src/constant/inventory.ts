import { Product } from "@/types/inventoy";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Pro 15",
    sku: "LP-15-001",
    quantityInStock: 8,
    unitPrice: 450000,
    lowStockThreshold: 3,
  },
  {
    id: "2",
    name: "Wireless Mouse",
    sku: "WM-001",
    quantityInStock: 3,
    unitPrice: 2500,
    lowStockThreshold: 3,
  },
  {
    id: "3",
    name: "USB-C Cable",
    sku: "USB-C-01",
    quantityInStock: 45,
    unitPrice: 1200,
    lowStockThreshold: 5,
  },
  {
    id: "4",
    name: "Monitor 27 Inch",
    sku: "MON-27-01",
    quantityInStock: 2,
    unitPrice: 65000,
    lowStockThreshold: 3,
  },
  {
    id: "5",
    name: "Keyboard Mechanical",
    sku: "KB-MEC-01",
    quantityInStock: 12,
    unitPrice: 15000,
    lowStockThreshold: 3,
  },
  {
    id: "6",
    name: "CPU Core i7",
    sku: "CPU-I7-01",
    quantityInStock: 10,
    unitPrice: 120000,
    lowStockThreshold: 3,
  },
];
