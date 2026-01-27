"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInventory } from "@/context/inventory-context";
import { useProfile } from "@/context/profile-context";
import { cleanNumberInput, cleanNumberInputBlur } from "@/lib/utils";
import { Product } from "@/types/inventoy";
import { useState } from "react";

const AddInvoiceProduct = ({
  name,
  unitPrice,
}: Pick<Product, "name" | "unitPrice">) => {
  const { inventoryDispatcher } = useInventory();
  const { business } = useProfile();

  const [state, setState] = useState<
    Pick<Product, "lowStockThreshold" | "quantityInStock">
  >({
    quantityInStock: 1,
    lowStockThreshold: 0,
  });

  const handleChange = (field: keyof typeof state, value: string) => {
    const cleanedValue = cleanNumberInput(value);
    if (cleanedValue === undefined) return;
    setState((prev) => ({ ...prev, [field]: cleanedValue }));
  };

  const handleNumberInputOnBlur = (
    field: keyof typeof state,
    value: string | number,
    min?: number,
  ) => {
    const cleanedValue = cleanNumberInputBlur(value, min);
    if (cleanedValue === undefined) return;
    setState((prev) => ({ ...prev, [field]: cleanedValue }));
  };

  return (
    <section className="space-y-2">
      <p className="text-muted-foreground mt-2 text-xs text-balance">
        This product is not in your inventory list. Would you like to add it? If
        yes, please confirm the unit price and update the quantity in stock and
        the stock limit below, then click on{" "}
        <span className="text-foreground font-medium">Add Product</span>
      </p>

      <main className="grid max-w-sm grid-cols-3 items-end gap-4">
        <div className="space-y-1">
          <Label htmlFor="qauntityInStock" className="text-xs font-medium">
            Quantity In Stock
          </Label>

          <Input
            id="qauntityInStock"
            type="number"
            min="1"
            inputMode="numeric"
            className="h-7 rounded-sm px-1.5 text-xs!"
            placeholder="Quantity in stock"
            value={state.quantityInStock}
            onChange={(e) => handleChange("quantityInStock", e.target.value)}
            onBlur={() =>
              handleNumberInputOnBlur(
                "quantityInStock",
                state.quantityInStock,
                1,
              )
            }
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="stock_limit" className="text-xs font-medium">
            Stock Limit
          </Label>

          <Input
            id="stock_limit"
            type="number"
            min="1"
            inputMode="numeric"
            className="h-7 rounded-sm px-1.5 text-xs!"
            placeholder="Stock Limit"
            value={state.lowStockThreshold}
            onChange={(e) => handleChange("lowStockThreshold", e.target.value)}
            onBlur={() =>
              handleNumberInputOnBlur(
                "lowStockThreshold",
                state.lowStockThreshold,
              )
            }
            required
          />
        </div>

        <Button
          type="button"
          size={"sm"}
          className="h-7 rounded-sm"
          disabled={!state.quantityInStock || !state.lowStockThreshold}
          onClick={() =>
            inventoryDispatcher({
              type: "ADD_PRODUCT",
              payload: {
                businessName: business.name,
                name,
                unitPrice,
                ...state,
              },
            })
          }
        >
          Add Product
        </Button>
      </main>
    </section>
  );
};

export default AddInvoiceProduct;
