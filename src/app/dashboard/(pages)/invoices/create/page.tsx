"use client";

import React, { useEffect } from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import InvoiceDetails from "./components/InvoiceDetails";
import InvoiceCustomer from "./components/InvoiceCustomer";
import InvoiceItem from "./components/InvoiceItem";
import InvoiceSummary from "./components/InvoiceSummary";
import InvoicePreview from "../components/InvoicePreview";
import { useInvoice } from "@/context/inovoice-context";
import { useProfile } from "@/context/profile-context";
import { toast } from "sonner";
import { useCustomer } from "@/context/customer-context";
import { InvoiceData } from "@/types/invoice";
import { useInventory } from "@/context/inventory-context";
import { calculateTotals } from "@/utils/calculations";

export default function CreateInvoicePage() {
  const { invoiceDispatcher, invoice, invoices } = useInvoice();
  const { user } = useProfile();
  const { customerDispatcher, customers } = useCustomer();
  const { inventoryDispatcher, products } = useInventory();

  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const handleSubmit = (invoice: InvoiceData) => {
    const { customerName, customerEmail, customerPhone, items } = invoice;
    if (
      !customerEmail ||
      !customerName ||
      !customerPhone ||
      items.every((item) => !item.name || !item.quantity || !item.unitPrice)
    ) {
      alert("Please select a customer and add at least one product");
      return;
    }

    invoiceDispatcher({ type: "GENERATE_INVOICE" });
    toast.success("Invoice generated successfully");
    setInvoiceGenerated(true);

    // Update Inventory Product
    invoice.items.forEach((item) => {
      const findProduct = products.find(
        (product) =>
          product.name === item.name && product.unitPrice === item.unitPrice,
      );
      if (findProduct) {
        inventoryDispatcher({
          type: "UPDATE_PRODUCT",
          payload: {
            id: findProduct.id,
            update: {
              quantityInStock:
                Number(findProduct.quantityInStock) - Number(item.quantity),
            },
          },
        });
      }
    });

    // Update Customer Invoice
    const getCustomer = customers.find(
      (customer) =>
        customer.name === customerName &&
        customer.email === customerEmail &&
        customer.phone === customerPhone,
    );

    const amounts = invoice.items.map((item) => item.amount);
    const { subtotal, taxAmount, totalAmount } = calculateTotals(
      amounts,
      invoice.taxRate,
    );
    const customerInvoice: InvoiceData = {
      ...invoice,
      subTotal: subtotal,
      taxAmount,
      totalAmount,
    };

    if (getCustomer) {
      customerDispatcher({
        type: "UPDATE_CUSTOMER_INVOICE",
        payload: {
          id: getCustomer.id,
          invoice: customerInvoice,
        },
      });
    } else {
      customerDispatcher({
        type: "ADD_NEW_CUSTOMER",
        payload: {
          email: customerEmail,
          name: customerName,
          phone: customerPhone,
          invoice: customerInvoice,
        },
      });
    }
  };

  useEffect(() => {
    if (!user) return;
    invoiceDispatcher({
      type: "INITIALIZE_INVOICE",
      payload: {
        issuedBy: {
          email: user.email,
          img: user.avatar,
          name: user.fullName,
          role: "Sales Rep",
          status: "active",
          id: user.id,
        },
      },
    });
  }, [user, invoiceDispatcher]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          {invoiceGenerated ? "Invoice Generated" : "Create Invoice"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {invoiceGenerated
            ? "View and print invoice"
            : "Generate a new invoice for your customer"}
        </p>
      </header>

      {invoiceGenerated ? (
        <InvoicePreview invoice={invoices[0]} />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(invoice);
          }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Main Content - Left 2 columns */}
          <main className="space-y-6 lg:col-span-2">
            <InvoiceDetails />
            <InvoiceCustomer />
            <InvoiceItem />

            {/* Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription>
                  Add payment terms or special notes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={invoice.note}
                  onChange={(e) =>
                    invoiceDispatcher({
                      type: "UPDATE_INVOICE",
                      payload: { note: e.target.value },
                    })
                  }
                  placeholder="e.g., Verify product before payment. Thank you for your business!"
                  className="focus:ring-primary h-24 w-full resize-none rounded-lg border p-3 text-sm focus:ring-2 focus:outline-none"
                />
              </CardContent>
            </Card>
          </main>

          <InvoiceSummary />
        </form>
      )}
    </section>
  );
}
