"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/types/customer";
import { formatDate } from "@/utils/formatter";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const CustomerTable = ({ customers }: { customers: Customer[] }) => {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-center">Total Purchases</TableHead>
          <TableHead>Last Transaction</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow
            key={customer.id}
            className="cursor-pointer"
            onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
          >
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell className="text-center">
              {customer.totalPurchases}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(customer.lastTransaction)}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomerTable;
