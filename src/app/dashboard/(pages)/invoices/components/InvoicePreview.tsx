"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProfile } from "@/context/profile-context";
import { InvoiceData } from "@/types/invoice";
import { formatCurrency, formatDate } from "@/utils/formatter";
import { generateInvoicePdf } from "@/utils/generator";
import Link from "next/link";

const InvoicePreview = ({ invoice }: { invoice: InvoiceData }) => {
  const { business } = useProfile();

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Preview */}
      <main className="lg:col-span-2">
        <Card>
          <CardHeader>
            <header className="flex items-end justify-between">
              <div>
                <h2 className="mb-1 text-3xl font-bold">INVOICE</h2>
                <p className="text-muted-foreground">{invoice.invoiceNumber}</p>
              </div>

              <div className="text-right">
                <p className="text-muted-foreground text-sm">
                  Date:{" "}
                  <span className="text-foreground font-medium">
                    {formatDate(invoice.issuedAt)}
                  </span>
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Signed By:{" "}
                  <span className="text-foreground font-medium">
                    {invoice.issuedBy.name}
                  </span>
                </p>
              </div>
            </header>
          </CardHeader>
          <CardContent>
            <main className="mt-3 mb-8 grid grid-cols-2 gap-6">
              {/* From */}
              <div>
                <h3 className="mb-1 font-semibold">From:</h3>
                <p className="font-medium">{business.name}</p>
                <p className="text-muted-foreground text-sm">
                  {business.address}
                  <br />
                  {business.state}, {business.country} {business.zipCode}
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  {business.phone}
                </p>
                <p className="text-muted-foreground text-sm">
                  {business.email}
                </p>
              </div>

              {/* To */}
              <div>
                <h3 className="mb-1 font-semibold">To:</h3>
                <p className="font-medium">{invoice.customerName}</p>

                <p className="text-muted-foreground mt-1 text-sm">
                  {invoice.customerPhone}
                </p>
                <p className="text-muted-foreground text-sm">
                  {invoice.customerEmail}
                </p>
              </div>
            </main>

            <Table className="mb-8">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-10">SN</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-20">Quantity</TableHead>
                  <TableHead className="text-center">Unit Price</TableHead>
                  <TableHead className="w-20 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {invoice.items.map((item, index) => (
                  <TableRow key={index} className="hover:bg-transparent">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(Number(item.unitPrice))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <ul className="ms-auto w-full max-w-xs space-y-1 text-sm">
              <li className="flex items-center justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  {formatCurrency(invoice.subTotal)}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>VAT (${invoice.taxRate}%):</span>
                <span className="font-semibold">
                  {formatCurrency(invoice.taxAmount)}
                </span>
              </li>

              <li className="mt-2 flex items-center justify-between border-t pt-2 text-lg">
                <span className="font-semibold">Total:</span>
                <span className="text-primary font-semibold">
                  {formatCurrency(invoice.totalAmount)}
                </span>
              </li>
            </ul>

            <p className="text-muted-foreground mt-3 max-w-lg text-sm text-balance italic">
              {invoice.note}
            </p>
            <p className="text-muted-foreground my-3 mt-2 max-w-lg text-sm text-balance italic">
              Powered by LedgerFlow, smarter invoicing, inventory, and insights.{" "}
              {!!process.env.NEXT_PUBLIC_URL && (
                <Link
                  className="font-medium"
                  href={process.env.NEXT_PUBLIC_URL}
                >
                  {process.env.NEXT_PUBLIC_URL}
                </Link>
              )}
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Summary */}
      <main>
        <Card className="lg:sticky lg:top-0">
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">
                  {formatCurrency(invoice.subTotal)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">
                  VAT ({invoice.taxRate}%)
                </span>
                <span className="font-semibold">
                  {formatCurrency(invoice.taxAmount)}
                </span>
              </li>
              <li className="flex justify-between border-t pt-3 text-lg">
                <span className="font-bold">Total</span>
                <span className="text-primary font-bold">
                  {formatCurrency(invoice.totalAmount)}
                </span>
              </li>
            </ul>

            <div className="space-y-2 pt-4">
              <Button
                type="button"
                className="w-full"
                onClick={() => generateInvoicePdf(invoice, business)}
              >
                Download Invoice
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <Link href={"/dashboard/invoices/create"}>
                  Create New Invoice
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </section>
  );
};

export default InvoicePreview;
