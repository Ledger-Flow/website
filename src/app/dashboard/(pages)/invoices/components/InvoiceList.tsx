import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/context/profile-context";
import { InvoiceData } from "@/types/invoice";
import { formatCurrency, formatDate } from "@/utils/formatter";
import { generateInvoicePdf } from "@/utils/generator";
import { Download, Send } from "lucide-react";
import { useRouter } from "next/navigation";

const InvoiceList = ({ invoices }: { invoices: InvoiceData[] }) => {
  const router = useRouter();
  const { business } = useProfile();

  return (
    <main className="space-y-3">
      {invoices.map((invoice, index) => (
        <Card
          key={index}
          className="hover:border-primary/50 transition-300 cursor-pointer"
          onClick={() =>
            router.push(`/dashboard/invoices/${invoice.invoiceNumber}`)
          }
        >
          <CardContent className="flex items-center gap-4 px-5">
            <div className="flex-1">
              <h3 className="font-semibold">{invoice.invoiceNumber}</h3>
              <p className="text-muted-foreground text-sm">
                {invoice.customerName}
              </p>
            </div>

            <div className="text-right">
              <h4 className="text-lg font-bold">
                {formatCurrency(invoice.totalAmount)}
              </h4>
              <p className="text-muted-foreground text-xs">
                Issued At {formatDate(invoice.issuedAt)}
              </p>
            </div>

            <div
              className="flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="ghost" size="sm" title="Send">
                <Send className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Download"
                onClick={() => generateInvoicePdf(invoice, business)}
              >
                <Download className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default InvoiceList;
