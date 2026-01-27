export interface Product {
  id: string;
  name: string;
  sku: string;
  quantityInStock: number | string;
  unitPrice: number | string;
  lowStockThreshold: number | string;
}


