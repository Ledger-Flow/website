"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ReceiptText } from "lucide-react";
import { ViewModeToggle } from "../../components/ViewModeToggle";
import Link from "next/link";
import { useInvoice } from "@/context/inovoice-context";
import InvoiceList from "./components/InvoiceList";
import InvoiceTable from "./components/InvoiceTable";
import EmptyState from "@/components/shared/EmptyState";
import { InvoiceTableSkeleton } from "@/components/shared/DashboardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function InvoicesPage() {
  const { invoices, fetchingInvoices } = useInvoice();
  const [viewMode, setViewMode] = useState<"table" | "list">("table");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (fetchingInvoices) {
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
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your invoices
          </p>
        </div>

        <Button asChild className="gap-2">
          <Link href="/dashboard/invoices/create">
            <Plus className="size-4" />
            Create Invoice
          </Link>
        </Button>
      </main>

      {/* Controls */}
      <Card>
        <CardHeader className="px-5">
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <ViewModeToggle
              viewMode={viewMode}
              onViewModeChange={(mode) => setViewMode(mode as "table" | "list")}
              showCard={false}
              showList
            />
          </div>
        </CardHeader>
      </Card>

      {filteredInvoices.length === 0 ? (
        <EmptyState
          media={<ReceiptText />}
          title="No Invoices Found"
          description="Click the button below to create and manage your invoices easily."
          content={
            <Button asChild className="gap-2">
              <Link href="/dashboard/invoices/create">
                <Plus className="size-4" />
                Create Invoice
              </Link>
            </Button>
          }
        />
      ) : (
        <>
          {viewMode === "table" && <InvoiceTable invoices={filteredInvoices} />}
          {viewMode === "list" && <InvoiceList invoices={filteredInvoices} />}
        </>
      )}
    </section>
  );
}
