import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/types/inventoy";
import { formatCurrency } from "@/utils/formatter";
import { getStatus } from "@/utils/inventory";
import { MoreHorizontal } from "lucide-react";

const InventoryCards = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card
          key={product.id}
          className="hover:border-primary/50 transition-300"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">{product.name}</CardTitle>
                <CardDescription className="text-xs">
                  {product.sku}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">In Stock</span>
              <span className="text-2xl font-bold">
                {product.quantityInStock}
              </span>
            </div>
            <div className="-mt-4 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Stock Limit</span>
              <span className="text-lg font-semibold">
                {product.lowStockThreshold}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-muted-foreground text-sm font-medium">
                Price
              </span>
              <span className="text-lg font-bold">
                {formatCurrency(Number(product.unitPrice))}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              {
                getStatus(
                  Number(product.lowStockThreshold),
                  Number(product.quantityInStock),
                ).icon
              }
              <span
                className={cn(
                  `rounded-full px-3 py-1 text-xs font-semibold`,
                  getStatus(
                    Number(product.lowStockThreshold),
                    Number(product.quantityInStock),
                  ).color,
                )}
              >
                {
                  getStatus(
                    Number(product.lowStockThreshold),
                    Number(product.quantityInStock),
                  ).label
                }
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InventoryCards;
