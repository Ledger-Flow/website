import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInventory } from "@/context/inventory-context";
import { useProfile } from "@/context/profile-context";
import { cleanNumberInput, cleanNumberInputBlur } from "@/lib/utils";
import { Product } from "@/types/inventoy";
import { formatCurrency } from "@/utils/formatter";
import { XIcon } from "lucide-react";
import { useState } from "react";

const PreviewAddProduct = ({
  name,
  unitPrice,
  id,
  close,
}: Pick<Product, "name" | "unitPrice" | "id"> & {
  close: (id: string) => void;
}) => {
  const { business } = useProfile();
  const { inventoryDispatcher } = useInventory();

  const [state, setState] = useState<
    Pick<Product, "quantityInStock" | "lowStockThreshold">
  >({
    quantityInStock: 1,
    lowStockThreshold: 0,
  });

  const handleChange = (field: keyof typeof state, value: string) => {
    const cleanedValue = cleanNumberInput(value);
    if (cleanedValue === undefined) return;
    setState((prev) => ({ ...prev, [field]: cleanedValue }));
  };

  const handleBlur = (field: keyof typeof state, value: string | number) => {
    const min = field === "quantityInStock" ? 1 : 0;
    const cleanedValue = cleanNumberInputBlur(value, min);
    if (cleanedValue === undefined) return;

    setState((prev) => ({ ...prev, [field]: cleanedValue }));
  };

  return (
    <Card className="relative gap-4 py-4">
      <button
        className="text-muted-foreground transition-300 hover:bg-background bg-card absolute top-1.25 right-1.25 w-fit cursor-pointer rounded-full border border-transparent p-1 hover:border-black/5 hover:shadow-sm [&_svg]:size-4.5"
        onClick={() => close(id)}
      >
        <XIcon />
      </button>

      <CardHeader className="gap-0 px-4">
        <CardTitle className="text-sm">{name}</CardTitle>
        <CardDescription>{formatCurrency(Number(unitPrice))}</CardDescription>
      </CardHeader>

      <CardContent className="px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inventoryDispatcher({
              type: "ADD_PRODUCT",
              payload: {
                businessName: business.name,
                name,
                unitPrice,
                ...state,
              },
            });
            setState({ lowStockThreshold: 0, quantityInStock: 1 });
          }}
          className="space-y-2"
        >
          <main className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="quantity" className="text-xs">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                inputMode="numeric"
                placeholder="Quantity"
                value={state.quantityInStock}
                onChange={(e) =>
                  handleChange("quantityInStock", e.target.value)
                }
                onBlur={() =>
                  handleBlur("quantityInStock", state.quantityInStock)
                }
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="stock_limit" className="text-xs">
                Stock Limit
              </Label>
              <Input
                id="stock_limit"
                type="number"
                inputMode="numeric"
                placeholder="Stock Limit"
                value={state.lowStockThreshold}
                onChange={(e) =>
                  handleChange("lowStockThreshold", e.target.value)
                }
                onBlur={() =>
                  handleBlur("lowStockThreshold", state.lowStockThreshold)
                }
                required
              />
            </div>
          </main>

          <Button type="submit">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PreviewAddProduct;
