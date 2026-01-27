"use client";

import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { useCustomer } from "@/context/customer-context";
import { Plus, ReceiptText, UserRound } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import InvoiceTable from "../../invoices/components/InvoiceTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useInvoice } from "@/context/inovoice-context";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceTableSkeleton } from "@/components/shared/DashboardSkeleton";

const CustomerIdPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { customers, customerDispatcher, fetchingCustomers } = useCustomer();
  const { invoiceDispatcher } = useInvoice();

  const customer = customers.find((item) => item.id === id);

  const handleNumberUpdate = (value: string) => {
    if (value === "") {
      customerDispatcher({
        type: "UPDATE_CUSTOMER",
        payload: { id, upadate: { phone: "" } },
      });
      return;
    }

    const newValue = Number.parseInt(value);
    if (!isNaN(newValue) && newValue > 0) {
      customerDispatcher({
        type: "UPDATE_CUSTOMER",
        payload: { id, upadate: { phone: newValue } },
      });
    }
  };

  if (fetchingCustomers) {
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

  if (!customer) {
    return (
      <EmptyState
        media={<UserRound />}
        title="No customers found"
        description="Add your first customer to start managing invoices and sales in one place."
        content={
          <Button asChild className="gap-2">
            <Link href={"/dashboard/customers"}>
              <Plus className="size-4" />
              Add Customer
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <main className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your relationships with {customer.name}
          </p>
        </div>

        <Button
          className="gap-2"
          asChild
          onClick={() =>
            invoiceDispatcher({
              type: "UPDATE_INVOICE",
              payload: {
                customerEmail: customer.email,
                customerName: customer.name,
                customerPhone: customer.phone,
              },
            })
          }
        >
          <Link href={"/dashboard/invoices/create"}>
            <Plus className="size-4" />
            Create Invoice
          </Link>
        </Button>
      </main>

      <Card>
        <CardHeader>
          <CardTitle>Update</CardTitle>
          <CardDescription>
            Update {customer.name} contact details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <main className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Customer Name</Label>
                <Input id="name" value={customer.name} disabled readOnly />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Customer Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customer.email}
                  onChange={(e) =>
                    customerDispatcher({
                      type: "UPDATE_CUSTOMER",
                      payload: {
                        id: customer.id,
                        upadate: { email: e.target.value },
                      },
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Customer Number</Label>
                <Input
                  className="hide-input-number-spinner"
                  id="phone"
                  type="number"
                  inputMode="tel"
                  value={customer.phone}
                  onChange={(e) => handleNumberUpdate(e.target.value)}
                  required
                />
              </div>
            </main>

            <Button
              type="submit"
              className="px-10"
              disabled={!customer.name || !customer.email || !customer.phone}
            >
              Update
            </Button>
          </form>
        </CardContent>
      </Card>

      {customer.invoices.length === 0 ? (
        <EmptyState
          media={<ReceiptText />}
          title="No Invoices Found"
          description="Click the button below to create and manage your invoices easily."
          content={
            <Button
              asChild
              className="gap-2"
              onClick={() =>
                invoiceDispatcher({
                  type: "UPDATE_INVOICE",
                  payload: {
                    customerEmail: customer.email,
                    customerName: customer.name,
                    customerPhone: customer.phone,
                  },
                })
              }
            >
              <Link href="/dashboard/invoices/create">
                <Plus className="size-4" />
                Create Invoice
              </Link>
            </Button>
          }
        />
      ) : (
        <InvoiceTable invoices={customer.invoices} />
      )}
    </section>
  );
};

export default CustomerIdPage;
