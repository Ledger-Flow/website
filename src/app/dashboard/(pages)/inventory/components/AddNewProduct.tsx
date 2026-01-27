"use client";

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
import { Product } from "@/types/inventoy";
import { XIcon } from "lucide-react";
import { useState } from "react";

const AddNewProduct = ({ close }: { close: () => void }) => {
  const { inventoryDispatcher } = useInventory();
  const { business } = useProfile();

  const [state, setState] = useState<Omit<Product, "id" | "sku">>({
    name: "",
    quantityInStock: 1,
    unitPrice: 0,
    lowStockThreshold: 0,
  });

  const handleChange = (field: keyof typeof state, value: string) => {
    if (field === "name") {
      setState((prev) => ({ ...prev, [field]: value }));
      return;
    }

    if (value === "") {
      setState((prev) => ({ ...prev, [field]: "" }));
      return;
    }
    const newValue = Number.parseInt(value);
    if (!isNaN(newValue) && newValue >= 0) {
      setState((prev) => ({ ...prev, [field]: newValue }));
      return;
    }
  };

  const handleNumberInputBlur = (
    field: keyof typeof state,
    value: string | number,
    min: number = 0,
  ) => {
    if (value === "" || value === 0) {
      setState((prev) => ({ ...prev, [field]: min }));
      return;
    }
  };

  return (
    <Card>
      <CardHeader>
        <button
          className="text-muted-foreground transition-300 hover:bg-background mb-2 w-fit cursor-pointer rounded-md border border-transparent p-1.5 hover:border-black/5 hover:shadow-sm [&_svg]:size-5"
          onClick={() => close()}
        >
          <XIcon />
        </button>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>
          Add a new product to your inventory and track its stock
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            inventoryDispatcher({
              type: "ADD_PRODUCT",
              payload: { ...state, businessName: business.name },
            });
            setState({
              name: "",
              quantityInStock: 1,
              unitPrice: 0,
              lowStockThreshold: 0,
            });
          }}
        >
          <main className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                onChange={(e) => handleChange("name", e.target.value)}
                value={state.name}
                placeholder="Product Name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Product Quantity</Label>
              <Input
                id="quantity"
                onChange={(e) =>
                  handleChange("quantityInStock", e.target.value)
                }
                onBlur={() =>
                  handleNumberInputBlur(
                    "quantityInStock",
                    state.quantityInStock,
                    1,
                  )
                }
                value={state.quantityInStock}
                placeholder="Product Quantity"
                type="number"
                inputMode="numeric"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock_limit">Product Stock Limit</Label>
              <Input
                id="stock_limit"
                onChange={(e) =>
                  handleChange("lowStockThreshold", e.target.value)
                }
                onBlur={() =>
                  handleNumberInputBlur(
                    "lowStockThreshold",
                    state.lowStockThreshold,
                  )
                }
                value={state.lowStockThreshold}
                placeholder="Product Stock Limit"
                type="number"
                inputMode="numeric"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitPrice">Product Unit Price</Label>
              <Input
                id="unitPrice"
                onChange={(e) => handleChange("unitPrice", e.target.value)}
                onBlur={() =>
                  handleNumberInputBlur("unitPrice", state.unitPrice)
                }
                value={state.unitPrice}
                placeholder="Product Unit Price"
                type="number"
                inputMode="decimal"
                required
              />
            </div>
          </main>

          <Button
            type="submit"
            disabled={!state.name || !state.quantityInStock || !state.unitPrice}
          >
            Add Customer
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewProduct;
