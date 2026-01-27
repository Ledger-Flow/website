"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  salesChartData,
  salesSummary,
  kpiData,
  recentSalesData,
} from "@/data/dashbord";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  return (
    <section className="space-y-6">
      {/* KPI Cards */}
      <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="transition-300 hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  {kpi.title}
                </CardTitle>

                <span
                  className={cn(
                    `shrink-0 rounded-lg p-2 ${kpi.color}`,
                    kpi.color,
                    kpi.iconColor,
                  )}
                >
                  <kpi.icon className={`size-4`} />
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <h4 className="text-2xl font-bold">{kpi.value}</h4>
              <p className="mt-1 text-xs text-green-600">
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* Charts Section */}
      <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={salesChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {salesSummary.map((item, index) => (
              <div key={index}>
                <h4 className="text-muted-foreground text-sm">{item.label}</h4>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* Recent Sales */}
      <Card>
        <CardHeader className="px-5">
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            Your latest invoices and transactions
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 px-5">
          {recentSalesData.map((sale, index) => (
            <main
              key={index}
              className="hover:bg-background transition-300 grid cursor-pointer grid-cols-4 items-center border-b p-3 last:border-0"
              onClick={() =>
                router.push(`/dashboard/invoices/${sale.invoiceNumber}`)
              }
            >
              <div className="col-span-2">
                <h6 className="font-medium">{sale.invoiceNumber}</h6>
                <p className="text-muted-foreground text-sm">{sale.customer}</p>
              </div>

              <div className="text-center">
                <h6 className="font-semibold">{sale.totalAmount}</h6>
                <p className="text-muted-foreground text-xs">
                  {new Date(sale.issuedAt).toDateString()}
                </p>
              </div>

              <div className="text-muted-foreground flex items-center justify-end gap-1 text-xs font-medium">
                <p>{sale.createdBy.name.split(" ")[0]}</p>
                <span className="relative size-9 overflow-clip rounded-full">
                  <Image
                    alt="seller avatar"
                    src={sale.createdBy.img}
                    fill
                    sizes="100%"
                  />
                </span>
              </div>
            </main>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
