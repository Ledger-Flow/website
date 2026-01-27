import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Product } from "@/types/inventoy";
import { formatCurrency } from "@/utils/formatter";
import { getStatus } from "@/utils/inventory";
import { MoreHorizontal } from "lucide-react";

const InventoryTable = ({ products }: { products: Product[] }) => {
  return (
    <Card>
      <CardContent className="px-5">
        <Table>
          <TableHeader>
            <TableRow className="pointer-events-none">
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Stock Limit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {product.sku}
                </TableCell>
                <TableCell className="text-center">
                  {product.quantityInStock}
                </TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(Number(product.unitPrice))}
                </TableCell>
                <TableCell className="text-center">
                  {product.lowStockThreshold}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
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
                </TableCell>

                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
