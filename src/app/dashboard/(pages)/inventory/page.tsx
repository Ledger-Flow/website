"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ShoppingBasket } from "lucide-react";
import { ViewModeToggle } from "../../components/ViewModeToggle";
import { useInventory } from "@/context/inventory-context";
import InventoryTable from "./components/InventoryTable";
import InventoryCards from "./components/InventoryCards";
import EmptyState from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceTableSkeleton } from "@/components/shared/DashboardSkeleton";
import { useToggle } from "@/hooks/useToggle";
import AddNewProduct from "./components/AddNewProduct";

export default function InventoryPage() {
  const { products, fetchingProducts } = useInventory();

  const [addNewProduct, toggleAddNewProduct] = useToggle(false);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (fetchingProducts) {
    return (
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-20" />
          </CardHeader>
        </Card>
        <InvoiceTableSkeleton />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <main className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your product stock
          </p>
        </div>

        {!addNewProduct && (
          <Button className="gap-2" onClick={() => toggleAddNewProduct(true)}>
            <Plus className="size-4" />
            Add Product
          </Button>
        )}
      </main>

      {addNewProduct && (
        <AddNewProduct close={() => toggleAddNewProduct(false)} />
      )}

      {/* Controls */}
      <Card>
        <CardHeader className="px-5">
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />

            <ViewModeToggle
              viewMode={viewMode}
              onViewModeChange={(mode) => setViewMode(mode as "table" | "card")}
              showCard
            />
          </div>
        </CardHeader>
      </Card>

      {filteredProducts.length === 0 ? (
        <EmptyState
          media={<ShoppingBasket />}
          title="No products yet"
          description="Add your first product to start tracking stock and sales in one place."
          content={
            !addNewProduct && (
              <Button
                className="gap-2"
                onClick={() => toggleAddNewProduct(true)}
              >
                <Plus className="size-4" />
                Add Product
              </Button>
            )
          }
        />
      ) : (
        <>
          {viewMode === "table" && (
            <InventoryTable products={filteredProducts} />
          )}
          {viewMode === "card" && (
            <InventoryCards products={filteredProducts} />
          )}
        </>
      )}
    </section>
  );
}
