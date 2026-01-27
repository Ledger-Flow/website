"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvoice } from "@/context/inovoice-context";
import { calculateTotals } from "@/utils/calculations";
import { formatCurrency } from "@/utils/formatter";
import Link from "next/link";

const InvoiceSummary = () => {
  const { invoice } = useInvoice();

  const disableCreateInvoice =
    !invoice.customerName ||
    !invoice.customerEmail ||
    !invoice.customerPhone ||
    invoice.items.every(
      (item) => !item.name || !item.quantity || !item.unitPrice,
    );

  const invoiceItemAmounts = invoice.items.map((item) => item.amount);
  const { subtotal, taxAmount, totalAmount } = calculateTotals(
    invoiceItemAmounts,
    invoice.taxRate,
  );

  return (
    <main className="space-y-6">
      {/* Summary Card */}
      <Card className="lg:sticky lg:top-0">
        <CardHeader>
          <CardTitle>Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">
                VAT ({invoice.taxRate}%)
              </span>
              <span className="font-semibold">{formatCurrency(taxAmount)}</span>
            </li>
            <li className="flex justify-between border-t pt-3 text-lg">
              <span className="font-bold">Total</span>
              <span className="text-primary font-bold">
                {formatCurrency(totalAmount)}
              </span>
            </li>
          </ul>

          <div className="space-y-2 pt-4">
            <p className="mb-0.75 text-xs text-amber-600">
              Please confirm your invoice details before creating.
            </p>
            <Button
              type="submit"
              className="w-full"
              disabled={disableCreateInvoice}
            >
              Create Invoice
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              asChild
            >
              <Link href={"/dashboard/invoices"}>Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="gap-2">
        <CardHeader>
          <CardTitle className="text-base">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            Invoices are created with automatic numbering and can be customized
            with your business details.
          </p>
          <Button variant="link" className="h-auto p-0 text-xs">
            Learn more about invoicing
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default InvoiceSummary;
