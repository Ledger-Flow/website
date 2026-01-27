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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Download } from "lucide-react";
import { mockTaxData, taxKPI } from "@/data/dashbord";

export default function TaxPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTax = mockTaxData.filter(
    (tax) =>
      tax.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tax.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    return status === "filed"
      ? "text-green-600 bg-green-50"
      : "text-amber-600 bg-amber-50";
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <main className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Tracking</h1>
          <p className="text-muted-foreground mt-1">
            Calculate, track, and manage your tax obligations
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Calculate Tax
        </Button>
      </main>

      {/* Tax Summary */}
      <main className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {taxKPI.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="px-5 pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5">
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-muted-foreground mt-1 text-xs">{kpi.des}</p>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* Controls and Table */}
      <Card>
        <CardHeader className="px-5 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Tax History</CardTitle>
              <CardDescription>
                View all your tax calculations and filings
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="size-4" />
              Export Report
            </Button>
          </div>

          <Input
            placeholder="Search by period or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 max-w-xs"
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Date Calculated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTax.map((tax) => (
                <TableRow key={tax.id}>
                  <TableCell className="font-medium">{tax.period}</TableCell>
                  <TableCell>{tax.type}</TableCell>
                  <TableCell className="font-semibold">{tax.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(tax.status)}`}
                    >
                      {tax.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(tax.dateCalculated).toDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
