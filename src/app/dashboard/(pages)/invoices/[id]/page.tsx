"use client";

import EmptyState from "@/components/shared/EmptyState";
import { useInvoice } from "@/context/inovoice-context";
import { use } from "react";
import InvoicePreview from "../components/InvoicePreview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FolderOpen } from "lucide-react";
import Loader from "./components/Loader";

const InvoiceIdPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { invoices, fetchingInvoices } = useInvoice();
  const findInvoice = invoices.find((item) => item.invoiceNumber === id);

  if (fetchingInvoices) return <Loader />;

  if (!findInvoice) {
    return (
      <EmptyState
        media={<FolderOpen />}
        title="Invoice not found"
        description="We couldn't find this invoice. The invoice you're looking for doesn't exist."
        content={
          <>
            <Button asChild>
              <Link href={"/dashboard/invoices"}>Back to Invoices</Link>
            </Button>
          </>
        }
      />
    );
  }

  return <InvoicePreview invoice={findInvoice} />;
};

export default InvoiceIdPage;
