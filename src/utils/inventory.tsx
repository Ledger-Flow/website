import { AlertTriangle, ThumbsUp } from "lucide-react";

export const getStatus = (
  lowStockThreshold: number,
  quantityInStock: number,
) => {
  if (quantityInStock <= lowStockThreshold) {
    return {
      label: "Low Stock" as const,
      color: "text-red-600 bg-red-50",
      icon: <AlertTriangle className="size-4 text-red-600" />,
    };
  }
  return {
    label: "In Stock" as const,
    color: "text-green-600 bg-green-50",
    icon: <ThumbsUp className="size-4 text-green-600" />,
  };
};
