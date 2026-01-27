"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInvoice } from "@/context/inovoice-context";
import { Plus } from "lucide-react";
import InvoiceItemList from "./InvoiceItemList";

const InvoiceItem = () => {
  const { invoice, invoiceDispatcher } = useInvoice();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Line Items</CardTitle>
            <CardDescription>Add products or services</CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => invoiceDispatcher({ type: "ADD_INVOICE_ITEM" })}
            className="gap-2 bg-transparent"
          >
            <Plus className="size-4" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <main className="space-y-3">
          {invoice.items.map((item, index) => (
            <InvoiceItemList key={index} invoiceItem={item} />
          ))}
        </main>
      </CardContent>
    </Card>
  );
};

export default InvoiceItem;
