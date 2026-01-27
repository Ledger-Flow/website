"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, UsersRound } from "lucide-react";
import { useCustomer } from "@/context/customer-context";
import EmptyState from "@/components/shared/EmptyState";
import AddNewCustomer from "./components/AddNewCustomer";
import { useToggle } from "@/hooks/useToggle";
import CustomerTable from "./components/CustomerTable";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceTableSkeleton } from "@/components/shared/DashboardSkeleton";

export default function CustomersPage() {
  const { customers, fetchingCustomers } = useCustomer();
  const [searchTerm, setSearchTerm] = useState("");
  const [addNew, toggleAddNew] = useToggle(false);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  return (
    <section className="space-y-6">
      {/* Header */}
      <main className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your customer relationships
          </p>
        </div>

        {!addNew && (
          <Button className="gap-2" onClick={() => toggleAddNew(true)}>
            <Plus className="size-4" />
            Add Customer
          </Button>
        )}
      </main>

      {addNew && <AddNewCustomer close={() => toggleAddNew(false)} />}

      {/* Controls and Table */}
      <Card>
        <CardHeader className="pb-4">
          <div>
            <CardTitle>Customer List</CardTitle>
            <CardDescription>
              All customers and their transaction history
            </CardDescription>
          </div>
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 max-w-xs"
          />
        </CardHeader>

        {filteredCustomers.length === 0 ? (
          <EmptyState
            media={<UsersRound />}
            title="No customers found"
            description="Add your first customer to start managing invoices and sales in one place."
            content={
              <Button className="gap-2">
                <Plus className="size-4" />
                Add Customer
              </Button>
            }
          />
        ) : (
          <CardContent className="px-5">
            <CustomerTable customers={filteredCustomers} />
          </CardContent>
        )}
      </Card>
    </section>
  );
}
