import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceData } from "@/types/invoice";
import { formatCurrency, formatDate } from "@/utils/formatter";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InvoiceTable = ({ invoices }: { invoices: InvoiceData[] }) => {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="px-5">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead className="w-12 text-right">Issue By</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow
                key={index}
                onClick={() =>
                  router.push(`/dashboard/invoices/${invoice.invoiceNumber}`)
                }
                className="cursor-pointer"
              >
                <TableCell className="font-medium">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(invoice.totalAmount)}
                </TableCell>
                <TableCell>{formatDate(invoice.issuedAt)}</TableCell>

                <TableCell className="text-right">
                  {invoice.issuedBy.name.split(" ")[0]}
                </TableCell>
                <TableCell>
                  <span className="relative inline-block size-8 overflow-clip rounded-full">
                    <Image
                      alt="issue by"
                      src={invoice.issuedBy.img}
                      fill
                      sizes="100%"
                    />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvoiceTable;
