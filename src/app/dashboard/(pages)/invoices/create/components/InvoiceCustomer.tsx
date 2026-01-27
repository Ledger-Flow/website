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
import { useCustomer } from "@/context/customer-context";
import { useInvoice } from "@/context/inovoice-context";
import { toast } from "sonner";

const InvoiceCustomer = () => {
  const { invoice, invoiceDispatcher } = useInvoice();
  const { customerDispatcher, customers } = useCustomer();

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(invoice.customerName.toLowerCase()),
  );
  const findCustomer = customers.find(
    (customer) =>
      customer.name === invoice.customerName &&
      customer.email === invoice.customerEmail &&
      customer.phone === invoice.customerPhone,
  );

  const handleNumberInput = (field: "customerPhone", value: string) => {
    if (value === "") {
      invoiceDispatcher({
        type: "UPDATE_INVOICE",
        payload: { [field]: "" },
      });
      return;
    }

    const newValue = Number.parseInt(value);
    if (!isNaN(newValue) && newValue > 0) {
      invoiceDispatcher({
        type: "UPDATE_INVOICE",
        payload: { [field]: newValue },
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
        <CardDescription>Select or create a customer</CardDescription>
      </CardHeader>
      <CardContent>
        <main className="grid grid-cols-3 gap-4">
          <div className="group relative space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="John Doe"
              value={invoice.customerName}
              onChange={(e) =>
                invoiceDispatcher({
                  type: "UPDATE_INVOICE",
                  payload: { customerName: e.target.value },
                })
              }
              required
            />

            {filteredCustomers.length > 0 && (
              <ul className="border-input absolute hidden max-h-85 w-full gap-1 space-y-0.5 truncate overflow-x-clip overflow-y-auto rounded-md border bg-white p-1 shadow-sm group-focus-within:block">
                {filteredCustomers.map((customer, index) => (
                  <li key={index}>
                    <button
                      className="text-foreground hover:bg-accent hover:text-accent-foreground w-full cursor-pointer rounded-sm px-2 py-1.5 text-left text-sm disabled:pointer-events-none disabled:bg-transparent disabled:opacity-50"
                      type="button"
                      disabled={
                        customer.name === invoice.customerName &&
                        customer.email === invoice.customerEmail &&
                        customer.phone === invoice.customerPhone
                      }
                      onClick={() =>
                        invoiceDispatcher({
                          type: "UPDATE_INVOICE",
                          payload: {
                            customerName: customer.name,
                            customerEmail: customer.email,
                            customerPhone: customer.phone,
                          },
                        })
                      }
                    >
                      {customer.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail">Customer Email</Label>
            <Input
              id="customerEmail"
              type="email"
              placeholder="john@example.com"
              value={invoice.customerEmail}
              onChange={(e) =>
                invoiceDispatcher({
                  type: "UPDATE_INVOICE",
                  payload: { customerEmail: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerNumber">Customer Number</Label>
            <Input
              className="hide-input-number-spinner"
              id="customerNumber"
              placeholder="08012345678"
              type="number"
              inputMode="tel"
              value={invoice.customerPhone}
              onChange={(e) =>
                handleNumberInput("customerPhone", e.target.value)
              }
              onWheel={(e) => e.stopPropagation()}
              required
            />
          </div>
        </main>

        {!!invoice.customerName &&
          !!invoice.customerEmail &&
          !!invoice.customerPhone &&
          !findCustomer && (
            <p className="text-muted-foreground mt-2 text-xs text-balance">
              This customer is not in your customer list. Would you like to add
              them? If yes, please review the customer&apos;s details and click{" "}
              <button
                type="button"
                className="text-foreground cursor-pointer font-medium hover:underline"
                onClick={() => {
                  customerDispatcher({
                    type: "ADD_NEW_CUSTOMER",
                    payload: {
                      email: invoice.customerEmail,
                      name: invoice.customerName,
                      phone: invoice.customerPhone,
                    },
                  });
                  toast.success("Customer added successfully");
                }}
              >
                Add Customer
              </button>
              .
            </p>
          )}
      </CardContent>
    </Card>
  );
};

export default InvoiceCustomer;
