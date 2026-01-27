"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoice } from "@/context/inovoice-context";

const InvoiceDetails = () => {
  const { invoice, invoiceDispatcher } = useInvoice();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>Set invoice number and date</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={invoice.invoiceNumber}
              placeholder="INV-001"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              type="date"
              value={invoice.issuedAt}
              onChange={(e) =>
                invoiceDispatcher({
                  type: "UPDATE_INVOICE",
                  payload: { issuedAt: e.target.value },
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
